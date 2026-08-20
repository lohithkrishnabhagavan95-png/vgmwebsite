import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About VGM Group — Our Story, Vision & Values" },
      {
        name: "description",
        content:
          "VGM Group brings technology and construction under one roof: the story, vision, values and milestones behind VGM IT Hub Technologies and VGM Hub Infra.",
      },
      { property: "og:title", content: "About VGM Group" },
      {
        property: "og:description",
        content:
          "One group, two verticals — technology and construction, held to the same standard.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <PageHero
        eyebrow="About Us"
        title="One group. Two disciplines. A single standard."
        copy="VGM Group was founded on a simple belief: whether the deliverable is code or concrete, the client deserves clarity, craftsmanship and a team that finishes what it starts."
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2">
        <div>
          <h2 className="text-3xl">Our story</h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            What began as a small software practice grew into a group serving businesses on two
            fronts. VGM IT Hub Technologies took shape around product engineering and cloud work. As
            clients asked for physical spaces to match their growth, VGM Hub Infra was formed to
            build them — offices, plants, homes, on request and on schedule.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Today the two companies share one leadership table, one quality bar and one promise:
            building businesses, creating futures.
          </p>
        </div>
        <div className="space-y-6">
          {[
            [
              "Vision",
              "To be the partner clients call for both their digital and physical growth.",
            ],
            [
              "Mission",
              "Deliver work that outlives the contract — maintainable systems and durable structures.",
            ],
            ["Values", "Transparency in pricing, discipline in timelines, pride in detail."],
          ].map(([t, d]) => (
            <div key={t} className="card-lux p-7">
              <h3 className="text-xl">{t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border/70 bg-surface/40">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl">Milestones</h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-4">
            {[
              ["2017", "VGM IT practice founded"],
              ["2020", "First enterprise cloud programme"],
              ["2022", "VGM Hub Infra launched"],
              ["2025", "Group crosses 120 projects"],
            ].map(([y, d]) => (
              <li key={y}>
                <p className="font-display text-2xl text-gilded">{y}</p>
                <div className="rule-gold my-3 w-16" />
                <p className="text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
