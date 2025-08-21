import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationBar from '../../components/ui/NavigationBar';
import DataRefreshIndicator from '../../components/ui/DataRefreshIndicator';
import UserContextPanel from '../../components/ui/UserContextPanel';
import ScenarioBuilder from './components/ScenarioBuilder';
import ForecastingModels from './components/ForecastingModels';
import CorrelationMatrix from './components/CorrelationMatrix';
import MachineLearningInsights from './components/MachineLearningInsights';
import SensitivityAnalysis from './components/SensitivityAnalysis';
import ExportReports from './components/ExportReports';
import Icon from '../../components/AppIcon';


const PredictiveHealthcareTransformationAnalytics = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [scenarioData, setScenarioData] = useState({});
  const [activeSection, setActiveSection] = useState('scenario');

  const sections = [
    { id: 'scenario', name: 'Scenario Builder', icon: 'Settings' },
    { id: 'forecasting', name: 'Forecasting Models', icon: 'TrendingUp' },
    { id: 'correlation', name: 'Correlation Matrix', icon: 'GitBranch' },
    { id: 'insights', name: 'AI Insights', icon: 'Brain' },
    { id: 'sensitivity', name: 'Sensitivity Analysis', icon: 'Target' },
    { id: 'export', name: 'Export Reports', icon: 'Download' }
  ];

  const keyMetrics = [
    {
      label: 'Model Accuracy',
      value: '94.2%',
      trend: '+2.1%',
      icon: 'Target',
      color: 'text-success'
    },
    {
      label: 'Prediction Confidence',
      value: '87.8%',
      trend: '+0.8%',
      icon: 'Brain',
      color: 'text-primary'
    },
    {
      label: 'Data Processing',
      value: '2.4TB/hr',
      trend: '+15%',
      icon: 'Database',
      color: 'text-accent'
    },
    {
      label: 'Scenarios Analyzed',
      value: '1,247',
      trend: '+89',
      icon: 'BarChart3',
      color: 'text-secondary'
    }
  ];

  const handleDataRefresh = () => {
    setLastUpdate(new Date());
    // Simulate data refresh
    console.log('Refreshing predictive analytics data...');
  };

  const handleScenarioChange = (data) => {
    setScenarioData(data);
  };

  const handleUserSettings = (settings) => {
    console.log('User settings updated:', settings);
  };

  const handleSignOut = () => {
    console.log('User signed out');
  };

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'scenario':
        return <ScenarioBuilder onScenarioChange={handleScenarioChange} />;
      case 'forecasting':
        return <ForecastingModels scenarioData={scenarioData} />;
      case 'correlation':
        return <CorrelationMatrix />;
      case 'insights':
        return <MachineLearningInsights />;
      case 'sensitivity':
        return <SensitivityAnalysis />;
      case 'export':
        return <ExportReports />;
      default:
        return <ScenarioBuilder onScenarioChange={handleScenarioChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Predictive Healthcare Transformation Analytics - Healthcare 2030 Dashboard</title>
        <meta name="description" content="Advanced predictive analytics and scenario modeling for healthcare transformation planning by 2030. Strategic forecasting dashboard with machine learning insights." />
      </Helmet>
      <NavigationBar />
      <div className="pt-16">
        {/* Header Section */}
        <div className="px-8 py-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                Predictive Healthcare Transformation Analytics
              </h1>
              <p className="text-muted-foreground font-caption">
                Advanced forecasting and scenario modeling for 2030 healthcare transformation planning
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <DataRefreshIndicator
                isConnected={isConnected}
                lastUpdate={lastUpdate}
                onRefresh={handleDataRefresh}
              />
              <UserContextPanel
                onSettingsChange={handleUserSettings}
                onSignOut={handleSignOut}
              />
            </div>
          </div>
        </div>

        {/* Key Metrics Bar */}
        <div className="px-8 py-4 border-b border-border">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {keyMetrics?.map((metric, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-card/30">
                  <Icon name={metric?.icon} size={20} className={metric?.color} />
                </div>
                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-lg font-heading font-bold text-foreground">
                      {metric?.value}
                    </span>
                    <span className={`text-xs font-data ${
                      metric?.trend?.startsWith('+') ? 'text-success' : 'text-destructive'
                    }`}>
                      {metric?.trend}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground font-caption">
                    {metric?.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Navigation */}
        <div className="px-8 py-4 border-b border-border">
          <div className="flex items-center space-x-1 overflow-x-auto">
            {sections?.map((section) => (
              <button
                key={section?.id}
                onClick={() => setActiveSection(section?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth whitespace-nowrap ${
                  activeSection === section?.id
                    ? 'bg-primary/20 text-primary neon-border' :'text-muted-foreground hover:text-foreground hover:bg-card/50'
                }`}
              >
                <Icon 
                  name={section?.icon} 
                  size={16} 
                  className={activeSection === section?.id ? 'text-primary' : 'text-current'} 
                />
                <span className="font-heading font-medium text-sm">
                  {section?.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="px-8 py-8">
          <div className="max-w-full">
            {renderActiveSection()}
          </div>
        </div>

        {/* Footer */}
        <footer className="px-8 py-6 border-t border-border mt-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-sm text-muted-foreground">
                  HIPAA Compliant
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground">
                  End-to-End Encrypted
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Database" size={16} className="text-accent" />
                <span className="text-sm text-muted-foreground">
                  Real-time Analytics
                </span>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} Healthcare 2030 Dashboard. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PredictiveHealthcareTransformationAnalytics;