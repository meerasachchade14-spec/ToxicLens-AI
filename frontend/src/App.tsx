import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastContainer } from "./components/ui/Toast";
import { Sidebar } from "./components/Sidebar";
import SplashScreen from "./components/SplashScreen/SplashScreen";

import { LandingPage } from "./pages/LandingPage";
import { AuthPages } from "./pages/AuthPages";
import { DashboardHome } from "./pages/DashboardHome";
import { TextDetection } from "./pages/TextDetection";
import { OcrDetection } from "./pages/OcrDetection";
import { HistoryPage } from "./pages/History";
import { ReportsPage } from "./pages/Reports";
import { ProfilePage } from "./pages/Profile";
import { SettingsPage } from "./pages/Settings";
import { AdminDashboard } from "./pages/AdminDashboard";

function AppContent() {
  const { currentView, user, setView } = useApp();

  const isAuthView = [
    "login",
    "register",
    "forgot-password",
    "otp",
    "email-verify",
    "reset-password",
  ].includes(currentView);

  const isDashboardView = [
    "dashboard",
    "detection",
    "ocr",
    "history",
    "reports",
    "profile",
    "settings",
    "admin",
  ].includes(currentView);

  React.useEffect(() => {
    if (isDashboardView && !user) {
      setView("login");
    }
  }, [currentView, user, isDashboardView, setView]);

  if (currentView === "landing") {
    return <LandingPage />;
  }

  if (isAuthView) {
    return <AuthPages />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg-base text-text-main">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950/25 light:bg-slate-50/25 overflow-hidden">
        {currentView === "dashboard" && <DashboardHome />}
        {currentView === "detection" && <TextDetection />}
        {currentView === "ocr" && <OcrDetection />}
        {currentView === "history" && <HistoryPage />}
        {currentView === "reports" && <ReportsPage />}
        {currentView === "profile" && <ProfilePage />}
        {currentView === "settings" && <SettingsPage />}
        {currentView === "admin" && user?.role === "Admin" && <AdminDashboard />}
      </div>
    </div>
  );
}


function App() {

  const [loading,setLoading]=React.useState(true);

  React.useEffect(()=>{

      const timer=setTimeout(()=>{
          setLoading(false);
      },5000);

      return ()=>clearTimeout(timer);

  },[]);

  if(loading){
      return <SplashScreen/>
  }

  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
        <ToastContainer />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;