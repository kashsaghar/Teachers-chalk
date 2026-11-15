import { VideoCard } from "@/components/lectures/VideoCard";
import type { Video } from "@/types/video";

export function VideoGrid({ videos, onOpen }: { videos: Video[]; onOpen?: (video: Video) => void }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onOpen={onOpen} />
      ))}
    </div>
  );
}
