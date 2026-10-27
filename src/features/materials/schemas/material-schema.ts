import { z } from 'zod';

/** Espelha GET /materials (Spring Page). Campos fora da consulta (mínimo, lowStock) são ignorados. */
export const materialPageSchema = z.object({
  content: z.array(
    z.object({
      id: z.uuid(),
      name: z.string().min(1),
      stockQuantity: z.number().int().min(0),
      active: z.boolean(),
    }),
  ),
  totalPages: z.number().int().min(0),
  number: z.number().int().min(0).optional(),
});
