import React, { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';

const TrendAnalysisPanel = ({ filters }) => {
  const [selectedMetric, setSelectedMetric] = useState('marketSize');
  const [timeframe, setTimeframe] = useState('5y');

  const generateTrendData = () => {
    const currentYear = new Date()?.getFullYear();
    const data = [];
    
    for (let i = -5; i <= 5; i++) {
      const year = currentYear + i;
      const baseGrowth = Math.pow(1.15, i); // 15% annual growth
      
      data?.push({
        year: year?.toString(),
        marketSize: Math.round(850 * baseGrowth + Math.random() * 100),
        adoption: Math.min(95, Math.round(45 * Math.pow(1.12, i) + Math.random() * 5)),
        investment: Math.round(120 * baseGrowth + Math.random() * 50),
        companies: Math.round(2500 * Math.pow(1.08, i) + Math.random() * 200)
      });
    }
    
    return data;
  };

  const [trendData] = useState(generateTrendData());

  const metrics = [
    {
      key: 'marketSize',
      label: 'Market Size',
      icon: 'DollarSign',
      color: '#00d4ff',
      unit: 'B',
      prefix: '$'
    },
    {
      key: 'adoption',
      label: 'Adoption Rate',
      icon: 'TrendingUp',
      color: '#00ffa1',
      unit: '%',
      prefix: ''
    },
    {
      key: 'investment',
      label: 'Investment Volume',
      icon: 'PieChart',
      color: '#8a2be2',
      unit: 'B',
      prefix: '$'
    },
    {
      key: 'companies',
      label: 'Active Companies',
      icon: 'Building2',
      color: '#ffa500',
      unit: '',
      prefix: ''
    }
  ];

  const timeframes = [
    { key: '3y', label: '3 Years' },
    { key: '5y', label: '5 Years' },
    { key: '10y', label: '10 Years' }
  ];

  const getFilteredData = () => {
    const currentYear = new Date()?.getFullYear();
    const yearsToShow = timeframe === '3y' ? 6 : timeframe === '5y' ? 10 : 20;
    const startIndex = Math.max(0, trendData?.length - yearsToShow);
    return trendData?.slice(startIndex);
  };

  const getCurrentMetric = () => {
    return metrics?.find(m => m?.key === selectedMetric);
  };

  const formatTooltipValue = (value, name) => {
    const metric = metrics?.find(m => m?.key === name);
    if (!metric) return value;
    
    if (metric?.unit === 'B') {
      return `${metric?.prefix}${(value / 1000)?.toFixed(1)}${metric?.unit}`;
    }
    return `${metric?.prefix}${value}${metric?.unit}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glassmorphism p-3 rounded-lg border border-primary/20">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${formatTooltipValue(entry?.value, entry?.dataKey)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const currentMetric = getCurrentMetric();
  const filteredData = getFilteredData();
  const latestValue = filteredData?.[filteredData?.length - 1]?.[selectedMetric] || 0;
  const previousValue = filteredData?.[filteredData?.length - 2]?.[selectedMetric] || 0;
  const growthRate = previousValue ? ((latestValue - previousValue) / previousValue * 100) : 0;

  return (
    <div className="glassmorphism rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
            Trend Analysis
          </h3>
          <p className="text-sm text-muted-foreground">
            Historical and projected market trends
          </p>
        </div>

        <div className="flex space-x-2">
          {timeframes?.map(tf => (
            <button
              key={tf?.key}
              onClick={() => setTimeframe(tf?.key)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-smooth ${
                timeframe === tf?.key
                  ? 'bg-primary/20 text-primary' :'bg-card/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              {tf?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Metric Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {metrics?.map(metric => (
          <button
            key={metric?.key}
            onClick={() => setSelectedMetric(metric?.key)}
            className={`p-3 rounded-lg transition-smooth text-left ${
              selectedMetric === metric?.key
                ? 'bg-primary/20 neon-border' :'bg-card/30 hover:bg-card/50'
            }`}
          >
            <div className="flex items-center space-x-2 mb-2">
              <Icon 
                name={metric?.icon} 
                size={16} 
                color={selectedMetric === metric?.key ? currentMetric?.color : '#b8bcc8'} 
              />
              <span className={`text-sm font-medium ${
                selectedMetric === metric?.key ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {metric?.label}
              </span>
            </div>
            {selectedMetric === metric?.key && (
              <div className="text-xs text-muted-foreground">
                Current: {formatTooltipValue(latestValue, metric?.key)}
                <span className={`ml-2 ${growthRate >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {growthRate >= 0 ? '+' : ''}{growthRate?.toFixed(1)}%
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
      {/* Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id={`gradient-${selectedMetric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentMetric?.color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={currentMetric?.color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
            <XAxis 
              dataKey="year" 
              stroke="#b8bcc8"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#b8bcc8"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => {
                if (currentMetric?.unit === 'B') {
                  return `${currentMetric?.prefix}${(value / 1000)?.toFixed(0)}${currentMetric?.unit}`;
                }
                return `${currentMetric?.prefix || ''}${value}${currentMetric?.unit || ''}`;
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={selectedMetric}
              stroke={currentMetric?.color}
              strokeWidth={2}
              fill={`url(#gradient-${selectedMetric})`}
              dot={{ fill: currentMetric?.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: currentMetric?.color, strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Growth Trend</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Consistent upward trajectory with {growthRate?.toFixed(1)}% YoY growth
          </p>
        </div>

        <div className="bg-card/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Market Maturity</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {latestValue > 1000 ? 'Mature market with stable growth' : 'Emerging market with high potential'}
          </p>
        </div>

        <div className="bg-card/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Zap" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Forecast</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Projected to reach {formatTooltipValue(latestValue * 1.5, selectedMetric)} by 2030
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysisPanel;