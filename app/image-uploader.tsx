import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ImageUploaderScreen() {
  // 1. 선택된 이미지 URI들을 저장할 state
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);

  // 2. 미디어 라이브러리 권한 요청 및 실행
  const pickImages = async () => {
    // 1. 권한 확인 및 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진을 선택하려면 갤러리 접근 권한이 필요합니다.');
      return;
    }

    // 2. 이미지 피커 실행
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true, // ⬅️ 여러 장 선택 허용
      quality: 1,
    });

    if (!result.canceled) {
      // 3. 기존 이미지 목록에 새로 선택한 이미지들 추가
      setImages((currentImages) => [...currentImages, ...result.assets]);
    }
  };

  // 3. 카메라 권한 요청 및 실행
  const takePhoto = async () => {
    // 1. 권한 확인 및 요청
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진을 찍으려면 카메라 접근 권한이 필요합니다.');
      return;
    }

    // 2. 카메라 실행
    let result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (!result.canceled) {
      // 3. 기존 이미지 목록에 새로 찍은 사진 추가
      setImages((currentImages) => [...currentImages, ...result.assets]);
    }
  };

  // 4. 확인 버튼 (선택 완료)
  const handleConfirm = () => {
    // TODO: 선택된 이미지(images)들을 서버로 업로드하거나
    // 부모 화면으로 전달하는 로직
    
    console.log('최종 선택된 이미지:', images.map(img => img.uri));
    router.back(); // 모달 닫기
  };

  // 5. 개별 이미지 삭제
  const removeImage = (uri: string) => {
    setImages((currentImages) => currentImages.filter(img => img.uri !== uri));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* --- 커스텀 헤더 --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.headerButton}>취소</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>사진 업로드</Text>
        <TouchableOpacity onPress={handleConfirm}>
          <Text style={styles.headerButton}>확인</Text>
        </TouchableOpacity>
      </View>

      {/* --- 선택/촬영 버튼 --- */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImages}>
          <Ionicons name="images" size={24} color="#4A90E2" />
          <Text style={styles.buttonText}>갤러리에서 선택</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Ionicons name="camera" size={24} color="#4A90E2" />
          <Text style={styles.buttonText}>카메라로 촬영</Text>
        </TouchableOpacity>
      </View>

      {/* --- 선택된 이미지 미리보기 (FlatList) --- */}
      <FlatList
        data={images}
        keyExtractor={(item) => item.uri}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.image} />
            <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(item.uri)}>
              <Ionicons name="close-circle" size={24} color="#FF453A" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>선택된 사진이 없습니다.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1C2C35' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2E4B4F',
  },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  headerButton: { color: '#4A90E2', fontSize: 16 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  button: {
    backgroundColor: '#2E4B4F',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '45%',
  },
  buttonText: { color: 'white', marginTop: 8 },
  listContainer: {
    paddingHorizontal: 8,
  },
  imageContainer: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: 'rgba(28, 44, 53, 0.7)',
    borderRadius: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
  },
});