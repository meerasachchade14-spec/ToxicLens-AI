import React, { createContext, useContext, useState, useEffect } from "react";

export type ViewType =
  | "landing"
  | "dashboard"
  | "detection"
  | "ocr"
  | "history"
  | "reports"
  | "profile"
  | "settings"
  | "admin"
  | "login"
  | "register"
  | "forgot-password"
  | "otp"
  | "email-verify"
  | "reset-password";

export interface ScanRecord {
  id: string;
  timestamp: string;
  content: string;
  type: "text" | "ocr";
  isBullying: boolean;
  confidence: number;
  toxicityScore: number;
  severity: "Low" | "Medium" | "High" | "Extreme";
  category: "Safe" | "Harassment" | "Hate Speech" | "Threat" | "Insult" | "Sexual Harassment";
  emotion: "Anger" | "Fear" | "Sadness" | "Neutral" | "Surprise";
  language: "English" | "Hindi" | "Hinglish";
  flaggedWords: string[];
  explanation: string;
  safeRewrite: string;
  ocrImageName?: string;
  ocrConfidence?: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: "Admin" | "Moderator" | "Standard";
  scanCount: number;
  avatar: string;
  joinedDate: string;
  achievements: string[];
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  severity: "info" | "warning" | "error";
}

export interface AdminLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  ip: string;
  status: "Success" | "Failed";
}

