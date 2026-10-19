import { Check, ChevronDown, ChevronUp, CircleAlert } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';

import { Button } from '../button';
import { Icon } from '../icon';
import { Spinner } from '../spinner';

export type SelectOption<T extends string | number> = {
  /** Valor devolvido em `onChange`. */
  value: T;
  /** Texto exibido na lista e no campo. */
  label: string;
  disabled?: boolean;
};

export type SelectProps<T extends string | number> = {
  /** Rotulo persistente acima do campo. */
  label: string;
  options: SelectOption<T>[];
  /** Valor selecionado; `null` quando nada foi escolhido. */
  value: T | null;
  onChange: (value: T) => void;
  /** Exemplo mostrado enquanto nada esta selecionado. */
  placeholder?: string;
  /** Acrescenta "*" ao rotulo. */
  required?: boolean;
  /** Acrescenta "(Opcional)" ao rotulo. */
  optional?: boolean;
  helperText?: string;
  valueTextSize?: 'body' | 'helper';
  /** Mensagem de validacao, exibida abaixo do campo com icone. */
  error?: string;
  disabled?: boolean;
  /** Mostra "Carregando..." no lugar das opcoes. */
  loading?: boolean;
  /** Mensagem quando as opcoes nao puderam ser carregadas. Com `onRetry`, mostra "Tentar novamente". */
  loadError?: string;
  onRetry?: () => void;
  /** Texto quando a lista nao tem opcoes. */
  emptyMessage?: string;
};

type Anchor = { x: number; y: number; width: number; height: number };

// docs/design-guidelines.md: menu com no maximo 320 de altura e rolagem.
const MENU_MAX_HEIGHT = 320;
const MENU_PADDING = 8;
const MENU_GAP = 4;
const SCREEN_MARGIN = 16;
const MIN_SPACE_BELOW = 160;

const FOCUS_RING = 'outline-solid outline-2 outline-offset-2 outline-focus-ring';
const FIELD_BASE =
  'min-h-control flex-row items-center justify-between gap-[8px] rounded-control bg-surface';

function fieldClasses(state: { open: boolean; error: boolean; disabled: boolean }) {
  if (state.disabled) return `${FIELD_BASE} px-[16px] border border-border-subtle bg-disabled-bg`;
  // Borda de 2 px no aberto: padding menor para o conteudo nao se mover.
  if (state.open) return `${FIELD_BASE} px-[15px] border-2 border-brand-action`;
  if (state.error) return `${FIELD_BASE} px-[16px] border border-error-border`;
  return `${FIELD_BASE} px-[16px] border border-border-control`;
}

