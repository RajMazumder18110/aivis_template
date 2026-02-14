"use client";

import { motion } from "framer-motion";
import {
  ImageIcon,
  Video,
  Paintbrush,
  Layers,
  Wand2,
  Sparkles,
  Eraser,
  ArrowUpCircle,
} from "lucide-react";

const features = [
  {
    icon: ImageIcon,
    title: "Text to Image",
    description:
      "Generate photorealistic images from text prompts using Stable Diffusion XL, DALL-E 3, and Midjourney models.",
    color: "amber",
  },
  {
    icon: ArrowUpCircle,
    title: "AI Upscaling",
    description:
      "Upscale images up to 4x resolution with zero quality loss using advanced super-resolution networks.",
    color: "amber",
  },
  {
    icon: Paintbrush,
    title: "Inpainting & Outpainting",
    description:
      "Extend images beyond their borders or edit specific regions with context-aware AI fill.",
    color: "orange",
  },
  {
    icon: Sparkles,
    title: "AI Effects & Filters",
    description:
      "Apply intelligent effects like neon glow, cinematic lighting, HDR enhancement, and bokeh with one tap.",
    color: "orange",
  },
];

const colorMap: Record<string, string> = {
  amber: "bg-amber-500/10 text-amber-400 ring-amber-500/20",
  orange: "bg-orange-500/10 text-orange-400 ring-orange-500/20",
  yellow: "bg-yellow-500/10 text-yellow-400 ring-yellow-500/20",
};

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-amber-400">
            Features
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Everything you need to create{" "}
            <span className="bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              incredible visuals
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Professional-grade AI tools that were once limited to experts — now
            accessible to everyone.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative rounded-xl border border-white/5 bg-white/2 p-6 transition-all duration-300 hover:border-amber-500/20 hover:bg-amber-500/3"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ring-1 ${colorMap[feature.color]}`}
              >
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
