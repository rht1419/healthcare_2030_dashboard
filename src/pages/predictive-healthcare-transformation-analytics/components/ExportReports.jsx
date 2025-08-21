import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportReports = () => {
  const [selectedReports, setSelectedReports] = useState([]);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);

  const reportTypes = [
    {
      id: 'strategic_planning',
      name: 'Strategic Planning Report',
      description: 'Comprehensive healthcare transformation roadmap with 2030 projections',
      icon: 'FileText',
      size: '2.4 MB',
      pages: 45,
      sections: ['Executive Summary', 'Market Analysis', 'Technology Roadmap', 'Investment Recommendations']
    },
    {
      id: 'investment_analysis',
      name: 'Investment Analysis Brief',
      description: 'Financial forecasting and ROI projections for healthcare technologies',
      icon: 'TrendingUp',
      size: '1.8 MB',
      pages: 28,
      sections: ['Market Opportunities', 'Risk Assessment', 'Portfolio Recommendations', 'Timeline Analysis']
    },
    {
      id: 'policy_briefing',
      name: 'Policy Impact Briefing',
      description: 'Regulatory landscape analysis and policy recommendations',
      icon: 'Shield',
      size: '1.2 MB',
      pages: 22,
      sections: ['Regulatory Overview', 'Compliance Requirements', 'Policy Recommendations', 'Implementation Timeline']
    },
    {
      id: 'technology_forecast',
      name: 'Technology Forecast Dashboard',
      description: 'Interactive data visualizations and predictive models export',
      icon: 'BarChart3',
      size: '3.1 MB',
      pages: 35,
      sections: ['Adoption Curves', 'Correlation Analysis', 'Scenario Modeling', 'ML Insights']
    },
    {
      id: 'executive_summary',
      name: 'Executive Summary',
      description: 'High-level overview for C-suite and board presentations',
      icon: 'Crown',
      size: '0.8 MB',
      pages: 12,
      sections: ['Key Findings', 'Strategic Recommendations', 'Critical Milestones', 'Next Steps']
    },
    {
      id: 'competitive_intelligence',
      name: 'Competitive Intelligence Report',
      description: 'Market positioning and competitive landscape analysis',
      icon: 'Zap',
      size: '2.0 MB',
      pages: 31,
      sections: ['Market Leaders', 'Emerging Players', 'Technology Gaps', 'Opportunity Matrix']
    }
  ];

  const exportFormats = [
    { id: 'pdf', name: 'PDF Document', icon: 'FileText', description: 'Formatted report with charts and graphs' },
    { id: 'excel', name: 'Excel Workbook', icon: 'Table', description: 'Data tables and interactive charts' },
    { id: 'powerpoint', name: 'PowerPoint Presentation', icon: 'Presentation', description: 'Executive presentation slides' },
    { id: 'json', name: 'JSON Data', icon: 'Code', description: 'Raw data for API integration' }
  ];

  const customizationOptions = [
    { id: 'include_charts', name: 'Include Interactive Charts', checked: true },
    { id: 'include_raw_data', name: 'Include Raw Data Tables', checked: false },
    { id: 'include_methodology', name: 'Include Methodology Section', checked: true },
    { id: 'include_appendix', name: 'Include Technical Appendix', checked: false },
    { id: 'watermark', name: 'Add Confidential Watermark', checked: true },
    { id: 'executive_summary', name: 'Executive Summary Only', checked: false }
  ];

  const [customOptions, setCustomOptions] = useState(
    customizationOptions?.reduce((acc, option) => ({
      ...acc,
      [option?.id]: option?.checked
    }), {})
  );

  const handleReportSelection = (reportId) => {
    setSelectedReports(prev => 
      prev?.includes(reportId) 
        ? prev?.filter(id => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleSelectAll = () => {
    if (selectedReports?.length === reportTypes?.length) {
      setSelectedReports([]);
    } else {
      setSelectedReports(reportTypes?.map(report => report?.id));
    }
  };

  const handleCustomOptionChange = (optionId) => {
    setCustomOptions(prev => ({
      ...prev,
      [optionId]: !prev?.[optionId]
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsExporting(false);
    // In real implementation, this would trigger the actual export
  };

  const getTotalSize = () => {
    return selectedReports?.reduce((total, reportId) => {
      const report = reportTypes?.find(r => r?.id === reportId);
      return total + parseFloat(report?.size || '0');
    }, 0)?.toFixed(1);
  };

  const getTotalPages = () => {
    return selectedReports?.reduce((total, reportId) => {
      const report = reportTypes?.find(r => r?.id === reportId);
      return total + (report?.pages || 0);
    }, 0);
  };

  return (
    <div className="glassmorphism rounded-xl border border-primary/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">
            Export Reports
          </h2>
          <p className="text-sm text-muted-foreground font-caption">
            Generate comprehensive analytics reports and strategic briefings
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-card/30 border border-border">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <span className="text-xs font-data text-muted-foreground">
              Last export: 2 hours ago
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Selection */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-foreground">
              Select Reports
            </h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSelectAll}
            >
              {selectedReports?.length === reportTypes?.length ? 'Deselect All' : 'Select All'}
            </Button>
          </div>
          
          <div className="space-y-3">
            {reportTypes?.map((report) => (
              <div
                key={report?.id}
                className={`p-4 rounded-lg border transition-smooth cursor-pointer ${
                  selectedReports?.includes(report?.id)
                    ? 'bg-primary/20 border-primary/40 neon-border' :'bg-card/30 border-border hover:bg-card/50'
                }`}
                onClick={() => handleReportSelection(report?.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedReports?.includes(report?.id)}
                      onChange={() => handleReportSelection(report?.id)}
                      className="rounded border-border"
                    />
                    <div className="p-2 rounded-lg bg-card/50">
                      <Icon name={report?.icon} size={20} className="text-primary" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-heading font-semibold text-foreground">
                        {report?.name}
                      </h4>
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <span>{report?.pages} pages</span>
                        <span>{report?.size}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {report?.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {report?.sections?.map((section, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded text-xs font-data bg-card/50 text-muted-foreground"
                        >
                          {section}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Configuration */}
        <div className="space-y-6">
          {/* Format Selection */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-3">
              Export Format
            </h3>
            <div className="space-y-2">
              {exportFormats?.map((format) => (
                <button
                  key={format?.id}
                  onClick={() => setExportFormat(format?.id)}
                  className={`w-full p-3 rounded-lg border transition-smooth text-left ${
                    exportFormat === format?.id
                      ? 'bg-primary/20 border-primary/40 neon-border' :'bg-card/30 border-border hover:bg-card/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={format?.icon} 
                      size={16} 
                      className={exportFormat === format?.id ? 'text-primary' : 'text-muted-foreground'} 
                    />
                    <div>
                      <span className={`font-heading font-medium text-sm ${
                        exportFormat === format?.id ? 'text-primary' : 'text-foreground'
                      }`}>
                        {format?.name}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {format?.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Customization Options */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-3">
              Customization
            </h3>
            <div className="space-y-2">
              {customizationOptions?.map((option) => (
                <label
                  key={option?.id}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-card/30 transition-smooth cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={customOptions?.[option?.id]}
                    onChange={() => handleCustomOptionChange(option?.id)}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-foreground">
                    {option?.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Export Summary */}
          <div className="p-4 bg-card/30 rounded-lg border border-border">
            <h4 className="font-heading font-semibold text-foreground mb-3">
              Export Summary
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Selected Reports:</span>
                <span className="text-foreground">{selectedReports?.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Pages:</span>
                <span className="text-foreground">{getTotalPages()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Size:</span>
                <span className="text-foreground">{getTotalSize()} MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Format:</span>
                <span className="text-foreground uppercase">{exportFormat}</span>
              </div>
            </div>
          </div>

          {/* Export Button */}
          <Button
            variant="default"
            fullWidth
            iconName="Download"
            loading={isExporting}
            onClick={handleExport}
            disabled={selectedReports?.length === 0}
          >
            {isExporting ? 'Generating Reports...' : 'Export Selected Reports'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportReports;