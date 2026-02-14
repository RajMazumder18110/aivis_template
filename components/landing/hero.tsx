"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Play,
  Sparkles,
  Zap,
  ImageIcon,
  Wand2,
} from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* Radial gradient */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-150 w-200 rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-100 w-100 rounded-full bg-amber-600/5 blur-[100px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="mb-6 border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-amber-400"
            >
              <Sparkles className="mr-2 h-3 w-3" />
              Powered by latest AI models
            </Badge>
          </motion.div>
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative max-w-4xl"
          >
            {/* Glow behind heading */}
            <div className="pointer-events-none absolute -inset-x-20 -top-12 bottom-0 bg-amber-500/[0.06] blur-[80px] rounded-full" />
            <h1 className="relative text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-8xl">
              <span className="block text-white/90">AI Vision</span>
              <span className="block mt-1">
                <span className="text-white/90">with </span>
                <span className="relative inline-block">
                  <span
                    className="bg-linear-to-r from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent animate-pulse"
                    style={{ animationDuration: "3s" }}
                  >
                    Your Creation
                  </span>
                  <motion.span
                    className="absolute -bottom-2 left-0 h-1 rounded-full bg-linear-to-r from-amber-400 to-orange-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                  />
                </span>
              </span>
            </h1>
          </motion.div>
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            Bring your imagination to life — generate, edit & transform images
            with{" "}
            <span className="text-amber-400 font-medium">cutting-edge AI</span>.{" "}
            Your vision, our intelligence.
          </motion.p>
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Link href="/editor">
              <Button
                size="lg"
                className="h-12 bg-amber-500 px-8 text-base font-semibold text-black hover:bg-amber-400"
              >
                Start Creating Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
          {/* Stats */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground sm:gap-12"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>
                <strong className="text-foreground">50K+</strong> images
                generated today
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <span>
                <strong className="text-foreground">200K+</strong> active
                creators
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>
                <strong className="text-foreground">4.9★</strong> average rating
              </span>
            </div>
          </motion.div> */}
          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="relative mt-16 w-full max-w-5xl"
          >
            {/* Glow behind the card */}
            <div className="absolute -inset-4 rounded-2xl bg-amber-500/10 blur-3xl animate-glow-pulse" />
            <div className="relative rounded-xl border border-white/10 bg-zinc-900/80 p-2 shadow-2xl backdrop-blur-sm">
              {/* Mock editor UI */}
              <div className="rounded-lg bg-zinc-950 p-6">
                {/* Top bar */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-red-500/60" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                    <div className="h-3 w-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                    <Sparkles className="h-3 w-3 text-amber-400" />
                    AiVis Editor
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-16 rounded bg-white/5" />
                    <div className="h-6 w-16 rounded bg-amber-500/20" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* Sidebar */}
                  <div className="space-y-3 rounded-lg bg-white/2 p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-amber-400">
                      <Wand2 className="h-4 w-4" />
                      AI Tools
                    </div>
                    {[
                      "Text to Image",
                      "Style Transfer",
                      "Background Remove",
                      "Upscale HD",
                      "Neon Glow",
                    ].map((tool) => (
                      <div
                        key={tool}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 cursor-pointer transition-colors"
                      >
                        <Zap className="h-3 w-3 text-amber-500/50" />
                        {tool}
                      </div>
                    ))}
                  </div>

                  {/* Main canvas */}
                  <div className="col-span-1 flex items-center justify-center rounded-lg bg-linear-to-br from-zinc-900 to-zinc-800 p-8 md:col-span-2 min-h-50">
                    <div className="flex flex-col items-center gap-4 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 ring-1 ring-amber-500/20">
                        <ImageIcon className="h-8 w-8 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Generate stunning images
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Describe what you want, AI does the rest
                        </p>
                      </div>
                      <div className="mt-2 flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 text-xs text-amber-400 ring-1 ring-amber-500/20">
                        <Sparkles className="h-3 w-3" />
                        &quot;A cyberpunk tiger with neon glow...&quot;
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
