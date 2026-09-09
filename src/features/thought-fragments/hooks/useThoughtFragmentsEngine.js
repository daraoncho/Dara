import { useCallback, useEffect, useRef, useState } from "react";
import {
  COLLECTIBLE_TOTAL,
  GRAVITY,
  JUMP_FORCE,
  MAX_SPEED,
  FRICTION,
  ROBOT_H,
  ROBOT_W,
} from "../constants/gameConfig";
import { GAME_COPY, getCollectQuip } from "../constants/copy";
import { drawDoor } from "../renderers/drawDoor";
import { drawLightBulb } from "../renderers/drawLightBulb";
import { drawParticles } from "../renderers/drawParticles";
import { drawPlatform } from "../renderers/drawPlatform";
import { drawRobot } from "../renderers/drawRobot";
import { buildLevel } from "../utils/levelLayout";
import { spawnCollectBurst, updateParticles } from "../utils/particles";
import { createPlatformCache } from "../utils/platformCache";
import { getPlayArea } from "../utils/playArea";
import { collectPlatforms } from "../utils/platforms";
import {
  clampRobotHorizontal,
  hasFallenOffScreen,
  isFragmentCollected,
  resolvePlatformLanding,
  tryDropThrough,
} from "../utils/physics";
import { waitForLayout } from "../utils/sectionMetrics";

const INITIAL_STATUS = "playing";
const COLLECT_TOAST_MS = 2600;

/**
 * Canvas game loop for Thought Fragments.
 */
