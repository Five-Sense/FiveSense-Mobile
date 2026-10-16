export type SplitTeamCode = {
  /** Parte antes do primeiro hifen, ex.: "AA" em "AA-11". */
  prefix: string;
  /** Parte depois do primeiro hifen, ex.: "11" em "AA-11". Vazia se nao houver hifen. */
  number: string;
};

/**
 * Separa o codigo da equipe para o card, que mostra "AA" em destaque e "11" ao lado.
 * O formato "AA-11" vem do Figma ("Nome da Equipe · AA-11"); a API v1 trata `code` como
 * texto livre (pendencia 17 em docs/data-model.md). Sem hifen, tudo vira `prefix`.
 */
export function splitTeamCode(code: string): SplitTeamCode {
  const [prefix, ...rest] = code.trim().split('-');
  return { prefix, number: rest.join('-') };
}
