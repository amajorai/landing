import { generateMetadata as genMeta } from "@/lib/metadata";
import BackstagePage from "./backstage-page";

export const metadata = genMeta({
  title: "Backstage — The Open-Source YouTube Thumbnail Studio",
  description:
    "A free, cross-platform desktop app for designing high-performing YouTube thumbnails. Layer-based editing, AI background removal, video frame extraction — all local.",
  url: "/products/backstage",
  tags: [
    "Backstage",
    "YouTube thumbnail maker",
    "open source thumbnail editor",
    "AI background removal",
    "video frame extraction",
    "A Major",
  ],
});

export default function Page() {
  return <BackstagePage />;
}
