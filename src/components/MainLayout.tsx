import { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { DarkTopBar, DeviceStatus } from "./DarkTopBar";
import { DarkBottomNavigation, NavigationTab } from "./DarkBottomNavigation";

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Device status
  const [printerStatus, setPrinterStatus] = useState<DeviceStatus>("connected");
  const [scaleStatus, setScaleStatus] = useState<DeviceStatus>("disconnected");

  // Navigation - determine active tab from current route
  const getActiveTabFromPath = (pathname: string): NavigationTab => {
    if (pathname.startsWith('/profile')) return "profile";
    if (pathname.startsWith('/statistics')) return "statistics";
    if (pathname.startsWith('/devices')) return "devices";
    if (pathname.startsWith('/collection')) return "collection";
    return "collection";
  };

  const [activeTab, setActiveTab] = useState<NavigationTab>(getActiveTabFromPath(location.pathname));

  // Handle tab changes and navigation
  const handleTabChange = (tab: NavigationTab) => {
    setActiveTab(tab);
    switch (tab) {
      case "collection":
        navigate("/collection");
        break;
      case "statistics":
        navigate("/statistics");
        break;
      case "devices":
        navigate("/devices");
        break;
      case "profile":
        navigate("/profile");
        break;
    }
  };

  // Update active tab when location changes
  useEffect(() => {
    setActiveTab(getActiveTabFromPath(location.pathname));
  }, [location.pathname]);

  // Simulate device status changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly change device status for demo
      if (Math.random() > 0.8) {
        setPrinterStatus(prev => prev === "connected" ? "disconnected" : "connected");
      }
      if (Math.random() > 0.8) {
        setScaleStatus(prev => prev === "connected" ? "disconnected" : "connected");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-gray-900 overflow-hidden">
      {/* 顶部栏 - 固定高度 */}
      <div className="flex-shrink-0">
        <DarkTopBar
          printerStatus={printerStatus}
          scaleStatus={scaleStatus}
        />
      </div>
      
      {/* 主内容区域 - 填充剩余空间 */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
      
      {/* 底部导航栏 - 固定高度 */}
      <div className="flex-shrink-0 border-t border-gray-700/50 relative z-50">
        <DarkBottomNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  );
}
