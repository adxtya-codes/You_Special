import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { colors, radius, typography } from '../../theme';
import { PrimaryButton, GlassCard } from '../../components/SharedComponents';

export default function AdminLogin({ navigation }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginAsAdmin } = useAuth();

  const handleLogin = () => {
    if (password === 'admin123' || password.length >= 4) {
      loginAsAdmin();
      navigation.replace('AdminApp');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <Text style={{ fontSize: 56 }}>🔒</Text>
            <Text style={[typography.displaySm, { color: 'white', marginTop: 16, marginBottom: 6 }]}>Admin Portal</Text>
            <Text style={{ color: colors.gray400, fontSize: 13 }}>You Special Control Center</Text>
          </View>

          <GlassCard style={styles.card}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Admin Email</Text>
              <TextInput
                style={[styles.inputField, { opacity: 0.6 }]}
                value="admin@youspecial.app"
                editable={false}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Enter admin password"
                placeholderTextColor={colors.gray500}
                secureTextEntry={true}
                value={password}
                onChangeText={(val) => {
                  setPassword(val);
                  setError('');
                }}
              />
            </View>

            {error ? (
              <Text style={{ color: colors.dangerLight, fontSize: 13, marginBottom: 12 }}>
                {error}
              </Text>
            ) : null}

            <Text style={{ fontSize: 11, color: colors.gray500, marginBottom: 16 }}>
              Demo: type any 4+ chars to login
            </Text>

            <PrimaryButton
              label="Login to Dashboard →"
              onPress={handleLogin}
            />
          </GlassCard>

          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.navigate('Landing')}
          >
            <Text style={{ color: colors.gray500, fontSize: 13, fontWeight: '600' }}>
              ← Back to App
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgDark,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
  },
  card: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: colors.gray300,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputField: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: 'white',
    fontSize: 15,
  },
  backBtn: {
    alignItems: 'center',
    marginTop: 16,
    padding: 10,
  },
});
