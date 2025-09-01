import { GripVertical, Zap } from "lucide-react";

export interface WasteType {
  id: string;
  name: string;
  code: string;
  frequency: number;
}

interface WasteTypeCardProps {
  wasteType: WasteType;
  isSelected: boolean;
  onClick: () => void;
  isDragging?: boolean;
  isDraggable?: boolean;
}

export function WasteTypeCard({ 
  wasteType, 
  isSelected, 
  onClick, 
  isDragging = false,
  isDraggable = false
}: WasteTypeCardProps) {
  
  // Get frequency level for visual indication
  const getFrequencyLevel = (frequency: number) => {
    if (frequency >= 40) return { level: 'high', color: 'text-safety-green', bg: 'bg-safety-green/20', border: 'border-safety-green/30' };
    if (frequency >= 20) return { level: 'medium', color: 'text-orange-400', bg: 'bg-orange-400/20', border: 'border-orange-400/30' };
    return { level: 'low', color: 'text-gray-400', bg: 'bg-gray-400/20', border: 'border-gray-400/30' };
  };

  const frequencyLevel = getFrequencyLevel(wasteType.frequency);

  return (
    <div
      onClick={onClick}
      className={`
        relative group p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer
        backdrop-blur-sm shadow-md hover:shadow-lg flex items-center
        ${isSelected 
          ? 'bg-industrial-blue/20 border-industrial-blue text-white shadow-industrial-blue/30 transform scale-[1.01]' 
          : 'bg-gray-800/80 border-gray-600/50 text-gray-200 hover:border-gray-500/70 hover:bg-gray-700/80'
        }
        ${isDragging ? 'opacity-60 rotate-1 scale-105 shadow-xl' : ''}
        ${isDraggable ? 'hover:scale-[1.01] active:scale-[0.99]' : 'hover:scale-[1.005] active:scale-[0.995]'}
        min-h-[72px] touch-manipulation
      `}
    >
      {/* Drag Handle */}
      {isDraggable && (
        <div className="absolute top-2 right-2 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <GripVertical className="w-4 h-4" />
        </div>
      )}

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2">
          <div className="w-2 h-2 bg-industrial-blue rounded-full shadow-lg shadow-industrial-blue/50"></div>
        </div>
      )}

      {/* Main Content - Flex Layout */}
      <div className="flex-1 flex items-center justify-between gap-4 pr-6">
        
        {/* Left Side - Waste Info */}
        <div className="flex-1 min-w-0">
          {/* Waste Name */}
          <h3 className={`text-base font-semibold leading-tight mb-1 transition-colors duration-200 truncate ${
            isSelected ? 'text-white' : 'text-gray-100 group-hover:text-white'
          }`}>
            {wasteType.name}
          </h3>

          {/* Waste Code */}
          <div className={`text-xs font-mono transition-colors duration-200 ${
            isSelected ? 'text-industrial-blue-light' : 'text-gray-400 group-hover:text-gray-300'
          }`}>
            {wasteType.code}
          </div>
        </div>

        {/* Right Side - Frequency Display */}
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          {/* Frequency Number */}
          <div className={`
            px-3 py-1 rounded-md text-sm font-bold transition-all duration-200 min-w-[60px] text-center
            ${isSelected 
              ? 'bg-white/15 text-white border border-white/20' 
              : `${frequencyLevel.bg} ${frequencyLevel.color} border ${frequencyLevel.border}`
            }
          `}>
            {wasteType.frequency}
          </div>

          {/* Usage Label */}
          <div className={`
            text-xs transition-colors duration-200 
            ${isSelected ? 'text-gray-300' : 'text-gray-500 group-hover:text-gray-400'}
          `}>
            使用次数
          </div>
        </div>

        {/* Frequency Level Indicator Bar */}
        <div className={`
          w-1 h-12 rounded-full transition-all duration-200 flex-shrink-0
          ${isSelected 
            ? 'bg-white/30' 
            : frequencyLevel.level === 'high' 
              ? 'bg-safety-green/60' 
              : frequencyLevel.level === 'medium'
              ? 'bg-orange-400/60'
              : 'bg-gray-400/60'
          }
        `} />
      </div>

      {/* Hover Overlay */}
      <div className={`
        absolute inset-0 rounded-lg transition-all duration-300 pointer-events-none
        ${isSelected 
          ? 'bg-industrial-blue/5 shadow-inner' 
          : 'bg-white/0 group-hover:bg-white/3'
        }
      `} />
    </div>
  );
}