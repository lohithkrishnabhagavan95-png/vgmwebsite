import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site-chrome";
import { MapPin, Briefcase, Check } from "lucide-react";
import { careersEmail } from "@/lib/contact";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at VGM Group — Open Roles & Apply Online" },
      {
        name: "description",
        content:
          "Explore open roles at VGM IT Hub Technologies and VGM Hub Infra — engineering, design, site management — and apply online in minutes.",
      },
      { property: "og:title", content: "Careers at VGM Group" },
      {
        property: "og:description",
        content: "Open roles across technology and construction. Apply online.",
      },
    ],
  }),
  component: Careers,
});

const jobs = [
  {
    id: "se-react",
    t: "Senior React Engineer",
    c: "VGM IT Hub Technologies",
    loc: "Hyderabad / Hybrid",
    type: "Full-time",
    exp: "4-7 yrs",
  },
  {
    id: "devops",
    t: "DevOps Engineer",
    c: "VGM IT Hub Technologies",
    loc: "Hyderabad",
    type: "Full-time",
    exp: "3-6 yrs",
  },
  {
    id: "data-ai",
    t: "Data / AI Engineer",
    c: "VGM IT Hub Technologies",
    loc: "Remote (India)",
    type: "Full-time",
    exp: "2-5 yrs",
  },
  {
    id: "qa",
    t: "QA Automation Analyst",
    c: "VGM IT Hub Technologies",
    loc: "Hyderabad",
    type: "Full-time",
    exp: "2-4 yrs",
  },
  {
    id: "site-eng",
    t: "Site Engineer (Civil)",
    c: "VGM Hub Infra",
    loc: "Medchal",
    type: "Full-time",
    exp: "2-5 yrs",
  },
  {
    id: "proj-mgr",
    t: "Project Manager — Construction",
    c: "VGM Hub Infra",
    loc: "Hyderabad",
    type: "Full-time",
    exp: "8+ yrs",
  },
  {
    id: "architect",
    t: "Architect / Draftsman",
    c: "VGM Hub Infra",
    loc: "Hyderabad",
    type: "Full-time",
    exp: "1-4 yrs",
  },
  {
    id: "intern",
    t: "Engineering Intern",
    c: "VGM Group",
    loc: "Hyderabad",
    type: "Internship",
    exp: "Fresher",
  },
];

const filters = ["All", "VGM IT Hub Technologies", "VGM Hub Infra", "VGM Group"] as const;

function Careers() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const visible = filter === "All" ? jobs : jobs.filter((j) => j.c === filter);
  const job = jobs.find((j) => j.id === selected);

  return (
    <div>
      <PageHero
        eyebrow="Careers"
        title="Build your future while we build others'"
        copy="Join a group where software teams and site teams share the same standard of craft. Pick a role, tell us about yourself, and we'll get back within a week."
      />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-wrap gap-3">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`border px-4 py-2 text-xs uppercase tracking-[0.15em] transition-colors ${
                filter === f
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "All" ? "All roles" : f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <ul className="space-y-4">
            {visible.map((j) => (
              <li key={j.id} className="card-lux p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl">{j.t}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.15em] text-primary">{j.c}</p>
                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-3.5" /> {j.loc}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="size-3.5" /> {j.type}
                      </span>
                      <span>{j.exp}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelected(j.id);
                      setSubmitted(false);
                    }}
                    className="border border-primary px-5 py-2 text-xs uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    Apply
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="card-lux p-7">
              <h2 className="text-2xl">Apply now</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {job
                  ? `Applying for ${job.t} · ${job.c}`
                  : "Select a role, or send a general application."}
              </p>

              {submitted ? (
                <div className="mt-8 flex flex-col items-center py-8 text-center">
                  <div className="flex size-12 items-center justify-center rounded-full border border-primary">
                    <Check className="size-5 text-primary" />
                  </div>
                  <h3 className="mt-5 text-lg">Almost there</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We've opened a prefilled email to {careersEmail} — attach your resume and hit
                    send. Our people team responds within a week.
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
                    const role = job ? `${job.t} · ${job.c}` : "General application";
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
                  <div>
                    <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      Role
                    </label>
                    <select
                      value={selected ?? ""}
                      onChange={(e) => setSelected(e.target.value || null)}
                      className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                    >
                      <option value="">General application</option>
                      {jobs.map((j) => (
                        <option key={j.id} value={j.id}>
                          {j.t}
                        </option>
                      ))}
                    </select>
                  </div>
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
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="mt-2 w-full border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}
