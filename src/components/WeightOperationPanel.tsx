import { useState, useRef, useEffect } from "react";
import { Lock, Unlock, Printer, Scale, Check, X, Calendar } from "lucide-react";
import { LabelPreview } from "./LabelPreview";

export type WeightUnit = "KG" | "T";
export type LabelSize = "100*100" | "100*80" | "100*70" | "100*60" | "150*150" | "200*200";

interface WasteTypeData {
  id: string;
  name: string;
  code: string;
  frequency: number;
}

interface WeightOperationPanelProps {
  weight: string;
  weightUnit: WeightUnit;
  labelSize: LabelSize;
  isWeightLocked: boolean;
  selectedWasteType: string | null;
  selectedWasteData: WasteTypeData | null;
  onWeightChange: (weight: string) => void;
  onWeightUnitChange: (unit: WeightUnit) => void;
  onLabelSizeChange: (size: LabelSize) => void;
  onWeightLockToggle: () => void;
  onPrint: () => void;
  entryMode?: "normal" | "backfill";
  selectedDate?: string;
}

export function WeightOperationPanel({
  weight,
  weightUnit,
  labelSize,
  isWeightLocked,
  selectedWasteType,
  selectedWasteData,
  onWeightChange,
  onWeightUnitChange,
  onLabelSizeChange,
  onWeightLockToggle,
  onPrint,
  entryMode = "normal",
  selectedDate
}: WeightOperationPanelProps) {
  const [localWeight, setLocalWeight] = useState(weight);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalWeight(weight);
  }, [weight]);

  const handleWeightInputChange = (value: string) => {
    // Only allow numbers and one decimal point
    const sanitized = value.replace(/[^0-9.]/g, '');
    const parts = sanitized.split('.');
    const finalValue = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : sanitized;
    
    setLocalWeight(finalValue);
    onWeightChange(finalValue);
  };

  const getDisplayWeight = () => {
    if (!weight) return "";
    const weightNum = parseFloat(weight);
    return weightUnit === "T" ? 
      (weightNum / 1000).toFixed(3) : 
      weightNum.toFixed(2);
  };

  const getDisplayUnit = () => {
    return weightUnit;
  };

  const canPrint = selectedWasteType && weight && parseFloat(weight) > 0;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short'
    });
  };

  return (
    <div className="h-full flex flex-col gap-6 overflow-hidden">
      
      {/* Top Section: Status Information */}
      <div className="flex gap-6">
        {/* Entry Mode Status - Conditional */}
        {entryMode === "backfill" && selectedDate && (
          <div className="w-[35%] bg-warning-red/10 border border-warning-red/30 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-warning-red" />
              <div>
                <h3 className="text-white font-medium">补录模式</h3>
                <p className="text-gray-300 text-sm">补录日期: {formatDate(selectedDate)}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Waste Type Display */}
        <div className={`${entryMode === "backfill" && selectedDate ? 'flex-1' : 'w-full'} bg-gray-800/50 rounded-2xl p-4 border-2 border-gray-700/30`}>
          <h3 className="text-gray-300 text-sm font-medium mb-3">已选择危废类型</h3>
          {selectedWasteType ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-safety-green animate-pulse"></div>
                <div>
                  <span className="text-white font-medium">{selectedWasteType}</span>
                  {selectedWasteData && (
                    <div className="text-xs text-gray-400 mt-1">
                      代码: <span className="text-industrial-blue font-mono">{selectedWasteData.code}</span>
                      <span className="ml-3">频率: <span className="text-safety-green">{selectedWasteData.frequency}</span></span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-gray-500">
              <div className="w-3 h-3 rounded-full bg-gray-600"></div>
              <span>请从左侧选择危废类型</span>
            </div>
          )}
        </div>
      </div>

      {/* Middle Section: Controls + Preview */}
      <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
        
        {/* Left: Compact Controls (40%) */}
        <div className="w-[40%] flex flex-col gap-4">
          
          {/* Weight Input - Compact */}
          <div className="bg-gray-800/50 rounded-2xl p-4 border-2 border-gray-700/30">
            <h3 className="text-gray-300 text-sm font-medium mb-3">重量录入</h3>

            {/* Weight Display */}
            <div className="relative mb-4">
              <input
                ref={inputRef}
                type="text"
                value={isWeightLocked ? getDisplayWeight() : localWeight}
                onChange={(e) => !isWeightLocked && handleWeightInputChange(e.target.value)}
                className={`w-full bg-gray-900/50 border-2 text-white text-3xl font-mono text-center py-3 px-4 rounded-xl transition-all duration-200 ${
                  isWeightLocked 
                    ? 'border-warning-red/50 cursor-not-allowed' 
                    : 'border-gray-600 focus:border-industrial-blue focus:outline-none'
                }`}
                placeholder="0.00"
                disabled={isWeightLocked}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg font-medium">
                {getDisplayUnit()}
              </div>
            </div>

            {/* Weight Unit Toggle - Compact */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => onWeightUnitChange("KG")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  weightUnit === "KG"
                    ? 'bg-industrial-blue text-white shadow-lg shadow-industrial-blue/30'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                KG
              </button>
              <button
                onClick={() => onWeightUnitChange("T")}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  weightUnit === "T"
                    ? 'bg-industrial-blue text-white shadow-lg shadow-industrial-blue/30'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                T
              </button>
            </div>

            {/* Weight Lock Toggle - Prominent Position */}
            <button
              onClick={onWeightLockToggle}
              className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-3 ${
                isWeightLocked 
                  ? 'bg-warning-red/20 text-warning-red hover:bg-warning-red/30 border-2 border-warning-red/40' 
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 hover:text-white border-2 border-gray-600'
              }`}
              title={isWeightLocked ? "解锁重量" : "锁定重量"}
            >
              {isWeightLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
              <span>{isWeightLocked ? "解锁重量" : "锁定重量"}</span>
            </button>
          </div>

          {/* Label Settings - Compact */}
          <div className="bg-gray-800/50 rounded-2xl p-4 border-2 border-gray-700/30">
            <h3 className="text-gray-300 text-sm font-medium mb-3">标签设置</h3>
            <div>
              <label className="text-gray-400 text-xs mb-2 block">标签尺寸 (mm)</label>
              <select
                value={labelSize}
                onChange={(e) => onLabelSizeChange(e.target.value as LabelSize)}
                className="w-full bg-gray-900/50 border border-gray-600 text-white py-2 px-3 rounded-lg text-sm focus:border-industrial-blue focus:outline-none"
              >
                <option value="100*100">100×100 mm</option>
                <option value="100*80">100×80 mm</option>
                <option value="100*70">100×70 mm</option>
                <option value="100*60">100×60 mm</option>
                <option value="150*150">150×150 mm</option>
                <option value="200*200">200×200 mm</option>
              </select>
            </div>
          </div>

          {/* Status Info - Compact */}
          <div className="bg-gray-800/50 rounded-2xl p-3 border-2 border-gray-700/30">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${canPrint ? 'bg-safety-green animate-pulse' : 'bg-gray-600'}`}></div>
              <span className="text-gray-300 text-xs">
                {canPrint ? '准备就绪' : '待完善信息'}
              </span>
              <div className="text-xs text-gray-500 ml-auto">
                {entryMode === "normal" ? "正常" : "补录"}
              </div>
            </div>
          </div>

        </div>

        {/* Right: Large Label Preview (60%) */}
        <div className="w-[60%] bg-gray-800/30 rounded-2xl border-2 border-gray-700/50 p-4 overflow-auto">
          <div className="h-full flex items-center justify-center">
            <div className="w-full max-w-lg">
              <LabelPreview
                wasteType={selectedWasteData ? {
                  id: selectedWasteData.id,
                  name: selectedWasteData.name,
                  code: selectedWasteData.code,
                  frequency: selectedWasteData.frequency
                } : null}
                weight={weight}
                weightUnit={weightUnit}
                labelSize={labelSize}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Section: Large Print Button */}
      <div className="flex-shrink-0">
        <button
          onClick={onPrint}
          disabled={!canPrint}
          className={`w-full py-6 px-8 rounded-2xl font-bold text-xl transition-all duration-200 flex items-center justify-center gap-4 ${
            canPrint
              ? 'bg-safety-green hover:bg-safety-green/80 text-white shadow-xl shadow-safety-green/40 hover:shadow-safety-green/60 hover:scale-[1.02] transform'
              : 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Printer className="w-6 h-6" />
          <span>{entryMode === "backfill" ? "补录并打印标签" : "打印标签"}</span>
        </button>

        {!canPrint && (
          <p className="text-center text-gray-500 text-sm mt-2">
            请选择危废类型并输入重量后再打印
          </p>
        )}
      </div>

    </div>
  );
}