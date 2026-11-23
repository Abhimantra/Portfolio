import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowDown, ArrowRight, Check, Pencil, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { HeroOrbitalCanvas } from './HeroOrbitalCanvas';
import { MagneticButton } from './MagneticButton';

const AVAILABILITY_STORAGE_KEY = 'abhimantra_portfolio_availability_v1';

function readInitialAvailability(): string {
  try {
    const saved = window.localStorage.getItem(AVAILABILITY_STORAGE_KEY);
    if (saved && saved.trim().length > 0) {
      return saved.trim();
    }
  } catch {
    // Ignore storage unavailability
  }
  return PROFILE.defaultAvailability;
}

export function HeroSection() {
  const [availability, setAvailability] = useState<string>(readInitialAvailability);
  const [isEditingAvailability, setIsEditingAvailability] = useState(false);
  const [draftAvailability, setDraftAvailability] = useState<string>(availability);

  const saveAvailability = (value: string) => {
    const next = value.trim() || PROFILE.defaultAvailability;
    setAvailability(next);
    setDraftAvailability(next);
    setIsEditingAvailability(false);
    try {
      window.localStorage.setItem(AVAILABILITY_STORAGE_KEY, next);
    } catch {
      // Ignore storage unavailability
    }
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-white/[0.06] pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
    >
      {/* Subtle architectural grid & ambient studio lighting */}
      <div
        aria-hidden="true"
        className="bg-architectural-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_20%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full bg-[#7C5CFF]/14 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-32 right-1/6 h-[380px] w-[380px] rounded-full bg-[#22D3EE]/8 blur-[130px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Balanced 2-column architectural split */}
        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Typographic hierarchy */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              {/* Editable availability indicator (clean editorial typography, zero pulsing dots) */}
              <div className="relative mb-8 inline-block">
                <div className="flex flex-col gap-1.5 text-sm text-[#949EB2] sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-[#22D3EE]">
                      {availability}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setDraftAvailability(availability);
                        setIsEditingAvailability((prev) => !prev);
                      }}
                      aria-expanded={isEditingAvailability}
                      aria-label="Edit availability status"
                      className="inline-flex items-center gap-1 text-xs text-[#949EB2] underline-offset-4 transition-colors hover:text-[#F4F5F8] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C5CFF]"
                    >
                      <Pencil className="h-3 w-3" aria-hidden="true" />
                      <span>Edit</span>
                    </button>
                  </div>
                  <span aria-hidden="true" className="hidden text-white/20 sm:inline">·</span>
                  <span className="text-xs text-[#949EB2] sm:text-sm">
                    {PROFILE.title}
                  </span>
                </div>

                <AnimatePresence>
                  {isEditingAvailability && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.16 }}
                      className="mt-3 w-full max-w-md rounded-xl border border-white/12 bg-[#12141C] p-4 shadow-2xl"
                    >
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="availability-input"
                          className="text-xs font-medium text-[#F4F5F8]"
                        >
                          Availability status
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsEditingAvailability(false)}
                          aria-label="Close availability editor"
                          className="rounded p-1 text-[#949EB2] transition-colors hover:text-[#F4F5F8]"
                        >
                          <X className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          saveAvailability(draftAvailability);
                        }}
                        className="mt-2.5 flex gap-2"
                      >
                        <input
                          id="availability-input"
                          type="text"
                          value={draftAvailability}
                          onChange={(e) => setDraftAvailability(e.target.value)}
                          maxLength={60}
                          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#08090D] px-3 py-2 text-xs text-[#F4F5F8] placeholder-[#949EB2]/60 focus:border-[#7C5CFF] focus:outline-none"
                          placeholder="Available for new opportunities"
                        />
                        <button
                          type="submit"
                          aria-label="Save availability status"
                          className="inline-flex items-center gap-1 rounded-lg bg-[#7C5CFF] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#6D4AFF] whitespace-nowrap shrink-0"
                        >
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Save</span>
                        </button>
                      </form>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
                        {PROFILE.availabilityPresets.map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => saveAvailability(preset)}
                            className="text-left text-[#949EB2] transition-colors hover:text-[#22D3EE]"
                          >
                            {preset}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Oversized display headline */}
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[clamp(2.2rem,3.85vw,3.65rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#F4F5F8]"
              >
                <span className="block">{PROFILE.heroHeadlineLine1}</span>
                <span className="mt-1.5 block bg-gradient-to-r from-[#F4F5F8] via-[#DDD6FE] to-[#22D3EE] bg-clip-text text-transparent">
                  {PROFILE.heroHeadlineLine2}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-7 max-w-xl text-base leading-relaxed text-[#949EB2] sm:text-lg"
              >
                {PROFILE.heroSubheadline}
              </motion.p>
            </div>

            {/* Primary & Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                href="#projects"
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-xl bg-[#7C5CFF] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#6D4AFF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C5CFF]"
              >
                <span>Explore My Work</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>

              <MagneticButton
                href="#contact"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/14 bg-[#12141C] px-6 py-3 text-sm font-semibold text-[#F4F5F8] transition-colors duration-200 hover:border-white/28 hover:bg-[#171A24] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C5CFF]"
              >
                <span>Let&apos;s Connect</span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right column: Interactive 3D visual container matching height */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <HeroOrbitalCanvas />
          </motion.div>
        </div>

        {/* Full-width architectural proof & scroll row below hero split */}
        <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/[0.08] pt-8 sm:grid-cols-4 lg:mt-20">
          <div>
            <p className="font-mono text-2xl font-medium tabular-nums text-[#F4F5F8]">
              4+
            </p>
            <p className="mt-1 text-xs text-[#949EB2]">
              Years in Software Engineering
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl font-medium tabular-nums text-[#F4F5F8]">
              .NET &amp; Azure
            </p>
            <p className="mt-1 text-xs text-[#949EB2]">
              Cloud-Native Enterprise Core
            </p>
          </div>
          <div>
            <p className="font-mono text-2xl font-medium tabular-nums text-[#F4F5F8]">
              AI Agents
            </p>
            <p className="mt-1 text-xs text-[#949EB2]">
              Copilot Studio &amp; Claude Projects
            </p>
          </div>
          <div className="flex items-end justify-between sm:justify-end">
            <a
              href="#about"
              className="group inline-flex items-center gap-2 text-xs font-medium text-[#949EB2] transition-colors hover:text-[#F4F5F8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C5CFF]"
            >
              <span>Scroll to explore</span>
              <ArrowDown
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
