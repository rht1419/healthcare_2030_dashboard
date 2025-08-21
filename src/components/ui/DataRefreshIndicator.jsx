import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const DataRefreshIndicator = ({ 
  isConnected = true, 
  lastUpdate = null, 
  refreshInterval = 30000,
  onRefresh = () => {} 
}) => {
  const [connectionStatus, setConnectionStatus] = useState(isConnected);
  const [lastRefresh, setLastRefresh] = useState(lastUpdate || new Date());
  const [timeAgo, setTimeAgo] = useState('Just now');

  const getStatusColor = () => {
    if (!connectionStatus) return 'text-destructive';
    return 'text-success';
  };

  const getStatusIcon = () => {
    if (!connectionStatus) return 'WifiOff';
    return 'Wifi';
  };

  const getStatusText = () => {
    if (!connectionStatus) return 'Offline';
    return 'Live';
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(formatTimeAgo(lastRefresh));
    }, 1000);

    return () => clearInterval(interval);
  }, [lastRefresh]);

  useEffect(() => {
    setConnectionStatus(isConnected);
  }, [isConnected]);

  useEffect(() => {
    if (lastUpdate) {
      setLastRefresh(lastUpdate);
    }
  }, [lastUpdate]);

  const handleRefresh = () => {
    setLastRefresh(new Date());
    setTimeAgo('Just now');
    onRefresh();
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Connection Status */}
      <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-card/30 border border-border">
        <div className={`w-2 h-2 rounded-full ${connectionStatus ? 'bg-success pulse-glow' : 'bg-destructive'}`} />
        <Icon 
          name={getStatusIcon()} 
          size={14} 
          className={`${getStatusColor()} transition-smooth`} 
        />
        <span className={`text-xs font-data ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>

      {/* Last Update Time */}
      <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-lg bg-card/30 border border-border">
        <Icon name="Clock" size={14} className="text-muted-foreground" />
        <span className="text-xs font-data text-muted-foreground">
          {timeAgo}
        </span>
      </div>

      {/* Manual Refresh Button */}
      <button
        onClick={handleRefresh}
        className="p-2 rounded-lg hover:bg-card/50 transition-smooth group"
        title="Refresh data"
      >
        <Icon 
          name="RefreshCw" 
          size={16} 
          className="text-muted-foreground group-hover:text-primary transition-smooth group-hover:rotate-180" 
        />
      </button>
    </div>
  );
};

export default DataRefreshIndicator;