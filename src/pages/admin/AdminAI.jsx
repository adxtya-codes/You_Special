import { AdminNav, TopHeader } from '../../components/shared/Navigation';
import { aiInsights } from '../../data/mockData';

export default function AdminAI() {
  const { demandZones, driverScores, suspiciousPatterns, summary } = aiInsights;

  return (
    <div className="app-screen" style={{ background: 'var(--bg-dark)' }}>
      <TopHeader title="AI Insights 🤖" />

      <div className="app-content" style={{ padding: '16px 16px 100px' }}>

        {/* AI Summary Card */}
        <div style={{ background: 'linear-gradient(135deg,rgba(107,33,168,.3),rgba(244,63,94,.15))', border: '1px solid rgba(168,85,247,.3)', borderRadius: 'var(--radius-xl)', padding: 20, marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(168,85,247,.1)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'rgba(168,85,247,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🤖</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>AI Daily Summary</div>
              <div style={{ fontSize: 11, color: 'var(--purple-300)' }}>Generated automatically · Updated hourly</div>
            </div>
          </div>
          <p style={{ fontSize: 14, color: 'var(--gray-200)', lineHeight: 1.7 }}>{summary}</p>
        </div>

        {/* Demand Heatmap */}
        <div className="glass-card" style={{ padding: 20, marginBottom: 20, borderRadius: 'var(--radius-xl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 22 }}>🌡️</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Demand Heatmap</div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>Real-time ride demand by zone</div>
            </div>
          </div>

          {demandZones.map((z, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>{z.zone}</span>
                <span style={{ color: z.level === 'high' ? '#f87171' : z.level === 'medium' ? '#fbbf24' : '#34d399', fontWeight: 700 }}>
                  {z.demand}% demand · {z.drivers} drivers
                </span>
              </div>
              <div style={{ height: 8, background: 'rgba(255,255,255,.1)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${z.demand}%`,
                  borderRadius: 99,
                  background: z.level === 'high'
                    ? 'linear-gradient(90deg,#dc2626,#f87171)'
                    : z.level === 'medium'
                    ? 'linear-gradient(90deg,#d97706,#fbbf24)'
                    : 'linear-gradient(90deg,#059669,#34d399)',
                  transition: 'width 1s ease',
                }} />
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', gap: 16, marginTop: 14, fontSize: 12 }}>
            {[['🔴 High Demand', '#f87171'], ['🟡 Medium', '#fbbf24'], ['🟢 Low', '#34d399']].map(([l, c]) => (
              <span key={l} style={{ color: c, fontWeight: 600 }}>{l}</span>
            ))}
          </div>
        </div>

        {/* Driver Assignment AI */}
        <div className="glass-card" style={{ padding: 20, marginBottom: 20, borderRadius: 'var(--radius-xl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 22 }}>🎯</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>AI Driver Matching</div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>Best driver assignments for next booking</div>
            </div>
          </div>

          {driverScores.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < driverScores.length - 1 ? '1px solid rgba(255,255,255,.07)' : 'none' }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                background: i === 0 ? 'linear-gradient(135deg,#6B21A8,#F43F5E)' : 'rgba(255,255,255,.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: 16, color: 'white',
              }}>
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{d.driver}</div>
                <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{d.reason}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, color: i === 0 ? '#34d399' : 'var(--purple-400)' }}>{d.score}</div>
                <div style={{ fontSize: 10, color: 'var(--gray-500)' }}>AI Score</div>
              </div>
            </div>
          ))}
        </div>

        {/* Suspicious Patterns */}
        <div className="glass-card" style={{ padding: 20, marginBottom: 20, borderRadius: 'var(--radius-xl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 22 }}>🔍</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Suspicious Pattern Detection</div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>AI flagged anomalies for review</div>
            </div>
          </div>

          {suspiciousPatterns.map((p, i) => (
            <div key={i} style={{ padding: '14px', background: p.risk === 'high' ? 'rgba(239,68,68,.08)' : 'rgba(245,158,11,.08)', border: `1px solid ${p.risk === 'high' ? 'rgba(239,68,68,.25)' : 'rgba(245,158,11,.25)'}`, borderRadius: 'var(--radius-md)', marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 13 }}>Ride #{p.rideId.toUpperCase()}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: p.risk === 'high' ? '#f87171' : '#fbbf24', textTransform: 'uppercase' }}>
                  {p.risk === 'high' ? '🔴' : '🟡'} {p.risk} risk
                </span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--gray-300)', lineHeight: 1.5 }}>{p.reason}</div>
              <button className="btn btn-sm btn-danger" style={{ marginTop: 10, fontSize: 11 }}>Review & Act</button>
            </div>
          ))}
        </div>

        {/* Route Risk */}
        <div className="glass-card" style={{ padding: 20, borderRadius: 'var(--radius-xl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 22 }}>🗺️</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Route Risk Zones</div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>AI-identified risky corridors based on past data</div>
            </div>
          </div>

          {[
            { route: 'Marathahalli → Bellandur (after 10 PM)', risk: 'medium', alerts: 3 },
            { route: 'Hebbal Flyover (8–9 AM)', risk: 'low', alerts: 1 },
            { route: 'ORR via Silk Board (7–8 PM)', risk: 'medium', alerts: 2 },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,.07)' : 'none' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: r.risk === 'high' ? '#f87171' : r.risk === 'medium' ? '#fbbf24' : '#34d399', flexShrink: 0 }} />
              <div style={{ flex: 1, fontSize: 13 }}>{r.route}</div>
              <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{r.alerts} alerts</div>
            </div>
          ))}
        </div>
      </div>

      <AdminNav />
    </div>
  );
}
