import { AppError } from '@/shared/services/api/app-error';
import { requestJson } from '@/shared/services/api/client';

import { occurrenceOptionsSchema, occurrenceRequestSchema } from '../schemas/occurrence-schema';
import type { OccurrenceImage, OccurrenceOption } from '../types/occurrence';
import { validateOccurrenceImages } from '../utils/occurrence-images';

export async function getOccurrenceOptions(kind: 'problems' | 'materials', signal?: AbortSignal): Promise<OccurrenceOption[]> {
  const response = await requestJson(`/${kind}/options`, { role: 'VIEWER', signal });
  const parsed = occurrenceOptionsSchema.safeParse(response);
  if (!parsed.success) throw new AppError('invalidResponse');
  return parsed.data;
}

type CreateOccurrence = { problemId: string; materialId: string; affectedQuantity: number; reportedByUserId: string };

export async function createOccurrence(values: CreateOccurrence, images: readonly OccurrenceImage[], signal?: AbortSignal): Promise<void> {
  const payload = occurrenceRequestSchema.parse(values);
  validateOccurrenceImages(images);

  const formData = new FormData();
  for (const [field, value] of Object.entries(payload)) formData.append(field, String(value));
  for (const image of images) {
    if (image.file) formData.append('images', image.file, image.name);
    // O FormData nativo aceita {uri,name,type}; o TypeScript usa a assinatura DOM.
    else formData.append('images', { uri: image.uri, name: image.name, type: image.mimeType } as unknown as Blob);
  }
  await requestJson('/occurrences', { method: 'POST', formData, role: 'VIEWER', responseType: 'void', signal });
}
