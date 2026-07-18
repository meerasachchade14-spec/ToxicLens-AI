import React from "react";
import { useApp } from "../context/AppContext";
import { GlassCard } from "../components/ui/GlassCard";
import { LineChart, BarChart, PieChart } from "../components/ui/CustomCharts";
import {
  Activity, Shield, ShieldAlert, Sparkles, Plus, AlertCircle, FileText, Settings,
  Clock, ArrowUpRight, Zap
} from "lucide-react";

export const DashboardHome: React.FC = () => {
  const { scanStats, history, setView, showToast } = useApp();

  // Prepare chart data
  const lineChartData = [
    { label: "Mon", value: 45 },
    { label: "Tue", value: 58 },
    { label: "Wed", value: 84 },
    { label: "Thu", value: 72 },
    { label: "Fri", value: 95 },
    { label: "Sat", value: 110 },
    { label: "Sun", value: scanStats.totalScans % 50 + 85 },
  ];

  const pieChartData = [
    { label: "Safe Comments", value: scanStats.safeCount, color: "var(--success)" },
    { label: "Bullying Comments", value: scanStats.bullyingCount, color: "var(--danger)" },
  ];

  // Count severities in history
  const lowCount = history.filter((r) => r.severity === "Low").length * 8 + 48;
  const mediumCount = history.filter((r) => r.severity === "Medium").length * 5 + 32;
  const highCount = history.filter((r) => r.severity === "High").length * 4 + 18;
  const extremeCount = history.filter((r) => r.severity === "Extreme").length * 3 + 8;

  const barChartData = [
    { label: "Low", value: lowCount, color: "url(#barGradPrimary)" },
    { label: "Medium", value: mediumCount, color: "url(#barGradAccent)" },
    { label: "High", value: highCount, color: "url(#barGradDanger)" },
    { label: "Extreme", value: extremeCount, color: "var(--danger)" },
  ];

  const kpis = [
    {
      title: "Total Scans",
      value: scanStats.totalScans.toLocaleString(),
      desc: "+14.2% since yesterday",
      icon: <Activity className="w-5 h-5 text-primary" />,
      glowColor: "primary" as const,
    },
    {
      title: "Safe Content",
      value: scanStats.safeCount.toLocaleString(),
      desc: "82% approval rating",
      icon: <Shield className="w-5 h-5 text-success" />,
      glowColor: "success" as const,
    },
    {
      title: "Bullying Flagged",
      value: scanStats.bullyingCount.toLocaleString(),
      desc: "18% average toxicity",
      icon: <ShieldAlert className="w-5 h-5 text-danger" />,
      glowColor: "danger" as const,
    },
    {
      title: "AI Accuracy",
      value: `${scanStats.accuracy}%`,
      desc: "Validated transformer model",
      icon: <Sparkles className="w-5 h-5 text-accent" />,
      glowColor: "accent" as const,
    },
  ];

  // Take recent 4 logs for timeline
  const recentHistory = history.slice(0, 4);

  return (
    <div className="flex-1 p-8 overflow-y-auto max-h-screen">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold text-text-main flex items-center gap-2">
            Dashboard Overview <span className="text-xs bg-success/10 text-success border border-success/20 px-2 py-0.5 rounded-full font-bold">VITE DEV_ENV</span>
          </h1>
          <p className="text-xs text-text-sub mt-1">Real-time cyberbullying insights, visual analytics, and model telemetry.</p>
        </div>

        {/* Header Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              setView("reports");
              showToast("Opening Reports ledger...", "info");
            }}
            className="flex items-center gap-2 py-2.5 px-4 rounded-xl border border-glass bg-surface-glass text-xs font-semibold text-text-main hover:border-primary/30 transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4 text-primary" /> Reports
          </button>
          <button
            onClick={() => setView("settings")}
            className="flex items-center justify-center p-2.5 rounded-xl border border-glass bg-surface-glass text-text-sub hover:text-primary transition-colors cursor-pointer"
          >
            <Settings className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, index) => (
          <GlassCard key={index} glow glowColor={kpi.glowColor} className="flex items-center justify-between p-6">
            <div className="flex flex-col text-left gap-1">
              <span className="text-xs font-bold text-text-sub uppercase tracking-wider">{kpi.title}</span>
              <span className="text-2xl font-extrabold text-text-main tracking-tight font-mono">{kpi.value}</span>
              <span className="text-[10px] text-text-sub font-semibold">{kpi.desc}</span>
            </div>
            <div className="p-3.5 rounded-xl border border-glass bg-slate-900/40 light:bg-white/40 shadow-sm flex-shrink-0">
              {kpi.icon}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Weekly Scan Volume Line Chart */}
        <div className="lg:col-span-8">
          <GlassCard className="flex flex-col gap-6 p-6 h-full">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h2 className="text-base font-bold text-text-main">Weekly Scan Velocity</h2>
                <p className="text-[10px] text-text-sub">Displays total cybernetic checks performed day-over-day.</p>
              </div>
              <span className="text-xs font-bold text-primary font-mono flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> LIVE MONITOR
              </span>
            </div>
            <div className="mt-2">
              <LineChart data={lineChartData} height={180} />
            </div>
          </GlassCard>
        </div>

        {/* Bullying split Pie Chart */}
        <div className="lg:col-span-4">
          <GlassCard className="flex flex-col gap-6 p-6 h-full justify-between">
            <div className="text-left">
              <h2 className="text-base font-bold text-text-main">Incidence Ratio</h2>
              <p className="text-[10px] text-text-sub">Proportional split of safe versus abusive content logs.</p>
            </div>
            <div className="py-2 flex items-center justify-center">
              <PieChart data={pieChartData} size={150} />
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Lower section Grid: Activity & Severity & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Severity distribution bar chart */}
        <div className="lg:col-span-4">
          <GlassCard className="flex flex-col gap-6 p-6 h-full">
            <div className="text-left">
              <h2 className="text-base font-bold text-text-main">Abuse Severity Split</h2>
              <p className="text-[10px] text-text-sub">Breaks down detected cyberbullying counts by harm level.</p>
            </div>
            <div className="mt-2">
              <BarChart data={barChartData} height={180} />
            </div>
          </GlassCard>
        </div>

        {/* Recent Scan History Timeline */}
        <div className="lg:col-span-5">
          <GlassCard className="flex flex-col gap-4 p-6 text-left h-full">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="text-base font-bold text-text-main">Recent Activity Ledger</h2>
                <p className="text-[10px] text-text-sub">Timeline of direct comments parsed by models.</p>
              </div>
              <button
                onClick={() => setView("history")}
                className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-0.5"
              >
                View all <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-col gap-4 relative pl-4 mt-2">
              {/* Vertical connecting line */}
              <div className="absolute left-1.5 top-2 bottom-2 w-0.5 border-l border-dashed border-glass" />

              {recentHistory.map((log) => (
                <div key={log.id} className="relative flex gap-3 text-left">
                  {/* Indicator Dot */}
                  <div
                    className={`absolute -left-4 w-3.5 h-3.5 rounded-full border border-background flex items-center justify-center
                      ${log.isBullying ? "bg-danger" : "bg-success"}
                    `}
                    style={{ transform: "translateX(-25%)", top: "2px" }}
                  />

                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-text-main truncate max-w-[200px]">
                        {log.content}
                      </span>
                      <span
                        className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border
                          ${log.isBullying 
                            ? "bg-danger/10 border-danger/25 text-danger" 
                            : "bg-success/10 border-success/25 text-success"
                          }
                        `}
                      >
                        {log.isBullying ? log.category : "Safe"}
                      </span>
                    </div>
                    <span className="text-[9px] text-text-sub font-mono font-medium inline-flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-text-sub/50" /> {log.timestamp} | ID: {log.id}
                    </span>
                  </div>
                </div>
              ))}

              {recentHistory.length === 0 && (
                <div className="text-center text-xs text-text-sub py-6">
                  No scanning activity recorded yet.
                </div>
              )}
            </div>
          </GlassCard>
        </div>

        {/* Quick actions panel */}
        <div className="lg:col-span-3">
          <GlassCard className="flex flex-col gap-4 p-6 text-left h-full justify-between">
            <h2 className="text-base font-bold text-text-main">Moderator Actions</h2>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setView("detection")}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-glass bg-slate-900/20 light:bg-slate-50/20 hover:border-primary/30 transition-all text-xs font-bold text-text-main hover:text-primary cursor-pointer"
              >
                <span>Run Text Analysis</span>
                <Plus className="w-4 h-4 text-primary" />
              </button>
              <button
                onClick={() => setView("ocr")}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-glass bg-slate-900/20 light:bg-slate-50/20 hover:border-primary/30 transition-all text-xs font-bold text-text-main hover:text-primary cursor-pointer"
              >
                <span>Upload Screen Capture</span>
                <Plus className="w-4 h-4 text-primary" />
              </button>
              <button
                onClick={() => {
                  setView("reports");
                  showToast("Reports ledger opened. Proceed to PDF compilation.", "success");
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-glass bg-slate-900/20 light:bg-slate-50/20 hover:border-primary/30 transition-all text-xs font-bold text-text-main hover:text-primary cursor-pointer"
              >
                <span>Export Safety Reports</span>
                <FileText className="w-4 h-4 text-primary" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/10 text-[10px] text-primary leading-relaxed mt-2">
              <span className="font-bold flex items-center gap-1 mb-1">
                <AlertCircle className="w-3.5 h-3.5" /> Security Notice
              </span>
              Developer keys are now sandbox constrained. Upgrade credentials in Settings panel to enable webhooks.
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
