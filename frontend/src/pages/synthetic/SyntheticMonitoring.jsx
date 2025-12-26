import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../components/Layout';
import { FaPlus, FaTimes, FaGlobe, FaLock, FaNetworkWired, FaCheck, FaEdit, FaArrowUp, FaArrowDown, FaEllipsisV, FaExternalLinkAlt, FaWifi, FaFilter, FaPrint, FaDownload, FaFileExcel, FaFilePdf, FaTrash, FaSitemap } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import axios from 'axios';
import "./SyntheticMonitoring.css";

import introIllustration from '../../assets/1.png';
import worldMap from '../../assets/map world.gif';

// Steps Definition
const STEPS = [
    { id: 1, label: 'Types' },
    { id: 2, label: 'Configuration' },
    { id: 3, label: 'Alerts' },
    { id: 4, label: 'Summary' }
];

const PIE_DATA = [
    { name: 'Up State', value: 20, color: '#16a34a' },
    { name: 'Down State', value: 5, color: '#dc2626' },
];

const EXPORT_COLUMNS = [
    { id: 'name', label: 'Site Name' },
    { id: 'uptime', label: 'Uptime' },
    { id: 'lastRun', label: 'Last Run At' },
    { id: 'state', label: 'State' },
    { id: 'loadOnly', label: 'Load Time' },
    { id: 'freq', label: 'Alert Frequency' },
];

