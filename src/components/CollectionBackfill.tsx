import { useState, useEffect } from "react";
import { WasteTypeList, SortMode } from "./WasteTypeList";
import { WasteType } from "./WasteTypeCard";
import { WeightOperationPanel, WeightUnit, LabelSize } from "./WeightOperationPanel";

export function CollectionBackfill() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Waste type data - Extended with more types
  const [wasteTypes, setWasteTypes] = useState<WasteType[]>([
    {
      id: "1",
      name: "废矿物油与含矿物油废物",
      code: "900-041-49",
      frequency: 45
    },
    {
      id: "2",
      name: "废酸",
      code: "900-300-34",
      frequency: 32
    },
    {
      id: "3",
      name: "废碱",
      code: "900-352-35",
      frequency: 28
    },
    {
      id: "4",
      name: "废有机溶剂与含有机溶剂废物",
      code: "900-402-06",
      frequency: 21
    },
    {
      id: "5",
      name: "含铜废物",
      code: "397-004-22",
      frequency: 18
    },
    {
      id: "6",
      name: "含锌废物",
      code: "397-005-22",
      frequency: 15
    },
    {
      id: "7",
      name: "含铬废物",
      code: "397-002-22",
      frequency: 12
    },
    {
      id: "8",
      name: "废催化剂",
      code: "261-151-50",
      frequency: 8
    },
    {
      id: "9",
      name: "含汞废物",
      code: "900-023-29",
      frequency: 6
    },
    {
      id: "10",
      name: "废漆、染料、颜料废物",
      code: "900-299-12",
      frequency: 5
    },
    {
      id: "11",
      name: "含镍废物",
      code: "397-005-22",
      frequency: 4
    },
    {
      id: "12",
      name: "废胶片及废像纸",
      code: "900-019-16",
      frequency: 3
    },
    {
      id: "13",
      name: "废弃的药品",
      code: "900-002-02",
      frequency: 2
    },
    {
      id: "14",
      name: "含铅废物",
      code: "397-001-22",
      frequency: 2
    },
    {
      id: "15",
      name: "电路板废料",
      code: "900-045-49",
      frequency: 1
    }
  ]);

  // Selection and sorting
  const [selectedWasteId, setSelectedWasteId] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>("frequency");

  // Weight operations
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("KG");
  const [labelSize, setLabelSize] = useState<LabelSize>("150*150");
  const [isWeightLocked, setIsWeightLocked] = useState<boolean>(false);

  // Get selected waste type name and data
  const selectedWasteData = wasteTypes.find(w => w.id === selectedWasteId) || null;
  const selectedWasteType = selectedWasteData?.name || null;

  const handleWasteSelect = (id: string) => {
    setSelectedWasteId(id);
    // Increment frequency when selected
    setWasteTypes(prev => prev.map(waste => 
      waste.id === id 
        ? { ...waste, frequency: waste.frequency + 1 }
        : waste
    ));
  };

  const handleReorder = (newOrder: WasteType[]) => {
    setWasteTypes(newOrder);
  };

  const handleWeightChange = (newWeight: string) => {
    // Store weight in KG internally regardless of display unit
    if (weightUnit === "T") {
      // Convert from T to KG for internal storage
      const kgWeight = parseFloat(newWeight) * 1000;
      setWeight(kgWeight.toString());
    } else {
      setWeight(newWeight);
    }
  };

  const handleWeightUnitChange = (unit: WeightUnit) => {
    const currentWeightNum = parseFloat(weight) || 0;
    
    if (weightUnit === "KG" && unit === "T") {
      // Converting from KG to T display
      setWeight(currentWeightNum.toString()); // Keep KG value internally
    } else if (weightUnit === "T" && unit === "KG") {
      // Converting from T to KG display  
      setWeight(currentWeightNum.toString()); // Keep KG value internally
    }
    
    setWeightUnit(unit);
  };

  const handleWeightLockToggle = () => {
    setIsWeightLocked(prev => !prev);
  };

  const handlePrint = () => {
    if (selectedWasteType && weight) {
      const displayWeight = weightUnit === "T" ? 
        `${(parseFloat(weight) / 1000).toFixed(3)} T` : 
        `${weight} KG`;
      
      const dateInfo = `\n录入日期: ${selectedDate}`;
      
      console.log(`Printing label for: ${selectedWasteType}, Weight: ${displayWeight}, Size: ${labelSize}${dateInfo}`);
      
      // Reset after print
      setWeight("");
      setIsWeightLocked(false);
      setSelectedWasteId(null);
      
      // Show success feedback (in real app, this would be a toast)
      alert(`标签打印成功！\n废物类型: ${selectedWasteType}\n重量: ${displayWeight}\n尺寸: ${labelSize} mm${dateInfo}`);
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Date Selection for Backfill Mode */}
      <div className="flex-shrink-0 bg-gray-800/90 border-b border-gray-700/50 px-6 py-3">
        <div className="flex items-center justify-end gap-3">
          <label className="text-sm text-gray-300">补录日期:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="bg-gray-700/50 border border-gray-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-warning-red/50"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左列 - 危废种类列表 (30%) */}
        <div className="w-[30%] flex flex-col overflow-hidden bg-gray-800/30">
          <div className="flex-1 p-5 overflow-hidden">
            <WasteTypeList
              wasteTypes={wasteTypes}
              selectedId={selectedWasteId}
              sortMode={sortMode}
              onSelect={handleWasteSelect}
              onSortModeChange={setSortMode}
              onReorder={handleReorder}
            />
          </div>
        </div>
        
        {/* 右列 - 重量操作区域 (70%) */}
        <div className="w-[70%] flex flex-col border-l-2 border-gray-700/50 overflow-hidden bg-gray-900">
          <div className="flex-1 p-6 overflow-hidden">
            <WeightOperationPanel
              weight={weight}
              weightUnit={weightUnit}
              labelSize={labelSize}
              isWeightLocked={isWeightLocked}
              selectedWasteType={selectedWasteType}
              selectedWasteData={selectedWasteData}
              onWeightChange={handleWeightChange}
              onWeightUnitChange={handleWeightUnitChange}
              onLabelSizeChange={setLabelSize}
              onWeightLockToggle={handleWeightLockToggle}
              onPrint={handlePrint}
              entryMode="backfill"
              selectedDate={selectedDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
