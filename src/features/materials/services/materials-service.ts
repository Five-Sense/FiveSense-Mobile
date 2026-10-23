import { AppError } from '@/shared/services/api/app-error';
import { requestJson } from '@/shared/services/api/client';

import { materialPageSchema } from '../schemas/material-schema';
import type { Material } from '../types/material';

const PAGE_SIZE = 100; // máximo aceito pela API
const MAX_PAGES = 10; // trava contra loop em resposta inesperada

/**
 * Lista os materiais ativos para consulta. A API é paginada; o app percorre as páginas para que a
 * busca local considere todo o catálogo.
 */
export async function getMaterials(signal?: AbortSignal): Promise<Material[]> {
  const materials: Material[] = [];
  let page = 0;
  let totalPages = 1;

  while (page < totalPages && page < MAX_PAGES) {
    const response = await requestJson(`/materials?page=${page}&size=${PAGE_SIZE}`, { role: 'VIEWER', signal });
    const parsed = materialPageSchema.safeParse(response);
    if (!parsed.success) {
      throw new AppError('invalidResponse');
    }
    for (const item of parsed.data.content) {
      if (item.active) materials.push({ id: item.id, name: item.name, stockQuantity: item.stockQuantity });
    }
    totalPages = parsed.data.totalPages;
    page += 1;
  }

  return materials;
}
