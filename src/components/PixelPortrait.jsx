import { useEffect, useRef, useState } from "react";
import { PORTRAIT_CURSOR } from "../constants/portraitCursor";
import styles from "../styles/PixelPortrait.module.css";

const memoryCache = new Map();
export const PORTRAIT_SIZE = 200;

/** Black crosshair with light edge — matches default `crosshair` look. */
function paintRotatedCrosshairCursor(targetCanvas, angleRad, cursorConfig) {
  const ctx = targetCanvas.getContext("2d");
  if (!ctx) return "";

  const { bitmapSize, armPx } = cursorConfig;
  const hotspot = bitmapSize / 2;

  ctx.clearRect(0, 0, bitmapSize, bitmapSize);

  ctx.save();
  ctx.translate(hotspot, hotspot);
  ctx.rotate(angleRad);

  ctx.lineCap = "square";
  ctx.beginPath();
  ctx.moveTo(-armPx, 0);
  ctx.lineTo(armPx, 0);
  ctx.moveTo(0, -armPx);
  ctx.lineTo(0, armPx);

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.restore();
  return targetCanvas.toDataURL("image/png");
}

function sampleParticlesFromImage(img, targetSize) {
  const canvas = document.createElement("canvas");
  canvas.width = targetSize;
  canvas.height = targetSize;
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];

  const scale = 0.88;
  const imgAspect = img.width / img.height;
  let drawHeight = targetSize * scale;
  let drawWidth = drawHeight * imgAspect;

  if (drawWidth > targetSize * scale) {
    drawWidth = targetSize * scale;
    drawHeight = drawWidth / imgAspect;
  }

  const offsetX = (targetSize - drawWidth) / 2;
  const offsetY = (targetSize - drawHeight) / 2;
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

  const { data, width, height } = ctx.getImageData(0, 0, targetSize, targetSize);
  const pixelSize = 3;
  const step = pixelSize + 1;
  const raw = [];

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const i = (Math.floor(y) * width + Math.floor(x)) * 4;
      const alpha = data[i + 3];
      if (alpha < 140) continue;

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const brightness = (r + g + b) / (3 * 255);

      raw.push({
        x: x + pixelSize / 2,
        y: y + pixelSize / 2,
        targetX: x + pixelSize / 2,
        targetY: y + pixelSize / 2,
        r,
        g,
        b,
        pixelSize,
        baseAlpha: 0.35 + brightness * 0.65,
        currentAlpha: 0,
        vx: 0,
        vy: 0,
        delay: Math.random() * 0.35,
        shimmer: Math.random() * Math.PI * 2,
      });
    }
  }

  return raw;
}

function createAnimatedParticles(raw) {
  return raw.map((p) => ({
    ...p,
    x: p.targetX + (Math.random() - 0.5) * 280,
    y: p.targetY + (Math.random() - 0.5) * 280,
  }));
}

/**
 * Interactive pixel portrait — cursor repulsion creates a “hole” in the grid.
 * Mount only when portrait mode is active (see ProfilePortrait).
 */
