
import { useEffect, useState } from "react";
import {
  Shield,
  Cpu,
  BrainCircuit,
  ScanSearch,
  CheckCircle2,
} from "lucide-react";
import "./SplashScreen.css";

const logs = [
  {
    icon: <Cpu size={16} />,
    text: "Initializing Neural Engine...",
  },
  {
    icon: <BrainCircuit size={16} />,
    text: "Loading NLP Model...",
  },
  {
    icon: <ScanSearch size={16} />,
    text: "Preparing OCR Detection...",
  },
  {
    icon: <Shield size={16} />,
    text: "Starting Security Modules...",
  },
];

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState(0);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return p + 1;
      });
    }, 28);

    const logTimer = setInterval(() => {
      setVisibleLogs((prev) => {
        if (prev >= logs.length) {
          clearInterval(logTimer);
          return logs.length;
        }
        return prev + 1;
      });
    }, 650);

    return () => {
      clearInterval(progressTimer);
      clearInterval(logTimer);
    };
  }, []);

  return (
    <div className="splash-screen">
      <div className="grid-bg"></div>

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      <div className="shield-wrapper">
        <div className="ring ring1"></div>
        <div className="ring ring2"></div>
        <div className="ring ring3"></div>

        <div className="scanner"></div>

        <div className="shield">
          <Shield size={55} />
        </div>
      </div>

      <h1 className="logo">
        ToxicLens <span>AI</span>
      </h1>

      <p className="subtitle">
        AI Powered Cyberbullying Detection Platform
      </p>

      <div className="terminal">
        {logs.slice(0, visibleLogs).map((item, index) => (
          <div className="terminal-line" key={index}>
            <CheckCircle2
              size={16}
              className="terminal-check"
            />
            {item.icon}
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      <div className="progress-wrapper">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="progress-text">
          {progress}% Completed
        </div>
      </div>

      <div className="boot-text">
        Launching ToxicLens AI...
      </div>
    </div>
  );
}
