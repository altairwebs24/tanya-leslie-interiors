import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const PUBLIC_STUDIO_BUCKET = "tanya-leslie-interiors";

// Bump this when studio-content.json changes in the bucket, so the site
// re-reads the file instead of a copy held by the content delivery cache.
export const STUDIO_CONTENT_VERSION = "2026-11-23-2";

export interface StudioService {
  title: string;
  description: string;
}

export interface StudioProject {
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface StudioHour {
  day: string;
  time: string;
}

export interface StudioContent {
  brandName: string;
  logo: string;
  heroImage: string;
  heroVideo: string;
  showcaseVideo: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  studioIntro: string;
  location: string;
  whatsappNumber: string;
  services: StudioService[];
  projects: StudioProject[];
  hours: StudioHour[];
}

export const defaultStudioContent: StudioContent = {
  brandName: "KR8 ENTITIES",
  logo: "images/kr8-logo-cobalt.png",
  heroImage: "images/hero-living-room.jpg",
  heroVideo: "videos/hero-video.mp4",
  showcaseVideo: "videos/showcase-video.mp4",
  heroEyebrow: "KR8 ENTITIES · MIDRAND",
  heroTitle: "A home, made beautifully yours.",
  heroDescription:
    "Bespoke wardrobes, kitchens and living spaces, thoughtfully made for the way you live.",
  studioIntro:
    "From made-to-measure storage to warm, considered living spaces, we bring your ideas together with thoughtful detail and a personal touch.",
  location: "33 Richards Rd, Midrand, 1685, South Africa",
  whatsappNumber: "0601910837",
  services: [
    {
      title: "Built-in wardrobes",
      description:
        "Tailored storage and dressing spaces, designed to make every centimetre work beautifully.",
    },
    {
      title: "Kitchens",
      description:
        "Considered cabinetry, practical storage and welcoming details for the heart of your home.",
    },
    {
      title: "Living rooms",
      description:
        "Custom TV units, media walls and display shelving that bring the room together.",
    },
    {
      title: "Home bars",
      description:
        "Made-to-fit bar cabinetry and illuminated bottle displays for evenings at home.",
    },
    {
      title: "Vanities & dressing",
      description:
        "A calm, personal place to get ready, with mirrors and storage made for your routine.",
    },
    {
      title: "Curtains & soft finishes",
      description:
        "Beautifully finished window treatments that soften and complete a room.",
    },
  ],
  projects: [
    {
      title: "Warm walnut wardrobe",
      category: "Built-in storage",
      image: "images/built-in-storage.jpg",
      description: "A made-to-measure wardrobe and dressing nook in rich, warm wood.",
    },
    {
      title: "A quieter kind of glow",
      category: "TV feature wall",
      image: "images/tv-feature-wall.jpg",
      description: "Slatted timber and soft lighting frame a streamlined media wall.",
    },
    {
      title: "The evening edit",
      category: "Home bar",
      image: "images/home-bar.jpg",
      description: "A moody, tailored home bar with display shelving and a place for every glass.",
    },
    {
      title: "A collection on display",
      category: "Wine display",
      image: "images/bar-display.jpg",
      description: "A glass-fronted wine cabinet with warm lighting and clean-lined details.",
    },
    {
      title: "A little room to get ready",
      category: "Dressing vanity",
      image: "images/vanity-detail.jpg",
      description: "A floating vanity and generous mirror create a composed dressing corner.",
    },
    {
      title: "Everyday, beautifully kept",
      category: "Mirror & storage",
      image: "images/mirror-vanity.jpg",
      description:
        "A full-length mirror, soft lighting and made-to-fit drawers bring order to a daily ritual.",
    },
    {
      title: "Softened light",
      category: "Curtains",
      image: "images/custom-drapery.jpg",
      description: "Full-length drapery adds softness and a tailored finish to the room.",
    },
  ],
  hours: [
    { day: "Monday – Thursday", time: "09:00 – 16:30" },
    { day: "Friday", time: "09:00 – 14:00" },
    { day: "Saturday", time: "09:00 – 12:00" },
    { day: "Sunday", time: "08:00 – 11:00" },
  ],
};

export function publicStorageUrl(path: string | null | undefined): string {
  if (!path || typeof path !== "string") return "";
  const storageOrigin = import.meta.env["VITE_SUPABASE_URL"]?.replace(/\/+$/, "");
  if (!storageOrigin) return "";

  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  return `${storageOrigin}/storage/v1/object/public/${PUBLIC_STUDIO_BUCKET}/${encodedPath}`;
}

export function mergeStudioContent(remote: Partial<StudioContent> | null | undefined): StudioContent {
  if (!remote || typeof remote !== "object") return defaultStudioContent;

  const pickString = (value: unknown, fallback: string) =>
    typeof value === "string" && value.trim().length > 0 ? value : fallback;

  return {
    brandName: pickString(remote.brandName, defaultStudioContent.brandName),
    logo: pickString(remote.logo, defaultStudioContent.logo),
    heroImage: pickString(remote.heroImage, defaultStudioContent.heroImage),
    heroVideo: pickString(remote.heroVideo, defaultStudioContent.heroVideo),
    showcaseVideo: pickString(remote.showcaseVideo, defaultStudioContent.showcaseVideo),
    heroEyebrow: pickString(remote.heroEyebrow, defaultStudioContent.heroEyebrow),
    heroTitle: pickString(remote.heroTitle, defaultStudioContent.heroTitle),
    heroDescription: pickString(remote.heroDescription, defaultStudioContent.heroDescription),
    studioIntro: pickString(remote.studioIntro, defaultStudioContent.studioIntro),
    location: pickString(remote.location, defaultStudioContent.location),
    whatsappNumber: pickString(remote.whatsappNumber, defaultStudioContent.whatsappNumber),
    services: Array.isArray(remote.services) ? remote.services : defaultStudioContent.services,
    projects: Array.isArray(remote.projects) ? remote.projects : defaultStudioContent.projects,
    hours: Array.isArray(remote.hours) ? remote.hours : defaultStudioContent.hours,
  };
}

const StudioContentContext = createContext<StudioContent>(defaultStudioContent);

export function StudioContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState(defaultStudioContent);

  useEffect(() => {
    const controller = new AbortController();
    const contentUrl = publicStorageUrl("studio-content.json");
    if (!contentUrl) return () => controller.abort();

    void fetch(`${contentUrl}?v=${STUDIO_CONTENT_VERSION}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Studio content is unavailable");
        return response.json() as Promise<Partial<StudioContent>>;
      })
      .then((remoteContent) => setContent(mergeStudioContent(remoteContent)))
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  return <StudioContentContext.Provider value={content}>{children}</StudioContentContext.Provider>;
}

export function useStudioContent(): StudioContent {
  return useContext(StudioContentContext);
}