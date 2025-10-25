// (app)/(test)/testData.ts
// 테스트에 필요한 모든 데이터를 정의합니다.

// --- 1. 비디오 에셋 ---
// 실제로는 10개의 다른 비디오가 필요하겠지만, 예시로 하나를 재사용합니다.
const mainVideo = require('../assets/mobility_test/mobility_test.mp4');

// --- 2. 이미지 에셋 ---
// 실제로는 10개의 다른 이미지 세트(각 10장)가 필요하겠지만, 예시로 하나를 재사용합니다.
const mainImageSet = [
  require('../assets/mobility_test/mobility_test_2.png'),
  require('../assets/mobility_test/mobility_test_1.png'),
  require('../assets/mobility_test/mobility_test_3.png'),
  require('../assets/mobility_test/mobility_test_4.png'),
  require('../assets/mobility_test/mobility_test_5.png'),
  require('../assets/mobility_test/mobility_test_6.png'),
  require('../assets/mobility_test/mobility_test_7.png'),
  require('../assets/mobility_test/mobility_test_8.png'),
  require('../assets/mobility_test/mobility_test_9.png'),
  require('../assets/mobility_test/mobility_test_10.png'),
];

// --- 3. 테스트 데이터 (10개) ---
export const TEST_DATA = [
  // 1단계
  {
    step: 1,
    title: '유연성 테스트 (허리)',
    video: mainVideo,
    imageSubtitle: '테스트 1/10 • 허리 유연성 테스트',
    instructions: [
      { text: '옆으로 눕습니다.', isGood: true },
      { text: '팔을 가슴 쪽으로 두고, 팔꿈치를 굽힙니다.', isGood: true },
      { text: '어깨를 바닥에 붙이고 유지합니다.', isGood: true },
      { text: '어깨를 바닥에서 들어올리지 마세요.', isGood: false },
    ],
    images: mainImageSet,
  },
  // 2단계
  {
    step: 2,
    title: '유연성 테스트 (어깨)',
    video: mainVideo, // (임시)
    imageSubtitle: '테스트 2/10 • 어깨 유연성 테스트',
    instructions: [
      { text: '팔을 위로 뻗습니다.', isGood: true },
      { text: '귀가 팔에 닿도록 합니다.', isGood: true },
      { text: '허리를 곧게 폅니다.', isGood: true },
      { text: '어깨가 올라가지 않도록 주의합니다.', isGood: false },
    ],
    images: mainImageSet, // (임시)
  },
  // 3단계
  {
    step: 3,
    title: '유연성 테스트 (발목)',
    video: mainVideo, // (임시)
    imageSubtitle: '테스트 3/10 • 발목 유연성 테스트',
    instructions: [
      { text: '벽을 마주보고 섭니다.', isGood: true },
      { text: '한쪽 발을 앞으로 내딛습니다.', isGood: true },
      { text: '뒤꿈치가 뜨지 않게 주의합니다.', isGood: false },
    ],
    images: mainImageSet, // (임시)
  },
  // 4단계
  {
    step: 4,
    title: '유연성 테스트 (고관절)',
    video: mainVideo, // (임시)
    imageSubtitle: '테스트 4/10 • 고관절 유연성 테스트',
    instructions: [
      { text: '바닥에 앉아 다리를 폅니다.', isGood: true },
      { text: '한쪽 다리를 반대편 무릎 위에 올립니다.', isGood: true },
    ],
    images: mainImageSet, // (임시)
  },
  // 5단계
  {
    step: 5,
    title: '유연성 테스트 (흉추)',
    video: mainVideo, // (임시)
    imageSubtitle: '테스트 5/10 • 흉추 유연성 테스트',
    instructions: [
      { text: '무릎을 꿇고 엎드립니다.', isGood: true },
      { text: '한쪽 손을 머리 뒤에 둡니다.', isGood: true },
      { text: '가슴을 활짝 엽니다.', isGood: true },
    ],
    images: mainImageSet, // (임시)
  },
  // 6단계
  {
    step: 6,
    title: '유연성 테스트 (햄스트링)',
    video: mainVideo, // (임시)
    imageSubtitle: '테스트 6/10 • 햄스트링 테스트',
    instructions: [
      { text: '바닥에 누워 한쪽 다리를 듭니다.', isGood: true },
      { text: '무릎이 굽혀지지 않게 주의합니다.', isGood: false },
    ],
    images: mainImageSet, // (임시)
  },
  // 7단계
  {
    step: 7,
    title: '유연성 테스트 (손목)',
    video: mainVideo, // (임시)
    imageSubtitle: '테스트 7/10 • 손목 유연성 테스트',
    instructions: [
      { text: '손바닥을 벽에 댑니다.', isGood: true },
      { text: '팔꿈치를 완전히 폅니다.', isGood: true },
    ],
    images: mainImageSet, // (임시)
  },
  // 8단계
  {
    step: 8,
    title: '유연성 테스트 (목)',
    video: mainVideo, // (임시)
    imageSubtitle: '테스트 8/10 • 목 유연성 테스트',
    instructions: [
      { text: '허리를 펴고 정면을 봅니다.', isGood: true },
      { text: '목을 천천히 옆으로 기울입니다.', isGood: true },
    ],
    images: mainImageSet, // (임시)
  },
  // 9단계
  {
    step: 9,
    title: '유연성 테스트 (내전근)',
    video: mainVideo, // (임시)
    imageSubtitle: '테스트 9/10 • 내전근 테스트',
    instructions: [
      { text: '다리를 넓게 벌리고 섭니다.', isGood: true },
      { text: '한쪽으로 무게중심을 이동합니다.', isGood: true },
    ],
    images: mainImageSet, // (임시)
  },
  // 10단계
  {
    step: 10,
    title: '유연성 테스트 (광배근)',
    video: mainVideo, // (임시)
    imageSubtitle: '테스트 10/10 • 광배근 테스트',
    instructions: [
      { text: '벽 모서리에 섭니다.', isGood: true },
      { text: '한쪽 팔을 뻗어 벽을 잡습니다.', isGood: true },
      { text: '가슴을 바닥 쪽으로 누릅니다.', isGood: true },
    ],
    images: mainImageSet, // (임시)
  },
];

export const TOTAL_TEST_STEPS = TEST_DATA.length;