export function useThoughtFragmentsEngine({
  isActive,
  restartKey,
  keysRef,
  jumpLatchRef,
  dropLatchRef,
  reducedMotion = false,
}) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const robotRef = useRef(null);
  const blocksRef = useRef([]);
  const fragmentsRef = useRef([]);
  const particlesRef = useRef([]);
  const platformCacheRef = useRef(createPlatformCache());
  const frameRef = useRef(0);
  const collectToastTimerRef = useRef(null);
  const doorHintLatchRef = useRef(false);
  const stageBoundsRef = useRef(null);
  const readyRef = useRef(false);

  const [gameStatus, setGameStatus] = useState(INITIAL_STATUS);
  const [fragmentsCollected, setFragmentsCollected] = useState(0);
  const [lastCollectedMessage, setLastCollectedMessage] = useState(null);
  const [stageBounds, setStageBounds] = useState(null);
  const [fragmentTotal, setFragmentTotal] = useState(COLLECTIBLE_TOTAL);

  const showCollectToast = useCallback((message) => {
    setLastCollectedMessage(message);
    if (collectToastTimerRef.current) clearTimeout(collectToastTimerRef.current);
    collectToastTimerRef.current = setTimeout(() => {
      setLastCollectedMessage(null);
      collectToastTimerRef.current = null;
    }, COLLECT_TOAST_MS);
  }, []);

  const applyLevel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const playArea = getPlayArea();
    const level = buildLevel(playArea, restartKey + 1);

    fragmentsRef.current = level.fragments;
    blocksRef.current = [...level.spawnBlocks, ...level.scatter, ...level.extraLedges];
    particlesRef.current = [];
    platformCacheRef.current.invalidate();
    stageBoundsRef.current = level.stageBounds;
    setStageBounds(level.stageBounds);
    setFragmentTotal(level.fragmentTotal ?? level.fragments.length);
    frameRef.current = 0;
    setFragmentsCollected(0);
    setLastCollectedMessage(null);
    doorHintLatchRef.current = false;
    setGameStatus(INITIAL_STATUS);

    robotRef.current = {
      x: level.robotSpawn.x,
      docY: level.robotSpawn.docY,
      vx: 0,
      vy: 0,
      onGround: false,
      frame: 0,
      status: INITIAL_STATUS,
      spawning: true,
      bounces: 0,
      dropThroughY: null,
    };

    readyRef.current = true;
    return level;
  }, [restartKey]);

  useEffect(() => {
    if (!isActive) {
      cancelAnimationFrame(animRef.current);
      readyRef.current = false;
      stageBoundsRef.current = null;
      setStageBounds(null);
      if (collectToastTimerRef.current) clearTimeout(collectToastTimerRef.current);
      return undefined;
    }

    let cancelled = false;

    const boot = async () => {
      window.scrollTo(0, 0);
      await waitForLayout();
      if (cancelled) return;

      const level = applyLevel();
      if (!level) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const loop = () => {
        const robot = robotRef.current;
        if (!readyRef.current || !robot || robot.status !== INITIAL_STATUS) return;

        if (canvas.width !== window.innerWidth) {
          canvas.width = window.innerWidth;
          platformCacheRef.current.invalidate();
        }
        if (canvas.height !== window.innerHeight) canvas.height = window.innerHeight;

        const playArea = getPlayArea();
        const scrollY = window.scrollY;
        frameRef.current += 1;

        blocksRef.current.forEach((block) => {
          if (!block.revealed) {
            if (block.isSpawn) {
              block.revealed = true;
              block.alpha = 1;
            } else if (block.docY - scrollY < canvas.height + 100) {
              block.revealed = true;
            }
          }
          if (block.revealed && block.alpha < 0.92) {
            block.alpha = Math.min(block.alpha + 0.08, 0.92);
          }
        });

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        blocksRef.current.forEach((block) => {
          if (block.alpha <= 0) return;
          const screenY = block.docY - scrollY;
          if (screenY > -block.w && screenY < canvas.height + 4) {
            drawPlatform(ctx, block.x, screenY, block.w, block.alpha, block.isGoal);
          }
        });

        const ideasCollected = fragmentsRef.current
          .filter((f) => f.kind === "fragment")
          .every((f) => f.collected);

        fragmentsRef.current.forEach((fragment, index) => {
          if (fragment.collected) return;
          if (fragment.kind === "finish") {
            drawDoor(ctx, fragment.x, fragment.docY, scrollY, ideasCollected, reducedMotion);
          } else {
            drawLightBulb(ctx, fragment.x, fragment.docY, scrollY, index, reducedMotion);
          }
        });

        if (!reducedMotion) {
          updateParticles(particlesRef.current);
          drawParticles(ctx, particlesRef.current, scrollY);
        }

        if (robot.spawning) {
          robot.vy = Math.min(robot.vy + GRAVITY, 8);
          robot.docY += robot.vy;
          robot.frame += 1;

          const spawnBlock = blocksRef.current[0];
          if (spawnBlock?.alpha > 0.5) {
            const robotBottom = robot.docY + ROBOT_H;
            const prevBottom = robotBottom - robot.vy;

            if (
              robot.x + ROBOT_W > spawnBlock.x &&
              robot.x < spawnBlock.x + spawnBlock.w &&
              prevBottom <= spawnBlock.docY + 4 &&
              robotBottom >= spawnBlock.docY &&
              robot.vy > 0
            ) {
              robot.docY = spawnBlock.docY - ROBOT_H;
              robot.bounces += 1;

              if (robot.bounces === 1) robot.vy = -4.5;
              else if (robot.bounces === 2) robot.vy = -1.8;
              else {
                robot.vy = 0;
                robot.onGround = true;
                robot.spawning = false;
              }
            }
          }

          const spawnScreenY = robot.docY - scrollY;
          if (spawnScreenY > playArea.top - ROBOT_H && spawnScreenY < canvas.height) {
            drawRobot(ctx, robot.x, spawnScreenY, robot.frame, robot.onGround, false, reducedMotion);
          }

          animRef.current = requestAnimationFrame(loop);
          return;
        }

        const keys = keysRef.current;
        const moveLeft = keys.has("ArrowLeft") || keys.has("KeyA");
        const moveRight = keys.has("ArrowRight") || keys.has("KeyD");
        const jump = keys.has("Space") || keys.has("ArrowUp") || keys.has("KeyW");
        const drop = keys.has("ArrowDown") || keys.has("KeyS");

        if (moveLeft) robot.vx = Math.max(robot.vx - 0.32, -MAX_SPEED);
        else if (moveRight) robot.vx = Math.min(robot.vx + 0.32, MAX_SPEED);
        else robot.vx *= FRICTION;

        tryDropThrough(robot, drop, dropLatchRef);

        if (jump && robot.onGround && !jumpLatchRef.current) {
          robot.vy = JUMP_FORCE;
          robot.onGround = false;
          jumpLatchRef.current = true;
        }
        if (!jump) jumpLatchRef.current = false;

        robot.vy = Math.min(robot.vy + GRAVITY, 8);
        robot.x += robot.vx;
        robot.docY += robot.vy;
        robot.frame += 1;

        clampRobotHorizontal(robot, playArea);

        const platforms = collectPlatforms(
          blocksRef.current,
          playArea,
          scrollY,
          platformCacheRef.current,
        );
        resolvePlatformLanding(robot, platforms);

        if (hasFallenOffScreen(robot, scrollY, playArea, stageBoundsRef.current)) {
          robot.status = "dead";
          setGameStatus("dead");
          return;
        }

        fragmentsRef.current.forEach((fragment) => {
          if (fragment.collected) return;

          if (fragment.kind === "finish" && !ideasCollected) {
            const atDoor = isFragmentCollected(robot, fragment);
            if (atDoor && !doorHintLatchRef.current) {
              doorHintLatchRef.current = true;
              showCollectToast(GAME_COPY.doorLocked);
            } else if (!atDoor) {
              doorHintLatchRef.current = false;
            }
            return;
          }

          if (isFragmentCollected(robot, fragment)) {
            fragment.collected = true;
            setFragmentsCollected((count) => count + 1);
            showCollectToast(getCollectQuip(fragment));
            if (!reducedMotion) {
              spawnCollectBurst(particlesRef.current, fragment.x + 8, fragment.docY + 8);
            }
          }
        });

        if (
          fragmentsRef.current.length > 0 &&
          fragmentsRef.current.every((fragment) => fragment.collected)
        ) {
          robot.status = "won";
          setGameStatus("won");
          return;
        }

        const screenY = robot.docY - scrollY;
        const isIdle = robot.onGround && Math.abs(robot.vx) < 0.25;
        if (screenY > playArea.top - ROBOT_H && screenY < canvas.height + 40) {
          drawRobot(ctx, robot.x, screenY, robot.frame, robot.onGround, isIdle, reducedMotion);
        }

        animRef.current = requestAnimationFrame(loop);
      };

      animRef.current = requestAnimationFrame(loop);
    };

    boot();

    const onResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      platformCacheRef.current.invalidate();
      if (robotRef.current) {
        clampRobotHorizontal(robotRef.current, getPlayArea());
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
      jumpLatchRef.current = false;
      dropLatchRef.current = false;
      readyRef.current = false;
      doorHintLatchRef.current = false;
      if (collectToastTimerRef.current) clearTimeout(collectToastTimerRef.current);
    };
  }, [isActive, restartKey, applyLevel, keysRef, jumpLatchRef, dropLatchRef, reducedMotion, showCollectToast]);

  return {
    canvasRef,
    gameStatus,
    fragmentsCollected,
    fragmentTotal,
    lastCollectedMessage,
    stageBounds,
  };
}
