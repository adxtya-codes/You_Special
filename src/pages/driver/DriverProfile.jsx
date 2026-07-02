import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DriverNav, TopHeader } from '../../components/shared/Navigation';
import { Avatar, Badge, Stars } from '../../components/ui/SharedComponents';
import { mockDrivers } from '../../data/mockData';

export default function DriverProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const driver = user || mockDrivers[0];

  const menuItems = [
    { icon: '📄', label: 'Documents', sub: 'ID, licence, RC book', badge: driver.verified ? '✓ Verified' : '⏳ Pending' },
    { icon: '🛵', label: 'My Vehicle', sub: driver.vehicle || 'Honda Activa 6G' },
    { icon: '🔔', label: 'Notifications', sub: 'Ride alerts, payouts' },
    { icon: '💳', label: 'Bank Account', sub: 'Linked for payouts' },
    { icon: '🆘', label: '24/7 Support', sub: 'Safety & emergency help' },
    { icon: '📋', label: 'Guidelines', sub: 'Driver rules & policies' },
  ];

  return (
    <div className="app-screen" style={{ background: 'var(--bg-dark)' }}>
      <TopHeader title="Driver Profile" />

      <div className="app-content" style={{ padding: '0 20px 16px' }}>
        {/* Profile Card */}
        <div className="glass-card" style={{ padding: 24, marginTop: 16, marginBottom: 20, borderRadius: 'var(--radius-xl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ position: 'relative' }}>
              <Avatar user={driver} size="xl" />
              {driver.verified && (
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%', background: '#10b981', border: '2px solid var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✓</div>
              )}
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, marginBottom: 4 }}>{driver.name || 'Sunita Verma'}</h2>
              <div style={{ color: 'var(--gray-400)', fontSize: 13, marginBottom: 6 }}>{driver.phone || '+91 90000 11111'}</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {driver.verified
                  ? <Badge variant="verified">✓ ID Verified</Badge>
                  : <Badge variant="warning">⏳ Under Review</Badge>
                }
                <Badge variant="purple">Female Driver</Badge>
              </div>
            </div>
          </div>

          <div className="divider" />

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', textAlign: 'center' }}>
            {[
              { label: 'Total Rides', val: driver.rides || 312 },
              { label: 'Rating', val: `⭐ ${driver.rating || 4.9}` },
              { label: 'Total Earned', val: `₹${((driver.earnings || 24500) / 1000).toFixed(1)}k` },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20 }}>{s.val}</div>
                <div style={{ fontSize: 10, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle Card */}
        <div className="glass-card" style={{ padding: 20, marginBottom: 16, borderRadius: 'var(--radius-xl)', display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-md)', background: 'rgba(107,33,168,.2)', border: '1px solid rgba(107,33,168,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>🛵</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{driver.vehicle || 'Honda Activa 6G'}</div>
            <div style={{ fontSize: 13, color: 'var(--gray-400)' }}>{driver.vehicleNo || 'MH-12-AB-3456'}</div>
            <Badge variant="verified" style={{ marginTop: 4 }}>RC Verified ✓</Badge>
          </div>
        </div>

        {/* Menu */}
        <div className="glass-card" style={{ padding: '8px 0', borderRadius: 'var(--radius-xl)', marginBottom: 16 }}>
          {menuItems.map((item, i) => (
            <button key={i} className="list-item" style={{ width: '100%', border: 'none', background: 'none', color: 'white', borderBottom: i < menuItems.length - 1 ? '1px solid rgba(255,255,255,.06)' : 'none', borderRadius: 0, padding: '14px 20px' }}>
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)' }}>{item.sub}</div>
              </div>
              {item.badge && <span style={{ fontSize: 11, color: '#34d399', fontWeight: 600 }}>{item.badge}</span>}
              <span style={{ color: 'var(--gray-500)', fontSize: 18 }}>›</span>
            </button>
          ))}
        </div>

        <button className="btn btn-danger btn-full" onClick={() => { logout(); navigate('/'); }}>Logout</button>
      </div>

      <DriverNav />
    </div>
  );
}
