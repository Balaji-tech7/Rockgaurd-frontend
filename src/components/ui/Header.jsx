import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';


const Header = ({ 
  isCollapsed = false, 
  onToggleSidebar = () => {},
  currentSite = 'Site Alpha',
  onSiteChange = () => {},
  alertCount = 0 
}) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnalysisDropdownOpen, setIsAnalysisDropdownOpen] = useState(false);
  const [isManagementDropdownOpen, setIsManagementDropdownOpen] = useState(false);
  const [isSiteDropdownOpen, setIsSiteDropdownOpen] = useState(false);
  const analysisDropdownRef = useRef(null);
  const managementDropdownRef = useRef(null);
  const siteDropdownRef = useRef(null);

  const sites = [
    { value: 'site-alpha', label: 'Site Alpha' },
    { value: 'site-beta', label: 'Site Beta' },
    { value: 'site-gamma', label: 'Site Gamma' },
    { value: 'site-delta', label: 'Site Delta' }
  ];

  const analysisItems = [
    { path: '/site-risk-analysis', label: 'Site Risk Analysis', icon: 'TrendingUp' },
    { path: '/predictive-analytics', label: 'Predictive Analytics', icon: 'BarChart3' },
    { path: '/sensor-data-monitoring', label: 'Sensor Data Monitoring', icon: 'Activity' }
  ];

  const managementItems = [
    { path: '/alert-management', label: 'Alert Management', icon: 'AlertTriangle' },
    { path: '/data-import-management', label: 'Data Import Management', icon: 'Upload' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (analysisDropdownRef?.current && !analysisDropdownRef?.current?.contains(event?.target)) {
        setIsAnalysisDropdownOpen(false);
      }
      if (managementDropdownRef?.current && !managementDropdownRef?.current?.contains(event?.target)) {
        setIsManagementDropdownOpen(false);
      }
      if (siteDropdownRef?.current && !siteDropdownRef?.current?.contains(event?.target)) {
        setIsSiteDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActiveRoute = (path) => location?.pathname === path;
  const isAnalysisActive = analysisItems?.some(item => isActiveRoute(item?.path));
  const isManagementActive = managementItems?.some(item => isActiveRoute(item?.path));

  const handleSiteChange = (selectedSite) => {
    onSiteChange(selectedSite);
    setIsSiteDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <Link to="/main-dashboard" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground">
                <path
                  fill="currentColor"
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                />
              </svg>
            </div>
            <span className="text-xl font-heading font-semibold text-foreground">
              RockGuard AI
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            to="/main-dashboard"
            className={`px-3 py-2 text-sm font-body font-medium transition-smooth rounded-md ${
              isActiveRoute('/main-dashboard')
                ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            Dashboard
          </Link>

          {/* Analysis Dropdown */}
          <div className="relative" ref={analysisDropdownRef}>
            <button
              onClick={() => setIsAnalysisDropdownOpen(!isAnalysisDropdownOpen)}
              className={`flex items-center px-3 py-2 text-sm font-body font-medium transition-smooth rounded-md ${
                isAnalysisActive
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Analysis
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`ml-1 transition-transform ${isAnalysisDropdownOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            {isAnalysisDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-popover border border-border rounded-md shadow-elevation-2 z-1010 animate-slide-down">
                <div className="py-1">
                  {analysisItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      onClick={() => setIsAnalysisDropdownOpen(false)}
                      className={`flex items-center px-4 py-2 text-sm font-body transition-smooth ${
                        isActiveRoute(item?.path)
                          ? 'text-primary bg-primary/10' :'text-popover-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} className="mr-3" />
                      {item?.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Management Dropdown */}
          <div className="relative" ref={managementDropdownRef}>
            <button
              onClick={() => setIsManagementDropdownOpen(!isManagementDropdownOpen)}
              className={`flex items-center px-3 py-2 text-sm font-body font-medium transition-smooth rounded-md ${
                isManagementActive
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Management
              {alertCount > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-error text-error-foreground rounded-full">
                  {alertCount > 99 ? '99+' : alertCount}
                </span>
              )}
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`ml-1 transition-transform ${isManagementDropdownOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            {isManagementDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-popover border border-border rounded-md shadow-elevation-2 z-1010 animate-slide-down">
                <div className="py-1">
                  {managementItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      onClick={() => setIsManagementDropdownOpen(false)}
                      className={`flex items-center px-4 py-2 text-sm font-body transition-smooth ${
                        isActiveRoute(item?.path)
                          ? 'text-primary bg-primary/10' :'text-popover-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} className="mr-3" />
                      {item?.label}
                      {item?.path === '/alert-management' && alertCount > 0 && (
                        <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-error text-error-foreground rounded-full">
                          {alertCount > 99 ? '99+' : alertCount}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Site Selector and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Site Selector */}
          <div className="relative" ref={siteDropdownRef}>
            <button
              onClick={() => setIsSiteDropdownOpen(!isSiteDropdownOpen)}
              className="flex items-center px-3 py-2 text-sm font-body font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth rounded-md"
            >
              <Icon name="MapPin" size={16} className="mr-2" />
              {currentSite}
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`ml-2 transition-transform ${isSiteDropdownOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            {isSiteDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-elevation-2 z-1010 animate-slide-down">
                <div className="py-1">
                  {sites?.map((site) => (
                    <button
                      key={site?.value}
                      onClick={() => handleSiteChange(site?.value)}
                      className={`w-full text-left px-4 py-2 text-sm font-body transition-smooth ${
                        currentSite === site?.label
                          ? 'text-primary bg-primary/10' :'text-popover-foreground hover:bg-muted'
                      }`}
                    >
                      {site?.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-background z-1020 lg:hidden">
          <nav className="p-6 space-y-6">
            <Link
              to="/main-dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-3 text-base font-body font-medium rounded-md transition-smooth ${
                isActiveRoute('/main-dashboard')
                  ? 'text-primary bg-primary/10' :'text-foreground hover:bg-muted'
              }`}
            >
              Dashboard
            </Link>

            <div className="space-y-2">
              <div className="px-4 py-2 text-sm font-body font-semibold text-muted-foreground uppercase tracking-wide">
                Analysis
              </div>
              {analysisItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 text-base font-body rounded-md transition-smooth ${
                    isActiveRoute(item?.path)
                      ? 'text-primary bg-primary/10' :'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} className="mr-3" />
                  {item?.label}
                </Link>
              ))}
            </div>

            <div className="space-y-2">
              <div className="px-4 py-2 text-sm font-body font-semibold text-muted-foreground uppercase tracking-wide">
                Management
              </div>
              {managementItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 text-base font-body rounded-md transition-smooth ${
                    isActiveRoute(item?.path)
                      ? 'text-primary bg-primary/10' :'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} className="mr-3" />
                  {item?.label}
                  {item?.path === '/alert-management' && alertCount > 0 && (
                    <span className="ml-auto px-2 py-1 text-xs font-medium bg-error text-error-foreground rounded-full">
                      {alertCount > 99 ? '99+' : alertCount}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;