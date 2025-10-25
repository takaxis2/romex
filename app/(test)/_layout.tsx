import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// 공통 헤더를 위한 컴포넌트
function CustomHeader() {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10,}}>
            <TouchableOpacity>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }}>ROMEX</Text>
            <Text style={{ fontSize: 24,}}>🇰🇷</Text>
          </View>
  );
}

export default function TestLayout() {
  return (
    <Stack
      screenOptions={{
        // header: () => <CustomHeader />, // 모든 화면에 커스텀 헤더 적용
        contentStyle: { backgroundColor: '#1C2C35' },
        animation: 'slide_from_right',
        headerShown: false
      }}
    >
      <Stack.Screen name="instructions" />
      <Stack.Screen name="result" />
      {/* <Stack.Screen name="input" /> */}
    </Stack>
  );
}