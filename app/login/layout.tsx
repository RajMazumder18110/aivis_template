import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in or create your AiVis account to start editing images with AI. Get 50 free credits on signup. Continue with Google, GitHub, or email.",
  openGraph: {
    title: "Sign In to AiVis",
    description:
      "Create your free AiVis account and start transforming images with AI. 50 free credits included.",
    url: "https://aivis.me/login",
  },
  alternates: {
    canonical: "https://aivis.me/login",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
