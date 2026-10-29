import React from "react";
import Link from "next/link";
import { getCurrentAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Users,
  LayoutDashboard,
  Layers,
  IndianRupee,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  HelpCircle,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentAdminSession();

  // If this is the login page, render children directly without the sidebar layout
  // Next.js allows children to render. If session is null and path is not /admin/login, we redirect.
  // In Next.js app router server components, we can check session and handle in page components or here.

  return (
    <div className="min-h-screen bg-midnight-950 text-ivory-100 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-midnight-900 border-r border-charcoal-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-serif font-bold text-midnight-950 text-sm">
              G
            </div>
            <div>
              <span className="font-serif font-semibold text-sm tracking-wider uppercase block text-ivory-50">
                Grandeur Admin
              </span>
              <span className="text-[10px] text-ivory-400">Hospitality CMS</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="space-y-1.5 text-xs">
            <Link
              href="/admin/dashboard"
              className="flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-ivory-200 hover:text-gold-400 hover:bg-charcoal-800/80 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-gold-400" />
              <span>Overview</span>
            </Link>

            <Link
              href="/admin/leads"
              className="flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-ivory-200 hover:text-gold-400 hover:bg-charcoal-800/80 transition-colors"
            >
              <Users className="w-4 h-4 text-gold-400" />
              <span>Leads & Inquiries</span>
            </Link>

            <Link
              href="/admin/projects"
              className="flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-ivory-200 hover:text-gold-400 hover:bg-charcoal-800/80 transition-colors"
            >
              <Layers className="w-4 h-4 text-gold-400" />
              <span>Portfolio Projects</span>
            </Link>

            <Link
              href="/admin/pricing"
              className="flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-ivory-200 hover:text-gold-400 hover:bg-charcoal-800/80 transition-colors"
            >
              <IndianRupee className="w-4 h-4 text-gold-400" />
              <span>Packages & Rates</span>
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-ivory-200 hover:text-gold-400 hover:bg-charcoal-800/80 transition-colors"
            >
              <Settings className="w-4 h-4 text-gold-400" />
              <span>Business Settings</span>
            </Link>
          </nav>
        </div>

        {/* Footer actions */}
        <div className="pt-6 border-t border-charcoal-800 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center space-x-2 text-xs text-ivory-400 hover:text-gold-400 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Public Site</span>
          </Link>

          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center space-x-2 text-xs text-red-400 hover:text-red-300 transition-colors pt-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
