import { AppError } from '@/shared/services/api/app-error';
import { requestJson } from '@/shared/services/api/client';

import { materialPageSchema } from '../schemas/material-schema';
import type { Material } from '../types/material';

const PAGE_SIZE = 100; // máximo aceito pela API

/**
 * Lista os materiais ativos para consulta. A API é paginada; o app percorre as páginas para que a
 * busca local considere todo o catálogo.
 */
export async function getMaterials(signal?: AbortSignal): Promise<Material[]> {
  const materials: Material[] = [];
  let page = 0;
  let totalPages = 1;
  let expectedTotalPages: number | undefined;
  const seenIds = new Set<string>();

  while (page < totalPages) {
    const response = await requestJson(`/materials?page=${page}&size=${PAGE_SIZE}`, { role: 'VIEWER', signal });
    const parsed = materialPageSchema.safeParse(response);
    if (!parsed.success) {
      throw new AppError('invalidResponse');
    }
    const currentPage = parsed.data;
    expectedTotalPages ??= currentPage.totalPages;

    // Uma resposta inconsistente não pode virar um catálogo parcial com sucesso.
    if (
      currentPage.totalPages !== expectedTotalPages ||
      (currentPage.number !== undefined && currentPage.number !== page) ||
      (currentPage.totalPages === 0 && currentPage.content.length > 0) ||
      (currentPage.content.length === 0 && page + 1 < expectedTotalPages)
    ) {
      throw new AppError('invalidResponse');
    }

    for (const item of currentPage.content) {
      if (seenIds.has(item.id)) {
        throw new AppError('invalidResponse');
      }
      seenIds.add(item.id);
      if (item.active) materials.push({ id: item.id, name: item.name, stockQuantity: item.stockQuantity });
    }
    totalPages = expectedTotalPages;
    page += 1;
  }

  return materials;
}
