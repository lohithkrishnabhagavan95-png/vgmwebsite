import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site-chrome";
import { Check } from "lucide-react";
import { careersEmail } from "@/lib/contact";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at VGM Group — Apply Online" },
      {
        name: "description",
        content:
          "Apply to VGM IT Hub Technologies and VGM Hub Infra — engineering, design, site management. Tell us the role you're after and apply online in minutes.",
      },
      { property: "og:title", content: "Careers at VGM Group" },
      {
        property: "og:description",
        content: "Opportunities across technology and construction. Apply online.",
      },
    ],
  }),
  component: Careers,
});

function Careers() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <PageHero
        eyebrow="Careers"
        title="Build your future while we build others'"
        copy="Join a group where software teams and site teams share the same standard of craft. Tell us the role you're after and a little about yourself, and we'll get back within a week."
      />

      <section className="mx-auto max-w-2xl px-5 py-20">
        <div className="card-lux p-7 md:p-9">
          <h2 className="text-2xl">Apply now</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Fill in your details and the role you're applying for.
          </p>

          {submitted ? (
            <div className="mt-8 flex flex-col items-center py-8 text-center">
              <div className="flex size-12 items-center justify-center rounded-full border border-primary">
                <Check className="size-5 text-primary" />
              </div>
              <h3 className="mt-5 text-lg">Almost there</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We've opened a prefilled email to {careersEmail} — attach your resume and hit send.
                Our people team responds within a week.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-xs uppercase tracking-[0.18em] text-primary"
              >
                Submit another
              </button>
            </div>
          ) : (
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                // No backend: hand the application to the visitor's mail
                // client, prefilled, so it actually reaches the inbox.
                const data = new FormData(e.currentTarget);
                const value = (k: string) => String(data.get(k) ?? "").trim() || "—";
                const role = value("role");
                const body = [
                  `Role: ${role}`,
                  `Name: ${value("name")}`,
                  `Email: ${value("email")}`,
                  `Phone: ${value("phone")}`,
                  "",
                  "Why VGM?",
                  value("why"),
                  "",
                  "(Please attach your resume before sending.)",
                ].join("\n");
                window.location.href = `mailto:${careersEmail}?subject=${encodeURIComponent(
                  `Application — ${role}`,
                )}&body=${encodeURIComponent(body)}`;
                setSubmitted(true);
              }}
            >
              <Field label="Full name" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="Phone" name="phone" type="tel" />
              <Field
                label="Role applying for"
                name="role"
                placeholder="e.g. Site Engineer (Civil)"
              />
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Resume (PDF)
                </label>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Attach this to the email that opens when you submit.
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="mt-2 w-full border border-input bg-background px-3 py-2 text-sm text-muted-foreground file:mr-3 file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-xs file:uppercase file:tracking-widest file:text-foreground"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Why VGM?
                </label>
                <textarea
                  name="why"
                  rows={4}
                  className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                  placeholder="A few lines about your experience"
                />
              </div>
              <button
                type="submit"
                className="w-full border border-primary bg-primary px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Submit application
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}
