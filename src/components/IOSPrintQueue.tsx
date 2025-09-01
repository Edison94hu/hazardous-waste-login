import { Clock, CheckCircle, XCircle, Trash2, RotateCcw } from "lucide-react";

export type QueueItemStatus = "pending" | "printing" | "completed" | "failed";

export interface QueueItem {
  id: string;
  templateName: string;
  wasteType: string;
  quantity: number;
  status: QueueItemStatus;
  timestamp: string;
}

interface IOSPrintQueueProps {
  queueItems: QueueItem[];
  onDeleteItem: (id: string) => void;
  onRetryItem: (id: string) => void;
}

export function IOSPrintQueue({ queueItems, onDeleteItem, onRetryItem }: IOSPrintQueueProps) {
  const getStatusConfig = (status: QueueItemStatus) => {
    switch (status) {
      case "pending":
        return {
          icon: Clock,
          text: "排队中",
          color: "text-blue-600",
          bgColor: "bg-blue-100"
        };
      case "printing":
        return {
          icon: Clock,
          text: "打印中",
          color: "text-orange-600",
          bgColor: "bg-orange-100"
        };
      case "completed":
        return {
          icon: CheckCircle,
          text: "已完成",
          color: "text-green-600",
          bgColor: "bg-green-100"
        };
      case "failed":
        return {
          icon: XCircle,
          text: "失败",
          color: "text-red-600",
          bgColor: "bg-red-100"
        };
    }
  };

  if (queueItems.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">打印队列</h3>
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-4">暂无打印任务</p>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors">
            新建标签任务
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          打印队列 ({queueItems.length})
        </h3>
        <button className="text-sm text-blue-500 hover:text-blue-600 font-medium">
          全部清空
        </button>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {queueItems.map((item) => {
          const statusConfig = getStatusConfig(item.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              {/* 缩略图占位 */}
              <div className="w-12 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-xs text-gray-400">标签</span>
              </div>
              
              {/* 信息区域 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900 truncate">
                    {item.templateName}
                  </span>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${statusConfig.bgColor}`}>
                    <StatusIcon className={`w-3 h-3 ${statusConfig.color}`} />
                    <span className={`text-xs font-medium ${statusConfig.color}`}>
                      {statusConfig.text}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {item.wasteType} × {item.quantity}
                </div>
                <div className="text-xs text-gray-400">
                  {item.timestamp}
                </div>
              </div>
              
              {/* 操作按钮 */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {item.status === "failed" && (
                  <button
                    onClick={() => onRetryItem(item.id)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}