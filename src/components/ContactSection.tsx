import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Mail,
  Send,
} from 'lucide-react';
import {
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  TECH_STACK,
} from '../data/portfolioData';
import {
  type ContactFormValues,
  generateResumeText,
  validateContactForm,
} from '../utils/portfolioLogic';
import { MagneticButton } from './MagneticButton';

const INITIAL_FORM: ContactFormValues = {
  name: '',
  email: '',
  topic: 'Engineering Role',
  message: '',
};

const TOPIC_OPTIONS = [
  'Engineering Role',
  'AI Agents & Automation',
  'Cloud & .NET Architecture',
  'General Inquiry',
];

export function ContactSection() {
  const [formValues, setFormValues] = useState<ContactFormValues>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [submittedRecord, setSubmittedRecord] = useState<ContactFormValues | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [resumeDownloaded, setResumeDownloaded] = useState(false);

  const handleFieldChange = (
    field: keyof ContactFormValues,
    value: string,
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateContactForm(formValues);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmittedRecord({
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      topic: formValues.topic,
      message: formValues.message.trim(),
    });
    setFormValues(INITIAL_FORM);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.contact.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    }
  };

  const handleDownloadResume = () => {
    const resumeText = generateResumeText(
      PROFILE,
      EXPERIENCE,
      PROJECTS,
      TECH_STACK,
    );
    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'Abhimantra-Singh-Rathore-Resume.txt';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setResumeDownloaded(true);
    window.setTimeout(() => setResumeDownloaded(false), 2600);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative pt-24 pb-12 sm:pt-28 lg:pt-32"
    >
      {/* Ambient closing gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[380px] max-w-4xl rounded-full bg-[#7C5CFF]/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Direct Channels & Resume */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between lg:col-span-5"
          >
            <div>
              <p className="font-mono text-xs tracking-wide text-[#A78BFA]">
                06 · Contact
              </p>
              <h2
                id="contact-heading"
                className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-[#F4F5F8] sm:text-4xl lg:text-[2.65rem]"
              >
                <span className="block">Have an interesting problem?</span>
                <span className="mt-1.5 block text-[#949EB2]">
                  Let&apos;s build something remarkable.
                </span>
              </h2>

              <p className="mt-6 text-sm leading-relaxed text-[#949EB2]">
                Whether you are hiring for a software engineering role, exploring
                enterprise AI agents, or modernizing cloud systems, feel free to
                reach out directly.
              </p>

              {/* Direct links & copyable email */}
              <div className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                <div className="flex items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <p className="text-xs text-[#949EB2]">Email</p>
                    <a
                      href={`mailto:${PROFILE.contact.email}`}
                      className="mt-0.5 block truncate text-sm font-medium text-[#F4F5F8] transition-colors hover:text-[#22D3EE]"
                    >
                      {PROFILE.contact.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-white/10 bg-[#12141C] px-3 py-1.5 text-xs font-medium text-[#F4F5F8] transition-colors hover:border-white/25 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C5CFF]"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#22D3EE]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[#949EB2]" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={PROFILE.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-[#22D3EE]"
                >
                  <div className="min-w-0">
                    <p className="text-xs text-[#949EB2]">LinkedIn</p>
                    <p className="mt-0.5 truncate text-sm font-medium text-[#F4F5F8] group-hover:text-[#22D3EE]">
                      {PROFILE.contact.linkedinLabel}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-[#949EB2] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#22D3EE]"
                    aria-hidden="true"
                  />
                </a>

                {PROFILE.contact.githubUrl && PROFILE.contact.githubLabel && (
                  <a
                    href={PROFILE.contact.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-[#22D3EE]"
                  >
                    <div className="min-w-0">
                      <p className="text-xs text-[#949EB2]">GitHub</p>
                      <p className="mt-0.5 truncate text-sm font-medium text-[#F4F5F8] group-hover:text-[#22D3EE]">
                        {PROFILE.contact.githubLabel}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-[#949EB2] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#22D3EE]"
                      aria-hidden="true"
                    />
                  </a>
                )}
              </div>

              {/* Download Resume CTA */}
              <div className="mt-8">
                <MagneticButton
                  onClick={handleDownloadResume}
                  className="inline-flex min-h-[48px] items-center gap-2.5 rounded-xl border border-white/14 bg-[#12141C] px-5 py-3 text-sm font-semibold text-[#F4F5F8] transition-colors duration-200 hover:border-[#7C5CFF]/60 hover:bg-[#171A24] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C5CFF]"
                >
                  {resumeDownloaded ? (
                    <>
                      <Check className="h-4 w-4 text-[#22D3EE]" aria-hidden="true" />
                      <span>Resume Downloaded</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 text-[#A78BFA]" aria-hidden="true" />
                      <span>Download Resume</span>
                    </>
                  )}
                </MagneticButton>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-white/[0.08] bg-[#12141C] p-6 sm:p-8 lg:p-10">
              {submittedRecord ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex flex-col items-start py-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#22D3EE]">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-[#F4F5F8]">
                    Message prepared for {PROFILE.firstName}
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#949EB2]">
                    Thank you, {submittedRecord.name}. Your inquiry regarding{' '}
                    <span className="text-[#F4F5F8]">{submittedRecord.topic}</span>{' '}
                    has been recorded cleanly. You can also open it directly in
                    your email client below.
                  </p>

                  <div className="mt-6 w-full rounded-xl border border-white/[0.08] bg-[#0B0C12] p-4 text-xs leading-relaxed text-[#949EB2]">
                    <p className="text-[#F4F5F8]">
                      From: {submittedRecord.name} ({submittedRecord.email})
                    </p>
                    <p className="mt-2 whitespace-pre-wrap">{submittedRecord.message}</p>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <a
                      href={`mailto:${PROFILE.contact.email}?subject=${encodeURIComponent(
                        `Portfolio Inquiry: ${submittedRecord.topic} — ${submittedRecord.name}`,
                      )}&body=${encodeURIComponent(
                        `From: ${submittedRecord.name} (${submittedRecord.email})\n\n${submittedRecord.message}`,
                      )}`}
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#7C5CFF] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#6D4AFF] whitespace-nowrap shrink-0"
                    >
                      <span>Open in Email App</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmittedRecord(null)}
                      className="inline-flex min-h-[44px] items-center rounded-xl border border-white/12 px-5 py-2.5 text-sm font-medium text-[#F4F5F8] transition-colors hover:border-white/25 whitespace-nowrap shrink-0"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium text-[#D0D6E2]"
                      >
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={formValues.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        placeholder="Jane Doe"
                        className={`mt-2 block w-full rounded-xl border bg-[#08090D] px-4 py-3 text-sm text-[#F4F5F8] placeholder-[#949EB2]/45 transition-colors focus:outline-none ${
                          errors.name
                            ? 'border-rose-400/70 focus:border-rose-400'
                            : 'border-white/[0.1] focus:border-[#7C5CFF]'
                        }`}
                      />
                      {errors.name && (
                        <p
                          id="contact-name-error"
                          role="alert"
                          className="mt-2 text-xs text-rose-300"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium text-[#D0D6E2]"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formValues.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        placeholder="jane@company.com"
                        className={`mt-2 block w-full rounded-xl border bg-[#08090D] px-4 py-3 text-sm text-[#F4F5F8] placeholder-[#949EB2]/45 transition-colors focus:outline-none ${
                          errors.email
                            ? 'border-rose-400/70 focus:border-rose-400'
                            : 'border-white/[0.1] focus:border-[#7C5CFF]'
                        }`}
                      />
                      {errors.email && (
                        <p
                          id="contact-email-error"
                          role="alert"
                          className="mt-2 text-xs text-rose-300"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-topic"
                      className="block text-xs font-medium text-[#D0D6E2]"
                    >
                      Topic
                    </label>
                    <select
                      id="contact-topic"
                      name="topic"
                      value={formValues.topic}
                      onChange={(e) => handleFieldChange('topic', e.target.value)}
                      className="mt-2 block w-full rounded-xl border border-white/[0.1] bg-[#08090D] px-4 py-3 text-sm text-[#F4F5F8] transition-colors focus:border-[#7C5CFF] focus:outline-none"
                    >
                      {TOPIC_OPTIONS.map((option) => (
                        <option key={option} value={option} className="bg-[#08090D]">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-[#D0D6E2]"
                    >
                      Project or Opportunity Details
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={formValues.message}
                      onChange={(e) => handleFieldChange('message', e.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? 'contact-message-error' : undefined
                      }
                      placeholder="Share a brief overview of what you are building or the role you have in mind..."
                      className={`mt-2 block w-full resize-y rounded-xl border bg-[#08090D] px-4 py-3 text-sm text-[#F4F5F8] placeholder-[#949EB2]/45 transition-colors focus:outline-none ${
                        errors.message
                          ? 'border-rose-400/70 focus:border-rose-400'
                          : 'border-white/[0.1] focus:border-[#7C5CFF]'
                      }`}
                    />
                    {errors.message && (
                      <p
                        id="contact-message-error"
                        role="alert"
                        className="mt-2 text-xs text-rose-300"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <p className="text-xs text-[#949EB2]">
                      Typically responds within one business day.
                    </p>
                    <MagneticButton
                      type="submit"
                      className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-[#7C5CFF] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#6D4AFF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C5CFF]"
                    >
                      <span>Send Message</span>
                      <Send className="h-4 w-4" aria-hidden="true" />
                    </MagneticButton>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quiet Minimal Footer */}
        <footer className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/[0.08] pt-8 text-xs text-[#949EB2] sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-medium text-[#F4F5F8]">{PROFILE.name}</span>
            <span aria-hidden="true">·</span>
            <span>{PROFILE.title}</span>
          </div>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 text-[#949EB2] transition-colors hover:text-[#F4F5F8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C5CFF]"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </footer>
      </div>
    </section>
  );
}
