import { NavLink, Outlet } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { IdCard, Settings, User, Shield } from "lucide-react";

const userInfo = {
  name: "张工程师",
  role: "系统管理员",
  company: "华东化工集团有限公司",
  avatar: "/api/placeholder/128/128"
};

const tabs = [
  { id: "basicInfo", label: "基础信息", icon: IdCard, path: "/profile" },
  { id: "wasteInfo", label: "危废信息录入", icon: Settings, path: "/profile/hw-input" },
  { id: "subAccounts", label: "管理子账户", icon: User, path: "/profile/accounts" },
  { id: "settings", label: "系统设置", icon: Shield, path: "/profile/system" }
];

export function ProfileLayout() {
  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <div className="flex-shrink-0 bg-gray-800/90 border-b border-gray-700/50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
              <AvatarFallback className="bg-industrial-blue text-white">
                {userInfo.name.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold text-white">{userInfo.name}</h2>
              <p className="text-sm text-gray-400">{userInfo.role} · {userInfo.company}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <NavLink
                key={tab.id}
                to={tab.path}
                end={tab.path === "/profile"}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    isActive
                      ? "bg-industrial-blue text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
