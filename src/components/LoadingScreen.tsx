import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';

interface LoadingScreenProps {
  visible: boolean;
  onComplete: () => void;
}

export function LoadingScreen({ visible, onComplete }: LoadingScreenProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => {
      onComplete();
    }, 850);
    return () => window.clearTimeout(timer);
  }, [visible, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08090D] px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <span className="font-display text-2xl font-semibold tracking-tight text-[#F4F5F8] sm:text-3xl">
              {PROFILE.name}
            </span>
            <span className="mt-2 text-sm text-[#949EB2]">
              {PROFILE.title}
            </span>
            <div className="mt-8 h-px w-48 overflow-hidden bg-white/10">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'left center' }}
                className="h-full w-full bg-gradient-to-r from-[#7C5CFF] to-[#22D3EE]"
              />
            </div>
            <button
              type="button"
              onClick={onComplete}
              className="mt-6 text-xs text-[#949EB2] transition-colors hover:text-[#F4F5F8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C5CFF]"
            >
              Skip intro
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
