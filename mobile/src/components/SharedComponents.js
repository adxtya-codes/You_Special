import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow, glassCard } from '../theme';

// ── Avatar ──
export function Avatar({ user, size = 48 }) {
  const initials = user?.initials || user?.name?.slice(0, 2).toUpperCase() || '??';
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.avatarText, { fontSize: size * 0.36 }]}>{initials}</Text>
    </View>
  );
}

// ── Badge ──
export function Badge({ variant = 'default', label }) {
  const isVerified = variant === 'verified' || variant === 'active';
  return (
    <View style={[styles.badge, isVerified && styles.badgeVerified]}>
      <Text style={[styles.badgeText, isVerified && styles.badgeTextVerified]}>{label}</Text>
    </View>
  );
}

// ── Stars ──
export function Stars({ value = 5 }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Ionicons
          key={i}
          name="star"
          size={13}
          color={i < Math.round(value) ? colors.black : colors.gray300}
        />
      ))}
    </View>
  );
}

// ── GlassCard (clean white card) ──
export function GlassCard({ children, style, onPress }) {
  const C = onPress ? TouchableOpacity : View;
  return (
    <C style={[glassCard, style]} onPress={onPress} activeOpacity={0.85}>
      {children}
    </C>
  );
}

// ── PrimaryButton — Black filled ──
export function PrimaryButton({ label, onPress, disabled, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[styles.primaryBtn, disabled && styles.primaryBtnDisabled, style]}
    >
      <Text style={[styles.primaryBtnText, disabled && styles.primaryBtnTextDisabled]}>{label}</Text>
    </TouchableOpacity>
  );
}

// ── SecondaryButton — White with black border ──
export function SecondaryButton({ label, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.secBtn, style]}>
      <Text style={styles.secBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

// ── DangerButton — Black ──
export function DangerButton({ label, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.primaryBtn, style]}>
      <Text style={styles.primaryBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

// ── SuccessButton ──
export function SuccessButton({ label, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.primaryBtn, style]}>
      <Text style={styles.primaryBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

// ── Toggle Group ── Pill switcher
export function ToggleGroup({ options, value, onChange }) {
  return (
    <View style={styles.toggleGroup}>
      {options.map(opt => (
        <TouchableOpacity
          key={opt.value}
          onPress={() => onChange(opt.value)}
          activeOpacity={0.85}
          style={[
            styles.toggleBtn,
            value === opt.value ? styles.toggleActive : styles.toggleInactive,
          ]}
        >
          <Text style={[
            styles.toggleText,
            { color: value === opt.value ? colors.white : colors.gray500 },
          ]}>
            {opt.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ── Section Header ──
export function SectionHeader({ title, onAction, actionLabel }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {onAction && (
        <TouchableOpacity onPress={onAction}>
          <Text style={styles.sectionAction}>{actionLabel || 'See all'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ── Divider ──
export function Divider() {
  return <View style={{ height: 1, backgroundColor: colors.gray200, marginVertical: 12 }} />;
}

// ── Stat Card ──
export function StatCard({ icon, iconName, label, value, change, up }) {
  return (
    <View style={styles.statCard}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <View style={styles.statIconBox}>
          {iconName
            ? <Ionicons name={iconName} size={18} color={colors.black} />
            : <Text style={{ fontSize: 18 }}>{icon}</Text>
          }
        </View>
        {change && (
          <View style={styles.statChangeBadge}>
            <Text style={styles.statChangeText}>{up ? '+' : '-'}{change}</Text>
          </View>
        )}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // Avatar
  avatar: {
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.gray100,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  avatarText: { color: colors.black, fontWeight: '800' },

  // Badge
  badge: {
    borderRadius: 4,
    paddingHorizontal: 8, paddingVertical: 3,
    borderWidth: 1, borderColor: colors.gray200,
    backgroundColor: colors.gray100,
    alignSelf: 'flex-start',
  },
  badgeVerified: {
    backgroundColor: colors.pink,
    borderColor: colors.pinkMid,
  },
  badgeText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, color: colors.gray500 },
  badgeTextVerified: { color: colors.black },

  // Buttons
  primaryBtn: {
    backgroundColor: colors.black,
    borderRadius: radius.md,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnDisabled: { backgroundColor: colors.gray300 },
  primaryBtnText: { color: colors.white, fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
  primaryBtnTextDisabled: { color: colors.gray400 },

  secBtn: {
    borderRadius: radius.md,
    borderWidth: 1.5, borderColor: colors.gray300,
    paddingVertical: 14, paddingHorizontal: 24,
    alignItems: 'center', backgroundColor: colors.white,
  },
  secBtnText: { color: colors.black, fontSize: 14, fontWeight: '600' },

  // Toggle
  toggleGroup: {
    flexDirection: 'row',
    backgroundColor: colors.gray100,
    borderRadius: radius.md,
    padding: 3, gap: 3,
    borderWidth: 1, borderColor: colors.gray200,
  },
  toggleBtn: {
    flex: 1, borderRadius: radius.sm,
    paddingVertical: 11, alignItems: 'center',
  },
  toggleActive: { backgroundColor: colors.black },
  toggleInactive: { backgroundColor: 'transparent' },
  toggleText: { fontSize: 14, fontWeight: '700' },

  // Section Header
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.black, letterSpacing: -0.2 },
  sectionAction: { fontSize: 13, color: colors.gray500, fontWeight: '600' },

  // Stat Card
  statCard: {
    padding: 16,
    borderRadius: radius.lg,
    backgroundColor: colors.white,
    borderWidth: 1, borderColor: colors.gray200,
  },
  statIconBox: {
    width: 36, height: 36, borderRadius: radius.sm,
    backgroundColor: colors.pink,
    alignItems: 'center', justifyContent: 'center',
  },
  statChangeBadge: {
    backgroundColor: colors.pink,
    paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: 4,
  },
  statChangeText: { fontSize: 10, fontWeight: '700', color: colors.black },
  statValue: { fontSize: 24, fontWeight: '800', color: colors.black, letterSpacing: -0.5 },
  statLabel: { fontSize: 11, fontWeight: '600', color: colors.gray500, marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 },
});
