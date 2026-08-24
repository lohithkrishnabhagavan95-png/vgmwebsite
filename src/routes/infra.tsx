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

const ticker = [
  "9+ Years of Craft",
  "Premium Residences",
  "Book a Site Visit",
  "120+ Projects Delivered",
  "Bespoke Constructions",
  "Turnkey Contracts",
];

const stats = [
  ["500+", "Happy families"],
  ["9+", "Years active"],
  ["5L+", "Sq ft built"],
  ["120+", "Projects done"],
];

const capabilities = [
  {
    icon: Home,
    t: "Residential",
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

const projects = [
  {
    n: "01",
    t: "Sringar Residency",
    loc: "Kompally, Hyderabad",
    units: "24 Units",
    area: "48,000 sqft",
    year: "2024",
    img: heroImg,
  },
  {
    n: "02",
    t: "VGM Tech Park Shell",
    loc: "Gachibowli",
    units: "Office core",
    area: "42,000 sqft",
    year: "2023",
    img: progressImg,
  },
  {
    n: "03",
    t: "Anand Warehouse",
    loc: "Medchal",
    units: "PEB shed",
    area: "60,000 sqft",
    year: "2022",
    img: progressImg,
  },
  {
    n: "04",
    t: "Vasavi Triplex Villas",
    loc: "Shamirpet",
    units: "3 Villas",
    area: "15,000 sqft",
    year: "2025",
    img: heroImg,
  },
];

const journey = [
  ["2017", "Foundation", "VGM Hub Infra formed in Hyderabad with a small civil crew."],
  ["2020", "First landmark", "Delivered our first 20-unit premium residential block."],
  ["2023", "Industrial scale", "Expanded into pre-engineered warehouses and office cores."],
  ["2025", "Turnkey studio", "In-house design, approvals and interiors under one contract."],
];

function Ticker() {
  return (
    <div className="overflow-hidden border-y border-border/70 bg-surface/40 py-3">
      <div className="marquee-track">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {ticker.map((t) => (
              <span
                key={`${dup}-${t}`}
                className="flex items-center gap-6 px-6 text-xs uppercase tracking-[0.28em] text-muted-foreground"
              >
                {t}
                <span className="text-primary">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

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
            VGM Hub Infra builds landmark residences, commercial cores and industrial facilities on
            client request — from concept and drawings through approvals, execution and handover.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#works"
              className="inline-flex items-center gap-2 border border-primary px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Explore our work <ArrowUpRight className="size-4" />
            </a>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Book a consultation
            </Link>
          </div>
          <div className="mt-16 grid max-w-3xl grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map(([k, v]) => (
              <div key={v}>
                <p className="font-display text-4xl text-gilded">{k}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Ticker />

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
            Whether it is a family villa, a 40,000 sq ft office core or an industrial shed, the
            standard of finish does not change.
          </p>
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

      <section className="border-y border-border/70 bg-surface/40">
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

      <section id="works" className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-3xl md:text-4xl">
            Selected <span className="text-gilded">works</span>
          </h2>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">2022 — 2025</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <article key={p.t} className="card-lux group overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={`${p.t} by VGM Hub Infra`}
                  loading="lazy"
                  className="size-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 font-display text-sm text-gilded">
                  {p.n}
                </span>
              </div>
              <div className="p-7">
                <p className="text-xs uppercase tracking-[0.2em] text-primary">{p.loc}</p>
                <h3 className="mt-3 text-xl">{p.t}</h3>
                <dl className="mt-5 grid grid-cols-3 gap-4 border-t border-border/70 pt-5 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      Scope
                    </dt>
                    <dd className="mt-1">{p.units}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      Area
                    </dt>
                    <dd className="mt-1">{p.area}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      Year
                    </dt>
                    <dd className="mt-1">{p.year}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border/70 bg-surface/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl md:text-4xl">Our journey</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {journey.map(([y, t, d]) => (
              <li key={y} className="border-t border-primary/50 pt-5">
                <p className="font-display text-2xl text-gilded">{y}</p>
                <h3 className="mt-3 text-lg">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
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
