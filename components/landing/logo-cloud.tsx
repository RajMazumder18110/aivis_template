"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Cpu, Globe, Shield, BarChart3, Palette } from "lucide-react";

const logos = [
  "Stable Diffusion XL",
  "DALL-E 3",
  "Flux",
  "ControlNet",
  "LoRA",
  "ESRGAN",
];

const highlights = [
  {
    icon: Cpu,
    title: "Latest AI Models",
    description:
      "Access to SDXL, DALL-E 3, Flux and more cutting-edge models updated weekly.",
  },
  {
    icon: BarChart3,
    title: "Usage Analytics",
    description:
      "Track credit usage, generation history, and team activity in real-time.",
  },
  {
    icon: Palette,
    title: "50+ Art Styles",
    description:
      "From photorealism to anime, oil painting, 3D render, cyberpunk, and more.",
  },
  {
    icon: Sparkles,
    title: "Smart Prompting",
    description:
      "AI-assisted prompt enhancement that improves your results automatically.",
  },
];

export function LogoCloud() {
  return (
    <section className="relative py-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Model logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground">
            Powered by the world&apos;s leading AI models
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            {logos.map((logo) => (
              <Badge
                key={logo}
                variant="outline"
                className="border-white/5 bg-white/2 px-4 py-2 text-xs text-muted-foreground"
              >
                {logo}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Highlights grid */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex gap-4 rounded-lg p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 ring-1 ring-amber-500/20">
                <item.icon className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
