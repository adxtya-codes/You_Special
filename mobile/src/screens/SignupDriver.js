import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { colors, radius, shadow } from '../theme';
import { PrimaryButton, GlassCard } from '../components/SharedComponents';

const vehicles = [
  'Honda Activa 6G',
  'TVS Jupiter',
  'Honda Dio',
  'Suzuki Access 125',
  'Yamaha Ray ZR',
  'Other Scooter'
];

export default function SignupDriver({ navigation }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', phone: '', vehicle: '', vehicleNo: '', idType: 'aadhaar' });
  const [idUploaded, setIdUploaded] = useState(false);
  const { loginAsDriver } = useAuth();

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    loginAsDriver({
      name: form.name,
      phone: form.phone,
      vehicle: form.vehicle,
      vehicleNo: form.vehicleNo,
      initials: form.name.slice(0, 2).toUpperCase(),
      id: 'd_new',
      rating: 5,
      rides: 0,
      verified: false,
      online: false,
      earnings: 0
    });
    navigation.replace('DriverApp');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Join as Driver</Text>
          <Text style={styles.headerSubtitle}>Earn flexibly. Empower women.</Text>
        </View>

        {/* Step progress */}
        <View style={styles.stepProgress}>
          {[1, 2, 3, 4].map((s, i) => (
            <React.Fragment key={s}>
              <View style={[styles.stepDot, step >= s ? (step > s ? styles.stepDone : styles.stepActive) : styles.stepTodo]}>
                <Text style={[styles.stepDotText, step >= s && styles.stepDotTextActive]}>{step > s ? '✓' : s}</Text>
              </View>
              {i < 3 && <View style={[styles.stepLine, step > s ? styles.stepLineDone : null]} />}
            </React.Fragment>
          ))}
        </View>

        <GlassCard style={styles.card}>
          {step === 1 && (
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Personal Details</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="e.g. Sunita Verma"
                  placeholderTextColor={colors.gray400}
                  value={form.name}
                  onChangeText={(val) => update('name', val)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone Number</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="10-digit number"
                  placeholderTextColor={colors.gray400}
                  keyboardType="phone-pad"
                  value={form.phone}
                  onChangeText={(val) => update('phone', val)}
                  maxLength={10}
                />
              </View>

              <PrimaryButton
                label="Continue"
                onPress={() => setStep(2)}
                disabled={!form.name || form.phone.length < 10}
              />
            </View>
          )}

          {step === 2 && (
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Vehicle Details</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Vehicle Model</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.vehicleScroll}>
                  {vehicles.map((v) => (
                    <TouchableOpacity
                      key={v}
                      style={[styles.vehicleBtn, form.vehicle === v && styles.vehicleBtnActive]}
                      onPress={() => update('vehicle', v)}
                    >
                      <Text style={[styles.vehicleBtnText, form.vehicle === v && styles.vehicleBtnTextActive]}>{v}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Vehicle Number</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="e.g. MH-12-AB-3456"
                  placeholderTextColor={colors.gray400}
                  autoCapitalize="characters"
                  value={form.vehicleNo}
                  onChangeText={(val) => update('vehicleNo', val)}
                />
              </View>

              <PrimaryButton
                label="Continue"
                onPress={() => setStep(3)}
                disabled={!form.vehicle || !form.vehicleNo}
              />
            </View>
          )}

          {step === 3 && (
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Identity Verification</Text>
              <Text style={styles.stepDesc}>We require ID verification to keep our women riders safe.</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Document Type</Text>
                <View style={styles.docRow}>
                  {[['Aadhaar Card', 'aadhaar'], ['Driving License', 'dl']].map(([label, val]) => (
                    <TouchableOpacity
                      key={val}
                      style={[styles.docBtn, form.idType === val && styles.docBtnActive]}
                      onPress={() => update('idType', val)}
                    >
                      <Text style={[styles.docBtnText, form.idType === val && styles.docBtnTextActive]}>{label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity
                style={[styles.uploadBox, idUploaded && styles.uploadBoxDone]}
                onPress={() => setIdUploaded(true)}
              >
                <Ionicons
                  name={idUploaded ? "checkmark-circle" : "cloud-upload"}
                  size={28}
                  color={colors.black}
                  style={{ marginBottom: 8 }}
                />
                <Text style={styles.uploadText}>
                  {idUploaded ? 'Document Uploaded successfully' : 'Upload front & back image'}
                </Text>
              </TouchableOpacity>

              <PrimaryButton
                label="Continue"
                onPress={() => setStep(4)}
                disabled={!idUploaded}
              />
            </View>
          )}

          {step === 4 && (
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Application Submitted!</Text>
              <Text style={styles.completeDesc}>
                We are reviewing your details. The verification process usually takes less than 24 hours.
              </Text>

              <View style={styles.benefitsList}>
                <View style={styles.benefitItem}>
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark" size={12} color={colors.black} />
                  </View>
                  <Text style={styles.benefitText}>Flexible working hours</Text>
                </View>
                <View style={styles.benefitItem}>
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark" size={12} color={colors.black} />
                  </View>
                  <Text style={styles.benefitText}>Empower and protect women riders</Text>
                </View>
                <View style={styles.benefitItem}>
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark" size={12} color={colors.black} />
                  </View>
                  <Text style={styles.benefitText}>24/7 dedicated support desk</Text>
                </View>
              </View>

              <PrimaryButton
                label="Go to Dashboard"
                onPress={submit}
              />
            </View>
          )}
        </GlassCard>

        <Text style={styles.footerText}>
          By signing up you agree to our Terms & Privacy Policy
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 24,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.gray100,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.black,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    color: colors.gray500,
    fontSize: 14,
    marginTop: 4,
  },
  stepProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  stepDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  stepDotText: {
    color: colors.gray400,
    fontSize: 12,
    fontWeight: '700',
  },
  stepDotTextActive: {
    color: colors.white,
  },
  stepDone: {
    backgroundColor: colors.black,
    borderColor: colors.black,
  },
  stepActive: {
    backgroundColor: colors.black,
    borderColor: colors.black,
  },
  stepTodo: {
    backgroundColor: colors.white,
    borderColor: colors.gray300,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: colors.gray200,
    marginHorizontal: 8,
  },
  stepLineDone: {
    backgroundColor: colors.black,
  },
  card: {
    padding: 24,
    borderWidth: 1,
    borderColor: colors.gray200,
    ...shadow.sm,
  },
  stepContent: {
    width: '100%',
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.black,
    marginBottom: 16,
  },
  stepDesc: {
    fontSize: 13,
    color: colors.gray500,
    lineHeight: 18,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: colors.gray600,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  inputField: {
    backgroundColor: colors.gray100,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.gray200,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.black,
    fontSize: 15,
  },
  vehicleScroll: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  vehicleBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.gray100,
    borderRadius: radius.sm,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  vehicleBtnActive: {
    backgroundColor: colors.black,
    borderColor: colors.black,
  },
  vehicleBtnText: {
    fontSize: 13,
    color: colors.gray600,
    fontWeight: '600',
  },
  vehicleBtnTextActive: {
    color: colors.white,
  },
  docRow: {
    flexDirection: 'row',
    gap: 8,
  },
  docBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: colors.gray100,
    borderRadius: radius.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  docBtnActive: {
    backgroundColor: colors.black,
    borderColor: colors.black,
  },
  docBtnText: {
    fontSize: 13,
    color: colors.gray600,
    fontWeight: '600',
  },
  docBtnTextActive: {
    color: colors.white,
  },
  uploadBox: {
    height: 110,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.gray300,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: colors.gray50,
  },
  uploadBoxDone: {
    backgroundColor: colors.pink,
    borderColor: colors.pinkMid,
  },
  uploadText: {
    fontSize: 12,
    color: colors.gray500,
    fontWeight: '600',
  },
  completeDesc: {
    color: colors.gray500,
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  benefitsList: {
    gap: 12,
    marginBottom: 24,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '600',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.pink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    textAlign: 'center',
    color: colors.gray400,
    fontSize: 11,
    marginTop: 24,
  },
});
