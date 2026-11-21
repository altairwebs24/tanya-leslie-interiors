import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeading, StudioSiteLayout } from "@/components/studio-site";
import { defaultStudioContent, publicStorageUrl, useStudioContent } from "@/lib/studio-content";

const serviceImage = publicStorageUrl(defaultStudioContent.heroImage);

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Interior Services | Tanya & Leslie Interiors" },
      {
        name: "description",
        content: "Built-in wardrobes, kitchens, living rooms, home bars and finishing touches in Midrand.",
      },
      { property: "og:title", content: "Interior Services | Tanya & Leslie Interiors" },
      {
        property: "og:description",
        content: "Made-to-measure spaces for the everyday moments at home.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: serviceImage },
      { name: "twitter:image", content: serviceImage },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const content = useStudioContent();

  return (
    <StudioSiteLayout>
      <main>
        <section className="page-intro site-container">
          <SectionHeading
            eyebrow="Thoughtful interiors"
            title="A place for"
            accent="everything."
            description="From the first detail you notice to the storage you never see, each space is shaped for real life."
          />
        </section>

        <section className="services-layout site-container">
          <div className="service-list" aria-label="Interior services">
            {content.services.map((service, index) => (
              <article className="service-row" key={service.title}>
                <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                </div>
                <ArrowUpRight className="service-arrow" aria-hidden="true" />
              </article>
            ))}
          </div>
          <aside className="service-image-column">
            <img
              src={publicStorageUrl(content.heroImage)}
              alt="A bespoke living room with custom shelving and a built-in media wall."
              className="service-photo"
              loading="lazy"
            />
            <p>Considered details, made to feel at home.</p>
          </aside>
        </section>

        <section className="simple-cta site-container">
          <div>
            <p className="eyebrow">Have something in mind?</p>
            <h2>Let’s talk about your <span className="script-accent">space.</span></h2>
          </div>
          <Button asChild className="site-button">
            <a href="/book">Book a consultation <ArrowUpRight aria-hidden="true" /></a>
          </Button>
        </section>
      </main>
    </StudioSiteLayout>
  );
}