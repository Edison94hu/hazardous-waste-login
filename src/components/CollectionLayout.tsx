import { NavLink, Outlet } from "react-router-dom";

const tabs = [
  {
    id: 'normal',
    label: '正常录入',
    description: '实时录入危废标签数据',
    path: '/collection',
    className: 'bg-industrial-blue text-white shadow-lg shadow-industrial-blue/30'
  },
  {
    id: 'backfill',
    label: '补录',
    description: '补录历史日期的危废标签数据',
    path: '/collection/backfill',
    className: 'bg-warning-red text-white shadow-lg shadow-warning-red/30'
  }
];

export function CollectionLayout() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Entry Mode Selection Header */}
      <div className="flex-shrink-0 bg-gray-800/90 border-b border-gray-700/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Mode Toggle */}
            <div className="flex bg-gray-700/50 rounded-xl p-1">
              {tabs.map((tab) => (
                <NavLink
                  key={tab.id}
                  to={tab.path}
                  end={tab.path === '/collection'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      isActive 
                        ? `${tab.className} transform scale-[1.02]`
                        : 'text-gray-300 hover:text-white hover:bg-gray-600/50'
                    }`
                  }
                >
                  <span>{tab.label}</span>
                </NavLink>
              ))}
            </div>

            {/* Mode Description */}
            <div className="text-sm text-gray-400 ml-4">
              {/* Description will be updated based on active route */}
              危废数据采集与标签打印
            </div>
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
