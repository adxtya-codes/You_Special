import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { colors, radius, typography } from '../../theme';
import { GlassCard, Badge } from '../../components/SharedComponents';
import { aiInsights } from '../../data/mockData';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function AI({ navigation }) {
  const { demandZones, driverScores, suspiciousPatterns, summary } = aiInsights;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[typography.headingLg, { color: 'white', fontSize: 20 }]}>AI Insights 🤖</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* AI Summary Card */}
        <LinearGradient
          colors={['rgba(107,33,168,.3)', 'rgba(244,63,94,.15)']}
          style={styles.aiSummaryCard}
        >
          <View style={styles.summaryCircle} />
          <View style={styles.summaryHeader}>
            <View style={styles.botIcon}>
              <Text style={{ fontSize: 22 }}>🤖</Text>
            </View>
            <View>
              <Text style={{ fontWeight: '700', fontSize: 14, color: 'white' }}>AI Daily Summary</Text>
              <Text style={{ fontSize: 11, color: colors.purple300 }}>
                Generated automatically · Updated hourly
              </Text>
            </View>
          </View>
          <Text style={styles.summaryText}>{summary}</Text>
        </LinearGradient>

        {/* Demand Heatmap */}
        <GlassCard style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={{ fontSize: 22 }}>🌡️</Text>
            <View>
              <Text style={{ fontWeight: '700', fontSize: 15, color: 'white' }}>Demand Heatmap</Text>
              <Text style={{ fontSize: 11, color: colors.gray400 }}>Real-time ride demand by zone</Text>
            </View>
          </View>

          <View style={{ gap: 12, marginTop: 10 }}>
            {demandZones.map((z, i) => (
              <View key={i}>
                <View style={styles.demandLabelRow}>
                  <Text style={{ fontWeight: '600', color: 'white', fontSize: 13 }}>{z.zone}</Text>
                  <Text style={{
                    color: z.level === 'high' ? '#f87171' : z.level === 'medium' ? '#fbbf24' : '#34d399',
                    fontWeight: '700',
                    fontSize: 12
                  }}>
                    {z.demand}% demand · {z.drivers} drivers
                  </Text>
                </View>
                <View style={styles.demandBarBg}>
                  <LinearGradient
                    colors={
                      z.level === 'high'
                        ? ['#dc2626', '#f87171']
                        : z.level === 'medium'
                        ? ['#d97706', '#fbbf24']
                        : ['#059669', '#34d399']
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.demandBarFill, { width: `${z.demand}%` }]}
                  />
                </View>
              </View>
            ))}
          </View>

          <View style={styles.legendRow}>
            {[['🔴 High Demand', '#f87171'], ['🟡 Medium', '#fbbf24'], ['🟢 Low', '#34d399']].map(([l, c]) => (
              <Text key={l} style={{ color: c, fontWeight: '600', fontSize: 11 }}>
                {l}
              </Text>
            ))}
          </View>
        </GlassCard>

        {/* AI Driver Matching */}
        <GlassCard style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={{ fontSize: 22 }}>🎯</Text>
            <View>
              <Text style={{ fontWeight: '700', fontSize: 15, color: 'white' }}>AI Driver Matching</Text>
              <Text style={{ fontSize: 11, color: colors.gray400 }}>Best driver assignments for next booking</Text>
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            {driverScores.map((d, i) => (
              <View key={i} style={[styles.driverScoreItem, i < driverScores.length - 1 ? styles.itemBorder : null]}>
                <LinearGradient
                  colors={i === 0 ? [colors.purple800, colors.pink500] : ['rgba(255,255,255,.1)', 'rgba(255,255,255,.05)']}
                  style={styles.rankNum}
                >
                  <Text style={{ color: 'white', fontWeight: '800', fontSize: 15 }}>{i + 1}</Text>
                </LinearGradient>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: '700', fontSize: 14, color: 'white' }}>{d.driver}</Text>
                  <Text style={{ fontSize: 11, color: colors.gray400 }}>{d.reason}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontWeight: '800', fontSize: 20, color: i === 0 ? '#34d399' : colors.purple400 }}>
                    {d.score}
                  </Text>
                  <Text style={{ fontSize: 10, color: colors.gray500 }}>AI Score</Text>
                </View>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Suspicious Patterns */}
        <GlassCard style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={{ fontSize: 22 }}>🔍</Text>
            <View>
              <Text style={{ fontWeight: '700', fontSize: 15, color: 'white' }}>Suspicious Patterns</Text>
              <Text style={{ fontSize: 11, color: colors.gray400 }}>AI flagged anomalies for review</Text>
            </View>
          </View>

          <View style={{ gap: 10, marginTop: 12 }}>
            {suspiciousPatterns.map((p, i) => (
              <View
                key={i}
                style={[
                  styles.patternCard,
                  {
                    backgroundColor: p.risk === 'high' ? 'rgba(239,68,68,.08)' : 'rgba(245,158,11,.08)',
                    borderColor: p.risk === 'high' ? 'rgba(239,68,68,.25)' : 'rgba(245,158,11,.25)'
                  }
                ]}
              >
                <View style={styles.patternHeader}>
                  <Text style={{ fontWeight: '700', fontSize: 13, color: 'white' }}>
                    Ride #{p.rideId.toUpperCase()}
                  </Text>
                  <Text style={{
                    fontSize: 11,
                    fontWeight: '700',
                    color: p.risk === 'high' ? '#f87171' : '#fbbf24',
                    textTransform: 'uppercase'
                  }}>
                    {p.risk === 'high' ? '🔴' : '🟡'} {p.risk} risk
                  </Text>
                </View>
                <Text style={{ fontSize: 12, color: colors.gray300, lineHeight: 17, marginBottom: 10 }}>
                  {p.reason}
                </Text>
                <TouchableOpacity style={styles.reviewBtn}>
                  <Text style={styles.reviewBtnText}>Review & Act</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </GlassCard>
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
    padding: 20,
    paddingBottom: 80,
  },
  aiSummaryCard: {
    borderWidth: 1,
    borderColor: 'rgba(168,85,247,.3)',
    borderRadius: radius.xl,
    padding: 20,
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  summaryCircle: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(168,85,247,.1)',
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  botIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: 'rgba(168,85,247,.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryText: {
    fontSize: 14,
    color: colors.gray200,
    lineHeight: 22,
  },
  card: {
    padding: 20,
    marginBottom: 20,
    borderRadius: radius.xl,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  demandLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  demandBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,.1)',
    borderRadius: 99,
    overflow: 'hidden',
  },
  demandBarFill: {
    height: '100%',
    borderRadius: 99,
  },
  legendRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 14,
  },
  driverScoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 12,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,.07)',
  },
  rankNum: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  patternCard: {
    padding: 14,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  patternHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  reviewBtn: {
    backgroundColor: colors.danger,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.md,
  },
  reviewBtnText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
  },
});
