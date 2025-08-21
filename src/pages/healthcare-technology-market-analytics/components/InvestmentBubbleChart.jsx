import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const InvestmentBubbleChart = ({ filters }) => {
  const [selectedBubble, setSelectedBubble] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const generateBubbleData = () => {
    const technologies = [
      { name: 'AI Diagnostics', category: 'ai', color: '#00d4ff' },
      { name: 'Telemedicine', category: 'digital', color: '#00ffa1' },
      { name: 'Surgical Robotics', category: 'robotics', color: '#8a2be2' },
      { name: 'Gene Therapy', category: 'biotech', color: '#ff4757' },
      { name: 'Wearable Devices', category: 'devices', color: '#ffa500' },
      { name: 'VR/AR Therapy', category: 'immersive', color: '#39ff14' },
      { name: 'Digital Therapeutics', category: 'digital', color: '#00d4ff' },
      { name: 'Precision Medicine', category: 'biotech', color: '#8a2be2' },
      { name: 'Remote Monitoring', category: 'devices', color: '#00ffa1' },
      { name: 'AI Drug Discovery', category: 'ai', color: '#ff4757' },
      { name: 'Robotic Surgery', category: 'robotics', color: '#ffa500' },
      { name: 'Mental Health Apps', category: 'digital', color: '#39ff14' }
    ];

    return technologies?.map(tech => ({
      name: tech?.name,
      category: tech?.category,
      color: tech?.color,
      marketSize: Math.round(Math.random() * 50 + 10), // Billions
      adoptionRate: Math.round(Math.random() * 80 + 20), // Percentage
      investmentVolume: Math.round(Math.random() * 15 + 2), // Billions (bubble size)
      companies: Math.round(Math.random() * 500 + 100),
      growthRate: Math.round(Math.random() * 40 + 10),
      riskLevel: Math.round(Math.random() * 5 + 1)
    }));
  };

  const [bubbleData] = useState(generateBubbleData());

  const categories = [
    { key: 'all', label: 'All Categories', color: '#ffffff' },
    { key: 'ai', label: 'AI & Machine Learning', color: '#00d4ff' },
    { key: 'digital', label: 'Digital Health', color: '#00ffa1' },
    { key: 'robotics', label: 'Robotics', color: '#8a2be2' },
    { key: 'biotech', label: 'Biotechnology', color: '#ff4757' },
    { key: 'devices', label: 'Medical Devices', color: '#ffa500' },
    { key: 'immersive', label: 'Immersive Tech', color: '#39ff14' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const getFilteredData = () => {
    if (selectedCategory === 'all') return bubbleData;
    return bubbleData?.filter(item => item?.category === selectedCategory);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="glassmorphism p-4 rounded-lg border border-primary/20 max-w-xs">
          <h4 className="font-heading font-semibold text-foreground mb-2">{data?.name}</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Market Size:</span>
              <span className="text-foreground">${data?.marketSize}B</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Adoption Rate:</span>
              <span className="text-foreground">{data?.adoptionRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Investment:</span>
              <span className="text-foreground">${data?.investmentVolume}B</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Companies:</span>
              <span className="text-foreground">{data?.companies}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Growth Rate:</span>
              <span className="text-success">{data?.growthRate}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    const radius = Math.sqrt(payload?.investmentVolume) * 3;
    
    return (
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill={payload?.color}
        fillOpacity={0.7}
        stroke={payload?.color}
        strokeWidth={2}
        className="cursor-pointer hover:fill-opacity-90 transition-all"
        onClick={() => setSelectedBubble(payload)}
      />
    );
  };

  const filteredData = getFilteredData();

  return (
    <div className="glassmorphism rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
            Investment Opportunity Matrix
          </h3>
          <p className="text-sm text-muted-foreground">
            Market size vs adoption rate (bubble size = investment volume)
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.25))}
            className="p-2 rounded-lg bg-card/50 hover:bg-card/70 transition-smooth"
          >
            <Icon name="ZoomOut" size={16} className="text-muted-foreground" />
          </button>
          <span className="text-sm text-muted-foreground px-2">{Math.round(zoomLevel * 100)}%</span>
          <button
            onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.25))}
            className="p-2 rounded-lg bg-card/50 hover:bg-card/70 transition-smooth"
          >
            <Icon name="ZoomIn" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map(category => (
          <button
            key={category?.key}
            onClick={() => setSelectedCategory(category?.key)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-smooth ${
              selectedCategory === category?.key
                ? 'bg-primary/20 text-primary neon-border' :'bg-card/30 text-muted-foreground hover:text-foreground'
            }`}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category?.color }}
            />
            <span className="text-sm font-medium">{category?.label}</span>
          </button>
        ))}
      </div>
      {/* Chart */}
      <div className="h-96 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
            <XAxis 
              type="number"
              dataKey="marketSize"
              name="Market Size"
              unit="B"
              stroke="#b8bcc8"
              fontSize={12}
              tickLine={false}
              label={{ value: 'Market Size (Billions USD)', position: 'insideBottom', offset: -10, style: { textAnchor: 'middle', fill: '#b8bcc8' } }}
            />
            <YAxis 
              type="number"
              dataKey="adoptionRate"
              name="Adoption Rate"
              unit="%"
              stroke="#b8bcc8"
              fontSize={12}
              tickLine={false}
              label={{ value: 'Adoption Rate (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#b8bcc8' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter
              dataKey="adoptionRate"
              shape={<CustomDot />}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      {/* Legend and Selected Info */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Bubble Size:</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-xs text-muted-foreground">$2B</span>
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <span className="text-xs text-muted-foreground">$10B</span>
              <div className="w-6 h-6 bg-primary rounded-full"></div>
              <span className="text-xs text-muted-foreground">$15B+</span>
            </div>
          </div>
        </div>

        {selectedBubble && (
          <div className="glassmorphism px-4 py-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: selectedBubble?.color }}
              />
              <div>
                <h4 className="font-heading font-medium text-foreground">{selectedBubble?.name}</h4>
                <p className="text-xs text-muted-foreground">
                  ${selectedBubble?.marketSize}B market • {selectedBubble?.adoptionRate}% adoption • {selectedBubble?.growthRate}% growth
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentBubbleChart;