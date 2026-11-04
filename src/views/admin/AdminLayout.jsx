import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAdmin, ADMIN_VIEW_TITLES } from '../../context/AdminContext';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopbar } from '../../components/admin/AdminTopbar';
import { AdminLoginView } from './AdminLoginView';
import { ShieldAlert, LayoutDashboard } from 'lucide-react';

export const AdminLayout = () => {
  const {
    isLoggedIn,
    activeView,
    feedback,
    can,
    role,
    isMobileSidebarOpen,
    closeMobileSidebar
  } = useAdmin();
  const navigate = useNavigate();

  // If locked, show passcode unlock screen
  if (!isLoggedIn) {
    return <AdminLoginView />;
  }

  // Check role permission for active view
  const isPermitted = can(activeView);

  return (
    <div className="min-h-screen w-full bg-[#f4f7f5] flex overflow-hidden font-sans relative">
      {/* Mobile Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Dark Emerald Admin Sidebar (fixed drawer on mobile, static sidebar on desktop) */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden w-full">
        <AdminTopbar />

        {/* Global Feedback Banner */}
        {feedback && (
          <div className="bg-emerald-900 text-white px-4 sm:px-6 py-2 sm:py-2.5 text-xs font-semibold flex items-center justify-between border-b border-emerald-800 animate-in slide-in-from-top-1 duration-150">
            <span className="truncate">{feedback}</span>
          </div>
        )}

        {/* View Body */}
        <main className="flex-1 overflow-y-auto p-3.5 sm:p-5 lg:p-8 space-y-4 sm:space-y-6 max-w-full">
          {isPermitted ? (
            <Outlet />
          ) : (
            <div className="max-w-xl mx-auto my-8 sm:my-12 bg-white rounded-3xl border border-amber-200 p-6 sm:p-8 text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#0c302c]">Access Restricted</h3>
                <p className="text-xs text-gray-600">
                  Your current operational role (<span className="font-semibold text-gray-800">{role}</span>) does not have access permissions for this section (<span className="font-semibold text-gray-800">{ADMIN_VIEW_TITLES[activeView] || activeView}</span>).
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/overview')}
                  className="px-4 py-2 rounded-xl bg-[#d9b972] text-[#0a2622] font-bold text-xs hover:opacity-95 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Return to Overview</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
