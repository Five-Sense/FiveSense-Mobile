import { Minus, Plus } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { QuantityStepperButton } from './quantity-stepper-button';

export type QuantityStepperProps = {
  value: number;
  /** Recebe o novo valor, ja dentro de `min` e `max`. */
  onChange: (value: number) => void;
  /** Limite inferior. Padrao: 0. */
  min?: number;
  /** Limite superior. Padrao: 999 (limite de material na API, docs/data-model.md). */
  max?: number;
  /** Incremento por toque. Padrao: 1. */
  step?: number;
  /** Texto abaixo do valor. Padrao: "unidades". */
  unitLabel?: string;
  /** Nome acessivel do controle. Padrao: "Quantidade". */
  label?: string;
  disabled?: boolean;
};

/** Controle de quantidade: [-] valor [+]. Reutilizavel por materiais e ocorrencias. */
export function QuantityStepper({
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
  unitLabel = 'unidades',
  label = 'Quantidade',
  disabled = false,
}: QuantityStepperProps) {
  const decrease = () => onChange(Math.max(min, value - step));
  const increase = () => onChange(Math.min(max, value + step));

  return (
    <View
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={label}
      accessibilityValue={{ min, max, now: value, text: `${value} ${unitLabel}` }}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={`${value} ${unitLabel}`}
      aria-disabled={disabled}
      accessibilityState={{ disabled }}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={(event) => {
        if (disabled) return;
        if (event.nativeEvent.actionName === 'increment') increase();
        if (event.nativeEvent.actionName === 'decrement') decrease();
      }}
      className="w-full flex-row items-center justify-between gap-[8px] rounded-control border border-border-control bg-surface p-[8px]"
    >
      <QuantityStepperButton
        kind="decrease"
        icon={Minus}
        accessibilityLabel="Diminuir quantidade"
        disabled={disabled || value <= min}
        onPress={decrease}
      />

      <View className="min-h-[52px] shrink items-center justify-center" accessibilityLiveRegion="polite">
        <Text className="font-montserrat-semibold text-card text-text-primary">{value}</Text>
        <Text className="font-montserrat text-label text-text-secondary">{unitLabel}</Text>
      </View>

      <QuantityStepperButton
        kind="increase"
        icon={Plus}
        accessibilityLabel="Aumentar quantidade"
        disabled={disabled || value >= max}
        onPress={increase}
      />
    </View>
  );
}
