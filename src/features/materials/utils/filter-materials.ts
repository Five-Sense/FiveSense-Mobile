import type { Material } from '../types/material';

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

/** Busca por nome, sem distinguir acentos nem caixa. */
export function filterMaterials(materials: readonly Material[], search: string): Material[] {
  const term = normalize(search);
  if (!term) return [...materials];
  return materials.filter((material) => normalize(material.name).includes(term));
}
