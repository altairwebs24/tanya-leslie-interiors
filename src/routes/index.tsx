import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProjectGallery } from "@/components/project-gallery";
import {
  SectionHeading,
  StudioSiteLayout,
  TextArrowLink,
} from "@/components/studio-site";
import { defaultStudioContent, publicStorageUrl, useStudioContent } from "@/lib/studio-content";

const homeImage = publicStorageUrl(defaultStudioContent.heroImage);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KR8 ENTITIES | A home, made beautifully yours" },
      {
        name: "description",
        content: "Bespoke wardrobes, kitchens and living spaces, thoughtfully made in Midrand.",
      },
      { property: "og:title", content: "KR8 ENTITIES | A home, made beautifully yours" },
      {
        property: "og:description",
        content: "Bespoke wardrobes, kitchens and living spaces, thoughtfully made in Midrand.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: homeImage },
      { name: "twitter:image", content: homeImage },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const content = useStudioContent();
  const titleParts = content.heroTitle.split("beautifully");
  const titleLead = titleParts[0] ?? content.heroTitle;
  const titleAccent = titleParts.length > 1 ? `beautifully${titleParts.slice(1).join("beautifully")}` : "";

  return (
    <StudioSiteLayout>
      <main>
        <section className="home-hero">
          <video
            className="home-hero-video"
            src={publicStorageUrl(content.heroVideo)}
            poster={publicStorageUrl(content.heroImage)}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <div className="home-hero-overlay" aria-hidden="true" />
          <div className="site-container home-hero-content">
            <p className="eyebrow home-eyebrow">{content.heroEyebrow}</p>
            <h1 className="home-title">
              {titleAccent ? (
                <>
                  <span>{titleLead}</span>
                  <span className="script-accent">{titleAccent}</span>
                </>
              ) : (
                content.heroTitle
              )}
            </h1>
            <p className="home-description">{content.heroDescription}</p>
            <div className="home-actions">
              <Button asChild className="site-button">
                <Link to="/book">
                  Start a project <ArrowUpRight aria-hidden="true" />
                </Link>
              </Button>
              <Link to="/projects" className="subtle-link home-hero-subtle-link">
                Explore our work <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="home-hero-note">
            <div className="site-container home-note-row">
              <p>{content.studioIntro}</p>
              <TextArrowLink to="/services">Discover what we do</TextArrowLink>
            </div>
          </div>
        </section>

        <section className="home-services-band">
          <div className="site-container home-services-inner">
            <span>Made to fit your home</span>
            {content.services.slice(0, 4).map((service) => (
              <span key={service.title}>{service.title}</span>
            ))}
            <Link to="/services" aria-label="See all services">
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="content-section site-container home-showcase">
          <div className="home-showcase-grid">
            <div className="home-showcase-copy">
              <SectionHeading
                eyebrow="In motion"
                title="See the craft"
                accent="come alive."
                description="A closer look at the details, finishes and fittings that make each space feel considered."
              />
              <TextArrowLink to="/projects">Browse the projects</TextArrowLink>
            </div>
            <div className="home-showcase-video-wrap">
              <video
                className="home-showcase-video"
                src={publicStorageUrl(content.showcaseVideo)}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="A short film of our interior work"
              />
            </div>
          </div>
        </section>

        <section className="content-section site-container featured-projects">
          <div className="section-heading-row">
            <SectionHeading
              eyebrow="Selected spaces"
              title="Made for your"
              accent="everyday."
              description="A few thoughtful details, shaped around the rooms that matter most."
            />
            <TextArrowLink to="/projects">View all projects</TextArrowLink>
          </div>
          <ProjectGallery limit={3} />
        </section>

        <section className="home-cta-band">
          <div className="site-container home-cta-inner">
            <div>
              <p className="eyebrow eyebrow-light">A new room, a fresh beginning</p>
              <h2>Let’s make space for <span className="script-accent">something lovely.</span></h2>
            </div>
            <Button asChild variant="outline" className="site-button site-button-light">
              <Link to="/book">
                Book a consultation <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </StudioSiteLayout>
  );
}