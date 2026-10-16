import { forwardRef, useId, useImperativeHandle, useRef, useState, type ReactNode } from 'react';
import { Platform, Text, TextInput, View, type TextInputProps } from 'react-native';

export type InputProps = Omit<TextInputProps, 'multiline'> & {
  label: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  containerClassName?: string;
  endAdornment?: ReactNode;
  isFocused?: boolean;
};

/** Single-line field. Validation belongs to the caller; error state displays a red border. */
export const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    label,
    required = false,
    error = false,
    helperText,
    disabled = false,
    readOnly = false,
    editable = true,
    containerClassName = '',
    className = '',
    endAdornment,
    isFocused,
    nativeID,
    onFocus,
    onBlur,
    accessibilityLabel,
    accessibilityHint,
    accessibilityState,
    ...props
  },
  ref,
) {
  const generatedId = useId();
  const id = nativeID ?? `input-${generatedId}`;
  const messageId = `${id}-message`;
  const inputRef = useRef<TextInput>(null);
  const [internalFocused, setInternalFocused] = useState(false);
  const isEffectivelyFocused = isFocused ?? internalFocused;
  const hasError = Boolean(error);
  const isReadOnly = readOnly || !editable;

  useImperativeHandle(ref, () => inputRef.current!, []);

  const borderColor = disabled
    ? 'border-border-subtle'
    : hasError
      ? 'border-error-text'
      : isEffectivelyFocused
        ? 'border-focus-ring'
        : 'border-border-control';

  const displayLabel = label.endsWith('*')
    ? label
    : `${label}${required ? ' *' : ' (Opcional)'}`;

  return (
    <View className={`w-full gap-2 ${containerClassName}`}>
      <Text
        nativeID={`${id}-label`}
        className="font-montserrat-semibold text-label text-text-primary"
        onPress={disabled ? undefined : () => inputRef.current?.focus()}>
        {displayLabel}
      </Text>
      <View
        className={`relative min-h-control flex-row items-center rounded-control ${
          disabled ? 'bg-disabled-bg' : isReadOnly ? 'bg-surface-subtle' : 'bg-surface'
        }`}>
        <TextInput
          {...props}
          ref={inputRef}
          nativeID={id}
          multiline={false}
          readOnly={isReadOnly}
          editable={!disabled && !isReadOnly}
          accessibilityLabel={accessibilityLabel ?? `${label}${required ? ', obrigatório' : ', opcional'}`}
          accessibilityLabelledBy={`${id}-label`}
          accessibilityHint={[accessibilityHint, helperText].filter(Boolean).join('. ') || undefined}
          accessibilityState={{ ...accessibilityState, disabled }}
          aria-invalid={hasError}
          {...(Platform.OS === 'web'
            ? { 'aria-required': required, 'aria-describedby': helperText ? messageId : undefined }
            : {})}
          className={`min-h-control min-w-0 flex-1 rounded-control px-4 py-3 font-montserrat text-body placeholder:text-text-muted web:outline-none ${
            disabled ? 'text-disabled-text' : 'text-text-primary'
          } ${className}`}
          onFocus={(event) => {
            setInternalFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setInternalFocused(false);
            onBlur?.(event);
          }}
        />
        {endAdornment}
        {/* Overlay keeps text, icon and outer dimensions stable when the border thickens. */}
        <View
          pointerEvents="none"
          className={`absolute inset-0 rounded-control ${borderColor} ${
            isEffectivelyFocused && !disabled ? 'border-2' : 'border'
          }`}
        />
      </View>
      {helperText ? (
        <Text
          nativeID={messageId}
          className="font-montserrat text-helper text-text-secondary">
          {helperText}
        </Text>
      ) : null}
    </View>
  );
});

export { PasswordInput, type PasswordInputProps } from './password-input';

