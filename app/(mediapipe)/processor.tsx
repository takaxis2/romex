import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { JSX, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Line } from 'react-native-svg';
import { useMediaStore } from '../../store/useMediaStore'; // ⬅️ 1. 스토어 import

const { width: screenWidth } = Dimensions.get('window');

// ---------------------------------------------------------------------------------
// 1. 사용자님이 제공한 좌표 변환 함수
// ---------------------------------------------------------------------------------
interface ViewSize { width: number; height: number; }
interface ImageSize { width: number; height: number; }

export function scaleLandmarkCoordinates(
  normalizedX: number,
  normalizedY: number,
  imageSize: ImageSize,
  viewSize: ViewSize
) {
  // 뷰와 이미지 크기가 유효하지 않으면 (0이면) 계산 중단
  if (!viewSize.width || !viewSize.height || !imageSize.width || !imageSize.height) {
    return { x: 0, y: 0 };
  }
  
  const scaleFactor = Math.min(
    viewSize.width / imageSize.width,
    viewSize.height / imageSize.height
  );
  const scaledWidth = imageSize.width * scaleFactor;
  const scaledHeight = imageSize.height * scaleFactor;
  const offsetX = (viewSize.width - scaledWidth) / 2;
  const offsetY = (viewSize.height - scaledHeight) / 2;
  const actualX = normalizedX * scaledWidth + offsetX;
  const actualY = normalizedY * scaledHeight + offsetY;
  return { x: actualX, y: actualY };
}

// ---------------------------------------------------------------------------------
// 2. 사용자님이 제공한 PoseVisualizer 컴포넌트
// ---------------------------------------------------------------------------------
const PoseVisualizer = ({ imageUri, poseResult }: { imageUri: string; poseResult: any }) => {
  const [viewSize, setViewSize] = useState<ViewSize>({ width: 0, height: 0 });
  const [imageSize, setImageSize] = useState<ImageSize>({ width: 0, height: 0 });
  const viewRef = useRef(null);

  useEffect(() => {
    // 원본 이미지의 픽셀 크기를 가져옵니다.
    Image.getSize(imageUri, (w, h) => setImageSize({ width: w, height: h }));
  }, [imageUri]);

  const renderLandmarks = () => {
    // 랜드마크 데이터가 없거나, 뷰/이미지 크기가 0이면 그리지 않음
    if (!poseResult || !poseResult.landmarks || poseResult.landmarks.length === 0 || viewSize.width === 0 || imageSize.width === 0) {
      return null;
    }

    const allDrawings: JSX.Element[] = [];
    const personLandmarks = poseResult.landmarks[0]; // 첫 번째 사람

    // 랜드마크 좌표를 스케일링하는 헬퍼 함수
    const getScaledCoord = (index: number) =>
      scaleLandmarkCoordinates(
        personLandmarks[index].x, // 0-1 정규화된 X
        personLandmarks[index].y, // 0-1 정규화된 Y
        imageSize,
        viewSize
      );
      
    // MediaPipe 뼈대 연결선 (예시)
    const POSE_CONNECTIONS = [
      [11, 12], [11, 13], [13, 15], [15, 17], [12, 14], [14, 16], [16, 18],
      [11, 23], [12, 24], [23, 24], [23, 25], [25, 27], [24, 26], [26, 28]
    ];

    // 1. 뼈대 그리기
    POSE_CONNECTIONS.forEach((joint, i) => {
      // 랜드마크 인덱스가 유효한지 확인
      if (personLandmarks[joint[0]] && personLandmarks[joint[1]]) {
        const start = getScaledCoord(joint[0]);
        const end = getScaledCoord(joint[1]);
        allDrawings.push(
          <Line key={`line-${i}`} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="white" strokeWidth="3" />
        );
      }
    });
    
    // 2. 관절 점 그리기
    personLandmarks.forEach((landmark: any, index: number) => {
      const scaled = getScaledCoord(index);
      allDrawings.push(
        <Circle key={`point-${index}`} cx={scaled.x} cy={scaled.y} r="5" fill="#34D399" />
      );
    });

    return allDrawings;
  };

  return (
    // 뷰의 크기를 측정하여 viewSize 상태에 저장합니다.
    <View
      style={styles.imageWrapper}
      onLayout={(event) => setViewSize(event.nativeEvent.layout)}
      ref={viewRef}
    >
      <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
      <Svg style={styles.overlay} width={viewSize.width} height={viewSize.height}>
        {renderLandmarks()}
      </Svg>
    </View>
  );
};

