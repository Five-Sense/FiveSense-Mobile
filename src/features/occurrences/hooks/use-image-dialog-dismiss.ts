import { useEffect } from 'react';
import { Platform } from 'react-native';

export function useImageDialogDismiss(visible: boolean, onClose: () => void) {
  useEffect(() => {
    if (!visible || Platform.OS !== 'web') return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
      onClose();
    };
    document.addEventListener('keydown', dismiss, true);
    return () => document.removeEventListener('keydown', dismiss, true);
  }, [visible, onClose]);
}
