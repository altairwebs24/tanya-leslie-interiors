import { createFileRoute } from "@tanstack/react-router";
import { Clock3, MapPin } from "lucide-react";

import { BookingForm } from "@/components/booking-form";
import { SectionHeading, StudioSiteLayout } from "@/components/studio-site";
import { defaultStudioContent, publicStorageUrl, useStudioContent } from "@/lib/studio-content";

const bookingImage = publicStorageUrl(defaultStudioContent.heroImage);

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Consultation | KR8 ENTITIES" },
      {
        name: "description",
        content: "Tell KR8 ENTITIES about your room and continue your consultation request on WhatsApp.",
      },
      { property: "og:title", content: "Book a Consultation | KR8 ENTITIES" },
      {
        property: "og:description",
        content: "Share a few details about your project and start a conversation on WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: bookingImage },
      { name: "twitter:image", content: bookingImage },
    ],
  }),
  component: BookingPage,
});

function BookingPage() {
  const content = useStudioContent();

  return (
    <StudioSiteLayout>
      <main>
        <section className="page-intro site-container booking-page-intro">
          <SectionHeading
            eyebrow="Let’s begin"
            title="Every lovely room"
            accent="starts somewhere."
            description="Share a few details and we’ll open a ready-to-send WhatsApp message for you."
          />
        </section>
        <section className="site-container booking-layout">
          <div className="booking-form-column">
            <BookingForm />
          </div>
          <aside className="booking-aside">
            <img
              src={publicStorageUrl(content.heroImage)}
              alt="Custom living room shelving and a built-in media wall."
              className="booking-photo"
              loading="lazy"
            />
            <div className="booking-contact-list">
              <div className="booking-contact-item">
                <MapPin aria-hidden="true" />
                <div>
                  <p className="footer-label">Visit us</p>
                  <p>{content.location}</p>
                </div>
              </div>
              <div className="booking-contact-item">
                <Clock3 aria-hidden="true" />
                <div>
                  <p className="footer-label">Studio hours</p>
                  {content.hours.map((item) => (
                    <p className="compact-hours" key={item.day}>
                      <span>{item.day}</span><span>{item.time}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </StudioSiteLayout>
  );
}