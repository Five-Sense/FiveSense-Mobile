import { Eye, EyeOff } from 'lucide-react-native';
import { styled } from 'nativewind';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Pressable, TextInput } from 'react-native';

import { Input, type InputProps } from './input';

const EyeIcon = styled(Eye, { className: { target: 'style', nativeStyleMapping: { color: 'color' } } });
const EyeOffIcon = styled(EyeOff, { className: { target: 'style', nativeStyleMapping: { color: 'color' } } });

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
  const Icon = visible ? EyeOffIcon : EyeIcon;
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
          <Icon
            size={24}
            strokeWidth={2}
            accessible={false}
            className={disabled ? 'text-disabled-text' : hasError ? 'text-error-text' : 'text-text-secondary'}
          />
        </Pressable>
      }
    />
  );
});
