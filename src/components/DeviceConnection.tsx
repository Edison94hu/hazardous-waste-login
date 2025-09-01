import { useState } from "react";
import { Bluetooth, Printer, RefreshCw, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

export type PrinterStatus = "ready" | "paper_empty" | "offline";

interface DeviceConnectionProps {
  printerStatus: PrinterStatus;
  onRefreshDevices: () => void;
  onReconnect: () => void;
}

export function DeviceConnection({ 
  printerStatus, 
  onRefreshDevices, 
  onReconnect 
}: DeviceConnectionProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); // 模拟刷新
    setIsRefreshing(false);
    onRefreshDevices();
  };

  const getPrinterStatusConfig = (status: PrinterStatus) => {
    switch (status) {
      case "ready":
        return {
          icon: CheckCircle,
          text: "就绪",
          description: "打印机状态正常",
          className: "bg-[--color-safety-green]/10 text-[--color-safety-green] border-[--color-safety-green]/20"
        };
      case "paper_empty":
        return {
          icon: AlertTriangle,
          text: "缺纸",
          description: "请添加标签纸",
          className: "bg-amber-500/10 text-amber-600 border-amber-500/20"
        };
      case "offline":
        return {
          icon: XCircle,
          text: "离线",
          description: "打印机未连接",
          className: "bg-[--color-warning-red]/10 text-[--color-warning-red] border-[--color-warning-red]/20"
        };
    }
  };

  const printerConfig = getPrinterStatusConfig(printerStatus);
  const PrinterIcon = printerConfig.icon;

  const bluetoothDevices = [
    { name: "TTP-244 Pro", status: "connected" as const, signal: 85 },
    { name: "TTP-244 Plus", status: "available" as const, signal: 72 },
    { name: "QL-820NWB", status: "available" as const, signal: 65 }
  ];

  return (
    <Card className="shadow-sm border-slate-200/60">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-slate-900 flex items-center gap-2">
          <Bluetooth className="w-5 h-5" />
          设备与连接
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 蓝牙设备列表 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">蓝牙设备</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-8 px-2 text-slate-600"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          
          <div className="space-y-2">
            {bluetoothDevices.map((device, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  device.status === 'connected' 
                    ? 'bg-[--color-safety-green]/5 border-[--color-safety-green]/20' 
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Bluetooth className={`w-4 h-4 ${
                    device.status === 'connected' ? 'text-[--color-safety-green]' : 'text-slate-400'
                  }`} />
                  <div>
                    <div className="text-sm font-medium text-slate-900">{device.name}</div>
                    <div className="text-xs text-slate-500">信号强度 {device.signal}%</div>
                  </div>
                </div>
                <Badge
                  variant={device.status === 'connected' ? 'default' : 'secondary'}
                  className={device.status === 'connected' 
                    ? 'bg-[--color-safety-green] text-white' 
                    : 'text-slate-600'
                  }
                >
                  {device.status === 'connected' ? '已连接' : '可用'}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* 打印机状态 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">打印机状态</span>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg border bg-slate-50">
            <div className="flex items-center gap-3">
              <PrinterIcon className={`w-5 h-5 ${printerConfig.className.split(' ')[1]}`} />
              <div>
                <div className="text-sm font-medium text-slate-900">TTP-244 Pro</div>
                <div className="text-xs text-slate-500">{printerConfig.description}</div>
              </div>
            </div>
            <Badge variant="outline" className={printerConfig.className}>
              {printerConfig.text}
            </Badge>
          </div>
        </div>

        {/* 重新连接按钮 */}
        {(printerStatus === 'offline') && (
          <Button
            onClick={onReconnect}
            variant="outline"
            className="w-full h-12 border-[--color-industrial-blue] text-[--color-industrial-blue] hover:bg-[--color-industrial-blue]/5"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            重新连接
          </Button>
        )}
      </CardContent>
    </Card>
  );
}