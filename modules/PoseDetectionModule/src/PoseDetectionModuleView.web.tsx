import * as React from 'react';

import { PoseDetectionModuleViewProps } from './PoseDetectionModule.types';

export default function PoseDetectionModuleView(props: PoseDetectionModuleViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
