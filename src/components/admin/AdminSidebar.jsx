import React from 'react';
import { Link } from 'react-router-dom';
import { useAdmin, ADMIN_NAV_GROUPS, VIEW_ROUTES } from '../../context/AdminContext';
import {
  LayoutDashboard,
  Users,
  Package,
  MessageSquare,
  ArrowLeftRight,
  CreditCard,
  Crown,
  PlaySquare,
  Users2,
  Sparkles,
  Settings,
  Grid,
  FileText,
  LogOut,
  X
} from 'lucide-react';

const ICON_MAP = {
  overview: LayoutDashboard,
  members: Users,
  listings: Package,
  support: MessageSquare,
  transactions: ArrowLeftRight,
  subscriptions: CreditCard,
  elite: Crown,
  reels: PlaySquare,
  teams: Users2,
  ai: Sparkles,
  automations: Settings,
  resources: Grid,
  audit: FileText
};

export const AdminSidebar = () => {
  const {
    role,
    activeView,
    can,
    adminData,
    adminEmail,
    logoutAdmin,
    isMobileSidebarOpen,
    closeMobileSidebar
  } = useAdmin();

  const openTicketsCount = adminData.tickets.filter(t => t.status === 'Open').length;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] lg:w-64 lg:static lg:h-screen lg:flex-shrink-0 bg-[#0a2622] text-[#ecf6f1] flex flex-col border-r border-[#1e443c] select-none transition-transform duration-300 ease-in-out ${
        isMobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand Header */}
      <div className="p-4 sm:p-5 border-b border-[#1e443c] flex items-center justify-between">
        <Link
          to="/"
          onClick={closeMobileSidebar}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <img
            src="/IDLE_logo.png"
            alt="IDLE"
            className="h-7 w-auto object-contain brightness-0 invert transition-transform group-hover:scale-105"
          />
          <span className="text-[10px] font-black uppercase tracking-widest bg-[#d9b972] text-[#0a2622] px-2 py-0.5 rounded shadow-sm">
            Admin
          </span>
        </Link>

        {/* Mobile Close Button */}
        <button
          type="button"
          onClick={closeMobileSidebar}
          className="lg:hidden p-1.5 rounded-xl text-[#8fb8a8] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="px-4 sm:px-5 py-2.5 border-b border-[#1e443c]/60 bg-[#071d19]/40">
        <p className="text-[11px] text-[#8fb8a8] font-normal leading-relaxed">
          Owner Operations Center · North Texas Metro
        </p>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto p-3 space-y-5 no-scrollbar">
        {ADMIN_NAV_GROUPS.map(([groupLabel, entries]) => {
          // Filter entries permitted by active role and not marked hidden
          const permittedEntries = entries.filter(([id, , , meta]) => can(id) && !meta?.hidden);
          if (!permittedEntries.length) return null;

          return (
            <div key={groupLabel} className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#729e8e] px-3 block mb-1.5">
                {groupLabel}
              </span>

              {permittedEntries.map(([id, label]) => {
                const IconComponent = ICON_MAP[id] || Grid;
                const isActive = activeView === id;
                const targetRoute = VIEW_ROUTES[id] || `/${id}`;

                return (
                  <Link
                    key={id}
                    to={targetRoute}
                    onClick={closeMobileSidebar}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#d9b972] text-[#0a2622] font-bold shadow-md'
                        : 'text-[#c2ded3] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#0a2622]' : 'text-[#8fb8a8]'}`} />
                      <span>{label}</span>
                    </div>

                    {id === 'support' && openTicketsCount > 0 && (
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${isActive ? 'bg-[#0a2622] text-[#d9b972]' : 'bg-[#d9b972] text-[#0a2622]'
                        }`}>
                        {openTicketsCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Footer Controls: Admin Email & Icon-Only Logout */}
      <div className="p-3 border-t border-[#1e443c] bg-[#08201d] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#163a32] border border-[#2b564c] flex items-center justify-center text-[#d9b972] font-bold text-xs shrink-0 select-none">
            {adminEmail ? adminEmail[0].toUpperCase() : 'A'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-white truncate" title={adminEmail || 'admin@idle.market'}>
              {adminEmail || 'admin@idle.market'}
            </div>
            <div className="text-[10px] text-[#8fb8a8] font-medium truncate">
              {role}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            closeMobileSidebar();
            logoutAdmin();
          }}
          className="p-2 rounded-xl text-rose-300 hover:text-white hover:bg-rose-950/60 transition-colors cursor-pointer shrink-0 border border-transparent hover:border-rose-800/40"
          title="Logout"
          aria-label="Logout"
        >
          <LogOut className="w-4 h-4 text-rose-300 hover:text-rose-200" />
        </button>
      </div>
    </aside>
  );
};
