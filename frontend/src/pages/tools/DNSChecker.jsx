import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import './DNSChecker.css';
import { FaSearch, FaChevronDown, FaFilter, FaPrint, FaDownload, FaExternalLinkAlt, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import introIllustration from '../../assets/1.png'; // Using the existing illustration as fallback

const DNSChecker = () => {
    const [domain, setDomain] = useState('');
    const [recordType, setRecordType] = useState('A'); // Default first option from image
    const [loading, setLoading] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]); // To simulate the history table

    // State to track which item is currently being re-checked (by ID)
    const [recheckLoadingId, setRecheckLoadingId] = useState(null);

    // Derived state for the "latest" result to show in the cards
    // The first item in history is considered the "current" one
    const currentResult = searchHistory.length > 0 ? searchHistory[0] : null;

    const API_URL = 'http://localhost:4000/api/network/dns-lookup';

    const processScanResult = (res, type) => {
        let primaryValue = 'N/A';
        const successfulProbe = res.data.results?.find(r => r.status === 'OK');

        if (successfulProbe) {
            primaryValue = successfulProbe.value;
            if (typeof primaryValue === 'string' && primaryValue.length > 30) {
                primaryValue = primaryValue.substring(0, 30) + '...';
            }
        }

        const collectedRecords = [];
        if (res.data.results) {
            res.data.results.forEach(r => {
                if (r.status === 'OK') {
                    collectedRecords.push({
                        type: type,
                        value: `${r.value} [${r.provider}]`
                    });
                }
            });
        }

        const totalTime = res.data.results?.reduce((acc, curr) => acc + (curr.time_ms || 0), 0) || 0;
        const avgTime = res.data.results?.length ? Math.round(totalTime / res.data.results.length) : 0;
        const score = Math.max(0, Math.min(100, 100 - Math.floor(avgTime / 5)));

        return {
            id: Date.now(),
            domain: res.data.domain,
            type: type,
            ipAddress: primaryValue,
            results: res.data.results || [],
            allRecords: collectedRecords,
            recordCount: collectedRecords.length,
            lastRun: new Date(),
            status: 'Active',
            responseTime: avgTime,
            score: score
        };
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!domain) return;

        setLoading(true);

        try {
            const res = await axios.post(API_URL, {
                domain,
                type: recordType
            });

            const newRecord = processScanResult(res, recordType);
            setSearchHistory(prev => [newRecord, ...prev]);

        } catch (err) {
            console.error(err);
            alert("Check failed. Please ensure the backend is running and the domain is valid.");
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 800);
        }
    };

    const handleRecheck = async (item) => {
        setRecheckLoadingId(item.id);

        try {
            const res = await axios.post(API_URL, {
                domain: item.domain,
                type: item.type
            });

            const updatedRecord = processScanResult(res, item.type);
            // Add a flag to indicate this was a re-check
            updatedRecord.isRechecked = true;

            // Update history: Add the new result to the top
            // You might want to update the existing row instead? 
            // The prompt says "if we re-check... only that section will load" AND "after re-scan... they show like this [top card updates]"
            // Usually re-checking adds a new entry or updates the latest view.
            // Let's add it to the top so it becomes the `currentResult`.
            setSearchHistory(prev => [updatedRecord, ...prev]);

        } catch (err) {
            console.error("Re-check failed", err);
            alert("Re-check failed. Please try again.");
        } finally {
            setRecheckLoadingId(null);
        }
    };

    // Gauge Configuration
    // Use currentResult score if available, else default to 50
    const scoreVal = currentResult?.score || 50;

    // Render Helpers
    const formatDate = (date) => date.toLocaleDateString();
    const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <Layout title="Network Tools" breadcrumb="Home / DNS Checker">
            <div className="dns-checker-container">

                {/* Hero Section */}
                <div className="dns-hero-section">
                    <h1 className="dns-hero-title">DNS Checker</h1>
                    <p className="dns-hero-subtitle">Instantly validate your DNS records to ensure optimal website performance</p>

                    <form className="dns-search-bar" onSubmit={handleSearch}>
                        <div className="dns-input-wrapper">
                            <FaSearch className="dns-input-icon" />
                            <input
                                className="dns-main-input"
                                placeholder="e.g. 'example.com'"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <div className="dns-select-wrapper">
                            <select
                                className="dns-select"
                                value={recordType}
                                onChange={(e) => setRecordType(e.target.value)}
                                disabled={loading}
                            >
                                <option value="ALL">ALL</option>
                                <option value="A">A</option>
                                <option value="MX">MX</option>
                                <option value="NS">NS</option>
                                <option value="CNAME">CNAME</option>
                                <option value="TXT">TXT</option>
                                <option value="AAAA">AAAA</option>
                            </select>
                            <FaChevronDown className="dns-select-arrow" size={12} />
                        </div>
                        <button type="submit" className="check-dns-btn" disabled={loading}>
                            {loading ? 'Checking...' : 'Check DNS'}
                        </button>
                    </form>
                </div>

                {/* Loading Modal - ONLY for global search */}
                {loading && (
                    <div className="dns-loading-overlay">
                        <div className="loading-card">
                            <h3 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>Start Scanning</h3>
                            <div className="loading-spinner-blue"></div>
                            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>loading...</p>
                        </div>
                    </div>
                )}

                {/* Content Area */}
                {!currentResult && !loading ? (
                    <div className="dns-empty-state">
                        <img src={introIllustration} alt="DNS Illustration" className="dns-empty-img" />
                        <h3 className="dns-empty-title">Hey There !</h3>
                        <p className="dns-empty-desc">Please add your domain name & know about your Domain</p>
                    </div>
                ) : (currentResult && (
                    <>
                        {/* Results Dashboard with Gauge */}
                        <div className="results-dashboard">
                            {/* Gauge Card */}
                            <div className="result-card-box">
                                <div className="gauge-wrapper">
                                    <ResponsiveContainer width="100%" height={200}>
                                        <PieChart>
                                            <Pie
                                                data={[
                                                    { name: 'Speed', value: scoreVal },
                                                    { name: 'Remaining', value: 100 - scoreVal },
                                                ]}
                                                cx="50%"
                                                cy="100%"
                                                startAngle={180}
                                                endAngle={0}
                                                innerRadius={70}
                                                outerRadius={90}
                                                paddingAngle={0}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                <Cell key="cell-0" fill="#2563eb" /> {/* Blue */}
                                                <Cell key="cell-1" fill="#e5e7eb" /> {/* Grey */}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="gauge-value" style={{ color: '#2563eb' }}>{scoreVal} %</div>
                                    <div className="gauge-label">
                                        DNS Checker Speed
                                    </div>
                                </div>
                            </div>

                            {/* Real-Time DNS Record Card */}
                            <div className="result-card-box" style={{ alignItems: 'flex-start' }}>
                                <p className="info-header-text">
                                    Your <strong>{currentResult.domain || 'Domain'}</strong> DNS Checker will be thoroughly verified to ensure
                                    accuracy and functionality.
                                </p>

                                <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <h3 style={{ fontWeight: '700', color: '#1f2937', margin: 0 }}>
                                        {currentResult.isRechecked ? 'Your DNS record has been re-checked !' : 'Real-Time DNS Record !'}
                                    </h3>
                                    {currentResult.isRechecked && <FaCheckCircle color="#16a34a" size={20} />}
                                </div>

                                <div className="info-grid" style={{ width: '100%', marginBottom: '2rem' }}>
                                    <div>
                                        <div className="info-item-label">Date</div>
                                        <div className="info-item-value">{formatDate(currentResult.lastRun)}</div>
                                    </div>
                                    <div>
                                        <div className="info-item-label">Time</div>
                                        <div className="info-item-value">{formatTime(currentResult.lastRun)}</div>
                                    </div>
                                    <div>
                                        <div className="info-item-label">Type</div>
                                        <div className="info-item-value">{currentResult.type}</div>
                                    </div>
                                    <div>
                                        <div className="info-item-label">Domain Name</div>
                                        <a href={`http://${currentResult.domain}`} target="_blank" rel="noopener noreferrer" className="info-item-value link" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            {currentResult.domain} <FaExternalLinkAlt size={10} />
                                        </a>
                                    </div>
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <div className="info-item-label">IP Address</div>
                                        <div className="info-item-value" style={{ color: '#2563eb' }}>{currentResult.ipAddress}</div>
                                    </div>
                                </div>

                                <div className="download-link">
                                    To download the details, please click the Download your record button
                                </div>
                            </div>
                        </div>

                        {/* History Table */}
                        <div className="history-container">
                            <div className="history-header">
                                <div className="history-title">History of record !</div>
                                <div className="history-toolbar">
                                    <div style={{ position: 'relative' }}>
                                        <FaSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                        <input className="history-search" placeholder="Search" />
                                    </div>
                                    <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>1 - 10 of 52</span>
                                    <FaFilter className="toolbar-icon" />
                                    <FaPrint className="toolbar-icon" />
                                    <FaDownload className="toolbar-icon" />
                                </div>
                            </div>

                            <table className="dns-table">
                                <thead>
                                    <tr>
                                        <th>Last Run At</th>
                                        <th>Type</th>
                                        <th>Domain Name</th>
                                        <th>IP Address</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchHistory.map((item) => (
                                        <tr key={item.id}>
                                            <td><strong>{formatDate(item.lastRun)} {formatTime(item.lastRun)}</strong></td>
                                            <td><strong>{item.type}</strong></td>
                                            <td style={{ color: '#2563eb' }}>{item.domain}</td>
                                            <td style={{ color: '#2563eb' }}>{item.ipAddress}</td>
                                            <td style={{ textAlign: 'right' }}>
                                                <button
                                                    className="recheck-btn"
                                                    onClick={() => handleRecheck(item)}
                                                    disabled={recheckLoadingId === item.id || loading}
                                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                                                >
                                                    {recheckLoadingId === item.id ? (
                                                        <>
                                                            <FaSpinner className="fa-spin" /> Checking
                                                        </>
                                                    ) : (
                                                        'Re-check'
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ))}

            </div>
        </Layout >
    );
};

export default DNSChecker;
