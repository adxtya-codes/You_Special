// Design System — You Special
// Strict palette: White · Black · Pink (#FFD4E9)

export const colors = {
  // Core palette — 3 colours only
  pink:        '#FFD4E9',   // brand pink (backgrounds, highlights)
  pinkMid:     '#F4B8D8',   // slightly deeper pink (borders, active states)
  pinkDeep:    '#E8A0C5',   // deep pink (pressed states, borders)

  white:       '#FFFFFF',
  black:       '#111111',

  // Greys (for text hierarchy — still in the white/black family)
  gray50:      '#FAFAFA',
  gray100:     '#F5F5F5',
  gray200:     '#EBEBEB',
  gray300:     '#D6D6D6',
  gray400:     '#AAAAAA',
  gray500:     '#777777',
  gray600:     '#555555',
  gray700:     '#333333',

  // Semantic — using only black/pink/white
  primary:     '#111111',   // buttons, CTAs → black
  surface:     '#FFFFFF',   // card backgrounds
  bg:          '#FAFAFA',   // page background
  bgPink:      '#FFD4E9',   // pink background areas

  // Text
  textPrimary:   '#111111',
  textSecondary: '#555555',
  textMuted:     '#AAAAAA',
  textOnDark:    '#FFFFFF',
  textOnPink:    '#111111',

  // Legacy aliases (keep screens from breaking)
  success:      '#111111',
  successLight: '#FFD4E9',
  accent:       '#111111',
  accentDark:   '#111111',
  accentLight:  '#FFD4E9',
  warning:      '#555555',
  warningLight: '#FFD4E9',
  danger:       '#111111',
  dangerLight:  '#FFD4E9',
  info:         '#111111',
  infoLight:    '#FFD4E9',

  // Keep for backward compat
  bgWhite:     '#FFFFFF',
  bgDark:      '#111111',
  bgDark2:     '#222222',
  purple800:   '#1A0A1F',  // deep plum (used in gradients)
  purple700:   '#111111',
  purple600:   '#333333',
  purple500:   '#FFD4E9',
  purple400:   '#F4B8D8',
  purple300:   '#FFD4E9',
  pink500:     '#F4B8D8',
  pink400:     '#FFD4E9',
  pink100:     '#FFD4E9',
  primaryDark: '#333333',
  primaryLight:'#FFD4E9',
  primaryMid:  '#F4B8D8',
};

export const spacing = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  xxl:  24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
};

export const radius = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  xxl:  28,
  full: 9999,
};

export const typography = {
  displayLg: { fontSize: 36, fontWeight: '800', letterSpacing: -0.8, color: '#111111' },
  displayMd: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5, color: '#111111' },
  displaySm: { fontSize: 22, fontWeight: '700', letterSpacing: -0.3, color: '#111111' },
  headingLg: { fontSize: 20, fontWeight: '700', color: '#111111' },
  headingMd: { fontSize: 17, fontWeight: '700', color: '#111111' },
  headingSm: { fontSize: 15, fontWeight: '600', color: '#111111' },
  bodyLg:    { fontSize: 16, fontWeight: '400', color: '#555555' },
  bodyMd:    { fontSize: 14, fontWeight: '400', color: '#555555' },
  bodySm:    { fontSize: 12, fontWeight: '400', color: '#AAAAAA' },
  label:     { fontSize: 11, fontWeight: '700', letterSpacing: 1.2, textTransform: 'uppercase', color: '#AAAAAA' },
  caption:   { fontSize: 11, fontWeight: '400', color: '#AAAAAA' },
};

// Subtle shadow
export const shadow = {
  xs:  { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4,  elevation: 1 },
  sm:  { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8,  elevation: 2 },
  md:  { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 14, elevation: 4 },
  lg:  { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.10, shadowRadius: 20, elevation: 6 },
  xl:  { shadowColor: '#000', shadowOffset: { width: 0, height: 12}, shadowOpacity: 0.12, shadowRadius: 28, elevation: 10 },
};

// Clean white card
export const glassCard = {
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#EBEBEB',
  borderRadius: radius.xl,
  ...shadow.sm,
};
