import { createFileRoute } from "@tanstack/react-router";

import { ProjectGallery } from "@/components/project-gallery";
import { SectionHeading, StudioSiteLayout } from "@/components/studio-site";
import { defaultStudioContent, publicStorageUrl } from "@/lib/studio-content";

const projectImage = publicStorageUrl(
  defaultStudioContent.projects.at(1)?.image ?? defaultStudioContent.heroImage,
);

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects | KR8 ENTITIES" },
      {
        name: "description",
        content: "Explore custom wardrobes, media walls, dressing spaces, bars and window finishes.",
      },
      { property: "og:title", content: "Projects | KR8 ENTITIES" },
      {
        property: "og:description",
        content: "Made-to-measure interiors, shown in the details.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: projectImage },
      { name: "twitter:image", content: projectImage },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <StudioSiteLayout>
      <main>
        <section className="page-intro site-container projects-intro">
          <SectionHeading
            eyebrow="Made with intention"
            title="Rooms that hold"
            accent="your kind of living."
            description="A collection of tailored details for wardrobes, living spaces, dressing corners and evenings at home."
          />
        </section>
        <section className="site-container projects-gallery-section" aria-label="Interior projects">
          <ProjectGallery />
        </section>
      </main>
    </StudioSiteLayout>
  );
}