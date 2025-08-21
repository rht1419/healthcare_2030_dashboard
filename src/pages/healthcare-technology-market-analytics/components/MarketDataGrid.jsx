import React, { useState, useMemo } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MarketDataGrid = ({ filters }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'marketSize', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const generateMarketData = () => {
    const technologies = [
      'AI Diagnostics', 'Telemedicine', 'Surgical Robotics', 'Gene Therapy',
      'Wearable Devices', 'VR/AR Therapy', 'Digital Therapeutics', 'Precision Medicine',
      'Remote Monitoring', 'AI Drug Discovery', 'Robotic Surgery', 'Mental Health Apps',
      'Blockchain Health', 'IoT Medical Devices', 'Nanotechnology', 'Bioinformatics',
      '3D Bioprinting', 'Smart Implants', 'Health Analytics', 'Mobile Health'
    ];

    return technologies?.map((tech, index) => {
      const sparklineData = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        value: Math.round(Math.random() * 100 + 50 + (i * 5))
      }));

      return {
        id: index + 1,
        technology: tech,
        marketSize: Math.round(Math.random() * 50 + 5),
        penetrationRate: Math.round(Math.random() * 80 + 20),
        investmentVolume: Math.round(Math.random() * 15 + 1),
        growthRate: Math.round(Math.random() * 40 + 10),
        companies: Math.round(Math.random() * 500 + 50),
        regulatoryStatus: ['Approved', 'Under Review', 'Pending', 'Cleared']?.[Math.floor(Math.random() * 4)],
        competitiveIndex: Math.round(Math.random() * 10 + 1),
        riskLevel: ['Low', 'Medium', 'High']?.[Math.floor(Math.random() * 3)],
        sparklineData: sparklineData,
        lastUpdated: new Date(Date.now() - Math.random() * 86400000)?.toISOString()
      };
    });
  };

  const [marketData] = useState(generateMarketData());

  const sortedData = useMemo(() => {
    let sortableData = [...marketData];
    if (sortConfig?.key) {
      sortableData?.sort((a, b) => {
        if (a?.[sortConfig?.key] < b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (a?.[sortConfig?.key] > b?.[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [marketData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData?.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={14} className="text-primary" />
      : <Icon name="ArrowDown" size={14} className="text-primary" />;
  };

  const getRegulatoryStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-success bg-success/20';
      case 'Cleared': return 'text-primary bg-primary/20';
      case 'Under Review': return 'text-warning bg-warning/20';
      case 'Pending': return 'text-muted-foreground bg-muted/20';
      default: return 'text-muted-foreground bg-muted/20';
    }
  };

  const getRiskLevelColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-success bg-success/20';
      case 'Medium': return 'text-warning bg-warning/20';
      case 'High': return 'text-destructive bg-destructive/20';
      default: return 'text-muted-foreground bg-muted/20';
    }
  };

  const formatCurrency = (value) => `$${value}B`;
  const formatPercentage = (value) => `${value}%`;
  const formatNumber = (value) => value?.toLocaleString();

  const columns = [
    { key: 'technology', label: 'Technology', sortable: true, width: 'w-48' },
    { key: 'marketSize', label: 'Market Size', sortable: true, width: 'w-32', format: formatCurrency },
    { key: 'penetrationRate', label: 'Penetration', sortable: true, width: 'w-28', format: formatPercentage },
    { key: 'investmentVolume', label: 'Investment', sortable: true, width: 'w-32', format: formatCurrency },
    { key: 'growthRate', label: 'Growth', sortable: true, width: 'w-24', format: formatPercentage },
    { key: 'companies', label: 'Companies', sortable: true, width: 'w-28', format: formatNumber },
    { key: 'regulatoryStatus', label: 'Regulatory', sortable: true, width: 'w-32' },
    { key: 'competitiveIndex', label: 'Competition', sortable: true, width: 'w-28' },
    { key: 'riskLevel', label: 'Risk', sortable: true, width: 'w-24' },
    { key: 'sparkline', label: 'Trend', sortable: false, width: 'w-32' }
  ];

  return (
    <div className="glassmorphism rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
            Comprehensive Market Data
          </h3>
          <p className="text-sm text-muted-foreground">
            Detailed metrics and analytics for healthcare technologies
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
          >
            Refresh
          </Button>
        </div>
      </div>
      {/* Data Grid */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead>
            <tr className="border-b border-border">
              {columns?.map(column => (
                <th key={column?.key} className={`${column?.width} text-left py-3 px-4`}>
                  {column?.sortable ? (
                    <button
                      onClick={() => handleSort(column?.key)}
                      className="flex items-center space-x-2 text-sm font-heading font-medium text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      <span>{column?.label}</span>
                      {getSortIcon(column?.key)}
                    </button>
                  ) : (
                    <span className="text-sm font-heading font-medium text-muted-foreground">
                      {column?.label}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((row, index) => (
              <tr 
                key={row?.id}
                className="border-b border-border/50 hover:bg-card/30 transition-smooth"
              >
                <td className="py-4 px-4">
                  <div className="font-medium text-foreground">{row?.technology}</div>
                  <div className="text-xs text-muted-foreground">
                    Updated {new Date(row.lastUpdated)?.toLocaleDateString()}
                  </div>
                </td>
                <td className="py-4 px-4 font-data text-foreground">
                  {formatCurrency(row?.marketSize)}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-data text-foreground">
                      {formatPercentage(row?.penetrationRate)}
                    </span>
                    <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all"
                        style={{ width: `${row?.penetrationRate}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 font-data text-foreground">
                  {formatCurrency(row?.investmentVolume)}
                </td>
                <td className="py-4 px-4">
                  <span className={`font-data ${row?.growthRate > 20 ? 'text-success' : 'text-foreground'}`}>
                    {formatPercentage(row?.growthRate)}
                  </span>
                </td>
                <td className="py-4 px-4 font-data text-foreground">
                  {formatNumber(row?.companies)}
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRegulatoryStatusColor(row?.regulatoryStatus)}`}>
                    {row?.regulatoryStatus}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 10 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-4 rounded-full ${
                          i < row?.competitiveIndex ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(row?.riskLevel)}`}>
                    {row?.riskLevel}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="h-8 w-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={row?.sparklineData}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#00d4ff" 
                          strokeWidth={1.5}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="text-sm text-muted-foreground">
          Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData?.length)} of {sortedData?.length} technologies
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            iconName="ChevronLeft"
          >
            Previous
          </Button>
          
          <div className="flex space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded text-sm font-medium transition-smooth ${
                    currentPage === pageNum
                      ? 'bg-primary text-background' :'bg-card/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketDataGrid;