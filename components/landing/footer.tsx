import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-950/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Logo */}
          <div className="flex flex-col items-center sm:items-start">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500">
                <Sparkles className="h-4 w-4 text-black" />
              </div>
              <span className="text-xl font-bold">AiVis</span>
            </Link>
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Cookie Policy
            </Link>
          </div>
        </div>

        <Separator className="my-6 bg-white/5" />

        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} AiVis. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
