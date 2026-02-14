"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { EditorCanvas, type CanvasTool } from "./editor-canvas";
import { CanvasToolbar } from "./canvas-toolbar";
import {
  Upload,
  ImageIcon,
  Sparkles,
  Paintbrush,
  X,
  ArrowUp,
  Paperclip,
  Plus,
  Pin,
  Columns2,
} from "lucide-react";

const tags = [
  { label: "Inpaint", active: true },
  { label: "Mask & Fill", active: true },
  { label: "Stable Diffusion XL", active: true },
  { label: "1:1", active: false },
];

export function Canvas() {
  const [activeTool, setActiveTool] = useState<CanvasTool>("select");
  const [brushSize, setBrushSize] = useState(24);
  const [maskOpacity, setMaskOpacity] = useState(0.5);
  const [maskColor] = useState("rgba(245, 158, 11, 0.6)");
  const [aiPrompt, setAiPrompt] = useState("");
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [subImages, setSubImages] = useState<
    { id: string; src: string; name: string }[]
  >([]);
  const [activeSubImage, setActiveSubImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [comparePosition, setComparePosition] = useState(50);
  const compareRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const subFileInputRef = useRef<HTMLInputElement>(null);

  const handleImageLoad = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImage(img);
      setFileName(file.name);
    };
    img.src = url;
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        handleImageLoad(file);
      }
    },
    [handleImageLoad],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) {
        handleImageLoad(file);
      }
    },
    [handleImageLoad],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const clearImage = useCallback(() => {
    setImage(null);
    setFileName("");
    setSubImages([]);
    setActiveSubImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleSubImageAdd = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
      Array.from(files).forEach((file) => {
        if (!file.type.startsWith("image/")) return;
        const url = URL.createObjectURL(file);
        setSubImages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), src: url, name: file.name },
        ]);
      });
      if (subFileInputRef.current) subFileInputRef.current.value = "";
    },
    [],
  );

  const removeSubImage = useCallback((id: string) => {
    setSubImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.src);
      return prev.filter((i) => i.id !== id);
    });
    setActiveSubImage((prev) => (prev === id ? null : prev));
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLInputElement
      )
        return;
      switch (e.key.toLowerCase()) {
        case "v":
          setActiveTool("select");
          break;
        case "b":
          setActiveTool("mask");
          break;
        case "e":
          setActiveTool("eraser");
          break;
        case "[":
          setBrushSize((s) => Math.max(2, s - 4));
          break;
        case "]":
          setBrushSize((s) => Math.min(200, s + 4));
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-1 flex-col h-screen overflow-hidden">
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        ref={subFileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleSubImageAdd}
      />

      {/* Toolbar */}
      <div className="flex items-center justify-center px-6 py-2 shrink-0 mt-5">
        <CanvasToolbar
          activeTool={activeTool}
          onToolChange={setActiveTool}
          onUpload={() => fileInputRef.current?.click()}
          compareMode={compareMode}
          onToggleCompare={() => setCompareMode(!compareMode)}
        />
      </div>

      {/* Edit History Strip */}
      {
        <div className="flex items-center gap-2.5 overflow-x-auto px-6 py-2 shrink-0">
          {subImages.map((sub) => (
            <div
              key={sub.id}
              onClick={() =>
                setActiveSubImage((p) => (p === sub.id ? null : sub.id))
              }
              className={`group relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-lg border transition-all ${
                activeSubImage === sub.id
                  ? "border-amber-500 ring-1 ring-amber-500/40"
                  : "border-white/10 hover:border-white/25"
              }`}
            >
              <img
                src={sub.src}
                alt={sub.name}
                className="h-full w-full object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="absolute right-1 top-1 hidden h-5 w-5 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm group-hover:flex"
              >
                <Pin className="h-3 w-3 text-amber-400" />
              </button>
            </div>
          ))}
        </div>
      }

      {/* Main Canvas Area */}
      {image ? (
        <div className="relative flex flex-1 flex-col overflow-hidden">
          {compareMode ? (
            /* Before/After Comparison Slider */
            <div
              ref={compareRef}
              className="relative h-full w-full cursor-col-resize select-none"
              onMouseDown={(e) => {
                const rect = compareRef.current?.getBoundingClientRect();
                if (!rect || !image) return;
                // Compute rendered image bounds within the container
                const containerW = rect.width;
                const containerH = rect.height;
                const imgAspect = image.naturalWidth / image.naturalHeight;
                const containerAspect = containerW / containerH;
                let renderedW: number;
                if (imgAspect > containerAspect) {
                  renderedW = containerW;
                } else {
                  renderedW = containerH * imgAspect;
                }
                const imgLeft = (containerW - renderedW) / 2;
                const imgRight = imgLeft + renderedW;
                const minPct = (imgLeft / containerW) * 100 + 2;
                const maxPct = (imgRight / containerW) * 100 - 2;
                const handleMove = (ev: MouseEvent) => {
                  const x = ((ev.clientX - rect.left) / rect.width) * 100;
                  setComparePosition(Math.max(minPct, Math.min(maxPct, x)));
                };
                const handleUp = () => {
                  document.removeEventListener("mousemove", handleMove);
                  document.removeEventListener("mouseup", handleUp);
                };
                handleMove(e.nativeEvent);
                document.addEventListener("mousemove", handleMove);
                document.addEventListener("mouseup", handleUp);
              }}
            >
              {/* Before (original) — full width behind */}
              <div className="absolute inset-0 flex items-center justify-center bg-[#09090b]">
                <img
                  src={image.src}
                  alt="Before"
                  className="max-h-full max-w-full object-contain opacity-60 grayscale"
                  draggable={false}
                />
              </div>

              {/* After (edited) — clipped */}
              <div
                className="absolute inset-0 flex items-center justify-center bg-[#09090b] overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - comparePosition}% 0 0)` }}
              >
                <img
                  src={image.src}
                  alt="After"
                  className="max-h-full max-w-full object-contain"
                  draggable={false}
                />
              </div>

              {/* Slider line */}
              <div
                className="absolute top-0 bottom-0 z-10 w-0.5 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
                style={{ left: `${comparePosition}%` }}
              >
                {/* Handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-amber-400 bg-[#111113] shadow-lg">
                  <Columns2 className="h-4 w-4 text-amber-400" />
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 z-10 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-sm">
                Before
              </div>
              <div className="absolute top-4 right-4 z-10 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-amber-400 backdrop-blur-sm">
                After
              </div>
            </div>
          ) : (
            <EditorCanvas
              activeTool={activeTool}
              brushSize={brushSize}
              maskOpacity={maskOpacity}
              maskColor={maskColor}
              image={image}
            />
          )}
        </div>
      ) : (
        /* Upload Zone */
        <div
          className="relative flex-1 flex items-center justify-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {/* Subtle grid bg */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          <div
            className={`relative z-10 flex flex-col items-center gap-6 rounded-2xl border-2 border-dashed p-12 transition-all max-w-lg w-full mx-8 ${
              isDragOver
                ? "border-amber-500 bg-amber-500/5 scale-[1.01]"
                : "border-white/10 bg-white/1 hover:border-white/20"
            }`}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 ring-1 ring-amber-500/20">
              <Upload className="h-7 w-7 text-amber-400" />
            </div>

            <div className="text-center">
              <p className="text-base font-medium">Drop your image here</p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                or click to browse — PNG, JPG, WebP supported
              </p>
            </div>

            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-amber-500 font-semibold text-black hover:bg-amber-400"
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Choose Image
            </Button>

            <div className="flex items-center gap-4 text-xs text-muted-foreground/50">
              <span>Max 20MB</span>
              <span>•</span>
              <span>Up to 4096×4096</span>
            </div>
          </div>

          {/* AI hint */}
          <div className="absolute bottom-6 flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 text-amber-400" />
            Upload an image, then use mask & selection tools to edit with AI
          </div>
        </div>
      )}

      {/* Sub-images strip + AI Input Box */}
      <div className="shrink-0 px-6 py-3 space-y-3">
        {/* Sub-images strip */}
        {image && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {subImages.map((sub) => (
              <div
                key={sub.id}
                onClick={() =>
                  setActiveSubImage((p) => (p === sub.id ? null : sub.id))
                }
                className={`group relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border transition-all ${
                  activeSubImage === sub.id
                    ? "border-amber-500 ring-1 ring-amber-500/40"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                <img
                  src={sub.src}
                  alt={sub.name}
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="absolute right-1 top-1 hidden h-5 w-5 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm group-hover:flex"
                >
                  <Pin className="h-3 w-3 text-amber-400" />
                </button>
              </div>
            ))}
            <button
              onClick={() => subFileInputRef.current?.click()}
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-dashed border-white/10 text-muted-foreground transition-colors hover:border-amber-500/40 hover:text-amber-400"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* AI Input */}
        <div className="mx-auto flex max-w-2xl items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-2 transition-colors focus-within:border-amber-500/40 focus-within:bg-white/5">
          <Sparkles className="h-4 w-4 shrink-0 text-amber-400" />
          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Describe what you want to change..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
            onKeyDown={(e) => {
              if (e.key === "Enter" && aiPrompt.trim()) {
                // TODO: handle AI prompt submission
                setAiPrompt("");
              }
            }}
          />
          <button className="shrink-0 rounded-full p-1 text-muted-foreground/50 transition-colors hover:text-foreground">
            <Paperclip className="h-4 w-4" />
          </button>
          <button
            disabled={!aiPrompt.trim()}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-black transition-colors hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
