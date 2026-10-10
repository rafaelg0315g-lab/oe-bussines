"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Loader2, RotateCcw } from "lucide-react";
import { useLang } from "./lang-provider";
import { Reveal, SectionHeading, EASE } from "./motion-primitives";
import { ChapterGhost } from "./chapter-ghost";
import {
  CONTACT_EMAIL,
  WHATSAPP_URL,
  WHATSAPP_DISPLAY,
} from "@/lib/i18n/dictionary";

type Status = "idle" | "sending" | "success" | "error";
interface Errors {
  name?: boolean;
  email?: boolean;
  message?: boolean;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Institutional contact — WhatsApp + business email + real form.
 * Messages are delivered to /api/contact and stored in the database.
 */
export function Contact() {
  const { t } = useLang();

  return (
    <section
      id="contacto"
      aria-label={t.contact.kicker}
      className="relative scroll-mt-24 px-6 py-28 md:px-10 md:py-40"
    >
      <ChapterGhost numeral="05" className="right-[-3vw] top-10 hidden lg:block" />
      <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-16 md:grid-cols-12 md:gap-10">
        {/* left: invitation + channels */}
        <div className="md:col-span-5">
          <SectionHeading
            kicker={t.contact.kicker}
            title={t.contact.title}
            titleSize="text-[clamp(2rem,4.2vw,3.4rem)]"
            titleClassName="max-w-lg"
          />
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md text-base leading-[1.85] text-mute md:text-lg">
              {t.contact.text}
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-12 space-y-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-ice transition-colors duration-300 hover:border-titanium/50 hover:bg-white/5"
              >
                <WhatsAppIcon className="h-5 w-5 text-titanium" />
                {t.contact.whatsappCta}
                <ArrowUpRight className="h-4 w-4 text-mute transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <dl className="space-y-3 pt-6 font-mono text-[13px]">
                <div className="flex items-center gap-4">
                  <dt className="w-24 shrink-0 text-[10px] uppercase tracking-[0.28em] text-mute">
                    {t.contact.phoneLabel}
                  </dt>
                  <dd>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-titanium transition-colors hover:text-ice"
                    >
                      {WHATSAPP_DISPLAY}
                    </a>
                  </dd>
                </div>
                <div className="flex items-center gap-4">
                  <dt className="w-24 shrink-0 text-[10px] uppercase tracking-[0.28em] text-mute">
                    {t.contact.emailLabel}
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-titanium transition-colors hover:text-ice"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>

        {/* right: the form */}
        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function ContactForm() {
  const { t } = useLang();
  const f = t.contact.form;
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (field !== "company") {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
      if (status === "error") setStatus("idle");
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = true;
    if (!EMAIL_RE.test(form.email.trim())) next.email = true;
    if (form.message.trim().length < 10) next.message = true;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { ok?: boolean };
      if (!data?.ok) throw new Error("API error");
      setForm({ name: "", email: "", message: "", company: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (invalid?: boolean) =>
    `mt-2 w-full rounded-xl border bg-obsidian/60 px-4 py-3 text-[15px] text-ice placeholder:text-mute/50 transition-colors duration-300 focus:outline-none focus:ring-2 ${
      invalid
        ? "border-red-400/50 focus:border-red-400/60 focus:ring-red-400/15"
        : "border-white/10 focus:border-titanium/50 focus:ring-titanium/15"
    }`;

  return (
    <div className="rounded-3xl border border-white/[0.07] bg-carbon/60 p-7 backdrop-blur-sm md:p-10">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
            role="status"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-titanium/30 bg-titanium/10">
              <Check className="h-6 w-6 text-titanium" />
            </span>
            <h3 className="mt-7 font-display text-2xl font-semibold text-ice">
              {f.successTitle}
            </h3>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-mute">
              {f.successText}
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-9 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-titanium transition-colors duration-300 hover:border-white/40 hover:text-ice"
            >
              <RotateCcw className="h-4 w-4" />
              {f.again}
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="font-display text-xl font-semibold text-ice">
              {f.title}
            </h3>

            {/* honeypot — invisible to humans, catches bots */}
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={update("company")}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="oe-name"
                  className="font-mono text-[11px] uppercase tracking-[0.25em] text-mute"
                >
                  {f.name}
                </label>
                <input
                  id="oe-name"
                  name="name"
                  autoComplete="name"
                  maxLength={80}
                  value={form.name}
                  onChange={update("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "oe-name-error" : undefined}
                  placeholder={f.namePlaceholder}
                  className={inputClass(errors.name)}
                />
                {errors.name && (
                  <p id="oe-name-error" role="alert" className="mt-2 text-[13px] text-red-400">
                    {f.errName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="oe-email"
                  className="font-mono text-[11px] uppercase tracking-[0.25em] text-mute"
                >
                  {f.email}
                </label>
                <input
                  id="oe-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={120}
                  value={form.email}
                  onChange={update("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "oe-email-error" : undefined}
                  placeholder={f.emailPlaceholder}
                  className={inputClass(errors.email)}
                />
                {errors.email && (
                  <p id="oe-email-error" role="alert" className="mt-2 text-[13px] text-red-400">
                    {f.errEmail}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="oe-message"
                  className="font-mono text-[11px] uppercase tracking-[0.25em] text-mute"
                >
                  {f.message}
                </label>
                <textarea
                  id="oe-message"
                  name="message"
                  rows={5}
                  maxLength={2000}
                  value={form.message}
                  onChange={update("message")}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "oe-message-error" : undefined}
                  placeholder={f.messagePlaceholder}
                  className={`${inputClass(errors.message)} resize-none`}
                />
                {errors.message && (
                  <p id="oe-message-error" role="alert" className="mt-2 text-[13px] text-red-400">
                    {f.errMessage}
                  </p>
                )}
              </div>

              {status === "error" && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-[14px] text-red-300"
                >
                  {f.errorText}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ice py-3.5 text-sm font-medium text-obsidian transition-all duration-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {f.sending}
                  </>
                ) : (
                  f.submit
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
