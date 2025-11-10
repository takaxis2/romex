import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useAssets } from 'expo-asset';
import { router } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator, // ⬅️ 1. FlatList import
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TEST_DATA, TOTAL_TEST_STEPS } from '../../data/testData';

const { width: screenWidth } = Dimensions.get('window');

// --- InstructionRow 컴포넌트 (동일) ---
const InstructionRow = ({ text, isGood }: { text: string; isGood: boolean }) => (
  <View style={styles.instructionRow}>
    <Ionicons
      name={isGood ? 'checkmark-circle' : 'close-circle'}
      size={20}
      color={isGood ? '#34D399' : '#FF453A'}
    />
    <Text style={styles.instructionText}>{text}</Text>
  </View>
);

// ----------------------------------------------------------------
// 💡 3. 모달 컨텐츠 (스와이프 UI로 수정)
// ----------------------------------------------------------------
type ModalContentProps = {
  data: (typeof TEST_DATA)[0];
  onConfirm: (result: { left: number | null; right: number | null }) => void;
};

const TestInputModal = ({ data, onConfirm }: ModalContentProps) => {
  const [score, setScore] = useState(0); 
  const [scoreLeft, setScoreLeft] = useState(0); 
  const [scoreRight, setScoreRight] = useState(0);
  
  // 💡 스와이프 페이지 상태 (0: Left, 1: Right)
  const [currentPage, setCurrentPage] = useState(0); 

  const imageAssetsToLoad = useMemo(() => {
    if (data.inputType === 'single') {
      return (data.images as { main: any[] }).main;
    }
    if (data.inputType === 'dual') {
      const images = data.images as { left: any[]; right: any[] };
      return [...images.left, ...images.right];
    }
    return [];
  }, [data]);

  const [assets] = useAssets(imageAssetsToLoad);

  useEffect(() => {
    setScore(0);
    setScoreLeft(0);
    setScoreRight(0);
    setCurrentPage(0); // 스텝이 바뀌면 모달을 0페이지(좌측)로 리셋
  }, [data]);

  const handleModalConfirm = () => {
    if (data.inputType === 'single') {
      onConfirm({ left: score, right: null });
    } else if (data.inputType === 'dual') {
      onConfirm({ left: scoreLeft, right: scoreRight });
    }
  };

  // 💡 FlatList의 페이지가 변경될 때 호출
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
     if (viewableItems.length > 0) {
       setCurrentPage(viewableItems[0].index || 0);
     }
  }).current;

  if (!assets) {
    return <View style={styles.modalLoadingContainer}><ActivityIndicator size="large" /></View>;
  }

  // --- 1. 싱글 슬라이더 UI (0-10점) ---
  if (data.inputType === 'single') {
    const imageSource = assets[score];
    return (
      <View>
        <Text style={styles.modalTitle}>결과를 입력하세요</Text>
        <View style={styles.imageContainer}>
          <Image source={imageSource} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0} maximumValue={10} step={1}
            value={score} onValueChange={setScore}
            minimumTrackTintColor="#34D399"
            maximumTrackTintColor="#2E4B4F"
            thumbTintColor="#FFFFFF"
          />
          <Text style={styles.scoreText}>{data.title}: {score} 점</Text>
        </View>
        <TouchableOpacity style={styles.bottomButton} onPress={handleModalConfirm}>
          <Text style={styles.bottomButtonText}>확인</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- 2. 듀얼 슬라이더 UI (스와이프) ---
  if (data.inputType === 'dual') {
    const pages = ['left', 'right'];
    
    // 0~10 (Left), 11~21 (Right)
    const leftImageSource = assets[scoreLeft]; 
    const rightImageSource = assets[11 + scoreRight];

    return (
       <View>
        <Text style={styles.modalTitle}>결과를 입력하세요</Text>
        
        <FlatList
          data={pages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          renderItem={({ item }) => {
            const isLeft = item === 'left';
            
            return (
              // 💡 각 페이지가 화면 너비를 꽉 채우도록
              <View style={styles.pageContainer}>
                <Text style={styles.dualTitle}>{isLeft ? 'Left' : 'Right'}</Text>
                <View style={styles.imageContainer}>
                  <Image source={isLeft ? leftImageSource : rightImageSource} style={styles.image} resizeMode="contain" pointerEvents="none" />
                </View>
                <Slider
                  style={{ width: '100%', height: 40 }}
                  minimumValue={0} maximumValue={10} step={1}
                  value={isLeft ? scoreLeft : scoreRight}
                  onValueChange={isLeft ? setScoreLeft : setScoreRight}
                  minimumTrackTintColor="#34D399"
                  maximumTrackTintColor="#2E4B4F"
                  thumbTintColor="#FFFFFF"
                />
                <Text style={styles.scoreText}>{isLeft ? '좌' : '우'}: {isLeft ? scoreLeft : scoreRight} 점</Text>
              </View>
            );
          }}
        />
        
        {/* 💡 페이지 점(dot) 표시기 */}
        <View style={styles.paginationContainer}>
           <View style={[styles.paginationDot, currentPage === 0 && styles.paginationDotActive]} />
           <View style={[styles.paginationDot, currentPage === 1 && styles.paginationDotActive]} />
        </View>

        <TouchableOpacity style={styles.bottomButton} onPress={handleModalConfirm}>
          <Text style={styles.bottomButtonText}>확인</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <Text style={styles.scoreText}>알 수 없는 입력 타입입니다.</Text>;
};

// --- 커스텀 헤더 ---
const CustomHeader = ({ onBackPress }: { onBackPress: () => void }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBackPress} style={styles.headerButton}>
      <Ionicons name="arrow-back" size={24} color="white" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>ROMEX</Text>
    <Text style={styles.headerFlag}>🇰🇷</Text>
  </View>
);

// --- 메인 컴포넌트 ---
export default function TestInstructionsScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [results, setResults] = useState<{ left: number | null; right: number | null }[]>([]);

  const data = useMemo(() => {
    return TEST_DATA.find(d => d.step === currentStep);
  }, [currentStep]);

  const player = useVideoPlayer(data?.video, (player) => {
    player.loop = true;
    player.play();
  });

  useEffect(() => {
    if (data?.video) {
      player.replaceAsync(data.video); // 💡 replaceAsync -> replace
    }
  }, [currentStep, data, player]);

  const handleBack = () => {
    if (modalVisible) {
      setModalVisible(false);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleConfirm = (result: { left: number | null; right: number | null }) => {
    setResults(prevResults => [...prevResults, result]);
    setModalVisible(false);

    if (currentStep === TOTAL_TEST_STEPS) {
      const finalResults = [...results, result];
      const avgLeft = finalResults.reduce((acc, r) => acc + (r.left || 0), 0) / finalResults.length;
      
      router.replace({
        pathname: '/test/results', // 💡 results (s 붙음)
        params: { 
          scores: JSON.stringify(finalResults),
          average: Math.round(avgLeft) 
        }
      });
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  if (!data) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <CustomHeader onBackPress={handleBack} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      </SafeAreaView>
    );
  }

  const progress = `${(currentStep / TOTAL_TEST_STEPS) * 100}%`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader onBackPress={handleBack} />

      {/* --- 안내 화면 --- */}
      <View style={styles.container}>
        <View style={styles.progressBarContainer}><View style={[styles.progressBar, { width: progress }]} /></View>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.subtitle}>영상을 보고 다음 단계에서 똑같이 따라해 주세요.</Text>
        
        <TouchableOpacity activeOpacity={0.9} onPress={() => player.playing ? player.pause() : player.play()}>
          <VideoView player={player} style={styles.video} nativeControls={false} contentFit='contain'/>
        </TouchableOpacity>

        <Text style={styles.imageSubtitle}>{data.imageSubtitle}</Text>

        <View style={styles.instructionBox}>
          {data.instructions.map((item, index) => (
             <InstructionRow key={index} text={item.text} isGood={item.isGood} />
          ))}
        </View>

        <View style={styles.flexSpacer} />

        <TouchableOpacity style={styles.bottomButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.bottomButtonText}>계속</Text>
        </TouchableOpacity>
      </View>

      {/* --- 입력 모달 --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleBack}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.handleBar} />
            <TestInputModal 
              data={data} 
              onConfirm={handleConfirm} 
            />
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

// --- 3. 스타일 (스와이프 UI 스타일 추가) ---
const styles = StyleSheet.create({
  // ... (헤더, safeArea, container, progressBar, title, video, instructionBox 등 기존 스타일)
  
  // --- 💡 듀얼 UI 스타일 ---
  pageContainer: {
    // 💡 모달 패딩(20)을 뺀 화면 너비
    width: screenWidth - 40, 
    alignItems: 'center',
    paddingHorizontal:10,
  },
  dualTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageContainerSmall: { // 듀얼 모드일 때 작은 이미지 컨테이너 (사용 안함)
    // ...
  },
  modalLoadingContainer: {
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 💡 스와이프 페이지 표시기
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10, // 슬라이더와 점 사이 간격
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2E4B4F', // 비활성
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FFFFFF', // 활성
  },

  // --- 기존 스타일 ---
  imageContainer: { // 싱글 모드 (및 듀얼 모드) 이미지 컨테이너
    width: '100%',
    height: 250, 
    borderRadius: 16,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E4B4F',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  sliderContainer: {
    marginTop: 20, 
  },
  scoreText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1C2C35',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#2E4B4F',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerButton: { width: 30 },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerFlag: {
    fontSize: 24,
    width: 30,
  },
  safeArea: { flex: 1, backgroundColor: '#1C2C35' },
  container: { flex: 1, paddingHorizontal: 16 },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#2E4B4F',
    borderRadius: 3,
    marginTop: 10,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#34D399',
    borderRadius: 3,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginTop: 4,
  },
  video: { 
    width: '100%', 
    height: 200, 
    borderRadius: 16,
    marginTop: 20,
    backgroundColor: 'black' 
  },
  imageSubtitle: {
    color: 'white',
    textAlign: 'center',
    marginTop: 12,
  },
  instructionBox: {
    backgroundColor: '#2E4B4F',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  instructionText: {
    color: 'white',
    fontSize: 15,
    marginLeft: 12,
    flex: 1,
  },
  flexSpacer: {
    flex: 1,
  },
  bottomButton: {
    backgroundColor: '#E5E5E7',
    paddingVertical: 18,
    borderRadius: 99,
    alignItems: 'center',
    marginVertical: 20,
  },
  bottomButtonText: {
    color: '#1C2C35',
    fontSize: 18,
    fontWeight: 'bold',
  },
});