"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Maximize2,
  ChevronDown,
  Sparkles,
  Settings2,
  Hash,
  Cpu,
  Sliders,
  ImageIcon,
  Box,
  Zap,
  Layers,
  Aperture,
  Flame,
  Globe,
  RectangleHorizontal,
  Square,
  RectangleVertical,
  Monitor,
  Smartphone,
  Proportions,
  ChevronRight,
  SlidersHorizontal,
  PanelRightClose,
  PanelRightOpen,
} from "lucide-react";

export function SettingsPanel() {
  const [collapsed, setCollapsed] = useState(false);
  const [imageDetail, setImageDetail] = useState([72]);
  const [numImages, setNumImages] = useState(4);
  const [selectedModel, setSelectedModel] = useState("sdxl");
  const [selectedEffect, setSelectedEffect] = useState("neon");
  const [effectsOpen, setEffectsOpen] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [trendyFiltersOpen, setTrendyFiltersOpen] = useState(false);
  const [modelsOpen, setModelsOpen] = useState(true);
  const [imageSizeOpen, setImageSizeOpen] = useState(false);
  const [resolutionOpen, setResolutionOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("1:1");
  const [selectedResolution, setSelectedResolution] = useState("1024");
  const [selectedFilter, setSelectedFilter] = useState("none");
  const [selectedTrendyFilter, setSelectedTrendyFilter] = useState("none");

  const imageSizes = [
    { id: "1:1", label: "1:1", icon: Square, color: "text-violet-400" },
    {
      id: "16:9",
      label: "16:9",
      icon: RectangleHorizontal,
      color: "text-sky-400",
    },
    {
      id: "9:16",
      label: "9:16",
      icon: RectangleVertical,
      color: "text-rose-400",
    },
    { id: "4:3", label: "4:3", icon: Monitor, color: "text-emerald-400" },
    { id: "3:4", label: "3:4", icon: Smartphone, color: "text-amber-400" },
    { id: "21:9", label: "21:9", icon: Proportions, color: "text-cyan-400" },
  ];

  const resolutions = [
    { id: "512", label: "512px", icon: Square, color: "text-zinc-400" },
    { id: "768", label: "768px", icon: Square, color: "text-sky-400" },
    { id: "1024", label: "1024px", icon: Square, color: "text-violet-400" },
    { id: "1280", label: "1280px", icon: Monitor, color: "text-emerald-400" },
    { id: "1536", label: "1536px", icon: Monitor, color: "text-amber-400" },
    { id: "2048", label: "2048px", icon: Maximize2, color: "text-rose-400" },
  ];

  const effects = [
    { id: "none", label: "None", gradient: "from-zinc-800 to-zinc-900" },
    {
      id: "neon",
      label: "Neon Glow",
      gradient: "from-cyan-500/40 to-purple-600/40",
    },
    {
      id: "vintage",
      label: "Vintage",
      gradient: "from-amber-700/40 to-yellow-900/40",
    },
    {
      id: "cinematic",
      label: "Cinematic",
      gradient: "from-blue-900/40 to-slate-800/40",
    },
    {
      id: "dreamy",
      label: "Dreamy",
      gradient: "from-pink-500/30 to-violet-500/30",
    },
    {
      id: "noir",
      label: "Noir",
      gradient: "from-neutral-700/50 to-neutral-900/50",
    },
    {
      id: "cyberpunk",
      label: "Cyberpunk",
      gradient: "from-fuchsia-600/40 to-cyan-400/30",
    },
    {
      id: "watercolor",
      label: "Watercolor",
      gradient: "from-teal-400/30 to-rose-400/30",
    },
  ];

  const filters = [
    { id: "none", label: "None", gradient: "from-zinc-700 to-zinc-800" },
    {
      id: "sharpen",
      label: "Sharpen",
      gradient: "from-slate-500/50 to-zinc-700/50",
    },
    { id: "blur", label: "Blur", gradient: "from-sky-400/20 to-blue-500/20" },
    {
      id: "grayscale",
      label: "B&W",
      gradient: "from-neutral-400/40 to-neutral-800/40",
    },
    {
      id: "sepia",
      label: "Sepia",
      gradient: "from-amber-600/30 to-orange-900/30",
    },
    {
      id: "contrast",
      label: "Contrast",
      gradient: "from-white/20 to-black/60",
    },
    {
      id: "saturation",
      label: "Vivid",
      gradient: "from-red-500/30 via-green-500/30 to-blue-500/30",
    },
    { id: "warm", label: "Warm", gradient: "from-orange-400/30 to-red-500/20" },
    { id: "cool", label: "Cool", gradient: "from-blue-400/30 to-cyan-500/30" },
    { id: "invert", label: "Invert", gradient: "from-white/30 to-zinc-900/60" },
    {
      id: "vignette",
      label: "Vignette",
      gradient: "from-transparent via-transparent to-black/50",
    },
    {
      id: "grain",
      label: "Grain",
      gradient: "from-stone-500/30 to-stone-700/30",
    },
  ];

  const trendyFilters = [
    { id: "none", label: "None", gradient: "from-zinc-700 to-zinc-800" },
    {
      id: "aurora",
      label: "Aurora",
      gradient: "from-emerald-400/30 via-cyan-500/30 to-violet-500/30",
    },
    {
      id: "sunset",
      label: "Sunset",
      gradient: "from-orange-500/30 via-pink-500/30 to-purple-600/30",
    },
    {
      id: "lomo",
      label: "Lomo",
      gradient: "from-yellow-600/30 to-rose-800/30",
    },
    {
      id: "polaroid",
      label: "Polaroid",
      gradient: "from-amber-200/20 to-stone-400/20",
    },
    {
      id: "glitch",
      label: "Glitch",
      gradient: "from-red-500/30 via-cyan-500/30 to-blue-500/30",
    },
    {
      id: "pastel",
      label: "Pastel",
      gradient: "from-pink-300/30 via-lavender-300/30 to-sky-300/30",
    },
    {
      id: "moody",
      label: "Moody",
      gradient: "from-slate-700/40 to-indigo-900/40",
    },
    {
      id: "chrome",
      label: "Chrome",
      gradient: "from-gray-300/30 via-white/20 to-gray-400/30",
    },
    {
      id: "retro",
      label: "Retro",
      gradient: "from-yellow-500/30 to-teal-600/30",
    },
    {
      id: "haze",
      label: "Haze",
      gradient: "from-blue-200/20 to-purple-300/20",
    },
    {
      id: "pop",
      label: "Pop Art",
      gradient: "from-red-500/30 via-yellow-400/30 to-blue-600/30",
    },
  ];

  const models = [
    { id: "sdxl", label: "SDXL", icon: Box, color: "text-violet-400" },
    { id: "sd3", label: "SD 3", icon: Layers, color: "text-sky-400" },
    {
      id: "dalle3",
      label: "DALL·E 3",
      icon: Aperture,
      color: "text-emerald-400",
    },
    { id: "midjourney", label: "MJ v6", icon: Flame, color: "text-rose-400" },
    { id: "flux", label: "Flux", icon: Zap, color: "text-amber-400" },
    { id: "imagen", label: "Imagen", icon: Globe, color: "text-cyan-400" },
  ];

  return (
    <aside
      className={cn(
        "flex h-screen shrink-0 flex-col overflow-hidden border-l border-white/5 bg-[#0c0c0e] transition-all duration-300",
        collapsed ? "w-14" : "w-75",
      )}
    >
      {/* Toggle */}
      <div
        className={cn(
          "flex h-14 items-center shrink-0",
          collapsed ? "justify-center" : "justify-between px-4",
        )}
      >
        {!collapsed && <span className="text-sm font-semibold">Settings</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {collapsed ? (
            <PanelRightOpen className="h-4 w-4" />
          ) : (
            <PanelRightClose className="h-4 w-4" />
          )}
        </button>
      </div>

      {collapsed ? (
        /* Collapsed: icon-only shortcuts */
        <div className="flex flex-col items-center gap-3 py-2">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
            title="Image Size"
          >
            <RectangleHorizontal className="h-4 w-4" />
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
            title="Resolution"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
            title="Model"
          >
            <Cpu className="h-4 w-4" />
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
            title="Effects"
          >
            <Sparkles className="h-4 w-4" />
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
            title="Filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
          <div className="flex-1" />
          <button
            onClick={() => setCollapsed(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-black hover:bg-amber-400 transition-colors"
            title="Generate"
          >
            <ImageIcon className="h-4 w-4" />
          </button>
          <div className="h-2" />
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-5">
              {/* Trendy Filters */}
              <div className="space-y-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
                <button
                  onClick={() => setTrendyFiltersOpen(!trendyFiltersOpen)}
                  className="flex w-full items-center justify-between py-1 text-sm transition-colors hover:text-amber-400"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <span className="font-medium text-amber-400">
                      Trendy Filters
                    </span>
                    <span className="rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-medium text-amber-400">
                      NEW
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-amber-400/60 transition-transform",
                      !trendyFiltersOpen && "-rotate-90",
                    )}
                  />
                </button>
                {trendyFiltersOpen && (
                  <div className="grid grid-cols-4 gap-2">
                    {trendyFilters.map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setSelectedTrendyFilter(filter.id)}
                        className={cn(
                          "group relative flex flex-col items-center gap-1.5 rounded-lg p-1 transition-all",
                          filter.id === selectedTrendyFilter
                            ? "ring-1.5 ring-amber-500"
                            : "ring-1 ring-white/5 hover:ring-white/15",
                        )}
                      >
                        <div
                          className={cn(
                            "h-10 w-full rounded-md bg-linear-to-br",
                            filter.gradient,
                          )}
                        />
                        <span
                          className={cn(
                            "text-[10px] leading-tight",
                            filter.id === selectedTrendyFilter
                              ? "text-amber-400"
                              : "text-muted-foreground",
                          )}
                        >
                          {filter.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Separator className="bg-white/5" />

              {/* Image Size */}
              <div className="space-y-3">
                <button
                  onClick={() => setImageSizeOpen(!imageSizeOpen)}
                  className="flex w-full items-center justify-between py-1 text-sm transition-colors hover:text-amber-400"
                >
                  <div className="flex items-center gap-2">
                    <RectangleHorizontal className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Image Size</span>
                    <span className="text-[11px] text-muted-foreground/60">
                      {imageSizes.find((s) => s.id === selectedSize)?.label}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform",
                      !imageSizeOpen && "-rotate-90",
                    )}
                  />
                </button>
                {imageSizeOpen && (
                  <div className="grid grid-cols-3 gap-2">
                    {imageSizes.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSize(size.id)}
                        className={cn(
                          "group relative flex flex-col items-center gap-1.5 rounded-lg p-2 transition-all",
                          size.id === selectedSize
                            ? "bg-white/5 ring-1.5 ring-amber-500"
                            : "bg-white/2 ring-1 ring-white/5 hover:ring-white/15 hover:bg-white/4",
                        )}
                      >
                        <size.icon
                          className={cn(
                            "h-5 w-5 transition-colors",
                            size.id === selectedSize
                              ? "text-amber-400"
                              : size.color,
                          )}
                        />
                        <span
                          className={cn(
                            "text-[10px] leading-tight font-medium",
                            size.id === selectedSize
                              ? "text-amber-400"
                              : "text-muted-foreground",
                          )}
                        >
                          {size.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Separator className="bg-white/5" />

              {/* Resolution */}
              <div className="space-y-3">
                <button
                  onClick={() => setResolutionOpen(!resolutionOpen)}
                  className="flex w-full items-center justify-between py-1 text-sm transition-colors hover:text-amber-400"
                >
                  <div className="flex items-center gap-2">
                    <Maximize2 className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Resolution</span>
                    <span className="text-[11px] text-muted-foreground/60">
                      {
                        resolutions.find((r) => r.id === selectedResolution)
                          ?.label
                      }
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform",
                      !resolutionOpen && "-rotate-90",
                    )}
                  />
                </button>
                {resolutionOpen && (
                  <div className="grid grid-cols-3 gap-2">
                    {resolutions.map((res) => (
                      <button
                        key={res.id}
                        onClick={() => setSelectedResolution(res.id)}
                        className={cn(
                          "group relative flex flex-col items-center gap-1.5 rounded-lg p-2 transition-all",
                          res.id === selectedResolution
                            ? "bg-white/5 ring-1.5 ring-amber-500"
                            : "bg-white/2 ring-1 ring-white/5 hover:ring-white/15 hover:bg-white/4",
                        )}
                      >
                        <res.icon
                          className={cn(
                            "h-5 w-5 transition-colors",
                            res.id === selectedResolution
                              ? "text-amber-400"
                              : res.color,
                          )}
                        />
                        <span
                          className={cn(
                            "text-[10px] leading-tight font-medium",
                            res.id === selectedResolution
                              ? "text-amber-400"
                              : "text-muted-foreground",
                          )}
                        >
                          {res.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Separator className="bg-white/5" />

              {/* Model */}
              <div className="space-y-3">
                <button
                  onClick={() => setModelsOpen(!modelsOpen)}
                  className="flex w-full items-center justify-between py-1 text-sm transition-colors hover:text-amber-400"
                >
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Model</span>
                    <span className="text-[11px] text-muted-foreground/60">
                      {models.find((m) => m.id === selectedModel)?.label}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform",
                      !modelsOpen && "-rotate-90",
                    )}
                  />
                </button>
                {modelsOpen && (
                  <div className="grid grid-cols-3 gap-2">
                    {models.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => setSelectedModel(model.id)}
                        className={cn(
                          "group relative flex flex-col items-center gap-1.5 rounded-lg p-2 transition-all",
                          model.id === selectedModel
                            ? "bg-white/5 ring-1.5 ring-amber-500"
                            : "bg-white/2 ring-1 ring-white/5 hover:ring-white/15 hover:bg-white/4",
                        )}
                      >
                        <model.icon
                          className={cn(
                            "h-5 w-5 transition-colors",
                            model.id === selectedModel
                              ? "text-amber-400"
                              : model.color,
                          )}
                        />
                        <span
                          className={cn(
                            "text-[10px] leading-tight font-medium",
                            model.id === selectedModel
                              ? "text-amber-400"
                              : "text-muted-foreground",
                          )}
                        >
                          {model.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Separator className="bg-white/5" />

              {/* Effects */}
              <div className="space-y-3">
                <button
                  onClick={() => setEffectsOpen(!effectsOpen)}
                  className="flex w-full items-center justify-between py-1 text-sm transition-colors hover:text-amber-400"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Effects</span>
                    <span className="text-[11px] text-muted-foreground/60">
                      {effects.find((e) => e.id === selectedEffect)?.label}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform",
                      !effectsOpen && "-rotate-90",
                    )}
                  />
                </button>
                {effectsOpen && (
                  <div className="grid grid-cols-4 gap-2">
                    {effects.map((effect) => (
                      <button
                        key={effect.id}
                        onClick={() => setSelectedEffect(effect.id)}
                        className={cn(
                          "group relative flex flex-col items-center gap-1.5 rounded-lg p-1 transition-all",
                          effect.id === selectedEffect
                            ? "ring-1.5 ring-amber-500"
                            : "ring-1 ring-white/5 hover:ring-white/15",
                        )}
                      >
                        <div
                          className={cn(
                            "h-10 w-full rounded-md bg-linear-to-br",
                            effect.gradient,
                          )}
                        />
                        <span
                          className={cn(
                            "text-[10px] leading-tight",
                            effect.id === selectedEffect
                              ? "text-amber-400"
                              : "text-muted-foreground",
                          )}
                        >
                          {effect.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Separator className="bg-white/5" />

              {/* Filters */}
              <div className="space-y-3">
                <button
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="flex w-full items-center justify-between py-1 text-sm transition-colors hover:text-amber-400"
                >
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Filters</span>
                    <span className="text-[11px] text-muted-foreground/60">
                      {filters.find((f) => f.id === selectedFilter)?.label}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform",
                      !filtersOpen && "-rotate-90",
                    )}
                  />
                </button>
                {filtersOpen && (
                  <div className="grid grid-cols-4 gap-2">
                    {filters.map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setSelectedFilter(filter.id)}
                        className={cn(
                          "group relative flex flex-col items-center gap-1.5 rounded-lg p-1 transition-all",
                          filter.id === selectedFilter
                            ? "ring-1.5 ring-amber-500"
                            : "ring-1 ring-white/5 hover:ring-white/15",
                        )}
                      >
                        <div
                          className={cn(
                            "h-10 w-full rounded-md bg-linear-to-br",
                            filter.gradient,
                          )}
                        />
                        <span
                          className={cn(
                            "text-[10px] leading-tight",
                            filter.id === selectedFilter
                              ? "text-amber-400"
                              : "text-muted-foreground",
                          )}
                        >
                          {filter.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Separator className="bg-white/5" />
            </div>
          </div>

          {/* Generate Button */}
          <div className="border-t border-white/5 p-4 shrink-0">
            <Button className="w-full h-11 bg-amber-500 text-sm font-bold text-black hover:bg-amber-400 shadow-lg shadow-amber-500/20">
              <ImageIcon className="mr-2 h-4 w-4" />
              Generate
            </Button>
          </div>
        </>
      )}
    </aside>
  );
}
