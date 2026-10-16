import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LoginBrand } from './login-brand';

export function LoginLayout({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-page">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <View className="flex-1 items-center justify-center gap-[64px] px-[16px] py-[32px]">
          <LoginBrand />
          <View className="w-full max-w-[440px] gap-[24px] rounded-card bg-surface p-[24px] sm:p-[32px]">
            <View className="gap-[8px]">
              <Text accessibilityRole="header" className="font-montserrat-semibold text-auth text-text-primary">Bem-vindo de volta</Text>
              <Text className="font-montserrat text-body text-text-secondary">Acesse sua conta para organizar materiais, equipes e a rotina do 5S.</Text>
            </View>
            {children}
            <View pointerEvents="none" className="absolute inset-0 rounded-card border border-border-subtle" />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
