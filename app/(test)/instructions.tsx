import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useAssets } from 'expo-asset';
import { router } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useEffect, useState } from 'react';
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
  const [score, setScore] = useState(1); // input.tsx의 점수 state

  // --- input.tsx의 useAssets 훅 ---
  const [assets, error] = useAssets(scoreImages);

  // 비디오의 재생 상태(재생/일시정지)가 변경될 때마다 isPlaying 상태를 업데이트합니다.
  useEffect(() => {
    const subscription = player.addListener('playingChange', (event) => {
      setIsPlaying(event.isPlaying);
    });
    return () => subscription.remove();
  }, [player]);

  // 모달의 '확인' 버튼 클릭 시
  const handleConfirm = () => {
    setModalVisible(false);
    // 점수 저장 로직...
    // 확인 후 테스트 스택 닫기 (대시보드로 돌아감)
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 헤더는 (test)/_layout.tsx에서 자동으로 렌더링되므로 
        여기서는 삭제해도 됩니다. (있어도 덮어쓰지 않음)
      */}
      <View style={styles.header}>
         <TouchableOpacity onPress={()=> router.replace('/(tabs)')}>
           <Ionicons name="arrow-back" size={24} color="white" />
         </TouchableOpacity>
         <Text style={styles.headerTitle}>ROMEX</Text>
         <Text style={styles.flag}>🇰🇷</Text>
       </View>

      {/* --- 1. instructions.tsx의 컨텐츠 --- */}
      <View style={styles.container}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '10%' }]} />
        </View>

        <Text style={styles.title}>유연성 테스트 (허리)</Text>
        <Text style={styles.subtitle}>영상을 보고 다음 단계에서 똑같이 따라해 주세요.</Text>

        {/* 비디오 터치 시 재생/일시정지를 위해 TouchableOpacity로 감쌉니다. */}
        {/* <TouchableOpacity activeOpacity={0.9} onPress={() => {isPlaying ? player.pause() : player.play()        }}> */}
          <VideoView player={player} style={styles.video} nativeControls={false} contentFit='contain'/>
        {/* </TouchableOpacity> */}


        <Text style={styles.imageSubtitle}>테스트 1/10 • 허리 유연성 테스트</Text>

        <View style={styles.instructionBox}>
          <InstructionRow text="옆으로 눕습니다." isGood={true} />
          <InstructionRow text="팔을 가슴 쪽으로 두고, 팔꿈치를 굽힙니다." isGood={true} />
          <InstructionRow text="어깨를 바닥에 붙이고 유지합니다." isGood={true} />
          <InstructionRow text="어깨를 바닥에서 들어올리지 마세요." isGood={false} />
        </View>

        <View style={styles.flexSpacer} />

        {/* --- "계속" 버튼은 이제 모달을 엽니다 --- */}
        <TouchableOpacity style={styles.bottomButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.bottomButtonText}>계속</Text>
        </TouchableOpacity>
      </View>

      {/* --- 2. input.tsx의 컨텐츠를 모달로 렌더링 --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.handleBar} />
            <Text style={styles.modalTitle}>결과를 입력하세요</Text>

            {/* --- input.tsx의 이미지 뷰어 --- */}
            <View style={styles.imageContainer}>
              {assets ? (
                <Image
                  source={scoreImages[score - 1]} // score 값(1~10)에 따라 이미지 변경
                  style={styles.image}
                  resizeMode="contain"
                />
              ) : (
                <ActivityIndicator size="large" color="#FFFFFF" />
              )}
            </View>

            {/* --- input.tsx의 슬라이더 --- */}
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
                허리 유연성 테스트 : {score} 점
              </Text>
            </View>

            {/* --- input.tsx의 "확인" 버튼 --- */}
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