import { useState } from 'react';
import { AdminNav, TopHeader } from '../../components/shared/Navigation';
import { mockRiders, mockDrivers } from '../../data/mockData';
import { Avatar, Badge } from '../../components/ui/SharedComponents';

export default function AdminUsers() {
  const [tab, setTab] = useState('riders');
  const [search, setSearch] = useState('');

  const riders = mockRiders.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));
  const drivers = mockDrivers.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
  const list = tab === 'riders' ? riders : drivers;

  return (
    <div className="app-screen" style={{ background: 'var(--bg-dark)' }}>
      <TopHeader title="Users" />

      <div className="app-content" style={{ padding: '16px 16px 100px' }}>
        {/* Summary */}
        <div className="grid-2" style={{ marginBottom: 16 }}>
          {[
            { label: 'Total Riders', val: mockRiders.length, icon: '👩', color: 'var(--purple-400)' },
            { label: 'Total Drivers', val: mockDrivers.length, icon: '🏍️', color: '#34d399' },
          ].map((s, i) => (
            <div key={i} className="glass-card" style={{ padding: 14, display: 'flex', gap: 12, alignItems: 'center', borderRadius: 'var(--radius-lg)' }}>
              <span style={{ fontSize: 28 }}>{s.icon}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 11, color: 'var(--gray-400)', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab + Search */}
        <div className="toggle-group" style={{ marginBottom: 14 }}>
          <button className={`toggle-btn ${tab === 'riders' ? 'active' : ''}`} onClick={() => setTab('riders')}>Riders ({mockRiders.length})</button>
          <button className={`toggle-btn ${tab === 'drivers' ? 'active' : ''}`} onClick={() => setTab('drivers')}>Drivers ({mockDrivers.length})</button>
        </div>

        <input className="input-field" placeholder="🔍 Search by name…" value={search} onChange={e => setSearch(e.target.value)} style={{ marginBottom: 14 }} />

        {/* User list */}
        {list.map((u, i) => (
          <div key={i} className="glass-card" style={{ padding: 14, marginBottom: 8, borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <Avatar user={u} size="md" />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{u.name}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{u.phone} · Joined {u.joined}</div>
              </div>
              <Badge variant={u.status === 'active' ? 'active' : u.status === 'pending' ? 'warning' : 'danger'}>
                {u.status}
              </Badge>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>⭐ {u.rating}</span>
                <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>🛵 {u.rides} rides</span>
                {tab === 'drivers' && u.verified && <Badge variant="verified">ID Verified</Badge>}
                {tab === 'drivers' && !u.verified && <Badge variant="warning">Not Verified</Badge>}
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn btn-sm btn-ghost" style={{ padding: '4px 10px', fontSize: 11 }}>View</button>
                {tab === 'drivers' && !u.verified && (
                  <button className="btn btn-sm btn-success" style={{ padding: '4px 10px', fontSize: 11 }}>Verify</button>
                )}
                {u.status === 'active' && (
                  <button className="btn btn-sm" style={{ padding: '4px 10px', fontSize: 11, background: 'rgba(239,68,68,.15)', color: '#f87171', border: '1px solid rgba(239,68,68,.3)' }}>Suspend</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdminNav />
    </div>
  );
}