export function Select<T extends string | number>({
  label,
  options,
  value,
  onChange,
  placeholder = 'Selecione',
  required = false,
  optional = false,
  helperText,
  valueTextSize = 'body',
  error,
  disabled = false,
  loading = false,
  loadError,
  onRetry,
  emptyMessage = 'Nenhuma opção disponível',
}: SelectProps<T>) {
  const fieldRef = useRef<View>(null);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const { height: windowHeight } = useWindowDimensions();

  const selected = options.find((option) => option.value === value) ?? null;
  const fullLabel = `${label}${required ? ' *' : ''}${optional ? ' (Opcional)' : ''}`;

  function openMenu() {
    if (disabled) return;
    fieldRef.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ x, y, width, height });
      setOpen(true);
    });
  }

  function closeMenu() {
    setOpen(false);
  }

  function handleSelect(option: SelectOption<T>) {
    if (option.disabled) return;
    onChange(option.value);
    closeMenu();
  }

  // Abre abaixo do campo; sem espaco suficiente, abre acima.
  let menuPosition = { top: 0 } as { top?: number; bottom?: number };
  let menuMaxHeight = MENU_MAX_HEIGHT;
  if (anchor) {
    const below = windowHeight - (anchor.y + anchor.height) - SCREEN_MARGIN;
    const above = anchor.y - SCREEN_MARGIN;
    const placeAbove = below < MIN_SPACE_BELOW && above > below;
    menuMaxHeight = Math.min(MENU_MAX_HEIGHT, placeAbove ? above : below);
    menuPosition = placeAbove
      ? { bottom: windowHeight - anchor.y + MENU_GAP }
      : { top: anchor.y + anchor.height + MENU_GAP };
  }

  function renderMenuContent() {
    if (loading) {
      return (
        <View
          className="min-h-control flex-row items-center gap-[8px] px-[16px]"
          accessibilityLiveRegion="polite"
        >
          <Spinner className="text-brand-action" />
          <Text className="font-montserrat text-body text-text-secondary">Carregando...</Text>
        </View>
      );
    }

    if (loadError) {
      return (
        <View className="gap-[12px] p-[8px]" accessibilityLiveRegion="polite">
          <View className="flex-row items-start gap-[8px]">
            <Icon icon={CircleAlert} size={20} className="text-error-text" />
            <Text className="shrink font-montserrat text-helper text-error-text">{loadError}</Text>
          </View>
          {onRetry ? (
            <Button variant="secondary" onPress={onRetry}>
              Tentar novamente
            </Button>
          ) : null}
        </View>
      );
    }

    if (options.length === 0) {
      return (
        <View className="min-h-control justify-center px-[16px]">
          <Text className="font-montserrat text-body text-text-secondary">{emptyMessage}</Text>
        </View>
      );
    }

    return options.map((option) => {
      const isSelected = option.value === value;
      const rowColors = option.disabled
        ? 'text-disabled-text'
        : isSelected
          ? 'text-brand-primary'
          : 'text-text-primary';
      const rowBackground = isSelected
        ? 'bg-brand-soft'
        : option.disabled
          ? ''
          : 'hover:bg-surface-hover active:bg-brand-soft';

      return (
        <Pressable
          key={String(option.value)}
          accessibilityRole="menuitem"
          accessibilityLabel={option.label}
          accessibilityState={{ selected: isSelected, disabled: Boolean(option.disabled) }}
          disabled={option.disabled}
          onPress={() => handleSelect(option)}
          className={`min-h-control flex-row items-center justify-between gap-[8px] rounded-control px-[16px] ${rowBackground}`}
        >
          <Text className={`shrink font-montserrat ${valueTextSize === 'helper' ? 'text-helper' : 'text-body'} ${rowColors}`}>{option.label}</Text>
          {isSelected ? <Icon icon={Check} size={24} className="text-brand-primary" /> : null}
        </Pressable>
      );
    });
  }

  return (
    <View className="w-full gap-[8px]">
      <Text className="font-montserrat-semibold text-label text-text-primary">{fullLabel}</Text>

      <View ref={fieldRef} collapsable={false}>
        <Pressable
          accessibilityRole="combobox"
          accessibilityLabel={fullLabel}
          accessibilityValue={{ text: selected?.label ?? placeholder }}
          accessibilityState={{ expanded: open, disabled }}
          aria-expanded={open}
          aria-valuetext={selected?.label ?? placeholder}
          disabled={disabled}
          onPress={openMenu}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${fieldClasses({ open, error: Boolean(error), disabled })} ${focused && !open ? FOCUS_RING : ''}`}
        >
          <Text
            numberOfLines={1}
            className={`shrink font-montserrat ${valueTextSize === 'helper' ? 'text-helper' : 'text-body'} ${
              disabled ? 'text-disabled-text' : selected ? 'text-text-primary' : 'text-text-muted'
            }`}
          >
            {selected?.label ?? placeholder}
          </Text>
          <Icon
            icon={open ? ChevronUp : ChevronDown}
            size={24}
            className={disabled ? 'text-disabled-text' : 'text-text-secondary'}
          />
        </Pressable>
      </View>

      {error ? (
        <View className="flex-row items-start gap-[8px]" accessibilityLiveRegion="polite">
          <Icon icon={CircleAlert} size={20} className="text-error-text" />
          <Text className="shrink font-montserrat text-helper text-error-text">{error}</Text>
        </View>
      ) : helperText ? (
        <Text className="font-montserrat text-helper text-text-secondary">{helperText}</Text>
      ) : null}

      <Modal
        visible={open}
        transparent
        animationType="none"
        statusBarTranslucent
        onRequestClose={closeMenu}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Fechar lista"
          onPress={closeMenu}
          className="absolute inset-0"
        />
        {anchor ? (
          <View
            accessibilityRole="menu"
            className="absolute rounded-control bg-surface p-[8px] shadow-menu"
            style={{ left: anchor.x, width: anchor.width, ...menuPosition }}
          >
            <ScrollView
              style={{ maxHeight: menuMaxHeight - MENU_PADDING * 2, flexGrow: 0 }}
              keyboardShouldPersistTaps="handled"
            >
              {renderMenuContent()}
            </ScrollView>
          </View>
        ) : null}
      </Modal>
    </View>
  );
}
