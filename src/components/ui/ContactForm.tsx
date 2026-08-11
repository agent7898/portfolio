"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { profile } from "@/content/site";
import { EASE_OUT } from "@/lib/timing";

type Status = "idle" | "sending" | "sent" | "error";

const FIELDS = [
  { id: "name", label: "Name", type: "text", placeholder: "Your name" },
  { id: "email", label: "Email", type: "email", placeholder: "you@company.com" },
] as const;

/** Must match the `name` on the static form in public/__forms.html. */
const FORM_NAME = "contact";

/**
 * Netlify detects forms by parsing static HTML at deploy time, which never
 * sees this component. public/__forms.html declares the form instead, and
 * submissions are posted to it as urlencoded data.
 */
const FORM_ENDPOINT = "/__forms.html";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  // Honeypot: bots fill every field they find, humans never see this one.
  const [botField, setBotField] = useState("");

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": FORM_NAME,
          "bot-field": botField,
          ...values,
        }).toString(),
      });

      if (!response.ok) throw new Error(`Netlify forms responded ${response.status}`);
      setStatus("sent");
    } catch {
      // No silent failure — the error state offers the mailto fallback.
      setStatus("error");
    }
  };

  return (
    <div className="group relative w-full">
      {/* Chrome edge that brightens on hover. */}
      <div
        aria-hidden
        className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/25 via-white/[0.06] to-transparent opacity-40 transition-opacity duration-700 group-hover:opacity-80"
      />

      <div className="relative rounded-2xl bg-black p-8 md:p-10">
        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
              className="flex flex-col items-center py-14 text-center"
            >
              <span className="mb-6 block h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_16px_4px_rgba(255,255,255,0.5)]" />
              <h3 className="font-serif text-2xl text-white">Transmission received</h3>
              <p className="mt-3 max-w-xs text-sm font-light text-chrome-400">
                Thank you — I&apos;ll reply as soon as I can.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              name={FORM_NAME}
              method="POST"
              action={FORM_ENDPOINT}
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-8"
            >
              <input type="hidden" name="form-name" value={FORM_NAME} />

              {/* Honeypot — hidden from people and assistive tech, not from bots. */}
              <p className="hidden" aria-hidden>
                <label>
                  Leave this field empty
                  <input
                    type="text"
                    name="bot-field"
                    tabIndex={-1}
                    autoComplete="off"
                    value={botField}
                    onChange={(e) => setBotField(e.target.value)}
                  />
                </label>
              </p>

              {FIELDS.map((field) => (
                <Field
                  key={field.id}
                  {...field}
                  value={values[field.id]}
                  onChange={set(field.id)}
                />
              ))}

              <label className="flex flex-col gap-3">
                <span className="eyebrow">Message</span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={values.message}
                  onChange={set("message")}
                  placeholder="What are you working on?"
                  className="resize-none border-b border-white/15 bg-transparent pb-3 text-[0.9375rem] font-light text-white placeholder:text-chrome-600 focus:border-white/70 focus:outline-none focus-visible:outline-none"
                  style={{ transition: "border-color 500ms" }}
                />
              </label>

              <MagneticButton
                type="submit"
                disabled={status === "sending"}
                className="mt-2 self-start"
              >
                {status === "sending" ? "Sending" : "Send message"}
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </MagneticButton>

              {status === "error" && (
                <p role="status" className="text-sm font-light text-chrome-400">
                  That didn&apos;t send. Try again, or reach me directly at{" "}
                  <a
                    href={`mailto:${profile.email}`}
                    data-cursor="hover"
                    className="text-white underline underline-offset-4"
                  >
                    {profile.email}
                  </a>
                  .
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="flex flex-col gap-3">
      <span className="eyebrow">{label}</span>
      <input
        id={id}
        name={id}
        type={type}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border-b border-white/15 bg-transparent pb-3 text-[0.9375rem] font-light text-white placeholder:text-chrome-600 focus:border-white/70 focus:outline-none focus-visible:outline-none"
        style={{ transition: "border-color 500ms" }}
      />
    </label>
  );
}
