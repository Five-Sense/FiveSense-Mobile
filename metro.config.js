const { getDefaultConfig } = require('expo/metro-config');
const { withNativewind } = require('nativewind/metro');

<<<<<<< HEAD
=======
/** @type {import('expo/metro-config').MetroConfig} */
>>>>>>> 52016a1fb1b704c345a9e3643ae404a127dd013e
const config = getDefaultConfig(__dirname);

module.exports = withNativewind(config);
