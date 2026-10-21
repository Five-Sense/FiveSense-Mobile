import { AppError } from '@/shared/services/api/app-error';

import { ACCEPTED_IMAGE_TYPES, MAX_ATTACHMENTS_BYTES, MAX_IMAGE_BYTES, MAX_OCCURRENCE_IMAGES, type OccurrenceImage } from '../types/occurrence';

export function attachmentBytes(images: readonly OccurrenceImage[]): number {
  return images.reduce((total, image) => total + (image.file?.size ?? image.size), 0);
}

export function validateOccurrenceImages(images: readonly OccurrenceImage[]): void {
  if (images.length > MAX_OCCURRENCE_IMAGES) throw new AppError('tooManyImages');
  for (const image of images) {
    if (!ACCEPTED_IMAGE_TYPES.includes(image.file?.type || image.mimeType)) throw new AppError('invalidImageType');
    const size = image.file?.size ?? image.size;
    if (!Number.isFinite(size) || size < 1) throw new AppError('invalidImageSize');
    if (size > MAX_IMAGE_BYTES) throw new AppError('imageTooLarge');
  }
  if (attachmentBytes(images) > MAX_ATTACHMENTS_BYTES) {
    throw new AppError('attachmentsTooLarge');
  }
}

export function formatAttachmentSize(bytes: number): string {
  if (bytes === 0) return '0 MB';
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.ceil(bytes / 1024))} KB`;
  return `${(Math.ceil(bytes / (1024 * 1024) * 100) / 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} MB`;
}
