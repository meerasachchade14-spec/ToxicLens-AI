import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { GlassCard } from "../components/ui/GlassCard";
import { UserCircle, Shield, Award, Calendar, Phone, Mail, User, Sparkles, Check } from "lucide-react";

export const ProfilePage: React.FC = () => {
  const { user, updateUserProfile, scanStats } = useApp();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, email, phone });
  };

  const achievementBadges = [
    {
      name: "Safety Guardian",
      desc: "Flagged first cyberbullying threat vector.",
      unlocked: user.achievements.includes("Safety Guardian"),
      icon: <Shield className="w-5 h-5" />,
    },
    {
      name: "Real-Time Watchdog",
      desc: "Completed 100+ active text or image scans.",
      unlocked: user.achievements.includes("Real-Time Watchdog"),
      icon: <Award className="w-5 h-5 text-accent" />,
    },
    {
      name: "Text Scholar",
      desc: "Analyzed code-mixed Hinglish or Hindi script comments.",
      unlocked: user.achievements.includes("Text Scholar"),
      icon: <Sparkles className="w-5 h-5 text-secondary" />,
    },
    {
      name: "Accuracy Champion",
      desc: "Maintained greater than 98% scan resolution accuracy.",
      unlocked: user.achievements.includes("Accuracy Champion"),
      icon: <Check className="w-5 h-5 text-success" />,
    },
  ];

  return (
    <div className="flex-1 p-8 overflow-y-auto max-h-screen">
      {/* Header */}
      <div className="text-left mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-main flex items-center gap-2.5">
          <UserCircle className="w-6 h-6 text-primary" /> Profile Details
        </h1>
        <p className="text-xs text-text-sub mt-1">Review your moderator statistics, update user information, and inspect safety achievements.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Profile Info Card */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <GlassCard className="p-6 flex flex-col items-center gap-4 text-center">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full border-2 border-primary object-cover shadow-lg"
            />
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-bold text-text-main">{user.name}</h2>
              <span className="text-xs text-text-sub font-semibold inline-flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                {user.role} Moderator
              </span>
            </div>
            
            <div className="h-[1px] bg-glass w-full my-2" />

            <div className="w-full grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl border border-glass bg-slate-900/20 light:bg-slate-50/20 text-left">
                <span className="text-[10px] text-text-sub font-bold block uppercase tracking-wider">Quota Scans</span>
                <span className="text-lg font-extrabold text-text-main font-mono mt-1">{scanStats.totalScans}</span>
              </div>
              <div className="p-3.5 rounded-xl border border-glass bg-slate-900/20 light:bg-slate-50/20 text-left">
                <span className="text-[10px] text-text-sub font-bold block uppercase tracking-wider">Achievements</span>
                <span className="text-lg font-extrabold text-text-main font-mono mt-1">{user.achievements.length}</span>
              </div>
            </div>

            <div className="w-full flex flex-col gap-3 text-xs text-left mt-2">
              <div className="flex justify-between items-center text-text-sub">
                <span className="font-semibold flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email:</span>
                <span className="text-text-main font-bold truncate max-w-[180px]">{user.email}</span>
              </div>
              <div className="flex justify-between items-center text-text-sub">
                <span className="font-semibold flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Contact:</span>
                <span className="text-text-main font-bold">{user.phone}</span>
              </div>
              <div className="flex justify-between items-center text-text-sub">
                <span className="font-semibold flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Deploy Date:</span>
                <span className="text-text-main font-bold">{user.joinedDate}</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Side: Achievements and Form Editor */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Form Editor */}
          <GlassCard className="p-6 text-left">
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-5">Update User Details</h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-sub uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sub/70" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter name"
                      className="w-full glass-input py-2.5 pl-11 pr-4 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-sub uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sub/70" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                      className="w-full glass-input py-2.5 pl-11 pr-4 rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 max-w-xs">
                <label className="text-[10px] font-bold text-text-sub uppercase tracking-wider">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-sub/70" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter contact number"
                    className="w-full glass-input py-2.5 pl-11 pr-4 rounded-xl text-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-xs font-bold text-white hover:opacity-90 shadow-sm transition-all cursor-pointer self-start mt-2"
              >
                Save Profile Changes
              </button>
            </form>
          </GlassCard>

          {/* Gamified Achievements */}
          <GlassCard className="p-6 text-left">
            <h3 className="text-sm font-bold text-text-main uppercase tracking-wider mb-5">Security Achievements</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievementBadges.map((badge, i) => (
                <div
                  key={i}
                  className={`
                    p-4 rounded-xl border flex gap-3.5 items-start transition-all
                    ${badge.unlocked
                      ? "border-primary/20 bg-primary/5 text-text-main"
                      : "border-glass bg-slate-900/10 light:bg-slate-50/10 opacity-55 text-text-sub"
                    }
                  `}
                >
                  <div
                    className={`
                      p-2.5 rounded-lg border flex-shrink-0
                      ${badge.unlocked
                        ? "border-primary/20 bg-primary/10 text-primary"
                        : "border-glass bg-slate-900/40 text-text-sub/40"
                      }
                    `}
                  >
                    {badge.icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-text-main">{badge.name}</span>
                    <span className="text-[10px] text-text-sub leading-normal">{badge.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
