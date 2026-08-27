import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site-chrome";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "VGM Group Team — Leadership Across IT & Infra" },
      {
        name: "description",
        content:
          "Meet the VGM Group leadership steering VGM IT Hub Technologies and VGM Hub Infra — engineering, delivery, design and site operations.",
      },
      { property: "og:title", content: "The VGM Group Team" },
      {
        property: "og:description",
        content: "Leadership across the group's technology and construction arms.",
      },
    ],
  }),
  component: Team,
});

const leaders = [
  {
    n: "Kiran Vandana",
    r: "Chairman",
    c: "VGM Group",
    bio: "Steering the group's two verticals with a single standard of craft — from software engineering at VGM IT Hub Technologies to build-to-order construction at VGM Hub Infra.",
  },
];

function Team() {
  return (
    <div>
      <PageHero
        eyebrow="Our People"
        title="The team behind the group"
        copy="Engineers, architects, project managers and site leaders who take ownership from first brief to final handover."
      />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="mx-auto grid max-w-3xl gap-6">
          {leaders.map((l) => (
            <article
              key={l.n}
              className="card-lux flex flex-col items-center gap-8 p-8 text-center sm:flex-row sm:items-center sm:text-left"
            >
              <div
                aria-hidden
                className="size-40 shrink-0 rounded-full border border-primary/25 bg-white"
              />
              <div>
                <h3 className="font-display text-2xl text-gilded">{l.n}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-primary">{l.r}</p>
                <p className="mt-1 text-xs text-muted-foreground">{l.c}</p>
                <div className="rule-gold mt-5 w-24" />
                <p className="mt-5 text-sm text-muted-foreground">{l.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
