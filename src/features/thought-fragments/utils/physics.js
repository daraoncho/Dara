import { DROP_FORCE, ROBOT_H, ROBOT_W } from "../constants/gameConfig";
import { clampX } from "./playArea";

/**
 * Drop through the current ledge (hold ↓ or S while standing on a platform).
 */
export function tryDropThrough(robot, downPressed, dropLatchRef) {
  if (!downPressed) {
    dropLatchRef.current = false;
    return false;
  }

  if (!robot.onGround || dropLatchRef.current) return false;

  robot.dropThroughY = robot.docY + ROBOT_H;
  robot.onGround = false;
  robot.vy = DROP_FORCE;
  dropLatchRef.current = true;
  return true;
}

/** Clear drop-through once the robot has fallen below the ledge it left. */
export function updateDropThroughState(robot) {
  if (robot.dropThroughY == null) return;
  if (robot.docY + ROBOT_H > robot.dropThroughY + 14) {
    robot.dropThroughY = null;
  }
}

/**
 * Resolve vertical landing on the first matching platform (top collision).
 */
export function resolvePlatformLanding(robot, platforms) {
  updateDropThroughState(robot);
  robot.onGround = false;

  for (const platform of platforms) {
    if (robot.dropThroughY != null && platform.y <= robot.dropThroughY + 2) {
      continue;
    }

    const robotBottom = robot.docY + ROBOT_H;
    const prevBottom = robotBottom - robot.vy;

    if (
      robot.x + ROBOT_W > platform.x + 2 &&
      robot.x < platform.x + platform.w - 2 &&
      prevBottom <= platform.y + 5 &&
      robotBottom >= platform.y - 1 &&
      robot.vy >= 0
    ) {
      robot.docY = platform.y - ROBOT_H;
      robot.vy = 0;
      robot.onGround = true;
      robot.dropThroughY = null;
      break;
    }
  }
}

/** Keep the robot inside the content play column. */
export function clampRobotHorizontal(robot, playArea) {
  const clamped = clampX(robot.x, playArea, ROBOT_W);
  if (clamped !== robot.x) {
    robot.x = clamped;
    robot.vx = 0;
  }
}

/** Test collection overlap between robot center and a fragment. */
export function isFragmentCollected(robot, fragment) {
  const robotCenterX = robot.x + ROBOT_W / 2;
  const robotCenterY = robot.docY + ROBOT_H / 2;
  const fragmentCenterX = fragment.x + 8;
  const fragmentCenterY = fragment.docY + 10;

  return (
    Math.abs(robotCenterX - fragmentCenterX) < 26 &&
    Math.abs(robotCenterY - fragmentCenterY) < 28
  );
}

/** True when the robot has fallen below the stage or viewport. */
export function hasFallenOffScreen(robot, scrollY, playArea, stageBounds) {
  const screenY = robot.docY - scrollY;
  if (screenY > playArea.top + playArea.height + 80) return true;
  if (stageBounds && robot.docY > stageBounds.bottom + 40) return true;
  return false;
}
