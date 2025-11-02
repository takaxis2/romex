import { NativeModule, requireNativeModule } from 'expo';

import { PoseDetectionModuleEvents } from './PoseDetectionModule.types';


export interface Landmark {
  x: number;
  y: number;
  z: number;
  visibility: number;
}

export interface PoseResult {
  landmarks: Landmark[][]; // [사람1의 랜드마크 배열, 사람2의 랜드마크 배열, ...]
}

declare class PoseDetectionModule extends NativeModule<PoseDetectionModuleEvents> {
  detectPoseFromFile(path:string) : PoseResult
}

// This call loads the native module object from the JSI.
export default requireNativeModule<PoseDetectionModule>('PoseDetectionModule');
