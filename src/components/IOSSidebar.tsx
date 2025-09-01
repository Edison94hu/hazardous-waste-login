import { useState } from "react";
import { 
  Plus, 
  Printer, 
  Clock, 
  History, 
  Settings,
  FileText
} from "lucide-react";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface IOSSidebarProps {
  activeItem: string;
  onItemSelect: (itemId: string) => void;
}

export function IOSSidebar({ activeItem, onItemSelect }: IOSSidebarProps) {
  const sidebarItems: SidebarItem[] = [
    { id: "new", label: "新建标签", icon: Plus },
    { id: "batch", label: "批量打印", icon: Printer },
    { id: "queue", label: "打印队列", icon: Clock, badge: 3 },
    { id: "history", label: "历史记录", icon: History },
    { id: "templates", label: "模板管理", icon: FileText },
    { id: "settings", label: "设置", icon: Settings }
  ];

  return (
    <div className="w-64 h-full bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">功能导航</h2>
        
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onItemSelect(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-white hover:shadow-sm'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className={`ml-auto px-2 py-1 text-xs font-semibold rounded-full ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-red-500 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}