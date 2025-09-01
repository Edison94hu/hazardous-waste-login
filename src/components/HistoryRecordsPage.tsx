import { useState, useEffect } from "react";
import { Calendar, Search, ArrowUpDown, Filter, Trash2, Printer, Edit3, MoreHorizontal, ChevronDown, Eye, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

// Types for print records
export interface PrintRecord {
  id: string;
  uniqueId: string;
  wasteCategory: string;
  wasteCode: string;
  weight: number;
  printTime: string;
  printDate: string;
  hazardCode: string;
  uploadStatus: 'uploaded' | 'not_uploaded';
  labelSize: string;
}

type SortField = 'printTime' | 'wasteCategory' | 'weight' | 'uniqueId';
type SortOrder = 'asc' | 'desc';

interface HistoryRecordsPageProps {
  onBack?: () => void;
}

export function HistoryRecordsPage({ onBack }: HistoryRecordsPageProps) {
  // Mock data for print records
  const [allRecords] = useState<PrintRecord[]>([
    {
      id: '1',
      uniqueId: 'DW9004149001',
      wasteCategory: '废矿物油与含矿物油废物',
      wasteCode: '900-041-49',
      weight: 25.5,
      printTime: '14:32:15',
      printDate: '2024-01-15',
      hazardCode: 'HW08',
      uploadStatus: 'uploaded',
      labelSize: '150*150'
    },
    {
      id: '2',
      uniqueId: 'DW9003034002',
      wasteCategory: '废酸',
      wasteCode: '900-300-34',
      weight: 12.3,
      printTime: '13:45:22',
      printDate: '2024-01-15',
      hazardCode: 'HW34',
      uploadStatus: 'uploaded',
      labelSize: '100*100'
    },
    {
      id: '3',
      uniqueId: 'DW9003523003',
      wasteCategory: '废碱',
      wasteCode: '900-352-35',
      weight: 8.7,
      printTime: '12:18:45',
      printDate: '2024-01-15',
      hazardCode: 'HW35',
      uploadStatus: 'not_uploaded',
      labelSize: '150*150'
    },
    {
      id: '4',
      uniqueId: 'DW9004020004',
      wasteCategory: '废有机溶剂与含有机溶剂废物',
      wasteCode: '900-402-06',
      weight: 45.2,
      printTime: '11:25:10',
      printDate: '2024-01-15',
      hazardCode: 'HW06',
      uploadStatus: 'uploaded',
      labelSize: '200*200'
    },
    {
      id: '5',
      uniqueId: 'DW3970042005',
      wasteCategory: '含铜废物',
      wasteCode: '397-004-22',
      weight: 15.8,
      printTime: '10:15:33',
      printDate: '2024-01-15',
      hazardCode: 'HW22',
      uploadStatus: 'not_uploaded',
      labelSize: '150*150'
    },
    {
      id: '6',
      uniqueId: 'DW9002290006',
      wasteCategory: '含汞废物',
      wasteCode: '900-023-29',
      weight: 2.1,
      printTime: '09:42:18',
      printDate: '2024-01-14',
      hazardCode: 'HW29',
      uploadStatus: 'uploaded',
      labelSize: '100*100'
    },
    {
      id: '7',
      uniqueId: 'DW9002990007',
      wasteCategory: '废漆、染料、颜料废物',
      wasteCode: '900-299-12',
      weight: 33.4,
      printTime: '16:22:45',
      printDate: '2024-01-14',
      hazardCode: 'HW12',
      uploadStatus: 'not_uploaded',
      labelSize: '150*150'
    },
    {
      id: '8',
      uniqueId: 'DW2611515008',
      wasteCategory: '废催化剂',
      wasteCode: '261-151-50',
      weight: 18.9,
      printTime: '15:38:12',
      printDate: '2024-01-14',
      hazardCode: 'HW50',
      uploadStatus: 'not_uploaded',
      labelSize: '150*150'
    }
  ]);

  // State management
  const [filteredRecords, setFilteredRecords] = useState<PrintRecord[]>(allRecords);
  const [selectedRecords, setSelectedRecords] = useState<Set<string>>(new Set());
  const [selectedRecord, setSelectedRecord] = useState<PrintRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('printTime');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [dateFilter, setDateFilter] = useState('all');
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
  // Filter and sort records
  useEffect(() => {
    let filtered = [...allRecords];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(record => 
        record.wasteCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.uniqueId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.wasteCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.hazardCode.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply date filter
    if (dateFilter !== 'all') {
      const today = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(record => new Date(record.printDate) >= filterDate);
          break;
        case 'week':
          filterDate.setDate(today.getDate() - 7);
          filtered = filtered.filter(record => new Date(record.printDate) >= filterDate);
          break;
        case 'month':
          filterDate.setMonth(today.getMonth() - 1);
          filtered = filtered.filter(record => new Date(record.printDate) >= filterDate);
          break;
      }
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'printTime':
          comparison = a.printTime.localeCompare(b.printTime);
          break;
        case 'wasteCategory':
          comparison = a.wasteCategory.localeCompare(b.wasteCategory);
          break;
        case 'weight':
          comparison = a.weight - b.weight;
          break;
        case 'uniqueId':
          comparison = a.uniqueId.localeCompare(b.uniqueId);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    setFilteredRecords(filtered);
  }, [allRecords, searchQuery, dateFilter, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
    setShowSortDropdown(false);
  };

  const handleRecordSelect = (recordId: string, isSelected: boolean) => {
    const newSelected = new Set(selectedRecords);
    if (isSelected) {
      newSelected.add(recordId);
    } else {
      newSelected.delete(recordId);
    }
    setSelectedRecords(newSelected);
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedRecords(new Set(filteredRecords.map(r => r.id)));
    } else {
      setSelectedRecords(new Set());
    }
  };

  const handleRecordClick = (record: PrintRecord) => {
    setSelectedRecord(record);
    setShowSidePanel(true);
  };

  const getUploadStatusColor = (uploadStatus: string) => {
    switch (uploadStatus) {
      case 'uploaded': return 'bg-safety-green/20 text-safety-green border-safety-green/30';
      case 'not_uploaded': return 'bg-orange-400/20 text-orange-400 border-orange-400/30';
      default: return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
    }
  };

  const getHazardCodeColor = (code: string) => {
    const colorMap: Record<string, string> = {
      'HW08': 'bg-industrial-blue/20 text-industrial-blue border-industrial-blue/30',
      'HW34': 'bg-warning-red/20 text-warning-red border-warning-red/30',
      'HW35': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'HW06': 'bg-safety-green/20 text-safety-green border-safety-green/30',
      'HW22': 'bg-orange-400/20 text-orange-400 border-orange-400/30',
      'HW29': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'HW12': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'HW50': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    };
    return colorMap[code] || 'bg-gray-400/20 text-gray-400 border-gray-400/30';
  };

  // Check if record can be edited (only not uploaded records)
  const canEditRecord = (record: PrintRecord) => {
    return record.uploadStatus === 'not_uploaded';
  };

  // Get editable records count for batch operations
  const editableRecordsCount = filteredRecords.filter(r => selectedRecords.has(r.id) && canEditRecord(r)).length;

  return (
    <div className="flex flex-col h-full bg-gray-900 overflow-hidden">
      {/* Top Filter Bar */}
      <div className="flex-shrink-0 bg-gray-800/80 border-b border-gray-700/50 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="搜索记录..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-700/80 border-gray-600/50 text-white placeholder-gray-400 
                       focus:ring-2 focus:ring-industrial-blue focus:border-transparent"
            />
          </div>

          {/* Date Filter */}
          <div className="relative">
            <button
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700/80 border border-gray-600/50 
                       rounded-lg text-white hover:bg-gray-600/80 transition-all duration-200"
            >
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {dateFilter === 'all' ? '全部日期' : 
                 dateFilter === 'today' ? '今天' :
                 dateFilter === 'week' ? '本周' : '本月'}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showDateDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showDateDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-gray-800/95 border border-gray-600/50 
                            rounded-lg shadow-xl z-20 min-w-[120px] backdrop-blur-sm">
                {[
                  { value: 'all', label: '全部日期' },
                  { value: 'today', label: '今天' },
                  { value: 'week', label: '本周' },
                  { value: 'month', label: '本月' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setDateFilter(option.value);
                      setShowDateDropdown(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-700/70 transition-colors
                               first:rounded-t-lg last:rounded-b-lg ${
                      dateFilter === option.value ? 'bg-industrial-blue text-white' : 'text-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Options */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700/80 border border-gray-600/50 
                       rounded-lg text-white hover:bg-gray-600/80 transition-all duration-200"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span className="text-sm">排序</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showSortDropdown && (
              <div className="absolute top-full right-0 mt-2 bg-gray-800/95 border border-gray-600/50 
                            rounded-lg shadow-xl z-20 min-w-[140px] backdrop-blur-sm">
                {[
                  { field: 'printTime' as SortField, label: '打印时间' },
                  { field: 'wasteCategory' as SortField, label: '废物类型' },
                  { field: 'weight' as SortField, label: '重量' },
                  { field: 'uniqueId' as SortField, label: '记录ID' }
                ].map((option) => (
                  <button
                    key={option.field}
                    onClick={() => handleSort(option.field)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-700/70 transition-colors
                               first:rounded-t-lg last:rounded-b-lg flex items-center justify-between ${
                      sortField === option.field ? 'bg-industrial-blue text-white' : 'text-gray-300'
                    }`}
                  >
                    <span>{option.label}</span>
                    {sortField === option.field && (
                      <span className="text-xs opacity-70">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Record Count */}
          <div className="text-sm text-gray-400">
            显示 {filteredRecords.length} 条记录
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Records Table */}
        <div className={`flex flex-col overflow-hidden transition-all duration-300 ${
          showSidePanel ? 'w-[65%]' : 'w-full'
        }`}>
          {/* Table Header */}
          <div className="flex-shrink-0 bg-gray-800/60 border-b border-gray-700/50 px-6 py-3">
            <div className="flex items-center gap-4">
              <div className="w-8">
                <input
                  type="checkbox"
                  checked={selectedRecords.size === filteredRecords.length && filteredRecords.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-industrial-blue 
                           focus:ring-industrial-blue focus:ring-2 focus:ring-offset-0"
                />
              </div>
              <div className="flex-1 grid grid-cols-6 gap-4 text-sm font-medium text-gray-300">
                <div>废物类型</div>
                <div>记录ID</div>
                <div>重量 (KG)</div>
                <div>打印时间</div>
                <div>危险代码</div>
                <div>上传状态</div>
              </div>
            </div>
          </div>

          {/* Records List */}
          <div className="flex-1 overflow-y-auto">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                onClick={() => handleRecordClick(record)}
                className={`border-b border-gray-800/50 px-6 py-4 hover:bg-gray-800/40 
                           cursor-pointer transition-all duration-200 ${
                  selectedRecord?.id === record.id ? 'bg-industrial-blue/10' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedRecords.has(record.id)}
                      onChange={(e) => handleRecordSelect(record.id, e.target.checked)}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-industrial-blue 
                               focus:ring-industrial-blue focus:ring-2 focus:ring-offset-0"
                    />
                  </div>
                  
                  <div className="flex-1 grid grid-cols-6 gap-4 items-center">
                    {/* Waste Category */}
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        record.wasteCategory.includes('矿物油') ? 'bg-industrial-blue' :
                        record.wasteCategory.includes('酸') ? 'bg-warning-red' :
                        record.wasteCategory.includes('碱') ? 'bg-purple-500' :
                        record.wasteCategory.includes('溶剂') ? 'bg-safety-green' :
                        record.wasteCategory.includes('铜') ? 'bg-orange-400' :
                        record.wasteCategory.includes('汞') ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`} />
                      <span className="text-sm text-white truncate" title={record.wasteCategory}>
                        {record.wasteCategory}
                      </span>
                    </div>

                    {/* Unique ID */}
                    <div className="text-sm font-mono text-gray-300">
                      {record.uniqueId}
                    </div>

                    {/* Weight */}
                    <div className="text-sm text-white font-semibold">
                      {record.weight.toFixed(1)}
                    </div>

                    {/* Print Time */}
                    <div className="text-sm text-gray-300">
                      <div>{record.printTime}</div>
                      <div className="text-xs text-gray-500">{record.printDate}</div>
                    </div>

                    {/* Hazard Code */}
                    <div>
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold border ${
                        getHazardCodeColor(record.hazardCode)
                      }`}>
                        {record.hazardCode}
                      </span>
                    </div>

                    {/* Upload Status */}
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold border flex items-center gap-1 ${
                        getUploadStatusColor(record.uploadStatus)
                      }`}>
                        {record.uploadStatus === 'uploaded' ? (
                          <>
                            <Upload className="w-3 h-3" />
                            已上传
                          </>
                        ) : (
                          <>
                            <div className="w-3 h-3 border border-current rounded-sm opacity-60" />
                            未上传
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side Action Panel */}
        {showSidePanel && selectedRecord && (
          <div className="w-[35%] bg-gray-800/60 border-l border-gray-700/50 flex flex-col">
            {/* Panel Header */}
            <div className="flex-shrink-0 px-6 py-4 border-b border-gray-700/50">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  {canEditRecord(selectedRecord) ? '编辑记录' : '查看记录'}
                </h3>
                <button
                  onClick={() => setShowSidePanel(false)}
                  className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  <span className="text-gray-400 text-lg">×</span>
                </button>
              </div>
            </div>

            {/* Panel Content */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              {/* Record Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">记录ID</label>
                  <div className="text-white font-mono bg-gray-700/50 px-3 py-2 rounded-lg">
                    {selectedRecord.uniqueId}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">废物类型</label>
                  <div className="text-white bg-gray-700/50 px-3 py-2 rounded-lg">
                    {selectedRecord.wasteCategory}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">重量 (KG)</label>
                  {canEditRecord(selectedRecord) ? (
                    <Input
                      type="number"
                      step="0.1"
                      defaultValue={selectedRecord.weight}
                      className="bg-gray-700/80 border-gray-600/50 text-white"
                    />
                  ) : (
                    <div className="text-white bg-gray-700/30 px-3 py-2 rounded-lg border border-gray-600/30">
                      {selectedRecord.weight.toFixed(1)}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">危险代码</label>
                  <div className={`inline-block px-3 py-1 rounded-md text-sm font-semibold border ${
                    getHazardCodeColor(selectedRecord.hazardCode)
                  }`}>
                    {selectedRecord.hazardCode}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">打印时间</label>
                  <div className="text-gray-300 bg-gray-700/50 px-3 py-2 rounded-lg">
                    {selectedRecord.printDate} {selectedRecord.printTime}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">标签尺寸</label>
                  <div className="text-gray-300 bg-gray-700/50 px-3 py-2 rounded-lg">
                    {selectedRecord.labelSize} mm
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">上传状态</label>
                  <div className={`inline-block px-3 py-1 rounded-md text-sm font-semibold border flex items-center gap-2 ${
                    getUploadStatusColor(selectedRecord.uploadStatus)
                  }`}>
                    {selectedRecord.uploadStatus === 'uploaded' ? (
                      <>
                        <Upload className="w-4 h-4" />
                        已上传到服务器
                      </>
                    ) : (
                      <>
                        <div className="w-4 h-4 border border-current rounded-sm opacity-60" />
                        等待上传
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {canEditRecord(selectedRecord) ? (
                  // Editable record actions
                  <>
                    <Button className="w-full bg-industrial-blue hover:bg-industrial-blue-light text-white">
                      <Edit3 className="w-4 h-4 mr-2" />
                      保存修改
                    </Button>

                    <Button className="w-full bg-safety-green hover:bg-green-500 text-white">
                      <Upload className="w-4 h-4 mr-2" />
                      上传数据
                    </Button>

                    <Button className="w-full bg-gray-600 hover:bg-gray-500 text-white">
                      <Printer className="w-4 h-4 mr-2" />
                      重新打印
                    </Button>

                    <Button variant="destructive" className="w-full">
                      <Trash2 className="w-4 h-4 mr-2" />
                      删除记录
                    </Button>
                  </>
                ) : (
                  // View-only record actions
                  <>
                    <Button className="w-full bg-gray-600 hover:bg-gray-500 text-white">
                      <Eye className="w-4 h-4 mr-2" />
                      详细信息
                    </Button>

                    <Button className="w-full bg-safety-green hover:bg-green-500 text-white">
                      <Printer className="w-4 h-4 mr-2" />
                      重新打印
                    </Button>

                    <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Upload className="w-4 h-4" />
                        <span>此记录已上传，无法编辑</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Batch Actions Toolbar */}
      {selectedRecords.size > 0 && (
        <div className="flex-shrink-0 bg-gray-800/80 border-t border-gray-700/50 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-300">
              已选择 {selectedRecords.size} 条记录
              {editableRecordsCount < selectedRecords.size && (
                <span className="text-orange-400 ml-2">
                  ({editableRecordsCount} 条可编辑)
                </span>
              )}
            </div>
            
            <div className="flex gap-3">
              {editableRecordsCount > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-safety-green text-safety-green hover:bg-safety-green hover:text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  批量上传 ({editableRecordsCount})
                </Button>
              )}
              
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-500 text-gray-300 hover:bg-gray-600 hover:text-white"
              >
                <Printer className="w-4 h-4 mr-2" />
                批量重打印
              </Button>

              {editableRecordsCount > 0 && (
                <Button 
                  variant="destructive" 
                  size="sm"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  批量删除 ({editableRecordsCount})
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}