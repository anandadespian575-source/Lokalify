import React, { useState } from 'react';

// Data tiruan notifikasi
const notificationsData = [
  {
    id: 1,
    title: "Deployment failed to build",
    project: "Lokalify deployment failed",
    env: "Current project and environment",
    time: "3m",
    status: "failed",
    branch: "main",
    commit: "a1b2c3d",
    logs: [
      "[10:32:01] Preparing build environment...",
      "[10:32:04] Cloning repository github.com/user/lokalify...",
      "[10:32:10] Running \"npm run build\"",
      "> lokalify@0.1.0 build",
      "> next build",
      "Failed to compile.",
      "./src/app/page.tsx:14:8",
      "Type error: Cannot find module '@/components/Header' or its corresponding type declarations.",
      "[10:32:15] Error: Command \"npm run build\" exited with status 1"
    ]
  },
  {
    id: 2,
    title: "Deployment failed to build",
    project: "Lokalify deployment failed",
    env: "Current project and environment",
    time: "8m",
    status: "failed",
    branch: "main",
    commit: "e5f6g7h",
    logs: [
      "[10:27:00] Preparing build environment...",
      "[10:27:05] Syntax Error: Unexpected token ';' in navbar.jsx:22"
    ]
  },
  {
    id: 3,
    title: "Deployment failed to build",
    project: "Lokalify deployment failed",
    env: "Current project and environment",
    time: "17m",
    status: "failed",
    branch: "dev",
    commit: "i8j9k0l",
    logs: [
      "[10:18:00] Preparing build environment...",
      "[10:18:02] Missing environment variable: NEXT_PUBLIC_SUPABASE_URL"
    ]
  }
];

export default function Notifications() {
  const [selectedId, setSelectedId] = useState(1);
  const [filter, setFilter] = useState('all');
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const activeNotif = notificationsData.find((n) => n.id === selectedId) || notificationsData[0];

  const handleSelectNotif = (id) => {
    setSelectedId(id);
    setIsMobileModalOpen(true);
  };

  return (
    <div className="bg-black min-h-screen text-slate-100 p-4 md:p-8 flex justify-center items-center font-sans">
      
      {/* CONTAINER UTAMA */}
      <div className="w-full max-w-5xl bg-[#0d0e15] border border-slate-800 rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-2xl md:h-[650px]">
        
        {/* SISI KIRI: LIST NOTIFIKASI */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-800 p-4 md:p-5 flex flex-col justify-between shrink-0 bg-[#0b0c12]">
          <div>
            {/* Header List */}
            <div className="flex justify-between items-center mb-4 md:mb-5">
              <h1 className="text-xl font-bold tracking-tight">Notifications</h1>
              <button className="text-slate-400 hover:text-white p-1">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                </svg>
              </button>
            </div>

            {/* Filter Tab */}
            <div className="grid grid-cols-2 bg-[#171923] p-1 rounded-xl mb-4 text-xs font-semibold">
              <button 
                onClick={() => setFilter('project')}
                className={`py-2 rounded-lg transition ${filter === 'project' ? 'bg-[#232736] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>
                Project
              </button>
              <button 
                onClick={() => setFilter('all')}
                className={`py-2 rounded-lg transition ${filter === 'all' ? 'bg-[#232736] text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}>
                All
              </button>
            </div>

            {/* List Cards */}
            <div className="space-y-3 overflow-y-auto max-h-[480px] md:max-h-[500px] pr-1">
              {notificationsData.map((item) => {
                const isSelected = item.id === selectedId;
                return (
                  <div 
                    key={item.id}
                    onClick={() => handleSelectNotif(item.id)}
                    className={`p-3.5 rounded-xl transition cursor-pointer flex items-start gap-3 border ${
                      isSelected 
                        ? 'bg-[#1f190c] border-amber-500 shadow-lg' 
                        : 'bg-[#161722] hover:bg-[#1c1e2d] border-slate-800'
                    }`}
                  >
                    <div className="p-1.5 bg-amber-500/20 rounded-lg text-amber-500 shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className={`text-xs font-bold truncate ${isSelected ? 'text-amber-400' : 'text-slate-200'}`}>
                          {item.title}
                        </h3>
                        <span className="text-[10px] text-slate-400 font-medium">{item.time}</span>
                      </div>
                      <p className="text-xs text-slate-300 font-medium truncate">{item.project}</p>
                      <p className="text-[11px] text-slate-500 mt-1 truncate">{item.env}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SISI KANAN: LOG DETAIL (DESKTOP) */}
        <div className="hidden md:flex flex-1 flex-col justify-between p-6 bg-[#0d0e15]">
          <div className="border-b border-slate-800 pb-4 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded border border-amber-500/20">FAILED</span>
                <h2 className="text-lg font-bold text-white">Lokalify Production Deployment</h2>
              </div>
              <p className="text-xs text-slate-400">
                Triggered by <span className="text-slate-200 font-medium">git push</span> • Branch: <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300">{activeNotif.branch}</code> • Commit: <code className="text-slate-400">{activeNotif.commit}</code>
              </p>
            </div>
            <button className="bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs px-4 py-2 rounded-lg transition shadow-md flex items-center gap-1.5">
              <span>🔄</span> Redeploy
            </button>
          </div>

          <div className="flex-1 my-4 bg-black border border-slate-800 rounded-xl p-4 font-mono text-xs overflow-y-auto leading-relaxed text-slate-300">
            {activeNotif.logs.map((log, index) => (
              <p key={index} className={log.includes('Failed') || log.includes('Error') ? 'text-red-400 font-bold' : 'text-slate-400'}>
                {log}
              </p>
            ))}
          </div>

          <div className="text-[11px] text-slate-500 flex justify-between items-center">
            <span>Deployment ID: dpl_{activeNotif.commit}x99</span>
            <span>Duration: 14s</span>
          </div>
        </div>

      </div>

      {/* BOTTOM SHEET MODAL (MOBILE) */}
      {isMobileModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:hidden">
          <div className="w-full bg-[#0d0e15] border-t border-slate-800 rounded-t-2xl p-5 max-h-[85vh] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded border border-amber-500/20">FAILED</span>
                <button onClick={() => setIsMobileModalOpen(false)} className="text-slate-400 text-lg font-bold">✕</button>
              </div>

              <h2 className="text-base font-bold text-white mt-3">Lokalify Deployment Log</h2>
              <p className="text-xs text-slate-400 mb-4">Branch: {activeNotif.branch} | Commit: {activeNotif.commit}</p>

              <div className="bg-black border border-slate-800 rounded-xl p-3 font-mono text-[11px] overflow-y-auto max-h-60 space-y-1">
                {activeNotif.logs.map((log, index) => (
                  <p key={index} className={log.includes('Failed') || log.includes('Error') ? 'text-red-400 font-bold' : 'text-slate-400'}>
                    {log}
                  </p>
                ))}
              </div>
            </div>

            <button className="w-full mt-4 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs py-3 rounded-xl transition">
              Redeploy Project
            </button>
          </div>
        </div>
      )}

    </div>
  );
}