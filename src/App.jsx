import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import { AdminLayout } from './views/admin/AdminLayout';

import { AdminOverviewView } from './views/admin/AdminOverviewView';
import { AdminMembersView } from './views/admin/AdminMembersView';
import { AdminListingsView } from './views/admin/AdminListingsView';
import { AdminSupportView } from './views/admin/AdminSupportView';
import { AdminTransactionsView } from './views/admin/AdminTransactionsView';
import { AdminSubscriptionsView } from './views/admin/AdminSubscriptionsView';
import { AdminEliteView } from './views/admin/AdminEliteView';
import { AdminReelsView } from './views/admin/AdminReelsView';
import { AdminTeamsView } from './views/admin/AdminTeamsView';
import { AdminAiHelpdeskView } from './views/admin/AdminAiHelpdeskView';
import { AdminAutomationsView } from './views/admin/AdminAutomationsView';
import { AdminResourcesView } from './views/admin/AdminResourcesView';
import { AdminAuditView } from './views/admin/AdminAuditView';
import { AdminNotFoundView } from './views/admin/AdminNotFoundView';

export default function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <div className="min-h-screen w-full bg-[#f4f7f5] text-[#172d28]">
          <Routes>
            {/* Operational Admin Routes wrapped in AdminLayout */}
            <Route path="/" element={<AdminLayout />}>
              <Route index element={<AdminOverviewView />} />
              <Route path="overview" element={<AdminOverviewView />} />
              <Route path="membership" element={<AdminMembersView />} />
              <Route path="members" element={<Navigate to="/membership" replace />} />
              <Route path="listings" element={<AdminListingsView />} />
              <Route path="support" element={<AdminSupportView />} />
              <Route path="transactions" element={<AdminTransactionsView />} />
              <Route path="subscriptions" element={<AdminSubscriptionsView />} />
              <Route path="elite" element={<AdminEliteView />} />
              <Route path="reels" element={<AdminReelsView />} />
              <Route path="teams" element={<AdminTeamsView />} />
              <Route path="ai" element={<AdminAiHelpdeskView />} />
              <Route path="automations" element={<AdminAutomationsView />} />
              <Route path="resources" element={<AdminResourcesView />} />
              <Route path="audit" element={<AdminAuditView />} />
            </Route>

            {/* Custom 404 Route Not Found Page */}
            <Route path="*" element={<AdminNotFoundView />} />
          </Routes>
        </div>
      </AdminProvider>
    </BrowserRouter>
  );
}
