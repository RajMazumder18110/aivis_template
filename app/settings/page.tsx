"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  User,
  CreditCard,
  Bell,
  Shield,
  Palette,
  ArrowLeft,
  Camera,
  Check,
  Crown,
  Zap,
  Download,
  ChevronRight,
  ExternalLink,
  ToggleLeft,
  ToggleRight,
  Mail,
  Key,
  Trash2,
  LogOut,
} from "lucide-react";

type Tab = "profile" | "billing" | "notifications" | "security";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "billing", label: "Subscription & Billing", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "/month",
    credits: 50,
    features: [
      "50 credits/month",
      "Basic AI models",
      "720p export",
      "Community support",
    ],
    current: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19",
    period: "/month",
    credits: 500,
    features: [
      "500 credits/month",
      "All AI models",
      "4K export",
      "Priority support",
      "Custom filters",
    ],
    current: true,
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$49",
    period: "/month",
    credits: 2000,
    features: [
      "2,000 credits/month",
      "All AI models + Early Access",
      "8K export",
      "Dedicated support",
      "API access",
      "Team collaboration",
    ],
    current: false,
  },
];

const invoices = [
  { id: "INV-2026-002", date: "Feb 1, 2026", amount: "$19.00", status: "Paid" },
  { id: "INV-2026-001", date: "Jan 1, 2026", amount: "$19.00", status: "Paid" },
  { id: "INV-2025-012", date: "Dec 1, 2025", amount: "$19.00", status: "Paid" },
  { id: "INV-2025-011", date: "Nov 1, 2025", amount: "$19.00", status: "Paid" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [name, setName] = useState("Daniel Johnson");
  const [email, setEmail] = useState("daniel.12@gmail.com");
  const [username, setUsername] = useState("danielj");
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [marketingNotifs, setMarketingNotifs] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Top bar */}
      <div className="border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500">
              <Sparkles className="h-3.5 w-3.5 text-black" />
            </div>
            <span className="text-sm font-bold tracking-tight">AiVis</span>
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <Link
          href="/editor"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Editor
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your account, subscription, and preferences
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar tabs */}
          <nav className="w-56 shrink-0 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-amber-500/10 text-amber-400"
                    : "text-muted-foreground hover:bg-white/3 hover:text-foreground",
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Profile */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <SectionCard title="Profile Photo">
                  <div className="flex items-center gap-5">
                    <div className="relative group">
                      <Avatar className="h-20 w-20">
                        <AvatarFallback className="bg-amber-500/10 text-lg font-semibold text-amber-400">
                          DJ
                        </AvatarFallback>
                      </Avatar>
                      <button className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="h-5 w-5 text-white" />
                      </button>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Daniel Johnson</p>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG or WebP. Max 2MB.
                      </p>
                      <div className="mt-2 flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 rounded-lg border-white/10 bg-white/3 text-xs hover:bg-white/6"
                        >
                          Upload
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 rounded-lg text-xs text-muted-foreground hover:text-red-400"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Personal Information">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">
                        Full Name
                      </label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-10 rounded-xl border-white/10 bg-white/3 text-sm focus-visible:border-amber-500/40 focus-visible:ring-amber-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">
                        Username
                      </label>
                      <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="h-10 rounded-xl border-white/10 bg-white/3 text-sm focus-visible:border-amber-500/40 focus-visible:ring-amber-500/20"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-xs font-medium text-muted-foreground">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-10 rounded-xl border-white/10 bg-white/3 text-sm focus-visible:border-amber-500/40 focus-visible:ring-amber-500/20"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button className="h-9 rounded-xl bg-amber-500 text-xs font-semibold text-black hover:bg-amber-400">
                      Save Changes
                    </Button>
                  </div>
                </SectionCard>

                <SectionCard title="Danger Zone" danger>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-400">
                        Delete Account
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Permanently delete your account and all data. This
                        action cannot be undone.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 rounded-lg border-red-500/30 text-xs text-red-400 hover:bg-red-500/10 hover:border-red-500/40"
                    >
                      <Trash2 className="mr-1.5 h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </SectionCard>
              </div>
            )}

            {/* Billing */}
            {activeTab === "billing" && (
              <div className="space-y-6">
                {/* Current Plan */}
                <SectionCard title="Current Plan">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
                        <Crown className="h-5 w-5 text-amber-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">Pro Plan</p>
                          <Badge className="bg-amber-500/15 text-amber-400 text-[10px] font-medium border-0">
                            Active
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          $19/month · Renews on Mar 1, 2026
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 rounded-lg border-white/10 bg-white/3 text-xs hover:bg-white/6"
                    >
                      Cancel Plan
                    </Button>
                  </div>

                  <Separator className="my-4 bg-white/5" />

                  {/* Credits usage */}
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Credits Used
                      </span>
                      <span className="font-medium">
                        <span className="text-amber-400">327</span>
                        <span className="text-muted-foreground"> / 500</span>
                      </span>
                    </div>
                    <Progress
                      value={65.4}
                      className="mt-2 h-2 bg-white/5 [&>div]:bg-amber-500"
                    />
                    <p className="mt-1.5 text-xs text-muted-foreground/60">
                      173 credits remaining · Resets on Mar 1, 2026
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      className="h-8 rounded-lg bg-amber-500 text-xs font-semibold text-black hover:bg-amber-400"
                    >
                      <Zap className="mr-1.5 h-3 w-3" />
                      Buy Extra Credits
                    </Button>
                  </div>
                </SectionCard>

                {/* Plans */}
                <SectionCard title="Change Plan">
                  <div className="grid gap-4 sm:grid-cols-3">
                    {plans.map((plan) => (
                      <div
                        key={plan.id}
                        className={cn(
                          "relative rounded-xl border p-5 transition-all",
                          plan.current
                            ? "border-amber-500/30 bg-amber-500/4"
                            : "border-white/6 bg-white/2 hover:border-white/10",
                        )}
                      >
                        {plan.popular && (
                          <div className="absolute -top-2.5 left-4">
                            <Badge className="bg-amber-500 text-black text-[10px] font-bold border-0 shadow-lg shadow-amber-500/20">
                              Current
                            </Badge>
                          </div>
                        )}
                        <div className="mb-4">
                          <p className="font-semibold">{plan.name}</p>
                          <div className="mt-1 flex items-baseline gap-0.5">
                            <span className="text-2xl font-bold">
                              {plan.price}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {plan.period}
                            </span>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {plan.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-2 text-xs text-muted-foreground"
                            >
                              <Check className="h-3 w-3 shrink-0 text-amber-400" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button
                          size="sm"
                          className={cn(
                            "mt-4 w-full h-8 rounded-lg text-xs font-semibold",
                            plan.current
                              ? "bg-white/5 text-muted-foreground cursor-default hover:bg-white/5"
                              : "bg-amber-500 text-black hover:bg-amber-400",
                          )}
                          disabled={plan.current}
                        >
                          {plan.current ? "Current Plan" : "Upgrade"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                {/* Payment Method */}
                <SectionCard title="Payment Method">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-14 items-center justify-center rounded-lg border border-white/10 bg-white/3">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          •••• •••• •••• 4242
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Visa · Expires 12/2027
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 rounded-lg border-white/10 bg-white/3 text-xs hover:bg-white/6"
                    >
                      Update
                    </Button>
                  </div>
                </SectionCard>

                {/* Invoices */}
                <SectionCard title="Billing History">
                  <div className="space-y-0 rounded-xl border border-white/6 overflow-hidden">
                    {invoices.map((invoice, i) => (
                      <div
                        key={invoice.id}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-white/2",
                          i < invoices.length - 1 && "border-b border-white/5",
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-mono text-muted-foreground">
                            {invoice.id}
                          </span>
                          <span className="text-muted-foreground">
                            {invoice.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-medium">{invoice.amount}</span>
                          <Badge
                            variant="outline"
                            className="border-emerald-500/30 text-emerald-400 text-[10px]"
                          >
                            {invoice.status}
                          </Badge>
                          <button className="text-muted-foreground/50 hover:text-foreground transition-colors">
                            <Download className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <SectionCard title="Email Notifications">
                  <div className="space-y-4">
                    <ToggleRow
                      label="Product updates"
                      description="Get notified about new features and improvements"
                      enabled={emailNotifs}
                      onToggle={() => setEmailNotifs(!emailNotifs)}
                    />
                    <Separator className="bg-white/5" />
                    <ToggleRow
                      label="Weekly digest"
                      description="Summary of your usage and activity"
                      enabled={weeklyDigest}
                      onToggle={() => setWeeklyDigest(!weeklyDigest)}
                    />
                    <Separator className="bg-white/5" />
                    <ToggleRow
                      label="Marketing emails"
                      description="Tips, promotions, and special offers"
                      enabled={marketingNotifs}
                      onToggle={() => setMarketingNotifs(!marketingNotifs)}
                    />
                  </div>
                </SectionCard>

                <SectionCard title="Push Notifications">
                  <ToggleRow
                    label="Browser notifications"
                    description="Receive notifications in your browser when processing is complete"
                    enabled={pushNotifs}
                    onToggle={() => setPushNotifs(!pushNotifs)}
                  />
                </SectionCard>
              </div>
            )}

            {/* Security */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <SectionCard title="Password">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/3">
                        <Key className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Password</p>
                        <p className="text-xs text-muted-foreground">
                          Last changed 3 months ago
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 rounded-lg border-white/10 bg-white/3 text-xs hover:bg-white/6"
                    >
                      Change Password
                    </Button>
                  </div>
                </SectionCard>

                <SectionCard title="Connected Accounts">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl border border-white/6 bg-white/1 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-medium">Google</p>
                          <p className="text-xs text-muted-foreground">
                            daniel.12@gmail.com
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500/15 text-emerald-400 text-[10px] font-medium border-0">
                        Connected
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-white/6 bg-white/1 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <svg
                          className="h-5 w-5 text-white"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium">GitHub</p>
                          <p className="text-xs text-muted-foreground">
                            Not connected
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 rounded-lg border-white/10 bg-white/3 text-[11px] hover:bg-white/6"
                      >
                        Connect
                      </Button>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Active Sessions">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl border border-white/6 bg-white/1 px-4 py-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">macOS · Chrome</p>
                          <Badge className="bg-emerald-500/15 text-emerald-400 text-[10px] font-medium border-0">
                            Current
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          San Francisco, CA · Last active now
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-white/6 bg-white/1 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium">iOS · Safari</p>
                        <p className="text-xs text-muted-foreground">
                          San Francisco, CA · Last active 2 days ago
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 rounded-lg text-[11px] text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <LogOut className="mr-1 h-3 w-3" />
                        Revoke
                      </Button>
                    </div>
                  </div>
                </SectionCard>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Reusable components ── */

function SectionCard({
  title,
  children,
  danger,
}: {
  title: string;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6",
        danger ? "border-red-500/20 bg-red-500/2" : "border-white/6 bg-white/2",
      )}
    >
      <h3
        className={cn("mb-4 text-sm font-semibold", danger && "text-red-400")}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function ToggleRow({
  label,
  description,
  enabled,
  onToggle,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors",
          enabled ? "bg-amber-500" : "bg-white/10",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
            enabled ? "left-5.5" : "left-0.5",
          )}
        />
      </button>
    </div>
  );
}
