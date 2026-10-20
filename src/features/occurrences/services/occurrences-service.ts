import { AppError } from '@/shared/services/api/app-error';
import { requestJson } from '@/shared/services/api/client';

import { imageUploadSchema, occurrenceOptionsSchema, occurrenceRequestSchema } from '../schemas/occurrence-schema';
import type { OccurrenceImage, OccurrenceOption } from '../types/occurrence';
import { validateOccurrenceImages } from '../utils/occurrence-images';

export async function getOccurrenceOptions(kind: 'problems' | 'materials', signal?: AbortSignal): Promise<OccurrenceOption[]> {
  const response = await requestJson(`/${kind}/options`, { role: 'VIEWER', signal });
  const parsed = occurrenceOptionsSchema.safeParse(response);
  if (!parsed.success) throw new AppError('unknown', 'As opções recebidas não puderam ser carregadas. Tente novamente.');
  return parsed.data;
}

export async function uploadOccurrenceImages(images: readonly OccurrenceImage[], signal?: AbortSignal): Promise<string[]> {
  validateOccurrenceImages(images);
  if (!images.length) return [];

  const formData = new FormData();
  for (const image of images) {
    if (image.file) formData.append('images', image.file, image.name);
    // O FormData nativo aceita {uri,name,type}; o TypeScript usa a assinatura DOM.
    else formData.append('images', { uri: image.uri, name: image.name, type: image.mimeType } as unknown as Blob);
  }
  const response = await requestJson('/occurrences/images', { method: 'POST', formData, role: 'VIEWER', signal });
  const parsed = imageUploadSchema.safeParse(response);
  if (!parsed.success || parsed.data.imageIds.length !== images.length) {
    throw new AppError('unknown', 'Não foi possível confirmar o upload de todas as fotos. Seus anexos foram mantidos; tente novamente.');
  }
  return parsed.data.imageIds;
}

type CreateOccurrence = { problemId: string; materialId: string; affectedQuantity: number; reportedByUserId: string; imageIds?: string[] };

export async function createOccurrence(values: CreateOccurrence, signal?: AbortSignal): Promise<void> {
  const payload = occurrenceRequestSchema.parse(values);
  await requestJson('/occurrences', { method: 'POST', body: payload, role: 'VIEWER', responseType: 'void', signal });
}
