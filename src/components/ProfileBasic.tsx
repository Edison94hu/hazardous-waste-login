import { useState } from "react";
import { 
  User,
  Save,
  Eye,
  EyeOff,
  Building,
  Camera,
  CloudUpload,
  Timer,
  RefreshCw
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export function ProfileBasic() {
  // User info state
  const [userInfo, setUserInfo] = useState({
    name: "张工程师",
    role: "系统管理员",
    phone: "138****8888",
    email: "zhang.engineer@company.com",
    company: "华东化工集团有限公司",
    avatar: "/api/placeholder/128/128"
  });

  // Company info state
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "华东化工集团有限公司",
    socialCreditCode: "91310000123456789X",
    pollutionPermitNumber: "91310000123456789X001P",
    address: "上海市浦东新区张江高科技园区",
    contactPerson: "李总经理",
    contactPhone: "021-58888888",
    apiToken: "sk-proj-1234567890abcdef..."
  });

  // Basic info editing state
  const [basicInfoForm, setBasicInfoForm] = useState({
    name: userInfo.name,
    phone: userInfo.phone,
    email: userInfo.email,
    companyName: companyInfo.companyName,
    socialCreditCode: companyInfo.socialCreditCode,
    pollutionPermitNumber: companyInfo.pollutionPermitNumber,
    address: companyInfo.address,
    contactPerson: companyInfo.contactPerson,
    contactPhone: companyInfo.contactPhone,
    apiToken: companyInfo.apiToken
  });

  // Data upload settings state
  const [dataUploadSettings, setDataUploadSettings] = useState({
    uploadMode: "realtime", // "realtime", "scheduled", "manual"
    uploadInterval: "1", // hours for scheduled mode
    lastUpload: "2024-03-15 14:30:25",
    autoBackup: true
  });

  const [showApiToken, setShowApiToken] = useState(false);

  // Basic info functions
  const handleBasicInfoChange = (field: string, value: string) => {
    setBasicInfoForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveBasicInfo = () => {
    // Update user info
    setUserInfo(prev => ({
      ...prev,
      name: basicInfoForm.name,
      phone: basicInfoForm.phone,
      email: basicInfoForm.email
    }));

    // Update company info
    setCompanyInfo(prev => ({
      ...prev,
      companyName: basicInfoForm.companyName,
      socialCreditCode: basicInfoForm.socialCreditCode,
      pollutionPermitNumber: basicInfoForm.pollutionPermitNumber,
      address: basicInfoForm.address,
      contactPerson: basicInfoForm.contactPerson,
      contactPhone: basicInfoForm.contactPhone,
      apiToken: basicInfoForm.apiToken
    }));

    alert("基础信息已成功更新");
  };

  const handleAvatarChange = () => {
    // In real implementation, this would open a file picker
    alert("头像更换功能：请选择新的头像图片");
  };

  // Data upload functions  
  const handleDataUploadChange = (field: string, value: string) => {
    setDataUploadSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleManualUpload = () => {
    // Simulate manual upload
    const now = new Date();
    const timeString = now.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    const formattedTime = timeString.replace(/\//g, '-');
    
    setDataUploadSettings(prev => ({ 
      ...prev, 
      lastUpload: formattedTime
    }));
    alert("数据上报成功！");
  };

  return (
    <div className="h-full overflow-auto">
      <div className="flex gap-6 p-6">
        {/* Left Column - Basic Info */}
        <div className="flex-1 space-y-6">
        {/* User Profile Section */}
        <div className="bg-[#1E1E2E] rounded-2xl p-6 shadow-lg border border-gray-700/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">个人信息</h3>
              <p className="text-sm text-gray-400">管理个人账户基础信息</p>
            </div>
          </div>

          <div className="flex items-start gap-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
                  <AvatarFallback className="bg-industrial-blue text-white text-2xl">
                    {userInfo.name.substring(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={handleAvatarChange}
                  className="absolute bottom-0 right-0 w-10 h-10 bg-industrial-blue hover:bg-industrial-blue/80 rounded-full flex items-center justify-center text-white shadow-lg transition-colors"
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-3 text-center">点击相机图标<br />更换头像</p>
            </div>

            {/* Basic Info Form */}
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">姓名</label>
                  <Input
                    value={basicInfoForm.name}
                    onChange={(e) => handleBasicInfoChange("name", e.target.value)}
                    placeholder="输入姓名"
                    className="bg-gray-700/50 border-gray-600 text-white h-12"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">手机号码</label>
                  <Input
                    value={basicInfoForm.phone}
                    onChange={(e) => handleBasicInfoChange("phone", e.target.value)}
                    placeholder="输入手机号码"
                    className="bg-gray-700/50 border-gray-600 text-white h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">邮箱地址</label>
                  <Input
                    type="email"
                    value={basicInfoForm.email}
                    onChange={(e) => handleBasicInfoChange("email", e.target.value)}
                    placeholder="输入邮箱地址"
                    className="bg-gray-700/50 border-gray-600 text-white h-12"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">职位角色</label>
                  <Input
                    value={userInfo.role}
                    disabled
                    className="bg-gray-700/30 border-gray-600 text-gray-400 h-12"
                  />
                  <p className="text-xs text-gray-500">角色权限由管理员分配</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Information Section */}
        <div className="bg-[#1E1E2E] rounded-2xl p-6 shadow-lg border border-gray-700/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Building className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">企业信息</h3>
              <p className="text-sm text-gray-400">管理所属企业相关证照信息</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm text-gray-300">企业名称</label>
                <Input
                  value={basicInfoForm.companyName}
                  onChange={(e) => handleBasicInfoChange("companyName", e.target.value)}
                  placeholder="输入企业名称"
                  className="bg-gray-700/50 border-gray-600 text-white h-12"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-300">统一社会信用代码</label>
                <Input
                  value={basicInfoForm.socialCreditCode}
                  onChange={(e) => handleBasicInfoChange("socialCreditCode", e.target.value)}
                  placeholder="输入统一社会信用代码"
                  className="bg-gray-700/50 border-gray-600 text-white h-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm text-gray-300">排污许可证号码</label>
                <Input
                  value={basicInfoForm.pollutionPermitNumber}
                  onChange={(e) => handleBasicInfoChange("pollutionPermitNumber", e.target.value)}
                  placeholder="输入排污许可证号码"
                  className="bg-gray-700/50 border-gray-600 text-white h-12"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-300">企业联系人</label>
                <Input
                  value={basicInfoForm.contactPerson}
                  onChange={(e) => handleBasicInfoChange("contactPerson", e.target.value)}
                  placeholder="输入企业联系人"
                  className="bg-gray-700/50 border-gray-600 text-white h-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm text-gray-300">企业地址</label>
                <Input
                  value={basicInfoForm.address}
                  onChange={(e) => handleBasicInfoChange("address", e.target.value)}
                  placeholder="输入企业地址"
                  className="bg-gray-700/50 border-gray-600 text-white h-12"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-300">企业联系电话</label>
                <Input
                  value={basicInfoForm.contactPhone}
                  onChange={(e) => handleBasicInfoChange("contactPhone", e.target.value)}
                  placeholder="输入企业联系电话"
                  className="bg-gray-700/50 border-gray-600 text-white h-12"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-300">企业API Token</label>
              <div className="relative">
                <Input
                  type={showApiToken ? "text" : "password"}
                  value={basicInfoForm.apiToken}
                  onChange={(e) => handleBasicInfoChange("apiToken", e.target.value)}
                  placeholder="输入企业API Token"
                  className="bg-gray-700/50 border-gray-600 text-white h-12 pr-12 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowApiToken(!showApiToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showApiToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">用于数据上报的企业专用API密钥，请妥善保管</p>
            </div>
          </div>
        </div>

          {/* Save Button */}
          <div className="flex gap-3">
            <Button
              onClick={handleSaveBasicInfo}
              className="bg-safety-green hover:bg-safety-green/80 text-white px-8 py-3"
            >
              <Save className="w-4 h-4 mr-2" />
              保存基础信息
            </Button>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700/50 px-6 py-3"
            >
              重置修改
            </Button>
          </div>
        </div>

        {/* Right Column - Data Upload Status */}
        <div className="w-[400px] space-y-6">
          {/* Data Upload Settings */}
          <div className="bg-[#1E1E2E] rounded-2xl p-6 shadow-lg border border-gray-700/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <CloudUpload className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">数据上报设置</h3>
                <p className="text-sm text-gray-400">配置数据同步模式</p>
              </div>
            </div>

            {/* Upload Mode Selection */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm text-gray-300">上报模式</label>
                <select
                  value={dataUploadSettings.uploadMode}
                  onChange={(e) => handleDataUploadChange("uploadMode", e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 h-12"
                >
                  <option value="realtime">实时上报</option>
                  <option value="scheduled">定时上报</option>
                  <option value="manual">手动上报</option>
                </select>
                <div className="mt-2 p-3 bg-gray-700/30 rounded-lg">
                  <p className="text-xs text-gray-400">
                    {dataUploadSettings.uploadMode === "realtime" && "数据即时同步到服务器，确保实时性"}
                    {dataUploadSettings.uploadMode === "scheduled" && "按设定的时间间隔自动上报数据"}
                    {dataUploadSettings.uploadMode === "manual" && "用户手动触发数据上报操作"}
                  </p>
                </div>
              </div>

              {/* Schedule Interval (only for scheduled mode) */}
              {dataUploadSettings.uploadMode === "scheduled" && (
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">上报间隔</label>
                  <select
                    value={dataUploadSettings.uploadInterval}
                    onChange={(e) => handleDataUploadChange("uploadInterval", e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 h-12"
                  >
                    {Array.from({ length: 24 }, (_, i) => i + 1).map(hour => (
                      <option key={hour} value={hour.toString()}>
                        每 {hour} 小时
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Manual Upload Button */}
              {dataUploadSettings.uploadMode === "manual" && (
                <Button
                  onClick={handleManualUpload}
                  className="w-full bg-industrial-blue hover:bg-industrial-blue/80 text-white h-12"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  立即上报数据
                </Button>
              )}
            </div>
          </div>

          {/* Upload Status */}
          <div className="bg-[#1E1E2E] rounded-2xl p-6 shadow-lg border border-gray-700/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Timer className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">上报状态</h3>
                <p className="text-sm text-gray-400">查看数据同步状态</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Current Status */}
              <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    dataUploadSettings.uploadMode === "realtime" ? "bg-green-400 animate-pulse" :
                    dataUploadSettings.uploadMode === "scheduled" ? "bg-blue-400" :
                    "bg-yellow-400"
                  }`} />
                  <span className="text-white font-medium">
                    {dataUploadSettings.uploadMode === "realtime" && "实时同步中"}
                    {dataUploadSettings.uploadMode === "scheduled" && `定时上报 (${dataUploadSettings.uploadInterval}h)`}
                    {dataUploadSettings.uploadMode === "manual" && "手动上报"}
                  </span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  dataUploadSettings.uploadMode === "realtime" ? "bg-green-500/20 text-green-400" :
                  dataUploadSettings.uploadMode === "scheduled" ? "bg-blue-500/20 text-blue-400" :
                  "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {dataUploadSettings.uploadMode === "realtime" && "运行中"}
                  {dataUploadSettings.uploadMode === "scheduled" && "计划中"}
                  {dataUploadSettings.uploadMode === "manual" && "待触发"}
                </span>
              </div>

              {/* Last Upload */}
              <div className="space-y-2">
                <label className="text-sm text-gray-300">最后上报时间</label>
                <div className="p-3 bg-gray-700/30 rounded-lg">
                  <p className="text-white font-mono text-sm">{dataUploadSettings.lastUpload}</p>
                </div>
              </div>

              {/* Next Upload (only for scheduled) */}
              {dataUploadSettings.uploadMode === "scheduled" && (
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">下次上报时间</label>
                  <div className="p-3 bg-gray-700/30 rounded-lg">
                    <p className="text-white font-mono text-sm">
                      {(() => {
                        const lastUploadTime = new Date(dataUploadSettings.lastUpload);
                        const intervalHours = parseInt(dataUploadSettings.uploadInterval);
                        const nextUploadTime = new Date(lastUploadTime.getTime() + intervalHours * 60 * 60 * 1000);
                        return nextUploadTime.toLocaleString('zh-CN', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        }).replace(/\//g, '-');
                      })()}
                    </p>
                  </div>
                </div>
              )}

              {/* Auto Backup Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
                <div>
                  <span className="text-white font-medium">自动备份</span>
                  <p className="text-sm text-gray-400">上报同时创建本地备份</p>
                </div>
                <Switch
                  checked={dataUploadSettings.autoBackup}
                  onCheckedChange={(checked) => handleDataUploadChange("autoBackup", checked.toString())}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
