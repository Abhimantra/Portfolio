import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import {
  PROJECTS,
  type ProjectItem,
  TECH_CATEGORIES,
  TECH_STACK,
  type TechCategoryId,
  type TechItem,
} from '../data/portfolioData';
import {
  filterTechnologies,
  getProjectsForTechnology,
} from '../utils/portfolioLogic';

interface TechStackSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export function TechStackSection({ onSelectProject }: TechStackSectionProps) {
  const [activeCategory, setActiveCategory] = useState<TechCategoryId>('all');
  const [selectedTechId, setSelectedTechId] = useState<string>(TECH_STACK[0].id);

  const visibleItems = useMemo(
    () => filterTechnologies(TECH_STACK, activeCategory),
    [activeCategory],
  );

  const activeTech: TechItem = useMemo(() => {
    const match = visibleItems.find((item) => item.id === selectedTechId);
    return match ?? visibleItems[0] ?? TECH_STACK[0];
  }, [visibleItems, selectedTechId]);

  const relatedProjects = useMemo(
    () => getProjectsForTechnology(PROJECTS, activeTech.name),
    [activeTech],
  );

  const handleCategoryChange = (category: TechCategoryId) => {
    setActiveCategory(category);
    const nextItems = filterTechnologies(TECH_STACK, category);
    if (nextItems.length > 0 && !nextItems.some((item) => item.id === selectedTechId)) {
      setSelectedTechId(nextItems[0].id);
    }
  };

  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="relative border-b border-white/[0.06] py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-wide text-[#A78BFA]">
              02 · Technology Ecosystem
            </p>
            <h2
              id="stack-heading"
              className="mt-4 font-display text-3xl font-semibold tracking-[-0.025em] text-[#F4F5F8] sm:text-4xl"
            >
              An integrated stack built for production scale.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#949EB2]">
            Select any domain or technology to inspect how it fits into my
            engineering architecture and links to featured systems.
          </p>
        </div>

        {/* Interactive segmented category tabs */}
        <div
          role="tablist"
          aria-label="Filter technologies by engineering domain"
          className="mt-10 flex flex-wrap gap-2 border-b border-white/[0.08] pb-5"
        >
          {TECH_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            const count = filterTechnologies(TECH_STACK, category.id).length;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleCategoryChange(category.id)}
                className={`inline-flex min-h-[40px] items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C5CFF] ${
                  isActive
                    ? 'bg-[#F4F5F8] text-[#08090D]'
                    : 'bg-[#12141C] text-[#949EB2] hover:bg-[#171A24] hover:text-[#F4F5F8]'
                }`}
              >
                <span>{category.label}</span>
                <span
                  className={`font-mono text-[11px] tabular-nums ${
                    isActive ? 'text-[#08090D]/65' : 'text-[#949EB2]/65'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Asymmetric Interactive Grid + Active Spotlight Inspector */}
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-12">
          {/* Interactive Technology Tiles */}
          <div
            data-testid="tech-stack-grid"
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-8"
          >
            {visibleItems.map((item) => {
              const isSelected = activeTech.id === item.id;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  layout="position"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedTechId(item.id)}
                  onMouseEnter={() => setSelectedTechId(item.id)}
                  aria-pressed={isSelected}
                  className={`group flex min-h-[96px] flex-col justify-between rounded-xl border p-4 text-left transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C5CFF] ${
                    isSelected
                      ? 'border-[#7C5CFF]/70 bg-[#171A24]'
                      : 'border-white/[0.07] bg-[#12141C]/80 hover:border-white/[0.16] hover:bg-[#151822]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] text-[#949EB2]">
                      {item.categoryLabel}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full transition-opacity ${
                        isSelected
                          ? 'bg-[#22D3EE] opacity-100'
                          : 'bg-white/20 opacity-0 group-hover:opacity-60'
                      }`}
                    />
                  </div>
                  <div className="mt-4">
                    <p className="font-display text-sm font-semibold text-[#F4F5F8] sm:text-[0.95rem]">
                      {item.name}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-[#949EB2]">
                      {item.role}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right Spotlight Inspector Panel */}
          <aside
            aria-live="polite"
            className="rounded-2xl border border-white/[0.08] bg-[#12141C] p-6 lg:sticky lg:top-24 lg:col-span-4 lg:p-7"
          >
            <p className="font-mono text-xs text-[#22D3EE]">
              {activeTech.categoryLabel} · {activeTech.role}
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[#F4F5F8]">
              {activeTech.name}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#949EB2]">
              {activeTech.summary}
            </p>

            <div className="mt-8 border-t border-white/[0.08] pt-6">
              <p className="text-xs font-medium text-[#F4F5F8]">
                Applied in Featured Work
              </p>
              {relatedProjects.length > 0 ? (
                <div className="mt-3 flex flex-col divide-y divide-white/[0.06]">
                  {relatedProjects.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="group flex items-center justify-between gap-3 py-3 text-left transition-colors hover:text-[#A78BFA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C5CFF]"
                    >
                      <span className="text-sm text-[#D0D6E2] group-hover:text-[#F4F5F8]">
                        <span className="mr-2 font-mono text-xs text-[#949EB2]">
                          {project.index}
                        </span>{' '}
                        {project.title}
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-[#949EB2] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#22D3EE]"
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-xs leading-relaxed text-[#949EB2]">
                  Used across core application development, UI delivery, and
                  day-to-day enterprise engineering workflows.
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
