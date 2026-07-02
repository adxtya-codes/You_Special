import { Link, useLocation } from 'react-router-dom';

// ── Rider Bottom Nav ──
export function RiderNav() {
  const { pathname } = useLocation();
  const tabs = [
    { to: '/rider', label: 'Home', icon: HomeIcon },
    { to: '/rider/history', label: 'Rides', icon: ClockIcon },
    { to: '/rider/profile', label: 'Profile', icon: UserIcon },
  ];
  return (
    <nav className="bottom-nav">
      {tabs.map(({ to, label, icon: Icon }) => (
        <Link key={to} to={to} className={`bottom-nav-item ${pathname === to ? 'active' : ''}`}>
          <Icon size={22} />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}

// ── Driver Bottom Nav ──
export function DriverNav() {
  const { pathname } = useLocation();
  const tabs = [
    { to: '/driver', label: 'Dashboard', icon: GridIcon },
    { to: '/driver/earnings', label: 'Earnings', icon: WalletIcon },
    { to: '/driver/profile', label: 'Profile', icon: UserIcon },
  ];
  return (
    <nav className="bottom-nav">
      {tabs.map(({ to, label, icon: Icon }) => (
        <Link key={to} to={to} className={`bottom-nav-item ${pathname === to ? 'active' : ''}`}>
          <Icon size={22} />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}

// ── Admin Bottom Nav ──
export function AdminNav() {
  const { pathname } = useLocation();
  const tabs = [
    { to: '/admin',            label: 'Overview',  icon: GridIcon },
    { to: '/admin/users',      label: 'Users',     icon: UsersIcon },
    { to: '/admin/rides',      label: 'Rides',     icon: MapIcon },
    { to: '/admin/safety',     label: 'Safety',    icon: ShieldIcon },
    { to: '/admin/ai',         label: 'AI',        icon: SparkleIcon },
  ];
  return (
    <nav className="bottom-nav">
      {tabs.map(({ to, label, icon: Icon }) => (
        <Link key={to} to={to} className={`bottom-nav-item ${pathname === to ? 'active' : ''}`}>
          <Icon size={20} />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}

// ── Top Header ──
export function TopHeader({ title, back, onBack, right }) {
  return (
    <div className="top-header">
      {back && (
        <button className="btn btn-ghost btn-icon" onClick={onBack} style={{ padding: 6 }}>
          <BackIcon size={22} />
        </button>
      )}
      <span style={{ flex: 1, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>{title}</span>
      {right}
    </div>
  );
}

// ── Inline SVG Icons ──
function HomeIcon({ size = 24 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function ClockIcon({ size = 24 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
function UserIcon({ size = 24 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function GridIcon({ size = 24 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
}
function WalletIcon({ size = 24 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>;
}
function UsersIcon({ size = 24 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
function MapIcon({ size = 24 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>;
}
function ShieldIcon({ size = 24 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
}
function SparkleIcon({ size = 24 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M19 3l.75 2.25L22 6l-2.25.75L19 9l-.75-2.25L16 6l2.25-.75z"/><path d="M5 15l.75 2.25L8 18l-2.25.75L5 21l-.75-2.25L2 18l2.25-.75z"/></svg>;
}
function BackIcon({ size = 24 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>;
}
