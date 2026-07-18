import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Navbar } from "../components/Navbar";
import { GlassCard } from "../components/ui/GlassCard";
import {
  Shield, Zap, Brain, Activity, FileText, Lock, Languages, Sparkles,
  Smile, Clock, ChevronDown, Star, ArrowRight, Scan, HelpCircle,
  Code, MessageCircle
} from "lucide-react";

export const LandingPage: React.FC = () => {
  const { setView, user } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const stats = [
    { title: "95%+", desc: "Detection Accuracy" },
    { title: "100K+", desc: "Comments Scanned" },
    { title: "Real-Time", desc: "AI Detection Engine" },
    { title: "Multi-lang", desc: "Hindi, Hinglish, English" },
    { title: "Trusted", desc: "By Leading Platforms" },
  ];

  const features = [
    {
      title: "Real-Time Cyberbullying Detection",
      desc: "Instantly scans and categorizes content using active webhooks.",
      icon: <Zap className="w-6 h-6 text-primary" />,
    },
    {
      title: "Multi-label Classification",
      desc: "Categorizes abuse into Harassment, Hate Speech, Threats, or Insults.",
      icon: <Brain className="w-6 h-6 text-secondary" />,
    },
    {
      title: "Emotion Identification",
      desc: "Uncovers the underlying emotion like Anger, Fear, or Sadness.",
      icon: <Smile className="w-6 h-6 text-accent" />,
    },
    {
      title: "Toxicity Score Prediction",
      desc: "Calculates precise toxicity and confidence metrics using AI.",
      icon: <Activity className="w-6 h-6 text-danger" />,
    },
    {
      title: "AI Safe Rewrite Suggestion",
      desc: "Leverages GPT/LLM layers to generate polite alternatives.",
      icon: <Sparkles className="w-6 h-6 text-success" />,
    },
    {
      title: "OCR Image Scan",
      desc: "Extracts and checks text from screenshots (EasyOCR models).",
      icon: <Scan className="w-6 h-6 text-primary" />,
    },
    {
      title: "Multilingual Capability",
      desc: "Fully understands complex English, pure Hindi, and Hinglish texts.",
      icon: <Languages className="w-6 h-6 text-secondary" />,
    },
    {
      title: "Explainable AI Logs",
      desc: "Transparently explains the decision-making logic behind each classification.",
      icon: <Shield className="w-6 h-6 text-accent" />,
    },
    {
      title: "Detection History Ledger",
      desc: "Saves scans locally for auditing, review, or administrative actions.",
      icon: <Clock className="w-6 h-6 text-success" />,
    },
    {
      title: "PDF Audit Reports",
      desc: "Generate professional summary summaries for security advisors.",
      icon: <FileText className="w-6 h-6 text-danger" />,
    },
    {
      title: "Admin Control Dash",
      desc: "Exposes system loads, audit tracks, and flag dismissal toggles.",
      icon: <Lock className="w-6 h-6 text-primary" />,
    },
    {
      title: "API Sandboxing",
      desc: "Easily integrate with Discord, X, Slack, or web apps with API keys.",
      icon: <Code className="w-6 h-6 text-accent" />,
    },
  ];

  const steps = [
    { num: "01", title: "Login", desc: "Access the console or authenticate via client API credentials." },
    { num: "02", title: "Provide Input", desc: "Enter social comments directly or drop in screenshots to perform OCR." },
    { num: "03", title: "AI Pipeline Engine", desc: "Multi-layered BERT and OCR models classify and interpret language nuances." },
    { num: "04", title: "View Insights", desc: "See toxicity meters, confidence scales, and AI Safe Rewrites." },
    { num: "05", title: "Store History", desc: "Instantly logs data into secure records for report downloads." },
  ];

  const techStack = [
    { name: "React", desc: "Frontend UI" },
    { name: "TypeScript", desc: "Type Safety" },
    { name: "Tailwind CSS", desc: "Modern Styling" },
    { name: "Django", desc: "API Gateway" },
    { name: "MongoDB", desc: "Document Database" },
    { name: "PyTorch", desc: "Deep Learning" },
    { name: "Hugging Face", desc: "Transformer Models" },
    { name: "EasyOCR", desc: "Image Scanning" },
    { name: "JWT", desc: "Secure Auth" },
  ];

  const testimonials = [
    {
      name: "Siddharth Mehta",
      role: "VP of Safety, ChatSphere",
      text: "Integrating ToxicLens AI reduced toxicity rates across our community spaces by 42% in just two weeks. The Hinglish support is unmatched.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=128",
    },
    {
      name: "Emily Watson",
      role: "Lead Moderator, GuildCord",
      text: "The OCR screenshot detection is a game-changer. Cyberbullies try to bypass text-filters by sharing memes, but ToxicLens catches them instantly.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=128",
    },
    {
      name: "Aman Verma",
      role: "Director, EduSafe Initiatives",
      text: "The explainable AI helps our academic advisors understand the context behind student alerts, rather than blindly flags. Absolutely essential.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=128",
    },
  ];

  const faqs = [
    {
      q: "How does the platform handle bilingual Hindi/Hinglish detection?",
      a: "Our AI engine is trained on customized code-mixed datasets. It parses phonetic English spelling of Hindi words (Hinglish like 'bewakoof', 'chutiya') alongside pure Devanagari script, preserving cultural context and detecting sarcasm that generic models miss.",
    },
    {
      q: "Can we integrate this directly into Discord or Slack?",
      a: "Yes! The Admin dashboard allows you to provision developer API Keys. You can call our standard JSON endpoints from custom bots, webhooks, or existing moderation setups.",
    },
    {
      q: "What AI models are running under the hood?",
      a: "We utilize fine-tuned RoBERTa transformers hosted via HuggingFace for toxicity/emotion classification. OCR detection uses EasyOCR pipelines, and our Safe Rewrite utilizes quantized LLMs.",
    },
    {
      q: "Is client scan data stored permanently?",
      a: "By default, scan logs are stored in your secure history database. Admins can configure custom data retention policies, disable database persistence entirely, or export CSV tables at any time.",
    },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-bg-base dot-grid pt-24 pb-12">
      {/* Glow Blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 glow-blob-1 animate-pulse-slow -z-10" />
      <div className="absolute top-96 right-10 w-96 h-96 glow-blob-2 animate-pulse-slow -z-10" />
      <div className="absolute bottom-20 left-1/3 w-[500px] h-[500px] glow-blob-3 animate-pulse-slow -z-10" />

      <Navbar onScrollToSection={scrollToSection} />

      {/* Hero Section */}
      <section id="hero" className="max-w-7xl mx-auto px-6 pt-12 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col items-start text-left gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen AI NLP Models
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-text-main">
            AI-Powered <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Cyberbullying</span> Detection Platform
          </h1>
          <p className="text-lg text-text-sub max-w-xl">
            Detect and rewrite toxic online remarks in real-time. ToxicLens AI safeguards community spaces, educational forums, and social networks from harassment, threats, and hate speech using explainable NLP transformers.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <button
              onClick={() => setView(user ? "dashboard" : "login")}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary font-semibold text-white hover:opacity-95 shadow-lg shadow-primary/25 hover:scale-[1.02] transition-all cursor-pointer"
            >
              Try Detection Now <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="px-6 py-3.5 rounded-xl border border-glass bg-surface-glass font-semibold text-text-main hover:border-primary/30 transition-colors cursor-pointer"
            >
              Explore Features
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          {/* Animated Hero SVG Graphic */}
          <div className="relative w-full max-w-[420px] aspect-square rounded-3xl border border-glass bg-surface-glass p-8 flex items-center justify-center shadow-2xl animate-float">
            <div className="absolute -inset-px -z-10 rounded-3xl bg-gradient-to-tr from-primary/10 to-accent/10 opacity-70 blur-xl" />
            
            <svg viewBox="0 0 200 200" className="w-full h-full text-primary">
              {/* Central Shield */}
              <circle cx="100" cy="100" r="45" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="6 4" opacity="0.5" />
              <circle cx="100" cy="100" r="75" fill="none" stroke="var(--secondary)" strokeWidth="0.8" opacity="0.3" />

              {/* Glowing Shield Icon Shape */}
              <path
                d="M100 65 L125 75 V105 C125 125 100 138 100 138 C100 138 75 125 75 105 V75 Z"
                fill="url(#shieldGrad)"
                stroke="var(--primary)"
                strokeWidth="2"
                style={{ filter: "drop-shadow(0 0 8px var(--primary))" }}
              />
              <path d="M100 78 V123 M88 95 H112" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" />

              {/* Data Node network */}
              <g className="animate-[spin_40s_linear_infinite]" style={{ transformOrigin: "100px 100px" }}>
                <circle cx="50" cy="50" r="4" fill="var(--accent)" />
                <line x1="50" y1="50" x2="100" y2="100" stroke="var(--accent)" strokeWidth="0.5" opacity="0.6" />

                <circle cx="150" cy="60" r="5" fill="var(--secondary)" />
                <line x1="150" y1="60" x2="100" y2="100" stroke="var(--secondary)" strokeWidth="0.5" opacity="0.6" />

                <circle cx="40" cy="130" r="3.5" fill="var(--danger)" />
                <line x1="40" y1="130" x2="100" y2="100" stroke="var(--danger)" strokeWidth="0.5" opacity="0.6" />

                <circle cx="160" cy="140" r="4.5" fill="var(--success)" />
                <line x1="160" y1="140" x2="100" y2="100" stroke="var(--success)" strokeWidth="0.5" opacity="0.6" />
              </g>

              {/* Gradients */}
              <defs>
                <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--secondary)" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Embedded Floating Badges */}
            <div className="absolute top-6 left-6 glass-panel py-1.5 px-3 rounded-full flex items-center gap-1.5 text-[10px] font-bold text-success border-success/20">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" /> SCAN STABLE
            </div>
            <div className="absolute bottom-8 right-6 glass-panel py-2 px-3.5 rounded-2xl flex flex-col text-[10px] font-bold border-primary/20 text-left">
              <span className="text-sub font-medium">Model Latency</span>
              <span className="text-accent font-mono text-xs">12.4ms</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="max-w-7xl mx-auto px-6 py-8 border-y border-glass bg-slate-900/40 light:bg-slate-50/40 backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-mono">
                {s.title}
              </span>
              <span className="text-xs md:text-sm font-semibold text-text-sub">
                {s.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="flex flex-col items-center gap-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Capabilities</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-main">
            Enterprise-Grade Detection Suite
          </h2>
          <p className="text-text-sub max-w-xl">
            ToxicLens AI encapsulates multi-label, multi-lingual, and screenshot-based visual engines to protect digital interactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <GlassCard key={i} glow={i === 0 || i === 4} glowColor={i === 4 ? "success" : "primary"} className="flex flex-col items-start text-left gap-4">
              <div className="p-3.5 rounded-xl border border-glass bg-slate-900/60 light:bg-white/60">
                {f.icon}
              </div>
              <h3 className="text-base font-bold text-text-main">
                {f.title}
              </h3>
              <p className="text-xs text-text-sub leading-relaxed">
                {f.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="flex flex-col items-center gap-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary">Pipeline Workflow</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-main">
            How ToxicLens Moderates
          </h2>
          <p className="text-text-sub max-w-xl">
            A simple 5-step classification framework connecting social networks with deep learning models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-14 left-1/10 right-1/10 h-0.5 border-t border-dashed border-glass -z-10" />

          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 rounded-full border border-glass bg-surface-glass flex items-center justify-center text-lg font-extrabold text-primary font-mono shadow-md group-hover:scale-105 group-hover:border-primary/40 transition-all">
                {s.num}
              </div>
              <h3 className="text-base font-bold text-text-main">
                {s.title}
              </h3>
              <p className="text-xs text-text-sub leading-relaxed max-w-[200px]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack Section */}
      <section id="technology" className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="flex flex-col items-center gap-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Tech Stack</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-main">
            Built On Modern AI Technologies
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {techStack.map((tech, i) => (
            <div
              key={i}
              className="py-3.5 px-6 rounded-2xl border border-glass bg-surface-glass flex flex-col items-center gap-1 shadow-md hover:border-primary/20 hover:scale-[1.03] transition-all cursor-default"
            >
              <span className="text-sm font-bold text-text-main">{tech.name}</span>
              <span className="text-[10px] text-text-sub font-semibold">{tech.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="flex flex-col items-center gap-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-success">Endorsements</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-main">
            Moderators Love ToxicLens
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <GlassCard key={i} className="flex flex-col items-start text-left gap-6 p-8 relative">
              {/* Quote icon mock */}
              <div className="absolute top-6 right-6 opacity-10">
                <MessageCircle className="w-14 h-14 text-primary" />
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 text-warning fill-warning" />
                ))}
              </div>
              <p className="text-sm text-text-sub italic leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3.5 mt-2">
                <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full border border-glass object-cover" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-text-main">{t.name}</span>
                  <span className="text-xs text-text-sub">{t.role}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <HelpCircle className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-extrabold text-text-main">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = activeFaq === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-glass bg-surface-glass overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-text-main hover:bg-slate-900/20 light:hover:bg-slate-50/20 transition-colors"
                >
                  <span className="text-sm md:text-base pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 flex-shrink-0 text-sub transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div
                  className={`
                    transition-all duration-300 ease-in-out border-glass
                    ${isOpen ? "max-h-[200px] border-t p-5" : "max-h-0 border-t-0 p-0 overflow-hidden"}
                  `}
                >
                  <p className="text-xs md:text-sm text-text-sub leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 pt-16 mt-16 border-t border-glass text-left">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12">
          <div className="col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-text-main">ToxicLens AI</span>
            </div>
            <p className="text-xs text-text-sub max-w-xs leading-relaxed">
              Safeguarding online platforms, forums, and school networks from cyber abuse, visual harassment, and threats.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-text-main">Company</span>
            <button onClick={() => scrollToSection("hero")} className="text-xs text-text-sub hover:text-primary transition-colors text-left">Home</button>
            <button onClick={() => scrollToSection("features")} className="text-xs text-text-sub hover:text-primary transition-colors text-left">Features</button>
            <button onClick={() => scrollToSection("how-it-works")} className="text-xs text-text-sub hover:text-primary transition-colors text-left">How It Works</button>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-text-main">Resources</span>
            <a href="#github" className="text-xs text-text-sub hover:text-primary transition-colors">GitHub</a>
            <a href="#docs" className="text-xs text-text-sub hover:text-primary transition-colors">Documentation</a>
            <button onClick={() => setView("settings")} className="text-xs text-text-sub hover:text-primary transition-colors text-left">API Sandbox</button>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-text-main">Legal</span>
            <a href="#privacy" className="text-xs text-text-sub hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#terms" className="text-xs text-text-sub hover:text-primary transition-colors">Terms of Service</a>
            <a href="#contact" className="text-xs text-text-sub hover:text-primary transition-colors">Support Center</a>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-glass py-6 text-[10px] text-text-sub">
          <span>&copy; 2026 ToxicLens AI. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#x" className="hover:text-primary transition-colors">X</a>
            <a href="#github" className="hover:text-primary transition-colors">GitHub</a>
            <a href="#discord" className="hover:text-primary transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
