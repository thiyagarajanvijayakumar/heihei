import React, { useState } from 'react';
import {
    FaHome, FaNetworkWired, FaBell, FaDesktop, FaPowerOff
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import "./Layout.css";

export default function Layout({ children, title, breadcrumb }) {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('Home'); // This might need to be derived from location

    const isActive = (path) => location.pathname === path;

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="7" cy="16" r="3" stroke="#3b82f6" strokeWidth="2" />
                        <circle cx="17" cy="16" r="3" stroke="#4ade80" strokeWidth="2" />
                    </svg>
                    Heihei
                </div>

                <div className="nav-section">
                    <Link to="/dashboard" className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
                        <FaHome /> <span>Home</span>
                    </Link>
                    <Link to="/synthetic-monitoring" className={`nav-item ${isActive('/synthetic-monitoring') ? 'active' : ''}`}>
                        <FaDesktop /> <span>Synthetic Monitoring</span>
                    </Link>
                    <Link to="/network-tools" className={`nav-item ${location.pathname.startsWith('/network-tools') ? 'active' : ''}`}>
                        <FaNetworkWired /> <span>Network tools</span>
                    </Link>
                    <div className="nav-item">
                        <FaBell /> <span>Notification Alert</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Top Bar */}
                <div className="top-bar">
                    <div className="top-bar-title">
                        <h2>{title}</h2>
                        <p>{breadcrumb}</p>
                    </div>
                    <FaPowerOff style={{ fontSize: '1.2rem', color: '#6b7280', cursor: 'pointer' }} onClick={() => window.location.href = "/"} title="Logout" />
                </div>

                {/* Dynamic Content */}
                <div className="content-area">
                    {children}
                </div>
            </div>
        </div>
    );
}
