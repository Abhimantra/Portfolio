import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Layers } from 'lucide-react';
import { PROJECTS, type ProjectItem } from '../data/portfolioData';
import { resolveAssetPath } from '../utils/portfolioLogic';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

interface TiltProjectCardProps {
  project: ProjectItem;
  featured?: boolean;
  onSelect: (project: ProjectItem) => void;
}

function TiltProjectCard({ project, featured = false, onSelect }: TiltProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (0.5 - py) * 6,
      rotateY: (px - 0.5) * 6,
      glareX: px * 100,
      glareY: py * 100,
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={featured ? 'lg:col-span-2' : 'lg:col-span-1'}
    >
      <div
        ref={cardRef}
        data-cursor="interactive"
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: hovered
            ? `perspective(1100px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
            : 'perspective(1100px) rotateX(0deg) rotateY(0deg)',
          transition: hovered ? 'transform 120ms ease-out' : 'transform 320ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#12141C] transition-colors duration-200 hover:border-white/[0.18]"
      >
        {/* Subtle specular pointer sheen */}
        <div
          aria-hidden="true"
          style={{
            background: `radial-gradient(480px circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(124, 92, 255, 0.12), transparent 60%)`,
            opacity: hovered ? 1 : 0,
          }}
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-200"
        />

        <div
          className={`grid h-full ${
            featured ? 'lg:grid-cols-12' : 'grid-cols-1'
          }`}
        >
          {/* Visual Media Frame */}
          <div
            className={`relative overflow-hidden bg-[#0B0C12] ${
              featured
                ? 'aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:h-full'
                : 'aspect-[16/10]'
            }`}
          >
            {!imageFailed ? (
              <img
                src={resolveAssetPath(project.image, import.meta.env.BASE_URL)}
                alt={project.imageAlt}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setImageFailed(true)}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#12141C] via-[#0D101B] to-[#08090D] p-8 text-center">
                <Layers className="h-8 w-8 text-[#7C5CFF]/70" aria-hidden="true" />
                <p className="mt-3 font-display text-sm font-medium text-[#F4F5F8]">
                  {project.title}
                </p>
              </div>
            )}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#12141C] via-[#12141C]/20 to-transparent"
            />
          </div>

          {/* Editorial Content Column */}
          <div
            className={`relative z-20 flex flex-col justify-between p-6 sm:p-8 ${
              featured ? 'lg:col-span-5' : ''
            }`}
          >
            <div>
              {/* Quiet unboxed metadata line */}
              <div className="flex items-center gap-2 text-xs text-[#949EB2]">
                <span className="font-mono tabular-nums text-[#22D3EE]">
                  {project.index}
                </span>
                <span aria-hidden="true">·</span>
                <span>{project.category}</span>
              </div>

              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[#F4F5F8]">
                {project.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#949EB2]">
                {project.description}
              </p>

              {/* Verified metrics (only shown when supplied, e.g. Project 01) */}
              {project.metrics && (
                <div className="mt-6 grid grid-cols-3 gap-4 border-y border-white/[0.08] py-4">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="font-mono text-lg font-medium tabular-nums text-[#F4F5F8]">
                        {metric.value}
                      </p>
                      <p className="mt-0.5 text-[11px] text-[#949EB2]">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Concise bullet highlights */}
              <ul className="mt-5 space-y-2 text-xs text-[#D0D6E2]">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-baseline gap-2.5">
                    <span
                      aria-hidden="true"
                      className="text-[#7C5CFF]"
                    >
                      —
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 border-t border-white/[0.08] pt-5">
              {/* Unboxed technology list with typographic separators */}
              <p className="text-xs leading-relaxed text-[#949EB2]">
                {project.technologies.join(' · ')}
              </p>

              <button
                type="button"
                onClick={() => onSelect(project)}
                aria-label={`Read case study for ${project.title}`}
                className="mt-5 inline-flex min-h-[40px] items-center gap-2 text-sm font-semibold text-[#F4F5F8] transition-colors hover:text-[#A78BFA] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C5CFF]"
              >
                <span>View Case Study</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative border-b border-white/[0.06] py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-wide text-[#A78BFA]">
              03 · Selected Work
            </p>
            <h2
              id="projects-heading"
              className="mt-4 font-display text-3xl font-semibold tracking-[-0.025em] text-[#F4F5F8] sm:text-4xl"
            >
              Systems engineered for clarity, automation, and scale.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#949EB2]">
            Open any project to explore the engineering problem, architectural
            solution, personal contribution, and system flow.
          </p>
        </div>

        {/* Dynamic Bento Showcase: Lead full-width spotlight + 2x2 architectural grid */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {PROJECTS.map((project, idx) => (
            <TiltProjectCard
              key={project.id}
              project={project}
              featured={idx === 0}
              onSelect={onSelectProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
