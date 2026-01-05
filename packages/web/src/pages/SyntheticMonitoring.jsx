import React, { useState, useEffect } from 'react';
import {
  Plus,
  Globe,
  Lock,
  ChevronRight,
  ChevronLeft,
  Check,
  Monitor,
  X,
  Search,
  CheckCircle2,
  Info
} from 'lucide-react';
import mapImg from '../assets/map.png';
import emptyStateImg from '../assets/empty_state.png';
import api from '../api';

export default function SyntheticMonitoring() {
  const [showIntroModal, setShowIntroModal] = useState(false);
  const [showWizardModal, setShowWizardModal] = useState(false);
  const [step, setStep] = useState(1);
  const [monitorType, setMonitorType] = useState('HTTP');
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    method: 'GET'
  });
  const [monitors, setMonitors] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchMonitors();
  }, [search]);

  const fetchMonitors = async () => {
    try {
      const res = await api.get(`/monitors?search=${search}`);
      setMonitors(res.data);
    } catch (err) {
      console.error('Error fetching monitors:', err);
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleComplete = async () => {
    try {
      await api.post('/monitors', {
        ...formData,
        type: monitorType
      });
      setShowWizardModal(false);
      setStep(1);
      setFormData({ name: '', url: '', method: 'GET' });
      fetchMonitors();
    } catch (err) {
      console.error('Error saving monitor:', err);
    }
  };

  const renderStepper = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '30px' }}>
      {[
        { id: 1, label: 'Types' },
        { id: 2, label: 'Configuration' },
        { id: 3, label: 'Alerts' },
        { id: 4, label: 'Summary' }
      ].map((s, i) => (
        <React.Fragment key={s.id}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: step === s.id ? 'var(--primary-blue)' : (step > s.id ? 'var(--status-up)' : '#e2e8f0'),
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              {step > s.id ? <Check size={14} /> : s.id}
            </div>
            <div style={{
              fontSize: '11px',
              color: step === s.id ? 'var(--primary-blue)' : '#94a3b8',
              background: step === s.id ? '#f0f4ff' : 'transparent',
              padding: '2px 10px',
              borderRadius: '12px',
              fontWeight: step === s.id ? '600' : '400'
            }}>{s.label}</div>
          </div>
          {i < 3 && <div style={{ height: '2px', width: '60px', background: step > s.id ? 'var(--status-up)' : '#e2e8f0', marginBottom: '16px', borderRadius: '2px' }} />}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div style={{ width: '100%', maxWidth: '2000px', margin: '0 auto' }}>
      {/* Header & Breadcrumb */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#333', marginBottom: '4px' }}>Synthetic Monitoring</h1>
        <div style={{ fontSize: '13px', color: '#666' }}>
          Home / <span style={{ color: 'var(--primary-blue)', fontWeight: '500' }}>Synthetic Monitoring</span>
        </div>
      </div>

      {/* Banner */}
      <div style={{
        background: 'linear-gradient(90deg, #4285f4 0%, #34a853 100%)',
        borderRadius: '16px',
        width: '2000px',
        height: '181px',
        margin: '0 auto 30px',
        color: '#fff',
        textAlign: 'center',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(66, 133, 244, 0.15)',
        position: 'relative',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h2 style={{ fontSize: '42px', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.5px', lineHeight: '1.2' }}>Synthetic Monitoring</h2>
        <p style={{ fontSize: '15px', opacity: 0.95, marginBottom: '28px', maxWidth: '600px', margin: '0 auto 28px', fontWeight: '500' }}>
          Synthetic Monitoring simulates user actions to identify issues before they affect real users
        </p>
        <button
          onClick={() => setShowIntroModal(true)}
          style={{
            background: '#2d3436',
            color: '#fff',
            border: 'none',
            padding: '12px 32px',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
          }}
        >
          <span style={{ fontSize: '22px', fontWeight: '400' }}>+</span> Add Monitoring
        </button>
      </div>

      {/* Main Content Area */}
      <div className="dashboard-card" style={{ width: '2000px', height: '454px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
        {monitors.length === 0 ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '40px' }}>
              <img
                src={emptyStateImg}
                alt="Empty state illustration"
                style={{ width: '380px', height: 'auto', display: 'block', margin: '0 auto' }}
              />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#4285f4', marginBottom: '12px' }}>Hey There !</h3>
            <p style={{ color: '#555', fontSize: '15px', fontWeight: '500' }}>
              <span style={{ color: '#4285f4' }}>Please add your monitor name & site url</span> know about your synthetic monitoring
            </p>
          </div>
        ) : (
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#333' }}>Active Monitors</h2>
              <div style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  placeholder="Search monitors..."
                  style={{ padding: '10px 14px 10px 42px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', width: '280px', outline: 'none', transition: 'border-color 0.2s' }}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primary-blue)'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
              {monitors.map(m => (
                <div key={m._id} className="dashboard-card" style={{ padding: '24px', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span style={{ fontSize: '12px', background: m.type === 'HTTPS' ? '#f0fdf4' : '#eff6ff', color: m.type === 'HTTPS' ? '#166534' : '#1e40af', padding: '4px 10px', borderRadius: '6px', fontWeight: '700' }}>{m.type}</span>
                    <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>{m.method}</span>
                  </div>
                  <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '6px' }}>{m.name}</h4>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.url}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: m.status === 'Up' ? '#34a853' : '#94a3b8', fontWeight: '600' }}>
                    <CheckCircle2 size={16} /> {m.status === 'Pending' ? 'Active' : m.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Intro Modal */}
      {showIntroModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#fff', borderRadius: '24px', width: '640px', padding: '48px', position: 'relative', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <button
              onClick={() => setShowIntroModal(false)}
              style={{ position: 'absolute', right: '28px', top: '28px', background: '#f8fafc', border: 'none', color: '#666', cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex' }}
            >
              <X size={20} />
            </button>
            <div style={{ marginBottom: '36px' }}>
              <img src={emptyStateImg} alt="Intro" style={{ width: '280px', margin: '0 auto' }} />
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '16px', color: '#333' }}>Real-time insights coming together</h2>
            <p style={{ color: '#666', marginBottom: '40px', fontSize: '17px' }}>Set Up Your Monitoring for Enhanced Performance !</p>
            <button
              onClick={() => { setShowIntroModal(false); setShowWizardModal(true); }}
              style={{ background: 'var(--primary-blue)', color: '#fff', border: 'none', padding: '16px 48px', borderRadius: '12px', fontSize: '18px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 20px rgba(66, 133, 244, 0.3)' }}
            >
              Create Your Monitoring
            </button>
          </div>
        </div>
      )}

      {/* Wizard Modal */}
      {showWizardModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#fff', borderRadius: '24px', width: '840px', padding: '48px', position: 'relative', minHeight: '600px', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <button
              onClick={() => setShowWizardModal(false)}
              style={{ position: 'absolute', right: '28px', top: '28px', background: '#f8fafc', border: 'none', color: '#666', cursor: 'pointer', padding: '8px', borderRadius: '50%', display: 'flex' }}
            >
              <X size={20} />
            </button>

            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#333', marginBottom: '36px' }}>Add your monitoring</h2>

            {renderStepper()}

            {/* Step 1: Types */}
            {step === 1 && (
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '40px', textAlign: 'center', color: '#333' }}>Choose Your Synthetic Monitoring Type !</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                  <div
                    onClick={() => setMonitorType('HTTP')}
                    style={{
                      padding: '40px 30px',
                      borderRadius: '20px',
                      background: monitorType === 'HTTP' ? '#f0f4ff' : '#f8fafc',
                      border: '2px solid',
                      borderColor: monitorType === 'HTTP' ? 'var(--primary-blue)' : 'transparent',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ marginBottom: '24px', background: monitorType === 'HTTP' ? '#fff' : '#fff', width: '80px', height: '80px', margin: '0 auto 24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                      <Globe size={40} color={monitorType === 'HTTP' ? 'var(--primary-blue)' : '#94a3b8'} />
                    </div>
                    <button style={{ background: 'var(--primary-blue)', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: '700' }}>Create Your HTTP Monitoring</button>
                  </div>
                  <div
                    onClick={() => setMonitorType('HTTPS')}
                    style={{
                      padding: '40px 30px',
                      borderRadius: '20px',
                      background: monitorType === 'HTTPS' ? '#f0fdf4' : '#f8fafc',
                      border: '2px solid',
                      borderColor: monitorType === 'HTTPS' ? '#34a853' : 'transparent',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ marginBottom: '24px', background: '#fff', width: '80px', height: '80px', margin: '0 auto 24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                      <Lock size={40} color={monitorType === 'HTTPS' ? '#34a853' : '#94a3b8'} />
                    </div>
                    <button style={{ border: '1px solid #e2e8f0', background: '#fff', color: '#333', padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: '700' }}>Create Your HTTPS Monitoring</button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Configuration */}
            {step === 2 && (
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '32px', color: '#333' }}>Configure your <span style={{ color: 'var(--primary-blue)' }}>{monitorType}</span> Monitoring !</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '520px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#555', fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>Monitor Name</label>
                    <input
                      className="login-input"
                      placeholder="e.g. Production API"
                      style={{ border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '10px' }}
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#555', fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>Site URL</label>
                    <input
                      className="login-input"
                      placeholder="https://example.com"
                      style={{ border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '10px' }}
                      value={formData.url}
                      onChange={e => setFormData({ ...formData, url: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#555', fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>HTTP Method</label>
                    <select
                      className="login-input"
                      style={{ border: '1px solid #e2e8f0', background: '#fff', padding: '12px 16px', borderRadius: '10px' }}
                      value={formData.method}
                      onChange={e => setFormData({ ...formData, method: e.target.value })}
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="DELETE">DELETE</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: '32px', padding: '16px 20px', borderRadius: '12px', background: 'rgba(66, 133, 244, 0.05)', border: '1px solid rgba(66, 133, 244, 0.1)', display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ color: 'var(--primary-blue)', display: 'flex' }}><Info size={18} /></div>
                  <div style={{ fontSize: '13px', color: '#555', lineHeight: '1.5' }}>
                    <span style={{ fontWeight: '700', color: '#333' }}>Hehei Tip:</span> HTTP method selection allows you to test specific API endpoints like login or search.
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Alerts (Placeholder) */}
            {step === 3 && (
              <div style={{ flex: 1, textAlign: 'center', paddingTop: '40px' }}>
                <div style={{ width: '80px', height: '80px', background: '#fff9f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#ff9800' }}>
                  <Bell size={40} />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px' }}>Configure Alerts</h3>
                <p style={{ color: '#666', maxWidth: '400px', margin: '0 auto 30px' }}>Get notified instantly via Slack, Email, or Webhook when your service goes down.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                  <span style={{ background: '#f1f5f9', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>Slack</span>
                  <span style={{ background: '#f1f5f9', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>Email</span>
                  <span style={{ background: '#f1f5f9', padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>Teams</span>
                </div>
              </div>
            )}

            {/* Step 4: Summary */}
            {step === 4 && (
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '32px', color: '#333' }}>Final Review</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '800', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Monitor Name</div>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: '#333' }}>{formData.name || 'Unnamed Project'}</div>
                    </div>
                    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '800', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Target Endpoint</div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary-blue)', wordBreak: 'break-all' }}>{formData.url || 'Not provided'}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <div style={{ flex: 1, padding: '16px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '800', marginBottom: '6px', textTransform: 'uppercase' }}>Type</div>
                        <div style={{ fontWeight: '700', color: '#333' }}>{monitorType}</div>
                      </div>
                      <div style={{ flex: 1, padding: '16px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '800', marginBottom: '6px', textTransform: 'uppercase' }}>Method</div>
                        <div style={{ fontWeight: '700', color: '#333' }}>{formData.method}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '800', marginBottom: '12px', textTransform: 'uppercase' }}>Global Deployment</div>
                    <div style={{ background: '#f1f5f9', borderRadius: '20px', padding: '15px' }}>
                      <img src={mapImg} alt="Map" style={{ width: '100%', borderRadius: '10px' }} />
                    </div>
                    <div style={{ marginTop: '16px', fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
                      Monitoring from US, Europe, and Asia
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Nav */}
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '32px' }}>
              <button
                onClick={prevStep}
                disabled={step === 1}
                style={{ background: '#fff', color: '#666', border: '1px solid #e2e8f0', padding: '12px 30px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', visibility: step === 1 ? 'hidden' : 'visible' }}
              >
                Back
              </button>
              <button
                onClick={step === 4 ? handleComplete : nextStep}
                style={{ background: 'var(--primary-blue)', color: '#fff', border: 'none', padding: '12px 40px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(66, 133, 244, 0.2)' }}
              >
                {step === 4 ? 'Complete Creation' : 'Save & Next'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
