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
    images: {main : mainImageSet},
    inputType: 'single'
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
    images: {left:mainImageSet, right:mainImageSet}, // (임시)
    inputType: 'dual'
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
    images: {left:mainImageSet, right:mainImageSet}, // (임시)
    inputType: 'dual'
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
    images: {main:mainImageSet}, // (임시)
    inputType: 'single'
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
    images: {main:mainImageSet}, // (임시)
    inputType: 'single'
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
    images: {main:mainImageSet}, // (임시)
    inputType: 'single'
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
    images: {left:mainImageSet, right:mainImageSet}, // (임시)
    inputType: 'dual'
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
    images: {left:mainImageSet, right:mainImageSet}, // (임시)
    inputType: 'dual'
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
    images: {left:mainImageSet, right:mainImageSet}, // (임시)
    inputType: 'dual'
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
    images: {left:mainImageSet, right:mainImageSet}, // (임시)
    inputType: 'dual'
  },
];

export const Landmark_result = {
  uri : "file:///data/user/0/com.anonymous.romex/cache/ImagePicker/582df20b-d0cf-4503-b83f-9916659f2beb.jpeg",

  landmarks: [
    [
      {
        "z": -0.40576010942459106,
        "y": 0.11605846881866455,
        "x": 0.5217585563659668,
        "visibility": 0.9999648332595825
      },
      {
        "z": -0.3480069637298584,
        "y": 0.09986329078674316,
        "x": 0.537632405757904,
        "visibility": 0.9998575448989868
      },
      {
        "z": -0.34808775782585144,
        "y": 0.10028427839279175,
        "x": 0.5473142862319946,
        "visibility": 0.9998443126678467
      },
      {
        "z": -0.3479613959789276,
        "y": 0.10101264715194702,
        "x": 0.5582142472267151,
        "visibility": 0.9997794032096863
      },
      {
        "z": -0.3559749126434326,
        "y": 0.09843504428863525,
        "x": 0.5050380229949951,
        "visibility": 0.9999096393585205
      },
      {
        "z": -0.3559660315513611,
        "y": 0.09780862927436829,
        "x": 0.49311304092407227,
        "visibility": 0.9999185800552368
      },
      {
        "z": -0.3561226427555084,
        "y": 0.09751486778259277,
        "x": 0.4824643135070801,
        "visibility": 0.9999326467514038
      },
      {
        "z": -0.023886218667030334,
        "y": 0.10945668816566467,
        "x": 0.5697376132011414,
        "visibility": 0.9994816184043884
      },
      {
        "z": -0.0557689368724823,
        "y": 0.10600295662879944,
        "x": 0.4629378616809845,
        "visibility": 0.9999390840530396
      },
      {
        "z": -0.28547441959381104,
        "y": 0.13566237688064575,
        "x": 0.540122926235199,
        "visibility": 0.9998204112052917
      },
      {
        "z": -0.2952970862388611,
        "y": 0.1328737437725067,
        "x": 0.4977964162826538,
        "visibility": 0.9999376535415649
      },
      {
        "z": 0.06402748078107834,
        "y": 0.20982156693935394,
        "x": 0.6291380524635315,
        "visibility": 0.9980879426002502
      },
      {
        "z": 0.08124395459890366,
        "y": 0.21482686698436737,
        "x": 0.3864700198173523,
        "visibility": 0.9998284578323364
      },
      {
        "z": -0.47807469964027405,
        "y": 0.23128385841846466,
        "x": 0.6464298367500305,
        "visibility": 0.5792340040206909
      },
      {
        "z": 0.039729077368974686,
        "y": 0.3558608889579773,
        "x": 0.37730973958969116,
        "visibility": 0.911820113658905
      },
      {
        "z": -1.2403526306152344,
        "y": 0.15419480204582214,
        "x": 0.6083424687385559,
        "visibility": 0.5358403921127319
      },
      {
        "z": -0.1465558409690857,
        "y": 0.4780365228652954,
        "x": 0.38871103525161743,
        "visibility": 0.8282924294471741
      },
      {
        "z": -1.3823000192642212,
        "y": 0.1378074586391449,
        "x": 0.5970287919044495,
        "visibility": 0.5343713164329529
      },
      {
        "z": -0.19640855491161346,
        "y": 0.5136205554008484,
        "x": 0.38021790981292725,
        "visibility": 0.7360181212425232
      },
      {
        "z": -1.3762884140014648,
        "y": 0.1368195116519928,
        "x": 0.5977778434753418,
        "visibility": 0.5303249955177307
      },
      {
        "z": -0.27170294523239136,
        "y": 0.5173908472061157,
        "x": 0.38756996393203735,
        "visibility": 0.7463445663452148
      },
      {
        "z": -1.2641407251358032,
        "y": 0.14249807596206665,
        "x": 0.5916706919670105,
        "visibility": 0.5105969905853271
      },
      {
        "z": -0.17605814337730408,
        "y": 0.5080021023750305,
        "x": 0.3985569477081299,
        "visibility": 0.7281150817871094
      },
      {
        "z": -0.03341519460082054,
        "y": 0.47575804591178894,
        "x": 0.5957223176956177,
        "visibility": 0.9992259740829468
      },
      {
        "z": 0.03283272683620453,
        "y": 0.479053795337677,
        "x": 0.46547675132751465,
        "visibility": 0.9988355040550232
      },
      {
        "z": -0.17542336881160736,
        "y": 0.6838091611862183,
        "x": 0.5915535092353821,
        "visibility": 0.9483112692832947
      },
      {
        "z": -0.07537473738193512,
        "y": 0.68369060754776,
        "x": 0.4716145396232605,
        "visibility": 0.9518927335739136
      },
      {
        "z": 0.101195327937603,
        "y": 0.8998647332191467,
        "x": 0.5825272798538208,
        "visibility": 0.9447436928749084
      },
      {
        "z": 0.19698189198970795,
        "y": 0.8947018384933472,
        "x": 0.5055810213088989,
        "visibility": 0.927147388458252
      },
      {
        "z": 0.10464143007993698,
        "y": 0.9209752678871155,
        "x": 0.5898502469062805,
        "visibility": 0.426986962556839
      },
      {
        "z": 0.20291073620319366,
        "y": 0.9162110686302185,
        "x": 0.5131138563156128,
        "visibility": 0.5984728336334229
      },
      {
        "z": -0.3030279278755188,
        "y": 0.9596338272094727,
        "x": 0.5639347434043884,
        "visibility": 0.9209734797477722
      },
      {
        "z": -0.16676746308803558,
        "y": 0.9604300260543823,
        "x": 0.49125486612319946,
        "visibility": 0.9100923538208008
      }
    ]
  ]
}

export const TOTAL_TEST_STEPS = TEST_DATA.length;