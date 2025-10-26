const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for transformers library
config.resolver.alias = {
  ...config.resolver.alias,
  // Add any specific aliases if needed
};

// Ensure proper handling of node modules
config.resolver.nodeModulesPaths = [
  ...config.resolver.nodeModulesPaths,
  './node_modules',
];

// Add support for additional file extensions if needed
config.resolver.sourceExts = [
  ...config.resolver.sourceExts,
  'mjs',
];

// Treat ONNX models as assets so require('...onnx') works
config.resolver.assetExts = [...config.resolver.assetExts, 'onnx', 'ort', 'ortx'];

module.exports = config;