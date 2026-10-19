import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

import { useSession } from '@/shared/contexts/session-context';
import { toAppError } from '@/shared/services/api/app-error';

import { occurrenceSchema } from '../schemas/occurrence-schema';
import { pickOccurrenceImage } from '../services/occurrence-image-service';
import { createOccurrence, uploadOccurrenceImage } from '../services/occurrences-service';
import { EMPTY_OCCURRENCE, type OccurrenceFeedback, type OccurrenceField, type OccurrenceImage, type OccurrenceValues } from '../types/occurrence';
import { OccurrenceSubmissionError } from '../types/submission-error';
import { useOccurrenceOptions } from './use-occurrence-options';

export function useOccurrenceForm() {
  const { session, endSession } = useSession();
  const options = useOccurrenceOptions(session?.userId);
  const [values, setValues] = useState<OccurrenceValues>(EMPTY_OCCURRENCE);
  const [image, setImage] = useState<OccurrenceImage | null>(null);
  const [errors, setErrors] = useState<Partial<Record<OccurrenceField, string>>>({});
  const [feedback, setFeedback] = useState<OccurrenceFeedback | null>(null);
  const [imageChooserOpen, setImageChooserOpen] = useState(false);
  const [picking, setPicking] = useState(false);
  const [phase, setPhase] = useState<'uploading' | 'submitting'>('submitting');
  const [uncertain, setUncertain] = useState(false);
  const busy = useRef(false);
  const active = useRef(true);
  const expired = useRef(false);
  const request = useRef<AbortController | null>(null);

  useEffect(() => {
    active.current = true;
    return () => { active.current = false; request.current?.abort(); };
  }, []);

  const expireSession = useCallback(async () => {
    if (expired.current) return;
    expired.current = true;
    try { await endSession('Sua sessão expirou. Entre novamente.'); }
    catch { if (active.current) setFeedback({ variant: 'error', title: 'Entre novamente.', description: 'Não foi possível limpar o acesso salvo. Tente sair novamente.' }); }
  }, [endSession]);

  useEffect(() => {
    if ([options.problems.error, options.materials.error].some((error) => error && toAppError(error).kind === 'unauthorized')) void expireSession();
  }, [options.problems.error, options.materials.error, expireSession]);

  const mutation = useMutation({
    mutationKey: ['occurrence-create'], retry: false,
    mutationFn: async (input: { problemId: string; materialId: string; affectedQuantity: number; userId: string; image: OccurrenceImage | null; signal: AbortSignal }) => {
      let stage: 'uploading' | 'submitting' = input.image ? 'uploading' : 'submitting';
      try {
        setPhase(stage);
        const imageId = input.image ? await uploadOccurrenceImage(input.image, input.signal) : undefined;
        if (input.signal.aborted) return;
        stage = 'submitting';
        setPhase(stage);
        await createOccurrence({ problemId: input.problemId, materialId: input.materialId, affectedQuantity: input.affectedQuantity, reportedByUserId: input.userId, ...(imageId ? { imageId } : {}) }, input.signal);
      } catch (error) { throw new OccurrenceSubmissionError(toAppError(error), stage); }
    },
  });

  const problemValid = options.problems.data?.some((item) => item.id === values.problemId) ?? false;
  const materialValid = options.materials.data?.some((item) => item.id === values.materialId) ?? false;
  const progress = Number(problemValid) + Number(materialValid) + Number(values.affectedQuantity > 0);
  const ready = Boolean(session) && progress === 3 && !options.problems.isFetching && !options.materials.isFetching && !options.problems.isError && !options.materials.isError;

  function change(field: keyof OccurrenceValues, value: string | number) {
    if (busy.current) return;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (!uncertain) setFeedback(null);
  }

  async function pickImage(source: 'camera' | 'library') {
    if (busy.current) return;
    setImageChooserOpen(false);
    if (!uncertain) setFeedback(null);
    // No web o seletor precisa partir do clique; cancelar pode não resolver sua Promise.
    setPicking(Platform.OS !== 'web');
    try {
      const next = await pickOccurrenceImage(source);
      if (active.current && next) { setImage(next); setErrors((current) => ({ ...current, image: undefined })); if (!uncertain) setFeedback(null); }
    } catch (error) { if (active.current) setErrors((current) => ({ ...current, image: toAppError(error).message })); }
    finally { if (active.current) setPicking(false); }
  }

  async function submit() {
    if (busy.current || uncertain || !session) return;
    const result = occurrenceSchema.safeParse(values);
    if (!result.success || !ready) {
      const fields: Partial<Record<OccurrenceField, string>> = {};
      if (!problemValid) fields.problemId = 'Selecione um problema disponível.';
      if (!materialValid) fields.materialId = 'Selecione um material disponível.';
      if (values.affectedQuantity <= 0) fields.affectedQuantity = 'Informe uma quantidade maior que zero.';
      setErrors(fields);
      setFeedback({ variant: 'error', title: 'Confira os dados da ocorrência.', description: 'Preencha os campos obrigatórios antes de enviar.' });
      return;
    }
    busy.current = true;
    setFeedback(null);
    setErrors({});
    const controller = new AbortController();
    request.current = controller;
    try {
      await mutation.mutateAsync({ ...result.data, userId: session.userId, image, signal: controller.signal });
      if (!active.current || controller.signal.aborted) return;
      setValues(EMPTY_OCCURRENCE); setImage(null); setErrors({});
      setFeedback({ variant: 'success', title: 'Ocorrência registrada.', description: 'Seu relato foi registrado com sucesso.' });
    } catch (failure) {
      if (!active.current) return;
      const failed = failure instanceof OccurrenceSubmissionError ? failure : new OccurrenceSubmissionError(toAppError(failure), 'submitting');
      const error = failed.error;
      if (error.kind === 'cancelled') return;
      if (error.kind === 'unauthorized') { await expireSession(); return; }
      if (failed.stage === 'submitting' && (error.kind === 'network' || error.kind === 'timeout' || error.kind === 'server')) {
        setUncertain(true);
        setFeedback({ variant: 'warning', title: 'Não foi possível confirmar o envio.', description: 'A ocorrência pode ter sido registrada. Confira com os responsáveis antes de tentar novamente para evitar duplicidade.' });
      } else {
        const description = error.kind === 'forbidden' ? 'Seu acesso não permite realizar esta ação.'
          : error.status === 413 ? 'A imagem deve ter no máximo 5 MB.'
          : error.kind === 'validation' ? 'Confira os dados e se o problema e o material continuam disponíveis.'
          : failed.stage === 'uploading' ? 'Não foi possível enviar a imagem. Seus dados foram mantidos; tente novamente.'
          : error.message;
        setFeedback({ variant: 'error', title: failed.stage === 'uploading' ? 'A imagem não foi enviada.' : 'Não foi possível registrar.', description });
        if (error.fields.length) setErrors(Object.fromEntries(error.fields.filter((field) => ['problemId', 'materialId', 'affectedQuantity', 'image'].includes(field)).map((field) => [field, 'Confira este campo.'])));
      }
    } finally { busy.current = false; if (request.current === controller) request.current = null; }
  }

  return {
    values, image, errors, feedback, options, progress, picking, uncertain,
    sending: mutation.isPending, phase, canSubmit: ready && !mutation.isPending && !picking && !uncertain,
    imageChooserOpen, setImageChooserOpen, change, pickImage, submit,
    removeImage: () => { if (!busy.current) { setImage(null); setErrors((current) => ({ ...current, image: undefined })); if (!uncertain) setFeedback(null); } },
    acknowledgeRetry: () => { setUncertain(false); setFeedback(null); },
    refresh: () => Promise.all([options.problems.refetch(), options.materials.refetch()]),
    showPendingNotice: () => setFeedback({ variant: 'warning', title: 'Envio em andamento.', description: 'Aguarde a conclusão antes de sair desta tela.' }),
  };
}
