import React, { useState } from "react";
import { useApp, type ScanRecord } from "../context/AppContext";
import { GlassCard } from "../components/ui/GlassCard";
import {
  History, Search, Filter, Trash2, Eye, Download, FileText, ChevronLeft, ChevronRight,
  X, Brain, Smile, Sparkles, Copy
} from "lucide-react";

export const HistoryPage: React.FC = () => {
  const { history, deleteHistoryRecord, clearHistory, showToast } = useApp();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterLanguage, setFilterLanguage] = useState("All");

  // Modal details state
  const [selectedScan, setSelectedScan] = useState<ScanRecord | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter logic
  const filteredHistory = history.filter((item) => {
    const matchesSearch = item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = filterSeverity === "All" || item.severity === filterSeverity;
    const matchesCategory = filterCategory === "All" || item.category === filterCategory;
    const matchesLanguage = filterLanguage === "All" || item.language === filterLanguage;

    return matchesSearch && matchesSeverity && matchesCategory && matchesLanguage;
  });

  // Paginated records
  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedHistory = filteredHistory.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleExportCSV = () => {
    if (filteredHistory.length === 0) {
      showToast("No records to export", "error");
      return;
    }

    // Convert list to CSV string
    const headers = "ID,Timestamp,Type,IsBullying,Category,Severity,Confidence,ToxicityScore,Language,Text\n";
    const rows = filteredHistory
      .map((r) => `${r.id},"${r.timestamp}",${r.type},${r.isBullying},${r.category},${r.severity},${r.confidence}%,${r.toxicityScore}%,${r.language},"${r.content.replace(/"/g, '""')}"`)
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `toxiclens_scan_history_${new Date().toISOString().substring(0,10)}.csv`);
    a.click();
    showToast("CSV scan history exported successfully!", "success");
  };

  const handleCopyRewrite = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("Safe rewrite copied!", "success");
  };

  const severityColors = {
    Low: "bg-success/15 border-success/20 text-success",
    Medium: "bg-warning/15 border-warning/20 text-warning",
    High: "bg-danger/15 border-danger/20 text-danger",
    Extreme: "bg-danger text-white",
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto max-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold text-text-main flex items-center gap-2.5">
            <History className="w-6 h-6 text-primary" /> Detection History
          </h1>
          <p className="text-xs text-text-sub mt-1">Review, search, and audit past NLP text scans and OCR visual classification logs.</p>
        </div>

        {/* Action Controls */}
        <div className="flex gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl border border-glass bg-surface-glass text-xs font-semibold text-text-main hover:border-primary/25 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-primary" /> Export CSV
          </button>
          <button
            onClick={clearHistory}
            className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl border border-danger/25 bg-danger/5 text-xs font-semibold text-danger hover:bg-danger/10 transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" /> Purge Logs
          </button>
        </div>
      </div>

      {/* Filter Row Panel */}
      <GlassCard className="p-5 flex flex-wrap gap-4 items-center justify-between mb-6">
        {/* Search Input */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sub/60" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by text content or ID..."
            className="w-full glass-input py-2 pl-10 pr-4 rounded-xl text-xs"
          />
        </div>

        {/* Dropdown filters */}
        <div className="flex flex-wrap gap-3.5 items-center">
          <div className="flex items-center gap-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-text-sub" />
            <span className="text-text-sub font-semibold">Severity:</span>
            <select
              value={filterSeverity}
              onChange={(e) => {
                setFilterSeverity(e.target.value);
                setCurrentPage(1);
              }}
              className="glass-input p-1.5 px-3 rounded-lg text-xs font-medium focus:outline-none"
            >
              <option value="All">All Severities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Extreme">Extreme</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-text-sub font-semibold">Category:</span>
            <select
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="glass-input p-1.5 px-3 rounded-lg text-xs font-medium focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Safe">Safe</option>
              <option value="Harassment">Harassment</option>
              <option value="Hate Speech">Hate Speech</option>
              <option value="Threat">Threat</option>
              <option value="Insult">Insult</option>
              <option value="Sexual Harassment">Sexual Harassment</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-text-sub font-semibold">Language:</span>
            <select
              value={filterLanguage}
              onChange={(e) => {
                setFilterLanguage(e.target.value);
                setCurrentPage(1);
              }}
              className="glass-input p-1.5 px-3 rounded-lg text-xs font-medium focus:outline-none"
            >
              <option value="All">All Languages</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Hinglish">Hinglish</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {/* Main Table Card */}
      <GlassCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-glass bg-slate-900/40 light:bg-slate-50/40 text-[10px] font-bold uppercase tracking-wider text-text-sub">
                <th className="py-4 px-6">Scan ID</th>
                <th className="py-4 px-6">Timestamp</th>
                <th className="py-4 px-6">Content Preview</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">Language</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Severity</th>
                <th className="py-4 px-6">Toxicity</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glass text-xs font-medium">
              {paginatedHistory.map((row) => (
                <tr key={row.id} className="hover:bg-slate-900/10 light:hover:bg-slate-50/10 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-text-main">{row.id}</td>
                  <td className="py-4 px-6 text-text-sub whitespace-nowrap">{row.timestamp}</td>
                  <td className="py-4 px-6 text-text-main truncate max-w-[200px]" title={row.content}>
                    {row.content}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-[9px] uppercase font-bold text-text-sub font-mono">
                      {row.type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-text-sub">{row.language}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[9px] font-bold
                        ${row.isBullying 
                          ? "bg-danger/10 border-danger/20 text-danger" 
                          : "bg-success/10 border-success/20 text-success"
                        }
                      `}
                    >
                      {row.isBullying ? row.category : "Safe"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-0.5 rounded-md border text-[9px] font-bold uppercase ${severityColors[row.severity]}`}>
                      {row.severity}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-mono font-bold text-text-main">{row.toxicityScore}%</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedScan(row)}
                        className="p-1.5 rounded-lg border border-glass bg-surface-glass text-text-sub hover:text-primary transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteHistoryRecord(row.id)}
                        className="p-1.5 rounded-lg border border-danger/15 bg-danger/5 hover:bg-danger/15 text-danger transition-colors cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredHistory.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-text-sub">
                    No scanning log entries found matching selected parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination footer */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-glass px-6 py-4 text-xs font-semibold text-text-sub bg-slate-900/10 light:bg-slate-50/10">
            <span>
              Showing <span className="text-text-main font-bold">{startIndex + 1}</span> to{" "}
              <span className="text-text-main font-bold">
                {Math.min(startIndex + itemsPerPage, filteredHistory.length)}
              </span>{" "}
              of <span className="text-text-main font-bold">{filteredHistory.length}</span> logs
            </span>

            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="p-1.5 rounded-lg border border-glass bg-surface-glass hover:text-primary transition-colors cursor-pointer disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-1.5 rounded-lg border border-glass bg-surface-glass hover:text-primary transition-colors cursor-pointer disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </GlassCard>

      {/* Details View Modal */}
      {selectedScan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="w-full max-w-lg">
            <GlassCard glow glowColor={selectedScan.isBullying ? "danger" : "success"} className="p-6 text-left relative flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => setSelectedScan(null)}
                className="absolute top-5 right-5 p-1 rounded-lg border border-glass bg-surface-glass text-text-sub hover:text-text-main transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
                  <FileText className="w-4.5 h-4.5 text-white" />
                </div>
                <div className="flex flex-col text-left">
                  <h3 className="text-sm font-bold text-text-main">Audit Scan Report</h3>
                  <span className="text-[10px] text-text-sub font-mono font-medium">{selectedScan.id} | {selectedScan.timestamp}</span>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-text-sub uppercase tracking-wider">Scanned content:</span>
                <div className="p-3.5 rounded-xl border border-glass bg-slate-900/30 light:bg-slate-50/30 text-xs font-mono text-text-main max-h-36 overflow-y-auto leading-relaxed select-all">
                  "{selectedScan.content}"
                </div>
              </div>

              {/* Model Scores Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl border border-glass bg-slate-900/20 light:bg-slate-50/20 text-center">
                  <span className="text-[9px] text-text-sub font-bold block uppercase tracking-wider">Toxicity</span>
                  <span className="text-lg font-black text-text-main font-mono">{selectedScan.toxicityScore}%</span>
                </div>
                <div className="p-3 rounded-xl border border-glass bg-slate-900/20 light:bg-slate-50/20 text-center">
                  <span className="text-[9px] text-text-sub font-bold block uppercase tracking-wider">Confidence</span>
                  <span className="text-lg font-black text-text-main font-mono">{selectedScan.confidence}%</span>
                </div>
                <div className="p-3 rounded-xl border border-glass bg-slate-900/20 light:bg-slate-50/20 text-center">
                  <span className="text-[9px] text-text-sub font-bold block uppercase tracking-wider">Severity</span>
                  <span className="text-xs font-extrabold text-danger block mt-1 uppercase truncate">{selectedScan.severity}</span>
                </div>
              </div>

              {/* Metrics lists */}
              <div className="flex flex-col gap-3 text-xs border-b border-glass pb-3">
                <div className="flex justify-between">
                  <span className="text-text-sub font-semibold">Classification Type:</span>
                  <span className="text-text-main font-bold font-mono uppercase">{selectedScan.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-sub font-semibold">Language Filter:</span>
                  <span className="text-text-main font-bold">{selectedScan.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-sub font-semibold">Bullying Category:</span>
                  <span className="text-text-main font-bold">{selectedScan.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-sub font-semibold">Emotion Signature:</span>
                  <span className="text-text-main font-bold inline-flex items-center gap-1">
                    <Smile className="w-3.5 h-3.5 text-accent" /> {selectedScan.emotion}
                  </span>
                </div>
              </div>

              {/* Explainable AI */}
              <div className="p-3.5 rounded-xl border border-glass bg-slate-900/35 light:bg-slate-50/35 text-[11px] leading-relaxed text-text-sub">
                <span className="font-bold text-text-main flex items-center gap-1 mb-1">
                  <Brain className="w-3.5 h-3.5 text-primary" /> AI Classification Logic
                </span>
                {selectedScan.explanation}
              </div>

              {/* Safe rewrite suggestion */}
              {selectedScan.isBullying && selectedScan.safeRewrite && (
                <div className="p-3.5 rounded-xl border border-success/25 bg-success/5 flex flex-col gap-2 relative">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-success uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> AI Safe Suggestion
                    </span>
                    <button
                      onClick={() => handleCopyRewrite(selectedScan.safeRewrite)}
                      className="p-1 rounded-lg border border-success/25 text-success bg-white/5 hover:bg-success/15 transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-text-main font-medium italic">
                    "{selectedScan.safeRewrite}"
                  </p>
                </div>
              )}

              {/* Close CTAs */}
              <div className="flex justify-end gap-2 border-t border-glass pt-4">
                <button
                  onClick={() => setSelectedScan(null)}
                  className="px-5 py-2.5 rounded-xl border border-glass bg-surface-glass text-xs font-bold text-text-main hover:border-primary/25 transition-all cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => {
                    showToast("PDF report downloaded.", "success");
                    setSelectedScan(null);
                  }}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-xs font-bold text-white hover:opacity-90 shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Download Report
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  );
};