export default function SyntheticMonitoring() {
    const [showIntroModal, setShowIntroModal] = useState(false);
    const [showWizardModal, setShowWizardModal] = useState(false);

    // Monitors State
    const [monitors, setMonitors] = useState([]);
    const [hasMonitors, setHasMonitors] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Action Menu State
    const [activeActionMenu, setActiveActionMenu] = useState(null);

    // Export Modal State
    const [showExportModal, setShowExportModal] = useState(false);
    const [exportType, setExportType] = useState('Download');
    const [selectedColumns, setSelectedColumns] = useState(['lastRun', 'loadOnly']);

    // Wizard State
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedType, setSelectedType] = useState('HTTP');

    // Form Data
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        method: 'GET'
    });

    // Alert Data
    const [alertData, setAlertData] = useState({
        location: '',
        frequency: '',
        notifyType: '',
        emails: ['support@pheonixsolutions.com']
    });

    // API Config
    const API_URL = 'http://localhost:4000/api/monitors';

    // Fetch Monitors
    useEffect(() => {
        fetchMonitors();
    }, []);

    const fetchMonitors = async () => {
        try {
            const res = await axios.get(API_URL);
            setMonitors(res.data);
            setHasMonitors(res.data.length > 0);
        } catch (error) {
            console.error("Error fetching monitors:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Close Action Menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.action-menu-container')) {
                setActiveActionMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleStartFlow = () => {
        setShowIntroModal(true);
    };

    const handleProceedToWizard = () => {
        resetForm();
        setShowIntroModal(false);
        setShowWizardModal(true);
        setCurrentStep(1);
    };

    const resetForm = () => {
        setFormData({ name: '', url: '', method: 'GET' });
        setAlertData({ location: '', frequency: '', notifyType: '', emails: ['support@pheonixsolutions.com'] });
        setSelectedType('HTTP');
    };

    const handleNextStep = async () => {
        if (currentStep < 4) {
            setCurrentStep(c => c + 1);
        } else {
            // Submit logic - Add new monitor via API
            try {
                const newMonitorData = {
                    name: formData.name,
                    url: formData.url,
                    type: selectedType,
                    method: formData.method,
                    location: alertData.location,
                    frequency: alertData.frequency,
                    emails: alertData.emails
                };

                await axios.post(API_URL, newMonitorData);
                await fetchMonitors(); // Refresh list
                setShowWizardModal(false);
            } catch (error) {
                console.error("Error saving monitor:", error);
                alert("Failed to save monitor. Please try again.");
            }
        }
    };

    const handleDeleteMonitor = async (id) => {
        if (window.confirm("Are you sure you want to delete this monitor?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                await fetchMonitors(); // Refresh list
                setActiveActionMenu(null);
            } catch (error) {
                console.error("Error deleting monitor:", error);
                alert("Failed to delete monitor.");
            }
        }
    };

    const handleAddEmail = (e) => {
        e.preventDefault();
        setAlertData({
            ...alertData,
            emails: [...alertData.emails, ""]
        });
    }

    const handleEmailChange = (index, value) => {
        const newEmails = [...alertData.emails];
        newEmails[index] = value;
        setAlertData({ ...alertData, emails: newEmails });
    }

    // Export Logic
    const openExportModal = (type) => {
        setExportType(type);
        setShowExportModal(true);
    };

    const toggleColumn = (colId) => {
        if (selectedColumns.includes(colId)) {
            setSelectedColumns(selectedColumns.filter(c => c !== colId));
        } else {
            setSelectedColumns([...selectedColumns, colId]);
        }
    };

    const toggleAllColumns = () => {
        if (selectedColumns.length === EXPORT_COLUMNS.length) {
            setSelectedColumns([]);
        } else {
            setSelectedColumns(EXPORT_COLUMNS.map(c => c.id));
        }
    };

    // --- Components for Dashboard View ---

    const StatsOverview = () => {
        const upCount = monitors.filter(m => m.status === 'up').length;
        const downCount = monitors.filter(m => m.status === 'down').length;
        const pieData = monitors.length > 0 ? [
            { name: 'Up State', value: upCount, color: '#16a34a' },
            { name: 'Down State', value: downCount, color: '#dc2626' },
        ] : [
            { name: 'No Data', value: 1, color: '#e5e7eb' }
        ];

        return (
            <div className="stats-overview">
                <div className="stat-card">
                    <div className="stat-title">Active Monitoring</div>
                    <div className="stat-value-row">
                        <div className="stat-icon-wrapper orange"><FaWifi /></div>
                        <div className="stat-value">{monitors.length}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">UP State</div>
                    <div className="stat-value-row">
                        <div className="stat-icon-wrapper green"><FaArrowUp /></div>
                        <div className="stat-value">{monitors.filter(m => m.status === 'up').length}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">Down State</div>
                    <div className="stat-value-row">
                        <div className="stat-icon-wrapper red"><FaArrowDown /></div>
                        <div className="stat-value">{monitors.filter(m => m.status === 'down').length}</div>
                    </div>
                </div>
                <div className="chart-card">
                    <ResponsiveContainer width="100%" height={150}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={60}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <RechartsTooltip />
                            <Legend verticalAlign="middle" align="right" layout="vertical" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    };

    const MonitorsTable = () => (
        <div className="monitors-section">
            <div className="filters-bar">
                <button className="filter-icon-btn"><FaFilter /></button>
                <button className="filter-icon-btn" onClick={() => openExportModal('Print')}><FaPrint /></button>
                <button className="filter-icon-btn" onClick={() => openExportModal('Download')}><FaDownload /></button>
            </div>
            <table className="monitors-table">
                <thead>
                    <tr>
                        <th style={{ width: '5%' }}></th>
                        <th style={{ width: '20%' }}>Site / Name</th>
                        <th style={{ width: '10%' }}>Uptime</th>
                        <th style={{ width: '20%' }}>Last Run At</th>
                        <th style={{ width: '15%' }}>Alert Frequency</th>
                        <th style={{ width: '15%' }}>Uptime/Downtime</th>
                        <th style={{ width: '10%' }}>Response Time</th>
                        <th style={{ width: '5%' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {monitors.map((monitor) => (
                        <tr key={monitor._id}>
                            <td>
                                <div className={`status-icon ${monitor.status}`}>
                                    {monitor.status === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                                </div>
                            </td>
                            <td>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div className="monitor-name-cell">
                                        {monitor.name} <FaExternalLinkAlt size={12} />
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>{monitor.url}</span>
                                </div>
                            </td>
                            <td><strong>{monitor.uptime || 0}%</strong></td>
                            <td style={{ fontSize: '0.85rem' }}>{monitor.lastRun ? new Date(monitor.lastRun).toLocaleString() : '-'}</td>
                            <td>{monitor.frequency}</td>
                            <td>
                                <div className="uptime-bar-container">
                                    {(monitor.history || []).map((entry, idx) => (
                                        <div
                                            key={idx}
                                            className={`uptime-bar ${entry.status || 'up'}`}
                                            title={`State: ${entry.status === 'up' ? 'Up' : 'Down'}`}
                                        ></div>
                                    ))}
                                </div>
                            </td>
                            <td><strong>{monitor.uptime ? '75 ms' : '0 ms'}</strong></td>
                            <td>
                                <div className="action-menu-container">
                                    <button
                                        className="action-menu-btn"
                                        onClick={() => setActiveActionMenu(activeActionMenu === monitor._id ? null : monitor._id)}
                                    >
                                        <FaEllipsisV />
                                    </button>

                                    {activeActionMenu === monitor._id && (
                                        <div className="action-menu-dropdown">
                                            <button className="action-menu-item" onClick={() => setActiveActionMenu(null)}>
                                                <FaEdit /> Edit
                                            </button>
                                            <button className="action-menu-item delete" onClick={() => handleDeleteMonitor(monitor._id)}>
                                                <FaTrash /> Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    {monitors.length === 0 && !isLoading && (
                        <tr>
                            <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                                No monitors found. Add a new monitor to get started!
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    // --- Export Modal ---
    const renderExportModal = () => (
        <div className="modal-overlay">
            <div className="modal-content export-modal">
                <button className="close-btn-absolute" onClick={() => setShowExportModal(false)}><FaTimes /></button>

                <h2 className="export-title">{exportType} your record !</h2>
                <p className="export-subtitle">{exportType} your record with personalized customization</p>

                <div style={{ marginBottom: '1rem' }}>
                    <label className="column-chip" style={{ width: 'fit-content', border: 'none', paddingLeft: 0 }}>
                        <input
                            type="checkbox"
                            checked={selectedColumns.length === EXPORT_COLUMNS.length}
                            onChange={toggleAllColumns}
                            className="custom-checkbox"
                        />
                        All
                    </label>
                </div>

                <label className="export-section-label">Your Customized Download Report !</label>
                <div className="column-options">
                    {EXPORT_COLUMNS.map(col => (
                        <div
                            key={col.id}
                            className={`column-chip ${selectedColumns.includes(col.id) ? 'selected' : ''}`}
                            onClick={() => toggleColumn(col.id)}
                        >
                            <span>{col.label}</span>
                            <input
                                type="checkbox"
                                checked={selectedColumns.includes(col.id)}
                                readOnly
                                className="custom-checkbox"
                            />
                        </div>
                    ))}
                </div>

                <div className="export-footer">
                    <p className="export-note">
                        Please select your preferred format, such as Excel or PDF, for receiving the uptime and downtime statistics report
                    </p>
                    <div className="export-buttons">
                        <button className="export-btn excel">
                            <FaFileExcel /> Excel <FaDownload size={12} />
                        </button>
                        <button className="export-btn pdf">
                            <FaFilePdf /> Pdf <FaDownload size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    // ... Render Modals ...
    const renderIntroModal = () => (
        <div className="modal-overlay">
            <div className="modal-content intro-modal">
                <button className="close-btn-absolute" onClick={() => setShowIntroModal(false)}><FaTimes /></button>
                <div className="intro-image">
                    <img src={introIllustration} alt="Real-time insights" style={{ maxWidth: '100%', height: 'auto', maxHeight: '450px' }} />
                </div>
                <div className="intro-content">
                    <h2 className="intro-title">Real-time insights<br />coming together</h2>
                    <p className="intro-subtitle">Set Up Your Monitoring for Enhanced Performance !</p>
                    <button className="primary-btn" onClick={handleProceedToWizard} style={{ width: 'fit-content' }}>
                        Create Your Monitoring
                    </button>
                </div>
            </div>
        </div>
    );

    const renderStepIndicator = () => (
        <div className="stepper">
            <div className="step-line"></div>
            {STEPS.map((step) => {
                let status = 'pending';
                if (currentStep === step.id) status = 'active';
                if (currentStep > step.id) status = 'completed';

                return (
                    <div key={step.id} className={`step-item ${status}`}>
                        <div className="step-circle">
                            {status === 'completed' ? <FaCheck size={12} /> : step.id}
                        </div>
                        <div className="step-label">{step.label}</div>
                    </div>
                )
            })}
        </div>
    );

    // Step 1: Types
    const renderStep1_Types = () => (
        <div className="step-content">
            <h3 className="step-title">Choose Your Synthetic Monitoring Type !</h3>
            <div className="type-selection">
                <div
                    className={`type-card ${selectedType === 'HTTP' ? 'selected' : ''}`}
                    onClick={() => setSelectedType('HTTP')}
                >
                    <div className="type-icon"><FaSitemap /></div>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>HTTP</div>
                    <button className="type-btn">Create Your HTTP Monitoring</button>
                </div>

                <div
                    className={`type-card ${selectedType === 'HTTPS' ? 'selected' : ''}`}
                    onClick={() => setSelectedType('HTTPS')}
                >
                    <div className="type-icon"><FaLock /></div>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>HTTPS</div>
                    <button className="type-btn">Create Your HTTPS Monitoring</button>
                </div>
            </div>
        </div>
    );

    // Step 2: Configuration
    const renderStep2_Config = () => (
        <div className="step-content">
            <h3 className="step-title">Configure your <span style={{ color: '#3b82f6' }}>{selectedType}</span> Monitoring !</h3>
            <div className="config-form">
                <div className="form-group">
                    <label className="form-label">Monitor Name</label>
                    <input
                        className="form-input-lg"
                        placeholder="Enter monitor name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Site URL</label>
                    <input
                        className="form-input-lg"
                        placeholder="https://example.com"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">HTTP Method</label>
                    <select
                        className="form-input-lg"
                        value={formData.method}
                        onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                    >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                </div>
            </div>
        </div>
    );

    // Step 3: Alerts
    const renderStep3_Alerts = () => (
        <div className="step-content" style={{
            backgroundImage: `url(${worldMap})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            <h3 className="step-title">Alerts and Select Locations !</h3>
            <div className="config-form alerts-form">
                <div className="form-group">
                    <label className="form-label">Select Location</label>
                    <select
                        className="form-input-lg"
                        value={alertData.location}
                        onChange={(e) => setAlertData({ ...alertData, location: e.target.value })}
                    >
                        <option value="">Select</option>
                        <option value="India">India</option>
                        <option value="Europe">Europe</option>
                        <option value="US">US</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Alert Frequency</label>
                    <select
                        className="form-input-lg"
                        value={alertData.frequency}
                        onChange={(e) => setAlertData({ ...alertData, frequency: e.target.value })}
                    >
                        <option value="">Select</option>
                        <option value="1 min">1 min</option>
                        <option value="4 min">4 min</option>
                        <option value="5 min">5 min</option>
                        <option value="10 min">10 min</option>
                        <option value="15 min">15 min</option>
                        <option value="30 min">30 min</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Notify To</label>
                    <select
                        className="form-input-lg"
                        value={alertData.notifyType}
                        onChange={(e) => setAlertData({ ...alertData, notifyType: e.target.value })}
                    >
                        <option value="">Select</option>
                        <option value="Email">Email</option>
                    </select>
                </div>

                {alertData.notifyType === 'Email' && (
                    <div className="email-section">
                        <label className="form-label" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Enter you mail id</label>
                        {alertData.emails.map((email, idx) => (
                            <div key={idx} className="email-input-group">
                                <input
                                    className="form-input-lg"
                                    value={email}
                                    onChange={(e) => handleEmailChange(idx, e.target.value)}
                                    placeholder="support@example.com"
                                />
                                <button className="email-save-btn">Save</button>
                            </div>
                        ))}
                        <a href="#" className="add-more-link" onClick={handleAddEmail}>+ Add more mail id</a>
                    </div>
                )}
            </div>
        </div>
    );

    // Step 4: Summary
    const renderStep4_Summary = () => (
        <div className="step-content" style={{ width: '100%' }}>
            <div className="summary-container">
                {/* Left Card: Config */}
                <div className="summary-card">
                    <div className="summary-header">Configure your {selectedType} Monitoring !</div>

                    <div className="summary-item">
                        <span className="summary-label">Monitor Name</span>
                        <div className="summary-value">{formData.name || '-'}</div>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Site URL</span>
                        <div className="summary-value" style={{ wordBreak: 'break-all' }}>{formData.url || '-'}</div>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">HTTP Type</span>
                        <div className="summary-value">{formData.method}</div>
                    </div>

                    <button className="edit-btn-outline" onClick={() => setCurrentStep(2)}>
                        <FaEdit /> Edit
                    </button>
                </div>

                {/* Right Card: Alerts */}
                <div className="summary-card">
                    <div className="summary-header">Alerts and Select Locations !</div>

                    <div className="summary-item">
                        <span className="summary-label">Select Location</span>
                        <div className="summary-value">{alertData.location || '-'}</div>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Alert Frequency</span>
                        <div className="summary-value">{alertData.frequency || '-'}</div>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Notify To</span>
                        <div className="summary-value">{alertData.notifyType || '-'}</div>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Email ID</span>
                        <div className="summary-value" style={{ wordBreak: 'break-all' }}>
                            {alertData.emails.join(", ") || '-'}
                        </div>
                    </div>

                    <button className="edit-btn-outline" onClick={() => setCurrentStep(3)}>
                        <FaEdit /> Edit
                    </button>
                </div>
            </div>
        </div>
    );


    const renderWizardContent = () => {
        switch (currentStep) {
            case 1: return renderStep1_Types();
            case 2: return renderStep2_Config();
            case 3: return renderStep3_Alerts();
            case 4: return renderStep4_Summary();
            default: return null;
        }
    };

    return (
        <Layout title="Synthetic Monitoring" breadcrumb="Home / Synthetic Monitoring">

            <div className="hero-section">
                <h1 className="hero-title">Synthetic Monitoring</h1>
                <p className="hero-description">
                    Synthetic Monitoring simulates user actions to identify issues before they affect real users.
                </p>
                <button className="add-monitoring-btn" onClick={handleStartFlow}>
                    <FaPlus /> Add Monitoring
                </button>
            </div>

            {hasMonitors ? (
                <>
                    <StatsOverview />
                    <MonitorsTable />
                </>
            ) : (
                <div className="empty-state">
                    <div className="illustration">
                        <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="20" y="30" width="160" height="100" rx="8" fill="#EBF5FF" />
                            <rect x="40" y="50" width="120" height="10" rx="2" fill="#BFDBFE" />
                            <rect x="40" y="70" width="80" height="10" rx="2" fill="#BFDBFE" />
                            <circle cx="100" cy="100" r="20" fill="#3B82F6" opacity="0.2" />
                            <path d="M90 100L95 105L110 90" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h3 className="empty-state-title">Hey There !</h3>
                    <p className="empty-state-desc">
                        Please add your monitor name & site url know about your synthetic monitoring
                    </p>
                </div>
            )}

            {/* Intro Modal */}
            {showIntroModal && renderIntroModal()}

            {/* Wizard Modal */}
            {showWizardModal && (
                <div className="modal-overlay">
                    <div className="modal-content wizard-modal">
                        <button className="close-btn-absolute" onClick={() => setShowWizardModal(false)}><FaTimes /></button>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '2rem' }}>Add your monitoring</h3>

                        {renderStepIndicator()}

                        {renderWizardContent()}

                        <div className="wizard-footer">
                            <button className="primary-btn" onClick={handleNextStep}>
                                {currentStep === 4 ? "Confirm" : "Save & Next"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Export Modal */}
            {showExportModal && renderExportModal()}

        </Layout>
    );
}
