import React, { useState, useRef, useEffect } from 'react';
import { useAdmin, ADMIN_ROLES, ADMIN_VIEW_TITLES } from '../../context/AdminContext';
import {
  Menu,
  ChevronDown,
  ShieldCheck,
  Check,
  LogOut
} from 'lucide-react';

export const AdminTopbar = () => {
  const { role, setRole, activeView, logoutAdmin, toggleMobileSidebar } = useAdmin();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setRoleDropdownOpen(false);
      }
    };
    if (roleDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [roleDropdownOpen]);

  const currentTitle = ADMIN_VIEW_TITLES[activeView] || 'Operations';

  return (
    <header className="h-14 sm:h-16 bg-white border-b border-[#e1e9e4] px-3.5 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs gap-2">
      {/* Left Title Area with Mobile Hamburger */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          type="button"
          onClick={toggleMobileSidebar}
          className="lg:hidden p-2 -ml-1 rounded-xl text-[#0c302c] hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#698a7c] truncate">
            IDLE / Operations
          </div>
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-[#0c302c] font-serif leading-tight truncate">
            {currentTitle}
          </h2>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Role Selector Pill */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setRoleDropdownOpen(prev => !prev)}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#fbf3db] border border-[#d9b972]/60 text-xs font-bold text-[#795a1a] hover:bg-[#faebd0] transition-colors cursor-pointer"
            title={`Current Role: ${role}`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#d9b972] shrink-0" />
            <span className="hidden sm:inline truncate max-w-[120px]">{role}</span>
            <span className="sm:hidden text-[11px] truncate max-w-[70px]">{role.split(' ')[0]}</span>
            <ChevronDown className="w-3 h-3 text-[#795a1a] shrink-0" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-1.5rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-4 py-2 border-b border-gray-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Switch Operational Role
                </span>
                <p className="text-xs text-gray-500 mt-0.5">
                  Filters available navigation and permissions.
                </p>
              </div>

              <div className="p-1 space-y-0.5 max-h-[320px] overflow-y-auto no-scrollbar">
                {Object.entries(ADMIN_ROLES).map(([rName, rData]) => {
                  const isCurrent = role === rName;
                  return (
                    <button
                      key={rName}
                      type="button"
                      onClick={() => {
                        setRole(rName);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[#0c302c] text-white font-bold'
                          : 'hover:bg-gray-50 text-gray-800'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-1.5 font-semibold truncate">
                          <span>{rData.icon}</span>
                          <span className="truncate">{rName}</span>
                        </div>
                        <div className={`text-[10px] truncate ${isCurrent ? 'text-gray-300' : 'text-gray-400'}`}>
                          {rData.desc}
                        </div>
                      </div>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-[#d9b972] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sign Out Button */}
        <button
          type="button"
          onClick={logoutAdmin}
          className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-rose-200/60 bg-rose-50 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer shrink-0"
          title="Sign out of admin"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
