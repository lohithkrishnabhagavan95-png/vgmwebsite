import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Cpu, ArrowRight } from "lucide-react";
import { logoUrl, brandRevealUrl } from "@/lib/assets";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VGM Group — Building Businesses. Creating Futures." },
      {
        name: "description",
        content:
          "VGM Group unites VGM IT Hub Technologies and VGM Hub Infra — software engineering and build-to-order construction under one standard of craft.",
      },
      { property: "og:title", content: "VGM Group — Building Businesses. Creating Futures." },
      {
        property: "og:description",
        content: "Two companies, one group: VGM IT Hub Technologies and VGM Hub Infra.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--gold)_14%,transparent),transparent_62%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5 py-24 text-center">
          <img src={logoUrl} alt="VGM Group logo" className="w-56 object-contain md:w-72" />

          <h1 className="mt-10 max-w-3xl text-4xl leading-tight md:text-6xl">
            <span className="text-gilded">Building Businesses. Creating Futures.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            VGM Group is a two-vertical house: engineering software that scales and constructing
            spaces that last. Whatever the client imagines, we design, build and hand over.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/it-hub"
              className="inline-flex items-center gap-2 border border-primary px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              IT Hub Technologies <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/infra"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Hub Infra <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-6">
        {/* Gold hairline frame around the reveal: the gradient sits on the
            outer element and the inset padding lets it read as a thin rule. */}
        <div className="rounded-2xl bg-[linear-gradient(140deg,color-mix(in_oklab,var(--gold)_55%,transparent),transparent_38%,color-mix(in_oklab,var(--gold)_35%,transparent))] p-px shadow-[0_28px_60px_-32px_oklch(0.35_0.12_28/0.45)]">
          <div className="overflow-hidden rounded-[calc(1rem-1px)] bg-card">
            <video
              src={brandRevealUrl}
              className="aspect-video w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-xs uppercase tracking-[0.35em] text-primary">The Group</p>
        <h2 className="mt-4 text-3xl md:text-4xl">Two companies, one standard</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="card-lux p-8">
            <Cpu className="size-8 text-primary" />
            <h3 className="mt-6 text-2xl">VGM IT Hub Technologies</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Product engineering, cloud platforms, data and AI, and long-term managed IT teams for
              growing businesses.
            </p>
            <Link
              to="/it-hub"
              className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary"
            >
              Explore <ArrowRight className="size-4" />
            </Link>
          </article>
          <article className="card-lux p-8">
            <Building2 className="size-8 text-primary" />
            <h3 className="mt-6 text-2xl">VGM Hub Infra</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Turnkey construction on client request — residential, commercial and industrial
              projects from drawing to handover.
            </p>
            <Link
              to="/infra"
              className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary"
            >
              Explore <ArrowRight className="size-4" />
            </Link>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-4">
        <div className="card-lux flex flex-col items-start justify-between gap-6 p-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl">Grow with VGM Group</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Open roles across engineering, design and site management.
            </p>
          </div>
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 border border-primary px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            View careers <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
