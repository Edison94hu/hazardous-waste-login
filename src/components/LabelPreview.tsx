import { QrCode } from "lucide-react";
import { WasteType } from "./WasteTypeCard";
import { WeightUnit, LabelSize } from "./WeightOperationPanel";

interface LabelPreviewProps {
  wasteType: WasteType | null;
  weight: string;
  weightUnit: WeightUnit;
  labelSize: LabelSize;
}

export function LabelPreview({ wasteType, weight, weightUnit, labelSize }: LabelPreviewProps) {
  // Get current date
  const currentDate = new Date().toLocaleDateString('zh-CN');
  
  // Generate digital identification code
  const digitalId = wasteType ? `DW${wasteType.code.replace(/-/g, '')}${Date.now().toString().slice(-6)}` : '';

  // Mock company data
  const companyData = {
    name: "华东化工集团有限公司",
    contact: "张经理",
    phone: "021-12345678",
    address: "上海市浦东新区化工路123号"
  };

  // Convert weight for display
  const getDisplayWeight = () => {
    if (!weight) return "";
    const numWeight = parseFloat(weight);
    if (weightUnit === "T") {
      return `${numWeight.toFixed(3)} T`;
    } else {
      return `${numWeight} KG`;
    }
  };

  // Get text size based on label size - optimized for larger preview
  const getTextSizes = () => {
    const textSizeMap = {
      "100*100": {
        header: "text-xl",
        field: "text-xs",
        content: "text-[11px]",
        minHeight: "min-h-[32px]"
      },
      "100*80": {
        header: "text-xl",
        field: "text-xs",
        content: "text-[11px]",
        minHeight: "min-h-[32px]"
      },
      "100*70": {
        header: "text-xl",
        field: "text-xs",
        content: "text-[11px]",
        minHeight: "min-h-[32px]"
      },
      "100*60": {
        header: "text-xl",
        field: "text-xs",
        content: "text-[11px]",
        minHeight: "min-h-[32px]"
      },
      "150*150": {
        header: "text-2xl",
        field: "text-sm",
        content: "text-xs",
        minHeight: "min-h-[38px]"
      },
      "200*200": {
        header: "text-3xl",
        field: "text-base",
        content: "text-sm",
        minHeight: "min-h-[44px]"
      }
    };
    return textSizeMap[labelSize];
  };

  // Waste type specific data mapping
  const getWasteDetails = (wasteType: WasteType | null) => {
    if (!wasteType) return null;
    
    const wasteDetailsMap: Record<string, any> = {
      "1": {
        category: "HW08 废矿物油与含矿物油废物",
        form: "液态",
        hazardProperty: "T,I",
        mainComponent: "矿物油、润滑油基础油",
        harmfulComponent: "多环芳烃、重金属离子",
        precautions: "远离火源，防止泄漏，穿戴防护用品"
      },
      "2": {
        category: "HW34 废酸",
        form: "液态",
        hazardProperty: "C",
        mainComponent: "硫酸、盐酸、硝酸",
        harmfulComponent: "强酸性物质",
        precautions: "防止接触皮肤，远离碱性物质"
      },
      "3": {
        category: "HW35 废碱",
        form: "液态",
        hazardProperty: "C",
        mainComponent: "氢氧化钠、氢氧化钾",
        harmfulComponent: "强碱性物质",
        precautions: "防止接触皮肤，远离酸性物质"
      },
      "4": {
        category: "HW06 废有机溶剂与含有机溶剂废物",
        form: "液态",
        hazardProperty: "T,I,F",
        mainComponent: "甲苯、二甲苯、丙酮",
        harmfulComponent: "有机溶剂、挥发性有机物",
        precautions: "通风良好环境存放，远离火源"
      }
    };

    return wasteDetailsMap[wasteType.id] || {
      category: `HW${wasteType.code.split('-')[0]} ${wasteType.name}`,
      form: "固态",
      hazardProperty: "T",
      mainComponent: "待检测确认",
      harmfulComponent: "待检测确认",
      precautions: "按危废管理要求处理"
    };
  };

  const wasteDetails = getWasteDetails(wasteType);
  const textSizes = getTextSizes();

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center justify-between p-3 bg-gray-50 border-b">
        <h3 className="text-base font-semibold text-gray-900">标签预览</h3>
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-600 bg-gray-200 px-2 py-1 rounded-full">
            {labelSize} mm
          </div>
          {wasteType && weight ? (
            <div className="text-xs text-safety-green bg-safety-green/10 px-2 py-1 rounded-full font-medium">
              ✓ 可打印
            </div>
          ) : (
            <div className="text-xs text-warning-red bg-warning-red/10 px-2 py-1 rounded-full font-medium">
              ⚠ 待完善
            </div>
          )}
        </div>
      </div>
      
      {/* Label Container - Always Square, Larger Size */}
      <div className="p-4">
        <div className="w-full aspect-square max-w-full mx-auto bg-orange-400 border-4 border-black relative">
          
          {/* Header */}
          <div className="border-b-2 border-black p-3 text-center">
            <h1 className={`${textSizes.header} font-bold text-black`}>危险废物</h1>
          </div>

          {/* Main Content Grid */}
          <div className={`grid grid-cols-3 text-black ${textSizes.field} h-[calc(100%-theme(spacing.16))]`}>
            
            {/* Row 1: 废物名称 | 危险特性 */}
            <div className={`col-span-2 border-r-2 border-b-2 border-black p-2 ${textSizes.minHeight}`}>
              <div className="font-semibold mb-1">废物名称:</div>
              <div className={`${textSizes.content} leading-tight break-words`}>{wasteType?.name || "未选择"}</div>
            </div>
            <div className={`border-b-2 border-black p-2 ${textSizes.minHeight}`}>
              <div className="font-semibold mb-1">危险特性</div>
              <div className={textSizes.content}>{wasteDetails?.hazardProperty || "-"}</div>
            </div>

            {/* Row 2: 废物类别 */}
            <div className={`col-span-3 border-b-2 border-black p-2 ${textSizes.minHeight}`}>
              <div className="font-semibold mb-1">废物类别:</div>
              <div className={`${textSizes.content} leading-tight break-words`}>{wasteDetails?.category || "-"}</div>
            </div>

            {/* Row 3: 废物代码 | 废物形态 */}
            <div className={`border-r-2 border-b-2 border-black p-2 ${textSizes.minHeight}`}>
              <div className="font-semibold mb-1">废物代码:</div>
              <div className={`${textSizes.content} font-mono`}>{wasteType?.code || "-"}</div>
            </div>
            <div className={`col-span-2 border-b-2 border-black p-2 ${textSizes.minHeight}`}>
              <div className="font-semibold mb-1">废物形态:</div>
              <div className={textSizes.content}>{wasteDetails?.form || "-"}</div>
            </div>

            {/* Row 4: 主要成分 */}
            <div className={`col-span-3 border-b-2 border-black p-2 ${textSizes.minHeight}`}>
              <div className="font-semibold mb-1">主要成分:</div>
              <div className={`${textSizes.content} leading-tight break-words`}>{wasteDetails?.mainComponent || "-"}</div>
            </div>

            {/* Row 5: 有害成分 */}
            <div className={`col-span-3 border-b-2 border-black p-2 ${textSizes.minHeight}`}>
              <div className="font-semibold mb-1">有害成分:</div>
              <div className={`${textSizes.content} leading-tight break-words`}>{wasteDetails?.harmfulComponent || "-"}</div>
            </div>

            {/* Row 6: 注意事项 */}
            <div className={`col-span-3 border-b-2 border-black p-2 ${textSizes.minHeight}`}>
              <div className="font-semibold mb-1">注意事项:</div>
              <div className={`${textSizes.content} leading-tight break-words`}>{wasteDetails?.precautions || "-"}</div>
            </div>

            {/* Row 7: 数字识别码 */}
            <div className={`col-span-3 border-b-2 border-black p-2 ${textSizes.minHeight}`}>
              <div className="font-semibold mb-1">数字识别码:</div>
              <div className={`${textSizes.content} font-mono`}>{digitalId || "-"}</div>
            </div>

            {/* Row 8: 产生/收集单位 | QR Code */}
            <div className={`col-span-2 border-r-2 border-b-2 border-black p-2 flex-1`}>
              <div className="font-semibold mb-1">产生/收集单位:</div>
              <div className={`${textSizes.content} leading-tight break-words`}>{companyData.name}</div>
            </div>
            <div className={`border-b-2 border-black p-2 flex-1 flex items-center justify-center`}>
              <div className={`${labelSize === "200*200" ? "w-16 h-16" : labelSize === "150*150" ? "w-14 h-14" : "w-12 h-12"} border-2 border-black bg-white flex items-center justify-center`}>
                <QrCode className={`${labelSize === "200*200" ? "w-12 h-12" : labelSize === "150*150" ? "w-10 h-10" : "w-8 h-8"} text-black`} />
              </div>
            </div>

            {/* Row 9: 联系人和联系方式 */}
            <div className={`col-span-3 border-b-2 border-black p-2 ${textSizes.minHeight}`}>
              <div className="font-semibold mb-1">联系人和联系方式:</div>
              <div className={textSizes.content}>{companyData.contact} {companyData.phone}</div>
            </div>

            {/* Row 10: 产生日期 | 废物重量 */}
            <div className={`border-r-2 border-black p-2 ${textSizes.minHeight}`}>
              <div className="font-semibold mb-1">产生日期:</div>
              <div className={textSizes.content}>{currentDate}</div>
            </div>
            <div className={`col-span-2 border-black p-2 ${textSizes.minHeight}`}>
              <div className="font-semibold mb-1">废物重量:</div>
              <div className={`${textSizes.content} font-semibold text-red-600`}>
                {getDisplayWeight() || `- ${weightUnit}`}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}