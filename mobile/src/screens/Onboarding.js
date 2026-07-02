import React, { useState, useRef } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
  Dimensions, StatusBar, Platform, Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme';
import { PrimaryButton } from '../components/SharedComponents';

const { height: H, width: W } = Dimensions.get('window');

// Mandala ring decoration component
function MandalaRings({ color, style }) {
  return (
    <View style={[{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }, style]} pointerEvents="none">
      <View style={[styles.mandalaRing, { borderColor: color + '30', width: 280, height: 280, borderRadius: 140 }]} />
      <View style={[styles.mandalaRing, { borderColor: color + '20', width: 220, height: 220, borderRadius: 110, position: 'absolute' }]} />
      <View style={[styles.mandalaRing, { borderColor: color + '15', width: 160, height: 160, borderRadius: 80, position: 'absolute' }]} />
      {/* Mandala petal dots */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const r = 110;
        return (
          <View
            key={i}
            style={{
              position: 'absolute',
              width: 6, height: 6, borderRadius: 3,
              backgroundColor: color + '40',
              transform: [{ translateX: r * Math.cos(rad) }, { translateY: r * Math.sin(rad) }],
            }}
          />
        );
      })}
    </View>
  );
}

const slides = [
  {
    emoji: '👩‍👩‍👧‍👦',
    bgGrad: '#FF6B9D',
    bgLight: '#FFE8F3',
    accent: '#FF6B9D',
    title: 'Women Riders,\nWomen Drivers',
    desc: 'Every ride matches you with a verified female driver only. Your safety is our first promise.',
    dotColor: '#FF6B9D',
  },
  {
    emoji: '📍',
    bgGrad: '#6C63FF',
    bgLight: '#EEF0FF',
    accent: '#6C63FF',
    title: 'Live GPS &\nSOS Protection',
    desc: 'Share your live trip with trusted contacts. One-tap SOS alerts your family and our 24/7 safety team instantly.',
    dotColor: '#6C63FF',
  },
  {
    emoji: '🛡️',
    bgGrad: '#22C55E',
    bgLight: '#ECFDF5',
    accent: '#22C55E',
    title: 'Trusted &\nVerified Drivers',
    desc: 'Every driver is ID-verified, background-checked, and rated by real women riders. You ride, we protect.',
    dotColor: '#22C55E',
  },
];

export default function Onboarding({ navigation }) {
  const [step, setStep] = useState(0);
  const slide = slides[step];
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateTransition = (nextStep) => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 0.92, duration: 150, useNativeDriver: true }),
    ]).start(() => {
      setStep(nextStep);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
      ]).start();
    });
  };

  const handleNext = () => {
    if (step < slides.length - 1) animateTransition(step + 1);
    else navigation.navigate('Login');
  };

  const handleBack = () => {
    if (step > 0) animateTransition(step - 1);
  };

  return (
    <View style={[styles.container, { backgroundColor: slide.bgLight }]}>
      <StatusBar barStyle="dark-content" backgroundColor={slide.bgLight} />

      {/* Illustration area with mandala + emoji */}
      <View style={[styles.illustrationArea, { backgroundColor: slide.bgLight }]}>
        {step < slides.length - 1 && (
          <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.skipText, { color: slide.accent }]}>Skip</Text>
          </TouchableOpacity>
        )}

        {/* Mandala rings */}
        <MandalaRings color={slide.accent} style={{ top: '50%', left: '50%', marginTop: -140, marginLeft: -140 }} />

        {/* Central emoji circle */}
        <Animated.View
          style={[
            styles.emojiCircle,
            {
              backgroundColor: slide.bgGrad,
              borderColor: slide.accent + '40',
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.emojiText}>{slide.emoji}</Text>
        </Animated.View>

        {/* Floating accent shapes */}
        <View style={[styles.floatDot, { backgroundColor: slide.accent + '30', top: H * 0.08, left: W * 0.15, width: 14, height: 14 }]} />
        <View style={[styles.floatDot, { backgroundColor: slide.accent + '20', top: H * 0.15, right: W * 0.12, width: 20, height: 20 }]} />
        <View style={[styles.floatDot, { backgroundColor: slide.accent + '25', bottom: H * 0.05, left: W * 0.25, width: 10, height: 10 }]} />
      </View>

      {/* Content panel */}
      <View style={[styles.contentArea, { backgroundColor: colors.white }]}>
        {/* Dot progress */}
        <View style={styles.dotsRow}>
          {slides.map((s, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === step
                  ? [styles.dotActive, { backgroundColor: slide.accent, width: 28 }]
                  : [styles.dotInactive, { backgroundColor: s.dotColor + '30' }],
              ]}
            />
          ))}
        </View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={[styles.title, { color: colors.black }]}>{slide.title}</Text>
          <Text style={styles.desc}>{slide.desc}</Text>
        </Animated.View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 32 }}>
          {step > 0 && (
            <TouchableOpacity
              style={[styles.backBtn, { borderColor: slide.accent + '40' }]}
              onPress={handleBack}
            >
              <Ionicons name="arrow-back" size={20} color={slide.accent} />
            </TouchableOpacity>
          )}
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={[styles.nextBtn, { backgroundColor: slide.accent }]}
              onPress={handleNext}
              activeOpacity={0.85}
            >
              <Text style={styles.nextBtnText}>
                {step < slides.length - 1 ? 'Continue' : 'Get Started'}
              </Text>
              {step < slides.length - 1 && (
                <Ionicons name="arrow-forward" size={18} color={colors.white} style={{ marginLeft: 8 }} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  illustrationArea: {
    height: H * 0.52,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  skipBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 56 : 20, right: 24,
    paddingVertical: 8, paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: radius.full,
    borderWidth: 1, borderColor: 'rgba(0,0,0,0.08)',
  },
  skipText: { fontSize: 13, fontWeight: '700' },

  stepNumber: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 48 : 14, left: 20,
    fontSize: 96, fontWeight: '900',
    letterSpacing: -6,
    lineHeight: 100,
  },

  mandalaRing: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    position: 'absolute',
  },

  emojiCircle: {
    width: 130, height: 130, borderRadius: 65,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 3,
    ...shadow.lg,
    zIndex: 2,
  },
  emojiText: {
    fontSize: 64,
    textAlign: 'center',
  },

  floatDot: {
    position: 'absolute',
    borderRadius: 999,
  },

  contentArea: {
    flex: 1,
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: Platform.OS === 'ios' ? 40 : 28,
    ...shadow.xl,
  },

  dotsRow: { flexDirection: 'row', gap: 6, marginBottom: 24 },
  dot: { height: 5, borderRadius: 3 },
  dotActive: { width: 28 },
  dotInactive: { width: 8 },

  title: {
    fontSize: 30, fontWeight: '900',
    letterSpacing: -0.8, lineHeight: 38, marginBottom: 12,
  },
  desc: { fontSize: 15, lineHeight: 24, color: colors.gray500 },

  backBtn: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: colors.gray100,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5,
  },

  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  nextBtnText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
