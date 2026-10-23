import type { OccurrenceField } from '../types/occurrence';

export function occurrenceErrorFields(fields: readonly string[]): Partial<Record<OccurrenceField, string>> {
  const errors: Partial<Record<OccurrenceField, string>> = {};
  for (const field of fields) {
    const root = field.split(/[.[\]]/, 1)[0];
    if (['image', 'images', 'imageId', 'imageIds'].includes(root)) errors.image = 'Confira as fotos anexadas.';
    else if (root === 'problemId' || root === 'materialId' || root === 'affectedQuantity') errors[root] = 'Confira este campo.';
  }
  return errors;
}
