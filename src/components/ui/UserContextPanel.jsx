import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const UserContextPanel = ({ 
  user = {
    name: 'Dr. Alina & Dr. Aaliyah',
    role: 'Chief Medical Officers',
    department: 'Strategic Analytics',
    permissions: ['executive', 'analytics', 'reports']
  },
  onSettingsChange = () => {},
  onSignOut = () => {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [dataAccess, setDataAccess] = useState('full');

  const refreshOptions = [
    { value: 15, label: '15 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' },
    { value: 300, label: '5 minutes' }
  ];

  const dataAccessLevels = [
    { value: 'full', label: 'Full Access', icon: 'Shield' },
    { value: 'limited', label: 'Limited Access', icon: 'ShieldAlert' },
    { value: 'readonly', label: 'Read Only', icon: 'Eye' }
  ];

  const getUserInitials = (name) => {
    return name?.split(' ')?.map(n => n?.[0])?.join('')?.toUpperCase();
  };

  const getAccessLevelColor = (level) => {
    switch (level) {
      case 'full': return 'text-success';
      case 'limited': return 'text-warning';
      case 'readonly': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const handleSettingChange = (setting, value) => {
    const settings = { refreshInterval, alertsEnabled, dataAccess };
    settings[setting] = value;
    
    if (setting === 'refreshInterval') setRefreshInterval(value);
    if (setting === 'alertsEnabled') setAlertsEnabled(value);
    if (setting === 'dataAccess') setDataAccess(value);
    
    onSettingsChange(settings);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event?.target?.closest('.user-context-panel')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative user-context-panel">
      {/* User Trigger Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 hover:bg-card/50"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-medium text-sm">
          {getUserInitials(user?.name)}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-foreground leading-none">
            {user?.name}
          </p>
          <p className="text-xs text-muted-foreground leading-none mt-0.5">
            {user?.role}
          </p>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </Button>
      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 glassmorphism rounded-lg border border-primary/20 elevation-combined animate-slide-in z-1100">
          {/* User Info Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white font-bold text-lg">
                {getUserInitials(user?.name)}
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-foreground">
                  {user?.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {user?.role}
                </p>
                <p className="text-xs text-muted-foreground font-caption">
                  {user?.department}
                </p>
              </div>
              <div className={`p-2 rounded-lg ${getAccessLevelColor(dataAccess)} bg-card/50`}>
                <Icon 
                  name={dataAccessLevels?.find(level => level?.value === dataAccess)?.icon || 'Shield'} 
                  size={16} 
                />
              </div>
            </div>
          </div>

          {/* Quick Settings */}
          <div className="p-4 border-b border-border">
            <h4 className="font-heading font-medium text-sm text-foreground mb-3">
              Quick Settings
            </h4>
            
            {/* Refresh Interval */}
            <div className="mb-4">
              <label className="text-xs font-caption text-muted-foreground mb-2 block">
                Data Refresh Interval
              </label>
              <div className="flex space-x-1">
                {refreshOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => handleSettingChange('refreshInterval', option?.value)}
                    className={`px-3 py-1 rounded text-xs font-data transition-smooth ${
                      refreshInterval === option?.value
                        ? 'bg-primary/20 text-primary border border-primary/40' :'bg-card/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {option?.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Alerts Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-caption text-foreground">
                  Critical Alerts
                </p>
                <p className="text-xs text-muted-foreground">
                  Real-time notifications
                </p>
              </div>
              <button
                onClick={() => handleSettingChange('alertsEnabled', !alertsEnabled)}
                className={`relative w-10 h-6 rounded-full transition-smooth ${
                  alertsEnabled ? 'bg-success' : 'bg-muted'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  alertsEnabled ? 'translate-x-5' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-card/50 transition-smooth text-left">
              <Icon name="User" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Profile Settings</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-card/50 transition-smooth text-left">
              <Icon name="Bell" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Notification Preferences</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-card/50 transition-smooth text-left">
              <Icon name="Shield" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Security & Privacy</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-card/50 transition-smooth text-left">
              <Icon name="HelpCircle" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Help & Documentation</span>
            </button>
            
            <div className="border-t border-border my-2" />
            
            <button 
              onClick={onSignOut}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-destructive/20 transition-smooth text-left"
            >
              <Icon name="LogOut" size={16} className="text-destructive" />
              <span className="text-sm text-destructive">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserContextPanel;
