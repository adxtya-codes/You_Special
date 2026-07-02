import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { colors, radius, typography } from '../../theme';
import { GlassCard, Badge, ToggleGroup } from '../../components/SharedComponents';
import { mockComplaints, mockSafetyAlerts } from '../../data/mockData';

export default function Safety({ navigation }) {
  const [tab, setTab] = useState('alerts');
  const [alerts, setAlerts] = useState(mockSafetyAlerts);
  const [complaints, setComplaints] = useState(mockComplaints);

  const resolveAlert = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'resolved' } : a));
  };

  const resolveComplaint = (id) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'resolved' } : c));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[typography.headingLg, { color: 'white', fontSize: 20 }]}>Safety & SOS Desk</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Alerts / Complaints Toggles */}
        <View style={{ marginBottom: 16 }}>
          <ToggleGroup
            options={[
              { label: `🆘 Alerts (${alerts.length})`, value: 'alerts' },
              { label: `📋 Complaints (${complaints.length})`, value: 'complaints' }
            ]}
            value={tab}
            onChange={setTab}
          />
        </View>

        {tab === 'alerts' && (
          <View style={styles.tabContent}>
            {/* Horizontal Sub-stats */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subStats}>
              {[
                { label: 'SOS Triggered', val: alerts.filter(a => a.type === 'SOS').length, color: '#f87171' },
                { label: 'Route Deviation', val: alerts.filter(a => a.type === 'Route Deviation').length, color: '#fbbf24' },
                { label: 'Monitoring', val: alerts.filter(a => a.status === 'monitoring').length, color: colors.purple400 },
              ].map((s, i) => (
                <View key={i} style={[styles.subStatBox, { borderColor: `${s.color}30` }]}>
                  <Text style={{ fontWeight: '800', fontSize: 20, color: s.color }}>{s.val}</Text>
                  <Text style={{ fontSize: 9, color: colors.gray400, textTransform: 'uppercase' }}>{s.label}</Text>
                </View>
              ))}
            </ScrollView>

            {/* Alerts List */}
            {alerts.map((a, i) => (
              <GlassCard
                key={i}
                style={[
                  styles.alertCard,
                  { borderLeftColor: a.type === 'SOS' ? '#f87171' : a.status === 'monitoring' ? '#fbbf24' : '#34d399' }
                ]}
              >
                <View style={styles.cardHeader}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Text style={{ fontSize: 24 }}>
                      {a.type === 'SOS' ? '🆘' : a.type === 'Route Deviation' ? '⚠️' : '⏸️'}
                    </Text>
                    <View>
                      <Text style={{ fontWeight: '700', fontSize: 14, color: 'white' }}>{a.type}</Text>
                      <Text style={{ fontSize: 11, color: colors.gray400 }}>{a.date} · {a.time}</Text>
                    </View>
                  </View>
                  <Badge
                    variant={a.status === 'resolved' ? 'success' : 'warning'}
                    label={a.status}
                  />
                </View>

                <Text style={styles.cardDetailText}>{a.details}</Text>

                <View style={styles.cardMetadata}>
                  <Text style={styles.metadataText}>👩 Rider: {a.rider}</Text>
                  <Text style={styles.metadataText}>🏍️ Driver: {a.driver}</Text>
                  <Text style={styles.metadataText}>📍 Location: {a.location}</Text>
                </View>

                {a.status !== 'resolved' ? (
                  <View style={styles.actionsRow}>
                    <TouchableOpacity style={styles.callBtn}>
                      <Text style={styles.callBtnText}>Call Rider</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.resolveBtn} onPress={() => resolveAlert(a.id)}>
                      <Text style={styles.resolveBtnText}>Mark Resolved</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </GlassCard>
            ))}
          </View>
        )}

        {tab === 'complaints' && (
          <View style={styles.tabContent}>
            {/* Complaints List */}
            {complaints.map((c, i) => (
              <GlassCard
                key={i}
                style={[
                  styles.alertCard,
                  { borderLeftColor: c.severity === 'high' ? '#f87171' : c.severity === 'medium' ? '#fbbf24' : '#a78bfa' }
                ]}
              >
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={{ fontWeight: '700', fontSize: 14, color: 'white' }}>{c.type}</Text>
                    <Text style={{ fontSize: 11, color: colors.gray400, marginTop: 2 }}>
                      Ride #{c.rideId.toUpperCase()} · {c.date}
                    </Text>
                  </View>
                  <View style={{ alignItems: 'flex-end', gap: 4 }}>
                    <Badge
                      variant={c.severity === 'high' ? 'danger' : c.severity === 'medium' ? 'warning' : 'purple'}
                      label={c.severity}
                    />
                    <Badge
                      variant={c.status === 'resolved' ? 'success' : 'warning'}
                      label={c.status}
                    />
                  </View>
                </View>

                <View style={styles.complaintPeople}>
                  <Text style={styles.metadataText}>
                    Filed by: <Text style={{ color: 'white', fontWeight: '700' }}>{c.reporter}</Text>
                  </Text>
                  <Text style={styles.metadataText}>
                    Against: <Text style={{ color: 'white', fontWeight: '700' }}>{c.against}</Text>
                  </Text>
                </View>

                <Text style={styles.cardDetailText}>{c.description}</Text>

                {c.status !== 'resolved' ? (
                  <View style={styles.actionsRow}>
                    <TouchableOpacity style={styles.callBtn}>
                      <Text style={styles.callBtnText}>Investigate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.resolveBtn} onPress={() => resolveComplaint(c.id)}>
                      <Text style={styles.resolveBtnText}>Resolve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.suspendDriverBtn}>
                      <Text style={styles.suspendDriverBtnText}>Suspend Driver</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </GlassCard>
            ))}
          </View>
        )}
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
  tabContent: {
    gap: 12,
  },
  subStats: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  subStatBox: {
    backgroundColor: 'rgba(255,255,255,.06)',
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    minWidth: 110,
  },
  alertCard: {
    padding: 16,
    borderRadius: radius.lg,
    borderLeftWidth: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  cardDetailText: {
    fontSize: 13,
    color: colors.gray300,
    lineHeight: 18,
    marginBottom: 8,
  },
  cardMetadata: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    fontSize: 11,
    color: colors.gray400,
    marginBottom: 12,
  },
  metadataText: {
    fontSize: 11,
    color: colors.gray450 || colors.gray400,
    marginRight: 10,
  },
  complaintPeople: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  callBtn: {
    backgroundColor: colors.danger,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.md,
  },
  callBtnText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
  },
  resolveBtn: {
    backgroundColor: colors.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.md,
  },
  resolveBtnText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
  },
  suspendDriverBtn: {
    backgroundColor: 'rgba(239,68,68,.1)',
    borderColor: 'rgba(239,68,68,.2)',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radius.md,
  },
  suspendDriverBtnText: {
    color: '#f87171',
    fontSize: 11,
    fontWeight: '700',
  },
});
