import { z } from 'zod';

import { MAX_AFFECTED_QUANTITY, MAX_OCCURRENCE_IMAGES } from '../types/occurrence';

export const occurrenceSchema = z.object({
  problemId: z.uuid({ error: 'Selecione um problema.' }),
  materialId: z.uuid({ error: 'Selecione um material.' }),
  affectedQuantity: z.number().int().min(1, 'Informe uma quantidade maior que zero.').max(MAX_AFFECTED_QUANTITY),
});

export const occurrenceOptionsSchema = z.array(z.object({ id: z.uuid(), name: z.string().min(1) }));
const imageIdsSchema = z.array(z.uuid()).min(1).max(MAX_OCCURRENCE_IMAGES)
  .refine((ids) => new Set(ids).size === ids.length, 'As imagens devem ter identificadores distintos.');

export const imageUploadSchema = z.object({ imageIds: imageIdsSchema });
export const occurrenceRequestSchema = occurrenceSchema.extend({ reportedByUserId: z.uuid(), imageIds: imageIdsSchema.optional() });
