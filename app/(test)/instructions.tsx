import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator, // ⬅️ 1. FlatList import
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TEST_DATA, TOTAL_TEST_STEPS } from '../../data/testData';
import { useTestStore } from '../../store/useTestStore';

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
  // 0점(중립)부터 시작
  const [score, setScore] = useState(0); 
  const [scoreLeft, setScoreLeft] = useState(0); 
  const [scoreRight, setScoreRight] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  // 💡 스와이프 페이지 상태 (0: Left, 1: Right)
  const [currentPage, setCurrentPage] = useState(0); 

  // 💡 제스처 충돌 해결
  const [isSliderActive, setIsSliderActive] = useState(false);

  // const imageAssetsToLoad = useMemo(() => {
  //   if (data.inputType === 'single') {
  //     return (data.images as { main: any[] }).main;
  //   }
  //   if (data.inputType === 'dual') {
  //     const images = data.images as { left: any[]; right: any[] };
  //     return [...images.left, ...images.right];
  //   }
  //   return [];
  // }, [data]);

  // const [assets] = useAssets(imageAssetsToLoad);

  // 스텝이 바뀌면(data가 바뀌면) 모달의 점수도 0으로 리셋
  useEffect(() => {
    setScore(0);
    setScoreLeft(0);
    setScoreRight(0);
    setCurrentPage(0);
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ animated: false, index: 0 });
    }
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

  // if (!assets) {
  //   return <View style={styles.modalLoadingContainer}><ActivityIndicator size="large" /></View>;
  // }

  // --- 1. 싱글 슬라이더 UI (0-10점) ---
  if (data.inputType === 'single') {
    // 💡 5. 올바른 데이터 구조 (data.images.main)에서 동적으로 최대값과 이미지 URI를 가져옴
    // const images = (data.images as { main: string[] }).main;
    const images = data.images as string[];
    const maxScore = images.length - 1; // 0 ~ (length - 1)
    const imageUri = images[score];
    
    return (
      <View style={styles.modalInnerContent}>
        <Text style={styles.modalTitle}>결과를 입력하세요</Text>
        <View style={styles.imageContainer}>
          {/* 💡 6. Image source에 uri 직접 전달 */}
          <Image source={{ uri: imageUri }} style={styles.image} contentFit='contain' />
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0} 
            maximumValue={maxScore} // 💡 동적 최대값
            step={1}
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
    
    // 💡 7. 올바른 데이터 구조 (data.images) 사용
    const images = data.images as string[];

    const maxScoreLeft = images.length - 1;
    const maxScoreRight = images.length - 1;
  
    // 💡 8. URL을 직접 사용
    const leftImageUri = images[scoreLeft]; 
    const rightImageUri = images[scoreRight];

    return (<View style={styles.modalInnerContent}>
        <Text style={styles.modalTitle}>결과를 입력하세요</Text>
        
        <FlatList
          ref={flatListRef}
          data={pages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          // 💡 9. 제스처 충돌 해결
          scrollEnabled={!isSliderActive}
          renderItem={({ item }) => {
            const isLeft = item === 'left';
            return (
              <View style={styles.pageContainer}>
                <Text style={styles.dualTitle}>{isLeft ? 'Left' : 'Right'}</Text>
                <View style={styles.imageContainer}>
                  {/* 💡 10. Image source에 uri 직접 전달 및 'Right'일 때 좌우 반전 */}
                  <Image 
                    source={{ uri: isLeft ? leftImageUri : rightImageUri }} 
                    style={[styles.image, !isLeft && styles.imageFlipped]} // ⬅️ 좌우 반전
                    contentFit="contain" 
                  />
                </View>
                <Slider
                  style={{ width: '100%', height: 40 }}
                  minimumValue={0} 
                  maximumValue={isLeft ? maxScoreLeft : maxScoreRight} 
                  step={1}
                  value={isLeft ? scoreLeft : scoreRight}
                  onValueChange={isLeft ? setScoreLeft : setScoreRight}
                  minimumTrackTintColor="#34D399"
                  maximumTrackTintColor="#2E4B4F"
                  thumbTintColor="#FFFFFF"
                  // 💡 11. 제스처 충돌 해결
                  onSlidingStart={() => setIsSliderActive(true)}
                  onSlidingComplete={() => setIsSliderActive(false)}
                />
                <Text style={styles.scoreText}>{isLeft ? '좌' : '우'}: {isLeft ? scoreLeft : scoreRight} 점</Text>
              </View>
            );
          }}
          style={styles.flatList}
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
  // const [results, setResults] = useState<{ left: number | null; right: number | null }[]>([]);

  const addResult = useTestStore((state) => state.addResult);
  const clearResults = useTestStore((state) => state.clearResults);

  const data = useMemo(() => {
    return TEST_DATA.find(d => d.step === currentStep);
  }, [currentStep]);

  // 💡 5. (신규) 화면 마운트 시 모든 테스트 이미지 pre-fetch
  useEffect(() => {
    // 이 useEffect는 화면이 처음 마운트될 때 한 번만 실행됩니다.
    console.log('[ImagePrefetch] 테스트 이미지 사전 로드를 시작합니다...');
    
    // 1. testData에서 모든 이미지 URL 수집
    //  inputType에 상관없이 'images' 배열을 펼쳐서 합칩니다.
    const allImageUrls: string[] = TEST_DATA.flatMap(test => 
      test.images as string[]
    );

    // 2. 유효한 URL만 필터링 (http/https)
    const validUrls = allImageUrls.filter(url => url && url.startsWith('http'));

    // 3. expo-image로 prefetch 실행
    Image.prefetch(validUrls)
      .then(() => {
        console.log(`[ImagePrefetch] ${validUrls.length}개의 이미지 로드 완료.`);
      })
      .catch(e => {
        console.warn('[ImagePrefetch] 이미지 로드 실패:', e);
      });

  }, []);

  const player = useVideoPlayer(data!.video, (player) => {
    player.loop = true;
    player.play();
  });

  useEffect(() => {
    if (data?.video) {
      console.log(data.video)
      player.replaceAsync(data.video); // 💡 replaceAsync -> replace
    }
  }, [currentStep, data, player]);

  const handleBack = () => {
    if (modalVisible) {
      setModalVisible(false);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      clearResults();
      router.back();
    }
  };

  const handleConfirm = (result: { left: number | null; right: number | null }) => {
    // setResults(prevResults => [...prevResults, result]);
    addResult({
      step: currentStep,
      title: data!.title, // ⬅️ 나중에 결과 화면에서 제목을 쓰기 위해 함께 저장
      ...result,
    });
    setModalVisible(false);

    if (currentStep === TOTAL_TEST_STEPS) {
      // const finalResults = [...results, result];
      // const avgLeft = finalResults.reduce((acc, r) => acc + (r.left || 0), 0) / finalResults.length;
      
      router.replace({
        pathname: '/(test)/results', // 💡 results (s 붙음)
        // params: { 
        //   scores: JSON.stringify(finalResults),
        //   average: Math.round(avgLeft) 
        // }
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
              key={data.step}
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
  // 💡 헤더 스타일
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
  
  // 💡 모달 내부 컨텐츠 (패딩 적용)
  modalInnerContent: { 
    width: '100%',
    paddingHorizontal: 20, 
  },
  // 💡 FlatList 스타일
  flatList: {
    height: 400, // (이미지 + 슬라이더 + 텍스트 높이)
  },
  // 💡 스와이프 페이지 컨테이너 스타일
  pageContainer: {
    width: screenWidth - 40, // ⬅️ 각 페이지 너비 = 화면 너비 - (양쪽 패딩)
    alignItems: 'center',
  },
  dualTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalLoadingContainer: {
    height: 450, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 💡 스와이프 페이지 표시기
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10, 
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2E4B4F', 
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FFFFFF', 
  },
  // --- 기존 스타일 ---
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
    marginHorizontal: 20, // ⬅️ 모달 내부 버튼용
  },
  bottomButtonText: {
    color: '#1C2C35',
    fontSize: 18,
    fontWeight: 'bold',
  },
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
  // 💡 18. 좌우 반전 스타일 추가
  imageFlipped: {
    transform: [{ scaleX: -1 }],
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
    paddingHorizontal: 20,
  },
});