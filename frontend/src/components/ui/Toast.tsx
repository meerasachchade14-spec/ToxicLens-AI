import React from "react";
import { useApp } from "../../context/AppContext";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const bgColors = {
          success: "border-success/30 bg-slate-900/90 text-success shadow-[0_4px_20px_rgba(16,185,129,0.15)]",
          error: "border-danger/30 bg-slate-900/90 text-danger shadow-[0_4px_20px_rgba(239,68,68,0.15)]",
          info: "border-accent/30 bg-slate-900/90 text-accent shadow-[0_4px_20px_rgba(6,182,212,0.15)]",
        };

        const icons = {
          success: <CheckCircle className="w-5 h-5 flex-shrink-0" />,
          error: <AlertCircle className="w-5 h-5 flex-shrink-0" />,
          info: <Info className="w-5 h-5 flex-shrink-0" />,
        };

        return (
          <div
            key={toast.id}
            className={`
              pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl border backdrop-blur-md
              animate-[slideUp_0.3s_ease-out_forwards] transition-all duration-300
              ${bgColors[toast.type]}
            `}
            style={{
              animation: "toast-slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          >
            <div className="flex items-center gap-3">
              {icons[toast.type]}
              <span className="text-sm font-semibold text-white">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/60 hover:text-white transition-colors p-0.5 rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}

      {/* Embedded Slide-in Styles */}
      <style>{`
        @keyframes toast-slide-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};
