import { NavLink, Outlet } from "react-router-dom";
import { Database, TrendingUp } from "lucide-react";

const tabs = [
  {
    id: 'history',
    label: '历史记录',
    icon: Database,
    description: '查看打印记录和历史数据',
    path: '/statistics'
  },
  {
    id: 'analytics',
    label: '数据分析',
    icon: TrendingUp,
    description: '统计分析和数据可视化',
    path: '/statistics/analytics'
  }
];

export function HistoryLayout() {
  return (
    <div className="flex flex-col h-full bg-gray-900 overflow-hidden">
      {/* Tab Header */}
      <div className="flex-shrink-0 bg-gray-800/90 border-b border-gray-700/50 px-6 py-4">
        <div className="flex items-center gap-6">
          {/* Tab Buttons */}
          <div className="flex bg-gray-700/50 rounded-xl p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              
              return (
                <NavLink
                  key={tab.id}
                  to={tab.path}
                  end={tab.path === '/statistics'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      isActive 
                        ? 'bg-industrial-blue text-white shadow-lg shadow-industrial-blue/30 transform scale-[1.02]' 
                        : 'text-gray-300 hover:text-white hover:bg-gray-600/50'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Tab Description */}
          <div className="text-sm text-gray-400 ml-4">
            {/* Description will be shown based on active route */}
            查看历史数据和统计分析
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
