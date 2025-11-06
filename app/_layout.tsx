import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="signin/index" options={{ title: 'Sign In', headerBackTitle: 'Back', headerShown: false }} />
        <Stack.Screen name="signup/index" options={{ title: 'Sign Up', headerBackTitle: 'Back', headerShown: false }} />
        <Stack.Screen name="setting" options={{ title: 'Settings', presentation: 'modal', headerStyle: { backgroundColor: '#0D0D0D' }, headerTintColor: 'white' }} />
        <Stack.Screen name="(test)" options={{ headerShown: false }} />
        <Stack.Screen name="(mediapipe)" options={{ headerShown: false }} />
        {/* <Stack.Screen 
        name="image-uploader" // ⬅️ 새로 만들 화면의 파일 이름
        options={{ 
          headerShown: false,
          presentation: 'modal', // ⬅️ 이 화면을 모달로 설정
          animation: 'slide_from_bottom',
        }} 
      /> */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
