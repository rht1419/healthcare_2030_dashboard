import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertFeed = ({ maxAlerts = 50 }) => {
  const [alerts, setAlerts] = useState([]);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const mockAlerts = [
    {
      id: 'alert-001',
      title: 'AI Diagnostics Deployment Anomaly',
      message: 'Unusual spike in deployment failures detected in North America region. 15% increase in error rates over last 30 minutes.',
      severity: 'critical',
      category: 'deployment',
      timestamp: new Date(Date.now() - 300000),
      source: 'AI Diagnostics Monitor',
      actionRequired: true,
      icon: 'AlertTriangle'
    },
    {
      id: 'alert-002',
      title: 'Telemedicine Adoption Milestone',
      message: 'European telemedicine adoption has reached 85% target ahead of schedule. Celebrating successful implementation across 12 countries.',
      severity: 'success',
      category: 'milestone',
      timestamp: new Date(Date.now() - 900000),
      source: 'Adoption Tracker',
      actionRequired: false,
      icon: 'CheckCircle'
    },
    {
      id: 'alert-003',
      title: 'Surgical Robotics Performance Warning',
      message: 'Minor performance degradation observed in surgical robotics systems. Average response time increased by 200ms.',
      severity: 'warning',
      category: 'performance',
      timestamp: new Date(Date.now() - 1200000),
      source: 'Performance Monitor',
      actionRequired: true,
      icon: 'AlertCircle'
    },
    {
      id: 'alert-004',
      title: 'Gene Editing Compliance Update',
      message: 'New regulatory compliance requirements published for CRISPR implementations. Review required within 48 hours.',
      severity: 'info',
      category: 'compliance',
      timestamp: new Date(Date.now() - 1800000),
      source: 'Compliance System',
      actionRequired: true,
      icon: 'Info'
    },
    {
      id: 'alert-005',
      title: 'VR Therapy Session Spike',
      message: 'Unexpected 300% increase in VR therapy sessions in Asia-Pacific region. Infrastructure scaling automatically triggered.',
      severity: 'warning',
      category: 'capacity',
      timestamp: new Date(Date.now() - 2400000),
      source: 'Capacity Monitor',
      actionRequired: false,
      icon: 'TrendingUp'
    },
    {
      id: 'alert-006',
      title: 'Predictive Analytics Model Update',
      message: 'Machine learning models updated with latest healthcare data. Accuracy improved by 12% across all prediction categories.',
      severity: 'success',
      category: 'system',
      timestamp: new Date(Date.now() - 3000000),
      source: 'ML Pipeline',
      actionRequired: false,
      icon: 'Brain'
    }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severities', color: 'text-muted-foreground' },
    { value: 'critical', label: 'Critical', color: 'text-destructive' },
    { value: 'warning', label: 'Warning', color: 'text-warning' },
    { value: 'success', label: 'Success', color: 'text-success' },
    { value: 'info', label: 'Info', color: 'text-primary' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'deployment', label: 'Deployment' },
    { value: 'performance', label: 'Performance' },
    { value: 'milestone', label: 'Milestones' },
    { value: 'compliance', label: 'Compliance' },
    { value: 'capacity', label: 'Capacity' },
    { value: 'system', label: 'System' }
  ];

  useEffect(() => {
    setAlerts(mockAlerts);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      case 'success': return 'text-success bg-success/10 border-success/20';
      case 'info': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      case 'success': return 'CheckCircle';
      case 'info': return 'Info';
      default: return 'Circle';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const filteredAlerts = alerts?.filter(alert => {
    const severityMatch = filterSeverity === 'all' || alert?.severity === filterSeverity;
    const categoryMatch = filterCategory === 'all' || alert?.category === filterCategory;
    return severityMatch && categoryMatch;
  });

  const handleAlertAction = (alertId, action) => {
    console.log(`Alert ${alertId} action: ${action}`);
    // Handle alert actions (acknowledge, dismiss, escalate, etc.)
  };

  return (
    <div className="glassmorphism rounded-lg p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Bell" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-foreground">
            Alert Feed
          </h3>
          <div className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-data">
            {filteredAlerts?.length}
          </div>
        </div>
        <Button variant="ghost" size="sm" iconName="Settings" iconSize={16}>
          Configure
        </Button>
      </div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="flex-1">
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e?.target?.value)}
            className="w-full px-3 py-2 bg-card/50 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {severityOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e?.target?.value)}
            className="w-full px-3 py-2 bg-card/50 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {categoryOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Alert List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {filteredAlerts?.map((alert) => (
          <div
            key={alert?.id}
            className={`p-4 rounded-lg border transition-smooth hover:elevation-primary ${getSeverityColor(alert?.severity)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getSeverityIcon(alert?.severity)} 
                  size={16} 
                  className={alert?.severity === 'critical' ? 'text-destructive' : 
                            alert?.severity === 'warning' ? 'text-warning' :
                            alert?.severity === 'success' ? 'text-success' : 'text-primary'} 
                />
                <h4 className="font-heading font-medium text-sm text-foreground">
                  {alert?.title}
                </h4>
              </div>
              <span className="text-xs font-data text-muted-foreground whitespace-nowrap">
                {formatTimeAgo(alert?.timestamp)}
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              {alert?.message}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-caption text-muted-foreground">
                  {alert?.source}
                </span>
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                <span className="text-xs font-caption text-muted-foreground capitalize">
                  {alert?.category}
                </span>
              </div>

              {alert?.actionRequired && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleAlertAction(alert?.id, 'acknowledge')}
                  >
                    Acknowledge
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => handleAlertAction(alert?.id, 'investigate')}
                  >
                    Investigate
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full pulse-glow" />
          <span className="text-xs font-data text-muted-foreground">
            Real-time alerts
          </span>
        </div>
        <Button variant="ghost" size="sm" iconName="Archive" iconSize={14}>
          View Archive
        </Button>
      </div>
    </div>
  );
};

export default AlertFeed;