interface AppContextType {
  user: UserProfile | null;
  currentView: ViewType;
  history: ScanRecord[];
  notifications: SystemNotification[];
  adminLogs: AdminLog[];
  scanStats: {
    totalScans: number;
    safeCount: number;
    bullyingCount: number;
    accuracy: number;
  };
  toasts: { id: string; message: string; type: "success" | "error" | "info" }[];
  setView: (view: ViewType) => void;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;
  loginUser: (email: string) => boolean;
  logoutUser: () => void;
  registerUser: (name: string, email: string) => void;
  verifyOtpCode: (otp: string) => boolean;
  resetUserPassword: (password: string) => void;
  runMockTextAnalysis: (text: string, language: "English" | "Hindi" | "Hinglish") => ScanRecord;
  runMockOcrAnalysis: (imageName: string, text: string) => ScanRecord;
  deleteHistoryRecord: (id: string) => void;
  clearHistory: () => void;
  markNotificationRead: (id: string) => void;
  addAdminLog: (action: string) => void;
  updateUserProfile: (profileData: Partial<UserProfile>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialHistory: ScanRecord[] = [
  {
    id: "SCN-101",
    timestamp: "2026-07-17 14:32",
    content: "Hey, you are incredibly fat and ugly, you should delete your account.",
    type: "text",
    isBullying: true,
    confidence: 96,
    toxicityScore: 92,
    severity: "High",
    category: "Harassment",
    emotion: "Sadness",
    language: "English",
    flaggedWords: ["fat", "ugly", "delete your account"],
    explanation: "The content contains body-shaming terminology and encourages account self-deletion, violating platform guidelines on direct harassment.",
    safeRewrite: "I strongly disagree with your style and think you should post different content.",
  },
  {
    id: "SCN-102",
    timestamp: "2026-07-17 12:15",
    content: "This is a great product representation, can't wait for the production release!",
    type: "text",
    isBullying: false,
    confidence: 99,
    toxicityScore: 2,
    severity: "Low",
    category: "Safe",
    emotion: "Neutral",
    language: "English",
    flaggedWords: [],
    explanation: "This comment is safe and constructive with positive sentiment.",
    safeRewrite: "",
  },
  {
    id: "SCN-103",
    timestamp: "2026-07-16 18:44",
    content: "Screen shot from chat: Tu bahut bada bewakoof hai, tujhe kuch nahi pata.",
    type: "ocr",
    ocrImageName: "discord_flame_war.png",
    ocrConfidence: 94,
    isBullying: true,
    confidence: 89,
    toxicityScore: 81,
    severity: "Medium",
    category: "Insult",
    emotion: "Anger",
    language: "Hinglish",
    flaggedWords: ["bewakoof", "kuch nahi pata"],
    explanation: "The OCR text contains Hinglish insults ('bewakoof' translating to idiot) directed at another user's capabilities.",
    safeRewrite: "Mujhe lagta hai aap is vishay ke baare me thoda kam jaante hain.",
  },
  {
    id: "SCN-104",
    timestamp: "2026-07-16 11:20",
    content: "Agar tumne firse mere posts par comment kiya, to tumhare liye achha nahi hoga. Mai tumhara address jaanta hu.",
    type: "text",
    isBullying: true,
    confidence: 97,
    toxicityScore: 95,
    severity: "Extreme",
    category: "Threat",
    emotion: "Fear",
    language: "Hindi",
    flaggedWords: ["achha nahi hoga", "address jaanta hu"],
    explanation: "The text contains a direct personal threat ('achha nahi hoga') and claims knowledge of physical location ('address jaanta hu') to intimidate.",
    safeRewrite: "Kripya mere posts par aage se comment na karein.",
  },
  {
    id: "SCN-105",
    timestamp: "2026-07-15 15:10",
    content: "Oh brilliant! Another delay. You guys are absolute geniuses. 🙄",
    type: "text",
    isBullying: true,
    confidence: 76,
    toxicityScore: 68,
    severity: "Low",
    category: "Insult",
    emotion: "Anger",
    language: "English",
    flaggedWords: ["absolute geniuses"],
    explanation: "The comment contains sarcasm (detected from tone, emoji, and semantic structure) meant to insult the developers' competency.",
    safeRewrite: "I am disappointed with the delay and hope for updates soon.",
  },
  {
    id: "SCN-106",
    timestamp: "2026-07-15 09:30",
    content: "Shut up, you brainless cow. Nobody wants to hear your opinion on this forum.",
    type: "text",
    isBullying: true,
    confidence: 95,
    toxicityScore: 89,
    severity: "High",
    category: "Harassment",
    emotion: "Anger",
    language: "English",
    flaggedWords: ["Shut up", "brainless cow", "Nobody wants to hear"],
    explanation: "Direct aggressive harassment featuring animal comparisons and verbal abuse.",
    safeRewrite: "I disagree with your opinion on this forum.",
  }
];

const initialNotifications: SystemNotification[] = [
  {
    id: "notif-1",
    title: "High Risk Alert",
    message: "A threat detection with 97% confidence was logged on IP 192.168.1.45.",
    time: "10 mins ago",
    read: false,
    severity: "error",
  },
  {
    id: "notif-2",
    title: "API Limit Reached",
    message: "Your developer API sandbox has reached 80% of its monthly free tier scans.",
    time: "2 hours ago",
    read: false,
    severity: "warning",
  },
  {
    id: "notif-3",
    title: "Model Update",
    message: "ToxicLens BERT-v4 NLP engine was successfully updated to active production.",
    time: "1 day ago",
    read: true,
    severity: "info",
  }
];

const initialAdminLogs: AdminLog[] = [
  { id: "LOG-01", timestamp: "2026-07-18 01:45", user: "alex@toxiclens.ai", action: "User Session Login", ip: "192.168.1.12", status: "Success" },
  { id: "LOG-02", timestamp: "2026-07-17 23:10", user: "system@toxiclens.ai", action: "Active Weights Reloaded", ip: "127.0.0.1", status: "Success" },
  { id: "LOG-03", timestamp: "2026-07-17 19:40", user: "dev_api@instagram.com", action: "API Query Outflow", ip: "34.205.18.99", status: "Success" },
  { id: "LOG-04", timestamp: "2026-07-17 15:30", user: "attacker@proxy.net", action: "Admin Panel Injection Attempt", ip: "185.190.140.2", status: "Failed" }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : {
      name: "Meera Nair",
      email: "meera.nair@toxiclens.ai",
      phone: "+91 98765 43210",
      role: "Admin",
      scanCount: 1420,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256",
      joinedDate: "2026-03-10",
      achievements: ["Safety Guardian", "Real-Time Watchdog", "Text Scholar", "Accuracy Champion"],
    };
  });

  const [currentView, setView] = useState<ViewType>(() => {
    const saved = localStorage.getItem("currentView") as ViewType;
    return saved || "landing";
  });

  const [history, setHistory] = useState<ScanRecord[]>(() => {
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : initialHistory;
  });

  const [notifications, setNotifications] = useState<SystemNotification[]>(initialNotifications);
  const [adminLogs, setAdminLogs] = useState<AdminLog[]>(initialAdminLogs);
  const [toasts, setToasts] = useState<{ id: string; message: string; type: "success" | "error" | "info" }[]>([]);

