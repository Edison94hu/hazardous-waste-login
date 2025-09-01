import { useState } from "react";
import { WasteTypeCard, WasteType } from "./WasteTypeCard";
import { TrendingUp, Hash } from "lucide-react";

export type SortMode = "frequency" | "custom";

interface WasteTypeListProps {
  wasteTypes: WasteType[];
  selectedId: string | null;
  sortMode: SortMode;
  onSelect: (id: string) => void;
  onSortModeChange: (mode: SortMode) => void;
  onReorder: (newOrder: WasteType[]) => void;
}

export function WasteTypeList({
  wasteTypes,
  selectedId,
  sortMode,
  onSelect,
  onSortModeChange,
  onReorder
}: WasteTypeListProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  // Sort waste types based on current mode
  const sortedWasteTypes = [...wasteTypes].sort((a, b) => {
    if (sortMode === "frequency") {
      return b.frequency - a.frequency;
    }
    // Custom order - maintain current order
    return 0;
  });

  const handleDragStart = (e: React.DragEvent, id: string) => {
    if (sortMode === "custom") {
      setDraggedItem(id);
      e.dataTransfer.effectAllowed = "move";
    } else {
      e.preventDefault();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (sortMode === "custom" && draggedItem) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    }
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    if (sortMode === "custom" && draggedItem && draggedItem !== targetId) {
      e.preventDefault();
      
      const draggedIndex = wasteTypes.findIndex(item => item.id === draggedItem);
      const targetIndex = wasteTypes.findIndex(item => item.id === targetId);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newOrder = [...wasteTypes];
        const [draggedWaste] = newOrder.splice(draggedIndex, 1);
        newOrder.splice(targetIndex, 0, draggedWaste);
        onReorder(newOrder);
      }
    }
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Compressed Header */}
      <div className="flex flex-col gap-3 mb-4">
        <h2 className="text-xl font-semibold text-white tracking-wide">危废类别</h2>
        
        {/* Compact iPad-style Segmented Control */}
        <div className="bg-gray-800/80 p-1 rounded-xl shadow-inner backdrop-blur-sm border border-gray-600/30">
          <div className="flex relative">
            <button
              onClick={() => onSortModeChange("frequency")}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-300 
                         flex items-center justify-center gap-1.5 relative z-10 ${
                sortMode === "frequency"
                  ? 'bg-industrial-blue text-white shadow-lg shadow-industrial-blue/30 transform scale-[1.01]'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <TrendingUp className="w-3 h-3" />
              <span>频次</span>
            </button>
            <button
              onClick={() => onSortModeChange("custom")}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-300 
                         flex items-center justify-center gap-1.5 relative z-10 ${
                sortMode === "custom"
                  ? 'bg-industrial-blue text-white shadow-lg shadow-industrial-blue/30 transform scale-[1.01]'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <Hash className="w-3 h-3" />
              <span>自定义</span>
            </button>
          </div>
        </div>

        {/* Compact Sort mode indicator */}
        <div className="text-xs text-gray-500 px-1">
          {sortMode === "frequency" ? "按频次排序" : "拖拽调整顺序"}
        </div>
      </div>

      {/* Compressed Scrollable List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500">
        {sortedWasteTypes.map((wasteType) => (
          <div
            key={wasteType.id}
            draggable={sortMode === "custom"}
            onDragStart={(e) => handleDragStart(e, wasteType.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, wasteType.id)}
            onDragEnd={handleDragEnd}
            className={`
              transition-all duration-200 rounded-lg
              ${sortMode === "custom" ? 'cursor-move hover:scale-[1.01]' : 'cursor-pointer'}
              ${draggedItem === wasteType.id ? 'opacity-50 transform rotate-1 scale-105' : ''}
              ${selectedId === wasteType.id ? 'ring-2 ring-industrial-blue ring-offset-1 ring-offset-gray-900' : ''}
            `}
          >
            <WasteTypeCard
              wasteType={wasteType}
              isSelected={selectedId === wasteType.id}
              onClick={() => onSelect(wasteType.id)}
              isDragging={draggedItem === wasteType.id}
              isDraggable={sortMode === "custom"}
            />
          </div>
        ))}
      </div>

      {/* Compact Statistics */}
      <div className="mt-3 pt-3 border-t border-gray-700/50">
        <div className="bg-gray-800/50 rounded-lg p-3 backdrop-blur-sm border border-gray-600/30">
          <div className="flex justify-between items-center text-center">
            <div className="flex items-center gap-2">
              <div className="text-lg font-bold text-industrial-blue">
                {wasteTypes.length}
              </div>
              <div className="text-xs text-gray-400">类型</div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`text-lg font-bold ${selectedId ? 'text-safety-green' : 'text-gray-500'}`}>
                {selectedId ? '✓' : '○'}
              </div>
              <div className="text-xs text-gray-400">
                {selectedId ? '已选择' : '未选择'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}