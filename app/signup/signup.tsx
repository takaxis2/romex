// screens/SignUpScreen.tsx
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import SocialButton from '../../components/SocialButton';

export default function SignUpScreen() {
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
        <View style={styles.footer}>
                  <Text style={styles.footerText}>Already have an account? </Text>
                  <TouchableOpacity onPress={() => router.push('/signin')}>
                    <Text style={styles.link}>Sign in</Text>
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
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 40,
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
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  checkboxLabel: {
    color: '#ccc',
    fontSize: 14,
    flexShrink: 1, // 텍스트가 길어질 경우 줄바꿈되도록
  },
  link: {
    color: '#4A90E2',
    textDecorationLine: 'underline',
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
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
    marginTop: 5,
    marginBottom: 20,
  },
  footerText: {
    color: '#ccc',
    fontSize: 14,
  },
});



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContainer: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 32,
//     color: '#111',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 2,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     marginRight: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   checkboxChecked: {
//     backgroundColor: '#4A90E2',
//     borderColor: '#4A90E2',
//   },
//   checkboxLabel: {
//     fontSize: 14,
//     color: '#555',
//     flex: 1, // Allow text to wrap
//   },
//   link: {
//     color: '#4A90E2',
//     textDecorationLine: 'underline',
//   },
//   primaryButton: {
//     backgroundColor: '#4A90E2',
//     padding: 18,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 16,
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
// });
