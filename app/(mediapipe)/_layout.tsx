import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// --- 공통 헤더 ---
// (uploader와 processor 화면에서 동일한 헤더를 사용합니다)
const CustomHeader = ({ title, showCancel }: { title: string, showCancel?: boolean }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 10, backgroundColor: '#1C2C35' }}>
      <TouchableOpacity onPress={() => router.back()} style={{ width: 60 }}>
        {showCancel ? (
          <Text style={{ color: '#4A90E2', fontSize: 16 }}>취소</Text>
        ) : (
          <Ionicons name="arrow-back" size={24} color="white" />
        )}
      </TouchableOpacity>
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
      <View style={{ width: 60 }} />
    </View>
  );
};

export default function MediaPipeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#1C2C35' } }}>
      <Stack.Screen
        name="uploader"
        // options={{
        //   header: () => <CustomHeader title="사진 업로드" showCancel={true} />,
        // }}
      />
      <Stack.Screen
        name="processor"
        options={{
          header: () => <CustomHeader title="분석 결과" />,
        }}
      />
    </Stack>
  );
}