"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LEVEL_OPTIONS, BOARD_OPTIONS } from "@/lib/filters";
import { subjects } from "@/data/subjects";
import { getWhatsAppNumber } from "@/lib/whatsapp";
import { trackDemoFormSubmit } from "@/lib/analytics";

const CLASS_TYPES = ["Group", "One-on-one"] as const;
const TIME_SLOTS = ["Morning", "Afternoon", "Evening"] as const;

export function DemoForm() {
  const [studentName, setStudentName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [level, setLevel] = useState("");
  const [board, setBoard] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [classType, setClassType] = useState<string>("Group");
  const [preferredTime, setPreferredTime] = useState<string>("Afternoon");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleSubject = (label: string) => {
    setSelectedSubjects((prev) => (prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      "Hi! I'd like to book a free demo class.",
      studentName && `Student name: ${studentName}`,
      whatsapp && `WhatsApp: ${whatsapp}`,
      level && `Level: ${level}`,
      board && `Board: ${board}`,
      selectedSubjects.length > 0 && `Subject(s): ${selectedSubjects.join(", ")}`,
      classType && `Class type: ${classType}`,
      preferredTime && `Preferred time: ${preferredTime}`,
      message && `Message: ${message}`,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${getWhatsAppNumber()}?text=${text}`, "_blank", "noopener,noreferrer");
    trackDemoFormSubmit({ level, board, subjects: selectedSubjects.join(", ") });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
        <h3 className="mt-4 text-lg font-bold text-ink">We&apos;ve opened WhatsApp for you</h3>
        <p className="mt-2 text-sm text-slate">
          Just hit send over there and we&apos;ll get back to you to schedule your free demo.
        </p>
        <Button className="mt-5" onClick={() => setSubmitted(false)}>
          Fill the form again
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-white p-6 md:p-8">
      <div>
        <label htmlFor="studentName" className="mb-1.5 block text-sm font-medium text-ink">
          Student name
        </label>
        <input
          id="studentName"
          required
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="whatsapp" className="mb-1.5 block text-sm font-medium text-ink">
          Parent/Student WhatsApp number
        </label>
        <input
          id="whatsapp"
          type="tel"
          required
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="e.g. 923001234567"
          className="w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="level" className="mb-1.5 block text-sm font-medium text-ink">
            Level
          </label>
          <select
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-primary"
          >
            <option value="">Select level</option>
            {LEVEL_OPTIONS.map((opt) => (
              <option key={opt.slug} value={opt.value}>
                {opt.value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="board" className="mb-1.5 block text-sm font-medium text-ink">
            Board
          </label>
          <select
            id="board"
            value={board}
            onChange={(e) => setBoard(e.target.value)}
            className="w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-primary"
          >
            <option value="">Select board</option>
            {BOARD_OPTIONS.map((opt) => (
              <option key={opt.slug} value={opt.value}>
                {opt.value}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset>
        <legend className="mb-1.5 text-sm font-medium text-ink">Subject(s)</legend>
        <div className="flex flex-wrap gap-2">
          {subjects.map((s) => {
            const selected = selectedSubjects.includes(s.label);
            return (
              <button
                key={s.slug}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleSubject(s.label)}
                className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  selected
                    ? "border-primary bg-primary text-bg"
                    : "border-border bg-white text-ink hover:border-primary/40"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <fieldset>
          <legend className="mb-1.5 text-sm font-medium text-ink">Class type</legend>
          <div className="flex gap-2">
            {CLASS_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                aria-pressed={classType === type}
                onClick={() => setClassType(type)}
                className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  classType === type ? "border-primary bg-primary text-bg" : "border-border bg-white text-ink"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-1.5 text-sm font-medium text-ink">Preferred time</legend>
          <div className="flex gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                aria-pressed={preferredTime === slot}
                onClick={() => setPreferredTime(slot)}
                className={`min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  preferredTime === slot ? "border-primary bg-primary text-bg" : "border-border bg-white text-ink"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          Message (optional)
        </label>
        <textarea
          id="message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-xl border border-border px-4 py-2.5 text-sm focus:border-primary"
        />
      </div>

      <Button type="submit" size="lg" className="w-full">
        Book Free Demo on WhatsApp
      </Button>
    </form>
  );
}
