import { create } from 'zustand';

// 1. 테스트 결과의 타입 정의
export type TestResult = {
  step: number;
  title: string;
  left: number | null;
  right: number | null;
};

// 2. 스토어의 상태(State)와 액션(Action) 인터페이스
interface TestStoreState {
  results: TestResult[];
  addResult: (result: TestResult) => void;
  clearResults: () => void;
}

// 3. 스토어 훅(hook) 생성
export const useTestStore = create<TestStoreState>((set) => ({
  // 상태
  results: [],
  
  // 액션
  addResult: (result) => 
    set((state) => ({ 
      results: [...state.results, result] 
    })),
    
  clearResults: () => 
    set({ results: [] }),
}));