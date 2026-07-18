import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";
import { GlassCard } from "../components/ui/GlassCard";
import {
  Settings, KeyRound, Eye, EyeOff, Copy, Plus, Trash2,
  Bell, Globe, Shield
} from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  revealed: boolean;
}

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useApp();

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { id: "key-1", name: "Instagram Production Bot", key: "tl_live_d8a4f9011ba2cf99a1", created: "2026-05-14", revealed: false },
    { id: "key-2", name: "Chrome Safety Extension", key: "tl_live_71bb248efcc765e90a", created: "2026-07-02", revealed: false },
  ]);

  const [notifScan, setNotifScan] = useState(true);
  const [notifRisk, setNotifRisk] = useState(true);
  const [notifDigest, setNotifDigest] = useState(false);
  const [defaultLang, setDefaultLang] = useState("English");
  const [newKeyName, setNewKeyName] = useState("");

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) {
      showToast("Please enter an API key label", "error");
      return;
    }

    const randomHash = Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 10);
    const newKey: ApiKey = {
      id: "key-" + (apiKeys.length + 1),
      name: newKeyName,
      key: "tl_live_" + randomHash,
      created: new Date().toISOString().split("T")[0],
      revealed: false,
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName("");
    showToast("Developer API Key provisioned!", "success");
  };

  const handleToggleReveal = (id: string) => {
    setApiKeys(apiKeys.map((k) => (k.id === id ? { ...k, revealed: !k.revealed } : k)));
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    showToast("API Key copied to clipboard", "success");
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id));
    showToast("API Key revoked successfully.", "info");
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto max-h-screen">
      {/* Header */}
      <div className="text-left mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-main flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-primary" /> Settings Panel
        </h1>
        <p className="text-xs text-text-sub mt-1">Configure moderation properties, default API languages, and manage developer keys.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: General & Notification Settings */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Theme card */}
          <GlassCard className="p-6 text-left flex flex-col gap-4">
            <h3 className="text-xs font-bold text-text-main uppercase tracking-wider">Appearance Mode</h3>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  if (theme === "light") toggleTheme();
                }}
                className={`
                  flex-1 py-3.5 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer
                  ${theme === "dark"
                    ? "bg-primary/10 border-primary/20 text-primary"
                    : "border-glass text-text-sub hover:bg-slate-900/10"
                  }
                `}
              >
                Dark Mode (Default)
              </button>
              
              <button
                onClick={() => {
                  if (theme === "dark") toggleTheme();
                }}
                className={`
                  flex-1 py-3.5 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer
                  ${theme === "light"
                    ? "bg-primary/10 border-primary/20 text-primary"
                    : "border-glass text-text-sub hover:bg-slate-900/10"
                  }
                `}
              >
                Light Mode
              </button>
            </div>
          </GlassCard>

          {/* Notifications Card */}
          <GlassCard className="p-6 text-left flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Bell className="w-4.5 h-4.5 text-primary" />
              <h3 className="text-xs font-bold text-text-main uppercase tracking-wider">Moderator Notifications</h3>
            </div>
            
            <div className="flex flex-col gap-4">
              <label className="flex items-start justify-between gap-4 cursor-pointer">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-text-main">Toxicity Scan Alerts</span>
                  <span className="text-[10px] text-text-sub leading-normal">Notify when scan indices exceed 80% threat scores.</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifScan}
                  onChange={(e) => setNotifScan(e.target.checked)}
                  className="mt-1 accent-primary"
                />
              </label>

              <label className="flex items-start justify-between gap-4 cursor-pointer">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-text-main">High Risk Threats</span>
                  <span className="text-[10px] text-text-sub leading-normal">Trigger immediate sound alerts on severe threat vectors.</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifRisk}
                  onChange={(e) => setNotifRisk(e.target.checked)}
                  className="mt-1 accent-primary"
                />
              </label>

              <label className="flex items-start justify-between gap-4 cursor-pointer">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-text-main">Weekly digest dispatches</span>
                  <span className="text-[10px] text-text-sub leading-normal">Email weekly PDF summaries to team managers.</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifDigest}
                  onChange={(e) => setNotifDigest(e.target.checked)}
                  className="mt-1 accent-primary"
                />
              </label>
            </div>
          </GlassCard>

          {/* Language Selection */}
          <GlassCard className="p-6 text-left flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4.5 h-4.5 text-primary" />
              <h3 className="text-xs font-bold text-text-main uppercase tracking-wider">Default Parser Language</h3>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-text-sub font-semibold">Select default pipeline language when entering scans:</span>
              <select
                value={defaultLang}
                onChange={(e) => setDefaultLang(e.target.value)}
                className="glass-input p-2.5 rounded-xl text-xs focus:outline-none"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi (Devanagari)</option>
                <option value="Hinglish">Hinglish (Code-Mixed)</option>
              </select>
            </div>
          </GlassCard>
        </div>

        {/* Right Side: API Key Manager */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <GlassCard className="p-6 text-left flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-bold text-text-main">Developer API Credentials</h3>
            </div>
            
            <p className="text-xs text-text-sub leading-relaxed">
              Integrate ToxicLens AI cyberbullying models into external forums, Discord integrations, or company APIs using JWT key headers.
            </p>

            {/* List keys */}
            <div className="flex flex-col gap-3">
              {apiKeys.map((k) => (
                <div key={k.id} className="p-4 rounded-xl border border-glass bg-slate-900/25 light:bg-slate-50/25 flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-xs font-bold text-text-main truncate">{k.name}</span>
                    <span className="text-[9px] text-text-sub font-mono font-medium">Created: {k.created}</span>
                    
                    {/* Key String Display */}
                    <div className="mt-1 font-mono text-[10px] text-accent truncate max-w-[200px] sm:max-w-xs bg-slate-900/50 p-1.5 rounded-md border border-glass">
                      {k.revealed ? k.key : "••••••••••••••••••••••••••••••••"}
                    </div>
                  </div>

                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleToggleReveal(k.id)}
                      className="p-2 rounded-lg border border-glass bg-surface-glass text-text-sub hover:text-text-main transition-colors cursor-pointer"
                      title={k.revealed ? "Hide API key" : "Reveal API key"}
                    >
                      {k.revealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleCopyKey(k.key)}
                      className="p-2 rounded-lg border border-glass bg-surface-glass text-text-sub hover:text-text-main transition-colors cursor-pointer"
                      title="Copy key string"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteKey(k.id)}
                      className="p-2 rounded-lg border border-danger/20 hover:border-danger bg-danger/5 hover:bg-danger/15 text-danger transition-colors cursor-pointer"
                      title="Revoke key credentials"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {apiKeys.length === 0 && (
                <div className="text-center text-xs text-text-sub py-6">
                  No active developer API credentials found.
                </div>
              )}
            </div>

            {/* Create new Key form */}
            <form onSubmit={handleGenerateKey} className="flex gap-2 items-end border-t border-glass pt-4 mt-2">
              <div className="flex flex-col gap-1.5 flex-1 text-left">
                <label className="text-[10px] font-bold text-text-sub uppercase tracking-wider">Generate New API Key</label>
                <input
                  type="text"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g. Slack Moderation Bot"
                  className="glass-input p-2.5 rounded-xl text-xs w-full"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-xs font-bold text-white hover:opacity-90 shadow-sm transition-all cursor-pointer h-[38px] flex-shrink-0"
              >
                <Plus className="w-4 h-4" /> Provision
              </button>
            </form>
          </GlassCard>

          {/* Account Security options */}
          <GlassCard className="p-6 text-left flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4.5 h-4.5 text-primary" />
              <h3 className="text-xs font-bold text-text-main uppercase tracking-wider">Platform Security Credentials</h3>
            </div>
            <p className="text-[10px] text-text-sub">Modify password rules, toggle multi-factor authenticator protocols (MFA), or purge active session tokens.</p>
            <div className="flex flex-wrap gap-2.5 mt-1">
              <button onClick={() => showToast("MFA enrollment setup initialized.", "info")} className="py-2 px-3 rounded-lg border border-glass text-[10px] font-bold text-text-main hover:border-primary/20 transition-all cursor-pointer">Configure MFA</button>
              <button onClick={() => showToast("Audit log session histories cleared.", "success")} className="py-2 px-3 rounded-lg border border-glass text-[10px] font-bold text-text-main hover:border-primary/20 transition-all cursor-pointer">Clear Session History</button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
