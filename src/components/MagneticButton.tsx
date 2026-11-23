import { type ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  strength?: number;
  ariaLabel?: string;
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  type = 'button',
  strength = 0.22,
  ariaLabel,
  disabled = false,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 280, damping: 20, mass: 0.3 });
  const y = useSpring(rawY, { stiffness: 280, damping: 20, mass: 0.3 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    rawX.set(offsetX * strength);
    rawY.set(offsetY * strength);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex shrink-0"
    >
      {href ? (
        <a
          href={href}
          onClick={onClick}
          aria-label={ariaLabel}
          className={className}
        >
          {children}
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick}
          aria-label={ariaLabel}
          disabled={disabled}
          className={className}
        >
          {children}
        </button>
      )}
    </motion.div>
  );
}
