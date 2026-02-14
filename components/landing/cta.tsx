"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-linear-to-br from-amber-500/10 via-background to-orange-500/10 p-12 text-center sm:p-16"
        >
          {/* Background effects */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-amber-500/10 blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-orange-500/10 blur-[100px]" />
          </div>

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/20 ring-1 ring-amber-500/30">
              <Sparkles className="h-7 w-7 text-amber-400" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to create something{" "}
              <span className="bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                amazing
              </span>
              ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Join 200,000+ creators already using AiVis. Start with 50 free
              credits — no credit card required.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="h-12 bg-amber-500 px-8 text-base font-semibold text-black hover:bg-amber-400"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-white/10 px-8 text-base hover:bg-white/5"
              >
                Talk to Sales
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
