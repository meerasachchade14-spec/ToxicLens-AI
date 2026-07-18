import React, { useState } from "react";
import { useApp, type ScanRecord } from "../context/AppContext";
import { GlassCard } from "../components/ui/GlassCard";
import {
  MessageSquare, Sparkles, Mic, RefreshCw, Trash2, Copy, Download, Share2, Save,
  AlertTriangle, CheckCircle, Brain, Smile, Activity
} from "lucide-react";

export const TextDetection: React.FC = () => {
  const { runMockTextAnalysis, showToast } = useApp();
  const [inputText, setInputText] = useState("");
  const [selectedLang, setSelectedLang] = useState<"English" | "Hindi" | "Hinglish">("English");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [result, setResult] = useState<ScanRecord | null>(null);

  const presets = [
    {
      text: "Hey, you are incredibly fat and ugly, you should delete your account.",
      label: "Body Shaming (EN)",
      lang: "English" as const,
    },
    {
      text: "This is a great product representation, can't wait for the production release!",
      label: "Constructive Feedback (EN)",
      lang: "English" as const,
    },
    {
      text: "Tu bahut bada bewakoof hai, tujhe kuch nahi pata.",
      label: "Insult (Hinglish)",
      lang: "Hinglish" as const,
    },
    {
      text: "Agar tumne firse mere posts par comment kiya, to tumhare liye achha nahi hoga. Mai tumhara address jaanta hu.",
      label: "Direct Threat (Hindi)",
      lang: "Hindi" as const,
    },
    {
      text: "Oh brilliant! Another delay. You guys are absolute geniuses. 🙄",
      label: "Sarcasm (EN)",
      lang: "English" as const,
    },
  ];

  const handleAnalyze = () => {
    if (!inputText.trim()) {
      showToast("Please enter some text to analyze", "error");
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    // Simulate AI Transformer latency
    setTimeout(() => {
      const scanResult = runMockTextAnalysis(inputText, selectedLang);
      setResult(scanResult);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleClear = () => {
    setInputText("");
    setResult(null);
    showToast("Cleared inputs.", "info");
  };

  const handlePresetSelect = (preset: typeof presets[0]) => {
    setInputText(preset.text);
    setSelectedLang(preset.lang);
    setResult(null);
    showToast(`Loaded: ${preset.label}`, "info");
  };

  // Mock voice recorder input
  const handleVoiceInput = () => {
    if (isRecording) {
      setIsRecording(false);
      setInputText("Aap bilkul chutiya hain, sharam nahi aati?");
      setSelectedLang("Hinglish");
      showToast("Voice input captured! Hinglish detected.", "success");
    } else {
      setIsRecording(true);
      showToast("Listening... Speak now.", "info");
    }
  };

  const handleCopyRewrite = () => {
    if (result && result.safeRewrite) {
      navigator.clipboard.writeText(result.safeRewrite);
      showToast("Safe rewrite copied to clipboard!", "success");
    }
  };

  const handleDownload = () => {
    showToast("Safety PDF Report download initialized.", "success");
  };

  const handleShare = () => {
    showToast("Incident report link generated and copied to clipboard.", "info");
  };

  const handleSave = () => {
    showToast("Classification record successfully committed to history.", "success");
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto max-h-screen">
      {/* Page Header */}
      <div className="text-left mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-main flex items-center gap-2.5">
          <MessageSquare className="w-6 h-6 text-primary" /> Cyberbullying Detection Page
        </h1>
        <p className="text-xs text-text-sub mt-1">
          Perform multi-label semantic text scans. Detect harassment, hate speech, threats, and sarcasm across code-mixed language filters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Input Terminal */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <GlassCard className="flex flex-col gap-5 p-6 text-left relative">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-text-main uppercase tracking-wider">Comment Input Portal</span>
              <div className="flex gap-2">
                {(["English", "Hindi", "Hinglish"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`
                      px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer
                      ${selectedLang === lang
                        ? "bg-primary/10 border-primary/20 text-primary"
                        : "border-glass text-text-sub hover:text-text-main hover:bg-slate-900/10"
                      }
                    `}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Input box */}
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter any social media comment, threat, or post content..."
                rows={6}
                className="w-full glass-input p-4 rounded-xl text-sm font-medium resize-none"
              />
              {/* Voice Input Trigger */}
              <button
                onClick={handleVoiceInput}
                className={`
                  absolute bottom-4 right-4 p-2.5 rounded-xl border border-glass shadow-md transition-all cursor-pointer
                  ${isRecording
                    ? "bg-danger text-white animate-pulse"
                    : "bg-surface-glass text-text-sub hover:text-primary hover:border-primary/25"
                  }
                `}
                title="Voice Input (Speech-to-Text)"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-glass bg-surface-glass text-xs font-bold text-danger hover:bg-danger/5 hover:border-danger/25 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Clear
              </button>

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-xs font-bold text-white hover:opacity-90 shadow-md shadow-primary/15 transition-all cursor-pointer disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Scanning Pipeline...
                  </>
                ) : (
                  <>
                    Analyze Comment <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </GlassCard>

          {/* Preset Buttons Block */}
          <GlassCard className="p-6 text-left flex flex-col gap-4">
            <h3 className="text-xs font-bold text-text-main uppercase tracking-wider">Analysis Presets (Click to Load)</h3>
            <div className="flex flex-wrap gap-2.5">
              {presets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => handlePresetSelect(preset)}
                  className="py-2 px-3 rounded-xl border border-glass bg-slate-900/10 light:bg-slate-50/10 hover:border-primary/35 hover:bg-primary/5 transition-all text-xs font-semibold text-text-sub hover:text-text-main cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Side: Analysis Display */}
        <div className="lg:col-span-5">
          {/* Default state */}
          {!isAnalyzing && !result && (
            <GlassCard className="p-12 text-center flex flex-col items-center justify-center gap-4 h-[380px]">
              <div className="w-16 h-16 rounded-full border border-dashed border-glass flex items-center justify-center text-text-sub">
                <Brain className="w-8 h-8 opacity-40" />
              </div>
              <h3 className="text-sm font-bold text-text-main">Awaiting Input Scan</h3>
              <p className="text-xs text-text-sub max-w-[280px] leading-relaxed">
                Provide text or select an analysis preset to launch the ToxicLens multi-layered moderation pipeline.
              </p>
            </GlassCard>
          )}

          {/* Shimmer/Loading Skeletons */}
          {isAnalyzing && (
            <GlassCard className="p-6 flex flex-col gap-6 text-left h-[440px] shimmer-effect">
              <div className="h-6 bg-white/10 rounded w-1/3" />
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/10" />
                <div className="flex flex-col gap-2 flex-1">
                  <div className="h-4 bg-white/10 rounded w-1/2" />
                  <div className="h-3 bg-white/10 rounded w-3/4" />
                </div>
              </div>
              <div className="h-[1px] bg-white/10" />
              <div className="flex flex-col gap-3">
                <div className="h-3 bg-white/10 rounded w-full" />
                <div className="h-3 bg-white/10 rounded w-5/6" />
                <div className="h-3 bg-white/10 rounded w-4/6" />
              </div>
              <div className="h-16 bg-white/5 rounded-xl border border-white/5" />
            </GlassCard>
          )}

          {/* Results dashboard rendering */}
          {result && (
            <div className="flex flex-col gap-6">
              <GlassCard
                glow
                glowColor={result.isBullying ? "danger" : "success"}
                className="p-6 flex flex-col gap-5 text-left animate-[scaleIn_0.3s_cubic-bezier(0.16,1,0.3,1)]"
              >
                {/* Header indicators */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-main uppercase tracking-wider">Classification Outcome</span>
                  <div className="flex items-center gap-2">
                    {result.isBullying ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-danger/20 bg-danger/10 text-xs font-bold text-danger">
                        <AlertTriangle className="w-3.5 h-3.5" /> Cyberbullying
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-success/20 bg-success/10 text-xs font-bold text-success">
                        <CheckCircle className="w-3.5 h-3.5" /> Safe Content
                      </span>
                    )}
                  </div>
                </div>

                {/* Score indicators */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl border border-glass bg-slate-900/20 light:bg-slate-50/20">
                    <span className="text-[10px] text-text-sub font-bold block uppercase tracking-wider">Toxicity Score</span>
                    <span className="text-2xl font-black text-text-main font-mono inline-flex items-end gap-1 mt-1">
                      {result.toxicityScore}%
                      <Activity className="w-4.5 h-4.5 text-danger mb-1" />
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl border border-glass bg-slate-900/20 light:bg-slate-50/20">
                    <span className="text-[10px] text-text-sub font-bold block uppercase tracking-wider">Confidence Level</span>
                    <span className="text-2xl font-black text-text-main font-mono inline-flex items-end gap-1 mt-1">
                      {result.confidence}%
                      <CheckCircle className="w-4.5 h-4.5 text-success mb-1" />
                    </span>
                  </div>
                </div>

                {/* Category metadata */}
                <div className="flex flex-col gap-3.5 py-1">
                  <div className="flex items-center justify-between text-xs border-b border-glass pb-2">
                    <span className="text-text-sub font-semibold">Abuse Category:</span>
                    <span className="text-text-main font-bold">{result.category}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs border-b border-glass pb-2">
                    <span className="text-text-sub font-semibold">Severity Rating:</span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded-md text-[10px] uppercase
                        ${result.severity === "Extreme" ? "bg-danger text-white" : ""}
                        ${result.severity === "High" ? "bg-danger/20 text-danger border border-danger/10" : ""}
                        ${result.severity === "Medium" ? "bg-warning/20 text-warning border border-warning/10" : ""}
                        ${result.severity === "Low" ? "bg-success/20 text-success border border-success/10" : ""}
                      `}
                    >
                      {result.severity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs border-b border-glass pb-2">
                    <span className="text-text-sub font-semibold">Emotion Signature:</span>
                    <span className="text-text-main font-bold inline-flex items-center gap-1">
                      <Smile className="w-3.5 h-3.5 text-accent" /> {result.emotion}
                    </span>
                  </div>
                </div>

                {/* Flagged words */}
                {result.isBullying && result.flaggedWords.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold text-text-sub uppercase tracking-wider">Flagged Abuse Keywords:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.flaggedWords.map((word, i) => (
                        <span key={i} className="py-1 px-2.5 rounded-lg border border-danger/25 bg-danger/10 text-[10px] font-bold text-danger shadow-sm">
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Explainable AI block */}
                <div className="p-3.5 rounded-xl border border-glass bg-slate-900/35 light:bg-slate-50/35 text-[11px] leading-relaxed text-text-sub">
                  <span className="font-bold text-text-main flex items-center gap-1 mb-1">
                    <Brain className="w-3.5 h-3.5 text-primary" /> Explainable AI Decision logic
                  </span>
                  {result.explanation}
                </div>

                {/* Safe Rewrite suggestions */}
                {result.isBullying && result.safeRewrite && (
                  <div className="p-4 rounded-xl border border-success/25 bg-success/5 flex flex-col gap-2.5 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-success uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> AI Safe Suggestion
                      </span>
                      <button
                        onClick={handleCopyRewrite}
                        className="p-1 rounded-lg border border-success/25 hover:border-success text-success bg-white/5 hover:bg-success/15 transition-colors cursor-pointer"
                        title="Copy Suggestion"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-text-main font-medium italic select-all leading-relaxed">
                      "{result.safeRewrite}"
                    </p>
                  </div>
                )}

                {/* Action commands */}
                <div className="flex gap-2 justify-between border-t border-glass pt-4 mt-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-glass bg-surface-glass text-xs font-semibold text-text-main hover:border-primary/25 transition-all cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5 text-primary" /> Save
                  </button>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleShare}
                      className="p-2 rounded-xl border border-glass bg-surface-glass text-text-sub hover:text-primary transition-all cursor-pointer"
                      title="Share report"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-xs font-bold text-white hover:opacity-90 shadow-sm transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Report
                    </button>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
