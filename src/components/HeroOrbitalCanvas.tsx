import { useEffect, useRef } from 'react';
import {
  type Point3D,
  projectPoint3D,
  rotatePoint3D,
} from '../utils/portfolioLogic';

// Golden ratio icosahedron vertices + inner octahedron core + orbital ring points
const PHI = (1 + Math.sqrt(5)) / 2;

const ICOSA_VERTICES: Point3D[] = [
  { x: -1, y: PHI, z: 0 },
  { x: 1, y: PHI, z: 0 },
  { x: -1, y: -PHI, z: 0 },
  { x: 1, y: -PHI, z: 0 },
  { x: 0, y: -1, z: PHI },
  { x: 0, y: 1, z: PHI },
  { x: 0, y: -1, z: -PHI },
  { x: 0, y: 1, z: -PHI },
  { x: PHI, y: 0, z: -1 },
  { x: PHI, y: 0, z: 1 },
  { x: -PHI, y: 0, z: -1 },
  { x: -PHI, y: 0, z: 1 },
].map((v) => {
  const len = Math.hypot(v.x, v.y, v.z);
  return { x: (v.x / len) * 1.18, y: (v.y / len) * 1.18, z: (v.z / len) * 1.18 };
});

const ICOSA_EDGES: [number, number][] = [];
for (let i = 0; i < ICOSA_VERTICES.length; i += 1) {
  for (let j = i + 1; j < ICOSA_VERTICES.length; j += 1) {
    const d = Math.hypot(
      ICOSA_VERTICES[i].x - ICOSA_VERTICES[j].x,
      ICOSA_VERTICES[i].y - ICOSA_VERTICES[j].y,
      ICOSA_VERTICES[i].z - ICOSA_VERTICES[j].z,
    );
    if (d < 1.32) {
      ICOSA_EDGES.push([i, j]);
    }
  }
}

const CORE_VERTICES: Point3D[] = [
  { x: 0.56, y: 0, z: 0 },
  { x: -0.56, y: 0, z: 0 },
  { x: 0, y: 0.56, z: 0 },
  { x: 0, y: -0.56, z: 0 },
  { x: 0, y: 0, z: 0.56 },
  { x: 0, y: 0, z: -0.56 },
];

const CORE_EDGES: [number, number][] = [
  [0, 2], [0, 3], [0, 4], [0, 5],
  [1, 2], [1, 3], [1, 4], [1, 5],
  [2, 4], [4, 3], [3, 5], [5, 2],
];

function createRingPoints(radius: number, count: number, tiltX: number, tiltZ: number): Point3D[] {
  const pts: Point3D[] = [];
  for (let i = 0; i < count; i += 1) {
    const theta = (i / count) * Math.PI * 2;
    const base: Point3D = {
      x: Math.cos(theta) * radius,
      y: Math.sin(theta) * radius,
      z: 0,
    };
    pts.push(rotatePoint3D(base, tiltX, 0, tiltZ));
  }
  return pts;
}

const OUTER_RING = createRingPoints(1.62, 64, 1.15, 0.35);
const INNER_RING = createRingPoints(1.42, 56, -0.92, -0.45);

