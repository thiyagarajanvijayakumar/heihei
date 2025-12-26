import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import {
  FaDesktop, FaServer, FaCode, FaBug
} from 'react-icons/fa';
import Layout from '../../components/Layout';
import "./Dashboard.css";

// Charts Data (Keeping it same)
const syntheticDataDay = [
  { name: '00:00', value: 20 },
  { name: '04:00', value: 40 },
  { name: '08:00', value: 60 },
  { name: '12:00', value: 50 },
  { name: '16:00', value: 70 },
  { name: '20:00', value: 60 },
  { name: '23:59', value: 80 },
];

const syntheticDataWeek = [
  { name: 'Sun', value: 20 },
  { name: 'Mon', value: 40 },
  { name: 'Tue', value: 60 },
  { name: 'Wed', value: 50 },
  { name: 'Thu', value: 70 },
  { name: 'Fri', value: 60 },
  { name: 'Sat', value: 80 },
];

const syntheticDataMonth = [
  { name: 'Week 1', value: 45 },
  { name: 'Week 2', value: 55 },
  { name: 'Week 3', value: 40 },
  { name: 'Week 4', value: 70 },
];

const hostStatusData = [
  { name: 'All Types', value: 100, fill: '#3b82f6' },
  { name: 'Up', value: 80, fill: '#3b82f6' },
  { name: 'Down', value: 10, fill: '#ef4444' },
  { name: 'Unreachable', value: 5, fill: '#f59e0b' },
  { name: 'Pending', value: 5, fill: '#6366f1' },
];

const vulns = []
for (let i = 0; i < 10; i++) {
  vulns.push({ id: i + 1, cve: 'CVE-2023-XXXX', desc: 'Blog pages for the application' });
}

export default function Dashboard() {
  const [chartRange, setChartRange] = useState('Day');

  const getChartData = () => {
    switch (chartRange) {
      case 'Week': return syntheticDataWeek;
      case 'Month': return syntheticDataMonth;
      default: return syntheticDataDay;
    }
  };

  return (
    <Layout title="Welcome to your, Dashboard !" breadcrumb="Home">
      {/* Status Cards */}
      <div className="status-grid">
        <div className="status-card card-blue">
          <div className="status-card-header"><FaDesktop /> Synthetic Monitoring</div>
          <div className="status-count">25</div>
          <div className="status-footer">
            <span className="badge">▲ 20</span>
            <span className="badge" style={{ background: 'rgba(255,0,0,0.2)' }}>▼ 5</span>
            <span>Your added website</span>
          </div>
        </div>

        <div className="status-card card-purple">
          <div className="status-card-header"><FaBug /> Vulnerability</div>
          <div className="status-count">100</div>
          <div className="status-footer">
            <span className="badge">20</span>
            <span className="badge">50</span>
            <span>Your added scans</span>
          </div>
        </div>

        <div className="status-card card-teal">
          <div className="status-card-header"><FaServer /> Server Monitoring</div>
          <div className="status-count">30</div>
          <div className="status-footer">
            <span className="badge">▲ 70</span>
            <span>Your added hosts</span>
          </div>
        </div>

        <div className="status-card card-green">
          <div className="status-card-header"><FaCode /> Code scanning</div>
          <div className="status-count">05</div>
          <div className="status-footer">
            <span>Your added sites</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">Synthetic Monitoring</div>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', background: '#f3f4f6', padding: '0.25rem', borderRadius: '6px', fontSize: '0.8rem' }}>
              {['Day', 'Week', 'Month'].map(range => (
                <span
                  key={range}
                  onClick={() => setChartRange(range)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    background: chartRange === range ? '#fff' : 'transparent',
                    boxShadow: chartRange === range ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                    color: chartRange === range ? '#000' : '#6b7280'
                  }}
                >
                  {range}
                </span>
              ))}
            </div>
          </div>
          <div style={{ height: '250px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12, dy: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip cursor={{ stroke: '#4ade80', strokeWidth: 2 }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="value" stroke="#4ade80" strokeWidth={3} dot={{ r: 4, fill: '#4ade80', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">Host Total Status</div>
          </div>
          <div style={{ height: '250px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hostStatusData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10, dy: 5 }} interval={0} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px' }} />
                <Bar dataKey="value" barSize={30} radius={[4, 4, 0, 0]}>
                  {hostStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="bottom-row">
        <div className="chart-card">
          <div className="chart-header">
            <div className="chart-title">Top 10 Vulnerability</div>
          </div>
          <div className="vulnerability-list">
            {vulns.map((v, i) => (
              <div key={i} className="vuln-item">
                <div className="vuln-badge" style={{ backgroundColor: ['#fdba74', '#fcd34d', '#fca5a5'][i % 3] }}>{v.id}</div>
                <div className="vuln-id">{v.cve}</div>
                <div>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          {/* Placeholder for map */}
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</div>
              <div>Interactive Map Module</div>
              <div style={{ fontSize: '0.8rem' }}>Coming Soon</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
