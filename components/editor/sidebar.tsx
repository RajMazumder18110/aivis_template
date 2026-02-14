"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  Zap,
  Crown,
  ImageIcon,
  Layers,
  Wand2,
  Eraser,
  Scissors,
} from "lucide-react";

export function EditorSidebar() {
  return (
    <aside className="flex h-screen w-14 shrink-0 flex-col items-center border-r border-white/5 bg-[#0c0c0e] py-3">
      {/* Logo */}
      <Link
        href="/"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500"
      >
        <Sparkles className="h-4 w-4 text-black" />
      </Link>

      <div className="flex-1" />

      <Separator className="w-6 bg-white/5" />

      <div className="flex flex-col items-center gap-3 mt-2">
        {/* User */}
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarFallback className="bg-amber-500/10 text-xs font-medium text-amber-400">
            DJ
          </AvatarFallback>
        </Avatar>
      </div>
    </aside>
  );
}
