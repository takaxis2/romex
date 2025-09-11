// screens/SignUpScreen.tsx
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import SocialButton from '../../components/SocialButton';

const SignUpScreen = () => {
  const router = useRouter();
  const [agreeEmails, setAgreeEmails] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Create your account</Text>
        <CustomTextInput placeholder="Email" keyboardType="email-address" />
        <CustomTextInput placeholder="Password" secureTextEntry />
        <CustomTextInput placeholder="Confirm password" secureTextEntry />

        <TouchableOpacity style={styles.checkboxContainer} onPress={() => setAgreeEmails(!agreeEmails)}>
          <View style={[styles.checkbox, agreeEmails && styles.checkboxChecked]}>
            {agreeEmails && <Feather name="check" size={14} color="white" />}
          </View>
          <Text style={styles.checkboxLabel}>I accept to receive emails from GOWOD</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxContainer} onPress={() => setAgreeTerms(!agreeTerms)}>
          <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
            {agreeTerms && <Feather name="check" size={14} color="white" />}
          </View>
          <Text style={styles.checkboxLabel}>
            I have read and accept the <Text style={styles.link}>Terms of use</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.primaryButtonText}>Create my account</Text>
        </TouchableOpacity>

        <Text style={styles.dividerText}>or</Text>

        <SocialButton icon="google" text="Continue with Google" />
        <SocialButton icon="apple" text="Continue with Apple" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#111',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#555',
    flex: 1, // Allow text to wrap
  },
  link: {
    color: '#4A90E2',
    textDecorationLine: 'underline',
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerText: {
    textAlign: 'center',
    color: '#aaa',
    marginVertical: 24,
  },
});

export default SignUpScreen;