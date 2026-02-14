"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Graphic Designer",
    initials: "SC",
    rating: 5,
    quote:
      "AiVis has completely transformed my workflow. I can generate concept art in minutes instead of hours. The style transfer is insanely good.",
  },
  {
    name: "Marcus Johnson",
    role: "Content Creator",
    initials: "MJ",
    rating: 5,
    quote:
      "The credit-based pricing is perfect — I only pay for what I use. The image quality rivals tools that cost 5x more. Absolute game changer.",
  },
  {
    name: "Elena Rodriguez",
    role: "Marketing Director",
    initials: "ER",
    rating: 5,
    quote:
      "Our marketing team creates all social media visuals with AiVis now. Batch processing saved us 20+ hours per week. Worth every credit.",
  },
  {
    name: "David Park",
    role: "Indie Game Developer",
    initials: "DP",
    rating: 5,
    quote:
      "I use AiVis for all my game asset generation. The 3D render style and cyberpunk effects are incredible. It's like having an art team.",
  },
  {
    name: "Aisha Thompson",
    role: "Photographer",
    initials: "AT",
    rating: 5,
    quote:
      "The AI upscaling is unbelievable — I recovered old photos that I thought were lost forever. Background removal is pixel-perfect too.",
  },
  {
    name: "James Wright",
    role: "Agency Owner",
    initials: "JW",
    rating: 5,
    quote:
      "We switched our entire agency to AiVis Enterprise. Custom model fine-tuning lets us maintain brand consistency across all client work.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-amber-400">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Loved by{" "}
            <span className="bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              200,000+ creators
            </span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-xl border border-white/5 bg-white/2 p-6 transition-colors hover:border-amber-500/10"
            >
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-amber-500/10 text-xs text-amber-400">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
