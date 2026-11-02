import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdmin, VIEW_ROUTES } from '../../context/AdminContext';
import {
  Compass,
  ArrowLeft,
  LayoutDashboard,
  Users,
  Package,
  MessageSquare,
  ArrowLeftRight,
  CreditCard,
  PlaySquare,
  Users2,
  Sparkles,
  Settings,
  FileText,
  ShieldCheck,
  Search,
  ExternalLink
} from 'lucide-react';

const COMMON_ROUTES = [
  {
    path: '/overview',
    label: 'Overview',
    desc: 'System health, KPIs, and live queues',
    icon: LayoutDashboard,
    badge: 'Operations'
  },
  {
    path: '/membership',
    label: 'Member Management',
    desc: 'KYC identity verification and member directory',
    icon: Users,
    badge: 'Popular',
    highlight: true
  },
  {
    path: '/listings',
    label: 'Listings',
    desc: 'Equipment, vehicle, and asset marketplace review',
    icon: Package,
    badge: 'Marketplace'
  },
  {
    path: '/support',
    label: 'Support Inbox',
    desc: 'Open member tickets and priority triage',
    icon: MessageSquare,
    badge: 'Support'
  },
  {
    path: '/transactions',
    label: 'Transactions',
    desc: 'Stripe Connect escrow splits and custody handoffs',
    icon: ArrowLeftRight,
    badge: 'Finance'
  },
  {
    path: '/subscriptions',
    label: 'Subscriptions',
    desc: 'Studio, Pro, and Enterprise member tiers',
    icon: CreditCard,
    badge: 'Billing'
  },
  {
    path: '/reels',
    label: 'Reels & Safety',
    desc: '24-hour stories, reports, and trust moderation',
    icon: PlaySquare,
    badge: 'Safety'
  },
  {
    path: '/teams',
    label: 'Team Workspace',
    desc: 'Internal dispatchers, desk chat, and task list',
    icon: Users2,
    badge: 'Team'
  },
  {
    path: '/ai',
    label: 'AI Help Desk',
    desc: 'Automated triage and ticket resolution engine',
    icon: Sparkles,
    badge: 'Automation'
  },
  {
    path: '/automations',
    label: 'Automations',
    desc: 'Tint.ai underwriting and platform triggers',
    icon: Settings,
    badge: 'Rules'
  },
  {
    path: '/audit',
    label: 'Audit History',
    desc: 'Immutable logs and administrator activity trail',
    icon: FileText,
    badge: 'Compliance'
  }
];

export const AdminNotFoundView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, role, adminEmail } = useAdmin();

  return (
    <div className="min-h-screen w-full bg-[#f4f7f5] text-[#172d28] flex flex-col font-sans select-none">
      {/* Top Header Bar */}
      <header className="h-16 bg-[#0a2622] border-b border-[#1e443c] px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/IDLE_logo.png"
              alt="IDLE"
              className="h-7 w-auto object-contain brightness-0 invert"
            />
            <span className="text-[10px] font-black uppercase tracking-widest bg-[#d9b972] text-[#0a2622] px-2 py-0.5 rounded shadow-sm">
              Admin
            </span>
          </Link>
          <span className="hidden sm:inline-block text-[#8fb8a8] text-xs font-normal border-l border-[#1e443c] pl-3">
            Operations Center · North Texas Metro
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#163a32] border border-[#2b564c] text-xs text-[#c2ded3]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d9b972]" />
              <span className="font-semibold text-white">{adminEmail}</span>
              <span className="text-[#8fb8a8]">({role})</span>
            </div>
          ) : (
            <span className="text-xs text-[#8fb8a8]">Guest Session</span>
          )}

          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-3.5 py-1.5 rounded-xl bg-[#d9b972] text-[#0a2622] font-bold text-xs hover:opacity-95 shadow transition-all cursor-pointer flex items-center gap-1.5"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
        </div>
      </header>

      {/* Main 404 Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8 lg:p-12 space-y-10">
        {/* Hero 404 Box */}
        <div className="bg-white rounded-3xl border border-[#e2e8e5] p-8 sm:p-12 shadow-sm text-center relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d9b972]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Compass Icon Badge */}
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#0a2622] text-[#d9b972] shadow-xl shadow-emerald-950/15 mb-6 border border-[#1e443c]">
            <Compass className="w-10 h-10 animate-spin-slow" />
          </div>

          {/* Status Label */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-[#fbf3db] text-[#795a1a] border border-[#d9b972]/50">
              HTTP 404 · Route Not Found
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl font-bold font-serif text-[#0c302c] tracking-tight">
            Lost in IDLE Operations?
          </h1>

          {/* Path Display */}
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono text-gray-700">
            <span className="text-gray-400">Attempted Route:</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              {location.pathname || '/'}
            </span>
          </div>

          {/* Description */}
          <p className="mt-4 text-xs sm:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
            The operational page or route you attempted to access does not exist in IDLE Admin,
            has been relocated, or is temporarily unavailable.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/overview"
              className="px-5 py-2.5 rounded-xl bg-[#d9b972] text-[#0a2622] font-bold text-xs hover:bg-[#cbb06d] shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Operations Overview</span>
            </Link>

            <Link
              to="/membership"
              className="px-5 py-2.5 rounded-xl bg-[#0a2622] text-white font-bold text-xs hover:bg-[#123832] shadow-md transition-all cursor-pointer flex items-center gap-2 border border-[#1e443c]"
            >
              <Users className="w-4 h-4 text-[#d9b972]" />
              <span>Member Management (/membership)</span>
            </Link>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-xs hover:bg-gray-200 transition-all cursor-pointer flex items-center gap-2 border border-gray-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </button>
          </div>
        </div>

        {/* Directory of Valid Operations Routes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#0c302c] font-serif">
                Available Operational Routes
              </h2>
              <p className="text-xs text-gray-500">
                Direct shortcuts to all active administrative modules.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#698a7c]">
              {COMMON_ROUTES.length} Verified Modules
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COMMON_ROUTES.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`p-4 rounded-2xl bg-white border transition-all cursor-pointer flex items-start gap-3 group ${
                    item.highlight
                      ? 'border-[#d9b972] hover:border-[#0a2622] shadow-sm hover:shadow-md ring-1 ring-[#d9b972]/30'
                      : 'border-[#e2e8e5] hover:border-[#0a2622]/40 hover:shadow-sm'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      item.highlight
                        ? 'bg-[#fbf3db] text-[#795a1a] group-hover:bg-[#0a2622] group-hover:text-[#d9b972]'
                        : 'bg-[#ecf6f1] text-[#0a2622] group-hover:bg-[#0a2622] group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#0c302c] group-hover:text-[#0a2622] truncate">
                        {item.label}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 shrink-0">
                        {item.path}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 line-clamp-1">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-[#e1e9e4] bg-white text-center text-xs text-gray-500 space-y-1">
        <p className="font-medium text-[#0c302c]">
          IDLE Marketplace Operations Center · North Texas Metro
        </p>
        <p className="text-[11px] text-gray-400">
          Super Admin Console · Protected by biometric passkey & operational role filters
        </p>
      </footer>
    </div>
  );
};

