import { DriverNav, TopHeader } from '../../components/shared/Navigation';
import { mockEarnings } from '../../data/mockData';

export default function DriverEarnings() {
  const total = mockEarnings.reduce((s, d) => s + d.amount, 0);
  const maxVal = Math.max(...mockEarnings.map(d => d.amount));
  const today = mockEarnings[mockEarnings.length - 1];

  return (
    <div className="app-screen" style={{ background: 'var(--bg-dark)' }}>
      <TopHeader title="My Earnings" />

      <div className="app-content" style={{ padding: '16px 20px 100px' }}>
        {/* Hero card */}
        <div style={{ background: 'linear-gradient(135deg,#6B21A8,#F43F5E)', borderRadius: 'var(--radius-xl)', padding: 24, marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,.1)' }} />
          <div style={{ position: 'absolute', bottom: -20, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,.05)' }} />
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', marginBottom: 4 }}>This Week's Total</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 44 }}>₹{total.toLocaleString()}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', marginTop: 4 }}>Avg ₹{Math.round(total / 7)}/day · 7 days</div>
        </div>

        {/* Today vs total */}
        <div className="grid-2" style={{ marginBottom: 20 }}>
          {[
            { label: "Today's Earnings", value: `₹${today.amount}`, icon: '📅', color: '#34d399' },
            { label: 'Pending Payout', value: '₹12,400', icon: '💳', color: '#fbbf24' },
          ].map((s, i) => (
            <div key={i} className="glass-card" style={{ padding: 18, borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '.05em', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="glass-card" style={{ padding: 20, marginBottom: 20, borderRadius: 'var(--radius-xl)' }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Daily Earnings (This Week)</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 140 }}>
            {mockEarnings.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ fontSize: 10, color: 'var(--gray-400)', fontWeight: 600 }}>₹{d.amount}</div>
                <div style={{
                  width: '100%', borderRadius: '6px 6px 0 0',
                  height: `${(d.amount / maxVal) * 100}px`,
                  background: i === mockEarnings.length - 1
                    ? 'linear-gradient(180deg,var(--success),#059669)'
                    : 'linear-gradient(180deg,var(--purple-600),var(--purple-800))',
                  transition: 'height .5s ease',
                }} />
                <div style={{ fontSize: 11, color: 'var(--gray-500)', fontWeight: 600 }}>{d.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Payout Section */}
        <div className="glass-card" style={{ padding: 20, borderRadius: 'var(--radius-xl)', marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 14 }}>💳 Payout History</div>
          {[
            { date: 'Jun 20, 2024', amount: 4200, mode: 'UPI', status: 'paid' },
            { date: 'Jun 13, 2024', amount: 5800, mode: 'Bank', status: 'paid' },
            { date: 'Jun 06, 2024', amount: 3600, mode: 'UPI', status: 'paid' },
          ].map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,.07)' : 'none' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>₹{p.amount.toLocaleString()}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{p.date} · via {p.mode}</div>
              </div>
              <span style={{ background: 'rgba(16,185,129,.15)', color: '#34d399', fontSize: 11, padding: '3px 10px', borderRadius: 99, fontWeight: 700 }}>Paid ✓</span>
            </div>
          ))}
        </div>

        <button className="btn btn-primary btn-full">Request Payout</button>
      </div>

      <DriverNav />
    </div>
  );
}
