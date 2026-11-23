import { useState } from 'react';
import { motion } from 'motion/react';
import { CAPABILITIES, type CapabilityItem } from '../data/portfolioData';

function CapabilityCard({
  item,
  delay,
}: {
  item: CapabilityItem;
  delay: number;
}) {
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setCoords({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-[#12141C] p-7 transition-colors duration-200 hover:border-white/[0.16]"
    >
      <div
        aria-hidden="true"
        style={{
          background: `radial-gradient(320px circle at ${coords.x}% ${coords.y}%, rgba(34, 211, 238, 0.09), transparent 62%)`,
          opacity: hovered ? 1 : 0,
        }}
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
      />

      <div className="relative z-10">
        <span className="font-mono text-xs tabular-nums text-[#22D3EE]">
          {item.index}.
        </span>
        <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-[#F4F5F8]">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#949EB2]">
          {item.summary}
        </p>
      </div>

      <p className="relative z-10 mt-7 border-t border-white/[0.06] pt-4 text-xs text-[#949EB2]">
        {item.disciplines.join(' · ')}
      </p>
    </motion.div>
  );
}

export function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="relative border-b border-white/[0.06] py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-wide text-[#A78BFA]">
              05 · What I Bring to the Table
            </p>
            <h2
              id="capabilities-heading"
              className="mt-4 font-display text-3xl font-semibold tracking-[-0.025em] text-[#F4F5F8] sm:text-4xl"
            >
              Product-minded engineering from architecture to automation.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#949EB2]">
            Bridging backend rigor, cloud infrastructure, and applied AI to
            deliver dependable software outcomes.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {CAPABILITIES.map((item, idx) => (
            <CapabilityCard key={item.id} item={item} delay={idx * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}
