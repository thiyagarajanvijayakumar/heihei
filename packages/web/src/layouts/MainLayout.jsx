import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { useAuth } from '../AuthContext';
import { useState } from 'react';
import {
  Menu,
  House,
  Monitor,
  Zap,
  MousePointerClick,
  FileBarChart,
  Bell,
  ScrollText,
  Server,
  FileCode,
  Power,
  ChevronRight,
  ChevronDown,
  Globe,
  MapPin,
  Network
} from 'lucide-react';

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [networkToolsOpen, setNetworkToolsOpen] = useState(true);

  const sidebarMenu = [
    { path: '/', label: 'Home', icon: <House size={18} /> },
    { path: '/synthetic-monitoring', label: 'Synthetic Monitoring', icon: <Monitor size={18} /> },
    {
      label: 'Network tools',
      icon: <Network size={18} />,
      isDropdown: true,
      isOpen: networkToolsOpen,
      toggle: () => setNetworkToolsOpen(!networkToolsOpen),
      subItems: [
        { path: '/dns-checker', label: 'DNS Checker', icon: <Globe size={18} /> },
        { path: '/my-ip-address', label: 'My IP Address', icon: <MapPin size={18} /> }
      ]
    },
    { path: '/analytical-report', label: 'Analytical Report', icon: <FileBarChart size={18} /> },
    { path: '/notification-alert', label: 'Notification Alert', icon: <Bell size={18} /> },
    { path: '/logs-monitoring', label: 'Logs Monitoring', icon: <ScrollText size={18} /> },
    { path: '/server-monitoring', label: 'Server Monitoring', icon: <Server size={18} /> },
    { path: '/code-scanning', label: 'Code scanning', icon: <FileCode size={18} /> }
  ];

  return (
    <div className="app-shell">
      {/* Top Navigation */}
      <header className="top-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ cursor: 'pointer', color: '#666' }}>
            <Menu size={24} />
          </div>
          <div style={{ marginTop: '2px' }}>
            <Logo size="small" />
          </div>
        </div>

        <div
          style={{ cursor: 'pointer', color: '#333', background: 'none', border: 'none', padding: '8px', borderRadius: '50%' }}
          onClick={() => { logout(); navigate('/login'); }}
        >
          <Power size={22} />
        </div>
      </header>

      {/* Main Container */}
      <div className="layout-container">
        {/* Sidebar */}
        <aside className="sidebar-left">
          <nav>
            {sidebarMenu.map((item, idx) => {
              if (item.isDropdown) {
                return (
                  <div key={item.label}>
                    <div
                      className="sidebar-item"
                      onClick={item.toggle}
                      style={{ cursor: 'pointer', justifyContent: 'space-between' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span className="icon-wrapper">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      <span className="icon-wrapper">
                        {item.isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </span>
                    </div>
                    {item.isOpen && (
                      <div style={{ paddingLeft: '15px' }}>
                        {item.subItems.map(sub => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className={`sidebar-item ${location.pathname === sub.path ? 'active' : ''}`}
                            style={{ margin: '4px 8px', borderRadius: '8px' }}
                          >
                            <span className="icon-wrapper">{sub.icon}</span>
                            <span>{sub.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <span className="icon-wrapper">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        © 2026 Pheonixsolutions.com All Rights Reserved.
      </footer>
    </div>
  );
}
