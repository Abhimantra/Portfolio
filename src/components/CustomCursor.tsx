import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'interactive'>('default');

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);

  const ringX = useSpring(pointerX, { stiffness: 320, damping: 28, mass: 0.4 });
  const ringY = useSpring(pointerY, { stiffness: 320, damping: 28, mass: 0.4 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) {
      return;
    }

    setEnabled(true);

    const handleMove = (event: MouseEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setIsVisible(true);

      const target = event.target as HTMLElement | null;
      const interactive = target?.closest(
        'a, button, input, textarea, select, [data-cursor="interactive"]',
      );
      setCursorVariant(interactive ? 'interactive' : 'default');
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [pointerX, pointerY]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 hidden lg:block">
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: cursorVariant === 'interactive' ? 1.65 : 1,
          borderColor:
            cursorVariant === 'interactive'
              ? 'rgba(124, 92, 255, 0.85)'
              : 'rgba(244, 245, 248, 0.28)',
          backgroundColor:
            cursorVariant === 'interactive'
              ? 'rgba(124, 92, 255, 0.08)'
              : 'rgba(244, 245, 248, 0)',
        }}
        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border"
      />
      <motion.div
        style={{
          x: pointerX,
          y: pointerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: cursorVariant === 'interactive' ? 0.5 : 1,
        }}
        transition={{ duration: 0.12 }}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-[#22D3EE]"
      />
    </div>
  );
}
