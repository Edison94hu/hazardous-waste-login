import { Download, TrendingUp, PieChart, BarChart3 } from "lucide-react";
import { Button } from "./ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie,
  Cell, 
  Tooltip, 
  Legend 
} from "recharts";

export function DataAnalyticsPanel() {
  // Chart data for last 7 days
  const barChartData = [
    { date: 'Aug 14', weight: 120, day: '08-14' },
    { date: 'Aug 15', weight: 150, day: '08-15' },
    { date: 'Aug 16', weight: 90, day: '08-16' },
    { date: 'Aug 17', weight: 200, day: '08-17' },
    { date: 'Aug 18', weight: 180, day: '08-18' },
    { date: 'Aug 19', weight: 160, day: '08-19' },
    { date: 'Aug 20', weight: 140, day: '08-20' }
  ];

  const pieChartData = [
    { name: '液体废物', value: 40, color: '#4880F0' },
    { name: '固体废物', value: 25, color: '#34D399' },
    { name: '包装废物', value: 20, color: '#F59E0B' },
    { name: '活性炭废物', value: 15, color: '#A855F7' }
  ];

  const handleExportData = () => {
    // Mock export functionality
    console.log('Exporting data...');
    alert('数据导出功能：将生成Excel报表文件');
  };

  // Custom tooltip for bar chart
  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800/95 border border-gray-600/50 rounded-lg p-3 shadow-xl backdrop-blur-sm">
          <p className="text-gray-300 text-sm">{`日期: ${label}`}</p>
          <p className="text-industrial-blue font-semibold">
            {`总重量: ${payload[0].value} KG`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for pie chart
  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800/95 border border-gray-600/50 rounded-lg p-3 shadow-xl backdrop-blur-sm">
          <p className="text-gray-300 text-sm">{payload[0].name}</p>
          <p className="font-semibold" style={{ color: payload[0].payload.color }}>
            {`占比: ${payload[0].value}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 overflow-hidden">
      {/* Analysis Header */}
      <div className="flex-shrink-0 bg-gray-800/80 border-b border-gray-700/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-safety-green" />
            <h2 className="text-lg font-semibold text-white">数据分析</h2>
            <span className="text-sm text-gray-400 bg-gray-700/50 px-2 py-1 rounded-md">
              最近7天
            </span>
          </div>
          <Button
            onClick={handleExportData}
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            导出报表
          </Button>
        </div>
      </div>

      {/* Charts Container */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          
          {/* Bar Chart - Daily Totals */}
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-industrial-blue" />
                <h3 className="text-base font-semibold text-white">日处理量统计</h3>
              </div>
              <div className="text-sm text-gray-400">KG</div>
            </div>
            
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4880F0" stopOpacity={0.9}/>
                      <stop offset="100%" stopColor="#4880F0" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#9CA3AF" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#9CA3AF" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Bar 
                    dataKey="weight" 
                    fill="url(#barGradient)"
                    radius={[4, 4, 0, 0]}
                    stroke="#4880F0"
                    strokeWidth={1}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart - Waste Type Proportions */}
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-safety-green" />
                <h3 className="text-base font-semibold text-white">废物类型占比</h3>
              </div>
              <div className="text-sm text-gray-400">%</div>
            </div>
            
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <defs>
                    {pieChartData.map((entry, index) => (
                      <linearGradient key={index} id={`pieGradient${index}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={entry.color} stopOpacity={0.9}/>
                        <stop offset="100%" stopColor={entry.color} stopOpacity={0.6}/>
                      </linearGradient>
                    ))}
                  </defs>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={110}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={`url(#pieGradient${index})`}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value, entry) => (
                      <span style={{ color: entry.color, fontSize: '12px' }}>{value}</span>
                    )}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-industrial-blue">1,040</div>
            <div className="text-sm text-gray-400">总重量 (KG)</div>
          </div>
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-safety-green">8</div>
            <div className="text-sm text-gray-400">处理批次</div>
          </div>
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">4</div>
            <div className="text-sm text-gray-400">废物类型</div>
          </div>
          <div className="bg-gray-800/60 border border-gray-700/50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">148.6</div>
            <div className="text-sm text-gray-400">日均 (KG)</div>
          </div>
        </div>
      </div>
    </div>
  );
}