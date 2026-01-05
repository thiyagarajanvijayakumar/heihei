import React from 'react';
import mapImg from '../assets/map.png';
import {
    ClipboardList,
    ShieldCheck,
    Server,
    FileCode,
    ChevronDown,
    CheckCircle2
} from 'lucide-react';

export function SummaryCards() {
    return (
        <div className="summary-grid">
            <div className="summary-card" style={{ background: 'var(--grad-blue)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                    <ClipboardList size={16} /> Synthetic Monitoring
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>25 <span style={{ fontSize: '12px', fontWeight: 'normal' }}>Your added website</span></div>
                <div style={{ display: 'flex', gap: '15px', fontSize: '12px' }}>
                    <span style={{ color: '#fff' }}>▲ 20</span>
                    <span style={{ color: '#fff' }}>▼ 5</span>
                </div>
            </div>

            <div className="summary-card" style={{ background: 'var(--grad-orange)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                    <ShieldCheck size={16} /> Vulnerability
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>100 <span style={{ fontSize: '12px', fontWeight: 'normal' }}>Your added scans</span></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {[20, 50, 20, 10].map((v, i) => (
                        <div key={i} style={{ padding: '2px 8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', fontSize: '11px' }}>{v}</div>
                    ))}
                </div>
            </div>

            <div className="summary-card" style={{ background: 'var(--grad-teal)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                    <Server size={16} /> Server Monitoring
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>30 <span style={{ fontSize: '12px', fontWeight: 'normal' }}>Your added hosts</span></div>
                <div style={{ display: 'flex', gap: '15px', fontSize: '12px' }}>
                    <span>▲ 70 Your added Services</span>
                </div>
            </div>

            <div className="summary-card" style={{ background: 'var(--grad-green)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#333' }}>
                    <FileCode size={16} /> Code scanning
                </div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>05 <span style={{ fontSize: '12px', fontWeight: 'normal' }}>Your added sites</span></div>
            </div>
        </div>
    );
}

export function SyntheticMonitoringChart() {
    return (
        <div className="dashboard-card" style={{ flex: 1 }}>
            <div className="card-header">
                <h3 className="card-title">Synthetic Monitoring</h3>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {['Day', 'Week', 'Month'].map(t => (
                        <button key={t} style={{ border: 'none', background: t === 'Day' ? '#f0f4ff' : 'none', color: t === 'Day' ? '#5c7cff' : '#999', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>{t}</button>
                    ))}
                    <ChevronDown size={14} color="#999" />
                </div>
            </div>
            <div style={{ height: '220px', position: 'relative', marginTop: '10px' }}>
                <div style={{
                    position: 'absolute',
                    top: '30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#475569',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    zIndex: 1,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    <div>Feb 05/02/2025</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4caf50' }}></span>
                        Up State
                    </div>
                </div>

                <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    <path d="M0,150 Q125,140 250,80 Q375,120 500,140" fill="none" stroke="#4caf50" strokeWidth="3" />
                    <circle cx="250" cy="80" r="4" fill="#4caf50" stroke="#fff" strokeWidth="2" />
                    <path d="M0,180 Q125,170 250,150 Q375,190 500,180" fill="none" stroke="#ff9800" strokeWidth="2" strokeOpacity="0.5" />
                    {[0, 50, 100, 150, 200].map(y => (
                        <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="#f1f5f9" strokeWidth="1" />
                    ))}
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#999', fontSize: '11px', marginTop: '15px' }}>
                    {['Sun 5', 'Mon 6', 'Tue 7', 'Wed 8', 'Thu 9', 'Fri 10', 'Sat 11'].map(d => <span key={d}>{d}</span>)}
                </div>
            </div>
        </div>
    );
}

export function HostTotalStatus() {
    const bars = [
        { label: 'All Types', value: 90, color: '#3b82f6' },
        { label: 'Up', value: 50, color: '#3b82f6' },
        { label: 'Down', value: 20, color: '#3b82f6' },
        { label: 'Unreachable', value: 35, color: '#3b82f6' },
        { label: 'Pending', value: 25, color: '#3b82f6' },
        { label: 'All Issues', value: 60, color: '#3b82f6' },
    ];

    return (
        <div className="dashboard-card" style={{ width: '400px' }}>
            <h3 className="card-title">Host Total Status</h3>
            <div style={{ height: '160px', display: 'flex', alignItems: 'flex-end', gap: '15px', marginTop: '20px' }}>
                {bars.map((bar, i) => (
                    <div key={i} style={{ flex: 1, height: `${bar.value}%`, background: '#3b82f6', borderRadius: '6px' }} />
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                {bars.map((bar, i) => (
                    <div key={i} style={{ fontSize: '8px', color: '#999', textAlign: 'center', flex: 1 }}>{bar.label}</div>
                ))}
            </div>

            <div style={{ marginTop: '25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>Toggle to Service Status</div>
                    <div style={{ fontSize: '10px', color: '#999' }}>Toggle the switch button to instantly view the overall service status</div>
                </div>
                <div style={{ width: '36px', height: '20px', background: '#3b82f6', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                    <div style={{ position: 'absolute', right: '2px', top: '2px', width: '16px', height: '16px', background: '#fff', borderRadius: '50%' }} />
                </div>
            </div>
        </div>
    );
}

export function TopVulnerabilityTable() {
    const data = Array(10).fill({ score: 'CVE-2023-XXXX', type: 'Blog pages for the application' });
    return (
        <div className="dashboard-card" style={{ flex: 1 }}>
            <h3 className="card-title">Top 10 Vulnerability</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
                <thead>
                    <tr style={{ color: '#999', fontSize: '12px', borderBottom: '1px solid #f0f0f0' }}>
                        <th style={{ textAlign: 'center', padding: '10px', width: '40px' }}></th>
                        <th style={{ textAlign: 'left', padding: '10px' }}>Scan Score</th>
                        <th style={{ textAlign: 'left', padding: '10px' }}>Vulnerability Type</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i} style={{ fontSize: '12px', borderBottom: i < 9 ? '1px solid #f8fafc' : 'none' }}>
                            <td style={{ padding: '8px', textAlign: 'center' }}>
                                <span style={{
                                    background: 'rgba(255, 152, 0, 0.2)',
                                    color: '#ff9800',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontWeight: '600'
                                }}>{i + 1}</span>
                            </td>
                            <td style={{ padding: '8px', color: '#333' }}>{row.score}</td>
                            <td style={{ padding: '8px', color: '#cbd5e1' }}>{row.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export function MapWidget() {
    return (
        <div className="dashboard-card" style={{ width: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={mapImg} alt="World Map" style={{ width: '100%', height: 'auto', maxHeight: '350px', objectFit: 'contain' }} />
        </div>
    );
}
