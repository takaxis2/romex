// screens/SignUpScreen.tsx
import { Feather } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '../../components/CustomTextInput';
import SocialButton from '../../components/SocialButton';

export default function SignUpScreen() {
  const router = useRouter();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Checkbox state
  const [agreeEmails, setAgreeEmails] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Basic form validation
  const isFormValid = email.length > 0 && password.length > 0 && password === confirmPassword && agreeTerms;

  const handleSignUp = () => {
    if (!isFormValid) {
      alert('Please fill out the form correctly and agree to the terms of use.');
      return;
    }
    // --- 여기에 실제 회원가입 API 호출 로직을 구현합니다. ---
    // API 호출 성공 후, signIn()을 호출하여 로그인 상태로 전환합니다.
    // 그러면 AuthProvider가 자동으로 메인 화면으로 리디렉션합니다.
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Create your account</Text>
        <CustomTextInput placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <CustomTextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <CustomTextInput placeholder="Confirm password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

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
            I have read and accept the{' '}
            {/* 나중에 링크 걸기 */}
            <Text style={styles.link}>Terms of use</Text>
            
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.primaryButton, !isFormValid && styles.disabledButton]} onPress={handleSignUp} disabled={!isFormValid}>
          <Text style={styles.primaryButtonText}>Create my account</Text>
        </TouchableOpacity>

        <Text style={styles.dividerText}>or</Text>

        <SocialButton icon="google" text="Continue with Google" />
        <SocialButton icon="apple" text="Continue with Apple" />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/signin" asChild><Text style={styles.link}>Sign in</Text></Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2C35', // 테마 배경색으로 변경
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16, // 테마 패딩으로 변경
    paddingVertical: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 20, // SignInScreen과 일관성 유지
    marginBottom: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.7)', // 테마에 맞는 색상으로 변경
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#34D399', // 테마 강조 색상으로 변경
    borderColor: '#34D399',
  },
  checkboxLabel: {
    color: 'rgba(255, 255, 255, 0.8)', // 테마에 맞는 텍스트 색상으로 변경
    fontSize: 14,
    flexShrink: 1, // 텍스트가 길어질 경우 줄바꿈되도록
  },
  link: {
    color: '#34D399', // 테마 강조 색상으로 변경
    fontWeight: 'bold', // SignInScreen과 일관성 유지
  },
  primaryButton: {
    backgroundColor: '#34D399', // 테마 강조 색상으로 변경
    paddingVertical: 18,
    borderRadius: 99, // 둥근 버튼으로 변경
    alignItems: 'center',
    marginTop: 30,
  },
  disabledButton: {
    backgroundColor: 'rgba(52, 211, 153, 0.5)', // 비활성화 색상 변경
  },
  primaryButtonText: {
    color: '#1C2C35', // 버튼 배경과 대비되는 색상으로 변경
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerText: {
    color: 'rgba(255, 255, 255, 0.7)', // 테마에 맞는 텍스트 색상으로 변경
    textAlign: 'center',
    marginVertical: 25,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40, // SignInScreen과 일관성 유지
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)', // 테마에 맞는 텍스트 색상으로 변경
    fontSize: 14,
  },
});
