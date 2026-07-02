import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRide } from '../../context/RideContext';
import { colors, radius, shadow } from '../../theme';
import { Stars } from '../../components/SharedComponents';

export default function History({ navigation }) {
  const { history } = useRide();
  const [filter, setFilter] = useState('All');

  const riderHistory = history.filter(r => r.status !== 'active');
  const totalRides = riderHistory.length;
  const totalSpent = riderHistory.filter(r => r.status === 'completed').reduce((s, r) => s + r.fare, 0);
  const ratingRides = riderHistory.filter(r => r.rating);
  const avgRating = ratingRides.length > 0
    ? (ratingRides.reduce((s, r) => s + r.rating, 0) / ratingRides.length).toFixed(1)
    : '5.0';

  const filteredRides = riderHistory.filter(r => {
    if (filter === 'All') return true;
    return r.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.pink} />

      {/* Pink header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Rides</Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { iconName: 'bicycle',        val: totalRides,     lbl: 'Total Rides' },
            { iconName: 'card',           val: `Rs.${totalSpent}`, lbl: 'Total Spent' },
            { iconName: 'star',           val: avgRating,      lbl: 'Avg Rating' },
          ].map((s, i) => (
            <View key={i} style={styles.statBox}>
              <View style={styles.statIconBox}>
                <Ionicons name={s.iconName} size={16} color={colors.black} />
              </View>
              <Text style={styles.statVal}>{s.val}</Text>
              <Text style={styles.statLbl}>{s.lbl}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Filter tabs */}
      <View style={styles.filterBar}>
        {['All', 'Completed', 'Cancelled'].map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, filter === f && styles.filterTabActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterTabText, filter === f && styles.filterTabTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {filteredRides.map(ride => (
          <View key={ride.id} style={styles.rideCard}>
            <View style={styles.rideCardTop}>
              <Text style={styles.rideDate}>{ride.date} · {ride.time}</Text>
              <View style={[
                styles.statusPill,
                { backgroundColor: ride.status === 'completed' ? colors.pink : colors.gray100 }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: colors.black }
                ]}>
                  {ride.status === 'completed' ? 'Completed' : 'Cancelled'}
                </Text>
              </View>
            </View>

            {/* Route */}
            <View style={styles.routeRow}>
              <View style={styles.routeVis}>
                <View style={styles.rDotA} />
                <View style={styles.rLine} />
                <View style={styles.rDotB} />
              </View>
              <View style={{ flex: 1, gap: 8 }}>
                <Text numberOfLines={1} style={styles.addrText}>{ride.pickup}</Text>
                <Text numberOfLines={1} style={styles.addrText}>{ride.drop}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.fareText}>Rs.{ride.fare}</Text>
                <Text style={styles.distText}>{ride.distance}</Text>
              </View>
            </View>

            {ride.rating && (
              <View style={styles.ratingRow}>
                <Stars value={ride.rating} />
                <Text style={styles.ratingText}>You rated {ride.rating} star</Text>
              </View>
            )}
          </View>
        ))}

        {filteredRides.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconBox}>
              <Ionicons name="bicycle" size={36} color={colors.black} />
            </View>
            <Text style={styles.emptyTitle}>No rides found</Text>
            <Text style={styles.emptySub}>Try looking under a different filter.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.gray100 },

  header: {
    backgroundColor: colors.white,
    paddingTop: Platform.OS === 'ios' ? 56 : 32,
    paddingHorizontal: 20, paddingBottom: 24,
    borderBottomWidth: 1, borderColor: colors.gray200,
  },
  headerTitle: { fontSize: 22, fontWeight: '900', color: colors.black, letterSpacing: -0.5, marginBottom: 20 },

  statsRow: { flexDirection: 'row', gap: 10 },
  statBox: {
    flex: 1, alignItems: 'center',
    backgroundColor: colors.gray50,
    borderRadius: radius.lg, paddingVertical: 14,
    borderWidth: 1, borderColor: colors.gray200,
  },
  statIconBox: {
    width: 32, height: 32, borderRadius: radius.sm,
    backgroundColor: colors.gray200,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  statVal: { fontSize: 18, fontWeight: '900', color: colors.black },
  statLbl: { fontSize: 9, color: colors.gray500, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2 },

  filterBar: {
    flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 14,
    gap: 8, backgroundColor: colors.white,
    borderBottomWidth: 1, borderColor: colors.gray200,
  },
  filterTab: {
    paddingHorizontal: 16, paddingVertical: 7,
    borderRadius: radius.sm, backgroundColor: colors.gray100,
    borderWidth: 1, borderColor: colors.gray200,
  },
  filterTabActive: { backgroundColor: colors.black, borderColor: colors.black },
  filterTabText: { fontSize: 13, fontWeight: '700', color: colors.gray500 },
  filterTabTextActive: { color: colors.white },

  content: { padding: 16, paddingBottom: 80, gap: 10 },

  rideCard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl, padding: 16,
    borderWidth: 1, borderColor: colors.gray200,
  },
  rideCardTop: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 14,
  },
  rideDate: { fontSize: 12, color: colors.gray400, fontWeight: '500' },
  statusPill: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 4 },
  statusText: { fontSize: 11, fontWeight: '700' },

  routeRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  routeVis: { alignItems: 'center', justifyContent: 'space-between', paddingVertical: 3 },
  rDotA: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.black },
  rLine: { width: 1.5, height: 20, backgroundColor: colors.gray200 },
  rDotB: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.pink, borderWidth: 2, borderColor: colors.black },
  addrText: { fontSize: 13, fontWeight: '600', color: colors.black },
  fareText: { fontSize: 18, fontWeight: '900', color: colors.black, letterSpacing: -0.3 },
  distText: { fontSize: 11, color: colors.gray400, marginTop: 2 },

  ratingRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginTop: 12, paddingTop: 12,
    borderTopWidth: 1, borderColor: colors.gray100,
  },
  ratingText: { fontSize: 12, color: colors.gray500 },

  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyIconBox: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: colors.pink,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: colors.black, marginBottom: 8 },
  emptySub: { color: colors.gray400, fontSize: 14 },
});
