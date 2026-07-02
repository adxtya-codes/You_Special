import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRide } from '../../context/RideContext';
import { colors, radius, shadow } from '../../theme';
import MapView from '../../components/MapView';
import SOSButton from '../../components/SOSButton';
import SOSModal from '../../components/SOSModal';
import TripShareModal from '../../components/TripShareModal';
import { PrimaryButton, SecondaryButton } from '../../components/SharedComponents';

const { height: H } = Dimensions.get('window');

export default function Tracking({ navigation }) {
  const { currentRide, completeRide } = useRide();
  const [showSOS, setShowSOS] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [routeAlert, setRouteAlert] = useState(true);

  const driver = currentRide?.driver || {
    name: 'Sunita Verma', initials: 'SV', rating: 4.9, rides: 312,
    vehicle: 'Honda Activa 6G', vehicleNo: 'MH-12-AB-3456', verified: true,
  };

  const handleCompleteRide = () => { completeRide(); navigation.navigate('RiderRate'); };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Map */}
      <View style={styles.mapArea}>
        <MapView type="tracking" />

        {/* Route deviation alert */}
        {routeAlert && (
          <View style={styles.alertBar}>
            <View style={styles.alertIconBox}>
              <Ionicons name="warning" size={16} color={colors.black} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.alertTitle}>Slight route deviation</Text>
              <Text style={styles.alertSub}>Driver took alternate road. Monitoring active.</Text>
            </View>
            <TouchableOpacity onPress={() => setRouteAlert(false)} style={styles.alertClose}>
              <Ionicons name="close" size={16} color={colors.black} />
            </TouchableOpacity>
          </View>
        )}

        {/* ETA strip */}
        <View style={styles.etaStrip}>
          {[
            { val: '8', lbl: 'MIN' },
            { val: '₹78', lbl: 'FARE' },
            { val: '3.2', lbl: 'KM LEFT' },
          ].map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <View style={styles.etaSep} />}
              <View style={styles.etaItem}>
                <Text style={styles.etaVal}>{item.val}</Text>
                <Text style={styles.etaLbl}>{item.lbl}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* Bottom panel */}
      <View style={styles.bottomPanel}>
        {/* Driver info */}
        <View style={styles.driverRow}>
          <View style={styles.driverAvatar}>
            <Text style={styles.driverAvatarText}>{driver.initials}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={styles.driverName}>{driver.name}</Text>
              <View style={styles.verifiedChip}>
                <Ionicons name="checkmark" size={10} color={colors.black} />
                <Text style={styles.verifiedChipText}>Verified</Text>
              </View>
            </View>
            <Text style={styles.driverVehicle}>{driver.vehicle} · {driver.vehicleNo}</Text>
            <Text style={styles.driverRating}>{driver.rating} star · {driver.rides} rides</Text>
          </View>
          <TouchableOpacity style={styles.callBtn}>
            <Ionicons name="call" size={18} color={colors.black} />
          </TouchableOpacity>
        </View>

        {/* Route card */}
        <View style={styles.routeCard}>
          <View style={styles.routeVis}>
            <View style={styles.rDotA} />
            <View style={styles.rLine} />
            <View style={styles.rDotB} />
          </View>
          <View style={{ flex: 1, gap: 10 }}>
            <Text numberOfLines={1} style={styles.routeStop}>{currentRide?.pickup || 'Koramangala 6th Block'}</Text>
            <Text numberOfLines={1} style={styles.routeStop}>{currentRide?.drop || 'MG Road Metro'}</Text>
          </View>
        </View>

        {/* Action buttons */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
          <View style={{ flex: 1 }}>
            <SecondaryButton label="Share Trip" onPress={() => setShowShare(true)} />
          </View>
          <View style={{ flex: 1 }}>
            <SecondaryButton label="Chat" onPress={() => {}} />
          </View>
        </View>

        <PrimaryButton label="Complete Ride" onPress={handleCompleteRide} />
      </View>

      <SOSButton onPress={() => setShowSOS(true)} />
      <SOSModal visible={showSOS} onClose={() => setShowSOS(false)} />
      <TripShareModal visible={showShare} onClose={() => setShowShare(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },

  mapArea: { flex: 1, position: 'relative' },

  alertBar: {
    position: 'absolute', top: Platform.OS === 'ios' ? 56 : 20,
    left: 16, right: 16,
    backgroundColor: colors.pink,
    borderRadius: radius.lg,
    paddingHorizontal: 14, paddingVertical: 12,
    flexDirection: 'row', alignItems: 'center', gap: 10,
    zIndex: 20,
    ...shadow.sm,
    borderWidth: 1, borderColor: colors.pinkMid,
  },
  alertIconBox: {
    width: 32, height: 32, borderRadius: radius.sm,
    backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center',
  },
  alertTitle: { fontWeight: '700', fontSize: 13, color: colors.black },
  alertSub: { fontSize: 11, color: colors.gray600, marginTop: 2 },
  alertClose: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.gray200,
  },

  etaStrip: {
    position: 'absolute', bottom: 16, alignSelf: 'center',
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.black,
    borderRadius: radius.full,
    paddingVertical: 12, paddingHorizontal: 28, gap: 20,
    ...shadow.lg,
  },
  etaSep: { width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.2)' },
  etaItem: { alignItems: 'center' },
  etaVal: { color: colors.white, fontSize: 20, fontWeight: '900' },
  etaLbl: { color: 'rgba(255,255,255,0.5)', fontSize: 9, letterSpacing: 1, marginTop: 1 },

  bottomPanel: {
    backgroundColor: colors.white,
    borderTopWidth: 1, borderColor: colors.gray200,
    paddingHorizontal: 20, paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    ...shadow.xl,
  },

  driverRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 },
  driverAvatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: colors.pink,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: colors.black,
  },
  driverAvatarText: { color: colors.black, fontWeight: '900', fontSize: 18 },
  driverName: { fontSize: 16, fontWeight: '800', color: colors.black },
  verifiedChip: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: colors.pink, borderRadius: 4,
    paddingHorizontal: 7, paddingVertical: 2,
  },
  verifiedChipText: { color: colors.black, fontSize: 9, fontWeight: '800' },
  driverVehicle: { fontSize: 12, color: colors.gray500, marginTop: 3 },
  driverRating: { fontSize: 12, color: colors.black, fontWeight: '600', marginTop: 2 },
  callBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: colors.pink,
    borderWidth: 1, borderColor: colors.pinkMid,
    alignItems: 'center', justifyContent: 'center',
  },

  routeCard: {
    flexDirection: 'row', gap: 14,
    backgroundColor: colors.gray100,
    borderRadius: radius.lg, padding: 14,
    marginBottom: 16,
    borderWidth: 1, borderColor: colors.gray200,
  },
  routeVis: { alignItems: 'center', justifyContent: 'space-between', paddingVertical: 4 },
  rDotA: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.black },
  rLine: { width: 1.5, height: 16, backgroundColor: colors.gray300 },
  rDotB: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.pink, borderWidth: 2, borderColor: colors.black },
  routeStop: { fontSize: 13, fontWeight: '600', color: colors.black },
});
