import React, { useState, useRef } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView, StatusBar, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { colors, radius, shadow } from '../theme';
import { PrimaryButton, ToggleGroup } from '../components/SharedComponents';

export default function Login({ navigation }) {
  const [role, setRole] = useState('rider');
  const [phone, setPhone] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginAsRider, loginAsDriver } = useAuth();
  const otpRef = useRef(null);

  const handleSendOtp = () => {
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setOtpStep(true); }, 1200);
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === 'rider') { loginAsRider(); navigation.replace('RiderApp'); }
      else { loginAsDriver(); navigation.replace('DriverApp'); }
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={colors.black} />
        </TouchableOpacity>
        <View style={styles.logoRow}>
          <Image
            source={require('../../assets/logo.png')}
            style={{ width: 24, height: 24, borderRadius: 5 }}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>You Special</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {!otpStep ? (
          <>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Log in with your phone number to continue.</Text>

            {/* Role selector */}
            <View style={{ marginBottom: 28 }}>
              <ToggleGroup
                options={[
                  { label: 'Rider', value: 'rider' },
                  { label: 'Driver', value: 'driver' },
                ]}
                value={role}
                onChange={setRole}
              />
            </View>

            {/* Phone input */}
            <Text style={styles.fieldLabel}>Mobile Number</Text>
            <View style={styles.phoneRow}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+91</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="00000 00000"
                placeholderTextColor={colors.gray300}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                maxLength={10}
              />
            </View>

            <PrimaryButton
              label={loading ? 'Sending…' : 'Send OTP'}
              onPress={handleSendOtp}
              disabled={loading || phone.length < 10}
            />

            <View style={styles.signupRow}>
              <Text style={styles.signupText}>New here? </Text>
              <TouchableOpacity onPress={() => navigation.navigate(role === 'rider' ? 'SignupRider' : 'SignupDriver')}>
                <Text style={styles.signupLink}>Create account</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.title}>Enter OTP</Text>
            <Text style={styles.subtitle}>
              6-digit code sent to{' '}
              <Text style={{ fontWeight: '800', color: colors.black }}>+91 {phone}</Text>
            </Text>

            {/* OTP Boxes — tap to open keyboard */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => otpRef.current?.focus()}
              style={styles.otpRow}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.otpBox,
                    otp.length === i && styles.otpBoxCursor,
                    otp[i] ? styles.otpBoxFilled : null,
                  ]}
                >
                  <Text style={styles.otpDigit}>{otp[i] || ''}</Text>
                  {/* Cursor indicator for empty active box */}
                  {otp.length === i && (
                    <View style={styles.cursor} />
                  )}
                </View>
              ))}
            </TouchableOpacity>

            {/* Truly invisible input — no placeholder, no visible text, just captures keystrokes */}
            <TextInput
              ref={otpRef}
              style={styles.hiddenInput}
              keyboardType="number-pad"
              value={otp}
              onChangeText={val => setOtp(val.replace(/[^0-9]/g, '').slice(0, 6))}
              maxLength={6}
              autoFocus
              caretHidden
              contextMenuHidden
            />

            <PrimaryButton
              label={loading ? 'Verifying…' : 'Verify & Login'}
              onPress={handleVerify}
              disabled={loading || otp.length < 4}
              style={{ marginTop: 24 }}
            />

            <TouchableOpacity
              style={styles.changeNumBtn}
              onPress={() => { setOtpStep(false); setOtp(''); }}
            >
              <Ionicons name="arrow-back" size={14} color={colors.gray500} />
              <Text style={styles.changeNumText}>Change number</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resendBtn}>
              <Text style={styles.resendText}>Resend OTP in 30s</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Ionicons name="lock-closed" size={12} color={colors.gray400} />
          <Text style={styles.footerText}>100% Women-only. Safe and Verified.</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },

  topBar: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 56 : 20,
    paddingBottom: 14,
    borderBottomWidth: 1, borderColor: colors.gray200,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.gray100,
    alignItems: 'center', justifyContent: 'center',
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoText: { fontSize: 15, fontWeight: '800', color: colors.black, letterSpacing: -0.3 },

  scroll: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 48 },

  title: {
    fontSize: 30, fontWeight: '900', color: colors.black,
    letterSpacing: -0.6, marginBottom: 8,
  },
  subtitle: {
    fontSize: 15, color: colors.gray500, lineHeight: 22, marginBottom: 32,
  },

  fieldLabel: {
    fontSize: 12, fontWeight: '700', color: colors.gray500,
    textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10,
  },
  phoneRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  countryCode: {
    backgroundColor: colors.gray100,
    borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.gray200,
    paddingHorizontal: 16, justifyContent: 'center',
  },
  countryCodeText: { fontSize: 15, fontWeight: '700', color: colors.black },
  phoneInput: {
    flex: 1,
    backgroundColor: colors.gray100,
    borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.gray200,
    paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 18, fontWeight: '600', color: colors.black,
    letterSpacing: 1,
  },

  // OTP
  otpRow: {
    flexDirection: 'row', gap: 10,
    justifyContent: 'center',
    marginTop: 24, marginBottom: 4,
  },
  otpBox: {
    width: 46, height: 58,
    borderWidth: 1.5, borderColor: colors.gray200,
    borderRadius: radius.md,
    backgroundColor: colors.gray50,
    alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  otpBoxCursor: {
    borderColor: colors.black,
    backgroundColor: colors.white,
  },
  otpBoxFilled: {
    borderColor: colors.black,
    backgroundColor: colors.white,
  },
  otpDigit: {
    fontSize: 24, fontWeight: '800', color: colors.black,
  },
  cursor: {
    position: 'absolute',
    bottom: 10, width: 2, height: 20,
    backgroundColor: colors.black,
    borderRadius: 1,
  },
  hiddenInput: {
    position: 'absolute',
    width: 1, height: 1,
    opacity: 0,
    // Completely invisible but still receives input
  },

  changeNumBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    alignSelf: 'center', marginTop: 16, padding: 8,
  },
  changeNumText: { color: colors.gray500, fontSize: 13, fontWeight: '600' },
  resendBtn: { marginTop: 4, alignItems: 'center', padding: 8 },
  resendText: { color: colors.gray400, fontSize: 13 },

  signupRow: {
    flexDirection: 'row', justifyContent: 'center',
    alignItems: 'center', marginTop: 28,
  },
  signupText: { color: colors.gray500, fontSize: 14 },
  signupLink: { color: colors.black, fontSize: 14, fontWeight: '700' },

  footer: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    justifyContent: 'center',
    marginTop: 48, paddingTop: 20,
    borderTopWidth: 1, borderColor: colors.gray200,
  },
  footerText: { color: colors.gray400, fontSize: 12 },
});
