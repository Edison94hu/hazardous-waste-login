import { Building, Bluetooth, BluetoothConnected, BluetoothSearching } from "lucide-react";
import { BluetoothStatus } from "./StatusBadge";

interface IOSNavigationBarProps {
  bluetoothStatus: BluetoothStatus;
  companyName: string;
}

export function IOSNavigationBar({ bluetoothStatus, companyName }: IOSNavigationBarProps) {
  const getBluetoothIcon = (status: BluetoothStatus) => {
    switch (status) {
      case "connected":
        return <BluetoothConnected className="w-5 h-5 text-blue-500" />;
      case "searching":
        return <BluetoothSearching className="w-5 h-5 text-blue-500 animate-pulse" />;
      case "disconnected":
        return <Bluetooth className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: BluetoothStatus) => {
    switch (status) {
      case "connected":
        return "已连接";
      case "searching":
        return "搜索中";
      case "disconnected":
        return "未连接";
    }
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left side - Logo and Product Name */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
          <Building className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">危废标签打印</h1>
          <p className="text-xs text-gray-500">Hazardous Waste Label Printing</p>
        </div>
      </div>

      {/* Right side - Company and Bluetooth Status */}
      <div className="flex items-center gap-6">
        <div className="text-right">
          <div className="text-base font-medium text-gray-900">{companyName}</div>
          <div className="text-sm text-gray-500">企业管理系统</div>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
          {getBluetoothIcon(bluetoothStatus)}
          <span className="text-sm font-medium text-gray-700">
            {getStatusText(bluetoothStatus)}
          </span>
        </div>
      </div>
    </div>
  );
}