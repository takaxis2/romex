// screens/WelcomeScreen.tsx
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function WelcomeScreen() {
  const router = useRouter();

  // Animation values
  const contentOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(20);
  const footerOpacity = useSharedValue(0);
  const footerTranslateY = useSharedValue(20);

  useEffect(() => {
    // Start animations
    contentOpacity.value = withTiming(1, { duration: 800 });
    contentTranslateY.value = withTiming(0, { duration: 800 });

    footerOpacity.value = withDelay(200, withTiming(1, { duration: 1000 }));
    footerTranslateY.value = withDelay(200, withTiming(0, { duration: 1000 }));
  }, []);

  const animatedContentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentTranslateY.value }],
  }));

  const animatedFooterStyle = useAnimatedStyle(() => ({
    opacity: footerOpacity.value,
    transform: [{ translateY: footerTranslateY.value }],
  }));

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110' }} // 예시 이미지
      style={styles.background}
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <AnimatedView style={[styles.contentContainer, animatedContentStyle]}>
          <Text style={styles.title}>지금 바로 여정을 시작하세요</Text>
          <Text style={styles.subtitle}>Start your journey right now</Text>
        </AnimatedView>
        <AnimatedView style={[styles.footer, animatedFooterStyle]}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.replace('/signup')} // 스택을 'signup'으로 교체합니다.
          >
            <Text style={styles.buttonText}>Create your account for free</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.replace('/signin')}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </AnimatedView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between', // content와 footer를 위아래로 분리
    padding: 20,
  },
  contentContainer: {
    flex: 1, // 남은 공간을 모두 차지
    justifyContent: 'center', // 자식 요소를 세로 중앙에 배치
    alignItems: 'center',
  },
  title: { color: 'white', fontSize: 24, fontWeight: '600' },
  subtitle: { color: 'white', fontSize: 32, fontWeight: 'bold', marginTop: 8, textAlign: 'center' },
  footer: {
    paddingBottom: 20,
    gap: 16, // 버튼 사이의 간격
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
