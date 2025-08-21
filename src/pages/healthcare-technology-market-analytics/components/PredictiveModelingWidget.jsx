import React, { useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PredictiveModelingWidget = ({ filters }) => {
  const [selectedModel, setSelectedModel] = useState('market-growth');
  const [confidenceLevel, setConfidenceLevel] = useState(95);
  const [scenarioType, setScenarioType] = useState('optimistic');

  const models = [
    { value: 'market-growth', label: 'Market Growth Prediction' },
    { value: 'adoption-rate', label: 'Technology Adoption Rate' },
    { value: 'investment-flow', label: 'Investment Flow Forecast' },
    { value: 'competitive-landscape', label: 'Competitive Dynamics' }
  ];

  const scenarios = [
    { value: 'pessimistic', label: 'Conservative Scenario', color: '#ff4757' },
    { value: 'realistic', label: 'Base Case Scenario', color: '#00d4ff' },
    { value: 'optimistic', label: 'Optimistic Scenario', color: '#00ffa1' }
  ];

  const generatePredictionData = () => {
    const currentYear = new Date()?.getFullYear();
    const data = [];
    
    for (let i = 0; i <= 7; i++) {
      const year = currentYear + i;
      const baseValue = 100 * Math.pow(1.15, i);
      
      const multipliers = {
        pessimistic: 0.8,
        realistic: 1.0,
        optimistic: 1.3
      };
      
      const multiplier = multipliers?.[scenarioType];
      const variance = baseValue * 0.1;
      
      data?.push({
        year: year?.toString(),
        predicted: Math.round(baseValue * multiplier),
        upperBound: Math.round(baseValue * multiplier + variance),
        lowerBound: Math.round(baseValue * multiplier - variance),
        confidence: confidenceLevel,
        historical: i === 0 ? Math.round(baseValue) : null
      });
    }
    
    return data;
  };

  const [predictionData] = useState(generatePredictionData());

  const getModelMetrics = () => {
    const latestPrediction = predictionData?.[predictionData?.length - 1];
    const firstPrediction = predictionData?.[0];
    const cagr = Math.pow(latestPrediction?.predicted / firstPrediction?.predicted, 1/7) - 1;
    
    return {
      cagr: (cagr * 100)?.toFixed(1),
      accuracy: '87.3',
      volatility: '12.4',
      rSquared: '0.94'
    };
  };

  const metrics = getModelMetrics();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glassmorphism p-3 rounded-lg border border-primary/20">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="text-sm">
              <div className="flex justify-between items-center">
                <span style={{ color: entry?.color }}>{entry?.name}:</span>
                <span className="font-data ml-2">${entry?.value}B</span>
              </div>
              {entry?.dataKey === 'predicted' && (
                <div className="text-xs text-muted-foreground mt-1">
                  Confidence: {entry?.payload?.confidence}%
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glassmorphism rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
            AI-Powered Predictive Analytics
          </h3>
          <p className="text-sm text-muted-foreground">
            Advanced forecasting with confidence intervals
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
          >
            Configure
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Play"
          >
            Run Model
          </Button>
        </div>
      </div>
      {/* Model Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <Select
            label="Prediction Model"
            options={models}
            value={selectedModel}
            onChange={setSelectedModel}
          />
        </div>

        <div>
          <Select
            label="Scenario Type"
            options={scenarios}
            value={scenarioType}
            onChange={setScenarioType}
          />
        </div>

        <div>
          <label className="block text-sm font-caption text-muted-foreground mb-2">
            Confidence Level: {confidenceLevel}%
          </label>
          <input
            type="range"
            min="80"
            max="99"
            value={confidenceLevel}
            onChange={(e) => setConfidenceLevel(parseInt(e?.target?.value))}
            className="w-full h-2 bg-card rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${(confidenceLevel - 80) * 5.26}%, var(--color-card) ${(confidenceLevel - 80) * 5.26}%, var(--color-card) 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>80%</span>
            <span>99%</span>
          </div>
        </div>
      </div>
      {/* Prediction Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={predictionData}>
            <defs>
              <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#00d4ff" stopOpacity={0.05}/>
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
              tickFormatter={(value) => `$${(value / 1000)?.toFixed(0)}B`}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Confidence Interval */}
            <Area
              type="monotone"
              dataKey="upperBound"
              stackId="1"
              stroke="none"
              fill="url(#confidenceGradient)"
            />
            <Area
              type="monotone"
              dataKey="lowerBound"
              stackId="1"
              stroke="none"
              fill="url(#confidenceGradient)"
            />
            
            {/* Main Prediction Line */}
            <Line
              type="monotone"
              dataKey="predicted"
              stroke={scenarios?.find(s => s?.value === scenarioType)?.color || '#00d4ff'}
              strokeWidth={3}
              dot={{ fill: scenarios?.find(s => s?.value === scenarioType)?.color, strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, stroke: scenarios?.find(s => s?.value === scenarioType)?.color, strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Model Performance Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-card/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">CAGR</span>
          </div>
          <div className="text-xl font-data font-bold text-success">{metrics?.cagr}%</div>
          <p className="text-xs text-muted-foreground">Compound Annual Growth</p>
        </div>

        <div className="bg-card/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Accuracy</span>
          </div>
          <div className="text-xl font-data font-bold text-primary">{metrics?.accuracy}%</div>
          <p className="text-xs text-muted-foreground">Historical Accuracy</p>
        </div>

        <div className="bg-card/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Activity" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Volatility</span>
          </div>
          <div className="text-xl font-data font-bold text-warning">{metrics?.volatility}%</div>
          <p className="text-xs text-muted-foreground">Market Volatility</p>
        </div>

        <div className="bg-card/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="BarChart3" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">R²</span>
          </div>
          <div className="text-xl font-data font-bold text-accent">{metrics?.rSquared}</div>
          <p className="text-xs text-muted-foreground">Model Fit Quality</p>
        </div>
      </div>
      {/* Scenario Planning */}
      <div className="bg-card/20 rounded-lg p-4">
        <h4 className="font-heading font-medium text-foreground mb-3">Scenario Analysis</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios?.map(scenario => {
            const isSelected = scenarioType === scenario?.value;
            return (
              <button
                key={scenario?.value}
                onClick={() => setScenarioType(scenario?.value)}
                className={`p-3 rounded-lg text-left transition-smooth ${
                  isSelected ? 'bg-primary/20 neon-border' : 'bg-card/30 hover:bg-card/50'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: scenario?.color }}
                  />
                  <span className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                    {scenario?.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {scenario?.value === 'pessimistic' && 'Conservative growth assumptions with market headwinds'}
                  {scenario?.value === 'realistic' && 'Balanced outlook based on current trends'}
                  {scenario?.value === 'optimistic' && 'Accelerated adoption with favorable conditions'}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PredictiveModelingWidget;