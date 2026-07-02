import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { colors, radius, shadow } from '../theme';
import { PrimaryButton, GlassCard } from '../components/SharedComponents';

export default function SignupRider({ navigation }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', phone: '', email: '', dob: '', emergencyName: '', emergencyPhone: '' });
  const { loginAsRider } = useAuth();

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    loginAsRider({
      name: form.name,
      phone: form.phone,
      initials: form.name.slice(0, 2).toUpperCase(),
      id: 'r_new',
      rating: 5,
      rides: 0,
      emergencyName: form.emergencyName,
      emergencyPhone: form.emergencyPhone
    });
    navigation.replace('RiderApp');
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
          <Text style={styles.headerTitle}>Join as Rider</Text>
          <Text style={styles.headerSubtitle}>Create your free account in seconds</Text>
        </View>

        {/* Step progress */}
        <View style={styles.stepProgress}>
          <View style={[styles.stepDot, step >= 1 ? styles.stepDone : styles.stepTodo]}>
            <Text style={[styles.stepDotText, step >= 1 && styles.stepDotTextActive]}>{step > 1 ? '✓' : '1'}</Text>
          </View>
          <View style={[styles.stepLine, step >= 2 ? styles.stepLineDone : null]} />
          <View style={[styles.stepDot, step >= 2 ? (step > 2 ? styles.stepDone : styles.stepActive) : styles.stepTodo]}>
            <Text style={[styles.stepDotText, step >= 2 && styles.stepDotTextActive]}>{step > 2 ? '✓' : '2'}</Text>
          </View>
          <View style={[styles.stepLine, step >= 3 ? styles.stepLineDone : null]} />
          <View style={[styles.stepDot, step === 3 ? styles.stepActive : styles.stepTodo]}>
            <Text style={[styles.stepDotText, step === 3 && styles.stepDotTextActive]}>3</Text>
          </View>
        </View>

        <GlassCard style={styles.card}>
          {step === 1 && (
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Personal Details</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="e.g. Priya Sharma"
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
                disabled={!form.name || !form.phone}
              />
            </View>
          )}

          {step === 2 && (
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Safety Setup</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Emergency Contact Name</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Sister / Mom / Friend"
                  placeholderTextColor={colors.gray400}
                  value={form.emergencyName}
                  onChangeText={(val) => update('emergencyName', val)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Emergency Contact Phone</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="+91 99887 76655"
                  placeholderTextColor={colors.gray400}
                  keyboardType="phone-pad"
                  value={form.emergencyPhone}
                  onChangeText={(val) => update('emergencyPhone', val)}
                />
              </View>

              <View style={styles.privacyAlert}>
                <Ionicons name="lock-closed" size={16} color={colors.black} style={{ marginRight: 6 }} />
                <Text style={styles.privacyAlertText}>
                  <Text style={{ fontWeight: '800' }}>Privacy First:</Text> Your number is masked from drivers.
                </Text>
              </View>

              <PrimaryButton
                label="Continue"
                onPress={() => setStep(3)}
                disabled={!form.emergencyName || !form.emergencyPhone}
              />
            </View>
          )}

          {step === 3 && (
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>All set!</Text>
              <Text style={styles.completeDesc}>
                Welcome to You Special. You are joining thousands of women who ride safely every day.
              </Text>

              <View style={styles.benefitsList}>
                {[
                  'Women-only driver matching',
                  'Live GPS trip sharing',
                  'SOS emergency alert',
                  '24/7 women safety team'
                ].map((f) => (
                  <View key={f} style={styles.benefitItem}>
                    <View style={styles.checkmark}>
                      <Ionicons name="checkmark" size={12} color={colors.black} />
                    </View>
                    <Text style={styles.benefitText}>{f}</Text>
                  </View>
                ))}
              </View>

              <PrimaryButton
                label="Start Riding"
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
  privacyAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 20,
    borderRadius: radius.md,
    backgroundColor: colors.pink,
    borderWidth: 1,
    borderColor: colors.pinkMid,
  },
  privacyAlertText: {
    fontSize: 12,
    color: colors.black,
    lineHeight: 18,
    flex: 1,
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
