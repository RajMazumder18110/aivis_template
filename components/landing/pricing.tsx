"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Rocket, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    icon: Zap,
    price: "Free",
    period: "",
    credits: "50 credits/month",
    description: "Perfect for trying out AiVis and casual projects.",
    features: [
      "50 AI credits per month",
      "Text-to-image generation",
      "Basic style transfer",
      "720p export resolution",
      "Community support",
      "3 projects",
    ],
    cta: "Get Started Free",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Pro",
    icon: Crown,
    price: "$19",
    period: "/month",
    credits: "500 credits/month",
    description: "For creators who need more power and flexibility.",
    features: [
      "500 AI credits per month",
      "All AI tools & models",
      "4K export resolution",
      "Batch processing (up to 50)",
      "Priority processing speed",
      "Unlimited projects",
      "API access",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    variant: "default" as const,
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Rocket,
    price: "$49",
    period: "/month",
    credits: "2,000 credits/month",
    description: "For teams and businesses with high-volume needs.",
    features: [
      "2,000 AI credits per month",
      "Everything in Pro",
      "8K export resolution",
      "Unlimited batch processing",
      "Custom model fine-tuning",
      "Team collaboration",
      "Dedicated account manager",
      "SLA & uptime guarantee",
      "SSO & advanced security",
    ],
    cta: "Contact Sales",
    variant: "outline" as const,
    popular: false,
  },
];

const creditPacks = [
  { credits: "100", price: "$5", perCredit: "$0.05" },
  { credits: "500", price: "$20", perCredit: "$0.04" },
  { credits: "1,000", price: "$35", perCredit: "$0.035" },
  { credits: "5,000", price: "$150", perCredit: "$0.03" },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-125 w-175 rounded-full bg-amber-500/5 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-amber-400">
            Pricing
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Simple, credit-based{" "}
            <span className="bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              pricing
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Pay only for what you use. Each AI operation costs credits — no
            hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl border p-8 ${
                plan.popular
                  ? "border-amber-500/40 bg-amber-500/3 shadow-lg shadow-amber-500/5"
                  : "border-white/5 bg-white/2"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black font-semibold hover:bg-amber-400">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Most Popular
                </Badge>
              )}

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 ring-1 ring-amber-500/20">
                  <plan.icon className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold">{plan.name}</h3>
              </div>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-muted-foreground">{plan.period}</span>
                )}
              </div>

              <p className="mt-1 text-sm text-amber-400 font-medium">
                {plan.credits}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {plan.description}
              </p>

              <Button
                className={`mt-6 w-full font-semibold ${
                  plan.popular
                    ? "bg-amber-500 text-black hover:bg-amber-400"
                    : "border-white/10 hover:bg-white/5"
                }`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
              </Button>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Credit Packs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-20 max-w-3xl"
        >
          <div className="rounded-2xl border border-white/5 bg-white/2 p-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold">
                Need more credits? Buy credit packs anytime
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Top up your account with additional credits. The more you buy,
                the less you pay per credit.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {creditPacks.map((pack) => (
                <div
                  key={pack.credits}
                  className="group cursor-pointer rounded-xl border border-white/5 bg-white/2 p-4 text-center transition-all hover:border-amber-500/20 hover:bg-amber-500/3"
                >
                  <p className="text-2xl font-bold text-amber-400">
                    {pack.credits}
                  </p>
                  <p className="text-xs text-muted-foreground">credits</p>
                  <p className="mt-2 text-lg font-semibold">{pack.price}</p>
                  <p className="text-xs text-muted-foreground">
                    {pack.perCredit}/credit
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
