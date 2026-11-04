import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { PlaySquare, AlertTriangle, CheckCircle2, Clock, Trash2 } from 'lucide-react';

export const AdminReelsView = () => {
  const { adminData, updateReelStatus } = useAdmin();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e2e8e5] p-4 sm:p-5 shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-base text-[#0c302c]">24-Hour Reels & Trust & Safety Review</h3>
          <p className="text-xs text-gray-500">
            Moderate ephemeral community reels, reported media, and video safety standards.
          </p>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full min-w-[700px] text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <th className="py-3 px-3 whitespace-nowrap">Reel ID</th>
                <th className="py-3 px-3 whitespace-nowrap">Author</th>
                <th className="py-3 px-3 whitespace-nowrap">Scope</th>
                <th className="py-3 px-3 whitespace-nowrap">Caption</th>
                <th className="py-3 px-3 whitespace-nowrap">Safety Reports</th>
                <th className="py-3 px-3 whitespace-nowrap">Status</th>
                <th className="py-3 px-3 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {adminData.reels.map(reel => {
                const isFlagged = reel.status === 'Flagged';
                const isActive = reel.status === 'Active';

                return (
                  <tr key={reel.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-gray-800 whitespace-nowrap">
                      {reel.id}
                    </td>
                    <td className="py-3 px-3 font-mono text-gray-600 whitespace-nowrap">
                      {reel.author}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${
                        reel.scope === 'Elite PM'
                          ? 'bg-[#fbf3db] text-[#795a1a]'
                          : 'bg-emerald-50 text-emerald-800'
                      }`}>
                        {reel.scope}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-gray-900 max-w-xs truncate">
                      {reel.caption}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      {reel.reports > 0 ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md whitespace-nowrap">
                          <AlertTriangle className="w-3 h-3 shrink-0" />
                          <span className="whitespace-nowrap">{reel.reports} Reports</span>
                        </span>
                      ) : (
                        <span className="text-gray-400 text-[11px] whitespace-nowrap">0 reports</span>
                      )}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${
                        isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : isFlagged
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {reel.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right space-x-1 whitespace-nowrap">
                      {isFlagged ? (
                        <button
                          type="button"
                          onClick={() => updateReelStatus(reel.id, 'Active')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-bold text-[11px] text-white transition-colors cursor-pointer whitespace-nowrap"
                        >
                          Dismiss Flag
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => updateReelStatus(reel.id, 'Flagged')}
                          className="px-2.5 py-1 rounded-lg border border-rose-200 hover:bg-rose-50 font-bold text-[11px] text-rose-700 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          Hold Reel
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

