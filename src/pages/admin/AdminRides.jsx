import { useState } from 'react';
import { AdminNav, TopHeader } from '../../components/shared/Navigation';
import { mockRides } from '../../data/mockData';
import { Badge } from '../../components/ui/SharedComponents';

export default function AdminRides() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? mockRides : mockRides.filter(r => r.status === filter);

  return (
    <div className="app-screen" style={{ background: 'var(--bg-dark)' }}>
      <TopHeader title="Rides" />

      <div className="app-content" style={{ padding: '16px 16px 100px' }}>
        {/* Ride stats */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
          {[
            { label: 'Total', val: mockRides.length, color: 'var(--purple-400)' },
            { label: 'Completed', val: mockRides.filter(r => r.status === 'completed').length, color: '#34d399' },
            { label: 'Active', val: mockRides.filter(r => r.status === 'active').length, color: '#fbbf24' },
            { label: 'Cancelled', val: mockRides.filter(r => r.status === 'cancelled').length, color: '#f87171' },
          ].map((s, i) => (
            <button key={i} onClick={() => setFilter(i === 0 ? 'all' : s.label.toLowerCase())} style={{ background: 'rgba(255,255,255,.06)', border: `1px solid ${s.color}30`, borderRadius: 'var(--radius-lg)', padding: '10px 16px', flexShrink: 0, cursor: 'pointer', color: 'white', textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 10, color: 'var(--gray-400)', textTransform: 'uppercase' }}>{s.label}</div>
            </button>
          ))}
        </div>

        {/* Rides list */}
        {filtered.map((ride, i) => (
          <div key={i} className="glass-card" style={{ padding: 16, marginBottom: 10, borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-display)' }}>#{ride.id.toUpperCase()}</div>
                <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{ride.date} · {ride.time}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Badge variant={ride.status === 'completed' ? 'verified' : ride.status === 'active' ? 'purple' : 'danger'}>{ride.status}</Badge>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, marginTop: 4, color: 'var(--purple-300)' }}>₹{ride.fare}</div>
              </div>
            </div>

            {/* Route */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, paddingTop: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }} />
                <div style={{ width: 1, height: 20, background: 'var(--gray-600)' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--pink-500)' }} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{ride.pickup}</div>
                <div style={{ fontSize: 12, fontWeight: 600, marginTop: 12 }}>{ride.drop}</div>
              </div>
            </div>

            {/* People */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 12, color: 'var(--gray-400)' }}>
              <span>👩 Rider: <strong style={{ color: 'white' }}>{ride.rider.name}</strong></span>
              <span>🏍️ Driver: <strong style={{ color: 'white' }}>{ride.driver.name}</strong></span>
              <span>📍 {ride.distance}</span>
              <span>⏱️ {ride.duration}</span>
            </div>
          </div>
        ))}
      </div>

      <AdminNav />
    </div>
  );
}
