import { ArrowRight, HeartHandshake, Lightbulb, Mountain, Sparkles } from "lucide-react";
import Link from "next/link";

import { HeroEntrance } from "@/components/common/hero-entrance";
import { HeroForgeWord } from "@/components/common/hero-forge-word";
import { IntroScreen } from "@/components/common/intro-screen";
import { ProductAnalysisPreview } from "@/components/common/product-analysis-preview";
import { Reveal } from "@/components/common/reveal";
import { Section } from "@/components/common/section";
import { MarketingNav } from "@/components/layout/marketing-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { features, journeySteps } from "@/lib/placeholder-data";

const simpleHelps = [
  "Explain your idea in plain words.",
  "Find what people may actually need.",
  "Choose what to build first.",
  "Improve the product without feeling lost.",
];

const buildingChallenges = [
  { title: "You have an idea, but it is still cloudy.", icon: Lightbulb },
  { title: "You are not sure what people really want.", icon: HeartHandshake },
  { title: "You need the next step, not a giant plan.", icon: Mountain },
];

const founderQuestions = [
  "Who is this really for?",
  "What problem is painful enough to matter?",
  "What should I build first?",
  "What could make this idea fail?",
  "How small can the first version be?",
  "What would prove people want it?",
];

export default function LandingPage() {
  return (
    <>
      <IntroScreen />
      <MarketingNav />
      <main>
        <section className="mx-auto grid min-h-[75vh] max-w-7xl items-start gap-x-12 gap-y-8 px-6 pb-10 pt-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <HeroForgeWord />
            <HeroEntrance delay={0.08} fromY={18}>
              <h1 className="mt-5 max-w-[680px] text-balance text-5xl font-medium leading-[1.04] tracking-[-0.04em] md:text-7xl">
                Build something people actually want.
              </h1>
              <p className="mt-5 max-w-xl text-xl leading-8 text-muted-foreground md:text-2xl md:leading-9">
                Forge gives early ideas the clarity to move forward.
              </p>
            </HeroEntrance>
            <HeroEntrance delay={0.48} fromY={16}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/register">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg">
                  See how it works
                </Button>
              </div>
            </HeroEntrance>
          </div>
          <HeroEntrance className="w-full lg:justify-self-end" delay={0.86} fromX={36} fromY={0} mountOnEnter>
            <ProductAnalysisPreview />
          </HeroEntrance>
        </section>

        <Section
          eyebrow="Why it matters"
          title="Building something new can feel lonely."
          description="There are too many choices, too many opinions, and often no clear answer. Forge gives you a quieter place to think."
          className="pt-10"
        >
          <div id="why" className="grid gap-4 md:grid-cols-3">
            {buildingChallenges.map((challenge) => (
              <Card key={challenge.title} className="p-7">
                <challenge.icon className="h-6 w-6 text-indigo-200" />
                <p className="mt-6 text-lg font-medium leading-7">{challenge.title}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="How Forge helps"
          title="It turns the messy beginning into something you can understand."
          description="Forge asks useful questions, organizes your thoughts, and helps you see the next simple move."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {simpleHelps.map((item) => (
              <Card key={item} className="p-6">
                <Sparkles className="h-5 w-5 text-indigo-200" />
                <p className="mt-5 text-base font-medium leading-7">{item}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section eyebrow="Four simple steps" title="From first thought to first move." className="py-16">
          <div id="steps" className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {journeySteps.map((step, index) => (
              <Card key={step} className="p-6">
                <span className="font-mono text-sm text-indigo-200">0{index + 1}</span>
                <p className="mt-5 text-sm font-medium leading-6">{step}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="What you can do"
          title="A simple place to shape the product."
          description="Use Forge when you need to think, choose, plan, or improve."
        >
          <div id="features" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.05}>
                <Card className="h-full p-7">
                  <feature.icon className="h-6 w-6 text-indigo-200" />
                  <h3 className="mt-6 text-xl font-semibold leading-7 tracking-tight">{feature.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Pricing"
          title="Start for free. Upgrade when Forge becomes part of your rhythm."
          description="Keep the first step easy. Learn the product, shape one idea, and decide from there."
        >
          <div id="pricing" className="grid gap-4 md:grid-cols-3">
            {[
              ["Starter", "Free", "For your first idea."],
              ["Plus", "$19", "For building with more context."],
              ["Team", "Custom", "For teams shaping products together."],
            ].map(([name, price, description]) => (
              <Card key={name} className="p-7">
                <p className="text-sm font-medium text-muted-foreground">{name}</p>
                <p className="mt-4 text-4xl font-semibold tracking-tight">{price}</p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{description}</p>
              </Card>
            ))}
          </div>
        </Section>
        <Section eyebrow="Questions Forge answers" title="What Forge helps you figure out.">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {founderQuestions.map((question) => (
              <Card key={question} className="p-7">
                <p className="text-xl font-semibold leading-8 tracking-tight">{question}</p>
              </Card>
            ))}
          </div>
        </Section>
        <Section className="py-16">
          <Card className="flex flex-col items-start justify-between gap-8 rounded-[2rem] p-8 md:flex-row md:items-center md:p-10">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Bring your idea. Forge will help with the next step.
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Start with a name, a few notes, or even a messy thought. That is enough.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/dashboard/create">
                Create your first project <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Card>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}



