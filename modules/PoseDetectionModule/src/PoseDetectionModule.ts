import { NativeModule, requireNativeModule } from 'expo';

import { PoseDetectionModuleEvents } from './PoseDetectionModule.types';

declare class PoseDetectionModule extends NativeModule<PoseDetectionModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<PoseDetectionModule>('PoseDetectionModule');
