import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import { FaGlobe, FaNetworkWired, FaServer, FaExchangeAlt } from 'react-icons/fa';

export default function NetworkTools() {
    const tools = [
        {
            id: 'dns-checker',
            name: 'DNS Checker',
            description: 'Check DNS records, health, and propagation.',
            icon: <FaGlobe />,
            path: '/network-tools/dns-checker',
            color: '#3b82f6'
        },
        // Placeholders for future tools
        {
            id: 'ping',
            name: 'Ping Test',
            description: 'Measure latency and connectivity to a host.',
            icon: <FaNetworkWired />,
            path: '#',
            color: '#10b981'
        },
        {
            id: 'port-scanner',
            name: 'Port Scanner',
            description: 'Scan open ports on a server.',
            icon: <FaServer />,
            path: '#',
            color: '#f59e0b'
        },
        {
            id: 'trace-route',
            name: 'Trace Route',
            description: 'Trace the path packets take to their destination.',
            icon: <FaExchangeAlt />,
            path: '#',
            color: '#ef4444'
        }
    ];

    return (
        <Layout title="Network Tools" breadcrumb="Home / Network Tools">
            <div style={{ padding: '2rem' }}>
                <h1 style={{ marginBottom: '1rem', fontSize: '2rem', fontWeight: 'bold' }}>Network Tools</h1>
                <p style={{ marginBottom: '2rem', color: '#6b7280' }}>
                    A collection of utilities to analyze and troubleshoot network issues.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {tools.map(tool => (
                        <Link to={tool.path} key={tool.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{
                                backgroundColor: '#fff',
                                padding: '2rem',
                                borderRadius: '12px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                border: '1px solid #e5e7eb',
                                transition: 'all 0.2s',
                                cursor: 'pointer',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start'
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'; }}
                            >
                                <div style={{
                                    fontSize: '2.5rem',
                                    color: tool.color,
                                    marginBottom: '1rem',
                                    background: `${tool.color}20`,
                                    padding: '1rem',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '80px',
                                    height: '80px'
                                }}>
                                    {tool.icon}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>{tool.name}</h3>
                                <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.5' }}>{tool.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
