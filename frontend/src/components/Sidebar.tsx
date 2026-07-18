import React from "react";
import { useApp, type ViewType } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";
import {
  LayoutDashboard, Scan, MessageSquare, History, FilePieChart,
  UserCircle, Settings, ShieldAlert, LogOut, Sun, Moon, Sparkles
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const { user, currentView, setView, logoutUser, scanStats } = useApp();
  const { theme, toggleTheme } = useTheme();

  if (!user) return null;

  const menuItems = [
    { label: "Dashboard", view: "dashboard" as ViewType, icon: <LayoutDashboard className="w-4.5 h-4.5" /> },
    { label: "Text Detection", view: "detection" as ViewType, icon: <MessageSquare className="w-4.5 h-4.5" /> },
    { label: "OCR Detection", view: "ocr" as ViewType, icon: <Scan className="w-4.5 h-4.5" /> },
    { label: "History Logs", view: "history" as ViewType, icon: <History className="w-4.5 h-4.5" /> },
    { label: "Reports Hub", view: "reports" as ViewType, icon: <FilePieChart className="w-4.5 h-4.5" /> },
    { label: "Profile", view: "profile" as ViewType, icon: <UserCircle className="w-4.5 h-4.5" /> },
    { label: "Settings", view: "settings" as ViewType, icon: <Settings className="w-4.5 h-4.5" /> },
  ];

  // If Admin role, append Admin Console
  const finalMenuItems = user.role === "Admin" 
    ? [...menuItems, { label: "Admin Panel", view: "admin" as ViewType, icon: <ShieldAlert className="w-4.5 h-4.5 text-danger" /> }]
    : menuItems;

  // Quota rings info (e.g. 1420 scans used out of 5000)
  const quotaLimit = 5000;
  const quotaUsed = scanStats.totalScans;
  const quotaPercentage = Math.min(100, Math.round((quotaUsed / quotaLimit) * 100));
  const dashOffset = 113 - (113 * quotaPercentage) / 100; // circumference is 2 * PI * r = 2 * 3.14 * 18 = 113

  return (
    <div className="w-68 min-h-screen border-r border-glass bg-slate-950/80 light:bg-white/80 backdrop-blur-lg flex flex-col justify-between flex-shrink-0 z-20">
      <div className="flex flex-col">
        {/* Header Logo */}
        <div 
          onClick={() => setView("landing")} 
          className="p-6 border-b border-glass flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-md">
            <ShieldAlert className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-base font-extrabold tracking-tight text-text-main">
            ToxicLens <span className="text-primary font-bold">AI</span>
          </span>
        </div>

        {/* User Card */}
        <div className="p-4 mx-3 my-4 rounded-xl border border-glass bg-slate-900/30 light:bg-slate-50/30 flex items-center gap-3.5">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-xl border border-glass object-cover shadow-sm"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-text-main truncate">{user.name}</span>
            <span className="text-[10px] text-text-sub font-semibold inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              {user.role}
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1 px-3">
          {finalMenuItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => setView(item.view)}
                className={`
                  flex items-center gap-3 py-3 px-4 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer
                  ${isActive
                    ? "bg-primary/10 border border-primary/20 text-primary"
                    : "text-text-sub hover:bg-slate-900/20 light:hover:bg-slate-50/20 border border-transparent hover:text-text-main"
                  }
                `}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Area: Quota and Toggles */}
      <div className="p-4 border-t border-glass flex flex-col gap-4">
        {/* Quota ring display */}
        <div className="p-3.5 rounded-xl border border-glass bg-slate-900/40 light:bg-slate-50/40 flex items-center gap-3">
          <div className="relative w-11 h-11 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="18" fill="transparent" stroke="var(--border-color)" strokeWidth="3.5" />
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="transparent"
                stroke="var(--primary)"
                strokeWidth="3.5"
                strokeDasharray="113"
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <span className="absolute text-[9px] font-extrabold text-text-main font-mono">{quotaPercentage}%</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold text-text-main inline-flex items-center gap-1">
              Quota Usage <Sparkles className="w-2.5 h-2.5 text-accent" />
            </span>
            <span className="text-[9px] text-text-sub font-mono font-medium truncate">
              {quotaUsed} / {quotaLimit} scans
            </span>
          </div>
        </div>

        {/* Quick controls */}
        <div className="flex items-center justify-between gap-2">
          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-glass bg-surface-glass text-[10px] font-bold text-text-main hover:text-primary transition-colors cursor-pointer"
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-3.5 h-3.5" /> Light Mode
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5" /> Dark Mode
              </>
            )}
          </button>

          {/* Logout button */}
          <button
            onClick={logoutUser}
            className="p-2 rounded-lg border border-danger/20 hover:border-danger bg-danger/10 hover:bg-danger/20 text-danger transition-all cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
