"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  MousePointer2,
  PaintBucket,
  Eraser,
  Undo2,
  Redo2,
  RotateCcw,
  Download,
  Upload,
  Columns2,
} from "lucide-react";

import type { CanvasTool } from "./editor-canvas";

interface CanvasToolbarProps {
  activeTool: CanvasTool;
  onToolChange: (tool: CanvasTool) => void;
  onUpload?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onReset?: () => void;
  onExport?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  compareMode?: boolean;
  onToggleCompare?: () => void;
}

const tools: {
  id: CanvasTool;
  icon: typeof MousePointer2;
  label: string;
  shortcut: string;
}[] = [
  { id: "select", icon: MousePointer2, label: "Selection Tool", shortcut: "V" },
  { id: "mask", icon: PaintBucket, label: "Mask Brush", shortcut: "B" },
  { id: "eraser", icon: Eraser, label: "Eraser", shortcut: "E" },
];

export function CanvasToolbar({
  activeTool,
  onToolChange,
  onUpload,
  onUndo,
  onRedo,
  onReset,
  onExport,
  canUndo = false,
  canRedo = false,
  compareMode = false,
  onToggleCompare,
}: CanvasToolbarProps) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-white/5 bg-[#111113] px-3 py-1.5 shadow-lg shadow-black/20">
      {/* Primary Tools */}
      {tools.map((tool) => (
        <Tooltip key={tool.id}>
          <TooltipTrigger asChild>
            <button
              onClick={() => onToolChange(tool.id)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full transition-colors text-white",
                activeTool === tool.id
                  ? "bg-amber-500/15 text-amber-400"
                  : "text-white hover:bg-white/5 hover:text-foreground",
              )}
            >
              <tool.icon className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="dark border-white/10 bg-zinc-900 text-xs text-white"
          >
            <span>{tool.label}</span>
            <kbd className="ml-2 rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white">
              {tool.shortcut}
            </kbd>
          </TooltipContent>
        </Tooltip>
      ))}

      <Separator orientation="vertical" className="mx-1 h-6 bg-white/5" />

      {/* History */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/5 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Undo2 className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="border-white/10 dark:bg-zinc-900 text-white text-xs"
        >
          Undo
          <kbd className="ml-2 rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-muted-foreground">
            ⌘Z
          </kbd>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/5 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed text-white"
          >
            <Redo2 className="h-4 w-4 text-white" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="border-white/10 bg-zinc-900 text-white text-xs"
        >
          Redo
          <kbd className="ml-2 rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-muted-foreground">
            ⌘⇧Z
          </kbd>
        </TooltipContent>
      </Tooltip>

      <Separator orientation="vertical" className="mx-1 h-6 bg-white/5" />

      {/* Reset & Export */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onReset}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/5 hover:text-foreground text-white"
          >
            <RotateCcw className="h-4 w-4 text-white" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="border-white/10 bg-zinc-900 text-xs text-white"
        >
          Reset Canvas
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onExport}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/5 hover:text-foreground text-white"
          >
            <Download className="h-4 w-4 text-white" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="border-white/10 bg-zinc-900 text-xs text-white"
        >
          Export
        </TooltipContent>
      </Tooltip>

      {/* Compare */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onToggleCompare}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
              compareMode
                ? "bg-amber-500/15 text-amber-400"
                : "text-white hover:bg-white/5 hover:text-foreground",
            )}
          >
            <Columns2 className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="dark border-white/10 bg-zinc-900 text-xs text-white"
        >
          Before / After
        </TooltipContent>
      </Tooltip>

      <Separator orientation="vertical" className="mx-1 h-6 bg-white/5" />

      {/* Upload */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onUpload}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/5 hover:text-foreground"
          >
            <Upload className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="dark border-white/10 bg-zinc-900 text-xs text-white"
        >
          Upload Image
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
