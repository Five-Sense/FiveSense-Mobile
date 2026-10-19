import { AppError } from '@/shared/services/api/app-error';
import { requestJson } from '@/shared/services/api/client';

import { imageUploadSchema, occurrenceOptionsSchema, occurrenceRequestSchema } from '../schemas/occurrence-schema';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES, type OccurrenceImage, type OccurrenceOption } from '../types/occurrence';

export async function getOccurrenceOptions(kind: 'problems' | 'materials', signal?: AbortSignal): Promise<OccurrenceOption[]> {
  const response = await requestJson(`/${kind}/options`, { role: 'VIEWER', signal });
  const parsed = occurrenceOptionsSchema.safeParse(response);
  if (!parsed.success) throw new AppError('unknown', 'As opções recebidas não puderam ser carregadas. Tente novamente.');
  return parsed.data;
}

export async function uploadOccurrenceImage(image: OccurrenceImage, signal?: AbortSignal): Promise<string> {
  const size = image.file?.size ?? image.size;
  if (!ACCEPTED_IMAGE_TYPES.includes(image.mimeType) || !Number.isFinite(size) || size < 1 || size > MAX_IMAGE_BYTES) {
    throw new AppError('validation', 'Selecione uma imagem JPG ou PNG de até 5 MB.');
  }
  const formData = new FormData();
  if (image.file) formData.append('image', image.file, image.name);
  // O FormData nativo aceita {uri,name,type}; o TypeScript usa a assinatura DOM.
  else formData.append('image', { uri: image.uri, name: image.name, type: image.mimeType } as unknown as Blob);
  const response = await requestJson('/occurrences/images', { method: 'POST', formData, role: 'VIEWER', signal });
  const parsed = imageUploadSchema.safeParse(response);
  if (!parsed.success) throw new AppError('unknown', 'Não foi possível confirmar o upload da imagem. Tente novamente.');
  return parsed.data.imageId;
}

type CreateOccurrence = { problemId: string; materialId: string; affectedQuantity: number; reportedByUserId: string; imageId?: string };

export async function createOccurrence(values: CreateOccurrence, signal?: AbortSignal): Promise<void> {
  occurrenceRequestSchema.parse(values);
  await requestJson('/occurrences', { method: 'POST', body: values, role: 'VIEWER', responseType: 'void', signal });
}
