import React, { useState } from "react";
import { useApp, type ScanRecord } from "../context/AppContext";
import { GlassCard } from "../components/ui/GlassCard";
import {
  Scan, Upload, Image, RefreshCw, Sparkles, CheckCircle, AlertTriangle,
  Brain, Trash2, Download, Eye
} from "lucide-react";

export const OcrDetection: React.FC = () => {
  const { runMockOcrAnalysis, showToast } = useApp();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState("");
  const [result, setResult] = useState<ScanRecord | null>(null);

  const ocrPresets = [
    {
      name: "discord_harassment.png",
      label: "Discord Chat Threat",
      text: "Stop posting here, or I will track your IP address and break your face. 🔪",
      imageUrl: "https://images.unsplash.com/photo-1614680376593-902f74fa0d41?q=80&w=256",
    },
    {
      name: "tweet_insult.png",
      label: "Toxic Twitter Comment",
      text: "You are an absolute idiot. No wonder everybody hates you. Delete your account.",
      imageUrl: "https://images.unsplash.com/photo-1611605698335-8b15d27e03f9?q=80&w=256",
    },
    {
      name: "slack_constructive.png",
      label: "Safe Team Chat",
      text: "Wow! The new dashboard updates look fantastic. Excellent design choices, guys!",
      imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=256",
    },
  ];

  const handleSelectPreset = (preset: typeof ocrPresets[0]) => {
    setSelectedImage(preset.imageUrl);
    setImageName(preset.name);
    setResult(null);
    setIsScanning(true);

    // Multi-phase OCR OCR status mock
    setScanStep("Initializing EasyOCR Engine...");
    setTimeout(() => {
      setScanStep("Extracting text boundaries (OCR Grid)...");
      setTimeout(() => {
        setScanStep("Translating font mappings to UTF-8...");
        setTimeout(() => {
          setScanStep("Dispatching parsed tokens to transformer...");
          setTimeout(() => {
            const scanResult = runMockOcrAnalysis(preset.name, preset.text);
            setResult(scanResult);
            setIsScanning(false);
            setScanStep("");
            showToast("OCR analysis successfully completed!", "success");
          }, 800);
        }, 800);
      }, 800);
    }, 800);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    showToast("Processing custom screenshot upload...", "info");
    // Auto load Preset 1 for simulation
    handleSelectPreset(ocrPresets[0]);
  };

  const handleClear = () => {
    setSelectedImage(null);
    setImageName("");
    setResult(null);
    setIsScanning(false);
    setScanStep("");
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto max-h-screen">
      {/* Header */}
      <div className="text-left mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-main flex items-center gap-2.5">
          <Scan className="w-6 h-6 text-primary" /> OCR Screenshot Detection Page
        </h1>
        <p className="text-xs text-text-sub mt-1">
          Upload screenshots from Discord, Twitter, Instagram, or email. Extract written assets using AI vision models and analyze for abuse.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Upload Zone */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="relative rounded-2xl border border-dashed border-2 border-glass bg-surface-glass p-8 backdrop-blur-md text-center flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 min-h-[300px] transition-all duration-300 shadow-lg"
          >
            {selectedImage ? (
              <div className="flex flex-col items-center gap-4 w-full">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-2xl border border-glass shadow-md"
                />
                <div className="flex flex-col items-center gap-1">
                  <span className="text-xs font-bold text-text-main flex items-center gap-1">
                    <Image className="w-4 h-4 text-primary" /> {imageName}
                  </span>
                  <span className="text-[10px] text-text-sub font-semibold font-mono">Image dimension: 1080 x 1080px</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="mt-2 flex items-center gap-1 px-3 py-1.5 rounded-lg border border-danger/25 bg-danger/5 hover:bg-danger/10 text-[10px] font-bold text-danger transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove Image
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 py-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-inner">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold text-text-main">Drag and Drop Screenshot Here</h3>
                  <p className="text-xs text-text-sub max-w-[240px]">
                    Supports PNG, JPG, or JPEG file extensions. Max size limit: 5MB.
                  </p>
                </div>
                <button className="px-4 py-2 rounded-xl bg-surface-glass border border-glass text-xs font-bold text-text-main hover:border-primary/20 transition-all cursor-pointer">
                  Browse Files
                </button>
              </div>
            )}

            {/* Scanning overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-4 p-6">
                <RefreshCw className="w-10 h-10 text-primary animate-spin" />
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <span className="text-xs font-bold text-text-main uppercase tracking-widest animate-pulse">Running AI Vision Pipeline</span>
                  <span className="text-[10px] text-accent font-semibold font-mono">{scanStep}</span>
                </div>
                <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-primary rounded-full animate-[shimmer_2s_infinite] w-2/3" />
                </div>
              </div>
            )}
          </div>

          {/* Sample Presets card */}
          <GlassCard className="p-6 text-left flex flex-col gap-4">
            <h3 className="text-xs font-bold text-text-main uppercase tracking-wider">Test Sample Screenshots</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ocrPresets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectPreset(preset)}
                  className="p-3 rounded-xl border border-glass bg-slate-900/10 light:bg-slate-50/10 hover:border-primary/35 hover:bg-primary/5 transition-all text-left flex flex-col gap-2 cursor-pointer group"
                >
                  <img src={preset.imageUrl} alt={preset.name} className="w-full h-20 object-cover rounded-lg border border-glass" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-bold text-text-main truncate group-hover:text-primary transition-colors">{preset.label}</span>
                    <span className="text-[8px] text-text-sub font-mono">{preset.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Side: Analysis Display */}
        <div className="lg:col-span-6">
          {!result && !isScanning && (
            <GlassCard className="p-12 text-center flex flex-col items-center justify-center gap-4 h-[300px]">
              <div className="w-16 h-16 rounded-full border border-dashed border-glass flex items-center justify-center text-text-sub">
                <Scan className="w-8 h-8 opacity-40" />
              </div>
              <h3 className="text-sm font-bold text-text-main">No Image Loaded</h3>
              <p className="text-xs text-text-sub max-w-[260px] leading-relaxed">
                Drag a file or click one of the test sample screenshots to trigger OCR extracting processes.
              </p>
            </GlassCard>
          )}

          {result && (
            <div className="flex flex-col gap-6 animate-[scaleIn_0.3s_cubic-bezier(0.16,1,0.3,1)]">
              {/* Extracted Text */}
              <GlassCard className="p-6 text-left flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-text-main uppercase tracking-wider flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-primary" /> Extracted Text (OCR output)
                  </span>
                  <span className="text-[9px] bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 rounded-full font-bold font-mono">
                    OCR Conf: {result.ocrConfidence}%
                  </span>
                </div>
                <div className="p-3.5 rounded-xl border border-glass bg-slate-900/30 light:bg-slate-50/30 text-xs font-medium font-mono text-text-main leading-relaxed select-all">
                  "{result.content}"
                </div>
              </GlassCard>

              {/* Analysis outcome */}
              <GlassCard
                glow
                glowColor={result.isBullying ? "danger" : "success"}
                className="p-6 flex flex-col gap-5 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-main uppercase tracking-wider">Transformer Outcome</span>
                  {result.isBullying ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-danger/25 bg-danger/10 text-xs font-bold text-danger">
                      <AlertTriangle className="w-3.5 h-3.5" /> Cyberbullying
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-success/25 bg-success/10 text-xs font-bold text-success">
                      <CheckCircle className="w-3.5 h-3.5" /> Safe Content
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 py-3.5 rounded-xl border border-glass bg-slate-900/20 light:bg-slate-50/20">
                    <span className="text-[10px] text-text-sub font-bold block uppercase tracking-wider">Toxicity Score</span>
                    <span className="text-xl font-black text-text-main font-mono inline-flex items-end gap-1 mt-1">
                      {result.toxicityScore}%
                    </span>
                  </div>
                  <div className="p-3 py-3.5 rounded-xl border border-glass bg-slate-900/20 light:bg-slate-50/20">
                    <span className="text-[10px] text-text-sub font-bold block uppercase tracking-wider">Classification Conf</span>
                    <span className="text-xl font-black text-text-main font-mono inline-flex items-end gap-1 mt-1">
                      {result.confidence}%
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-xs border-b border-glass pb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-sub font-semibold">Category:</span>
                    <span className="text-text-main font-bold">{result.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-sub font-semibold">Severity Rating:</span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded-md text-[9px] uppercase
                        ${result.severity === "Extreme" ? "bg-danger text-white" : ""}
                        ${result.severity === "High" ? "bg-danger/20 text-danger border border-danger/10" : ""}
                        ${result.severity === "Medium" ? "bg-warning/20 text-warning border border-warning/10" : ""}
                        ${result.severity === "Low" ? "bg-success/20 text-success border border-success/10" : ""}
                      `}
                    >
                      {result.severity}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-sub font-semibold">Associated Image:</span>
                    <span className="text-text-main font-bold font-mono">{result.ocrImageName}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-glass bg-slate-900/30 light:bg-slate-50/30 text-[11px] leading-relaxed text-text-sub">
                  <span className="font-bold text-text-main flex items-center gap-1 mb-1">
                    <Brain className="w-3.5 h-3.5 text-primary" /> Explainable AI Notes
                  </span>
                  {result.explanation}
                </div>

                {/* Safe suggestion */}
                {result.isBullying && result.safeRewrite && (
                  <div className="p-3.5 rounded-xl border border-success/25 bg-success/5 flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-success uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> AI Safe Suggestion
                    </span>
                    <p className="text-xs text-text-main font-medium italic">
                      "{result.safeRewrite}"
                    </p>
                  </div>
                )}

                <div className="flex gap-2 justify-end border-t border-glass pt-4 mt-2">
                  <button
                    onClick={() => showToast("Incident report downloaded.", "success")}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-xs font-bold text-white hover:opacity-90 shadow-sm transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF Report
                  </button>
                </div>
              </GlassCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
