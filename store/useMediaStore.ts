import { create } from 'zustand';

// 1. 데이터 타입 정의
// (PoseVisualizer가 사용하는 구조에 맞추되,
//  사용자님의 요청대로 landmark[] 배열을 포함시킵니다)

// 랜드마크 33개 중 1개의 타입
interface PoseLandmark {
  x: number;
  y: number;
  z: number;
}

// MediaPipe 처리 결과 데이터의 타입
export interface ProcessedData {
  uri: string;
  poseResult: {
    // MediaPipe는 여러 사람을 감지할 수 있으므로 2차원 배열
    landmarks: PoseLandmark[][]; 
  } | null;
}

// 2. 스토어의 상태(State)와 액션(Action) 인터페이스
interface MediaStoreState {
  results: ProcessedData[];
  setResults: (data: ProcessedData[]) => void;
  clearResults: () => void;
}

// 3. 스토어 훅(hook) 생성
export const useMediaStore = create<MediaStoreState>((set) => ({
  // 상태
  results: [],
  
  // 액션
  setResults: (data) => set({ results: data }),
  clearResults: () => set({ results: [] }),
}));