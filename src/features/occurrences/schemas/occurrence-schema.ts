import { z } from 'zod';

import { MAX_AFFECTED_QUANTITY } from '../types/occurrence';

export const occurrenceSchema = z.object({
  problemId: z.uuid({ error: 'Selecione um problema.' }),
  materialId: z.uuid({ error: 'Selecione um material.' }),
  affectedQuantity: z.number().int().min(1, 'Informe uma quantidade maior que zero.').max(MAX_AFFECTED_QUANTITY),
});

export const occurrenceOptionsSchema = z.array(z.object({ id: z.uuid(), name: z.string().min(1) }));
export const imageUploadSchema = z.object({ imageId: z.uuid() });
export const occurrenceRequestSchema = occurrenceSchema.extend({ reportedByUserId: z.uuid(), imageId: z.uuid().optional() });
