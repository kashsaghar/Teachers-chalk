"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterBar } from "@/components/lectures/FilterBar";
import { VideoGrid } from "@/components/lectures/VideoGrid";
import { VideoModal } from "@/components/lectures/VideoModal";
import { Button } from "@/components/ui/Button";
import { subjects } from "@/data/subjects";
import { LEVEL_OPTIONS, BOARD_OPTIONS, type SortOption } from "@/lib/filters";
import { getWhatsAppLink } from "@/lib/whatsapp";
import type { Video } from "@/types/video";

const PAGE_SIZE = 24;

export function LecturesExplorer({ videos }: { videos: Video[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const levelSlug = searchParams.get("level");
  const boardSlug = searchParams.get("board");
  const subjectSlug = searchParams.get("subject");
  const search = searchParams.get("q") ?? "";
  const sort = (searchParams.get("sort") as SortOption | null) ?? "newest";

  const level = LEVEL_OPTIONS.find((o) => o.slug === levelSlug)?.value ?? null;
  const board = BOARD_OPTIONS.find((o) => o.slug === boardSlug)?.value ?? null;
  const subjectValue = subjects.find((s) => s.slug === subjectSlug)?.videoSubject ?? null;

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === "") params.delete(key);
        else params.set(key, value);
      }
      setVisibleCount(PAGE_SIZE);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const result = videos.filter((v) => {
      if (level && v.level !== level) return false;
      if (board && v.board !== board) return false;
      if (subjectValue && v.subject !== subjectValue) return false;
      if (q && !v.title.toLowerCase().includes(q)) return false;
      return true;
    });

    const sorted = [...result];
    if (sort === "oldest") {
      sorted.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    } else if (sort === "most-viewed") {
      sorted.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
    } else {
      sorted.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }
    return sorted;
  }, [videos, level, board, subjectValue, search, sort]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="space-y-8">
      <FilterBar
        level={level}
        board={board}
        subject={subjectSlug}
        search={search}
        sort={sort}
        onLevelChange={(v) => updateParams({ level: v ? LEVEL_OPTIONS.find((o) => o.value === v)!.slug : null })}
        onBoardChange={(v) => updateParams({ board: v ? BOARD_OPTIONS.find((o) => o.value === v)!.slug : null })}
        onSubjectChange={(v) => updateParams({ subject: v })}
        onSearchChange={(v) => updateParams({ q: v || null })}
        onSortChange={(v) => updateParams({ sort: v === "newest" ? null : v })}
      />

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-mist p-10 text-center">
          <p className="text-base text-ink">No lectures match yet. Message us for this topic.</p>
          <Button href={getWhatsAppLink("Hi! Could you point me to lectures on this topic?")} className="mt-4">
            Message us on WhatsApp
          </Button>
        </div>
      ) : (
        <>
          <VideoGrid videos={visible} onOpen={setActiveVideo} />

          {visibleCount < filtered.length && (
            <div className="flex justify-center">
              <Button variant="secondary" className="border-primary text-primary" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
                Load more
              </Button>
            </div>
          )}
        </>
      )}

      <div className="rounded-2xl bg-primary p-5 text-center lg:hidden">
        <p className="text-sm font-medium text-bg">Want the full course? Book a free demo</p>
        <Button href="/contact" className="mt-3">
          Book Free Demo
        </Button>
      </div>

      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
    </div>
  );
}
