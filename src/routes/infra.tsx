import { createFileRoute, Link } from "@tanstack/react-router";
import { HardHat, Home, Factory, Ruler, Hammer, KeyRound, ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/infra-hero.jpg";
import progressImg from "@/assets/infra-progress.jpg";

export const Route = createFileRoute("/infra")({
  head: () => ({
    meta: [
      { title: "VGM Hub Infra — Turnkey Construction on Client Request" },
      {
        name: "description",
        content:
          "VGM Hub Infra constructs residential, commercial and industrial projects to client requirement — design, approvals, execution and handover.",
      },
      { property: "og:title", content: "VGM Hub Infra" },
      {
        property: "og:description",
        content: "Turnkey construction from drawing to handover, built to client requirement.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Infra,
});

const capabilities = [
  {
    icon: Home,
    t: "Civil Works",
    d: "Government schools, hospitals, street lights, buildings and corporate parking lots.",
  },
  {
    icon: Factory,
    t: "Commercial & Industrial",
    d: "Offices, retail shells, warehouses and factory sheds.",
  },
  {
    icon: Ruler,
    t: "Design & Approvals",
    d: "Architecture, structural drawings and statutory clearances.",
  },
  {
    icon: Hammer,
    t: "Civil Execution",
    d: "Own supervisors, vetted vendors, quality checks at every stage.",
  },
  { icon: HardHat, t: "Renovation & Interiors", d: "Retrofits, fit-outs and finishing packages." },
  { icon: KeyRound, t: "Turnkey Handover", d: "One contract, one accountable team, keys in hand." },
];

const services = [
  "Government & Public Infrastructure Buildings",
  "Schools, Colleges & Educational Institutions",
  "Hospitals & Healthcare Facilities",
  "Corporate Parks & Commercial Campuses",
  "Office Buildings & Business Centres",
  "Industrial & Manufacturing Facilities",
  "Residential & Township Developments",
  "Roads & Internal Infrastructure",
  "Corporate & Public Parking Facilities",
  "Street Lighting & Smart Lighting Systems",
  "Drainage, Water Supply & Utility Networks",
  "Landscaping & Urban Development Works",
  "Turnkey Construction & Infrastructure Projects",
];

const sectors = [
  "Government Infrastructure",
  "Educational Institutions",
  "Healthcare Facilities",
  "Corporate & Industrial Parks",
  "Roads & Highways",
  "Parking Infrastructure",
  "Street Lighting",
  "Turnkey Projects",
];

function Infra() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/70">
        <img
          src={heroImg}
          alt="Premium residential tower built by VGM Hub Infra at dusk"
          width={1600}
          height={1008}
          className="absolute inset-0 size-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        <div className="relative mx-auto max-w-6xl px-5 py-28">
          <p className="text-xs uppercase tracking-[0.35em] text-primary">Construction Vertical</p>
          <h1 className="mt-5 max-w-4xl text-5xl leading-[1.05] md:text-7xl">
            <span className="text-gilded">Engineering Trust.</span>
          </h1>
          <div className="rule-gold mt-6 w-48" />
          <p className="mt-6 max-w-2xl text-muted-foreground">
            VGM Hub Infra delivers integrated infrastructure and construction solutions for public
            and private sector developments. From planning and design to execution and handover, we
            undertake projects built for quality, functionality and long-term value.
          </p>
          <div className="mt-12 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-primary">
              Services / Projects We Undertake
            </p>
            <ul className="mt-6 grid gap-x-8 md:grid-cols-2">
              {services.map((s) => (
                <li
                  key={s}
                  className="flex items-baseline gap-3 border-b border-border/60 py-3 text-sm text-muted-foreground"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-primary">Our Story</p>
          <h2 className="mt-4 text-3xl md:text-4xl">Timeless structures, honest process</h2>
          <p className="mt-6 text-muted-foreground">
            Every VGM Hub Infra project blends durable engineering, premium craftsmanship and
            thoughtful design. We keep our own supervisors on site, publish weekly progress and hand
            over on a single accountable contract.
          </p>
          <p className="mt-4 text-muted-foreground">
            VGM Hub Infra delivers end-to-end construction and infrastructure solutions across
            government buildings, educational institutions, healthcare facilities, corporate parks,
            industrial developments, roads, parking infrastructure, street lighting and urban
            development projects.
          </p>
          <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border/70 pt-6">
            {sectors.map((sector) => (
              <li
                key={sector}
                className="flex items-baseline gap-2.5 text-[0.7rem] uppercase tracking-[0.12em] text-foreground"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                {sector}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={progressImg}
          alt="Engineers reviewing drawings on a VGM Hub Infra site at sunset"
          loading="lazy"
          width={1200}
          height={912}
          className="w-full border border-border/70 object-cover"
        />
      </section>

      <section id="capabilities" className="border-y border-border/70 bg-surface/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl md:text-4xl">Capabilities</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {capabilities.map((c) => (
              <article key={c.t} className="card-lux p-7">
                <c.icon className="size-7 text-primary" />
                <h3 className="mt-5 text-xl">{c.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{c.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-3xl md:text-4xl">Build process</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-5">
          {[
            ["01", "Requirement", "Site visit, budget and brief."],
            ["02", "Design", "Drawings, 3D views and BOQ."],
            ["03", "Approvals", "Permits and sanction support."],
            ["04", "Execution", "Staged construction with weekly reports."],
            ["05", "Handover", "Snag closure, warranty and keys."],
          ].map(([n, t, d]) => (
            <li key={n} className="border-l border-primary/50 pl-4">
              <p className="font-display text-xl text-gilded">{n}</p>
              <h3 className="mt-2 text-lg">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="card-lux flex flex-col items-start justify-between gap-6 p-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl">Have a plot or a plan?</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Share your requirement — we respond with a feasibility note and indicative BOQ.
            </p>
          </div>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 border border-primary px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Talk to us <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
