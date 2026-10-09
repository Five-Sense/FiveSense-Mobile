# Architecture

Arquitetura proposta (pendente de aprovação humana). Objetivo: o mínimo para cumprir o escopo.

## Visão geral

`Telas (src/app) -> Componentes UI e features -> Hooks de dados -> Cliente de API (src/lib/api) -> API externa`

## Camadas

- **`src/app/`**: rotas do Expo Router. Só montam telas e layouts; sem regra de negócio nem `fetch`.
- **`src/components/ui/`**: componentes visuais genéricos (Button, Input, Select, QuantityStepper, Badge, Modal, Alert, Toast, Skeleton, EmptyState, ErrorState, Pagination). Sem conhecimento de API.
- **`src/features/<dominio>/`**: `auth`, `users`, `problems`, `occurrences`, `teams`, `materials`. Cada um com funções de API, hooks, schemas de validação e componentes próprios.
- **`src/lib/`**: `api` (cliente e erros), `session` (token), `permissions` (perfil -> ações).

Dependências: `app` -> `features` e `ui`; `features` -> `ui` e `lib`; `ui` não importa `features`; `lib` não importa nada do app.

## Cliente de API

- Único ponto de saída HTTP. Base URL em `EXPO_PUBLIC_API_URL` (a API usa o prefixo `/api/v1`); sem segredos no app.
- Contrato real da API em `data-model.md`. Se a API passar a emitir token, o cliente injeta `Authorization: Bearer` (NF001); hoje não há token.
- Timeout em toda chamada. Respostas e erros convertidos para tipos do app (não vazar formato bruto da API para as telas).
- Erros da API chegam como ProblemDetail (RFC 9457). Erro sempre vira `AppError` com `kind`: `network`, `unauthorized` (401), `forbidden` (403), `validation` (400/422, com erros por campo), `notFound` (404), `conflict` (409, ex.: excluir item referenciado), `server` (5xx), `unknown`.
- 401: limpa sessão e redireciona ao login com aviso "Sua sessão expirou". 403: estado de acesso negado. (Ambos dependem de a API passar a emiti-los.)
- Paginação: tipo genérico `Page<T>` (`content`, `totalElements`, `totalPages`, `size`, `number`; `page` base 0).
- Upload de imagem: `multipart/form-data` com campo `image`; o `imageId` devolvido entra no `POST /occurrences`.
- Nenhum `catch` vazio. A tela decide a apresentação (erro de campo, alerta no formulário, ou `ErrorState` com retry).

## Dados, listas e atualização

- Cada lista usa um hook de dados que expõe: `data`, `isLoading`, `isRefreshing`, `error`, `refetch` e paginação.
- `FlatList` com `refreshControl` (pull to refresh) e skeleton enquanto `isLoading`; vazio e erro com os componentes padrão.
- Mutação (criar, editar, excluir) mostra carregando no botão, impede toque repetido, feedback de sucesso/erro (NF004) e atualiza a lista de origem.
- Decisão pendente: biblioteca de dados (recomendado TanStack Query) ou hooks próprios. Ver `decision-log.md`.

## Navegação

- Expo Router. Grupos: `(auth)` para login, recuperação e redefinição; `(app)` para telas autenticadas.
- Guarda de rota por sessão e por perfil (`Stack.Protected` ou equivalente; conferir docs da versão). Acesso indevido mostra "Acesso negado".
- Pop-ups (detalhes, cadastro, confirmações) como modal. Layout lateral em tablet/desktop e painel no celular.
- Recuperação e redefinição de senha (deep link `fivesenseapp`) ficam suspensas até a API ter os endpoints.

## Estilo

NativeWind com tokens do tema em `src/global.css` (ver `design-guidelines.md`). Sem estilos inline com valores soltos.

## Fora desta arquitetura

Estado global complexo, cache offline, i18n, modo escuro, analytics.
