"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { subjects } from "@/data/subjects";
import { LEVEL_OPTIONS, BOARD_OPTIONS, SORT_OPTIONS, type SortOption } from "@/lib/filters";
import type { Board, Level } from "@/lib/tagVideo";

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150",
        active
          ? "border-forest bg-forest text-white"
          : "border-line bg-white text-cocoa hover:border-forest/40"
      )}
    >
      {label}
    </button>
  );
}

export function FilterBar({
  level,
  board,
  subject,
  search,
  sort,
  onLevelChange,
  onBoardChange,
  onSubjectChange,
  onSearchChange,
  onSortChange,
}: {
  level: Level | null;
  board: Board | null;
  subject: string | null;
  search: string;
  sort: SortOption;
  onLevelChange: (v: Level | null) => void;
  onBoardChange: (v: Board | null) => void;
  onSubjectChange: (v: string | null) => void;
  onSearchChange: (v: string) => void;
  onSortChange: (v: SortOption) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Pill label="All levels" active={level === null} onClick={() => onLevelChange(null)} />
        {LEVEL_OPTIONS.map((opt) => (
          <Pill
            key={opt.slug}
            label={opt.value}
            active={level === opt.value}
            onClick={() => onLevelChange(opt.value)}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Pill label="All boards" active={board === null} onClick={() => onBoardChange(null)} />
        {BOARD_OPTIONS.map((opt) => (
          <Pill
            key={opt.slug}
            label={opt.value}
            active={board === opt.value}
            onClick={() => onBoardChange(opt.value)}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Pill label="All subjects" active={subject === null} onClick={() => onSubjectChange(null)} />
        {subjects.map((s) => (
          <Pill
            key={s.slug}
            label={s.label}
            active={subject === s.slug}
            onClick={() => onSubjectChange(s.slug)}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cocoa-muted" />
          <input
            type="search"
            aria-label="Search lecture titles"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search lecture titles..."
            className="w-full rounded-full border-[1.5px] border-line bg-cream py-2.5 pl-10 pr-4 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
          />
        </div>

        <select
          aria-label="Sort lectures by"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="rounded-full border-[1.5px] border-line bg-cream px-4 py-2.5 text-sm focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.slug} value={opt.slug}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
