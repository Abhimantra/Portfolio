import { useRef } from 'react';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
import { calculateScrollPercent } from '../utils/portfolioLogic';

export function ScrollProgressBar() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  const scaleX = prefersReducedMotion ? scrollYProgress : smoothProgress;
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPercentRef = useRef<number>(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const percent = calculateScrollPercent(latest);
    if (percent !== lastPercentRef.current && containerRef.current) {
      lastPercentRef.current = percent;
      containerRef.current.setAttribute('aria-valuenow', String(percent));
    }
  });

  return (
    <div
      ref={containerRef}
      role="progressbar"
      aria-label="Portfolio scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      data-testid="scroll-progress-bar"
      className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[2px] bg-white/[0.04]"
    >
      <motion.div
        data-testid="scroll-progress-fill"
        style={{ scaleX, transformOrigin: '0% 50%' }}
        className="h-full w-full bg-gradient-to-r from-[#7C5CFF] via-[#A78BFA] to-[#22D3EE] shadow-[0_0_8px_rgba(124,92,255,0.45)]"
      />
    </div>
  );
}
