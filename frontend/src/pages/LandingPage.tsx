
import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Navbar } from "../components/Navbar";
import { GlassCard } from "../components/ui/GlassCard";
import {
  Shield,
  Zap,
  Brain,
  BarChart3,
  Activity,
  FileText,
  Lock,
  Languages,
  Sparkles,
  Smile,
  Clock,
  ChevronDown,
  Scan,
  HelpCircle,
  UserCircle,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Code,
} from "lucide-react";

export const LandingPage: React.FC = () => {
  const { setView } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const features = [
    {
      title: "Cyberbullying Detection",
      desc: "Identify potentially harmful online comments, bullying and abusive language.",
      icon: <Shield className="w-6 h-6 text-primary" />,
    },
    {
      title: "Hate Speech Detection",
      desc: "Analyze text for hateful, offensive and harmful expressions.",
      icon: <Zap className="w-6 h-6 text-secondary" />,
    },
    {
      title: "Emotion Analysis",
      desc: "Explore emotional signals such as anger, sadness, fear and neutral sentiment.",
      icon: <Smile className="w-6 h-6 text-accent" />,
    },
    {
      title: "Toxicity Analysis",
      desc: "Understand toxicity levels and confidence indicators in analyzed content.",
      icon: <Activity className="w-6 h-6 text-danger" />,
    },
    {
      title: "AI Safer Rewrite",
      desc: "Explore more respectful alternatives to harmful or offensive wording.",
      icon: <Sparkles className="w-6 h-6 text-success" />,
    },
    {
      title: "Screenshot Text Extraction",
      desc: "Extract text from uploaded screenshots for content analysis.",
      icon: <Scan className="w-6 h-6 text-primary" />,
    },
    {
      title: "Multilingual Analysis",
      desc: "Designed with English, Hindi and Hinglish text analysis in mind.",
      icon: <Languages className="w-6 h-6 text-secondary" />,
    },
    {
      title: "Detection History",
      desc: "Keep a record of previous analyses for later review.",
      icon: <Clock className="w-6 h-6 text-accent" />,
    },
    {
      title: "PDF Reports",
      desc: "Present analysis information in a structured, downloadable report.",
      icon: <FileText className="w-6 h-6 text-success" />,
    },
    {
      title: "Secure User Access",
      desc: "A user-focused account experience with privacy and access control in mind.",
      icon: <Lock className="w-6 h-6 text-primary" />,
    },
    {
      title: "AI-Based Insights",
      desc: "Understand content through language analysis and meaningful indicators.",
      icon: <Brain className="w-6 h-6 text-accent" />,
    },
    {
      title: "Admin Management",
      desc: "An administrative interface for managing platform activity and users.",
      icon: <Shield className="w-6 h-6 text-success" />,
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Login or Register",
      desc: "Create an account or log in to access the ToxicLens AI platform.",
      icon: <UserCircle className="w-9 h-9 text-primary" />,
    },
    {
      number: "02",
      title: "Provide Your Input",
      desc: "Enter a text comment or upload a screenshot containing a conversation.",
      icon: <MessageCircle className="w-9 h-9 text-primary" />,
    },
    {
      number: "03",
      title: "AI Analyzes Content",
      desc: "The analysis workflow examines language patterns and potentially harmful content.",
      icon: <Brain className="w-9 h-9 text-primary" />,
    },
    {
      number: "04",
      title: "Explore Results",
      desc: "Review detection insights, toxicity indicators and suggested safer wording.",
      icon: <BarChart3 className="w-9 h-9 text-primary" />,
    },
    {
      number: "05",
      title: "Save and Review",
      desc: "Keep analysis records and access reports for future reference.",
      icon: <FileText className="w-9 h-9 text-primary" />,
    },
  ];

  const benefits = [
    {
      title: "Safer Digital Spaces",
      desc: "Encourages awareness of cyberbullying and harmful online communication.",
      icon: <Shield className="w-6 h-6 text-primary" />,
    },
    {
      title: "AI-Powered Analysis",
      desc: "Uses language analysis concepts to identify potentially toxic expressions.",
      icon: <Brain className="w-6 h-6 text-secondary" />,
    },
    {
      title: "Clear Insights",
      desc: "Presents analysis information in a simple and understandable format.",
      icon: <BarChart3 className="w-6 h-6 text-accent" />,
    },
    {
      title: "Multiple Input Types",
      desc: "Designed to work with both directly entered text and screenshot content.",
      icon: <Scan className="w-6 h-6 text-success" />,
    },
    {
      title: "Language Awareness",
      desc: "Considers English, Hindi and Hinglish communication patterns.",
      icon: <Languages className="w-6 h-6 text-primary" />,
    },
    {
      title: "User-Friendly Experience",
      desc: "Combines a clean interface with organized analysis and navigation.",
      icon: <Sparkles className="w-6 h-6 text-secondary" />,
    },
  ];

  const faqs = [
    {
      q: "What is ToxicLens AI?",
      a: "ToxicLens AI is an AI-based cyberbullying detection project designed to analyze online text and identify potentially harmful communication, including bullying, hate speech and offensive language.",
    },
    {
      q: "What types of content can be analyzed?",
      a: "The platform is designed for text comments and screenshots containing conversations. Screenshot content can be processed through text extraction before analysis.",
    },
    {
      q: "Does ToxicLens AI support Hindi and Hinglish?",
      a: "Multilingual analysis is part of the project scope, with a focus on English, Hindi and Hinglish text. Actual detection quality depends on the implemented models and their evaluation.",
    },
    {
      q: "Are AI detection results always accurate?",
      a: "No AI prediction should be treated as a perfect judgment. Language can depend on context, sarcasm and intent, so results should be reviewed carefully by a human.",
    },
    {
      q: "Can I review previous analysis results?",
      a: "The platform is designed to include a history area where users can review previous analysis records and access related reports.",
    },
    {
      q: "Who developed ToxicLens AI?",
      a: "ToxicLens AI is developed by Meera Sachchade as a Computer Engineering project.",
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-bg-base dot-grid pt-24 pb-12">

      {/* Background Glow Effects */}
      <div className="absolute top-20 left-10 w-96 h-96 glow-blob-1 animate-pulse-slow -z-10" />
      <div className="absolute top-96 right-10 w-96 h-96 glow-blob-2 animate-pulse-slow -z-10" />
      <div className="absolute bottom-20 left-1/3 w-[500px] h-[500px] glow-blob-3 animate-pulse-slow -z-10" />

      <Navbar onScrollToSection={scrollToSection} />

      {/* Hero Section */}
      <section
        id="hero"
        className="max-w-7xl mx-auto px-6 pt-12 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >
        <div className="lg:col-span-7 flex flex-col items-start text-left gap-6">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-sm font-semibold text-primary">
            <Sparkles className="w-4 h-4" />
            AI-Powered Cyber Safety
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-text-main">
            AI-Powered{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Cyberbullying
            </span>{" "}
            Detection Platform
          </h1>

          <p className="text-lg text-text-sub max-w-xl leading-relaxed">
            Detect potentially harmful online content with ToxicLens AI.
            Explore cyberbullying, hate speech, harassment and offensive
            language analysis to encourage safer digital communication.
          </p>

          {/* Authentication Buttons */}
          <div className="flex flex-wrap gap-4 mt-2">

            <button
              onClick={() => setView("login")}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary font-semibold text-white hover:opacity-95 shadow-lg shadow-primary/25 hover:scale-[1.02] transition-all cursor-pointer"
            >
              Login
            </button>

            <button
              onClick={() => setView("register")}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-primary/40 bg-surface-glass font-semibold text-text-main hover:border-primary hover:bg-primary/10 transition-all cursor-pointer"
            >
              Get Started
            </button>

            <button
              onClick={() => scrollToSection("features")}
              className="px-6 py-3.5 rounded-xl border border-glass bg-surface-glass font-semibold text-text-main hover:border-primary/30 transition-colors cursor-pointer"
            >
              Explore Features
            </button>

          </div>
        </div>

        {/* Hero Illustration */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[420px] aspect-square rounded-3xl border border-glass bg-surface-glass p-8 flex items-center justify-center shadow-2xl animate-float">

            <div className="absolute -inset-px -z-10 rounded-3xl bg-gradient-to-tr from-primary/10 to-accent/10 opacity-70 blur-xl" />

            <svg viewBox="0 0 200 200" className="w-full h-full text-primary">
              <circle
                cx="100"
                cy="100"
                r="45"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />

              <circle
                cx="100"
                cy="100"
                r="60"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1"
                strokeDasharray="6 4"
                opacity="0.5"
              />

              <circle
                cx="100"
                cy="100"
                r="75"
                fill="none"
                stroke="var(--secondary)"
                strokeWidth="0.8"
                opacity="0.3"
              />

              <path
                d="M100 65 L125 75 V105 C125 125 100 138 100 138 C100 138 75 125 75 105 V75 Z"
                fill="url(#shieldGrad)"
                stroke="var(--primary)"
                strokeWidth="2"
                style={{ filter: "drop-shadow(0 0 8px var(--primary))" }}
              />

              <path
                d="M100 78 V123 M88 95 H112"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              <g
                className="animate-[spin_40s_linear_infinite]"
                style={{ transformOrigin: "100px 100px" }}
              >
                <circle cx="50" cy="50" r="4" fill="var(--accent)" />
                <line
                  x1="50"
                  y1="50"
                  x2="100"
                  y2="100"
                  stroke="var(--accent)"
                  strokeWidth="0.5"
                  opacity="0.6"
                />

                <circle cx="150" cy="60" r="5" fill="var(--secondary)" />
                <line
                  x1="150"
                  y1="60"
                  x2="100"
                  y2="100"
                  stroke="var(--secondary)"
                  strokeWidth="0.5"
                  opacity="0.6"
                />

                <circle cx="40" cy="130" r="3.5" fill="var(--danger)" />
                <line
                  x1="40"
                  y1="130"
                  x2="100"
                  y2="100"
                  stroke="var(--danger)"
                  strokeWidth="0.5"
                  opacity="0.6"
                />

                <circle cx="160" cy="140" r="4.5" fill="var(--success)" />
                <line
                  x1="160"
                  y1="140"
                  x2="100"
                  y2="100"
                  stroke="var(--success)"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
              </g>

              <defs>
                <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--secondary)" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute top-6 left-6 glass-panel py-2 px-3 rounded-full flex items-center gap-2 text-xs font-bold text-success border border-success/20">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              DIGITAL SAFETY
            </div>

            <div className="absolute bottom-8 right-6 glass-panel py-2.5 px-4 rounded-2xl flex flex-col text-xs font-bold border border-primary/20">
              <span className="text-text-sub font-medium">
                AI-Powered
              </span>
              <span className="text-accent text-sm">
                Content Analysis
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Focus Section - No Fake Statistics */}
      <section className="max-w-7xl mx-auto px-6 py-8 border-y border-glass bg-slate-900/40 light:bg-slate-50/40 backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { title: "Cyber Safety", desc: "Promoting safer interactions" },
            { title: "AI Analysis", desc: "Understanding harmful content" },
            { title: "Text & Images", desc: "Multiple input formats" },
            { title: "Multilingual", desc: "English, Hindi & Hinglish" },
          ].map((item) => (
            <div key={item.title} className="flex flex-col gap-2">
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {item.title}
              </span>
              <span className="text-sm font-medium text-text-sub">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-6 py-24 text-center"
      >
        <div className="flex flex-col items-center gap-4 mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-primary">
            Platform Capabilities
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-text-main">
            Explore ToxicLens AI Features
          </h2>

          <p className="text-base md:text-lg text-text-sub max-w-2xl leading-relaxed">
            Discover the key capabilities designed to support cyberbullying
            detection, content analysis and safer digital communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <GlassCard
              key={feature.title}
              glow={index === 0 || index === 4}
              glowColor={index === 4 ? "success" : "primary"}
              className="flex flex-col items-start text-left gap-4 p-6"
            >
              <div className="p-3.5 rounded-xl border border-glass bg-slate-900/60 light:bg-white/60">
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold text-text-main">
                {feature.title}
              </h3>

              <p className="text-sm text-text-sub leading-relaxed">
                {feature.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="max-w-7xl mx-auto px-6 py-24 text-center"
      >
        <div className="flex flex-col items-center gap-5 mb-20">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-secondary">
            How It Works
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold text-text-main">
            Detect Cyberbullying in{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              5 Simple Steps
            </span>
          </h2>

          <p className="text-base md:text-lg text-text-sub max-w-2xl leading-8">
            ToxicLens AI is designed to make content analysis simple.
            Provide text or a screenshot and explore the analysis results.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-16 left-20 right-20 h-[2px] bg-gradient-to-r from-primary/20 via-accent to-primary/20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step) => (
              <GlassCard
                key={step.number}
                className="relative p-8 rounded-3xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="absolute -top-5 w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center shadow-lg">
                  {step.number}
                </div>

                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  {step.icon}
                </div>

                <h3 className="text-lg font-bold mb-3 text-text-main">
                  {step.title}
                </h3>

                <p className="text-sm text-text-sub leading-7">
                  {step.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose ToxicLens AI */}
      <section
        id="why-choose"
        className="max-w-7xl mx-auto px-6 py-24 text-center"
      >
        <div className="flex flex-col items-center gap-4 mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-accent">
            Why ToxicLens AI
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-text-main">
            Building a Safer Digital Experience
          </h2>

          <p className="text-base md:text-lg text-text-sub max-w-2xl leading-relaxed">
            A thoughtful approach to identifying harmful communication and
            encouraging more respectful online interactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <GlassCard
              key={benefit.title}
              className="flex flex-col items-start text-left gap-4 p-7 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="p-3.5 rounded-xl border border-glass bg-slate-900/60 light:bg-white/60">
                {benefit.icon}
              </div>

              <h3 className="text-lg font-bold text-text-main">
                {benefit.title}
              </h3>

              <p className="text-sm md:text-base text-text-sub leading-relaxed">
                {benefit.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="max-w-4xl mx-auto px-6 py-20"
      >
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <HelpCircle className="w-9 h-9 text-primary" />

          <span className="text-sm font-bold uppercase tracking-widest text-primary">
            Got Questions?
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-text-main">
            Frequently Asked Questions
          </h2>

          <p className="text-base text-text-sub max-w-xl">
            Find answers to common questions about ToxicLens AI and its
            cyberbullying detection approach.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;

            return (
              <div
                key={index}
                className="rounded-2xl border border-glass bg-surface-glass overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-text-main hover:bg-slate-900/20 light:hover:bg-slate-50/20 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm md:text-base">
                    {faq.q}
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-text-sub transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out border-glass ${
                    isOpen
                      ? "max-h-60 border-t p-5"
                      : "max-h-0 border-t-0 p-0 overflow-hidden"
                  }`}
                >
                  <p className="text-sm md:text-base text-text-sub leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="max-w-7xl mx-auto px-6 py-24"
      >
        <div className="text-center mb-14">
          <span className="text-sm font-bold uppercase tracking-widest text-primary">
            Contact
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-text-main mt-4">
            Get in Touch
          </h2>

          <p className="text-base md:text-lg text-text-sub max-w-2xl mx-auto mt-4 leading-relaxed">
            Have a question, suggestion or want to connect?
            Feel free to reach out.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-7 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-text-main">
                    Email Address
                  </h3>

                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=meera.ldrp.7@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm md:text-base font-medium text-primary hover:text-secondary transition-colors break-all"
                  >
                    meera.ldrp.7@gmail.com
                  </a>

                  <p className="text-sm text-text-sub">
                    Click to send an email
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-text-main">
                    Contact Number
                  </h3>

                  <span className="text-sm md:text-base font-medium text-text-main">
                    7984059194
                  </span>

                  <p className="text-sm text-text-sub">
                    Contact information
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-text-main">
                    Location
                  </h3>

                  <span className="text-sm md:text-base font-medium text-text-main">
                    Gandhinagar, Gujarat, India
                  </span>

                  <p className="text-sm text-text-sub">
                    India
                  </p>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-lg font-extrabold text-primary">in</span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-text-main">
                    LinkedIn
                  </h3>

                  <a
                    href="https://www.linkedin.com/in/meera-sachchade/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm md:text-base font-medium text-primary hover:text-secondary transition-colors break-all"
                  >
                    linkedin.com/in/meera-sachchade
                  </a>

                  <p className="text-sm text-text-sub">
                    Connect with me professionally
                  </p>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Code className="w-5 h-5 text-primary" />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-text-main">
                    GitHub
                  </h3>

                  <a
                    href="https://github.com/meerasachchade14-spec"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm md:text-base font-medium text-primary hover:text-secondary transition-colors break-all"
                  >
                    github.com/meerasachchade14-spec
                  </a>

                  <p className="text-sm text-text-sub">
                    Explore my projects
                  </p>
                </div>
              </div>
            </div>

            {/* Developer Credit */}
            <div className="mt-10 pt-8 border-t border-glass text-center">
              <p className="text-sm font-medium text-text-sub">
                Designed & Developed by
              </p>

              <h3 className="mt-2 text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Meera Sachchade
              </h3>

              <p className="text-sm text-text-sub mt-2">
                Computer Engineering Student
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="max-w-7xl mx-auto px-6 pt-10 mt-10 border-t border-glass">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8">

          {/* Footer Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>

            <span className="text-xl font-bold text-text-main">
              ToxicLens{" "}
              <span className="text-primary">AI</span>
            </span>
          </button>

          {/* Footer Description */}
          <p className="text-sm text-text-sub text-center max-w-md leading-relaxed">
            Promoting awareness and encouraging safer, more respectful
            digital communication through AI-based content analysis.
          </p>

          {/* Footer Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=meera.ldrp.7@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email Meera"
              className="w-10 h-10 rounded-xl border border-glass bg-surface-glass flex items-center justify-center text-text-sub hover:text-primary hover:border-primary/40 transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/meera-sachchade/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-10 h-10 rounded-xl border border-glass bg-surface-glass flex items-center justify-center text-text-sub hover:text-primary hover:border-primary/40 transition-all"
            >
              <span className="text-sm font-extrabold">in</span>
            </a>

            <a
              href="https://github.com/meerasachchade14-spec"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-10 h-10 rounded-xl border border-glass bg-surface-glass flex items-center justify-center text-text-sub hover:text-primary hover:border-primary/40 transition-all"
            >
              <Code className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-glass py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-text-sub">
          <span>
            © {new Date().getFullYear()} ToxicLens AI. All rights reserved.
          </span>

          <span>
            Designed & Developed by{" "}
            <span className="font-semibold text-text-main">
              Meera Sachchade
            </span>
          </span>
        </div>
      </footer>
    </div>
  );
};
