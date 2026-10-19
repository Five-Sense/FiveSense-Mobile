# Architecture

Arquitetura direcionada a funcionalidade (Feature Driven Architecture). Cada funcionalidade é dona de tudo o que só ela usa; o que é compartilhado por mais de uma funcionalidade vive na pasta `shared/` em `src/`. Objetivo: o mínimo para cumprir o escopo.

## Visão geral

`Rota (src/app) -> Screen da feature -> components / hooks da feature -> services da feature -> services globais (cliente de API) -> API externa`

## Estrutura

```text
src/
  app/                     rotas do Expo Router (finas: só importam a screen da feature)
  features/                funcionalidades
    auth/                  login, logout, informações da conta
    materials/
    teams/                 inclui status de 5S e calendário
    occurrences/           inclui seleção/upload de imagem
      screens/             telas completas da feature
      components/          componentes da feature, agrupados por função
        list/              ex.: material-list, material-card, material-list-skeleton
        form/              ex.: material-form, material-form-fields
        details/           ex.: material-details-modal, stock-badge
      hooks/               ex.: use-materials, use-create-material
      services/            funções de API da feature (usam o cliente global)
      schemas/             validação (zod) espelhando data-model.md
      types/               tipos de domínio
      constants/           limites e textos da feature (ex.: nome <= 55)
      utils/               funções puras da feature
      contexts/            só se a feature precisar de estado compartilhado
      index.ts             API pública da feature
  shared/                  pastas globais (compartilhadas por múltiplas features)
    components/            globais, agrupados por função (ver abaixo)
    forms/                 Input, PasswordInput, Select, QuantityStepper, ImagePicker, FormField
    feedback/              Alert, Toast, Skeleton, EmptyState, ErrorState, Spinner
    overlays/              Modal, ConfirmDialog, DiscardDialog
    data-display/          Card, Badge, Table, Pagination, PlaceholderImage
    navigation/            MenuButton, AppMenu
    layout/                Screen, Page, Section, ListScreen
    actions/               Button, IconButton
    hooks/                 hooks globais (ex.: use-paginated-list, use-breakpoint, use-confirm-discard)
    services/              api/ (cliente, AppError, Page<T>, upload), storage/ (armazenamento seguro)
    contexts/              globais (ex.: session com usuário/perfil, toast)
    utils/                 funções puras globais (formatadores, validadores genéricos, permissions)
    constants/             globais (tema, breakpoints, rotas, perfis)
    types/                 tipos globais (Role, Page<T>, AppError)
  global.css               tokens do tema (Tailwind)
```

### Estado do esqueleto (referência inicial de 2026-10-09)

Estrutura inicial; componentes já implementados substituem os respectivos `.gitkeep`. Os esqueletos exclusivos de users/problems foram removidos em 2026-10-16 (decisão 0009). Não recriar módulos de gestão/administração nem a demonstração.

- Globais (dentro de `src/shared/`): `components/{actions,data-display,feedback,forms,layout,navigation,overlays}`, `hooks`, `services/{api,storage}`, `contexts`, `utils`, `constants`, `types`.
- Rotas: `src/app/(auth)` e `src/app/(app)`.
- Features, cada uma com `screens`, `hooks`, `services`, `schemas`, `types` e `components/<função>`:
  - `auth` (`components/form`, `components/account`)
  - `materials` (`components/{list,form,details}`, `constants`)
  - `teams` (`components/{list,form,details,status,calendar}`, `constants`)
  - `occurrences` (`components/{form,image}`, `constants`)
- Não foram criadas `utils/` e `contexts/` dentro das features: criar só quando houver necessidade real.
- Ainda existem os arquivos do template Expo (`src/app/index.tsx`, `explore.tsx`, `src/components/*.tsx`, `src/components/ui`, `src/constants/theme.ts`, `src/hooks/use-*`), a remover na Fase 1 por não seguirem esta estrutura.

## Regra de ouro: local primeiro, global quando compartilhado

- Todo componente, hook, service, util, constante, tipo ou contexto nasce dentro da feature que o usa.
- Quando uma **segunda** feature precisar dele, mova para o global correspondente dentro de `src/shared/` (`src/shared/components`, `src/shared/hooks`, `src/shared/services`, `src/shared/utils`, `src/shared/constants`, `src/shared/contexts`, `src/shared/types`) e ajuste os imports das duas. Nunca importe de dentro de outra feature.
- Exemplos esperados como globais: Button, Input, Modal, Skeleton, EmptyState, ErrorState, Pagination, Badge; `use-paginated-list`; cliente de API; `session`; `permissions`.
- Exemplos que ficam locais: `StockBadge` (materials), `TeamStatusBadge` (teams), `QuantityStepper` só se mais de uma feature usar (materials e occurrences: global).

## Componentes: sem pasta única inchada

