import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { buildWhatsAppUrl } from "@/lib/booking";
import { useStudioContent } from "@/lib/studio-content";

export function BookingForm() {
  const content = useStudioContent();
  const [service, setService] = useState("");
  const [serviceError, setServiceError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!service) {
      setServiceError("Please choose the space you would like to discuss.");
      return;
    }

    setServiceError("");
    const values = new FormData(event.currentTarget);
    const name = String(values.get("name") ?? "").trim();
    const phone = String(values.get("phone") ?? "").trim();
    const preferredDate = String(values.get("preferredDate") ?? "").trim();
    const notes = String(values.get("notes") ?? "").trim();
    const message = [
      `Hello ${content.brandName}, I would like to book a consultation.`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Project: ${service}`,
      preferredDate ? `Preferred date: ${preferredDate}` : "Preferred date: Flexible",
      notes ? `A little about my project: ${notes}` : "A little about my project: I would love to discuss ideas.",
    ].join("\n");

    window.location.assign(buildWhatsAppUrl(message, content.whatsappNumber));
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="booking-name">Your name</label>
          <Input id="booking-name" className="form-control" name="name" autoComplete="name" required />
        </div>
        <div className="form-field">
          <label htmlFor="booking-phone">Your phone number</label>
          <Input
            id="booking-phone"
            className="form-control"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
          />
        </div>
        <div className="form-field form-field-wide">
          <label htmlFor="booking-service">What are you dreaming of?</label>
          <Select
            value={service}
            onValueChange={(value) => {
              setService(value);
              setServiceError("");
            }}
          >
            <SelectTrigger id="booking-service" className="form-select-trigger" aria-describedby="service-error">
              <SelectValue placeholder="Choose a space or service" />
            </SelectTrigger>
            <SelectContent>
              {content.services.map((item) => (
                <SelectItem key={item.title} value={item.title}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p id="service-error" className="field-error" role="alert">
            {serviceError}
          </p>
        </div>
        <div className="form-field form-field-wide">
          <label htmlFor="booking-date">A preferred date <span>(optional)</span></label>
          <Input id="booking-date" className="form-control" name="preferredDate" type="date" />
        </div>
        <div className="form-field form-field-wide">
          <label htmlFor="booking-notes">Tell us a little about your project</label>
          <Textarea
            id="booking-notes"
            className="form-control form-textarea"
            name="notes"
            rows={4}
            placeholder="The room, the ideas, or the details you already have in mind…"
          />
        </div>
      </div>
      <div className="form-submit-row">
        <Button type="submit" className="site-button">
          Continue on WhatsApp <ArrowUpRight aria-hidden="true" />
        </Button>
        <p>Your details will be added to a message for Tanya & Leslie.</p>
      </div>
    </form>
  );
}