import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useRide } from '../../context/RideContext';
import { DriverNav, TopHeader } from '../../components/shared/Navigation';
import { Avatar, Badge, Stars } from '../../components/ui/SharedComponents';
import { mockDrivers } from '../../data/mockData';

export default function DriverDashboard() {
  const { user } = useAuth();
  const { driverOnline, setDriverOnline, pendingRequest } = useRide();
  const [showRequest, setShowRequest] = useState(false);
  const navigate = useNavigate();

  const driver = user || mockDrivers[0];
  const hour = new Date().getHours();

  // Show incoming ride after going online
  const handleToggleOnline = () => {
    setDriverOnline(v => !v);
    if (!driverOnline) setTimeout(() => setShowRequest(true), 2000);
  };

  return (
    <div className="app-screen" style={{ background: 'var(--bg-dark)' }}>
      <div className="app-content" style={{ padding: '20px 20px 100px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <Avatar user={driver} size="lg" />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20 }}>{driver.name || 'Sunita Verma'}</div>
            <div style={{ fontSize: 13, color: 'var(--gray-400)' }}>🛵 {driver.vehicle || 'Honda Activa 6G'}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
              <Badge variant="verified">✓ Verified</Badge>
              <Badge variant={driverOnline ? 'active' : 'warning'}>{driverOnline ? '🟢 Online' : '🔴 Offline'}</Badge>
            </div>
          </div>
        </div>

        {/* Online Toggle */}
        <div className="glass-card" style={{ padding: 20, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 'var(--radius-xl)' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
              {driverOnline ? '🟢 You are Online' : '🔴 You are Offline'}
            </div>
            <div style={{ fontSize: 13, color: 'var(--gray-400)' }}>
              {driverOnline ? 'Receiving ride requests from nearby riders' : 'Toggle to start receiving rides'}
            </div>
          </div>
          <button
            onClick={handleToggleOnline}
            style={{
              width: 64, height: 34,
              borderRadius: 99,
              background: driverOnline ? 'linear-gradient(135deg,var(--success),#059669)' : 'rgba(255,255,255,.1)',
              border: 'none', cursor: 'pointer', padding: 3,
              display: 'flex', alignItems: 'center', justifyContent: driverOnline ? 'flex-end' : 'flex-start',
              transition: 'all .3s',
              boxShadow: driverOnline ? '0 0 16px rgba(16,185,129,.4)' : 'none',
            }}
          >
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'white', boxShadow: '0 2px 6px rgba(0,0,0,.3)', transition: 'all .3s' }} />
          </button>
        </div>

        {/* Today's Stats */}
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Today's Earnings</div>
        <div className="grid-2" style={{ marginBottom: 20 }}>
          {[
            { icon: '💰', label: 'Earned Today', value: `₹${driver.todayEarnings || 840}`, color: '#34d399' },
            { icon: '🛵', label: 'Rides Today', value: '6', color: 'var(--purple-400)' },
            { icon: '⭐', label: 'Today\'s Rating', value: '4.9', color: '#fbbf24' },
            { icon: '⏱️', label: 'Hours Online', value: '4.5h', color: 'var(--pink-400)' },
          ].map((s, i) => (
            <div key={i} className="glass-card" style={{ padding: 16, borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Ride History Preview */}
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12 }}>Recent Rides</div>
        {[
          { time: '10:45 AM', from: 'Whitefield IT Park', to: 'HSR Layout', fare: 120, rating: 5 },
          { time: '09:15 AM', from: 'Koramangala', to: 'Indiranagar Metro', fare: 65, rating: 5 },
          { time: '08:00 AM', from: 'Hebbal', to: 'Yelahanka', fare: 145, rating: 4 },
        ].map((r, i) => (
          <div key={i} className="glass-card" style={{ padding: '14px 16px', marginBottom: 8, borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ textAlign: 'center', minWidth: 48 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--purple-300)', fontFamily: 'var(--font-display)' }}>₹{r.fare}</div>
              <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>{r.time}</div>
            </div>
            <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,.1)' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{r.from}</div>
              <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>→ {r.to}</div>
            </div>
            <div style={{ fontSize: 13, color: '#fbbf24' }}>{'⭐'.repeat(r.rating)}</div>
          </div>
        ))}

        {/* Safety note */}
        <div style={{ marginTop: 20, background: 'linear-gradient(135deg,rgba(107,33,168,.2),rgba(244,63,94,.1))', border: '1px solid rgba(168,85,247,.2)', borderRadius: 'var(--radius-xl)', padding: '16px 20px' }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>🛡️ You Special Safety Promise</div>
          <div style={{ fontSize: 12, color: 'var(--gray-400)', lineHeight: 1.6 }}>
            Your identity is verified. Riders see your real name, photo, and vehicle. All calls are anonymous. Our 24/7 team monitors all trips.
          </div>
        </div>
      </div>

      {/* Incoming Ride Modal */}
      {showRequest && pendingRequest && (
        <div className="modal-overlay" onClick={() => setShowRequest(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: 'var(--purple-300)' }}>New Ride Request! 🛵</div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>Accept within 30 seconds</div>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: 'var(--success)' }}>₹{pendingRequest.fare}</div>
            </div>

            {/* Timer bar */}
            <div style={{ height: 4, background: 'rgba(255,255,255,.1)', borderRadius: 99, marginBottom: 16, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'var(--purple-500)', borderRadius: 99, animation: 'sos-pulse 30s linear forwards', width: '70%' }} />
            </div>

            {/* Rider info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, padding: '14px', background: 'rgba(255,255,255,.04)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,#6B21A8,#F43F5E)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: 'white' }}>
                {pendingRequest.rider.initials}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{pendingRequest.rider.name}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>⭐ {pendingRequest.rider.rating} · {pendingRequest.rider.rides} rides</div>
              </div>
            </div>

            {/* Route */}
            <div style={{ padding: '12px 14px', background: 'rgba(255,255,255,.04)', borderRadius: 'var(--radius-lg)', marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#34d399', marginBottom: 6 }}>📍 {pendingRequest.pickup}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--pink-400)' }}>🏁 {pendingRequest.drop}</div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 6 }}>{pendingRequest.distance} · {pendingRequest.eta}</div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-secondary btn-full" onClick={() => setShowRequest(false)}>Decline</button>
              <button className="btn btn-success btn-full" onClick={() => { setShowRequest(false); navigate('/driver'); }}>Accept Ride ✓</button>
            </div>
          </div>
        </div>
      )}

      <DriverNav />
    </div>
  );
}