- Nenhuma pasta `components/` (global ou de feature) pode acumular componentes soltos. Agrupe por função em subpastas e divida componentes grandes em partes menores que se relacionam.
- Globais, por função:
  - `components/forms/` Input, PasswordInput, Select, QuantityStepper, ImagePicker, FormField
  - `components/feedback/` Alert, Toast, Skeleton, EmptyState, ErrorState, Spinner
  - `components/overlays/` Modal, ConfirmDialog, DiscardDialog
  - `components/data-display/` Card, Badge, Table, Pagination, PlaceholderImage
  - `components/navigation/` MenuButton, AppMenu
  - `components/layout/` Screen, Page, Section, ListScreen (lista com skeleton, refresh, vazio e erro)
  - `components/actions/` Button, IconButton
- Um componente por arquivo (kebab-case). Se um componente passa de ~150 linhas ou mistura apresentação com regras, divida: subcomponentes ao lado dele, lógica em hook da feature.
- Padrão de composição: `screen` monta `list` + `form` + `details`; cada um compõe peças menores (ex.: `material-form` = `material-form-fields` + `material-form-actions`).

## Dependências

- `app` -> `features/<x>/screens` (via `index.ts`)
- `features` -> globais; nunca outra feature
- globais -> apenas globais (nunca importam `features`)
- Dentro da feature: `screens` -> `components`, `hooks` -> `services` -> `services` globais. `components` não chamam `services` diretamente; usam hooks.
- Dependência circular proibida.

## Cliente de API (`src/shared/services/api`)

- Único ponto de saída HTTP. Host em `EXPO_PUBLIC_API_URL` (`https://fivesense-api.onrender.com`, ver `.env.example`); o prefixo `/api/v1` é constante em `src/shared/services/api`. O host parece estar em hospedagem Render: a primeira chamada após inatividade pode demorar (não verificado), então o timeout inicial deve ser generoso e o estado de carregamento tolerar espera; sem segredos no app.
- Contrato real da API em `data-model.md`. Se a API passar a emitir token, o cliente injeta `Authorization: Bearer` (NF001); hoje não há token.
- Timeout em toda chamada. Respostas e erros convertidos para tipos do app (não vazar formato bruto da API para as telas).
- Erros da API chegam como ProblemDetail (RFC 9457). Erro sempre vira `AppError` com `kind`: `network`, `unauthorized` (401), `forbidden` (403), `validation` (400/422, com erros por campo), `notFound` (404), `conflict` (409, ex.: excluir item referenciado), `server` (5xx), `unknown`.
- 401: limpa sessão e redireciona ao login com aviso "Sua sessão expirou". 403: estado de acesso negado. (Ambos dependem de a API passar a emiti-los.)
- Paginação: tipo global `Page<T>` (`content`, `totalElements`, `totalPages`, `size`, `number`; `page` base 0).
- Upload de fotos: uma chamada `multipart/form-data` com campo `images` repetido (até 5 arquivos). Validar todos os UUIDs de `imageIds` e a quantidade antes de um único `POST /occurrences` com essa lista. Sem fotos, pular upload e omitir a lista. Usar o cliente compartilhado, sem Content-Type multipart manual; limites em `data-model.md`.
- Nenhum `catch` vazio. A tela decide a apresentação (erro de campo, alerta no formulário, ou `ErrorState` com retry).
- Cada feature tem seus próprios `services/` que chamam o cliente (ex.: `materials/services/materials-service.ts`).

## Dados, listas e atualização

- Cada lista usa um hook de dados da feature, construído sobre o hook global `use-paginated-list`, que expõe `data`, `isLoading`, `isRefreshing`, `error`, `refetch` e paginação.
- O componente global `ListScreen` entrega `FlatList` com `refreshControl` (pull to refresh), skeleton em `isLoading`, vazio e erro com retry. A feature fornece o item e o skeleton do item.
- Mutação (criar, editar, excluir) mostra carregando no botão, impede toque repetido, dá feedback de sucesso/erro (NF004) e atualiza a lista de origem.
- Biblioteca de dados: TanStack Query (ver `decision-log.md`, 0003).

## Navegação

- Expo Router. Grupos: `(auth)` para login (e recuperação, quando houver) e `(app)` para telas autenticadas.
- Arquivos em `src/app` apenas exportam a screen da feature. Guarda de rota por sessão e por perfil (`Stack.Protected` ou equivalente; conferir docs da versão). Acesso indevido mostra "Acesso negado".
- Pop-ups (detalhes, cadastro, confirmações) como modal. Layout lateral em tablet/desktop e painel no celular.
- Recuperação e redefinição de senha (deep link `fivesenseapp`) ficam suspensas até a API ter os endpoints.

## Estilo

NativeWind com tokens do tema em `src/global.css` (ver `design-guidelines.md`). Sem estilos inline com valores soltos.

## Fora desta arquitetura

Estado global complexo, cache offline, i18n, modo escuro, analytics.
