import { useState } from "react";
import { 
  User,
  UserPlus,
  Save,
  Eye,
  EyeOff,
  Search,
  Trash2
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface SubAccount {
  id: string;
  username: string;
  role: "管理员" | "操作员" | "查看者";
  status: "启用" | "停用";
  lastLogin: string;
  email?: string;
  permissions?: string[];
}

export function ProfileAccounts() {
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
  const [selectedSubAccount, setSelectedSubAccount] = useState<SubAccount | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Sub account form state
  const [subAccountForm, setSubAccountForm] = useState({
    username: "",
    email: "",
    role: "操作员" as SubAccount["role"],
    status: "启用" as SubAccount["status"],
    permissions: [] as string[]
  });

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

  return (
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
}
