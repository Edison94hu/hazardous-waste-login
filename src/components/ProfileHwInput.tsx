import { useState } from "react";
import { 
  Settings,
  Save,
  Plus,
  Search
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface WasteInfoRecord {
  id: string;
  wasteId: string;
  facilityCode: string;
  wasteName: string;
  wasteCategory: string;
  wasteCode: string;
  wasteForm: string;
  mainComponents: string;
  harmfulComponents: string;
  precautions: string;
  hazardousProperties: string;
  createdAt: string;
  updatedAt: string;
  status: "active" | "inactive";
}

interface WasteInfoForm {
  wasteId: string;
  facilityCode: string;
  wasteName: string;
  wasteCategory: string;
  wasteCode: string;
  wasteForm: string;
  mainComponents: string;
  harmfulComponents: string;
  precautions: string;
  hazardousProperties: string;
}

export function ProfileHwInput() {
  // Waste info records state
  const [wasteInfoRecords, setWasteInfoRecords] = useState<WasteInfoRecord[]>([
    {
      id: "1",
      wasteId: "HW001",
      facilityCode: "FC001",
      wasteName: "废矿物油与含矿物油废物",
      wasteCategory: "危险废物",
      wasteCode: "900-041-49",
      wasteForm: "液态",
      mainComponents: "矿物油、有机溶剂",
      harmfulComponents: "苯、甲苯、二甲苯",
      precautions: "远离火源，避免高温",
      hazardousProperties: "易燃、有毒",
      createdAt: "2024-03-15",
      updatedAt: "2024-03-15",
      status: "active"
    },
    {
      id: "2",
      wasteId: "HW002",
      facilityCode: "FC002",
      wasteName: "废酸",
      wasteCategory: "危险废物",
      wasteCode: "900-300-34",
      wasteForm: "液态",
      mainComponents: "硫酸、盐酸",
      harmfulComponents: "强酸",
      precautions: "穿戴防护用品，避免接触皮肤",
      hazardousProperties: "腐蚀性",
      createdAt: "2024-03-14",
      updatedAt: "2024-03-14",
      status: "active"
    },
    {
      id: "3",
      wasteId: "HW003",
      facilityCode: "FC003",
      wasteName: "废有机溶剂",
      wasteCategory: "危险废物",
      wasteCode: "900-402-06",
      wasteForm: "液态",
      mainComponents: "丙酮、乙醇",
      harmfulComponents: "有机溶剂",
      precautions: "通风良好环境下操作",
      hazardousProperties: "易燃、易挥发",
      createdAt: "2024-03-13",
      updatedAt: "2024-03-13",
      status: "inactive"
    }
  ]);

  // Current editing states
  const [selectedWasteRecord, setSelectedWasteRecord] = useState<WasteInfoRecord | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Waste info form state
  const [wasteInfoForm, setWasteInfoForm] = useState<WasteInfoForm>({
    wasteId: "",
    facilityCode: "",
    wasteName: "",
    wasteCategory: "",
    wasteCode: "",
    wasteForm: "",
    mainComponents: "",
    harmfulComponents: "",
    precautions: "",
    hazardousProperties: ""
  });

  // Waste info functions
  const handleWasteInfoChange = (field: keyof WasteInfoForm, value: string) => {
    setWasteInfoForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectWasteRecord = (record: WasteInfoRecord) => {
    setSelectedWasteRecord(record);
    setWasteInfoForm({
      wasteId: record.wasteId,
      facilityCode: record.facilityCode,
      wasteName: record.wasteName,
      wasteCategory: record.wasteCategory,
      wasteCode: record.wasteCode,
      wasteForm: record.wasteForm,
      mainComponents: record.mainComponents,
      harmfulComponents: record.harmfulComponents,
      precautions: record.precautions,
      hazardousProperties: record.hazardousProperties
    });
    setIsCreatingNew(false);
  };

  const handleNewWasteInfo = () => {
    setSelectedWasteRecord(null);
    setWasteInfoForm({
      wasteId: "",
      facilityCode: "",
      wasteName: "",
      wasteCategory: "",
      wasteCode: "",
      wasteForm: "",
      mainComponents: "",
      harmfulComponents: "",
      precautions: "",
      hazardousProperties: ""
    });
    setIsCreatingNew(true);
  };

  const handleSaveWasteInfo = () => {
    if (isCreatingNew) {
      // Create new record
      const newRecord: WasteInfoRecord = {
        id: (wasteInfoRecords.length + 1).toString(),
        ...wasteInfoForm,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        status: "active"
      };
      setWasteInfoRecords(prev => [newRecord, ...prev]);
      setSelectedWasteRecord(newRecord);
    } else if (selectedWasteRecord) {
      // Update existing record
      setWasteInfoRecords(prev => prev.map(record => 
        record.id === selectedWasteRecord.id 
          ? { ...record, ...wasteInfoForm, updatedAt: new Date().toISOString().split('T')[0] }
          : record
      ));
      setSelectedWasteRecord({...selectedWasteRecord, ...wasteInfoForm});
    }
    setIsCreatingNew(false);
    alert(isCreatingNew ? "危废信息已成功创建" : "危废信息已成功更新");
  };

  return (
    <div className="flex h-full">
      {/* Left Panel - Records List */}
      <div className="w-[40%] bg-[#1E1E2E] border-r border-gray-700/50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-700/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white">危废信息列表</h3>
              <p className="text-sm text-gray-400">已录入 {wasteInfoRecords.length} 条记录</p>
            </div>
            <Button
              onClick={handleNewWasteInfo}
              className="bg-safety-green hover:bg-safety-green/80 text-white"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              新增
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="搜索危废ID、名称或代码..."
              className="bg-gray-700/50 border-gray-600 text-white pl-10"
            />
          </div>
        </div>

        {/* Records List */}
        <div className="flex-1 overflow-auto p-4 space-y-3">
          {wasteInfoRecords.map((record) => (
            <div
              key={record.id}
              onClick={() => handleSelectWasteRecord(record)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedWasteRecord?.id === record.id
                  ? "bg-industrial-blue/20 border-industrial-blue/50"
                  : "bg-gray-700/30 border-gray-600/30 hover:bg-gray-700/50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-white font-medium">{record.wasteId}</span>
                  <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                    record.status === "active" 
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-gray-500/20 text-gray-400"
                  }`}>
                    {record.status === "active" ? "使用中" : "已停用"}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{record.updatedAt}</span>
              </div>
              <h4 className="text-white font-medium mb-1">{record.wasteName}</h4>
              <p className="text-sm text-gray-400 mb-1">代码: {record.wasteCode}</p>
              <p className="text-sm text-gray-400">设施: {record.facilityCode}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Edit Form */}
      <div className="flex-1 bg-gray-900 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">
              {isCreatingNew ? "新增危废信息" : selectedWasteRecord ? "编辑危废信息" : "选择危废记录"}
            </h3>
            {selectedWasteRecord && (
              <p className="text-sm text-gray-400">
                最后更新: {selectedWasteRecord.updatedAt}
              </p>
            )}
          </div>

          {(selectedWasteRecord || isCreatingNew) ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">危废ID</label>
                  <Input
                    value={wasteInfoForm.wasteId}
                    onChange={(e) => handleWasteInfoChange("wasteId", e.target.value)}
                    placeholder="输入危废ID"
                    className="bg-gray-700/50 border-gray-600 text-white h-12"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">设施编码ID</label>
                  <Input
                    value={wasteInfoForm.facilityCode}
                    onChange={(e) => handleWasteInfoChange("facilityCode", e.target.value)}
                    placeholder="输入设施编码"
                    className="bg-gray-700/50 border-gray-600 text-white h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">危废名称</label>
                  <Input
                    value={wasteInfoForm.wasteName}
                    onChange={(e) => handleWasteInfoChange("wasteName", e.target.value)}
                    placeholder="输入危废名称"
                    className="bg-gray-700/50 border-gray-600 text-white h-12"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">危废种类</label>
                  <Input
                    value={wasteInfoForm.wasteCategory}
                    onChange={(e) => handleWasteInfoChange("wasteCategory", e.target.value)}
                    placeholder="输入危废种类"
                    className="bg-gray-700/50 border-gray-600 text-white h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">危废代码</label>
                  <Input
                    value={wasteInfoForm.wasteCode}
                    onChange={(e) => handleWasteInfoChange("wasteCode", e.target.value)}
                    placeholder="输入危废代码"
                    className="bg-gray-700/50 border-gray-600 text-white h-12"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-300">废物形态</label>
                  <Input
                    value={wasteInfoForm.wasteForm}
                    onChange={(e) => handleWasteInfoChange("wasteForm", e.target.value)}
                    placeholder="输入废物形态"
                    className="bg-gray-700/50 border-gray-600 text-white h-12"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-300">主要成分</label>
                <Textarea
                  value={wasteInfoForm.mainComponents}
                  onChange={(e) => handleWasteInfoChange("mainComponents", e.target.value)}
                  placeholder="描述主要成分"
                  className="bg-gray-700/50 border-gray-600 text-white min-h-[100px]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-300">有害成分</label>
                <Textarea
                  value={wasteInfoForm.harmfulComponents}
                  onChange={(e) => handleWasteInfoChange("harmfulComponents", e.target.value)}
                  placeholder="描述有害成分"
                  className="bg-gray-700/50 border-gray-600 text-white min-h-[100px]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-300">注意事项</label>
                <Textarea
                  value={wasteInfoForm.precautions}
                  onChange={(e) => handleWasteInfoChange("precautions", e.target.value)}
                  placeholder="输入注意事项"
                  className="bg-gray-700/50 border-gray-600 text-white min-h-[100px]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-gray-300">危险特性</label>
                <Textarea
                  value={wasteInfoForm.hazardousProperties}
                  onChange={(e) => handleWasteInfoChange("hazardousProperties", e.target.value)}
                  placeholder="描述危险特性"
                  className="bg-gray-700/50 border-gray-600 text-white min-h-[100px]"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSaveWasteInfo}
                  className="bg-safety-green hover:bg-safety-green/80 text-white px-6 py-2"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isCreatingNew ? "保存并创建" : "保存修改"}
                </Button>
                {!isCreatingNew && (
                  <Button
                    variant="outline"
                    onClick={() => setSelectedWasteRecord(null)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700/50"
                  >
                    取消编辑
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <Settings className="w-16 h-16 text-gray-500 mb-4" />
              <h4 className="text-lg font-medium text-gray-300 mb-2">选择危废记录</h4>
              <p className="text-gray-500 mb-4">从左侧列表中选择一个危废记录进行编辑</p>
              <Button
                onClick={handleNewWasteInfo}
                className="bg-industrial-blue hover:bg-industrial-blue/80 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                或创建新记录
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
