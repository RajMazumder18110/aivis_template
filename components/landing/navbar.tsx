"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Sparkles, X } from "lucide-react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500">
            <Sparkles className="h-4 w-4 text-black" />
          </div>
          <span className="text-xl font-bold tracking-tight">AiVis</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/editor">
            <Button
              size="sm"
              className="bg-amber-500 text-black hover:bg-amber-400 font-semibold"
            >
              Get Started Free
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            showCloseButton={false}
            className="w-70 border-white/5 bg-background/95 backdrop-blur-xl p-0"
          >
            {/* Sheet header with close */}
            <SheetHeader className="flex flex-row items-center justify-between border-b border-white/5 px-5 py-4">
              <SheetTitle className="text-lg font-bold tracking-tight text-foreground">
                Menu
              </SheetTitle>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </SheetHeader>
            <SheetDescription className="sr-only">
              Navigation menu
            </SheetDescription>

            {/* Nav links */}
            <nav className="flex flex-col px-5 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-[15px] font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}

              {/* CTA buttons */}
              <div className="mt-4 flex flex-col gap-3">
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-white/10 text-foreground hover:bg-white/5"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/editor" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-amber-500 text-black hover:bg-amber-400 font-semibold">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
