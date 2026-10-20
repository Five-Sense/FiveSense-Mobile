import { ArrowRight } from 'lucide-react-native';
import { useRef } from 'react';
import { TextInput, View } from 'react-native';

import { Alert } from '@/shared/components/feedback/alert';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { PasswordInput } from '@/shared/components/ui/password-input';

import type { LoginFeedback, LoginValues } from '../../types/login-form';

type LoginFormProps = {
  values: LoginValues;
  feedback: LoginFeedback | null;
  loading: boolean;
  connected: boolean;
  onChange: (field: keyof LoginValues, value: string) => void;
  onSubmit: () => void;
};

export function LoginForm({
  values, feedback, loading, connected, onChange, onSubmit,
}: LoginFormProps) {
  const passwordRef = useRef<TextInput>(null);
  const blocked = loading || connected;
  const hint = feedback?.variant === 'error' ? `${feedback.title} ${feedback.description}` : undefined;

  return (
    <View className="gap-[24px]">
      <View className="gap-[24px] py-[8px]">
        {feedback ? <Alert variant={feedback.variant} title={feedback.title} description={feedback.description} /> : null}
        <Input
          label="Nome de usuário"
          required
          value={values.identifier}
          onChangeText={(value) => onChange('identifier', value)}
          placeholder="Seu nome de usuário"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="username"
          textContentType="username"
          keyboardType="default"
          inputMode="text"
          maxLength={255}
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => passwordRef.current?.focus()}
          readOnly={blocked}
          error={feedback?.fields.includes('identifier')}
          accessibilityHint={feedback?.fields.includes('identifier') ? hint : undefined}
        />
        <PasswordInput
          ref={passwordRef}
          label="Senha"
          required
          value={values.password}
          onChangeText={(value) => onChange('password', value)}
          placeholder="••••••••"
          maxLength={255}
          returnKeyType="go"
          submitBehavior="submit"
          onSubmitEditing={onSubmit}
          readOnly={blocked}
          error={feedback?.fields.includes('password')}
          accessibilityHint={feedback?.fields.includes('password') ? hint : undefined}
        />
      </View>
      <Button onPress={onSubmit} loading={loading} disabled={connected} loadingLabel="Entrando..." icon={ArrowRight} iconPosition="end" iconSize={32}>
        {connected ? 'Conectado' : 'Login'}
      </Button>
    </View>
  );
}
