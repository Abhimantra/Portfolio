import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Capabilities', href: '#capabilities' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['top', ...NAV_LINKS.map((link) => link.href.slice(1)), 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          const id = visible[0].target.id;
          setActiveSection(id === 'top' || id === 'contact' ? '' : id);
        }
      },
      { rootMargin: '-20% 0px -45% 0px', threshold: [0.05, 0.25, 0.5] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-200 ${
        scrolled || mobileOpen
          ? 'border-b border-white/[0.08] bg-[#08090D]/88 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-6 lg:px-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-[#F4F5F8] transition-opacity hover:opacity-85 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C5CFF]"
        >
          {PROFILE.firstName}
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`group relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C5CFF] ${
                  isActive ? 'text-[#F4F5F8]' : 'text-[#949EB2] hover:text-[#F4F5F8]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-px bg-[#7C5CFF] transition-transform duration-200 ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action (desktop) + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden items-center gap-1.5 rounded-lg bg-[#F4F5F8] px-4 py-2 text-xs font-semibold text-[#08090D] transition-colors duration-200 hover:bg-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C5CFF] md:inline-flex"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-[#12141C] text-[#F4F5F8] transition-colors hover:border-white/20 md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C5CFF]"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive iOS-style mobile navigation drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/[0.08] bg-[#08090D]/98 px-6 pb-8 pt-4 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col divide-y divide-white/[0.06]">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-[48px] items-center justify-between text-base font-medium text-[#F4F5F8] transition-colors hover:text-[#A78BFA]"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-[#949EB2]" aria-hidden="true" />
                </a>
              ))}
            </div>
            <div className="mt-6">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#7C5CFF] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#6D4AFF]"
              >
                <span>Let&apos;s Connect</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
