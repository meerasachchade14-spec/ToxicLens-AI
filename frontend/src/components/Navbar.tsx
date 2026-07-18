import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useApp } from "../context/AppContext";
import { Sun, Moon, ShieldAlert, Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToSection }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, setView } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", id: "hero" },
    { label: "Features", id: "features" },
    { label: "How It Works", id: "how-it-works" },
    { label: "Technology", id: "technology" },
    { label: "FAQ", id: "faq" },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b
        ${isScrolled 
          ? "py-3 bg-slate-950/75 light:bg-white/75 backdrop-blur-md border-glass shadow-md" 
          : "py-5 bg-transparent border-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => setView("landing")} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <ShieldAlert className="w-5.5 h-5.5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 light:from-slate-900 light:to-slate-600 bg-clip-text text-transparent">
            ToxicLens <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AI</span>
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-sm font-semibold text-text-sub hover:text-primary transition-colors cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          
          {user && (
            <button
              onClick={() => setView("dashboard")}
              className="text-sm font-semibold text-text-sub hover:text-primary transition-colors cursor-pointer"
            >
              Dashboard
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-glass bg-surface-glass text-text-main hover:border-primary/40 hover:text-primary transition-all cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {user ? (
            <button
              onClick={() => setView("dashboard")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-sm font-semibold text-white hover:opacity-90 shadow-md shadow-primary/10 hover:shadow-primary/25 hover:scale-[1.02] transition-all cursor-pointer"
            >
              Go to Console <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <>
              <button
                onClick={() => setView("login")}
                className="px-5 py-2.5 text-sm font-semibold text-text-main hover:text-primary transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => setView("register")}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-sm font-semibold text-white hover:opacity-90 shadow-md shadow-primary/15 hover:shadow-primary/25 hover:scale-[1.02] transition-all cursor-pointer"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile Action Controls */}
        <div className="flex md:hidden items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-glass bg-surface-glass text-text-main hover:text-primary transition-colors cursor-pointer"
          >
            {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          {/* Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-xl border border-glass bg-surface-glass text-text-main hover:text-primary transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[69px] left-0 right-0 bottom-0 z-30 bg-slate-950/95 light:bg-white/95 backdrop-blur-lg border-t border-glass p-6 animate-[slideDown_0.2s_ease-out]">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-lg font-semibold text-left text-text-main hover:text-primary transition-colors py-2 border-b border-glass"
              >
                {link.label}
              </button>
            ))}
            
            {user && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setView("dashboard");
                }}
                className="text-lg font-semibold text-left text-text-main hover:text-primary transition-colors py-2 border-b border-glass"
              >
                Dashboard
              </button>
            )}

            <div className="flex flex-col gap-4 mt-6">
              {user ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setView("dashboard");
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-base font-semibold text-white shadow-lg"
                >
                  Go to Console <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setView("login");
                    }}
                    className="w-full py-3 rounded-xl border border-glass text-base font-semibold text-text-main hover:bg-surface-glass"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setView("register");
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-base font-semibold text-white shadow-lg"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
