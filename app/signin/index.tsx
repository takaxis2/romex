// screens/SignInScreen.tsx
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTextInput from '../../components/CustomTextInput';
import SocialButton from '../../components/SocialButton';

export default function SignInScreen(){
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    setIsLoading(true);
    // 실제 앱에서는 여기에 API 호출 등 비동기 로직이 들어갑니다.
    router.dismissAll();
    router.replace('/(tabs)');
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Sign In</Text>
        <CustomTextInput placeholder="Email" keyboardType="email-address" />
        <CustomTextInput placeholder="Password" secureTextEntry />

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.primaryButton, isLoading && styles.primaryButtonDisabled]}
          onPress={handleSignIn}
          disabled={isLoading}
        >
          <Text style={styles.primaryButtonText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.dividerText}>or</Text>

        <SocialButton icon="google" text="Continue with Google" />
        <SocialButton icon="apple" text="Continue with Apple" />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2C35', // WorkoutScreen의 safeArea 배경색
    // justifyContent: 'center', // scrollContainer에서 처리
    paddingHorizontal: 16, // WorkoutScreen의 일반적인 패딩
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 20, // WorkoutScreen의 screenTitle과 유사하게
    marginBottom: 20, // WorkoutScreen의 screenTitle과 유사하게
  },
  forgotPassword: {
    color: '#34D399', // 강조 색상 (WorkoutSetupScreen의 버튼 색상)
    textAlign: 'right',
    marginVertical: 12,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#34D399', // 강조 색상
    paddingVertical: 18,
    borderRadius: 99, // 더 둥근 버튼
    alignItems: 'center',
    marginTop: 20,
  },
  primaryButtonText: {
    color: '#1C2C35', // 버튼 배경색과 대비되는 어두운 색상
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerText: {
    color: 'rgba(255, 255, 255, 0.7)', // 일반 텍스트 색상
    textAlign: 'center',
    marginVertical: 25,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)', // 일반 텍스트 색상
    fontSize: 14,
  },
  link: {
    color: '#34D399', // 강조 색상
    fontWeight: 'bold',
    fontSize: 14,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 0, // container에서 paddingHorizontal을 처리하므로 여기서는 제거
  },
  primaryButtonDisabled: {
    backgroundColor: 'rgba(52, 211, 153, 0.5)', // 강조 색상의 투명도 조절
  },
});