export function HeroOrbitalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });
  const dragRef = useRef({ active: false, lastX: 0, lastY: 0, offsetX: 0, offsetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;
    let width = 0;
    let height = 0;
    let angleY = 0.45;
    let angleX = 0.28;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const drawFrame = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const minDim = Math.min(width, height);
      const fov = minDim * 0.92;
      const viewerDistance = 4.35;

      // Subtle atmospheric studio illumination inside the vessel
      const violetGlow = ctx.createRadialGradient(
        cx - minDim * 0.08,
        cy - minDim * 0.08,
        minDim * 0.04,
        cx,
        cy,
        minDim * 0.56,
      );
      violetGlow.addColorStop(0, 'rgba(124, 92, 255, 0.18)');
      violetGlow.addColorStop(0.55, 'rgba(34, 211, 238, 0.05)');
      violetGlow.addColorStop(1, 'rgba(8, 9, 13, 0)');
      ctx.fillStyle = violetGlow;
      ctx.fillRect(0, 0, width, height);

      // Smooth pointer interpolation
      pointerRef.current.currentX +=
        (pointerRef.current.targetX - pointerRef.current.currentX) * 0.06;
      pointerRef.current.currentY +=
        (pointerRef.current.targetY - pointerRef.current.currentY) * 0.06;

      if (!reducedMotion) {
        angleY += 0.0032;
        angleX = 0.26 + Math.sin(time * 0.00055) * 0.1;
      }

      const rx = angleX + pointerRef.current.currentY * 0.45 + dragRef.current.offsetY;
      const ry = angleY + pointerRef.current.currentX * 0.55 + dragRef.current.offsetX;

      // Draw orbital rings
      const drawRing = (points: Point3D[], color: string, counterSpeed: number) => {
        const ringSpin = reducedMotion ? 0 : time * counterSpeed;
        const projected = points.map((p) => {
          const r = rotatePoint3D(p, rx * 0.7, ry * 0.7 + ringSpin);
          return projectPoint3D(r, fov, viewerDistance, cx, cy);
        });

        ctx.beginPath();
        for (let i = 0; i < projected.length; i += 1) {
          const pt = projected[i];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.closePath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Highlight one orbiting node along each ring
        const pulseIdx = Math.floor(((reducedMotion ? 0.2 : time * 0.00022) % 1) * projected.length);
        const orbitalNode = projected[pulseIdx];
        if (orbitalNode) {
          ctx.beginPath();
          ctx.arc(orbitalNode.x, orbitalNode.y, 2.8, 0, Math.PI * 2);
          ctx.fillStyle = color.includes('34, 211') ? '#22D3EE' : '#A78BFA';
          ctx.fill();
        }
      };

      drawRing(OUTER_RING, 'rgba(124, 92, 255, 0.24)', 0.00025);
      drawRing(INNER_RING, 'rgba(34, 211, 238, 0.20)', -0.00032);

      // Project outer architectural icosahedron
      const outerProjected = ICOSA_VERTICES.map((v) =>
        projectPoint3D(rotatePoint3D(v, rx, ry), fov, viewerDistance, cx, cy),
      );

      // Depth-sorted edges
      const sortedEdges = ICOSA_EDGES.map(([a, b]) => ({
        a: outerProjected[a],
        b: outerProjected[b],
        avgZ: (outerProjected[a].z + outerProjected[b].z) / 2,
      })).sort((e1, e2) => e2.avgZ - e1.avgZ);

      for (const edge of sortedEdges) {
        const depthFactor = Math.max(0.14, Math.min(0.88, (1.5 - edge.avgZ) / 2.6));
        const grad = ctx.createLinearGradient(edge.a.x, edge.a.y, edge.b.x, edge.b.y);
        grad.addColorStop(0, `rgba(167, 139, 250, ${depthFactor * 0.62})`);
        grad.addColorStop(1, `rgba(34, 211, 238, ${depthFactor * 0.45})`);

        ctx.beginPath();
        ctx.moveTo(edge.a.x, edge.a.y);
        ctx.lineTo(edge.b.x, edge.b.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = depthFactor > 0.55 ? 1.3 : 0.85;
        ctx.stroke();
      }

      // Inner counter-rotating octahedron core
      const coreProjected = CORE_VERTICES.map((v) =>
        projectPoint3D(rotatePoint3D(v, -rx * 1.25, -ry * 1.35), fov, viewerDistance, cx, cy),
      );

      for (const [aIdx, bIdx] of CORE_EDGES) {
        const a = coreProjected[aIdx];
        const b = coreProjected[bIdx];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = 'rgba(244, 245, 248, 0.32)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Crisp architectural vertices with depth-scaled luminescence
      const sortedVertices = [...outerProjected].sort((a, b) => b.z - a.z);
      for (let i = 0; i < sortedVertices.length; i += 1) {
        const v = sortedVertices[i];
        const depthAlpha = Math.max(0.25, Math.min(1, (1.4 - v.z) / 2.3));
        const radius = Math.max(1.8, (v.scale / fov) * 14);

        ctx.beginPath();
        ctx.arc(v.x, v.y, radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle =
          i % 3 === 0
            ? `rgba(34, 211, 238, ${depthAlpha * 0.18})`
            : `rgba(124, 92, 255, ${depthAlpha * 0.22})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(v.x, v.y, radius, 0, Math.PI * 2);
        ctx.fillStyle =
          i % 3 === 0
            ? `rgba(34, 211, 238, ${depthAlpha})`
            : `rgba(244, 245, 248, ${depthAlpha * 0.92})`;
        ctx.fill();
      }

      if (!reducedMotion) {
        rafId = window.requestAnimationFrame(drawFrame);
      }
    };

    rafId = window.requestAnimationFrame(drawFrame);

    return () => {
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    pointerRef.current.targetX = nx;
    pointerRef.current.targetY = ny;

    if (dragRef.current.active) {
      const dx = event.clientX - dragRef.current.lastX;
      const dy = event.clientY - dragRef.current.lastY;
      dragRef.current.offsetX += dx * 0.008;
      dragRef.current.offsetY += dy * 0.008;
      dragRef.current.lastX = event.clientX;
      dragRef.current.lastY = event.clientY;
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current.active = true;
    dragRef.current.lastX = event.clientX;
    dragRef.current.lastY = event.clientY;
  };

  const handlePointerUp = () => {
    dragRef.current.active = false;
  };

  const handlePointerLeave = () => {
    dragRef.current.active = false;
    pointerRef.current.targetX = 0;
    pointerRef.current.targetY = 0;
  };

  return (
    <div
      data-testid="hero-3d-sculpture"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      className="relative flex h-full min-h-[340px] w-full cursor-grab flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#12141C]/80 active:cursor-grabbing lg:min-h-[460px]"
    >
      {/* Architectural crosshair hairlines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(124,92,255,0.12),transparent_68%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-white/[0.04]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-white/[0.04]"
      />

      <div className="relative z-10 flex items-center justify-between px-6 pt-5 text-xs text-[#949EB2]">
        <span className="font-mono tracking-tight text-[#F4F5F8]/80">
          Cloud · AI · Systems
        </span>
        <span>Drag to rotate</span>
      </div>

      <canvas
        ref={canvasRef}
        aria-label="Interactive 3D architectural lattice symbolizing cloud and AI systems engineering"
        className="relative z-10 h-[270px] w-full sm:h-[340px] lg:h-[380px]"
      />

      <div className="relative z-10 flex items-center justify-between gap-4 border-t border-white/[0.06] px-6 py-4 text-xs text-[#949EB2]">
        <span>.NET Core · Microsoft Azure</span>
        <span>Copilot Studio · Claude</span>
      </div>
    </div>
  );
}
