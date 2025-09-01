import { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { DarkTopBar, DeviceStatus } from "./components/DarkTopBar";
import { WasteTypeList, SortMode } from "./components/WasteTypeList";
import { WasteType } from "./components/WasteTypeCard";
import { WeightOperationPanel, WeightUnit, LabelSize } from "./components/WeightOperationPanel";
import { DarkBottomNavigation, NavigationTab } from "./components/DarkBottomNavigation";
import { HistoryAnalyticsTabPage } from "./components/HistoryAnalyticsTabPage";
import { DeviceManagementPage } from "./components/DeviceManagementPage";
import { ProfileLayout } from "./components/ProfileLayout";
import { ProfileBasic } from "./components/ProfileBasic";
import { ProfileHwInput } from "./components/ProfileHwInput";
import { ProfileAccounts } from "./components/ProfileAccounts";
import { ProfileSystem } from "./components/ProfileSystem";
import { HistoryLayout } from "./components/HistoryLayout";
import { HistoryRecordsPage } from "./components/HistoryRecordsPage";
import { DataAnalyticsPanel } from "./components/DataAnalyticsPanel";
import { CollectionLayout } from "./components/CollectionLayout";
import { CollectionNormal } from "./components/CollectionNormal";
import { CollectionBackfill } from "./components/CollectionBackfill";

type EntryMode = "normal" | "backfill";

function AppContent() {
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

  // Collection-related state is now handled in individual collection components

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

  // Collection-related handlers are now in individual collection components

  // Render different content based on active tab
  const renderMainContent = () => {
    switch (activeTab) {
      case "collection":
        // Collection routes are handled at the top level
        return null;

      case "statistics":
        // Statistics routes are handled at the top level
        return null;

      case "devices":
        return (
          <div className="flex-1 overflow-hidden">
            <DeviceManagementPage />
          </div>
        );

      case "profile":
        // Profile routes are handled at the top level
        return null;

      default:
        return null;
    }
  };

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
      {renderMainContent()}
      
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

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/collection/*" element={<CollectionLayout />}>
          <Route index element={<CollectionNormal />} />
          <Route path="backfill" element={<CollectionBackfill />} />
        </Route>
        <Route path="/profile/*" element={<ProfileLayout />}>
          <Route index element={<ProfileBasic />} />
          <Route path="hw-input" element={<ProfileHwInput />} />
          <Route path="accounts" element={<ProfileAccounts />} />
          <Route path="system" element={<ProfileSystem />} />
        </Route>
        <Route path="/statistics/*" element={<HistoryLayout />}>
          <Route index element={<HistoryRecordsPage />} />
          <Route path="analytics" element={<DataAnalyticsPanel />} />
        </Route>
        <Route path="/*" element={<AppContent />} />
        <Route path="/" element={<Navigate to="/collection" replace />} />
      </Routes>
    </HashRouter>
  );
}