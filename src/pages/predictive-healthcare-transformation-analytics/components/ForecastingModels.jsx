import React, { useState, useEffect } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, ComposedChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ForecastingModels = ({ scenarioData = {} }) => {
  const [activeModel, setActiveModel] = useState('adoption');
  const [timeRange, setTimeRange] = useState('5year');
  const [showConfidenceInterval, setShowConfidenceInterval] = useState(true);

  const forecastData = [
    {
      year: '2024',
      aiDiagnostics: 45,
      aiDiagnosticsLow: 40,
      aiDiagnosticsHigh: 50,
      telemedicine: 68,
      telemedicineLow: 62,
      telemedicineHigh: 74,
      roboticSurgery: 25,
      roboticSurgeryLow: 20,
      roboticSurgeryHigh: 30,
      geneTherapy: 15,
      geneTherapyLow: 12,
      geneTherapyHigh: 18
    },
    {
      year: '2025',
      aiDiagnostics: 58,
      aiDiagnosticsLow: 52,
      aiDiagnosticsHigh: 64,
      telemedicine: 75,
      telemedicineLow: 68,
      telemedicineHigh: 82,
      roboticSurgery: 35,
      roboticSurgeryLow: 28,
      roboticSurgeryHigh: 42,
      geneTherapy: 22,
      geneTherapyLow: 18,
      geneTherapyHigh: 26
    },
    {
      year: '2026',
      aiDiagnostics: 72,
      aiDiagnosticsLow: 65,
      aiDiagnosticsHigh: 79,
      telemedicine: 82,
      telemedicineLow: 75,
      telemedicineHigh: 89,
      roboticSurgery: 48,
      roboticSurgeryLow: 40,
      roboticSurgeryHigh: 56,
      geneTherapy: 32,
      geneTherapyLow: 26,
      geneTherapyHigh: 38
    },
    {
      year: '2027',
      aiDiagnostics: 84,
      aiDiagnosticsLow: 76,
      aiDiagnosticsHigh: 92,
      telemedicine: 88,
      telemedicineLow: 82,
      telemedicineHigh: 94,
      roboticSurgery: 62,
      roboticSurgeryLow: 52,
      roboticSurgeryHigh: 72,
      geneTherapy: 45,
      geneTherapyLow: 38,
      geneTherapyHigh: 52
    },
    {
      year: '2028',
      aiDiagnostics: 92,
      aiDiagnosticsLow: 85,
      aiDiagnosticsHigh: 99,
      telemedicine: 93,
      telemedicineLow: 88,
      telemedicineHigh: 98,
      roboticSurgery: 75,
      roboticSurgeryLow: 65,
      roboticSurgeryHigh: 85,
      geneTherapy: 58,
      geneTherapyLow: 48,
      geneTherapyHigh: 68
    },
    {
      year: '2029',
      aiDiagnostics: 96,
      aiDiagnosticsLow: 90,
      aiDiagnosticsHigh: 100,
      telemedicine: 96,
      telemedicineLow: 92,
      telemedicineHigh: 100,
      roboticSurgery: 85,
      roboticSurgeryLow: 75,
      roboticSurgeryHigh: 95,
      geneTherapy: 72,
      geneTherapyLow: 62,
      geneTherapyHigh: 82
    },
    {
      year: '2030',
      aiDiagnostics: 98,
      aiDiagnosticsLow: 94,
      aiDiagnosticsHigh: 100,
      telemedicine: 98,
      telemedicineLow: 95,
      telemedicineHigh: 100,
      roboticSurgery: 92,
      roboticSurgeryLow: 82,
      roboticSurgeryHigh: 100,
      geneTherapy: 85,
      geneTherapyLow: 75,
      geneTherapyHigh: 95
    }
  ];

  const models = [
    {
      id: 'adoption',
      name: 'Technology Adoption',
      description: 'Healthcare technology penetration rates',
      icon: 'TrendingUp',
      color: '#00d4ff'
    },
    {
      id: 'investment',
      name: 'Investment Flow',
      description: 'Capital allocation and funding trends',
      icon: 'DollarSign',
      color: '#00ffa1'
    },
    {
      id: 'outcomes',
      name: 'Health Outcomes',
      description: 'Patient care improvement metrics',
      icon: 'Heart',
      color: '#8a2be2'
    },
    {
      id: 'disruption',
      name: 'Market Disruption',
      description: 'Technology breakthrough impact',
      icon: 'Zap',
      color: '#39ff14'
    }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glassmorphism p-4 rounded-lg border border-primary/20">
          <p className="font-heading font-semibold text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-sm text-foreground">
                {entry?.name}: {entry?.value}%
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeModel) {
      case 'adoption':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="year" 
                stroke="#b8bcc8"
                fontSize={12}
                fontFamily="JetBrains Mono"
              />
              <YAxis 
                stroke="#b8bcc8"
                fontSize={12}
                fontFamily="JetBrains Mono"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {showConfidenceInterval && (
                <>
                  <Area
                    type="monotone"
                    dataKey="aiDiagnosticsHigh"
                    stackId="1"
                    stroke="none"
                    fill="rgba(0, 212, 255, 0.1)"
                  />
                  <Area
                    type="monotone"
                    dataKey="aiDiagnosticsLow"
                    stackId="1"
                    stroke="none"
                    fill="rgba(0, 212, 255, 0.1)"
                  />
                </>
              )}
              
              <Line
                type="monotone"
                dataKey="aiDiagnostics"
                stroke="#00d4ff"
                strokeWidth={3}
                dot={{ fill: '#00d4ff', strokeWidth: 2, r: 4 }}
                name="AI Diagnostics"
              />
              <Line
                type="monotone"
                dataKey="telemedicine"
                stroke="#00ffa1"
                strokeWidth={3}
                dot={{ fill: '#00ffa1', strokeWidth: 2, r: 4 }}
                name="Telemedicine"
              />
              <Line
                type="monotone"
                dataKey="roboticSurgery"
                stroke="#8a2be2"
                strokeWidth={3}
                dot={{ fill: '#8a2be2', strokeWidth: 2, r: 4 }}
                name="Robotic Surgery"
              />
              <Line
                type="monotone"
                dataKey="geneTherapy"
                stroke="#39ff14"
                strokeWidth={3}
                dot={{ fill: '#39ff14', strokeWidth: 2, r: 4 }}
                name="Gene Therapy"
              />
            </ComposedChart>
          </ResponsiveContainer>
        );
      
      default:
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="year" 
                stroke="#b8bcc8"
                fontSize={12}
                fontFamily="JetBrains Mono"
              />
              <YAxis 
                stroke="#b8bcc8"
                fontSize={12}
                fontFamily="JetBrains Mono"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="aiDiagnostics"
                stackId="1"
                stroke="#00d4ff"
                fill="rgba(0, 212, 255, 0.3)"
                name="AI Diagnostics"
              />
              <Area
                type="monotone"
                dataKey="telemedicine"
                stackId="1"
                stroke="#00ffa1"
                fill="rgba(0, 255, 161, 0.3)"
                name="Telemedicine"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="glassmorphism rounded-xl border border-primary/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            Forecasting Models
          </h2>
          <p className="text-sm text-muted-foreground font-caption">
            Advanced predictive analytics with confidence intervals
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="confidence"
              checked={showConfidenceInterval}
              onChange={(e) => setShowConfidenceInterval(e?.target?.checked)}
              className="rounded border-border"
            />
            <label htmlFor="confidence" className="text-xs text-muted-foreground">
              Show Confidence Intervals
            </label>
          </div>
          
          <Button variant="outline" size="sm" iconName="Download">
            Export Model
          </Button>
        </div>
      </div>
      {/* Model Selection */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {models?.map((model) => (
          <button
            key={model?.id}
            onClick={() => setActiveModel(model?.id)}
            className={`p-3 rounded-lg border transition-smooth text-left ${
              activeModel === model?.id
                ? 'bg-primary/20 border-primary/40 neon-border' :'bg-card/30 border-border hover:bg-card/50'
            }`}
          >
            <div className="flex items-center space-x-2 mb-1">
              <Icon 
                name={model?.icon} 
                size={16} 
                className={activeModel === model?.id ? 'text-primary' : 'text-muted-foreground'} 
              />
              <span className={`font-heading font-medium text-sm ${
                activeModel === model?.id ? 'text-primary' : 'text-foreground'
              }`}>
                {model?.name}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {model?.description}
            </p>
          </button>
        ))}
      </div>
      {/* Chart Area */}
      <div className="bg-card/20 rounded-lg p-4 border border-border">
        {renderChart()}
      </div>
      {/* Model Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-card/30 rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-success" />
            <span className="text-sm font-heading font-medium text-foreground">
              Accuracy
            </span>
          </div>
          <p className="text-2xl font-heading font-bold text-success">94.2%</p>
          <p className="text-xs text-muted-foreground">Model precision</p>
        </div>
        
        <div className="bg-card/30 rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-primary" />
            <span className="text-sm font-heading font-medium text-foreground">
              Confidence
            </span>
          </div>
          <p className="text-2xl font-heading font-bold text-primary">87.5%</p>
          <p className="text-xs text-muted-foreground">Prediction reliability</p>
        </div>
        
        <div className="bg-card/30 rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-accent" />
            <span className="text-sm font-heading font-medium text-foreground">
              Horizon
            </span>
          </div>
          <p className="text-2xl font-heading font-bold text-accent">6 Years</p>
          <p className="text-xs text-muted-foreground">Forecast range</p>
        </div>
        
        <div className="bg-card/30 rounded-lg p-4 border border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Database" size={16} className="text-secondary" />
            <span className="text-sm font-heading font-medium text-foreground">
              Data Points
            </span>
          </div>
          <p className="text-2xl font-heading font-bold text-secondary">2.4M</p>
          <p className="text-xs text-muted-foreground">Training dataset</p>
        </div>
      </div>
    </div>
  );
};

export default ForecastingModels;