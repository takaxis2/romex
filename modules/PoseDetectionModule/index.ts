// Reexport the native module. On web, it will be resolved to PoseDetectionModule.web.ts
// and on native platforms to PoseDetectionModule.ts
export { default } from './src/PoseDetectionModule';
export { default as PoseDetectionModuleView } from './src/PoseDetectionModuleView';
export * from  './src/PoseDetectionModule.types';
