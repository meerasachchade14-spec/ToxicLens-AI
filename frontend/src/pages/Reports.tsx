import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { GlassCard } from "../components/ui/GlassCard";
import {
  FilePieChart, Download, Calendar, Check, AlertCircle,
  FileText, RefreshCw
} from "lucide-react";

export const ReportsPage: React.FC = () => {
  const { showToast } = useApp();
  const [downloadingReport, setDownloadingReport] = useState<string | null>(null);
  const [scheduleEmail, setScheduleEmail] = useState("meera.nair@toxiclens.ai");
  const [scheduleFreq, setScheduleFreq] = useState("Weekly");
  const [isScheduled, setIsScheduled] = useState(false);

  const handleDownload = (reportType: string) => {
    setDownloadingReport(reportType);
    showToast(`Compiling ${reportType} Analytics...`, "info");
    
    setTimeout(() => {
      setDownloadingReport(null);
      showToast(`${reportType} PDF successfully compiled and downloaded!`, "success");
    }, 2000);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleEmail) {
      showToast("Email address is required", "error");
      return;
    }
    setIsScheduled(true);
    showToast(`Scheduled ${scheduleFreq} dispatch to ${scheduleEmail}`, "success");
  };

  const summaries = [
    {
      title: "Weekly Compliance Summary",
      date: "Jul 11 - Jul 18, 2026",
      size: "2.4 MB",
      type: "weekly",
      desc: "Weekly overview of scanned contents, threat logs, and category flags.",
    },
    {
      title: "Monthly Security Executive Brief",
      date: "Jun 2026",
      size: "8.1 MB",
      type: "monthly",
      desc: "Deep-dive monthly analytics, platform trends, model performance, and audit statistics.",
    },
  ];

  return (
    <div className="flex-1 p-8 overflow-y-auto max-h-screen">
      {/* Header */}
      <div className="text-left mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-main flex items-center gap-2.5">
          <FilePieChart className="w-6 h-6 text-primary" /> Reports Hub
        </h1>
        <p className="text-xs text-text-sub mt-1">
          Compile executive safety briefings, configure automated report dispatch channels, and review platform-level toxicity trends.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Download Center & Scheduler */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Download cards */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-bold text-text-main uppercase tracking-wider text-left">Generate PDF Briefs</h2>
            
            {summaries.map((s, index) => {
              const isCompiling = downloadingReport === s.type;
              return (
                <GlassCard key={index} className="p-6 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3.5 rounded-xl border border-glass bg-primary/10 text-primary flex-shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <h3 className="text-sm font-bold text-text-main">{s.title}</h3>
                      <span className="text-[10px] text-text-sub font-mono font-medium">{s.date} | size: {s.size}</span>
                      <p className="text-[11px] text-text-sub mt-1 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(s.type)}
                    disabled={isCompiling}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-xs font-bold text-white hover:opacity-90 shadow-sm transition-all cursor-pointer disabled:opacity-50 flex-shrink-0"
                  >
                    {isCompiling ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Compiling...
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" /> Download PDF
                      </>
                    )}
                  </button>
                </GlassCard>
              );
            })}
          </div>

          {/* Automatic Dispatch Scheduler */}
          <GlassCard className="p-6 text-left flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-bold text-text-main">Automated Email Dispatch</h3>
            </div>
            
            <form onSubmit={handleScheduleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-sub uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={scheduleEmail}
                    onChange={(e) => setScheduleEmail(e.target.value)}
                    placeholder="moderator@platform.com"
                    className="glass-input p-2.5 rounded-xl text-xs"
                    disabled={isScheduled}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-sub uppercase tracking-wider">Frequency</label>
                  <select
                    value={scheduleFreq}
                    onChange={(e) => setScheduleFreq(e.target.value)}
                    className="glass-input p-2.5 rounded-xl text-xs focus:outline-none"
                    disabled={isScheduled}
                  >
                    <option value="Daily">Daily Summary</option>
                    <option value="Weekly">Weekly Digest</option>
                    <option value="Monthly">Monthly Comprehensive Report</option>
                  </select>
                </div>
              </div>

              {isScheduled ? (
                <div className="p-4 rounded-xl border border-success/20 bg-success/5 flex items-center justify-between text-xs text-success">
                  <div className="flex items-center gap-2 font-medium">
                    <Check className="w-4 h-4" />
                    <span>Active: {scheduleFreq} dispatch enabled for {scheduleEmail}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsScheduled(false);
                      showToast("Report dispatch disabled.", "info");
                    }}
                    className="text-[10px] font-bold text-danger hover:underline uppercase tracking-wider"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-xs font-bold text-white hover:opacity-90 shadow-sm transition-all cursor-pointer self-start"
                >
                  Enable Automated Schedule
                </button>
              )}
            </form>
          </GlassCard>
        </div>

        {/* Right Side: Key Platform-wide Metrics */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <GlassCard className="p-6 text-left flex flex-col gap-4">
            <h3 className="text-xs font-bold text-text-main uppercase tracking-wider">Platform Toxicity Snapshot</h3>

            <div className="flex flex-col gap-4 mt-2">
              {/* Abuse vector split */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-text-sub font-semibold">Harassment Rate</span>
                  <span className="text-text-main font-bold">42%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "42%" }} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-text-sub font-semibold">Hate Speech Incidence</span>
                  <span className="text-text-main font-bold">28%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: "28%" }} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-text-sub font-semibold">Threat Vectors</span>
                  <span className="text-text-main font-bold">18%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-danger rounded-full" style={{ width: "18%" }} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-text-sub font-semibold">Sarcastic Remarks</span>
                  <span className="text-text-main font-bold">12%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: "12%" }} />
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 text-left flex flex-col gap-4">
            <h3 className="text-xs font-bold text-text-main uppercase tracking-wider">Top Language Scans</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-sub font-semibold">1. English (PH-1)</span>
                <span className="text-text-main font-mono font-bold">58%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-sub font-semibold">2. Hinglish (Mixed-Phonetic)</span>
                <span className="text-text-main font-mono font-bold">30%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-sub font-semibold">3. Hindi (Devanagari script)</span>
                <span className="text-text-main font-mono font-bold">12%</span>
              </div>
            </div>
            
            <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/10 text-[10px] text-primary leading-relaxed mt-2 flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              <span>Languages are processed dynamically. Translation pipelines auto-resolves Hinglish phonetics to Hindi semantic representations.</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
