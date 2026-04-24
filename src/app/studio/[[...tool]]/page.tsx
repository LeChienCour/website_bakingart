/**
 * Sanity Studio embedded at /studio.
 * NextStudio is a server component — no "use client" needed.
 * See: https://github.com/sanity-io/next-sanity#embedded-sanity-studio
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-dynamic";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
