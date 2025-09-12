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
    backgroundColor: '#121212',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 40,
  },
  forgotPassword: {
    color: '#4A90E2',
    textAlign: 'right',
    marginVertical: 12,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerText: {
    color: '#888',
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
    color: '#ccc',
    fontSize: 14,
  },
  link: {
    color: '#4A90E2',
    fontWeight: 'bold',
    fontSize: 14,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  primaryButtonDisabled: {
    backgroundColor: '#A9C9E8', // 비활성화 시 버튼 색상
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 32,
//     color: '#111',
//     textAlign: 'center',
//   },
//   forgotPassword: {
//     color: '#4A90E2',
//     textAlign: 'right',
//     marginBottom: 24,
//     fontWeight: '600',
//   },
//   primaryButton: {
//     backgroundColor: '#4A90E2',
//     padding: 18,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   primaryButtonDisabled: {
//     backgroundColor: '#A9C9E8', // 비활성화 시 버튼 색상
//   },
//   primaryButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   dividerText: {
//     textAlign: 'center',
//     color: '#aaa',
//     marginVertical: 24,
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 24,
//   },
//   footerText: {
//     fontSize: 14,
//     color: '#555',
//   },
//   link: {
//     color: '#4A90E2',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
// });
