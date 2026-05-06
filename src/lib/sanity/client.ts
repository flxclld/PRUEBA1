import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-06";
export const hasSanityConfig = Boolean(projectId && projectId !== "your_project_id");

export const client = createClient({
  projectId: projectId || "demo",
  dataset,
  apiVersion,
  useCdn: true,
});
