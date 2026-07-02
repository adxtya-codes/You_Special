import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AdminNav, TopHeader } from '../../components/shared/Navigation';
import { mockRiders, mockDrivers, mockRides, mockComplaints, mockSafetyAlerts } from '../../data/mockData';

const stats = [
  { label: 'Total Riders',   value: '2,841', icon: '👩', color: 'var(--purple-500)', change: '+12%', up: true },
  { label: 'Active Drivers', value: '186',   icon: '🏍️', color: '#34d399',            change: '+8%',  up: true },
  { label: 'Rides Today',    value: '634',   icon: '🛵', color: 'var(--pink-400)',     change: '+5%',  up: true },
  { label: 'SOS Alerts',     value: '2',     icon: '🆘', color: '#f87171',             change: '-3',   up: false },
  { label: 'Revenue Today',  value: '₹48.2k',icon: '💰', color: '#fbbf24',            change: '+18%', up: true },
  { label: 'Safety Score',   value: '96/100',icon: '🛡️', color: '#34d399',             change: '+2',   up: true },
];

export default function AdminOverview() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const activeRides = mockRides.filter(r => r.status === 'active').length;
  const onlineDrivers = mockDrivers.filter(d => d.online).length;
  const openAlerts = mockSafetyAlerts.filter(a => a.status !== 'resolved').length;

  return (
    <div className="app-screen" style={{ background: 'var(--bg-dark)' }}>
      <div className="top-header" style={{ justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>Admin Dashboard</div>
          <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>You Special · Control Center</div>
        </div>
        <button className="btn btn-sm btn-secondary" onClick={() => { logout(); navigate('/'); }}>Logout</button>
      </div>

      <div className="app-content" style={{ padding: '16px 16px 100px' }}>
        {/* Live status bar */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
          {[
            { label: 'Active Rides', val: activeRides, color: 'var(--purple-500)' },
            { label: 'Drivers Online', val: onlineDrivers, color: '#34d399' },
            { label: 'Open Alerts', val: openAlerts, color: '#f87171' },
          ].map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,.06)', border: `1px solid ${s.color}30`, borderRadius: 'var(--radius-lg)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, minWidth: 130 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 10, color: 'var(--gray-400)', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid-2" style={{ marginBottom: 20 }}>
          {stats.map((s, i) => (
            <div key={i} className="glass-card" style={{ padding: 16, borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 24 }}>{s.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: s.up ? '#34d399' : '#f87171', background: s.up ? 'rgba(16,185,129,.1)' : 'rgba(239,68,68,.1)', padding: '2px 8px', borderRadius: 99 }}>
                  {s.up ? '▲' : '▼'} {s.change}
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '.05em', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Alerts */}
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>🚨 Recent Safety Alerts</div>
        {mockSafetyAlerts.slice(0, 2).map((a, i) => (
          <div key={i} className="glass-card" style={{ padding: 14, marginBottom: 8, borderRadius: 'var(--radius-lg)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 24 }}>{a.type === 'SOS' ? '🆘' : a.type === 'Route Deviation' ? '⚠️' : '⏸️'}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{a.type}</div>
              <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{a.rider} · {a.location} · {a.time}</div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 99, background: a.status === 'resolved' ? 'rgba(16,185,129,.15)' : 'rgba(245,158,11,.15)', color: a.status === 'resolved' ? '#34d399' : '#fbbf24' }}>
              {a.status}
            </span>
          </div>
        ))}

        {/* Quick Actions */}
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, marginTop: 20 }}>Quick Actions</div>
        <div className="grid-2" style={{ gap: 10 }}>
          {[
            { label: 'Verify Driver', icon: '✅', action: () => navigate('/admin/users') },
            { label: 'View Complaints', icon: '📋', action: () => navigate('/admin/safety') },
            { label: 'Broadcast Alert', icon: '📢', action: () => {} },
            { label: 'AI Insights', icon: '🤖', action: () => navigate('/admin/ai') },
          ].map((a, i) => (
            <button key={i} className="glass-card" style={{ padding: '16px 12px', border: 'none', cursor: 'pointer', color: 'white', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: 10 }} onClick={a.action}>
              <span style={{ fontSize: 28 }}>{a.icon}</span>
              <span style={{ fontWeight: 600, fontSize: 13 }}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      <AdminNav />
    </div>
  );
}
