import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeading, StudioSiteLayout } from "@/components/studio-site";
import { defaultStudioContent, publicStorageUrl, useStudioContent } from "@/lib/studio-content";

const studioImage = publicStorageUrl(
  defaultStudioContent.projects.at(6)?.image ?? defaultStudioContent.heroImage,
);

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Our Studio | KR8 ENTITIES" },
      {
        name: "description",
        content: "Meet the Midrand interior studio creating thoughtful, made-to-measure spaces.",
      },
      { property: "og:title", content: "Our Studio | KR8 ENTITIES" },
      {
        property: "og:description",
        content: "A personal approach to considered interiors in Midrand.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: studioImage },
      { name: "twitter:image", content: studioImage },
    ],
  }),
  component: StudioPage,
});

function StudioPage() {
  const content = useStudioContent();

  return (
    <StudioSiteLayout>
      <main>
        <section className="studio-story site-container">
          <div className="studio-story-copy">
            <SectionHeading
              eyebrow="KR8 ENTITIES"
              title="Made for the way"
              accent="you live."
              description={content.studioIntro}
            />
            <div className="studio-location">
              <MapPin aria-hidden="true" />
              <div>
                <p className="footer-label">Find our studio</p>
                <p>{content.location}</p>
              </div>
            </div>
            <Button asChild className="site-button">
              <Link to="/book">
                Come by or say hello <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <figure className="studio-story-image-wrap">
            <img
              src={publicStorageUrl(content.projects.at(6)?.image ?? content.heroImage)}
              alt="Full-length curtains soften a bright contemporary room."
              className="studio-story-image"
            />
            <figcaption>Small details. A more considered home.</figcaption>
          </figure>
        </section>

        <section className="studio-hours-band">
          <div className="site-container studio-hours-inner">
            <div>
              <p className="eyebrow eyebrow-light">Visit by appointment</p>
              <h2>We’d love to hear <span className="script-accent">what you have in mind.</span></h2>
            </div>
            <div className="hours-list">
              {content.hours.map((item) => (
                <div className="hours-row" key={item.day}>
                  <span>{item.day}</span>
                  <span>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </StudioSiteLayout>
  );
}