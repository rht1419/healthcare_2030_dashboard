import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MachineLearningInsights = () => {
  const [activeInsight, setActiveInsight] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const insights = [
    {
      id: 'breakthrough_prediction',
      title: 'Breakthrough Technology Prediction',
      category: 'Innovation Forecast',
      confidence: 92,
      impact: 'High',
      timeframe: '18-24 months',
      icon: 'Zap',
      color: 'text-accent',
      bgColor: 'bg-accent/20',
      prediction: `AI-powered drug discovery platforms will achieve breakthrough status by Q2 2026, reducing pharmaceutical development timelines by 40-60%. Machine learning models predict convergence of quantum computing and molecular simulation will accelerate compound identification.`,
      keyFactors: [
        'Quantum computing advancement acceleration',
        'Regulatory framework adaptation for AI drugs',
        'Big pharma AI investment surge (+340%)',
        'Clinical trial digitization completion'
      ],
      riskFactors: [
        'Regulatory approval delays',
        'Data privacy concerns',
        'Technical scalability challenges'
      ]
    },
    {
      id: 'market_disruption',
      title: 'Market Disruption Analysis',
      category: 'Competitive Intelligence',
      confidence: 87,
      impact: 'Very High',
      timeframe: '12-18 months',
      icon: 'TrendingUp',
      color: 'text-primary',
      bgColor: 'bg-primary/20',
      prediction: `Decentralized healthcare platforms will disrupt traditional care delivery models by 2025, capturing 25-35% market share in preventive care. AI predicts consolidation of telemedicine providers into 3-5 dominant platforms.`,
      keyFactors: [
        'Consumer preference shift to digital-first care',
        'Insurance reimbursement policy changes',
        'Healthcare worker shortage acceleration',
        'Cost reduction pressure on healthcare systems'
      ],
      riskFactors: [
        'Regulatory resistance to disruption',
        'Quality of care concerns',
        'Digital divide limitations'
      ]
    },
    {
      id: 'investment_timing',
      title: 'Optimal Investment Timing',
      category: 'Financial Strategy',
      confidence: 94,
      impact: 'High',
      timeframe: '6-12 months',
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/20',
      prediction: `Machine learning models identify Q1-Q2 2025 as optimal investment window for surgical robotics companies. Predicted 180-220% ROI potential based on adoption curve inflection points and regulatory approval acceleration.`,
      keyFactors: [
        'FDA approval pipeline acceleration',
        'Hospital capital expenditure cycles',
        'Surgeon training program expansion',
        'Insurance coverage expansion for robotic procedures'
      ],
      riskFactors: [
        'Economic downturn impact on hospital budgets',
        'Technology obsolescence risk',
        'Competition intensification'
      ]
    },
    {
      id: 'regulatory_changes',
      title: 'Regulatory Impact Forecast',
      category: 'Policy Analysis',
      confidence: 89,
      impact: 'Medium',
      timeframe: '24-36 months',
      icon: 'Shield',
      color: 'text-secondary',
      bgColor: 'bg-secondary/20',
      prediction: `AI models predict major healthcare data privacy regulations will be enacted by 2027, requiring 60-80% of health tech companies to restructure data handling practices. Compliance costs estimated at $2.4B industry-wide.`,
      keyFactors: [
        'Increasing data breach incidents',
        'Patient privacy advocacy pressure',
        'International regulatory harmonization',
        'AI transparency requirements'
      ],
      riskFactors: [
        'Implementation timeline delays',
        'Industry pushback and lobbying',
        'Technical compliance challenges'
      ]
    }
  ];

  const modelMetrics = [
    {
      name: 'Prediction Accuracy',
      value: 94.2,
      unit: '%',
      trend: '+2.1%',
      icon: 'Target',
      color: 'text-success'
    },
    {
      name: 'Data Processing Speed',
      value: 2.4,
      unit: 'TB/hr',
      trend: '+15%',
      icon: 'Cpu',
      color: 'text-primary'
    },
    {
      name: 'Model Confidence',
      value: 87.8,
      unit: '%',
      trend: '+0.8%',
      icon: 'Brain',
      color: 'text-accent'
    },
    {
      name: 'Real-time Updates',
      value: 15,
      unit: 'min',
      trend: '-5min',
      icon: 'Clock',
      color: 'text-secondary'
    }
  ];

  const generateNewInsight = async () => {
    setIsGenerating(true);
    // Simulate AI generation process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    // In real implementation, this would trigger new insight generation
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveInsight((prev) => (prev + 1) % insights?.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [insights?.length]);

  const currentInsight = insights?.[activeInsight];

  return (
    <div className="glassmorphism rounded-xl border border-primary/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            AI-Generated Insights
          </h2>
          <p className="text-sm text-muted-foreground font-caption">
            Machine learning predictions with explainable AI
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-card/30 border border-border">
            <div className="w-2 h-2 bg-success rounded-full pulse-glow" />
            <span className="text-xs font-data text-success">AI Active</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            iconName="RefreshCw"
            loading={isGenerating}
            onClick={generateNewInsight}
          >
            Generate New
          </Button>
        </div>
      </div>
      {/* Model Performance Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {modelMetrics?.map((metric, index) => (
          <div key={index} className="bg-card/30 rounded-lg p-4 border border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name={metric?.icon} size={16} className={metric?.color} />
              <span className="text-xs font-caption text-muted-foreground">
                {metric?.name}
              </span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-heading font-bold text-foreground">
                {metric?.value}
              </span>
              <span className="text-sm font-data text-muted-foreground">
                {metric?.unit}
              </span>
            </div>
            <div className="flex items-center space-x-1 mt-1">
              <Icon 
                name={metric?.trend?.startsWith('+') ? 'TrendingUp' : 'TrendingDown'} 
                size={12} 
                className={metric?.trend?.startsWith('+') ? 'text-success' : 'text-destructive'} 
              />
              <span className={`text-xs font-data ${
                metric?.trend?.startsWith('+') ? 'text-success' : 'text-destructive'
              }`}>
                {metric?.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Main Insight Display */}
      <div className="bg-card/20 rounded-lg border border-border p-6 mb-6">
        <div className="flex items-start space-x-4">
          <div className={`p-3 rounded-lg ${currentInsight?.bgColor}`}>
            <Icon 
              name={currentInsight?.icon} 
              size={24} 
              className={currentInsight?.color} 
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-heading font-bold text-foreground">
                {currentInsight?.title}
              </h3>
              <span className="px-2 py-1 rounded text-xs font-data bg-primary/20 text-primary">
                {currentInsight?.category}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="Target" size={16} className="text-success" />
                <span className="text-sm text-muted-foreground">Confidence:</span>
                <span className="text-sm font-data text-success">
                  {currentInsight?.confidence}%
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={16} className="text-warning" />
                <span className="text-sm text-muted-foreground">Impact:</span>
                <span className="text-sm font-data text-warning">
                  {currentInsight?.impact}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">Timeframe:</span>
                <span className="text-sm font-data text-primary">
                  {currentInsight?.timeframe}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-foreground leading-relaxed mb-4">
              {currentInsight?.prediction}
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-heading font-semibold text-sm text-success mb-2">
                  Key Success Factors
                </h4>
                <ul className="space-y-1">
                  {currentInsight?.keyFactors?.map((factor, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={14} className="text-success mt-0.5" />
                      <span className="text-xs text-muted-foreground">
                        {factor}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-heading font-semibold text-sm text-destructive mb-2">
                  Risk Factors
                </h4>
                <ul className="space-y-1">
                  {currentInsight?.riskFactors?.map((risk, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="AlertTriangle" size={14} className="text-destructive mt-0.5" />
                      <span className="text-xs text-muted-foreground">
                        {risk}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Insight Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {insights?.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveInsight(index)}
              className={`w-2 h-2 rounded-full transition-smooth ${
                index === activeInsight 
                  ? 'bg-primary pulse-glow' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            iconName="ChevronLeft"
            onClick={() => setActiveInsight((prev) => (prev - 1 + insights?.length) % insights?.length)}
          />
          <span className="text-xs font-data text-muted-foreground">
            {activeInsight + 1} of {insights?.length}
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            iconName="ChevronRight"
            onClick={() => setActiveInsight((prev) => (prev + 1) % insights?.length)}
          />
        </div>
      </div>
    </div>
  );
};

export default MachineLearningInsights;