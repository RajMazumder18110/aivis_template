import type { Metadata } from "next";
import { EditorSidebar } from "@/components/editor/sidebar";
import { Canvas } from "@/components/editor/canvas";
import { SettingsPanel } from "@/components/editor/settings-panel";

export const metadata: Metadata = {
  title: "Editor",
  description:
    "AI-powered image editor with inpainting, outpainting, background removal, style transfer, and smart filters. Edit images directly in your browser.",
  openGraph: {
    title: "AiVis Editor — AI Image Editing Suite",
    description:
      "Edit, enhance, and transform images with powerful AI tools. Inpainting, outpainting, filters, and more.",
    url: "https://aivis.me/editor",
  },
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://aivis.me/editor",
  },
};

export default function EditorPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <EditorSidebar />
      <Canvas />
      <SettingsPanel />
    </div>
  );
}
