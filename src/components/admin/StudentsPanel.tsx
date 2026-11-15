"use client";

import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Student = {
  id: string;
  email: string;
  full_name: string | null;
  role: "student" | "admin";
  access_tags: string[];
};

export function StudentsPanel() {
  const [students, setStudents] = useState<Student[] | null>(null);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [creating, setCreating] = useState(false);
  const [lastCreated, setLastCreated] = useState<{ email: string; tempPassword: string } | null>(null);
  const [tagInputs, setTagInputs] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const loadStudents = async () => {
    const res = await fetch("/api/admin/students");
    const data = await res.json();
    if (res.ok) setStudents(data.students);
  };

  useEffect(() => {
    let ignore = false;

    (async () => {
      const res = await fetch("/api/admin/students");
      const data = await res.json();
      if (!ignore && res.ok) setStudents(data.students);
    })();

    return () => {
      ignore = true;
    };
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError(null);

    const res = await fetch("/api/admin/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, fullName }),
    });
    const data = await res.json();
    setCreating(false);

    if (!res.ok) {
      setError(data.error || "Failed to create student");
      return;
    }

    setLastCreated({ email, tempPassword: data.tempPassword });
    setEmail("");
    setFullName("");
    loadStudents();
  };

  const addTag = async (studentId: string) => {
    const tag = (tagInputs[studentId] || "").trim();
    if (!tag) return;

    await fetch(`/api/admin/students/${studentId}/tags`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tag }),
    });
    setTagInputs((prev) => ({ ...prev, [studentId]: "" }));
    loadStudents();
  };

  const removeTag = async (studentId: string, tag: string) => {
    await fetch(`/api/admin/students/${studentId}/tags`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tag }),
    });
    loadStudents();
  };

  return (
    <section className="rounded-2xl border border-border bg-white p-6">
      <h2 className="text-lg font-bold text-ink">Students</h2>

      <form onSubmit={handleCreate} className="mt-4 space-y-3 rounded-xl bg-mist p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            type="email"
            required
            placeholder="Student email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-border px-3 py-2 text-sm focus:border-primary"
          />
          <input
            type="text"
            placeholder="Full name (optional)"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="rounded-xl border border-border px-3 py-2 text-sm focus:border-primary"
          />
        </div>
        <Button type="submit" size="md">
          {creating ? "Creating..." : "Create student account"}
        </Button>
        {error && <p className="text-sm text-coral">{error}</p>}
      </form>

      {lastCreated && (
        <div className="mt-3 rounded-xl border border-accent-dark bg-accent/20 p-3 text-sm">
          Created <strong>{lastCreated.email}</strong>. Temporary password (copy and send to the student — it
          won&apos;t be shown again):{" "}
          <code className="rounded bg-white px-1.5 py-0.5">{lastCreated.tempPassword}</code>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {students === null && <p className="text-sm text-slate">Loading...</p>}
        {students?.map((student) => (
          <div key={student.id} className="rounded-xl border border-border p-4">
            <p className="text-sm font-semibold text-ink">
              {student.full_name || student.email} {student.role === "admin" && "(admin)"}
            </p>
            <p className="text-xs text-slate">{student.email}</p>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {student.access_tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-mist px-3 py-1 text-xs text-ink"
                >
                  {tag}
                  <button onClick={() => removeTag(student.id, tag)} aria-label={`Remove ${tag}`}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="mt-2 flex gap-2">
              <input
                type="text"
                placeholder="e.g. physics-o-level"
                value={tagInputs[student.id] || ""}
                onChange={(e) => setTagInputs((prev) => ({ ...prev, [student.id]: e.target.value }))}
                className="min-h-11 flex-1 rounded-full border border-border px-3 py-1.5 text-sm focus:border-primary"
              />
              <button
                onClick={() => addTag(student.id)}
                aria-label="Add tag"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-bg"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
