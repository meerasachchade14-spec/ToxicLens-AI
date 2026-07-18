import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { GlassCard } from "../components/ui/GlassCard";
import { Shield, Mail, Lock, User, ArrowLeft, ArrowRight, ShieldAlert, KeyRound } from "lucide-react";

export const AuthPages: React.FC = () => {
  const { currentView, setView, loginUser, registerUser, verifyOtpCode, resetUserPassword, showToast } = useApp();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentView === "login") {
      if (!email || !password) {
        showToast("Please fill in all fields", "error");
        return;
      }
      loginUser(email);
    } else if (currentView === "register") {
      if (!name || !email || !password) {
        showToast("Please fill in all fields", "error");
        return;
      }
      if (!agreeTerms) {
        showToast("You must agree to the Terms of Service", "error");
        return;
      }
      // Simulate registering then going to OTP verification
      showToast("Verification email sent! Check your inbox.", "info");
      setView("otp");
    } else if (currentView === "forgot-password") {
      if (!email) {
        showToast("Please enter your email address", "error");
        return;
      }
      showToast("OTP code sent to email.", "info");
      setView("otp");
    } else if (currentView === "otp") {
      if (otp.length !== 6) {
        showToast("Enter a 6-digit OTP code", "error");
        return;
      }
      const success = verifyOtpCode(otp);
      if (success) {
        // If coming from registration: verify email. If coming from forgot-password: reset.
        if (name) {
          setView("email-verify");
        } else {
          setView("reset-password");
        }
      }
    } else if (currentView === "email-verify") {
      registerUser(name, email);
    } else if (currentView === "reset-password") {
      if (!password || password.length < 6) {
        showToast("Password must be at least 6 characters", "error");
        return;
      }
      resetUserPassword(password);
    }
  };

  const handleDemoFill = () => {
    setEmail("meera.nair@toxiclens.ai");
    setPassword("password123");
    setName("Meera Nair");
    setOtp("123456");
  };

  return (
    <div className="min-h-screen bg-bg-base relative flex items-center justify-center p-6 overflow-hidden dot-grid">
      {/* Animated Glowing blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 glow-blob-1 animate-pulse-slow -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 glow-blob-2 animate-pulse-slow -z-10" />

      {/* Back to Home Button */}
      <button
        onClick={() => setView("landing")}
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-semibold text-text-sub hover:text-primary transition-colors border border-glass bg-surface-glass py-2 px-3.5 rounded-xl cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>

      <div className="w-full max-w-md">
        <GlassCard glow glowColor="primary" className="p-8">
          <div className="flex flex-col items-center gap-2 text-center mb-8">
            <div
              onClick={() => setView("landing")}
              className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 cursor-pointer"
            >
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            
            {currentView === "login" && (
              <>
                <h2 className="text-2xl font-bold text-text-main">Welcome Back</h2>
                <p className="text-xs text-text-sub">Enter credentials to log in to ToxicLens console</p>
              </>
            )}
            {currentView === "register" && (
              <>
                <h2 className="text-2xl font-bold text-text-main">Create Account</h2>
                <p className="text-xs text-text-sub">Deploy your threat moderation dashboard instantly</p>
              </>
            )}
            {currentView === "forgot-password" && (
              <>
                <h2 className="text-2xl font-bold text-text-main">Forgot Password?</h2>
                <p className="text-xs text-text-sub">We will send a 6-digit OTP code to verify identity</p>
              </>
            )}
            {currentView === "otp" && (
              <>
                <h2 className="text-2xl font-bold text-text-main">OTP Verification</h2>
                <p className="text-xs text-text-sub">A security code has been dispatched to your email</p>
              </>
            )}
            {currentView === "email-verify" && (
              <>
                <h2 className="text-2xl font-bold text-text-main">Email Verified</h2>
                <p className="text-xs text-text-sub">Secure credentials established. Proceed to dashboard.</p>
              </>
            )}
            {currentView === "reset-password" && (
              <>
                <h2 className="text-2xl font-bold text-text-main">Reset Password</h2>
                <p className="text-xs text-text-sub">Create a new secure passphrase for account recovery</p>
              </>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {currentView === "register" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-text-sub">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sub/70" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full glass-input py-3 pl-11 pr-4 rounded-xl text-sm"
                  />
                </div>
              </div>
            )}

            {(currentView === "login" || currentView === "register" || currentView === "forgot-password") && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-text-sub">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sub/70" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full glass-input py-3 pl-11 pr-4 rounded-xl text-sm"
                  />
                </div>
              </div>
            )}

            {(currentView === "login" || currentView === "register") && (
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-text-sub">Password</label>
                  {currentView === "login" && (
                    <button
                      type="button"
                      onClick={() => setView("forgot-password")}
                      className="text-[11px] font-semibold text-primary hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sub/70" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full glass-input py-3 pl-11 pr-4 rounded-xl text-sm"
                  />
                </div>
              </div>
            )}

            {currentView === "otp" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-text-sub">Verification Code</label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sub/70" />
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="123456"
                    className="w-full glass-input py-3 pl-11 pr-4 rounded-xl text-sm tracking-[0.5em] text-center font-mono font-bold"
                  />
                </div>
                <span className="text-[10px] text-text-sub text-right">
                  Didn't receive code? <button type="button" onClick={() => showToast("Resent OTP code.", "info")} className="text-primary hover:underline">Resend OTP</button>
                </span>
              </div>
            )}

            {currentView === "reset-password" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-text-sub">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sub/70" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full glass-input py-3 pl-11 pr-4 rounded-xl text-sm"
                  />
                </div>
              </div>
            )}

            {currentView === "register" && (
              <label className="flex items-start gap-2.5 text-xs text-text-sub cursor-pointer mt-1">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-glass accent-primary"
                />
                <span>
                  I agree to the <a href="#terms" className="text-primary hover:underline">Terms of Service</a> and{" "}
                  <a href="#privacy" className="text-primary hover:underline">Privacy Policy</a>
                </span>
              </label>
            )}

            {currentView === "email-verify" && (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-16 h-16 rounded-full bg-success/15 border border-success/35 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-success" />
                </div>
                <p className="text-xs text-text-sub max-w-[280px]">
                  Your email has been securely verified by the ToxicLens network keys.
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-sm font-semibold text-white hover:opacity-90 shadow-md shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {currentView === "login" && <>Log In <ArrowRight className="w-4 h-4" /></>}
              {currentView === "register" && <>Register Account <ArrowRight className="w-4 h-4" /></>}
              {currentView === "forgot-password" && <>Send OTP Code <ArrowRight className="w-4 h-4" /></>}
              {currentView === "otp" && <>Verify Code <ArrowRight className="w-4 h-4" /></>}
              {currentView === "email-verify" && <>Enter Dashboard <ArrowRight className="w-4 h-4" /></>}
              {currentView === "reset-password" && <>Save Password <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          {/* Bottom redirection links */}
          <div className="mt-6 pt-6 border-t border-glass text-center text-xs flex justify-between items-center text-text-sub">
            {currentView === "login" && (
              <>
                <span>New to ToxicLens?</span>
                <button onClick={() => setView("register")} className="font-bold text-primary hover:underline">Create Account</button>
              </>
            )}
            {currentView === "register" && (
              <>
                <span>Already have account?</span>
                <button onClick={() => setView("login")} className="font-bold text-primary hover:underline">Log In</button>
              </>
            )}
            {(currentView === "forgot-password" || currentView === "otp" || currentView === "reset-password") && (
              <button
                type="button"
                onClick={() => setView("login")}
                className="flex items-center gap-1 font-bold text-primary hover:underline mx-auto"
              >
                Return to Login
              </button>
            )}
          </div>

          {/* Demo Autocomplete Helper (Placement-ready design feature) */}
          {(currentView === "login" || currentView === "register" || currentView === "otp") && (
            <button
              onClick={handleDemoFill}
              className="mt-6 w-full text-center text-[10px] uppercase font-bold tracking-widest text-accent hover:text-accent/80 transition-colors"
            >
              ⚡ Fill Demo Data
            </button>
          )}
        </GlassCard>
      </div>
    </div>
  );
};
