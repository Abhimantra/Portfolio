import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { EXPERIENCE } from '../data/portfolioData';

export function ExperienceSection() {
  const [expandedIds, setExpandedIds] = useState<string[]>([EXPERIENCE[0].id]);

  const toggleItem = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative border-b border-white/[0.06] py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky left editorial intro */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-xs tracking-wide text-[#A78BFA]">
              04 · Career Timeline
            </p>
            <h2
              id="experience-heading"
              className="mt-4 font-display text-3xl font-semibold tracking-[-0.025em] text-[#F4F5F8] sm:text-4xl"
            >
              Experience shaped in enterprise scale.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[#949EB2]">
              Expand each role to inspect core responsibilities, focus areas, and
              the technologies applied across enterprise delivery.
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="relative lg:col-span-8">
            {/* Subtle vertical guide rail */}
            <div
              aria-hidden="true"
              className="absolute bottom-6 left-[15px] top-6 hidden w-px bg-gradient-to-b from-[#7C5CFF]/60 via-white/15 to-transparent sm:block"
            />

            <ol className="space-y-6">
              {EXPERIENCE.map((item, idx) => {
                const isExpanded = expandedIds.includes(item.id);
                const panelId = `experience-panel-${item.id}`;
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="relative sm:pl-12"
                  >
                    {/* Architectural timeline index node */}
                    <div
                      aria-hidden="true"
                      className={`absolute left-0 top-7 hidden h-8 w-8 items-center justify-center rounded-full border font-mono text-[11px] tabular-nums sm:flex ${
                        isExpanded
                          ? 'border-[#7C5CFF] bg-[#12141C] text-[#F4F5F8]'
                          : 'border-white/15 bg-[#08090D] text-[#949EB2]'
                      }`}
                    >
                      0{idx + 1}
                    </div>

                    <div
                      className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
                        isExpanded
                          ? 'border-white/[0.15] bg-[#12141C]'
                          : 'border-white/[0.08] bg-[#12141C]/65 hover:border-white/[0.14]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        aria-expanded={isExpanded}
                        aria-controls={panelId}
                        className="flex w-full items-start justify-between gap-4 p-6 text-left sm:p-8 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#7C5CFF]"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#949EB2]">
                            <span className="font-mono tabular-nums text-[#22D3EE]">
                              {item.period}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{item.role}</span>
                          </div>
                          <h3 className="mt-2.5 font-display text-xl font-semibold tracking-tight text-[#F4F5F8] sm:text-2xl">
                            {item.company}
                          </h3>
                          <p className="mt-3 text-sm leading-relaxed text-[#949EB2]">
                            {item.summary}
                          </p>
                        </div>

                        <span
                          aria-hidden="true"
                          className={`mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#0B0C12] text-[#949EB2] transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-[#F4F5F8]' : ''
                          }`}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            id={panelId}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="border-t border-white/[0.08] px-6 pb-7 pt-6 sm:px-8 sm:pb-8"
                          >
                            <p className="font-mono text-xs text-[#A78BFA]">
                              Core Focus Areas
                            </p>
                            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-[#D0D6E2]">
                              {item.focusAreas.map((area) => (
                                <li key={area} className="flex items-baseline gap-3">
                                  <span aria-hidden="true" className="text-[#7C5CFF]">
                                    —
                                  </span>
                                  <span>{area}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="mt-6 border-t border-white/[0.06] pt-5">
                              <p className="text-xs text-[#949EB2]">
                                <span className="mr-2 font-medium text-[#F4F5F8]">
                                  Core Stack:{' '}
                                </span>
                                {item.technologies.join(' · ')}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
