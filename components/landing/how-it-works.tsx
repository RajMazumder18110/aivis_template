"use client";

import { motion } from "framer-motion";
import { Upload, Wand2, Sparkles, Download } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Upload or Describe",
    description:
      "Upload an image or describe what you want to create using natural language prompts.",
  },
  {
    step: "02",
    icon: Wand2,
    title: "Choose AI Tools",
    description:
      "Select from text-to-image, style transfer, upscaling, effects, and more from our toolkit.",
  },
  {
    step: "03",
    icon: Sparkles,
    title: "AI Processes",
    description:
      "Our AI models process your request in seconds, generating high-quality results instantly.",
  },
  {
    step: "04",
    icon: Download,
    title: "Download & Share",
    description:
      "Export in any format and resolution. Share directly to social media or your design tools.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-amber-400">
            How It Works
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            From idea to image in{" "}
            <span className="bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              four simple steps
            </span>
          </h2>
        </motion.div>

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-16 hidden h-px bg-linear-to-r from-transparent via-amber-500/30 to-transparent lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 ring-2 ring-amber-500/20 backdrop-blur-sm">
                  <step.icon className="h-5 w-5 text-amber-400" />
                </div>
                <span className="mt-4 text-xs font-bold uppercase tracking-widest text-amber-500">
                  Step {step.step}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
