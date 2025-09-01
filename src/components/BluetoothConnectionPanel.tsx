import { useState, useEffect } from "react";
import { 
  X, 
  Search, 
  RefreshCw, 
  Bluetooth, 
  Signal, 
  CheckCircle, 
  AlertCircle,
  Scale,
  Printer,
  Battery,
  Clock
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";

type DeviceType = 'scale' | 'printer';
type PanelState = 'scanning' | 'pairing' | 'connected' | 'error';

interface DiscoveredDevice {
  id: string;
  name: string;
  address: string;
  rssi: number;
  lastSeen: string;
  deviceType: DeviceType;
}

interface BluetoothConnectionPanelProps {
  deviceType: DeviceType;
  onClose: () => void;
  onConnectionSuccess: () => void;
}

export function BluetoothConnectionPanel({ 
  deviceType, 
  onClose, 
  onConnectionSuccess 
}: BluetoothConnectionPanelProps) {
  const [panelState, setPanelState] = useState<PanelState>('scanning');
  const [searchQuery, setSearchQuery] = useState('');
  const [discoveredDevices, setDiscoveredDevices] = useState<DiscoveredDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<DiscoveredDevice | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [autoConnect, setAutoConnect] = useState(true);
  const [pairingPin, setPairingPin] = useState('');
  const [connectionProgress, setConnectionProgress] = useState(0);
  const [connectionMessage, setConnectionMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Mock devices for demonstration
  const mockDevices: DiscoveredDevice[] = [
    {
      id: '1',
      name: 'Sartorius BSA124S',
      address: '00:1B:DC:07:31:AE',
      rssi: -45,
      lastSeen: '刚刚',
      deviceType: 'scale'
    },
    {
      id: '2',
      name: 'Sartorius Cubis II',
      address: '00:1B:DC:07:32:BF',
      rssi: -62,
      lastSeen: '2分钟前',
      deviceType: 'scale'
    },
    {
      id: '3',
      name: 'Brother QL-820NWB',
      address: '00:80:77:31:A6:C8',
      rssi: -38,
      lastSeen: '刚刚',
      deviceType: 'printer'
    },
    {
      id: '4',
      name: 'Brother QL-1110NWB',
      address: '00:80:77:31:A7:D9',
      rssi: -55,
      lastSeen: '1分钟前',
      deviceType: 'printer'
    }
  ];

  // Simulate device discovery
  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        const filteredDevices = mockDevices.filter(device => 
          device.deviceType === deviceType &&
          (searchQuery === '' || 
           device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           device.address.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setDiscoveredDevices(filteredDevices);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isScanning, searchQuery, deviceType]);

  const getDeviceTypeInfo = () => {
    switch (deviceType) {
      case 'scale':
        return {
          icon: Scale,
          title: '蓝牙称重机',
          description: '搜索并连接蓝牙称重设备'
        };
      case 'printer':
        return {
          icon: Printer,
          title: '蓝牙标签打印机',
          description: '搜索并连接蓝牙打印设备'
        };
    }
  };

  const getSignalStrength = (rssi: number) => {
    if (rssi > -50) return 4;
    if (rssi > -60) return 3;
    if (rssi > -70) return 2;
    return 1;
  };

  const renderSignalBars = (rssi: number) => {
    const strength = getSignalStrength(rssi);
    return (
      <div className="flex items-end gap-0.5">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className={`w-1 rounded-sm transition-colors ${
              i < strength 
                ? 'bg-safety-green' 
                : 'bg-gray-600'
            }`}
            style={{ height: `${6 + i * 2}px` }}
          />
        ))}
      </div>
    );
  };

  const handleDeviceConnect = async (device: DiscoveredDevice) => {
    setSelectedDevice(device);
    setPanelState('pairing');
    setConnectionProgress(0);
    setConnectionMessage('正在配对...');

    // Simulate connection process
    const steps = [
      { progress: 20, message: '正在配对...' },
      { progress: 40, message: '请求权限...' },
      { progress: 60, message: '建立连接...' },
      { progress: 80, message: '验证设备...' },
      { progress: 100, message: '连接成功!' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setConnectionProgress(step.progress);
      setConnectionMessage(step.message);
    }

    // Check if we need PIN for this device (simulate)
    if (Math.random() > 0.7) {
      // Some devices require PIN
      setConnectionMessage('请输入配对码');
      return;
    }

    setTimeout(() => {
      setPanelState('connected');
    }, 500);
  };

  const handlePinSubmit = () => {
    if (pairingPin.length === 6) {
      setConnectionMessage('验证配对码...');
      setConnectionProgress(100);
      setTimeout(() => {
        setPanelState('connected');
      }, 1000);
    }
  };

  const handleRetry = () => {
    setPanelState('scanning');
    setSelectedDevice(null);
    setConnectionProgress(0);
    setConnectionMessage('');
    setErrorMessage('');
    setPairingPin('');
    setIsScanning(true);
  };

  const handleComplete = () => {
    onConnectionSuccess();
    onClose();
  };

  const handleRefresh = () => {
    setIsScanning(true);
    setDiscoveredDevices([]);
    setTimeout(() => setIsScanning(false), 2000);
  };

  const deviceTypeInfo = getDeviceTypeInfo();
  const DeviceIcon = deviceTypeInfo.icon;

  return (
    <div className="w-full h-full bg-black/60 backdrop-blur-sm flex items-center justify-end">
      <div className="w-[520px] h-full bg-gray-800/95 border-l border-gray-700/50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 p-6 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-industrial-blue/20 flex items-center justify-center">
                <DeviceIcon className="w-5 h-5 text-industrial-blue" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">{deviceTypeInfo.title}</h2>
                <p className="text-sm text-gray-400">{deviceTypeInfo.description}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {panelState === 'scanning' && (
            <>
              {/* Search Section */}
              <div className="flex-shrink-0 p-6 border-b border-gray-700/50">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      placeholder="搜索设备名/地址"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400"
                    />
                  </div>
                  <Button
                    onClick={handleRefresh}
                    variant="outline"
                    size="default"
                    disabled={isScanning}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
              </div>

              {/* Device List */}
              <div className="flex-1 overflow-y-auto p-6">
                {isScanning ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <Search className="w-12 h-12 text-industrial-blue animate-pulse mx-auto mb-4" />
                      <p className="text-gray-300">正在搜索设备...</p>
                    </div>
                  </div>
                ) : discoveredDevices.length > 0 ? (
                  <div className="space-y-3">
                    {discoveredDevices.map((device) => (
                      <div
                        key={device.id}
                        className="bg-gray-700/40 border border-gray-600/50 rounded-lg p-4 hover:bg-gray-700/60 
                                 transition-all duration-200 cursor-pointer"
                        onClick={() => handleDeviceConnect(device)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Bluetooth className="w-5 h-5 text-industrial-blue" />
                            <div>
                              <div className="text-sm font-medium text-white">{device.name}</div>
                              <div className="text-xs text-gray-400">{device.address}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              {renderSignalBars(device.rssi)}
                              <span className="text-xs text-gray-400 ml-1">{device.rssi}dBm</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Clock className="w-3 h-3" />
                              {device.lastSeen}
                            </div>
                            <Button
                              size="sm"
                              className="bg-industrial-blue hover:bg-industrial-blue/80 text-white"
                            >
                              连接
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 mb-2">未发现设备</p>
                      <p className="text-sm text-gray-400">请确保设备已开启并处于可发现模式</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {panelState === 'pairing' && selectedDevice && (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 rounded-full bg-industrial-blue/20 flex items-center justify-center mx-auto mb-6">
                  <Bluetooth className="w-10 h-10 text-industrial-blue animate-pulse" />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">连接中</h3>
                <p className="text-sm text-gray-400 mb-6">正在连接到 {selectedDevice.name}</p>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div 
                    className="bg-industrial-blue h-2 rounded-full transition-all duration-500"
                    style={{ width: `${connectionProgress}%` }}
                  />
                </div>
                
                <p className="text-sm text-gray-300 mb-6">{connectionMessage}</p>
                
                {connectionMessage.includes('配对码') && (
                  <div className="space-y-4">
                    <Input
                      placeholder="输入6位配对码"
                      value={pairingPin}
                      onChange={(e) => setPairingPin(e.target.value.slice(0, 6))}
                      className="bg-gray-700/50 border-gray-600/50 text-white text-center text-lg tracking-widest"
                      maxLength={6}
                    />
                    <Button
                      onClick={handlePinSubmit}
                      disabled={pairingPin.length !== 6}
                      className="w-full bg-industrial-blue hover:bg-industrial-blue/80 text-white"
                    >
                      确认配对
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {panelState === 'connected' && selectedDevice && (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 rounded-full bg-safety-green/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-safety-green" />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">连接成功</h3>
                <p className="text-sm text-gray-400 mb-6">已成功连接到 {selectedDevice.name}</p>
                
                <div className="bg-gray-700/40 border border-gray-600/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">下次自动连接</span>
                    <Switch
                      checked={autoConnect}
                      onCheckedChange={setAutoConnect}
                    />
                  </div>
                </div>
                
                <Button
                  onClick={handleComplete}
                  className="w-full bg-safety-green hover:bg-safety-green/80 text-white"
                >
                  完成
                </Button>
              </div>
            </div>
          )}

          {panelState === 'error' && (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 rounded-full bg-warning-red/20 flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-10 h-10 text-warning-red" />
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">连接失败</h3>
                <p className="text-sm text-gray-400 mb-6">{errorMessage || '连接失败，请重试'}</p>
                
                <div className="space-y-3">
                  <Button
                    onClick={handleRetry}
                    className="w-full bg-industrial-blue hover:bg-industrial-blue/80 text-white"
                  >
                    重试扫描
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    返回
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}