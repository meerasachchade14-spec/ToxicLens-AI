import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { GlassCard } from "../components/ui/GlassCard";
import {
  ShieldAlert, CheckCircle, XCircle, RefreshCw, Server
} from "lucide-react";

interface FlaggedComment {
  id: string;
  user: string;
  source: string;
  content: string;
  severity: "High" | "Extreme" | "Medium";
  category: string;
  time: string;
}

export const AdminDashboard: React.FC = () => {
  const { adminLogs, showToast } = useApp();

  const [flaggedComments, setFlaggedComments] = useState<FlaggedComment[]>([
    { id: "FLG-809", user: "@toxic_spammer", source: "Instagram API", content: "You are absolute trash, literally go delete yourself.", severity: "Extreme", category: "Harassment", time: "10 mins ago" },
    { id: "FLG-810", user: "@x_troller_4", source: "X Webhook", content: "Go back to your country you filthy immigrant.", severity: "High", category: "Hate Speech", time: "34 mins ago" },
    { id: "FLG-811", user: "@discord_flamer", source: "Discord Bot", content: "I will find your street address and teach you a lesson.", severity: "Extreme", category: "Threat", time: "1 hour ago" },
    { id: "FLG-812", user: "@angry_gamer", source: "Reddit Plugin", content: "You are the dumbest dev team in existence.", severity: "Medium", category: "Insult", time: "3 hours ago" },
  ]);

  const [aiLoad, setAiLoad] = useState(48); // Percentage
  const [modelLatency, setModelLatency] = useState(12.4); // ms

  useEffect(() => {
    const interval = setInterval(() => {
      setAiLoad((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
        return Math.min(85, Math.max(20, prev + delta));
      });
      setModelLatency((prev) => {
        const delta = parseFloat((Math.random() * 2 - 1).toFixed(1)); // -1.0 to +1.0
        return parseFloat(Math.min(25, Math.max(5, prev + delta)).toFixed(1));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleResolveFlag = (id: string, action: "Confirm" | "Dismiss") => {
    setFlaggedComments(flaggedComments.filter((c) => c.id !== id));
    if (action === "Confirm") {
      showToast(`Flag confirmed: Comment locked and user logged.`, "success");
    } else {
      showToast(`Alert dismissed: Comment cleared.`, "info");
    }
  };

  const highRiskUsers = [
    { name: "@toxic_spammer", count: 42, severity: "Extreme", color: "text-danger" },
    { name: "@discord_flamer", count: 18, severity: "High", color: "text-danger" },
    { name: "@x_troller_4", count: 15, severity: "High", color: "text-warning" },
  ];

  return (
    <div className="flex-1 p-8 overflow-y-auto max-h-screen">
      {/* Header */}
      <div className="text-left mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-main flex items-center gap-2.5">
          <ShieldAlert className="w-6.5 h-6.5 text-danger" /> Admin Control Panel
        </h1>
        <p className="text-xs text-text-sub mt-1">
          Root security dashboard. Manage pipeline telemetry load, investigate flagged platform interactions, and check high-risk user parameters.
        </p>
      </div>

      {/* Model telemetry parameters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <GlassCard className="p-5 flex items-center gap-4 text-left">
          <div className="p-3 rounded-xl border border-glass bg-primary/10 text-primary flex-shrink-0">
            <Server className="w-5.5 h-5.5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] text-text-sub font-bold block uppercase tracking-wider">Transformer Model Load</span>
            <div className="flex items-center gap-3 mt-1.5">
              <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${aiLoad}%` }} />
              </div>
              <span className="text-xs font-mono font-bold text-text-main">{aiLoad}%</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5 flex items-center gap-4 text-left">
          <div className="p-3 rounded-xl border border-glass bg-accent/10 text-accent flex-shrink-0">
            <RefreshCw className="w-5.5 h-5.5" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] text-text-sub font-bold block uppercase tracking-wider">Classification Latency</span>
            <span className="text-xl font-black text-text-main font-mono block mt-0.5">{modelLatency} ms</span>
          </div>
        </GlassCard>

        <GlassCard className="p-5 flex items-center gap-4 text-left">
          <div className="p-3 rounded-xl border border-glass bg-success/10 text-success flex-shrink-0">
            <CheckCircle className="w-5.5 h-5.5" />
          </div>
          <div className="flex-1">
            <span className="text-[10px] text-text-sub font-bold block uppercase tracking-wider">Active Transformer Version</span>
            <span className="text-xs font-extrabold text-success block mt-1 uppercase">RoBERTa-tl-v4.3</span>
          </div>
        </GlassCard>
      </div>

      {/* Main Grid content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Flagged comments review queue */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <h3 className="text-sm font-bold text-text-main uppercase tracking-wider text-left">Moderation Review Queue</h3>
          
          <div className="flex flex-col gap-4">
            {flaggedComments.map((comment) => (
              <GlassCard key={comment.id} className="p-5 text-left flex flex-col gap-3 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-text-main">{comment.user}</span>
                    <span className="text-text-sub">via</span>
                    <span className="text-accent font-semibold">{comment.source}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] text-text-sub font-mono font-medium">{comment.time}</span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-[8px] uppercase
                        ${comment.severity === "Extreme" ? "bg-danger text-white" : ""}
                        ${comment.severity === "High" ? "bg-danger/10 border border-danger/25 text-danger" : ""}
                        ${comment.severity === "Medium" ? "bg-warning/10 border border-warning/25 text-warning" : ""}
                      `}
                    >
                      {comment.severity}
                    </span>
                  </div>
                </div>

                <p className="text-xs font-mono text-text-main leading-relaxed select-all">
                  "{comment.content}"
                </p>

                <div className="flex items-center justify-between border-t border-glass pt-3 mt-1 text-xs">
                  <span className="text-text-sub">AI Flag: <span className="text-danger font-bold">{comment.category}</span></span>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleResolveFlag(comment.id, "Dismiss")}
                      className="flex items-center gap-1 py-1.5 px-3 rounded-lg border border-glass bg-surface-glass font-semibold text-text-sub hover:text-text-main hover:bg-slate-900/10 transition-all cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5 text-text-sub" /> Dismiss Flag
                    </button>
                    <button
                      onClick={() => handleResolveFlag(comment.id, "Confirm")}
                      className="flex items-center gap-1 py-1.5 px-3 rounded-lg bg-danger/10 border border-danger/20 font-bold text-danger hover:bg-danger/20 transition-all cursor-pointer"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Confirm Abuse
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}

            {flaggedComments.length === 0 && (
              <GlassCard className="p-12 text-center text-text-sub flex flex-col items-center gap-3">
                <CheckCircle className="w-8 h-8 text-success" />
                <span>Excellent! The admin moderation review queue is currently empty.</span>
              </GlassCard>
            )}
          </div>
        </div>

        {/* Right column: watchlist and audit logs */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Watchlist */}
          <GlassCard className="p-6 text-left flex flex-col gap-4">
            <h3 className="text-xs font-bold text-text-main uppercase tracking-wider">High Risk Watchlist</h3>
            <div className="flex flex-col gap-3">
              {highRiskUsers.map((u, i) => (
                <div key={i} className="flex justify-between items-center text-xs p-3 rounded-xl border border-glass bg-slate-900/20 light:bg-slate-50/20">
                  <div className="flex flex-col">
                    <span className="font-bold text-text-main">{u.name}</span>
                    <span className="text-[10px] text-text-sub font-semibold">{u.severity} Severity Index</span>
                  </div>
                  <span className="font-mono font-bold text-danger bg-danger/10 border border-danger/20 py-1 px-2.5 rounded-lg">
                    {u.count} flags
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Audit Logs */}
          <GlassCard className="p-6 text-left flex flex-col gap-4 max-h-[360px] overflow-hidden">
            <h3 className="text-xs font-bold text-text-main uppercase tracking-wider">Audit Security Logs</h3>
            <div className="flex flex-col gap-3.5 overflow-y-auto pr-1">
              {adminLogs.map((log) => (
                <div key={log.id} className="text-left flex flex-col gap-0.5 border-b border-glass pb-2.5 last:border-b-0">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-bold text-text-main">{log.action}</span>
                    <span className="font-mono text-text-sub">{log.timestamp}</span>
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-text-sub font-medium mt-0.5">
                    <span className="truncate max-w-[140px]">By: {log.user}</span>
                    <span className="font-mono text-accent">IP: {log.ip}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
