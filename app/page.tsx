import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { LogoCloud } from "@/components/landing/logo-cloud";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Pricing } from "@/components/landing/pricing";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "AiVis — AI Vision with Your Creation | Free AI Image Editor",
  description:
    "Transform your creative vision with AI. Generate images from text, remove backgrounds, apply style transfer, inpaint & outpaint—all in a browser-based editor. Start free with 50 credits.",
  openGraph: {
    title: "AiVis — AI Vision with Your Creation",
    description:
      "Transform your creative vision with AI. Generate images from text, remove backgrounds, apply style transfer, and more. Start free.",
    url: "https://aivis.me",
  },
  alternates: {
    canonical: "https://aivis.me",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoCloud />
        <Features />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
