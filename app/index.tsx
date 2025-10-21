// screens/WelcomeScreen.tsx
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef } from 'react';
import { BackHandler, ImageBackground, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  // 뒤로가기 버튼을 두 번 눌러야 종료되게 하는 로직
    const backPressedOnce = useRef(false);

  useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          // 2초 안에 다시 누르지 않으면 초기화
          if (backPressedOnce.current) {
            BackHandler.exitApp();
            return false; // 앱 종료
          }
  
          backPressedOnce.current = true;
          ToastAndroid.show('한 번 더 누르면 종료됩니다.', ToastAndroid.SHORT);
  
          setTimeout(() => {
            backPressedOnce.current = false;
          }, 2000);
  
          return true; // 기본 뒤로가기 동작 막기
        };
  
        const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
  
        return () => subscription.remove();
      }, [])
    );

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
            onPress={() => router.push('/signup')} // 스택을 'signup'으로 교체합니다.
          >
            <Text style={styles.primaryButtonText}>Create your account for free</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/signin')}>
            <Text style={styles.secondaryButtonText}>Sign In</Text>
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
    backgroundColor: '#34D399', // 테마 강조 색상으로 변경
    paddingVertical: 18,
    borderRadius: 99, // 둥근 버튼으로 변경
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 18,
    borderRadius: 99, // 둥근 버튼으로 변경
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  primaryButtonText: {
    color: '#1C2C35', // 버튼 배경과 대비되는 색상으로 변경
    fontSize: 16,
    fontWeight: 'bold'
  },
  secondaryButtonText: {
    color: 'white', fontSize: 16, fontWeight: 'bold'
  },
});
