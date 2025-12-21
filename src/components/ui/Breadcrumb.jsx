import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  
  const routeMap = {
    '/main-dashboard': 'Dashboard',
    '/site-risk-analysis': 'Site Risk Analysis',
    '/alert-management': 'Alert Management',
    '/sensor-data-monitoring': 'Sensor Data Monitoring',
    '/predictive-analytics': 'Predictive Analytics',
    '/data-import-management': 'Data Import Management'
  };

  const generateBreadcrumbs = () => {
    if (customItems) return customItems;
    
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Dashboard', path: '/main-dashboard' }];
    
    if (location?.pathname !== '/main-dashboard') {
      const currentRoute = routeMap?.[location?.pathname];
      if (currentRoute) {
        breadcrumbs?.push({ label: currentRoute, path: location?.pathname });
      }
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm font-body mb-6" aria-label="Breadcrumb">
      {breadcrumbs?.map((item, index) => (
        <React.Fragment key={item?.path}>
          {index > 0 && (
            <Icon 
              name="ChevronRight" 
              size={16} 
              className="text-muted-foreground" 
            />
          )}
          {index === breadcrumbs?.length - 1 ? (
            <span className="text-foreground font-medium" aria-current="page">
              {item?.label}
            </span>
          ) : (
            <Link
              to={item?.path}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              {item?.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;