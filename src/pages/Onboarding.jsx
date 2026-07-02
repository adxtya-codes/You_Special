import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [
  {
    emoji: '👩‍🦰',
    title: 'Women Riders,\nWomen Drivers',
    desc: 'Every ride matches you with a verified female driver only. Your safety is our first promise.',
    color: 'linear-gradient(135deg,#6B21A8,#9333ea)',
  },
  {
    emoji: '📍',
    title: 'Live GPS &\nSOS Protection',
    desc: 'Share your live trip with trusted contacts. One-tap SOS alerts your family and our 24/7 safety team instantly.',
    color: 'linear-gradient(135deg,#db2777,#F43F5E)',
  },
  {
    emoji: '✅',
    title: 'Trusted &\nVerified Drivers',
    desc: 'Every driver is ID-verified, background-checked, and rated by real women riders. You ride, we protect.',
    color: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
  },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const slide = slides[step];

  const next = () => {
    if (step < slides.length - 1) setStep(s => s + 1);
    else navigate('/login');
  };

  return (
    <div className="app-screen" style={{ minHeight: '100dvh', background: 'var(--bg-dark)' }}>
      {/* Slide */}
      <div
        key={step}
        className="animate-fade-in"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 28px', textAlign: 'center' }}
      >
        {/* Illustration bubble */}
        <div style={{
          width: 180, height: 180, borderRadius: '50%',
          background: slide.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 90, marginBottom: 40,
          boxShadow: '0 16px 60px rgba(107,33,168,.4)',
        }} className="animate-float">
          {slide.emoji}
        </div>

        <h2 className="text-display text-3xl" style={{ marginBottom: 16, whiteSpace: 'pre-line' }}>
          {slide.title}
        </h2>
        <p style={{ color: 'var(--gray-300)', fontSize: 16, lineHeight: 1.7, maxWidth: 300 }}>
          {slide.desc}
        </p>
      </div>

      {/* Controls */}
      <div style={{ padding: '0 24px 48px' }}>
        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setStep(i)}
              style={{
                width: i === step ? 28 : 8, height: 8,
                borderRadius: 99,
                background: i === step ? 'var(--purple-500)' : 'rgba(255,255,255,.2)',
                transition: 'all .3s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        <button className="btn btn-primary btn-full btn-lg" onClick={next}>
          {step < slides.length - 1 ? 'Continue →' : 'Get Started 🛵'}
        </button>

        {step < slides.length - 1 && (
          <button className="btn btn-ghost btn-full" onClick={() => navigate('/login')} style={{ marginTop: 12 }}>
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
