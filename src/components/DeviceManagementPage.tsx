import { useState } from "react";
import { 
  Settings,
  Tablet,
  Wifi,
  WifiOff,
  Signal,
  Scale,
  Bluetooth,
  Printer,
  Battery,
  HardDrive,
  Smartphone,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  TestTube,
  Power,
  RefreshCw,
  Calendar,
  Clock,
  Download,
  FileText,
  Router,
  Radio
} from "lucide-react";
import { Button } from "./ui/button";
import { BluetoothConnectionPanel } from "./BluetoothConnectionPanel";
import { ServiceExtensionModal } from "./ServiceExtensionModal";

type ConnectionPanelMode = "scale" | "printer" | null;

export function DeviceManagementPage() {
  const [connectionPanelMode, setConnectionPanelMode] = useState<ConnectionPanelMode>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Mock data
  const [deviceInfo] = useState({
    model: "iPad Pro 12.9-inch (6th generation)",
    systemVersion: "iPadOS 17.4.1",
    storage: "512 GB",
    batteryLevel: 85,
    serialNumber: "DMQK2LL/A"
  });

  const [networkInfo] = useState({
    isConnected: true,
    ssid: "Factory-WiFi-5G",
    ipAddress: "192.168.1.156",
    signalStrength: 4, // 0-4 scale
    speed: "867 Mbps"
  });

  const [cellularInfo] = useState({
    carrier: "中国移动",
    networkType: "5G",
    signalStrength: 3, // 0-4 scale
    simStatus: "已激活",
    dataUsage: "2.3 GB"
  });

  const [connectedDevices] = useState([
    {
      id: "scale",
      name: "蓝牙称重机",
      model: "XK3190-A12+E",
      status: "connected" as const,
      batteryLevel: 78,
      lastConnect: "2分钟前"
    },
    {
      id: "printer",
      name: "标签打印机",
      model: "TSC TTP-244 Pro",
      status: "disconnected" as const,
      batteryLevel: null,
      lastConnect: "1小时前"
    }
  ]);

  const [appInfo] = useState({
    version: "v2.1.3",
    buildTime: "2024-03-15 14:32",
    channel: "企业版"
  });

  const [serviceInfo] = useState({
    serviceDays: 256,
    expiryDate: '2026-08-15',
    startDate: '2025-08-20'
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const handleConnectionSuccess = (deviceType: ConnectionPanelMode) => {
    console.log(`${deviceType} connected successfully`);
    setConnectionPanelMode(null);
  };

  const getSignalIcon = (strength: number) => {
    if (strength >= 4) return <Signal className="w-4 h-4 text-green-400" />;
    if (strength >= 3) return <Signal className="w-4 h-4 text-yellow-400" />;
    if (strength >= 2) return <Signal className="w-4 h-4 text-orange-400" />;
    return <Signal className="w-4 h-4 text-red-400" />;
  };

  const getBatteryColor = (level: number) => {
    if (level >= 80) return "text-green-400";
    if (level >= 50) return "text-yellow-400";
    if (level >= 20) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 overflow-hidden relative">
      {/* Page Header */}
      <div className="flex-shrink-0 bg-[#1E1E2E]/90 border-b border-gray-700/50 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-industrial-blue/20 flex items-center justify-center">
              <Settings className="w-6 h-6 text-industrial-blue" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">设备管理</h1>
              <p className="text-gray-400">设备连接状态与系统信息监控</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-industrial-blue hover:bg-industrial-blue-dark text-white shadow-lg 
                         hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 
                         disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              刷新状态
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Upper Section: Two Column Layout */}
          <div className="grid grid-cols-5 gap-6 h-[500px]">
            {/* Left Column: System Information (2/5 width) */}
            <div className="col-span-2 space-y-6">
              {/* iPad Information Card */}
              <div className="bg-[#1E1E2E] rounded-2xl p-6 shadow-lg border border-gray-700/30 h-[140px]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-700/50 flex items-center justify-center">
                    <Tablet className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">iPad 信息</h3>
                    <p className="text-xs text-gray-400">设备硬件与系统信息</p>
                  </div>
                </div>
                
                <div className="space-y-3 pb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">设备型号</span>
                    <span className="text-xs text-white font-medium">iPad Pro 12.9"</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">系统版本</span>
                    <span className="text-xs text-white font-medium">{deviceInfo.systemVersion}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">存储/电量</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white font-medium">{deviceInfo.storage}</span>
                      <Battery className={`w-4 h-4 ${getBatteryColor(deviceInfo.batteryLevel)}`} />
                      <span className={`text-xs font-medium ${getBatteryColor(deviceInfo.batteryLevel)}`}>
                        {deviceInfo.batteryLevel}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Combined Network Information Card */}
              <div className="bg-[#1E1E2E] rounded-2xl p-6 shadow-lg border border-gray-700/30 h-[320px]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gray-700/50 flex items-center justify-center">
                    <Signal className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">网络连接信息</h3>
                    <p className="text-xs text-gray-400">Wi-Fi 与蜂窝网络连接状态</p>
                  </div>
                </div>
                
                {/* Wi-Fi Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    {networkInfo.isConnected ? (
                      <Wifi className="w-4 h-4 text-green-400" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-red-400" />
                    )}
                    <span className="text-sm font-medium text-white">Wi-Fi 连接</span>
                  </div>
                  
                  <div className="space-y-2 pl-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">网络名称</span>
                      <span className="text-xs text-white font-medium">{networkInfo.ssid}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">IP 地址</span>
                      <span className="text-xs text-white font-medium">{networkInfo.ipAddress}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">信号/速度</span>
                      <div className="flex items-center gap-2">
                        {getSignalIcon(networkInfo.signalStrength)}
                        <span className="text-xs text-white font-medium">{networkInfo.speed}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-600/30 mb-6"></div>

                {/* Cellular Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Radio className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-white">蜂窝网络</span>
                  </div>
                  
                  <div className="space-y-2 pl-6 pb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">运营商</span>
                      <span className="text-xs text-white font-medium">{cellularInfo.carrier}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">网络类型</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-medium">
                          {cellularInfo.networkType}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">信号/流量</span>
                      <div className="flex items-center gap-2">
                        {getSignalIcon(cellularInfo.signalStrength)}
                        <span className="text-xs text-white font-medium">{cellularInfo.dataUsage}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Device Management (3/5 width) */}
            <div className="col-span-3">
              {/* Connected Devices List */}
              <div className="bg-[#1E1E2E] rounded-2xl p-6 shadow-lg border border-gray-700/30 h-[500px]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gray-700/50 flex items-center justify-center">
                    <Bluetooth className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">已连接设备</h3>
                    <p className="text-xs text-gray-400">外接设备连接管理</p>
                  </div>
                </div>

                <div className="space-y-4 pb-4">
                  {connectedDevices.map((device) => (
                    <div key={device.id} className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-600/50 flex items-center justify-center">
                            {device.id === "scale" ? (
                              <Scale className="w-4 h-4 text-gray-300" />
                            ) : (
                              <Printer className="w-4 h-4 text-gray-300" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white">{device.name}</span>
                              {device.status === "connected" ? (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-400" />
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                              <span>{device.model}</span>
                              <span>•</span>
                              <span>最后连接: {device.lastConnect}</span>
                              {device.batteryLevel && (
                                <>
                                  <span>•</span>
                                  <Battery className={`w-3 h-3 ${getBatteryColor(device.batteryLevel)}`} />
                                  <span className={getBatteryColor(device.batteryLevel)}>{device.batteryLevel}%</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {device.status === "connected" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                            >
                              断开连接
                            </Button>
                          ) : (
                            <Button
                              onClick={() => setConnectionPanelMode(device.id as ConnectionPanelMode)}
                              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                              size="sm"
                            >
                              <Bluetooth className="w-4 h-4 mr-2" />
                              扫描并连接
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lower Section: Combined App Info and Service Period */}
          <div className="h-[180px]">
            {/* Combined App Information and Service Period Card */}
            <div className="bg-[#1E1E2E] rounded-2xl p-6 shadow-lg border border-gray-700/30 h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-700/50 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">应用与服务信息</h3>
                    <p className="text-xs text-gray-400">版本信息、构建详情与服务周期管理</p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsServiceModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                           text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  size="sm"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  延长服务
                </Button>
              </div>
              
              {/* App Info Section */}
              <div className="grid grid-cols-6 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-sm font-medium text-white">{appInfo.version}</div>
                  <div className="text-xs text-gray-400">版本号</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-white">{appInfo.buildTime}</div>
                  <div className="text-xs text-gray-400">构建时间</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-white">{appInfo.channel}</div>
                  <div className="text-xs text-gray-400">发布渠道</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-white">{serviceInfo.serviceDays}</span>
                  </div>
                  <div className="text-xs text-gray-400">已服务天数</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-white">{serviceInfo.startDate}</div>
                  <div className="text-xs text-gray-400">开始日期</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-white">{serviceInfo.expiryDate}</div>
                  <div className="text-xs text-gray-400">截止日期</div>
                </div>
              </div>

              {/* Service Progress Bar */}
              <div className="space-y-2 pb-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>服务进度</span>
                  <span>70%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: '70%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bluetooth Connection Panel */}
      {connectionPanelMode && (
        <div className="absolute inset-0 z-30">
          <BluetoothConnectionPanel
            deviceType={connectionPanelMode}
            onClose={() => setConnectionPanelMode(null)}
            onConnectionSuccess={() => handleConnectionSuccess(connectionPanelMode)}
          />
        </div>
      )}

      {/* Service Extension Modal */}
      <ServiceExtensionModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
      />
    </div>
  );
}