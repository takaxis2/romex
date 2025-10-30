import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './PoseDetectionModule.types';

type PoseDetectionModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class PoseDetectionModule extends NativeModule<PoseDetectionModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(PoseDetectionModule, 'PoseDetectionModule');
