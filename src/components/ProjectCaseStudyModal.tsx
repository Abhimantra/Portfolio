import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Layers, X } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioData';

interface ProjectCaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectCaseStudyModal({
  project,
  onClose,
}: ProjectCaseStudyModalProps) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md sm:p-6 lg:p-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative my-auto max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/[0.12] bg-[#0E1017] shadow-2xl"
          >
            {/* Top sticky bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/[0.08] bg-[#0E1017]/95 px-6 py-4 backdrop-blur-xl sm:px-8">
              <div className="flex items-center gap-2.5 text-xs text-[#949EB2]">
                <span className="font-mono tabular-nums text-[#22D3EE]">
                  Case Study {project.index}
                </span>
                <span aria-hidden="true">·</span>
                <span>{project.category}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#12141C] text-[#F4F5F8] transition-colors hover:border-white/25 hover:bg-[#1A1D28] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C5CFF]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Hero Artwork Banner */}
            <div className="relative aspect-[21/9] w-full overflow-hidden bg-[#08090D]">
              {!imageFailed ? (
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setImageFailed(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#12141C] to-[#08090D]">
                  <Layers className="h-8 w-8 text-[#7C5CFF]/70" aria-hidden="true" />
                </div>
              )}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E1017] via-[#0E1017]/35 to-transparent"
              />
            </div>

            {/* Case Study Editorial Body */}
            <div className="px-6 pb-10 pt-6 sm:px-8 sm:pb-12">
              <h2
                id="case-study-title"
                className="font-display text-2xl font-semibold tracking-tight text-[#F4F5F8] sm:text-3xl"
              >
                {project.title}
              </h2>
              <p className="mt-2.5 text-base text-[#949EB2]">
                {project.tagline}
              </p>

              {/* Verified metrics strip if present */}
              {project.metrics && (
                <div className="mt-8 grid grid-cols-3 gap-6 border-y border-white/[0.08] py-5">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="font-mono text-2xl font-medium tabular-nums text-[#F4F5F8]">
                        {metric.value}
                      </p>
                      <p className="mt-1 text-xs text-[#949EB2]">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Problem & Solution */}
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="font-mono text-xs text-[#A78BFA]">
                    The Problem
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#D0D6E2]">
                    {project.caseStudy.problem}
                  </p>
                </div>
                <div>
                  <h3 className="font-mono text-xs text-[#22D3EE]">
                    The Solution
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#D0D6E2]">
                    {project.caseStudy.solution}
                  </p>
                </div>
              </div>

              {/* My Contribution */}
              <div className="mt-10 border-t border-white/[0.08] pt-8">
                <h3 className="font-mono text-xs text-[#A78BFA]">
                  My Contribution
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#D0D6E2]">
                  {project.caseStudy.contribution.map((item) => (
                    <li key={item} className="flex items-baseline gap-3">
                      <span aria-hidden="true" className="text-[#7C5CFF]">
                        —
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture Overview Flow */}
              <div className="mt-10 border-t border-white/[0.08] pt-8">
                <h3 className="font-mono text-xs text-[#22D3EE]">
                  Architecture Overview
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#949EB2]">
                  {project.caseStudy.architectureSummary}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {project.caseStudy.architectureFlow.map((node, index) => (
                    <div
                      key={node.stage}
                      className="relative flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#12141C] p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] tabular-nums text-[#A78BFA]">
                          Stage {node.stage}
                        </span>
                        {index < project.caseStudy.architectureFlow.length - 1 && (
                          <ArrowRight
                            className="hidden h-3.5 w-3.5 text-white/25 lg:block"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <div className="mt-4">
                        <p className="font-display text-sm font-semibold text-[#F4F5F8]">
                          {node.label}
                        </p>
                        <p className="mt-1.5 text-xs leading-relaxed text-[#949EB2]">
                          {node.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used */}
              <div className="mt-10 border-t border-white/[0.08] pt-8">
                <h3 className="font-mono text-xs text-[#949EB2]">
                  Technologies Used
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#F4F5F8]">
                  {project.technologies.join(' · ')}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
