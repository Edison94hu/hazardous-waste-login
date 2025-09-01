import { useState } from "react";
import { 
  User,
  Edit,
  UserPlus,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Save,
  Eye,
  EyeOff,
  Globe,
  Moon,
  MessageCircle,
  Phone,
  Settings,
  Lock,
  Smartphone,
  Trash2,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Upload,
  Clock,
  IdCard,
  Building,
  Camera,
  CloudUpload,
  Timer,
  RefreshCw
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

type PersonalCenterTab = "basicInfo" | "wasteInfo" | "subAccounts" | "settings";

interface SubAccount {
  id: string;
  username: string;
  role: "管理员" | "操作员" | "查看者";
  status: "启用" | "停用";
  lastLogin: string;
  email?: string;
  permissions?: string[];
}

interface WasteInfoRecord {
  id: string;
  wasteId: string;
  facilityCode: string;
  wasteName: string;
  wasteCategory: string;
  wasteCode: string;
  wasteForm: string;
  mainComponents: string;
  harmfulComponents: string;
  precautions: string;
  hazardousProperties: string;
  createdAt: string;
  updatedAt: string;
  status: "active" | "inactive";
}

interface WasteInfoForm {
  wasteId: string;
  facilityCode: string;
  wasteName: string;
  wasteCategory: string;
  wasteCode: string;
  wasteForm: string;
  mainComponents: string;
  harmfulComponents: string;
  precautions: string;
  hazardousProperties: string;
}

export function PersonalCenterPage() {
  const [activeTab, setActiveTab] = useState<PersonalCenterTab>("basicInfo");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
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

  // Waste info records state
  const [wasteInfoRecords, setWasteInfoRecords] = useState<WasteInfoRecord[]>([
    {
      id: "1",
      wasteId: "HW001",
      facilityCode: "FC001",
      wasteName: "废矿物油与含矿物油废物",
      wasteCategory: "危险废物",
      wasteCode: "900-041-49",
      wasteForm: "液态",
      mainComponents: "矿物油、有机溶剂",
      harmfulComponents: "苯、甲苯、二甲苯",
      precautions: "远离火源，避免高温",
      hazardousProperties: "易燃、有毒",
      createdAt: "2024-03-15",
      updatedAt: "2024-03-15",
      status: "active"
    },
    {
      id: "2",
      wasteId: "HW002",
      facilityCode: "FC002",
      wasteName: "废酸",
      wasteCategory: "危险废物",
      wasteCode: "900-300-34",
      wasteForm: "液态",
      mainComponents: "硫酸、盐酸",
      harmfulComponents: "强酸",
      precautions: "穿戴防护用品，避免接触皮肤",
      hazardousProperties: "腐蚀性",
      createdAt: "2024-03-14",
      updatedAt: "2024-03-14",
      status: "active"
    },
    {
      id: "3",
      wasteId: "HW003",
      facilityCode: "FC003",
      wasteName: "废有机溶剂",
      wasteCategory: "危险废物",
      wasteCode: "900-402-06",
      wasteForm: "液态",
      mainComponents: "丙酮、乙醇",
      harmfulComponents: "有机溶剂",
      precautions: "通风良好环境下操作",
      hazardousProperties: "易燃、易挥发",
      createdAt: "2024-03-13",
      updatedAt: "2024-03-13",
      status: "inactive"
    }
  ]);

  // Sub accounts state
  const [subAccounts, setSubAccounts] = useState<SubAccount[]>([
    {
      id: "1",
      username: "李操作员",
      role: "操作员",
      status: "启用",
      lastLogin: "2024-03-15 14:30",
      email: "li.operator@company.com",
      permissions: ["数据采集", "标签打印"]
    },
    {
      id: "2", 
      username: "王查看员",
      role: "查看者",
      status: "启用",
      lastLogin: "2024-03-14 09:15",
      email: "wang.viewer@company.com",
      permissions: ["历史记录查看"]
    },
    {
      id: "3",
      username: "赵技术员",
      role: "操作员", 
      status: "停用",
      lastLogin: "2024-03-10 16:45",
      email: "zhao.tech@company.com",
      permissions: ["数据采集", "标签打印", "设备管理"]
    }
  ]);

  // Current editing states
  const [selectedWasteRecord, setSelectedWasteRecord] = useState<WasteInfoRecord | null>(null);
  const [selectedSubAccount, setSelectedSubAccount] = useState<SubAccount | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Waste info form state
  const [wasteInfoForm, setWasteInfoForm] = useState<WasteInfoForm>({
    wasteId: "",
    facilityCode: "",
    wasteName: "",
    wasteCategory: "",
    wasteCode: "",
    wasteForm: "",
    mainComponents: "",
    harmfulComponents: "",
    precautions: "",
    hazardousProperties: ""
  });

  // Sub account form state
  const [subAccountForm, setSubAccountForm] = useState({
    username: "",
    email: "",
    role: "操作员" as SubAccount["role"],
    status: "启用" as SubAccount["status"],
    permissions: [] as string[]
  });

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

  const tabs = [
    { id: "basicInfo", label: "基础信息", icon: IdCard },
    { id: "wasteInfo", label: "危废信息录入", icon: Settings },
    { id: "subAccounts", label: "管理子账户", icon: User },
    { id: "settings", label: "系统设置", icon: Shield }
  ];

  // Waste info functions
  const handleWasteInfoChange = (field: keyof WasteInfoForm, value: string) => {
    setWasteInfoForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectWasteRecord = (record: WasteInfoRecord) => {
    setSelectedWasteRecord(record);
    setWasteInfoForm({
      wasteId: record.wasteId,
      facilityCode: record.facilityCode,
      wasteName: record.wasteName,
      wasteCategory: record.wasteCategory,
      wasteCode: record.wasteCode,
      wasteForm: record.wasteForm,
      mainComponents: record.mainComponents,
      harmfulComponents: record.harmfulComponents,
      precautions: record.precautions,
      hazardousProperties: record.hazardousProperties
    });
    setIsCreatingNew(false);
  };

  const handleNewWasteInfo = () => {
    setSelectedWasteRecord(null);
    setWasteInfoForm({
      wasteId: "",
      facilityCode: "",
      wasteName: "",
      wasteCategory: "",
      wasteCode: "",
      wasteForm: "",
      mainComponents: "",
      harmfulComponents: "",
      precautions: "",
      hazardousProperties: ""
    });
    setIsCreatingNew(true);
  };

  const handleSaveWasteInfo = () => {
    if (isCreatingNew) {
      // Create new record
      const newRecord: WasteInfoRecord = {
        id: (wasteInfoRecords.length + 1).toString(),
        ...wasteInfoForm,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        status: "active"
      };
      setWasteInfoRecords(prev => [newRecord, ...prev]);
      setSelectedWasteRecord(newRecord);
    } else if (selectedWasteRecord) {
      // Update existing record
      setWasteInfoRecords(prev => prev.map(record => 
        record.id === selectedWasteRecord.id 
          ? { ...record, ...wasteInfoForm, updatedAt: new Date().toISOString().split('T')[0] }
          : record
      ));
      setSelectedWasteRecord({...selectedWasteRecord, ...wasteInfoForm});
    }
    setIsCreatingNew(false);
    alert(isCreatingNew ? "危废信息已成功创建" : "危废信息已成功更新");
  };

  // Sub account functions
  const handleSelectSubAccount = (account: SubAccount) => {
    setSelectedSubAccount(account);
    setSubAccountForm({
      username: account.username,
      email: account.email || "",
      role: account.role,
      status: account.status,
      permissions: account.permissions || []
    });
    setIsCreatingNew(false);
  };

  const handleNewSubAccount = () => {
    setSelectedSubAccount(null);
    setSubAccountForm({
      username: "",
      email: "",
      role: "操作员",
      status: "启用",
      permissions: []
    });
    setIsCreatingNew(true);
  };

  const handleSaveSubAccount = () => {
    if (isCreatingNew) {
      // Create new account
      const newAccount: SubAccount = {
        id: (subAccounts.length + 1).toString(),
        ...subAccountForm,
        lastLogin: "从未登录"
      };
      setSubAccounts(prev => [newAccount, ...prev]);
      setSelectedSubAccount(newAccount);
    } else if (selectedSubAccount) {
      // Update existing account
      setSubAccounts(prev => prev.map(account => 
        account.id === selectedSubAccount.id 
          ? { ...account, ...subAccountForm }
          : account
      ));
      setSelectedSubAccount({...selectedSubAccount, ...subAccountForm});
    }
    setIsCreatingNew(false);
    alert(isCreatingNew ? "子账户已成功创建" : "子账户已成功更新");
  };

  const handleDeleteSubAccount = (id: string) => {
    if (confirm("确定要删除此子账户吗？")) {
      setSubAccounts(prev => prev.filter(account => account.id !== id));
      if (selectedSubAccount?.id === id) {
        setSelectedSubAccount(null);
        setSubAccountForm({
          username: "",
          email: "",
          role: "操作员",
          status: "启用",
          permissions: []
        });
      }
    }
  };

  const handleLogout = () => {
    if (confirm("确定要退出登录吗？")) {
      console.log("User logged out");
      alert("已退出登录");
    }
  };

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

  const [showApiToken, setShowApiToken] = useState(false);

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

  // Render basic info tab content
  const renderBasicInfoTab = () => (
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

        {/* Certificate Status Section */}


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

  // Render waste info tab content
  const renderWasteInfoTab = () => (
    <div className="flex h-full">
      {/* Left Panel - Records List */}
      <div className="w-[40%] bg-[#1E1E2E] border-r border-gray-700/50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-700/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">危废信息列表</h3>
              <p className="text-sm text-gray-400">已录入 {wasteInfoRecords.length} 条记录</p>
            </div>
            <Button
              onClick={handleNewWasteInfo}
              className="bg-safety-green hover:bg-safety-green/80 text-white"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              新增
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="搜索危废ID、名称或代码..."
              className="bg-gray-700/50 border-gray-600 text-white pl-10"
            />
          </div>
        </div>

        {/* Records List */}
        <div className="flex-1 overflow-auto p-4 space-y-3">
          {wasteInfoRecords.map((record) => (
            <div
              key={record.id}
              onClick={() => handleSelectWasteRecord(record)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedWasteRecord?.id === record.id
                  ? "bg-industrial-blue/20 border-industrial-blue/50"
                  : "bg-gray-700/30 border-gray-600/30 hover:bg-gray-700/50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-white font-medium">{record.wasteId}</span>
                  <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                    record.status === "active" 
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-gray-500/20 text-gray-400"
                  }`}>
                    {record.status === "active" ? "使用中" : "已停用"}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{record.updatedAt}</span>
              </div>
              <h4 className="text-white font-medium mb-1">{record.wasteName}</h4>
              <p className="text-sm text-gray-400 mb-1">代码: {record.wasteCode}</p>
              <p className="text-sm text-gray-400">设施: {record.facilityCode}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Edit Form */}
      <div className="flex-1 bg-gray-900 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              {isCreatingNew ? "新增危废信息" : selectedWasteRecord ? "编辑危废信息" : "选择危废记录"}
            </h3>
            {selectedWasteRecord && (
              <p className="text-sm text-gray-400">
                最后更新: {selectedWasteRecord.updatedAt}
              </p>
            )}
          </div>

          {(selectedWasteRecord || isCreatingNew) ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">危废ID</label>
                  <Input
                    value={wasteInfoForm.wasteId}
                    onChange={(e) => handleWasteInfoChange("wasteId", e.target.value)}
                    placeholder="输入危废ID"
                    className="bg-gray-700/50 border-gray-600 text-white h-12"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">设施编码ID</label>
                  <Input
                    value={wasteInfoForm.facilityCode}
                    onChange={(e) => handleWasteInfoChange("facilityCode", e.target.value)}
                    placeholder="输入设施编码"
                    className="bg-gray-700/50 border-gray-600 text-white h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">危废名称</label>
                  <Input
                    value={wasteInfoForm.wasteName}
                    onChange={(e) => handleWasteInfoChange("wasteName", e.target.value)}
                    placeholder="输入危废名称"
                    className="bg-gray-700/50 border-gray-600 text-white h-12"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">危废种类</label>
                  <Input
                    value={wasteInfoForm.wasteCategory}
                    onChange={(e) => handleWasteInfoChange("wasteCategory", e.target.value)}
                    placeholder="输入危废种类"
                    className="bg-gray-700/50 border-gray-600 text-white h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">危废代码</label>
                  <Input
                    value={wasteInfoForm.wasteCode}
                    onChange={(e) => handleWasteInfoChange("wasteCode", e.target.value)}
                    placeholder="输入危废代码"
                    className="bg-gray-700/50 border-gray-600 text-white h-12"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">废物形态</label>
                  <Input
                    value={wasteInfoForm.wasteForm}
                    onChange={(e) => handleWasteInfoChange("wasteForm", e.target.value)}
                    placeholder="输入废物形态"
                    className="bg-gray-700/50 border-gray-600 text-white h-12"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-300">主要成分</label>
                <Textarea
                  value={wasteInfoForm.mainComponents}
                  onChange={(e) => handleWasteInfoChange("mainComponents", e.target.value)}
                  placeholder="描述主要成分"
                  className="bg-gray-700/50 border-gray-600 text-white min-h-[100px]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-300">有害成分</label>
                <Textarea
                  value={wasteInfoForm.harmfulComponents}
                  onChange={(e) => handleWasteInfoChange("harmfulComponents", e.target.value)}
                  placeholder="描述有害成分"
                  className="bg-gray-700/50 border-gray-600 text-white min-h-[100px]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-300">注意事项</label>
                <Textarea
                  value={wasteInfoForm.precautions}
                  onChange={(e) => handleWasteInfoChange("precautions", e.target.value)}
                  placeholder="输入注意事项"
                  className="bg-gray-700/50 border-gray-600 text-white min-h-[100px]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-300">危险特性</label>
                <Textarea
                  value={wasteInfoForm.hazardousProperties}
                  onChange={(e) => handleWasteInfoChange("hazardousProperties", e.target.value)}
                  placeholder="描述危险特性"
                  className="bg-gray-700/50 border-gray-600 text-white min-h-[100px]"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSaveWasteInfo}
                  className="bg-safety-green hover:bg-safety-green/80 text-white px-6 py-2"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isCreatingNew ? "保存并创建" : "保存修改"}
                </Button>
                {!isCreatingNew && (
                  <Button
                    variant="outline"
                    onClick={() => setSelectedWasteRecord(null)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
                  >
                    取消编辑
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <Settings className="w-16 h-16 text-gray-500 mb-4" />
              <h4 className="text-lg font-medium text-gray-300 mb-2">选择危废记录</h4>
              <p className="text-gray-500 mb-4">从左侧列表中选择一个危废记录进行编辑</p>
              <Button
                onClick={handleNewWasteInfo}
                className="bg-industrial-blue hover:bg-industrial-blue/80 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                或创建新记录
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render sub accounts tab content
  const renderSubAccountsTab = () => (
    <div className="flex h-full">
      {/* Left Panel - Accounts List */}
      <div className="w-[40%] bg-[#1E1E2E] border-r border-gray-700/50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-700/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">子账户列表</h3>
              <p className="text-sm text-gray-400">管理 {subAccounts.length} 个子账户</p>
            </div>
            <Button
              onClick={handleNewSubAccount}
              className="bg-industrial-blue hover:bg-industrial-blue/80 text-white"
              size="sm"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              新增
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="搜索用户名或邮箱..."
              className="bg-gray-700/50 border-gray-600 text-white pl-10"
            />
          </div>
        </div>

        {/* Accounts List */}
        <div className="flex-1 overflow-auto p-4 space-y-3">
          {subAccounts.map((account) => (
            <div
              key={account.id}
              onClick={() => handleSelectSubAccount(account)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedSubAccount?.id === account.id
                  ? "bg-industrial-blue/20 border-industrial-blue/50"
                  : "bg-gray-700/30 border-gray-600/30 hover:bg-gray-700/50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gray-600 text-white">
                      {account.username.substring(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{account.username}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        account.status === "启用" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}>
                        {account.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{account.email}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSubAccount(account.id);
                  }}
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  account.role === "管理员" ? "bg-orange-500/20 text-orange-400" :
                  account.role === "操作员" ? "bg-blue-500/20 text-blue-400" :
                  "bg-gray-500/20 text-gray-400"
                }`}>
                  {account.role}
                </span>
                <span className="text-xs text-gray-400">
                  {account.lastLogin}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Edit Form */}
      <div className="flex-1 bg-gray-900 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              {isCreatingNew ? "新增子账户" : selectedSubAccount ? "编辑子账户" : "选择子账户"}
            </h3>
            {selectedSubAccount && (
              <p className="text-sm text-gray-400">
                最后登录: {selectedSubAccount.lastLogin}
              </p>
            )}
          </div>

          {(selectedSubAccount || isCreatingNew) ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">用户名</label>
                  <Input
                    value={subAccountForm.username}
                    onChange={(e) => setSubAccountForm(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="输入用户名"
                    className="bg-gray-700/50 border-gray-600 text-white h-12"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">邮箱地址</label>
                  <Input
                    type="email"
                    value={subAccountForm.email}
                    onChange={(e) => setSubAccountForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="输入邮箱地址"
                    className="bg-gray-700/50 border-gray-600 text-white h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">角色权限</label>
                  <select
                    value={subAccountForm.role}
                    onChange={(e) => setSubAccountForm(prev => ({ ...prev, role: e.target.value as SubAccount["role"] }))}
                    className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 h-12"
                  >
                    <option value="管理员">管理员</option>
                    <option value="操作员">操作员</option>
                    <option value="查看者">查看者</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">账户状态</label>
                  <select
                    value={subAccountForm.status}
                    onChange={(e) => setSubAccountForm(prev => ({ ...prev, status: e.target.value as SubAccount["status"] }))}
                    className="w-full bg-gray-700/50 border border-gray-600 text-white rounded-lg px-4 py-3 h-12"
                  >
                    <option value="启用">启用</option>
                    <option value="停用">停用</option>
                  </select>
                </div>
              </div>

              {isCreatingNew && (
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">初始密码</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="输入初始密码"
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
              )}

              <div className="space-y-3">
                <label className="text-sm text-gray-300">功能权限</label>
                <div className="grid grid-cols-2 gap-3">
                  {["数据采集", "标签打印", "历史记录查看", "设备管理", "系统设置", "用户管理"].map((permission) => (
                    <label key={permission} className="flex items-center gap-2 p-3 bg-gray-700/30 rounded-lg cursor-pointer hover:bg-gray-700/50">
                      <input
                        type="checkbox"
                        checked={subAccountForm.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSubAccountForm(prev => ({
                              ...prev,
                              permissions: [...prev.permissions, permission]
                            }));
                          } else {
                            setSubAccountForm(prev => ({
                              ...prev,
                              permissions: prev.permissions.filter(p => p !== permission)
                            }));
                          }
                        }}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-white text-sm">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSaveSubAccount}
                  className="bg-industrial-blue hover:bg-industrial-blue/80 text-white px-6 py-2"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isCreatingNew ? "创建账户" : "保存修改"}
                </Button>
                {!isCreatingNew && (
                  <Button
                    variant="outline"
                    onClick={() => setSelectedSubAccount(null)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
                  >
                    取消编辑
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <User className="w-16 h-16 text-gray-500 mb-4" />
              <h4 className="text-lg font-medium text-gray-300 mb-2">选择子账户</h4>
              <p className="text-gray-500 mb-4">从左侧列表中选择一个子账户进行编辑</p>
              <Button
                onClick={handleNewSubAccount}
                className="bg-industrial-blue hover:bg-industrial-blue/80 text-white"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                或创建新账户
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render settings tab content
  const renderSettingsTab = () => (
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
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as PersonalCenterTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? "bg-industrial-blue text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "basicInfo" && renderBasicInfoTab()}
        {activeTab === "wasteInfo" && renderWasteInfoTab()}
        {activeTab === "subAccounts" && renderSubAccountsTab()}
        {activeTab === "settings" && renderSettingsTab()}
      </div>
    </div>
  );
}