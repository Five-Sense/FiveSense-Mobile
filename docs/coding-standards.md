# Coding Standards

## Linguagem e tipagem

- TypeScript `strict`. Sem `any` sem justificativa em comentário.
- Tipar props de componentes e retornos de funções de API/hooks.
- Tipos de domínio ficam em `src/features/<dominio>/types`; tipos da API não vazam para as telas (converter na fronteira).

## Organização

- `src/app/`: só rotas finas. Sem `fetch`, sem regra de negócio.
- `src/features/<x>/`: `screens`, `components` (subpastas por função), `hooks`, `services`, `schemas`, `types`, `constants`, `utils`, `contexts`. Tudo que só a feature usa fica aqui.
- Raiz (`src/components`, `hooks`, `services`, `contexts`, `utils`, `constants`, `types`): somente o que é usado por mais de uma feature. Ao ganhar um segundo uso, mover para a raiz.
- Feature nunca importa outra feature; global nunca importa feature.
- Componentes: um por arquivo, agrupados por função em subpastas, divididos em partes menores quando crescem.
- Nomes de arquivo em kebab-case (padrão do template Expo). Textos de interface em português.

## Estilo

- NativeWind (`className`) com tokens do tema; não usar hex solto. Escala de 4 px é o padrão de espaçamento; medidas específicas verificadas no Figma (ex.: sidebar 222, botão secundário 50) são exceções rastreadas em `design-guidelines.md`, não novos tokens globais automáticos. Não aplicar essa escala como arredondamento de tipografia, bordas ou dimensões de conteúdo.
- Mapear nomes/variantes/slots do Figma para props semânticas conforme o catálogo de `design-guidelines.md`; nomes genéricos como Variant2/Variant3 não definem comportamento por si só. Preservar composição por conteúdo e distinguir dimensão visual de alvo de toque.
- Reutilizar componentes globais (`src/components/<função>/`) e da própria feature antes de criar novos. Não criar abstração para um único uso.
- Ícones apenas Lucide. Fonte apenas Montserrat.

## API e erros

- Toda chamada passa por `src/services/api` e retorna dado tipado ou lança `AppError`.
- Nenhum `catch` vazio. Todo erro tem apresentação ao usuário (campo, alerta ou `ErrorState` com retry).
- Mutações bloqueiam toque repetido enquanto processam.

## Listas

Toda lista implementa skeleton, pull to refresh, vazio e erro com retry (ver `architecture.md`).

## Validação

Validar formulários com schemas centralizados por feature, espelhando `data-model.md`. Exibir erro junto ao campo após interação ou envio.

## Acessibilidade

`accessibilityLabel` em botões só com ícone, alvo mínimo 48x48, rótulo persistente em campos, estado nunca só por cor.

## Comentários

Somente para explicar motivo ou tradeoff. Decisões duradouras vão para `decision-log.md`.

## Checklist antes de concluir

- Lint e typecheck passam.
- Estados de loading, vazio, erro e permissão tratados.
- Sem duplicação evidente nem dependência não aprovada.
- Docs atualizados quando contrato ou fluxo mudou.
