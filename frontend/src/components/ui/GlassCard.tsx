import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  glowColor?: "primary" | "secondary" | "accent" | "success" | "danger" | "warning";
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  glow = false,
  glowColor = "primary",
  onClick,
  hoverEffect = true,
}) => {
  const glowClasses = {
    primary: "shadow-[0_8px_30px_rgb(99,102,241,0.1)] hover:shadow-[0_15px_40px_rgb(99,102,241,0.2)]",
    secondary: "shadow-[0_8px_30px_rgb(139,92,246,0.1)] hover:shadow-[0_15px_40px_rgb(139,92,246,0.2)]",
    accent: "shadow-[0_8px_30px_rgb(6,182,212,0.1)] hover:shadow-[0_15px_40px_rgb(6,182,212,0.2)]",
    success: "shadow-[0_8px_30px_rgb(16,185,129,0.1)] hover:shadow-[0_15px_40px_rgb(16,185,129,0.2)]",
    danger: "shadow-[0_8px_30px_rgb(239,68,68,0.1)] hover:shadow-[0_15px_40px_rgb(239,68,68,0.2)]",
    warning: "shadow-[0_8px_30px_rgb(245,158,11,0.1)] hover:shadow-[0_15px_40px_rgb(245,158,11,0.2)]",
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-2xl border border-glass bg-surface-glass p-6 backdrop-blur-md
        ${hoverEffect ? "transition-all duration-300 hover:-translate-y-1 hover:border-primary/30" : ""}
        ${glow ? glowClasses[glowColor] : "shadow-lg"}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {/* Glow Backdrop Highlight */}
      {glow && (
        <div className={`absolute -inset-px -z-10 rounded-2xl opacity-0 blur-lg transition-opacity duration-300 hover:opacity-100 bg-radial from-primary/10 to-transparent`} />
      )}
      {children}
    </div>
  );
};
