import React from 'react';
import {
  SummaryCards,
  SyntheticMonitoringChart,
  HostTotalStatus,
  TopVulnerabilityTable,
  MapWidget
} from '../components/DashboardWidgets';

export default function Dashboard() {
  return (
    <div>
      <div style={{ marginBottom: '25px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#333', marginBottom: '5px' }}>
          Welcome to your, Dashboard !
        </h1>
        <div style={{ fontSize: '13px', color: '#999' }}>Home</div>
      </div>

      <SummaryCards />

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'stretch' }}>
        <SyntheticMonitoringChart />
        <HostTotalStatus />
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'stretch' }}>
        <TopVulnerabilityTable />
        <MapWidget />
      </div>
    </div>
  );
}
