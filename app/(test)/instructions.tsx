import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useAssets } from 'expo-asset';
import { router } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
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
// --- input.tsx에서 가져온 이미지 에셋 ---

const scoreImages = [
  require('../../assets/mobility_test/mobility_test_1.png'),
  require('../../assets/mobility_test/mobility_test_2.png'),
  require('../../assets/mobility_test/mobility_test_3.png'),
  require('../../assets/mobility_test/mobility_test_4.png'),
  require('../../assets/mobility_test/mobility_test_5.png'),
  require('../../assets/mobility_test/mobility_test_6.png'),
  require('../../assets/mobility_test/mobility_test_7.png'),
  require('../../assets/mobility_test/mobility_test_8.png'),
  require('../../assets/mobility_test/mobility_test_9.png'),
  require('../../assets/mobility_test/mobility_test_10.png'),
];

// 재사용 가능한 안내 줄 컴포넌트
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

export default function TestInstructionsScreen() {
  // --- instructions.tsx의 useVideoPlayer 훅 ---
  const player = useVideoPlayer(
    require('../../assets/mobility_test/mobility_test.mp4'),
    (player) => {
      player.loop = true;
      player.play();
    }
  );

  // --- Modal 및 점수 상태 추가 ---
  const [modalVisible, setModalVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(player.playing);
  const [currentStep, setCurrentStep] = useState(1); // 현재 테스트 단계 (1, 2, ...)
  const [score, setScore] = useState(1); // input.tsx의 점수 state

  // --- input.tsx의 useAssets 훅 ---
  const [assets, error] = useAssets(scoreImages);

  // --- 2. 현재 스텝에 맞는 데이터 및 에셋 로드 ---
  const data = useMemo(() => {
    return TEST_DATA.find(d => d.step === currentStep);
  }, [currentStep]);

  // 비디오의 재생 상태(재생/일시정지)가 변경될 때마다 isPlaying 상태를 업데이트합니다.
  useEffect(() => {
    const subscription = player.addListener('playingChange', (event) => {
      setIsPlaying(event.isPlaying);
    });
    return () => subscription.remove();
  }, [player]);

  // 스텝이 바뀔 때 비디오 소스도 변경
  useEffect(() => {
    player.replaceAsync(data?.video);
  }, [currentStep, data?.video, player]);

  // 커스텀 뒤로가기 로직 (핵심)
  const handleBack = () => {
    if (modalVisible) {
      // 모달이 열려있으면 모달만 닫음 (input -> instruction)
      setModalVisible(false);
    } else if (currentStep > 1) {
      // 1단계가 아니면 이전 스텝으로 (Test 2 -> Test 1)
      setCurrentStep(currentStep - 1);
    } else {
      // 1단계면 스택 종료 (Test 1 -> Dashboard)
      router.back();
    }
  };

  // 💡 모달 "확인" 버튼 로직 (핵심)
  const handleConfirm = () => {
    // TODO: currentStep과 score를 저장하는 로직
    console.log(`Step ${currentStep} Score: ${score}`);
    
    setModalVisible(false); // 모달 닫기
    setScore(1); // 점수 리셋

    if (currentStep === TOTAL_TEST_STEPS) {
      // 마지막 스텝이면 스택 결과 화면
      router.replace('/(test)/result');
    } else {
      // 다음 스텝으로 이동
      setCurrentStep(currentStep + 1);
    }
  };

  // 데이터 로딩 중... (안전 장치)
  if (!data || !assets) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
         <TouchableOpacity onPress={handleBack}>
           <Ionicons name="arrow-back" size={24} color="white" />
         </TouchableOpacity>
         <Text style={styles.headerTitle}>ROMEX</Text>
         <Text style={styles.flag}>🇰🇷</Text>
       </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      </SafeAreaView>
    );
  }

  // 프로그레스 바 계산
  const progress = `${(currentStep / TOTAL_TEST_STEPS) * 100}%`;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 헤더는 (test)/_layout.tsx에서 자동으로 렌더링되므로 
        여기서는 삭제해도 됩니다. (있어도 덮어쓰지 않음)
      */}
      <View style={styles.header}>
         <TouchableOpacity onPress={handleBack}>
           <Ionicons name="arrow-back" size={24} color="white" />
         </TouchableOpacity>
         <Text style={styles.headerTitle}>ROMEX</Text>
         <Text style={styles.flag}>🇰🇷</Text>
       </View>

      {/* --- 1. instructions.tsx의 컨텐츠 (데이터 동적 바인딩) --- */}
      <View style={styles.container}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: progress }]} />
        </View>

        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.subtitle}>영상을 보고 다음 단계에서 똑같이 따라해 주세요.</Text>

        <TouchableOpacity activeOpacity={0.9}>
          <VideoView player={player} style={styles.video} nativeControls={false} contentFit='contain'/>
        </TouchableOpacity>

        <Text style={styles.imageSubtitle}>{data.imageSubtitle}</Text>

        <View style={styles.instructionBox}>
          {data.instructions.map((item, index) => (
             <InstructionRow key={index} text={item.text} isGood={item.isGood} />
          ))}
        </View>

        <View style={styles.flexSpacer} />

        {/* --- "계속" 버튼 (모달 열기) --- */}
        <TouchableOpacity style={styles.bottomButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.bottomButtonText}>계속</Text>
        </TouchableOpacity>
      </View>

      {/* --- 2. input.tsx의 컨텐츠를 모달로 렌더링 --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleBack} // 💡 안드로이드 뒤로가기 = handleBack
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.handleBar} />
            <Text style={styles.modalTitle}>결과를 입력하세요</Text>

            <View style={styles.imageContainer}>
              <Image
                source={assets[score - 1]} // assets는 data.images를 기반으로 로드됨
                style={styles.image}
                resizeMode="contain"
              />
            </View>

            <View style={styles.sliderContainer}>
              <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={1}
                maximumValue={10}
                step={1}
                value={score}
                onValueChange={setScore}
                minimumTrackTintColor="#34D399"
                maximumTrackTintColor="#2E4B4F"
                thumbTintColor="#FFFFFF"
              />
              <Text style={styles.scoreText}>
                {data.title} : {score} 점
              </Text>
            </View>

            {/* 💡 "확인" 버튼 (confirm 로직 연결) */}
            <TouchableOpacity style={styles.bottomButton} onPress={handleConfirm}>
              <Text style={styles.bottomButtonText}>확인</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

// --- 3. 두 파일의 스타일을 합칩니다 ---
const styles = StyleSheet.create({
  // --- instructions.tsx 스타일 ---
  safeArea: { flex: 1, backgroundColor: '#1C2C35' },
  container: { flex: 1, paddingHorizontal: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  flag: {
    fontSize: 24,
  },
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
    height: 200, // input.tsx의 imageContainer 높이와 맞추기 위해 조절
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

  // --- input.tsx 스타일 (모달용) ---
  imageContainer: {
    width: '100%',
    height: 250, // 모달 내 이미지 높이 조절
    borderRadius: 16,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E4B4F',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  sliderContainer: {
    marginTop: 20, // 슬라이더와 이미지 사이 간격
  },
  scoreText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
  },

  // --- 모달 전용 스타일 ---
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
});