export default function PixelPortrait({
  src,
  alt = "Portrait",
  size = PORTRAIT_SIZE,
  rotateCursor = PORTRAIT_CURSOR.rotate,
  cursorConfig = PORTRAIT_CURSOR,
}) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const mouseTargetRef = useRef({ x: -1000, y: -1000 });
  const startTimeRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const cacheKey = `${src}|${size}`;
    if (memoryCache.has(cacheKey)) {
      particlesRef.current = createAnimatedParticles(memoryCache.get(cacheKey));
      startTimeRef.current = performance.now();
      setReady(true);
      return undefined;
    }

    let cancelled = false;
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    img.onload = () => {
      if (cancelled) return;
      const raw = sampleParticlesFromImage(img, size);
      memoryCache.set(cacheKey, raw);
      particlesRef.current = createAnimatedParticles(raw);
      startTimeRef.current = performance.now();
      setReady(true);
    };

    return () => {
      cancelled = true;
      setReady(false);
    };
  }, [src, size]);

  useEffect(() => {
    if (!ready) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    let animationId;
    const radius = size / 2 - 2;
    const center = size / 2;
    const holeRadius = size * 0.22;
    const cursorBitmap = document.createElement("canvas");
    const cursorHotspot = cursorConfig.bitmapSize / 2;
    cursorBitmap.width = cursorConfig.bitmapSize;
    cursorBitmap.height = cursorConfig.bitmapSize;

    const draw = () => {
      animationId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, size, size);

      ctx.save();
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.clip();

      const particles = particlesRef.current;
      if (!particles.length) return;

      const mouse = mouseRef.current;
      const mouseTarget = mouseTargetRef.current;
      const elapsed = (performance.now() - startTimeRef.current) / 1000;

      mouse.x += (mouseTarget.x - mouse.x) * 0.18;
      mouse.y += (mouseTarget.y - mouse.y) * 0.18;

      particles.forEach((p) => {
        const particleTime = elapsed - p.delay;
        if (particleTime < 0) return;

        const fadeProgress = Math.min(particleTime / 1.2, 1);
        const easedFade = 1 - (1 - fadeProgress) ** 2;
        const shimmerVal = mouse.active ? Math.sin(elapsed * 2 + p.shimmer) * 0.06 : 0;
        p.currentAlpha = Math.max(0, p.baseAlpha * easedFade + shimmerVal);

        const moveProgress = Math.min(particleTime / 2, 1);
        const easedMove = 1 - (1 - moveProgress) ** 3;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < holeRadius && dist > 0) {
            const force = (1 - dist / holeRadius) * 5;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        const pullX = p.targetX - p.x;
        const pullY = p.targetY - p.y;
        const pullStrength = 0.012 + easedMove * 0.09;
        p.vx += pullX * pullStrength;
        p.vy += pullY * pullStrength;

        if (mouse.active) {
          p.vx *= 0.9;
          p.vy *= 0.9;
        } else {
          p.vx *= 0.86;
          p.vy *= 0.86;
        }

        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.currentAlpha})`;
        ctx.fillRect(
          p.x - p.pixelSize / 2,
          p.y - p.pixelSize / 2,
          p.pixelSize,
          p.pixelSize,
        );
      });

      if (mouse.active && rotateCursor) {
        const fanAngle = elapsed * Math.PI * 2 * cursorConfig.spinHz;
        const cursorUrl = paintRotatedCrosshairCursor(
          cursorBitmap,
          fanAngle,
          cursorConfig,
        );
        canvas.style.cursor = `url("${cursorUrl}") ${cursorHotspot} ${cursorHotspot}, crosshair`;
      } else {
        canvas.style.cursor = "crosshair";
      }

      ctx.restore();
    };

    const pointerInCanvasSpace = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = rect.width > 0 ? size / rect.width : 1;
      const scaleY = rect.height > 0 ? size / rect.height : 1;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };

    const syncPointer = (e, snap = false) => {
      const { x, y } = pointerInCanvasSpace(e);
      mouseTargetRef.current.x = x;
      mouseTargetRef.current.y = y;
      if (snap || !mouseRef.current.active) {
        mouseRef.current.x = x;
        mouseRef.current.y = y;
      }
      mouseRef.current.active = true;
    };

    const handleLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseTargetRef.current.x = -1000;
      mouseTargetRef.current.y = -1000;
      canvas.style.cursor = "crosshair";
    };

    const onPointerEnter = (e) => syncPointer(e, true);
    const onPointerDown = (e) => syncPointer(e, true);
    const onPointerMove = (e) => syncPointer(e, false);

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerenter", onPointerEnter);
    canvas.addEventListener("pointerleave", handleLeave);
    canvas.addEventListener("pointerdown", onPointerDown);

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerenter", onPointerEnter);
      canvas.removeEventListener("pointerleave", handleLeave);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.style.cursor = "";
    };
  }, [ready, size, rotateCursor, cursorConfig]);

  return (
    <div className={styles.frame}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={size}
        height={size}
        aria-label={alt}
        role="img"
      />
    </div>
  );
}
