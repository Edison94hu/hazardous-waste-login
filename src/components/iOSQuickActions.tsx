import { FileText, ScanLine, Printer } from "lucide-react";

interface QuickActionProps {
  onSelectTemplate: () => void;
  onScanCode: () => void;
  onBatchPrint: () => void;
}

export function iOSQuickActions({ onSelectTemplate, onScanCode, onBatchPrint }: QuickActionProps) {
  const actions = [
    {
      icon: FileText,
      label: "选择模板",
      description: "从预设模板中选择",
      color: "bg-purple-500",
      lightColor: "bg-purple-100",
      onClick: onSelectTemplate
    },
    {
      icon: ScanLine,
      label: "扫码识别",
      description: "扫描二维码或条形码",
      color: "bg-green-500",
      lightColor: "bg-green-100",
      onClick: onScanCode
    },
    {
      icon: Printer,
      label: "批量打印",
      description: "批量打印多个标签",
      color: "bg-orange-500",
      lightColor: "bg-orange-100",
      onClick: onBatchPrint
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h3>
      
      <div className="grid grid-cols-3 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.onClick}
              className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:shadow-md"
            >
              <div className={`w-16 h-16 ${action.lightColor} rounded-2xl flex items-center justify-center mb-3`}>
                <Icon className={`w-8 h-8 text-${action.color.split('-')[1]}-600`} />
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900 mb-1">{action.label}</div>
                <div className="text-sm text-gray-500">{action.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}