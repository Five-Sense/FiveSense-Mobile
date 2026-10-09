# AGENTS.md - Five Sense App

Contrato universal do projeto. Leia antes de qualquer tarefa. Detalhes ficam em `docs/*`.

## Propósito

Camada de apresentação mobile (Android, iOS e web/desktop responsivo) do Five Sense, sistema de gestão de 5S: equipes, materiais, problemas e ocorrências, com acesso por perfil (Administrador, Gestor, Visualizador). O app consome a Five Sense API v1 (`/api/v1`, contrato em `docs/data-model.md`). Não há backend neste repositório.

## Stack

- Expo (SDK 57) + React Native + TypeScript (strict)
- Expo Router (rotas em `src/app/`)
- NativeWind (Tailwind) para estilo
- Montserrat (fonte) e Lucide (ícones)

Qualquer dependência nova exige aprovação humana. Instale sempre com `npx expo install <pacote>`.

## Regras obrigatórias

1. **Spec antes de código.** Não implemente fora do escopo aprovado em `docs/issues.md` e `docs/implementation-plan.md`.
2. **Humano navega, IA pilota.** Peça decisão para escopo, arquitetura, dependências, segurança, modelo de dados e remoção de documentos.
3. **Toda chamada de API trata erro.** Use somente o cliente em `src/services/api`; nunca `fetch` direto em telas. Erros viram `AppError` tipado (rede, 401, 403, validação, não encontrado, servidor).
4. **Toda lista tem:** skeleton no carregamento, pull to refresh, estado vazio, estado de erro com "Tentar novamente".
5. **Permissão por perfil:** ações sem permissão ficam ocultas; o backend continua sendo a autoridade (ver `docs/security.md`).
6. **Design:** siga `docs/design-guidelines.md` (tokens, 48 px de toque, tema claro, erro por texto além de cor). Não invente paleta, fonte ou ícone.
7. **Contrato da API:** `docs/data-model.md` é a fonte; não invente endpoints. Dados de sessão (e token, se existir) só em armazenamento seguro, nunca em logs.
8. Não edite `ios/` e `android/` à mão (Continuous Native Generation); configure em `app.json` e config plugins.

## Expo muda a cada SDK

Não confie na memória. Antes de usar API de Expo/EAS/React Native:
1. Confirme a versão de `expo` em `package.json`.
2. Consulte `https://docs.expo.dev/versions/v57.0.0/` e, para o resto, `https://docs.expo.dev/llms.txt`.
3. NativeWind: `https://www.nativewind.dev/v5/getting-started/installation`.

Bibliotecas com código nativo exigem development build (`npx expo run:android|ios`), não Expo Go.

## Comandos

```bash
npx expo start          # servidor de desenvolvimento
npx expo lint           # lint
npx tsc --noEmit        # typecheck
npx expo-doctor         # diagnóstico de dependências
```

Lint e typecheck devem passar antes de dar qualquer tarefa como concluída.

## Estrutura

Feature Driven Architecture:

```text
src/app/          rotas finas (importam a screen da feature)
src/features/<x>/ auth, users, problems, materials, teams, occurrences, cada uma com
                  screens, components (em subpastas por função), hooks, services,
                  schemas, types, constants, utils, contexts (só se necessário), index.ts
src/components/   globais, agrupados por função (forms, feedback, overlays, data-display, navigation, layout, actions)
src/hooks/ src/services/ src/contexts/ src/utils/ src/constants/ src/types/   globais
src/global.css    tokens do tema (Tailwind)
```

Regras: tudo nasce na feature; ao ser usado por uma segunda feature, sobe para o global na raiz. Feature nunca importa outra feature; global nunca importa feature. Não acumule componentes soltos numa pasta: agrupe por função e divida em partes menores. Detalhes em `docs/architecture.md`.

## Mapa de documentos

- `docs/project-overview.md` - objetivo, perfis, escopo
- `docs/workflows.md` - fluxos e telas por perfil, com RFs
- `docs/design-guidelines.md` - tokens e componentes
- `docs/architecture.md` - camadas, API, erros, navegação
- `docs/data-model.md` - entidades e regras de validação
- `docs/security.md` - sessão, permissões, segredos
- `docs/coding-standards.md` / `docs/testing.md` - padrões e checks
- `docs/ai-workflow.md` - como trabalhar e fechar tarefas
- `docs/implementation-plan.md` / `docs/issues.md` - plano e estado vivo
- `docs/deployment-log.md` / `docs/decision-log.md` - entregas e decisões

## Definition of Done

- Critérios de aceite da issue atendidos, incluindo erro, loading, vazio e permissão.
- `npx expo lint` e `npx tsc --noEmit` sem erros.
- Verificado no simulador/dispositivo ou web, quando aplicável (ou limitação registrada).
- `docs/issues.md`, `docs/implementation-plan.md` e `docs/deployment-log.md` atualizados; `docs/decision-log.md` só se houver decisão duradoura.
