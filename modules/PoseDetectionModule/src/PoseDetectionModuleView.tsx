import { requireNativeView } from 'expo';
import * as React from 'react';

import { PoseDetectionModuleViewProps } from './PoseDetectionModule.types';

const NativeView: React.ComponentType<PoseDetectionModuleViewProps> =
  requireNativeView('PoseDetectionModule');

export default function PoseDetectionModuleView(props: PoseDetectionModuleViewProps) {
  return <NativeView {...props} />;
}
