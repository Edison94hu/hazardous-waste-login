import { useState } from "react";
import { Maximize2, Eye } from "lucide-react";

interface LabelData {
  wasteType: string;
  wasteCode: string;
  weight: string;
  unit: string;
  batchNumber: string;
  operator: string;
  generateTime: string;
}

interface iOSLabelPreviewProps {
  labelData: LabelData | null;
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
}

export function iOSLabelPreview({ 
  labelData, 
  selectedTemplate, 
  onTemplateChange 
}: iOSLabelPreviewProps) {
  const templates = [
    { value: "standard", label: "标准模板 (80×50mm)" },
    { value: "compact", label: "紧凑模板 (80×40mm)" },
    { value: "detailed", label: "详细模板 (80×60mm)" }
  ];

  const renderLabelContent = () => {
    if (!labelData || !labelData.wasteType) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
          <Eye className="w-8 h-8 mb-2" />
          <span className="text-sm">请填写标签信息以预览</span>
        </div>
      );
    }

    return (
      <div className="w-full h-full p-3 text-xs bg-white border-2 border-dashed border-gray-300 relative overflow-hidden">
        {/* 标签头部 */}
        <div className="text-center mb-2">
          <h3 className="font-bold text-red-600 text-sm">危险废物标签</h3>
          <div className="text-xs text-gray-800">HAZARDOUS WASTE LABEL</div>
        </div>
        
        {/* 主要信息 */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="font-medium">废物名称:</span>
            <span className="text-right flex-1 ml-1 truncate">{labelData.wasteType}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">废物代码:</span>
            <span className="text-right flex-1 ml-1">{labelData.wasteCode}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">重量:</span>
            <span className="text-right flex-1 ml-1">{labelData.weight} {labelData.unit}</span>
          </div>
          {labelData.batchNumber && (
            <div className="flex justify-between">
              <span className="font-medium">批次:</span>
              <span className="text-right flex-1 ml-1">{labelData.batchNumber}</span>
            </div>
          )}
          {labelData.operator && (
            <div className="flex justify-between">
              <span className="font-medium">经办人:</span>
              <span className="text-right flex-1 ml-1">{labelData.operator}</span>
            </div>
          )}
        </div>

        {/* 二维码占位 */}
        <div className="absolute bottom-2 right-2 w-8 h-8 bg-gray-200 flex items-center justify-center text-xs rounded">
          QR
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">标签预览</h3>
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>
      
      {/* 模板选择 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">模板选择</label>
        <select
          value={selectedTemplate}
          onChange={(e) => onTemplateChange(e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        >
          {templates.map((template) => (
            <option key={template.value} value={template.value}>
              {template.label}
            </option>
          ))}
        </select>
      </div>

      {/* 标签预览区域 */}
      <div className="bg-gray-50 p-4 rounded-xl">
        <div className="mx-auto bg-white rounded-lg shadow-sm" style={{ width: '240px', height: '150px' }}>
          {renderLabelContent()}
        </div>
        <div className="text-xs text-gray-500 text-center mt-2">
          预览尺寸：80×50mm（按比例显示）
        </div>
      </div>
    </div>
  );
}