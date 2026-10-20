/** Resposta paginada do Spring (`page` base 0). Só os campos usados pelo app. */
export type Page<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
};
