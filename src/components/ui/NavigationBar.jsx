import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Command Center',
      path: '/global-healthcare-innovation-command-center',
      icon: 'Activity',
      tooltip: 'Executive dashboard with comprehensive healthcare transformation oversight'
    },
    {
      label: 'Market Analytics',
      path: '/healthcare-technology-market-analytics',
      icon: 'TrendingUp',
      tooltip: 'Investment-focused market intelligence and competitive analysis'
    },
    {
      label: 'Live Monitoring',
      path: '/real-time-health-innovation-monitoring',
      icon: 'Monitor',
      tooltip: 'Operational dashboard for continuous innovation deployment tracking'
    },
    {
      label: 'Predictive Analytics',
      path: '/predictive-healthcare-transformation-analytics',
      icon: 'Brain',
      tooltip: 'Advanced forecasting and scenario modeling for 2030 planning'
    }
  ];

  const isActiveRoute = (path) => location?.pathname === path;

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event?.target?.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
      if (!event?.target?.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-1000 glassmorphism border-b border-primary/20">
      <div className="max-w-full px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/global-healthcare-innovation-command-center" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center holographic-glow">
                  <Icon name="Zap" size={24} color="#0a0a0f" strokeWidth={2.5} />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-heading font-bold text-foreground">
                  Healthcare 2030
                </h1>
                <p className="text-xs font-caption text-muted-foreground -mt-1">
                  Dashboard
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`group relative px-4 py-2 rounded-lg transition-smooth ${
                  isActiveRoute(item?.path)
                    ? 'bg-primary/20 text-primary neon-border' :'text-muted-foreground hover:text-foreground hover:bg-card/50'
                }`}
                title={item?.tooltip}
              >
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={item?.icon} 
                    size={18} 
                    className={isActiveRoute(item?.path) ? 'text-primary' : 'text-current'} 
                  />
                  <span className="font-heading font-medium text-sm">
                    {item?.label}
                  </span>
                </div>
                {isActiveRoute(item?.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full pulse-glow" />
                )}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Data Refresh Indicator */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-lg bg-card/30 border border-border">
              <div className="w-2 h-2 bg-success rounded-full pulse-glow" />
              <span className="text-xs font-data text-muted-foreground">
                Live
              </span>
            </div>

            {/* User Menu */}
            <div className="relative user-menu-container">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                  <Icon name="User" size={16} color="#ffffff" />
                </div>
                <div className="hidden md:flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">
                    Dr. Aaliyah
                  </span>
                </div>
                {/* Mobile view - Doctor name with live dot */}
                <div className="flex md:hidden items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">
                    Dr. Aaliyah
                  </span>
                  <div className="w-2 h-2 bg-green-500 rounded-full pulse-glow" />
                </div>
                <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
              </Button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 glassmorphism rounded-lg border border-primary/20 elevation-combined animate-slide-in">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                        <Icon name="User" size={20} color="#ffffff" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Dr. Aaliyah</p>
                        <p className="text-sm text-muted-foreground">Chief Medical Officer</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-card/50 transition-smooth text-left">
                      <Icon name="Settings" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">Settings</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-card/50 transition-smooth text-left">
                      <Icon name="HelpCircle" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">Help & Support</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-destructive/20 transition-smooth text-left">
                      <Icon name="LogOut" size={16} className="text-destructive" />
                      <span className="text-sm text-destructive">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mobile-menu-container">
          <div className="glassmorphism border-t border-primary/20 animate-slide-in">
            <div className="px-4 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth ${
                    isActiveRoute(item?.path)
                      ? 'bg-primary/20 text-primary neon-border' :'text-muted-foreground hover:text-foreground hover:bg-card/50'
                  }`}
                >
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    className={isActiveRoute(item?.path) ? 'text-primary' : 'text-current'} 
                  />
                  <div>
                    <span className="font-heading font-medium text-base">
                      {item?.label}
                    </span>
                    <p className="text-xs text-muted-foreground font-caption">
                      {item?.tooltip}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
