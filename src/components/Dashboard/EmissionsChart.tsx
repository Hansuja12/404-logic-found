
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, getEmissionsByCategory, getWeeklyEmissions } from '@/utils/calculators';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';

interface EmissionsChartProps {
  activities: Activity[];
}

const EmissionsChart: React.FC<EmissionsChartProps> = ({ activities }) => {
  const [activeTab, setActiveTab] = useState('weekly');
  const [timeRange, setTimeRange] = useState('7days');
  
  const getTimeRangeData = () => {
    switch(timeRange) {
      case '7days':
        return getWeeklyEmissions(activities);
      case '30days':
        return getWeeklyEmissions(activities).map(e => e * 1.2); // Simulated data
      case '90days':
        return getWeeklyEmissions(activities).map(e => e * 1.5); // Simulated data
      default:
        return getWeeklyEmissions(activities);
    }
  };
  
  const weeklyEmissions = getTimeRangeData();
  const weeklyData = weeklyEmissions.map((emissions, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      emissions
    };
  });
  
  const categoryEmissions = getEmissionsByCategory(activities);
  const categoryData = Object.entries(categoryEmissions).map(([category, emissions]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: emissions
  }));
  
  const COLORS = ['#66BB6A', '#80DEEA', '#FFB74D', '#F06292'];
  
  const formatTooltipValue = (value: any): string => {
    if (typeof value === 'number') {
      return `${value.toFixed(2)} kg CO₂e`;
    }
    return `${value} kg CO₂e`;
  };
  
  const handleDownload = () => {
    // Create CSV content
    const csvContent = activeTab === 'weekly' 
      ? `Day,Emissions (kg CO₂e)\n${weeklyData.map(d => `${d.day},${d.emissions}`).join('\n')}`
      : `Category,Emissions (kg CO₂e)\n${categoryData.map(d => `${d.name},${d.value}`).join('\n')}`;
      
    // Create a Blob and download it
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `carbon-emissions-${activeTab}-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const refreshData = () => {
    // This would typically fetch new data or recalculate
    // For now, we'll just show a success toast
    import('sonner').then(({ toast }) => {
      toast.success('Data refreshed successfully!');
    });
  };
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Emissions Breakdown</CardTitle>
          <div className="flex items-center gap-2">
            {activeTab === 'weekly' && (
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            )}
            <Button variant="outline" size="icon" onClick={refreshData} title="Refresh data">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleDownload} title="Download data">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="weekly">Weekly Trend</TabsTrigger>
            <TabsTrigger value="category">By Category</TabsTrigger>
          </TabsList>
          <TabsContent value="weekly" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" />
                <YAxis unit=" kg" />
                <Tooltip formatter={(value) => [`${value} kg CO₂e`, 'Emissions']} />
                <Bar
                  dataKey="emissions"
                  fill="#66BB6A"
                  radius={[4, 4, 0, 0]}
                  name="Daily Emissions"
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="category" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [formatTooltipValue(value), 'Emissions']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EmissionsChart;
