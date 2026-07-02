import { useNavigate } from 'react-router-dom';
import { useRide } from '../../context/RideContext';
import { RiderNav, TopHeader } from '../../components/shared/Navigation';
import { RideHistoryCard } from '../../components/ui/SharedComponents';

export default function RiderHistory() {
  const { history } = useRide();
  const navigate = useNavigate();

  const riderHistory = history.filter(r => r.status !== 'active');

  const totalRides = riderHistory.length;
  const totalSpent = riderHistory.filter(r => r.status === 'completed').reduce((s, r) => s + r.fare, 0);
  const avgRating = (riderHistory.filter(r => r.rating).reduce((s, r) => s + r.rating, 0) / riderHistory.filter(r => r.rating).length).toFixed(1);

  return (
    <div className="app-screen" style={{ background: 'var(--bg-dark)' }}>
      <TopHeader title="My Rides" />

      <div className="app-content" style={{ padding: '16px 20px' }}>
        {/* Stats */}
        <div className="grid-3" style={{ marginBottom: 20 }}>
          {[
            { label: 'Total Rides', value: totalRides, icon: '🛵' },
            { label: 'Total Spent', value: `₹${totalSpent}`, icon: '💳' },
            { label: 'Avg Rating', value: `⭐ ${avgRating}`, icon: '⭐' },
          ].map((s, i) => (
            <div key={i} className="glass-card" style={{ padding: 14, textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '.05em', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
          {['All', 'Completed', 'Cancelled'].map(f => (
            <button key={f} className="btn btn-sm" style={{ whiteSpace: 'nowrap', background: f === 'All' ? 'var(--purple-800)' : 'rgba(255,255,255,.06)', border: f === 'All' ? 'none' : '1px solid rgba(255,255,255,.12)', color: 'white' }}>
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        {riderHistory.map(ride => (
          <RideHistoryCard key={ride.id} ride={ride} onClick={() => {}} />
        ))}

        {riderHistory.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🛵</div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>No rides yet</div>
            <div style={{ color: 'var(--gray-400)', fontSize: 14 }}>Book your first safe ride!</div>
            <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => navigate('/rider')}>Book Now →</button>
          </div>
        )}
      </div>

      <RiderNav />
    </div>
  );
}
