import { useState } from 'react';
import { AdminNav, TopHeader } from '../../components/shared/Navigation';
import { mockComplaints, mockSafetyAlerts } from '../../data/mockData';
import { Badge } from '../../components/ui/SharedComponents';

export default function AdminSafety() {
  const [tab, setTab] = useState('alerts');

  return (
    <div className="app-screen" style={{ background: 'var(--bg-dark)' }}>
      <TopHeader title="Safety" />

      <div className="app-content" style={{ padding: '16px 16px 100px' }}>
        <div className="toggle-group" style={{ marginBottom: 16 }}>
          <button className={`toggle-btn ${tab === 'alerts' ? 'active' : ''}`} onClick={() => setTab('alerts')}>🆘 Alerts ({mockSafetyAlerts.length})</button>
          <button className={`toggle-btn ${tab === 'complaints' ? 'active' : ''}`} onClick={() => setTab('complaints')}>📋 Complaints ({mockComplaints.length})</button>
        </div>

        {tab === 'alerts' && (
          <>
            <div style={{ display: 'flex', gap: 10, marginBottom: 16, overflowX: 'auto' }}>
              {[
                { label: 'SOS Triggered', val: mockSafetyAlerts.filter(a => a.type === 'SOS').length, color: '#f87171' },
                { label: 'Route Deviation', val: mockSafetyAlerts.filter(a => a.type === 'Route Deviation').length, color: '#fbbf24' },
                { label: 'Monitoring', val: mockSafetyAlerts.filter(a => a.status === 'monitoring').length, color: 'var(--purple-400)' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,.06)', border: `1px solid ${s.color}30`, borderRadius: 'var(--radius-lg)', padding: '10px 16px', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: s.color }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-400)', textTransform: 'uppercase' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {mockSafetyAlerts.map((a, i) => (
              <div key={i} className="glass-card" style={{ padding: 16, marginBottom: 10, borderRadius: 'var(--radius-lg)', borderLeft: `4px solid ${a.type === 'SOS' ? '#f87171' : a.status === 'monitoring' ? '#fbbf24' : '#34d399'}` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{a.type === 'SOS' ? '🆘' : a.type === 'Route Deviation' ? '⚠️' : '⏸️'}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14 }}>{a.type}</div>
                      <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{a.date} · {a.time}</div>
                    </div>
                  </div>
                  <Badge variant={a.status === 'resolved' ? 'verified' : 'warning'}>{a.status}</Badge>
                </div>
                <div style={{ fontSize: 13, color: 'var(--gray-300)', marginBottom: 8, lineHeight: 1.5 }}>{a.details}</div>
                <div style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--gray-400)', marginBottom: 10 }}>
                  <span>👩 Rider: {a.rider}</span>
                  <span>🏍️ Driver: {a.driver}</span>
                  <span>📍 {a.location}</span>
                </div>
                {a.status !== 'resolved' && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-sm btn-danger">Call Rider</button>
                    <button className="btn btn-sm btn-secondary">Mark Resolved</button>
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {tab === 'complaints' && (
          <>
            {mockComplaints.map((c, i) => (
              <div key={i} className="glass-card" style={{ padding: 16, marginBottom: 10, borderRadius: 'var(--radius-lg)', borderLeft: `4px solid ${c.severity === 'high' ? '#f87171' : c.severity === 'medium' ? '#fbbf24' : '#a78bfa'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{c.type}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>Ride #{c.rideId} · {c.date}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Badge variant={c.severity === 'high' ? 'danger' : c.severity === 'medium' ? 'warning' : 'purple'}>{c.severity}</Badge>
                    <Badge variant={c.status === 'resolved' ? 'verified' : 'warning'}>{c.status}</Badge>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 4 }}>
                  <span>Filed by: <strong style={{ color: 'var(--white)' }}>{c.reporter}</strong></span>
                  {' · '}
                  <span>Against: <strong style={{ color: 'var(--white)' }}>{c.against}</strong></span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--gray-300)', lineHeight: 1.5, marginBottom: 10 }}>{c.description}</div>
                {c.status !== 'resolved' && (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-sm btn-primary">Investigate</button>
                    <button className="btn btn-sm btn-success">Resolve</button>
                    <button className="btn btn-sm" style={{ background: 'rgba(239,68,68,.1)', color: '#f87171', border: '1px solid rgba(239,68,68,.2)' }}>Suspend Driver</button>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>

      <AdminNav />
    </div>
  );
}
