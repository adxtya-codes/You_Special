import React, { useEffect, useRef } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity,
  Dimensions, StatusBar, Platform, Animated, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme';
import { PrimaryButton } from '../components/SharedComponents';

const { height: H } = Dimensions.get('window');

const features = [
  { iconName: 'shield-checkmark', title: 'Women-only drivers', desc: 'Every ride matched to a verified female driver', color: '#22C55E', bgColor: '#DCFCE7' },
  { iconName: 'location',         title: 'Live GPS tracking',  desc: 'Real-time location shared with your contacts',  color: '#6C63FF', bgColor: '#EEF0FF' },
  { iconName: 'alert-circle',     title: 'One-tap SOS',        desc: 'Instantly alerts your family and safety team',   color: '#EF4444', bgColor: '#FEE2E2' },
];

const trustItems = ['ID Verified', 'Background Checked', '24/7 Support'];

export default function Landing({ navigation }) {
  const fade   = useRef(new Animated.Value(0)).current;
  const slideY = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade,   { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideY, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />

      {/* Black hero */}
      <View style={styles.hero}>
        <Animated.View style={{ opacity: fade, transform: [{ translateY: slideY }] }}>

          {/* Brand row */}
          <View style={styles.brandRow}>
            <View style={styles.logoBox}>
              <Image
                source={require('../../assets/logo.png')}
                style={{ width: 34, height: 34, borderRadius: 8 }}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.brandName}>You Special</Text>
          </View>

          {/* Badge above headline */}
          <View style={styles.heroBadge}>
            <View style={styles.heroBadgeDot} />
            <Text style={styles.heroBadgeText}>India's first women-only ride service</Text>
          </View>

          <Text style={styles.heroTagline}>Safe rides for{'\n'}women.</Text>
          <Text style={styles.heroSub}>By women, for women</Text>

          {/* Pink accent line */}
          <View style={styles.accentLine} />

          <Text style={styles.heroCaption}>
            Every driver is verified. Every ride is tracked.{'\n'}Your safety is never optional.
          </Text>

        </Animated.View>
      </View>

      {/* White panel */}
      <View style={styles.panel}>

        {/* Section label */}
        <Text style={styles.panelLabel}>Why You Special</Text>

        <View style={styles.featureList}>
          {features.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <View style={[styles.featureIconBox, { backgroundColor: f.bgColor }]}>
                <Ionicons name={f.iconName} size={19} color={f.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Trust strip */}
        <View style={styles.trustStrip}>
          {trustItems.map((t, i) => (
            <View key={i} style={styles.trustItem}>
              <Ionicons name="checkmark-circle" size={12} color="#22C55E" />
              <Text style={styles.trustText}>{t}</Text>
            </View>
          ))}
        </View>

        <PrimaryButton label="Get Started" onPress={() => navigation.navigate('Onboarding')} style={{ marginBottom: 12, marginTop: 4 }} />

        <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('Login')} activeOpacity={0.7}>
          <Text style={styles.loginBtnText}>Already have an account? <Text style={{ fontWeight: '800', color: colors.black }}>Log in</Text></Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AdminLogin')} style={styles.adminLink} activeOpacity={0.6}>
          <Text style={styles.adminLinkText}>Admin Access</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },

  hero: {
    height: H * 0.52,
    paddingHorizontal: 28,
    paddingTop: Platform.OS === 'ios' ? 68 : 48,
    paddingBottom: 40,
    justifyContent: 'flex-end',
  },

  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  logoBox: {
    width: 46, height: 46, borderRadius: radius.md,
    backgroundColor: colors.pink,
    alignItems: 'center', justifyContent: 'center',
  },
  brandName: { fontSize: 24, fontWeight: '900', color: colors.white, letterSpacing: -0.3 },

  heroBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 7,
    marginBottom: 14,
  },
  heroBadgeDot: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: colors.pink,
  },
  heroBadgeText: {
    fontSize: 11,
    color: 'rgba(255,212,233,0.6)',
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },

  heroTagline: {
    fontSize: 40, fontWeight: '900', color: colors.white,
    letterSpacing: -1, lineHeight: 46, marginBottom: 10,
  },
  heroSub: {
    fontSize: 15,
    color: 'rgba(255,212,233,0.55)',
    fontWeight: '500',
    marginBottom: 20,
  },

  accentLine: {
    width: 36, height: 2.5,
    backgroundColor: colors.pink,
    borderRadius: 2,
    marginBottom: 16,
    opacity: 0.7,
  },

  heroCaption: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.28)',
    lineHeight: 20,
    fontWeight: '400',
  },

  panel: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    paddingHorizontal: 24, paddingTop: 24, paddingBottom: 20,
    ...shadow.xl,
  },

  panelLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.gray400,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 14,
  },

  featureList: { marginBottom: 16, gap: 0 },
  featureRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 14, paddingVertical: 13,
    borderBottomWidth: 1, borderColor: colors.gray100,
  },
  featureIconBox: {
    width: 38, height: 38, borderRadius: radius.md,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  featureTitle: { fontSize: 14, fontWeight: '700', color: colors.black, marginBottom: 2 },
  featureDesc: { fontSize: 12, color: colors.gray400, lineHeight: 17 },

  trustStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    marginBottom: 4,
  },
  trustItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  trustText: { fontSize: 11, color: colors.gray500, fontWeight: '600' },

  loginBtn: { paddingVertical: 12, alignItems: 'center' },
  loginBtnText: { fontSize: 14, color: colors.gray400 },
  adminLink: { alignSelf: 'center', marginTop: 4, padding: 8 },
  adminLinkText: { fontSize: 11, color: colors.gray300, fontWeight: '600', letterSpacing: 0.3 },
});
