"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Type,
  Link2,
  Share2,
  Maximize,
  PenTool,
  ExternalLink,
} from "lucide-react";

const tools = [
  { icon: Type, label: "Text" },
  { icon: Link2, label: "Link" },
  { icon: Share2, label: "Share" },
  { icon: Maximize, label: "Resize" },
  { icon: PenTool, label: "Draw" },
  { icon: ExternalLink, label: "Export" },
];

export function Toolbar() {
  return (
    <div className="flex items-center justify-center gap-1 rounded-xl border border-white/5 bg-[#111113] px-2 py-1.5">
      {tools.map((tool) => (
        <Tooltip key={tool.label}>
          <TooltipTrigger asChild>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground">
              <tool.icon className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="border-white/10 bg-zinc-900 text-xs"
          >
            {tool.label}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
