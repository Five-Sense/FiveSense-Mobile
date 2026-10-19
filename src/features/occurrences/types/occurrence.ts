export type OccurrenceOption = { id: string; name: string };
export type OccurrenceValues = { problemId: string | null; materialId: string | null; affectedQuantity: number };
export type OccurrenceImage = { uri: string; name: string; mimeType: string; size: number; file?: File };
export type OccurrenceField = keyof OccurrenceValues | 'image';
export type OccurrenceFeedback = { variant: 'error' | 'warning' | 'success'; title: string; description: string };
export const EMPTY_OCCURRENCE: OccurrenceValues = { problemId: null, materialId: null, affectedQuantity: 0 };
export const MAX_OCCURRENCE_IMAGES = 5;
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const MAX_ATTACHMENTS_BYTES = 20 * 1024 * 1024;
export const MAX_AFFECTED_QUANTITY = 999;

export const ACCEPTED_IMAGE_TYPES: readonly string[] = ['image/jpeg', 'image/png'];
