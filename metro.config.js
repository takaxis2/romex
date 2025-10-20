// metro.config.js

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 1. SVG를 변환하기 위한 트랜스포머 설정
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');

// 2. Metro가 SVG 파일을 asset(자산)으로 취급하지 않도록 설정
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');

// 3. Metro가 SVG를 소스 코드로 인식하도록 확장자 목록에 추가
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg'];

module.exports = config;