  useEffect(() => {
    localStorage.setItem("currentView", currentView);
  }, [currentView]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const totalScans = history.length;
  const accuracy = totalScans > 0 ? Math.round(((totalScans - 1) / totalScans) * 100) : 98; // High accuracy mockup

  const scanStats = {
    totalScans: (user?.scanCount || 0) + totalScans - initialHistory.length,
    safeCount: Math.round(((user?.scanCount || 0) + totalScans) * 0.82),
    bullyingCount: Math.round(((user?.scanCount || 0) + totalScans) * 0.18),
    accuracy: accuracy
  };

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const loginUser = (email: string) => {
    setUser({
      name: "Meera Nair",
      email: email || "meera.nair@toxiclens.ai",
      phone: "+91 98765 43210",
      role: "Admin",
      scanCount: 1420,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256",
      joinedDate: "2026-03-10",
      achievements: ["Safety Guardian", "Real-Time Watchdog", "Text Scholar", "Accuracy Champion"],
    });
    setView("dashboard");
    showToast("Logged in successfully!", "success");
    addAdminLog("User Session Login");
    return true;
  };

  const logoutUser = () => {
    setUser(null);
    setView("landing");
    showToast("Logged out successfully.", "info");
    addAdminLog("User Session Logout");
  };

  const registerUser = (name: string, email: string) => {
    setUser({
      name: name,
      email: email,
      phone: "+91 00000 00000",
      role: "Standard",
      scanCount: 0,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256",
      joinedDate: new Date().toISOString().split("T")[0],
      achievements: ["New Recruit"],
    });
    setView("dashboard");
    showToast("Account registered successfully!", "success");
    addAdminLog("Account Registered");
  };

  const verifyOtpCode = (otp: string) => {
    if (otp.length === 6) {
      showToast("OTP Verification Successful", "success");
      return true;
    }
    showToast("Invalid OTP code. Please enter 6 digits.", "error");
    return false;
  };

  const resetUserPassword = (_password: string) => {
    showToast("Password has been reset successfully.", "success");
    setView("login");
  };

  const addAdminLog = (action: string) => {
    const newLog: AdminLog = {
      id: "LOG-" + Math.floor(Math.random() * 1000),
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
      user: user?.email || "anonymous",
      action,
      ip: "192.168.1.12",
      status: "Success",
    };
    setAdminLogs((prev) => [newLog, ...prev]);
  };

  const deleteHistoryRecord = (id: string) => {
    setHistory((prev) => prev.filter((r) => r.id !== id));
    showToast("Scan record deleted.", "info");
  };

  const clearHistory = () => {
    setHistory([]);
    showToast("Scan history cleared successfully.", "success");
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const updateUserProfile = (profileData: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...profileData } : null));
    showToast("Profile details updated.", "success");
  };

  // Advanced Mock NLP Processing Engine
  const runMockTextAnalysis = (text: string, language: "English" | "Hindi" | "Hinglish"): ScanRecord => {
    const textLower = text.toLowerCase();
    let isBullying = false;
    let confidence = 40 + Math.floor(Math.random() * 30);
    let toxicityScore = 10 + Math.floor(Math.random() * 30);
    let severity: "Low" | "Medium" | "High" | "Extreme" = "Low";
    let category: "Safe" | "Harassment" | "Hate Speech" | "Threat" | "Insult" | "Sexual Harassment" = "Safe";
    let emotion: "Anger" | "Fear" | "Sadness" | "Neutral" | "Surprise" = "Neutral";
    let flaggedWords: string[] = [];
    let explanation = "The text has been analyzed and classified as safe. No cyberbullying indicators found.";
    let safeRewrite = "";

    // Specific Rule Lists
    const threats = ["kill", "die", "murder", "marn", "address", "stalk", "find you", "badla", "goli"];
    const hateSpeech = ["hate", "gay", "black", "foreigner", "religion", "bihaari", "kaleshi", "bhangi", "katua", "chamar", "mulla", "racial", "immigrant"];
    const insults = ["stupid", "idiot", "loser", "dumb", "bewakoof", "chutiya", "kamine", "gadha", "pagal", "sallu", "moti", "motu", "scum", "ugly", "bastard"];
    const sexual = ["sexy", "bitch", "slut", "randi", "saali", "rape", "nude", "porn", "rand", "harass"];

    // Find flagged words
    const checkPhrases = (list: string[]) => {
      const found: string[] = [];
      list.forEach((word) => {
        if (textLower.includes(word)) {
          found.push(word);
        }
      });
      return found;
    };

    const foundThreats = checkPhrases(threats);
    const foundHate = checkPhrases(hateSpeech);
    const foundInsults = checkPhrases(insults);
    const foundSexual = checkPhrases(sexual);

    if (foundThreats.length > 0) {
      isBullying = true;
      category = "Threat";
      severity = "Extreme";
      emotion = "Fear";
      confidence = 92 + Math.floor(Math.random() * 7);
      toxicityScore = 90 + Math.floor(Math.random() * 9);
      flaggedWords = foundThreats;
      explanation = `Highly dangerous content: The system detected direct threats ('${flaggedWords.join("', '")}') suggesting potential physical harm or geolocation intimidation.`;
      safeRewrite = "I am very upset by this situation and would like to resolve it through proper support channels.";
    } else if (foundSexual.length > 0) {
      isBullying = true;
      category = "Sexual Harassment";
      severity = "High";
      emotion = "Anger";
      confidence = 88 + Math.floor(Math.random() * 10);
      toxicityScore = 85 + Math.floor(Math.random() * 12);
      flaggedWords = foundSexual;
      explanation = `Sexually abusive terms detected ('${flaggedWords.join("', '")}') targeting a person or displaying highly inappropriate sexual harassment.`;
      safeRewrite = "I request you to maintain professional boundaries and refrain from inappropriate comments.";
    } else if (foundHate.length > 0) {
      isBullying = true;
      category = "Hate Speech";
      severity = "High";
      emotion = "Anger";
      confidence = 90 + Math.floor(Math.random() * 8);
      toxicityScore = 80 + Math.floor(Math.random() * 15);
      flaggedWords = foundHate;
      explanation = `Bias indicators detected ('${flaggedWords.join("', '")}') suggesting discrimination or hate speech targeted against specific community traits (race, religion, nationality, or caste).`;
      safeRewrite = "We have different backgrounds, but let's maintain respect for all communities.";
    } else if (foundInsults.length > 0) {
      isBullying = true;
      category = "Insult";
      severity = "Medium";
      emotion = "Sadness";
      confidence = 82 + Math.floor(Math.random() * 12);
      toxicityScore = 65 + Math.floor(Math.random() * 20);
      flaggedWords = foundInsults;
      explanation = `Insulting/offensive words found ('${flaggedWords.join("', '")}') that target another individual's mental ability, weight, or character in a derogatory manner.`;
      safeRewrite = "I disagree with your view, let's keep the discussion focused on the topic.";
    } else if (textLower.includes("🙄") || textLower.includes("lazy") || textLower.includes("whatever") || textLower.includes("genius")) {
      // Sarcasm / low severity harassment
      isBullying = true;
      category = "Insult";
      severity = "Low";
      emotion = "Anger";
      confidence = 70 + Math.floor(Math.random() * 15);
      toxicityScore = 55 + Math.floor(Math.random() * 15);
      flaggedWords = textLower.match(/(genius|lazy|whatever|🙄)/gi) || ["sarcastic tone"];
      explanation = "Sarcasm analysis flags this comment as passive-aggressive verbal bullying directed at mock users.";
      safeRewrite = "I have concerns regarding the speed or quality of this process.";
    }

    const newScan: ScanRecord = {
      id: "SCN-" + (100 + history.length + 1),
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
      content: text,
      type: "text",
      isBullying,
      confidence,
      toxicityScore,
      severity,
      category,
      emotion,
      language,
      flaggedWords,
      explanation,
      safeRewrite,
    };

    setHistory((prev) => [newScan, ...prev]);
    
    // Increment stats in state
    if (user) {
      setUser((prev) => prev ? { ...prev, scanCount: prev.scanCount + 1 } : null);
    }
    
    if (isBullying) {
      showToast("Bullying detected! ToxicLens flagged this comment.", "error");
      addAdminLog("Bullying Comment Flagged");
    } else {
      showToast("Comment scanned: Classified as SAFE.", "success");
    }

    return newScan;
  };

  const runMockOcrAnalysis = (imageName: string, text: string): ScanRecord => {
    const textScan = runMockTextAnalysis(text, "English");
    const ocrScan: ScanRecord = {
      ...textScan,
      id: "OCR-" + (200 + history.length + 1),
      type: "ocr",
      ocrImageName: imageName,
      ocrConfidence: 90 + Math.floor(Math.random() * 9),
    };
    
    // Replace the text-only scan we just inserted in runMockTextAnalysis
    setHistory((prev) => {
      const filtered = prev.filter((r) => r.id !== textScan.id);
      return [ocrScan, ...filtered];
    });

    return ocrScan;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        currentView,
        history,
        notifications,
        adminLogs,
        scanStats,
        toasts,
        setView,
        showToast,
        removeToast,
        loginUser,
        logoutUser,
        registerUser,
        verifyOtpCode,
        resetUserPassword,
        runMockTextAnalysis,
        runMockOcrAnalysis,
        deleteHistoryRecord,
        clearHistory,
        markNotificationRead,
        addAdminLog,
        updateUserProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
