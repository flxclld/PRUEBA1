"use client";

import dynamic from "next/dynamic";

const Studio = dynamic(() => import("@/components/SanityStudio").then((mod) => mod.SanityStudio), {
  ssr: false,
});

export default function StudioPage() {
  return <Studio />;
}
