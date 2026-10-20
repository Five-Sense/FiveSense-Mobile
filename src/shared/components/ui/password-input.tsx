import { Eye, EyeOff } from 'lucide-react-native';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';

import { Icon } from './icon';
import { Input, type InputProps } from './input-base';


export type PasswordInputProps = Omit<
  InputProps,
  'secureTextEntry' | 'endAdornment' | 'keyboardType' | 'inputMode' | 'autoCorrect' | 'autoCapitalize'
>;

export const PasswordInput = forwardRef<TextInput, PasswordInputProps>(function PasswordInput(
  { disabled = false, error, isFocused, ...props },
  ref,
) {
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<TextInput>(null);
  useImperativeHandle(ref, () => inputRef.current!, []);

  const hasError = Boolean(error);

  return (
    <Input
      autoComplete="current-password"
      textContentType="password"
      {...props}
      ref={inputRef}
      disabled={disabled}
      error={error}
      isFocused={isFocused}
      autoCapitalize="none"
      autoCorrect={false}
      secureTextEntry={!visible}
      endAdornment={
        <Pressable
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel={visible ? 'Ocultar senha' : 'Mostrar senha'}
          accessibilityState={{ disabled }}
          className="min-h-control w-control items-center justify-center rounded-control focus:border-2 focus:border-focus-ring web:focus:outline-none"
          onPress={() => {
            setVisible((current) => !current);
            inputRef.current?.focus();
          }}>
          <View accessible={false} importantForAccessibility="no-hide-descendants">
          <Icon
            icon={visible ? EyeOff : Eye}            size={24}
            className={disabled ? 'text-disabled-text' : hasError ? 'text-error-text' : 'text-text-secondary'}
          />
          </View>
        </Pressable>
      }
    />
  );
});
