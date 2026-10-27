const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// No nativo o compilador assume 1rem = 14px; na web 1rem = 16px. Fixar 16 aqui iguala os dois
// (breakpoints sm/md em 640/768, text-lg em 18, rounded-xl em 12). Vale so para o nativo: o CSS da web
// nao passa por este compilador.
module.exports = withNativewind(config, { inlineRem: 16 });
