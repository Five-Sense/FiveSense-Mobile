import { Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import '@/global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({ Montserrat_400Regular, Montserrat_600SemiBold });
  const ready = fontsLoaded || fontError !== null;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
