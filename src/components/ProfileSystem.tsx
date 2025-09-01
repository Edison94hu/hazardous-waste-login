import { useState } from "react";
import { 
  Lock,
  Bell,
  HelpCircle,
  LogOut,
  Save,
  Eye,
  EyeOff,
  Globe,
  MessageCircle,
  Phone,
  Upload,
  Clock,
  ChevronRight
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";

export function ProfileSystem() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false
  });

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    messageNotifications: true,
    systemAlerts: true,
    deviceAlerts: false,
    language: "zh-CN",
    theme: "dark"
  });

  // Data upload settings state
  const [dataUploadSettings, setDataUploadSettings] = useState({
    uploadMode: "realtime", // "realtime", "scheduled", "manual"
    uploadInterval: "1", // hours for scheduled mode
    lastUpload: "2024-03-15 14:30:25",
    autoBackup: true
  });

  const handleLogout = () => {
    if (confirm("确定要退出登录吗？")) {
      console.log("User logged out");
      alert("已退出登录");
    }
  };

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Account Security Section */}
        <div className="bg-[#1E1E2E] rounded-2xl p-6 shadow-lg border border-gray-700/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">账户安全</h3>
              <p className="text-sm text-gray-400">管理密码和安全设置</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-1">
                <label className="text-sm text-gray-300">当前密码</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={securitySettings.currentPassword}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, currentPassword: e.target.value }))}
                    placeholder="输入当前密码"
                    className="bg-gray-700/50 border-gray-600 text-white h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm text-gray-300">新密码</label>
                <Input
                  type="password"
                  value={securitySettings.newPassword}
                  onChange={(e) => setSecuritySettings(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="输入新密码"
                  className="bg-gray-700/50 border-gray-600 text-white h-12"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-300">确认新密码</label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={securitySettings.confirmPassword}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="再次输入新密码"
                    className="bg-gray-700/50 border-gray-600 text-white h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
              <div>
                <span className="text-white font-medium">双因素认证</span>
                <p className="text-sm text-gray-400">增强账户安全性</p>
              </div>
              <Switch
                checked={securitySettings.twoFactorEnabled}
                onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, twoFactorEnabled: checked }))}
              />
            </div>

            <Button className="bg-warning-red hover:bg-warning-red/80 text-white">
              <Save className="w-4 h-4 mr-2" />
              更新密码
            </Button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-[#1E1E2E] rounded-2xl p-6 shadow-lg border border-gray-700/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">通知偏好</h3>
              <p className="text-sm text-gray-400">设置系统通知和提醒</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
              <div>
                <span className="text-white font-medium">消息通知</span>
                <p className="text-sm text-gray-400">接收系统消息和提醒</p>
              </div>
              <Switch
                checked={notificationSettings.messageNotifications}
                onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, messageNotifications: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
              <div>
                <span className="text-white font-medium">系统警报</span>
                <p className="text-sm text-gray-400">系统异常和错误通知</p>
              </div>
              <Switch
                checked={notificationSettings.systemAlerts}
                onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, systemAlerts: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
              <div>
                <span className="text-white font-medium">设备警报</span>
                <p className="text-sm text-gray-400">设备连接状态变化通知</p>
              </div>
              <Switch
                checked={notificationSettings.deviceAlerts}
                onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, deviceAlerts: checked }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm text-gray-300">语言</label>
                <select
                  value={notificationSettings.language}
                  onChange={(e) => setNotificationSettings(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 h-12"
                >
                  <option value="zh-CN">简体中文</option>
                  <option value="en-US">English</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-300">主题</label>
                <select
                  value={notificationSettings.theme}
                  onChange={(e) => setNotificationSettings(prev => ({ ...prev, theme: e.target.value }))}
                  className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 h-12"
                >
                  <option value="dark">深色模式</option>
                  <option value="light">浅色模式</option>
                  <option value="auto">跟随系统</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Data Upload Settings */}
        <div className="bg-[#1E1E2E] rounded-2xl p-6 shadow-lg border border-gray-700/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Upload className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">数据上报设置</h3>
              <p className="text-sm text-gray-400">配置数据同步和上传偏好</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm text-gray-300">上报模式</label>
              <select
                value={dataUploadSettings.uploadMode}
                onChange={(e) => setDataUploadSettings(prev => ({ ...prev, uploadMode: e.target.value }))}
                className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 h-12"
              >
                <option value="realtime">实时上报</option>
                <option value="scheduled">定时上报</option>
                <option value="manual">手动上报</option>
              </select>
            </div>

            {dataUploadSettings.uploadMode === "scheduled" && (
              <div className="space-y-1">
                <label className="text-sm text-gray-300">上报间隔</label>
                <select
                  value={dataUploadSettings.uploadInterval}
                  onChange={(e) => setDataUploadSettings(prev => ({ ...prev, uploadInterval: e.target.value }))}
                  className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 h-12"
                >
                  <option value="1">每 1 小时</option>
                  <option value="2">每 2 小时</option>
                  <option value="4">每 4 小时</option>
                  <option value="6">每 6 小时</option>
                  <option value="12">每 12 小时</option>
                  <option value="24">每 24 小时</option>
                </select>
              </div>
            )}

            <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
              <div>
                <span className="text-white font-medium">自动备份</span>
                <p className="text-sm text-gray-400">自动创建数据本地备份</p>
              </div>
              <Switch
                checked={dataUploadSettings.autoBackup}
                onCheckedChange={(checked) => setDataUploadSettings(prev => ({ ...prev, autoBackup: checked }))}
              />
            </div>

            <div className="p-4 bg-gray-700/30 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-white font-medium">最后上报时间</span>
              </div>
              <p className="text-sm text-gray-400">{dataUploadSettings.lastUpload}</p>
            </div>
          </div>
        </div>

        {/* Service & Help */}
        <div className="bg-[#1E1E2E] rounded-2xl p-6 shadow-lg border border-gray-700/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">服务与帮助</h3>
              <p className="text-sm text-gray-400">获取支持和系统信息</p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="flex items-center justify-between w-full p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                <span className="text-white">联系客服</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button className="flex items-center justify-between w-full p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-400" />
                <span className="text-white">技术支持热线</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>

            <button className="flex items-center justify-between w-full p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-purple-400" />
                <span className="text-white">官方网站</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700/50">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              退出登录
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
