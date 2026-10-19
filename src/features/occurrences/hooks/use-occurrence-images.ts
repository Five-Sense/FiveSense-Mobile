import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

import { toAppError } from '@/shared/services/api/app-error';

import { pickOccurrenceImages } from '../services/occurrence-image-service';
import type { OccurrenceImage } from '../types/occurrence';
import { validateOccurrenceImages } from '../utils/occurrence-images';

export function useOccurrenceImages(isSubmitting: () => boolean) {
  const [images, setImages] = useState<OccurrenceImage[]>([]);
  const [error, setError] = useState<string>();
  const [chooserOpen, setChooserOpen] = useState(false);
  const [picking, setPicking] = useState(false);
  const current = useRef<OccurrenceImage[]>([]);
  const active = useRef(true);
  const selection = useRef(0);

  useEffect(() => {
    active.current = true;
    selection.current++;
    return () => { active.current = false; };
  }, []);

  function replace(next: OccurrenceImage[]) {
    current.current = next;
    setImages(next);
    setError(undefined);
  }

  async function pick(source: 'camera' | 'library') {
    if (isSubmitting()) return;
    const attempt = ++selection.current;
    setChooserOpen(false);
    // O seletor web deve partir do clique; cancelar pode não resolver sua Promise.
    setPicking(Platform.OS !== 'web');
    setError(undefined);
    try {
      const added = await pickOccurrenceImages(source);
      if (!active.current || attempt !== selection.current || isSubmitting() || !added.length) return;
      const next = [...current.current, ...added];
      validateOccurrenceImages(next);
      replace(next);
    } catch (failure) {
      if (active.current && attempt === selection.current && !isSubmitting()) setError(toAppError(failure).message);
    } finally {
      if (active.current && attempt === selection.current) setPicking(false);
    }
  }

  return {
    images, error, chooserOpen, setChooserOpen, picking, pick,
    remove: (index: number) => { if (!isSubmitting()) replace(current.current.filter((_, position) => position !== index)); },
    reset: () => { selection.current++; replace([]); setChooserOpen(false); setPicking(false); },
  };
}
