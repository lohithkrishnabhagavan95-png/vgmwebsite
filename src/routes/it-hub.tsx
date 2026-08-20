import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site-chrome";
import { Code2, Cloud, Brain, LifeBuoy, Smartphone, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/it-hub")({
  head: () => ({
    meta: [
      { title: "VGM IT Hub Technologies — Software, Cloud & AI Engineering" },
      {
        name: "description",
        content:
          "VGM IT Hub Technologies builds web and mobile products, cloud platforms, data and AI systems, plus managed IT teams for growing businesses.",
      },
      { property: "og:title", content: "VGM IT Hub Technologies" },
      {
        property: "og:description",
        content: "Product engineering, cloud, data and AI from the VGM Group technology vertical.",
      },
    ],
  }),
  component: ITHub,
});

const services = [
  {
    icon: Code2,
    t: "Product Engineering",
    d: "Web platforms and internal tools built to ship fast and scale cleanly.",
  },
  {
    icon: Smartphone,
    t: "Mobile Apps",
    d: "Cross-platform apps with native polish for iOS and Android.",
  },
  { icon: Cloud, t: "Cloud & DevOps", d: "Migration, IaC, CI/CD and cost-tuned infrastructure." },
  {
    icon: Brain,
    t: "Data & AI",
    d: "Dashboards, pipelines and applied AI assistants for real workflows.",
  },
  {
    icon: ShieldCheck,
    t: "Security & QA",
    d: "Audits, automated testing and compliance-ready hardening.",
  },
  {
    icon: LifeBuoy,
    t: "Managed IT Teams",
    d: "Dedicated pods that extend your in-house engineering.",
  },
];

const stack = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "AWS",
  "Azure",
  "PostgreSQL",
  "Kubernetes",
  "Flutter",
];

function ITHub() {
  return (
    <div>
      <PageHero
        eyebrow="Technology Vertical"
        title="VGM IT Hub Technologies"
        copy="We design, engineer and operate software that businesses run on — from a first MVP to platforms serving thousands of users daily."
      />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-3xl">What we do</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <article key={s.t} className="card-lux p-7">
              <s.icon className="size-7 text-primary" />
              <h3 className="mt-5 text-xl">{s.t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border/70 bg-surface/40">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-2xl">Our stack</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {stack.map((s) => (
              <span
                key={s}
                className="border border-border px-4 py-2 text-xs uppercase tracking-[0.15em] text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-3xl">How we engage</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["01", "Discover", "Workshops to map scope, users and constraints."],
            ["02", "Architect", "Technical blueprint, estimate and delivery plan."],
            ["03", "Build", "Two-week sprints with demos and live staging."],
            ["04", "Operate", "Monitoring, SLAs and continuous improvement."],
          ].map(([n, t, d]) => (
            <li key={n} className="card-lux p-7">
              <p className="font-display text-2xl text-gilded">{n}</p>
              <h3 className="mt-4 text-lg">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
