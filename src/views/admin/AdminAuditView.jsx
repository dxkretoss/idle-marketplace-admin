import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { FileText, Search, ShieldCheck } from 'lucide-react';

export const AdminAuditView = () => {
  const { adminData } = useAdmin();
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All');

  const filteredLogs = adminData.history.filter(log => {
    const matchesSearch = log.event.toLowerCase().includes(search.toLowerCase()) ||
                          log.actor.toLowerCase().includes(search.toLowerCase());
    if (moduleFilter === 'All') return matchesSearch;
    return matchesSearch && log.module.toLowerCase() === moduleFilter.toLowerCase();
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e2e8e5] p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-base text-[#0c302c]">Immutable Operations Audit Trail</h3>
            <p className="text-xs text-gray-500">
              Cryptographically timestamped record of administrative actions, payouts, role changes, and overrides.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search audit log..."
                className="w-full sm:w-52 pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-[#0c302c]"
              />
            </div>

            <div className="flex items-center overflow-x-auto no-scrollbar rounded-xl bg-gray-100 p-1 border border-gray-200 text-xs">
              {['All', 'Members', 'Listings', 'Support', 'Finance', 'System'].map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setModuleFilter(m)}
                  className={`flex-1 sm:flex-initial px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    moduleFilter === m ? 'bg-white text-[#0c302c] shadow-xs' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full min-w-[650px] text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <th className="py-3 px-3 whitespace-nowrap">Log ID</th>
                <th className="py-3 px-3 whitespace-nowrap">Timestamp</th>
                <th className="py-3 px-3 whitespace-nowrap">Actor / Operational Role</th>
                <th className="py-3 px-3 whitespace-nowrap">Module</th>
                <th className="py-3 px-3 whitespace-nowrap">Action Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-gray-400 whitespace-nowrap">
                    {log.id}
                  </td>
                  <td className="py-3 px-3 font-mono text-gray-600 whitespace-nowrap">
                    {new Date(log.at).toLocaleString()}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="font-bold text-[#0c302c]">
                      {log.actor}
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700 whitespace-nowrap">
                      {log.module}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-medium text-gray-800">
                    {log.event}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

