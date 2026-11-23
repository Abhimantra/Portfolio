import { motion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';

const PILLARS = [
  {
    index: '01',
    title: 'Scalable Software Foundations',
    body: 'Over 4 years of hands-on engineering across C#, .NET Core, ASP.NET Core MVC, SQL Server, and modern React—prioritizing clarity, resilience, and long-term maintainability.',
  },
  {
    index: '02',
    title: 'Cloud-Native Architecture',
    body: 'Designing distributed Microsoft Azure solutions with Functions, Service Bus, Event Hub, Key Vault, Storage, and automated Azure DevOps CI/CD release workflows.',
  },
  {
    index: '03',
    title: 'Applied AI & Enterprise Automation',
    body: 'Turning everyday operational complexity into intelligent workflows through Microsoft Copilot Studio, Claude Projects, agentic workflows, PowerApps, Power Automate, and SharePoint.',
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative border-b border-white/[0.06] py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Asymmetric Editorial Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="font-mono text-xs tracking-wide text-[#A78BFA]">
              01 · About Me
            </p>
            <h2
              id="about-heading"
              className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-[-0.025em] text-[#F4F5F8] sm:text-4xl lg:text-[2.65rem]"
            >
              Not just writing code. Building possibilities.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-[#949EB2]">
              {PROFILE.name} — {PROFILE.experienceYears} of enterprise software
              development, cloud engineering, and AI automation.
            </p>
          </motion.div>

          {/* Editorial Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="max-w-2xl space-y-5 text-base leading-relaxed text-[#D0D6E2] sm:text-[1.0625rem]">
              <p>
                Great engineering starts with understanding the real human and
                business problem behind every system. Across four-plus years of
                building enterprise software, I have focused on turning complex
                requirements into dependable, well-structured products that teams
                actually enjoy using.
              </p>
              <p className="text-[#949EB2]">
                My work sits at the intersection of robust backend engineering,
                Microsoft Azure cloud architecture, and modern AI automation—from
                modernizing legacy .NET Framework platforms into high-performing
                .NET Core architectures to designing AI agents and multi-stage
                enterprise workflows that eliminate repetitive friction.
              </p>
            </div>

            {/* Clean hairline-separated architectural pillars (zero nested cards) */}
            <div className="mt-12 divide-y divide-white/[0.08] border-t border-white/[0.08]">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.index}
                  className="grid gap-3 py-6 sm:grid-cols-12 sm:gap-6"
                >
                  <div className="flex items-baseline gap-3 sm:col-span-5">
                    <span className="font-mono text-xs tabular-nums text-[#22D3EE]">
                      {pillar.index}
                    </span>
                    <h3 className="font-display text-base font-medium text-[#F4F5F8]">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#949EB2] sm:col-span-7">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
