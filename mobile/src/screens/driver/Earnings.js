import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { mockEarnings } from '../../data/mockData';
import { colors, radius, typography } from '../../theme';
import { GlassCard, PrimaryButton } from '../../components/SharedComponents';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Earnings({ navigation }) {
  const total = mockEarnings.reduce((s, d) => s + d.amount, 0);
  const maxVal = Math.max(...mockEarnings.map(d => d.amount));
  const today = mockEarnings[mockEarnings.length - 1];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[typography.headingLg, { color: 'white', fontSize: 20 }]}>My Earnings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Hero Card */}
        <LinearGradient
          colors={[colors.purple800, colors.pink500]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroCard}
        >
          <View style={styles.heroCircle1} />
          <View style={styles.heroCircle2} />
          <Text style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', marginBottom: 4 }}>
            This Week's Total
          </Text>
          <Text style={{ fontSize: 44, fontWeight: '800', color: 'white' }}>
            ₹{total.toLocaleString()}
          </Text>
          <Text style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', marginTop: 4 }}>
            Avg ₹{Math.round(total / 7)}/day · 7 days
          </Text>
        </LinearGradient>

        {/* Stats Row */}
        <View style={styles.statsGrid}>
          {[
            { label: "Today's Earnings", value: `₹${today.amount}`, icon: '📅', color: '#34d399' },
            { label: 'Pending Payout', value: '₹12,400', icon: '💳', color: '#fbbf24' },
          ].map((s, i) => (
            <GlassCard key={i} style={styles.statBox}>
              <Text style={{ fontSize: 26, marginBottom: 6 }}>{s.icon}</Text>
              <Text style={{ fontWeight: '800', fontSize: 20, color: s.color }}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </GlassCard>
          ))}
        </View>

        {/* Weekly Bar Chart */}
        <GlassCard style={styles.chartCard}>
          <Text style={{ fontWeight: '700', fontSize: 15, color: 'white', marginBottom: 16 }}>
            Daily Earnings (This Week)
          </Text>
          <View style={styles.chartArea}>
            {mockEarnings.map((d, i) => {
              // Map heights to max 100px
              const barHeight = Math.round((d.amount / maxVal) * 80);
              const isToday = i === mockEarnings.length - 1;
              return (
                <View key={i} style={styles.chartCol}>
                  <Text style={styles.barVal}>₹{d.amount}</Text>
                  <LinearGradient
                    colors={isToday ? [colors.success, '#059669'] : [colors.purple500, colors.purple700]}
                    style={[styles.chartBar, { height: barHeight }]}
                  />
                  <Text style={styles.barDay}>{d.day}</Text>
                </View>
              );
            })}
          </View>
        </GlassCard>

        {/* Payout History */}
        <GlassCard style={styles.payoutCard}>
          <Text style={{ fontWeight: '700', fontSize: 15, color: 'white', marginBottom: 14 }}>
            💳 Payout History
          </Text>
          {[
            { date: 'Jun 20, 2024', amount: 4200, mode: 'UPI' },
            { date: 'Jun 13, 2024', amount: 5800, mode: 'Bank' },
            { date: 'Jun 06, 2024', amount: 3600, mode: 'UPI' },
          ].map((p, i) => (
            <View key={i} style={[styles.payoutItem, i < 2 ? styles.payoutItemBorder : null]}>
              <View>
                <Text style={{ fontWeight: '600', fontSize: 14, color: 'white' }}>
                  ₹{p.amount.toLocaleString()}
                </Text>
                <Text style={{ fontSize: 12, color: colors.gray400 }}>
                  {p.date} · via {p.mode}
                </Text>
              </View>
              <View style={styles.paidBadge}>
                <Text style={styles.paidBadgeText}>Paid ✓</Text>
              </View>
            </View>
          ))}
        </GlassCard>

        <PrimaryButton label="Request Payout" onPress={() => {}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgDark,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 80,
  },
  heroCard: {
    borderRadius: radius.xl,
    padding: 24,
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  heroCircle1: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,.1)',
  },
  heroCircle2: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,.05)',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    padding: 18,
    borderRadius: radius.lg,
  },
  statLabel: {
    fontSize: 10,
    color: colors.gray400,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 4,
  },
  chartCard: {
    padding: 20,
    marginBottom: 20,
    borderRadius: radius.xl,
  },
  chartArea: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'flex-end',
    height: 140,
  },
  chartCol: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  barVal: {
    fontSize: 8,
    color: colors.gray400,
    fontWeight: '600',
  },
  chartBar: {
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    minHeight: 5,
  },
  barDay: {
    fontSize: 11,
    color: colors.gray500,
    fontWeight: '600',
  },
  payoutCard: {
    padding: 20,
    borderRadius: radius.xl,
    marginBottom: 20,
  },
  payoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  payoutItemBorder: {
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,.07)',
  },
  paidBadge: {
    backgroundColor: 'rgba(16,185,129,.15)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  paidBadgeText: {
    color: '#34d399',
    fontSize: 11,
    fontWeight: '700',
  },
});
