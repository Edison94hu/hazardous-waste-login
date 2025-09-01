import { Home, History, Bluetooth, Settings } from "lucide-react";

interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface IOSTabBarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function IOSTabBar({ activeTab, onTabChange }: IOSTabBarProps) {
  const tabs: TabItem[] = [
    { id: "home", label: "主页", icon: Home },
    { id: "history", label: "历史记录", icon: History },
    { id: "device", label: "设备", icon: Bluetooth },
    { id: "settings", label: "设置", icon: Settings }
  ];

  return (
    <div className="h-20 bg-white border-t border-gray-200 flex items-center justify-around px-6">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all duration-200 ${
              isActive ? 'text-blue-500' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon className={`w-6 h-6 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
            <span className={`text-xs font-medium ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}