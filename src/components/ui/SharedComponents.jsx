// Shared UI Components

// ── Avatar ──
export function Avatar({ user, size = 'md', className = '' }) {
  const colors = [
    'linear-gradient(135deg,#6B21A8,#F43F5E)',
    'linear-gradient(135deg,#7c3aed,#db2777)',
    'linear-gradient(135deg,#4f46e5,#9333ea)',
    'linear-gradient(135deg,#be185d,#7c3aed)',
  ];
  const colorIdx = (user?.name?.charCodeAt(0) || 0) % colors.length;
  return (
    <div
      className={`avatar avatar-${size} ${className}`}
      style={{ background: colors[colorIdx], color: 'white', flexShrink: 0 }}
    >
      {user?.initials || user?.name?.slice(0, 2).toUpperCase() || '?'}
    </div>
  );
}

// ── Stars ──
export function Stars({ value = 5, max = 5 }) {
  return (
    <div className="stars">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < Math.round(value) ? 'star' : 'star-empty'}>★</span>
      ))}
    </div>
  );
}

// ── Badge ──
export function Badge({ variant = 'purple', children }) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}

// ── Spinner ──
export function Spinner({ size = 24, color = 'var(--purple-400)' }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      style={{ animation: 'spin 1s linear infinite' }}
    >
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="3" strokeOpacity=".2" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// ── Logo ──
export function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="32" fill="#6B21A8" />
      <circle cx="32" cy="20" r="8" fill="#F43F5E" />
      <path d="M18 48c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// ── Card ──
export function Card({ children, variant = 'dark', className = '', style = {}, onClick }) {
  return (
    <div className={`card card-${variant} ${className}`} style={style} onClick={onClick}>
      {children}
    </div>
  );
}

// ── Divider ──
export function Divider() {
  return <div className="divider" />;
}

// ── Section Header ──
export function SectionHeader({ title, action, actionLabel }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 style={{ fontSize: 16, fontWeight: 700 }}>{title}</h3>
      {action && (
        <button className="btn btn-ghost btn-sm" onClick={action}>
          {actionLabel || 'See all'}
        </button>
      )}
    </div>
  );
}

// ── Driver Card ──
export function DriverCard({ driver, compact = false }) {
  return (
    <div className="glass-card p-4" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <Avatar user={driver} size="lg" />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>{driver.name}</span>
          {driver.verified && <Badge variant="verified">✓ Verified</Badge>}
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 4 }}>
          <Stars value={driver.rating} />
          <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>{driver.rating} ({driver.rides} rides)</span>
        </div>
        {!compact && (
          <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>
            🛵 {driver.vehicle} · {driver.vehicleNo}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Ride History Card ──
export function RideHistoryCard({ ride, onClick }) {
  const statusColors = { completed: 'verified', active: 'purple', cancelled: 'danger' };
  return (
    <div className="card card-dark" style={{ cursor: 'pointer', marginBottom: 10 }} onClick={onClick}>
      <div className="flex items-center justify-between mb-3">
        <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{ride.date} · {ride.time}</div>
        <Badge variant={statusColors[ride.status] || 'purple'}>{ride.status}</Badge>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, paddingTop: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--success)' }} />
          <div style={{ width: 1, height: 30, background: 'var(--gray-600)' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--pink-500)' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{ride.pickup}</div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>{ride.drop}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--purple-400)' }}>₹{ride.fare}</div>
          <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{ride.distance}</div>
        </div>
      </div>
      {ride.rating && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Stars value={ride.rating} />
          <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>You rated your driver</span>
        </div>
      )}
    </div>
  );
}
