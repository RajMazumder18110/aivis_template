import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Manage your AiVis account settings, subscription, billing, notifications, and security preferences.",
  openGraph: {
    title: "Account Settings — AiVis",
    description:
      "Manage your profile, subscription plans, billing, and security settings.",
    url: "https://aivis.me/settings",
  },
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://aivis.me/settings",
  },
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