// ---------------------------------------------------------------------------------
// 3. Processor 스크린 (메인 컴포넌트)
// ---------------------------------------------------------------------------------
type ProcessedImage = {
  uri: string;
  poseResult: any | null; // MediaPipe 결과가 저장될 곳
};

export default function MediaPipeProcessorScreen() {
  // ⬅️ 3. URL 파라미터 대신 Zustand 스토어에서 데이터를 직접 가져옴
  const processedImages = useMediaStore((state) => state.results);
  const clearResults = useMediaStore((state) => state.clearResults);

  // 3. 전체 화면 모달을 위한 상태
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ProcessedImage | null>(null);

  // ⬅️ 4. (중요) 화면이 언마운트될 때(나갈 때) 스토어를 비웁니다.
  useEffect(() => {
    // 컴포넌트가 사라질 때(unmount) 실행될 cleanup 함수
    return () => {
      clearResults();
    };
  }, [clearResults]);

  // 4. 모달 열기/닫기 함수
  const openFullScreen = (item: ProcessedImage) => {
    setSelectedImage(item);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* --- 커스텀 헤더 --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={{width: 60}}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>분석 결과</Text>
        <View style={{width: 60}} />
      </View>

      <View style={styles.container}>
        <Text style={styles.subtitle}>{processedImages.length}개의 이미지가 분석되었습니다.</Text>

        {/* --- 5. 갤러리 (데이터 소스가 스토어의 'processedImages'로 변경됨) --- */}
        <FlatList
          data={processedImages}
          keyExtractor={(item) => item.uri}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.imageContainer} onPress={() => openFullScreen(item)}>
              <PoseVisualizer 
                imageUri={item.uri} 
                poseResult={item.poseResult} 
              />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.subtitle}>데이터를 불러오지 못했습니다.</Text>
          }
        />

        {/* --- 6. 완료 버튼 (로직 변경 없음, router.back()만 호출) --- */}
        <TouchableOpacity style={styles.doneButton} onPress={() => router.back()}>
          <Text style={styles.doneButtonText}>완료</Text>
        </TouchableOpacity>
      </View>

      {/* --- 7. 전체 화면 모달 (로직 변경 없음) --- */}
      <Modal
        visible={modalVisible}
        transparent={false}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          {selectedImage && (
            <PoseVisualizer 
              imageUri={selectedImage.uri} 
              poseResult={selectedImage.poseResult} 
            />
          )}
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Ionicons name="close" size={32} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------------
// 4. 스타일
// ---------------------------------------------------------------------------------
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1C2C35' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  container: { flex: 1, padding: 16 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: 'rgba(255, 255, 255, 0.7)', fontSize: 16, marginBottom: 20 },
  listContainer: { paddingTop: 8 },
  imageContainer: { // 갤러리 2열 그리드 아이템
    width: (screenWidth - 32 - 16) / 2, // (화면너비 - 패딩*2 - 갭) / 2
    height: (screenWidth - 32 - 16) / 2,
    margin: 4,
    borderRadius: 12,
    backgroundColor: '#2E4B4F', // 이미지 로딩 중 배경색
    overflow: 'hidden', // 랜드마크가 밖으로 나가지 않도록
  },
  doneButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 20,
  },
  doneButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  
  // --- PoseVisualizer 스타일 ---
  imageWrapper: { // PoseVisualizer의 부모
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black', // 'contain' 모드 시 레터박스 배경
  },
  image: { // 'contain' 모드로 표시될 이미지
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: { // 랜드마크가 그려질 Svg 캔버스
    position: 'absolute',
    top: 0,
    left: 0,
  },
  
  // --- 전체 화면 모달 스타일 ---
  modalContainer: {
    flex: 1,
    backgroundColor: '#1C2C35', // 앱 배경색과 동일하게
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 60, // (SafeAreaView 기준)
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 4,
  },
});