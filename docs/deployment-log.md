# Deployment Log

Histórico técnico do que foi entregue. Mais recente no topo. Cada entrada referencia issue/fase, arquivos, checks e riscos. Decisões duradouras vão em `decision-log.md`; estado vivo em `issues.md`.

## Template

```md
## [AAAA-MM-DD] - Entrega: ISSUE - (Timestamp da Alteração) (título)

- **Fase:**
- **O que foi feito:**
- **Arquivos modificados:**
- **Checks:**
- **Docs atualizados:**
- **Riscos/Débito técnico:**
```

## Entradas

## [2026-10-09] - Entrega: (Alterar para novo padrão) (Componentes Input e PasswordInput)

- **Fase:** Fase 1 - Scaffold técnico (incremento de inputs).
- **O que foi feito:** Implementados os componentes reutilizáveis `Input` (`src/components/ui/input.tsx`) e `PasswordInput` (`src/components/ui/password-input.tsx`) com fidelidade às variantes do Figma: Default com borda #64748B, Error com borda vermelha #B91C1C (e olho vermelho no PasswordInput, sem texto de erro no input, cuja função é delegada ao Alert), e Focus com borda de 2px em #4747D4. Alternância de visibilidade da senha com `Eye`/`EyeOff` da Lucide com alvo de toque de 48x48 px. Adicionados tokens de tipografia em `src/global.css`. Arquivos temporários de teste/showcase removidos, mantendo apenas os componentes de entrada na UI e `src/app/index.tsx` restaurado limpo.
- **Arquivos modificados:** `src/global.css`, `src/components/ui/input.tsx`, `src/components/ui/password-input.tsx`, `docs/issues.md`, `docs/deployment-log.md`.
- **Checks:** `npx tsc --noEmit` aprovado com 0 erros; `npx expo lint` aprovado com 0 erros.
- **Docs atualizados:** `docs/issues.md`, `docs/deployment-log.md`.
- **Riscos/Débito técnico:** Demais componentes de UI da Fase 1 (modais, alerts, skeletons, cards de equipes/materiais) e integração com a API v1 seguem conforme o planejamento da Fase 1.
## [2026-10-09] - Entrega: (Alterar para novo padrão) (Componente Footer)

- **Fase:** Fase 1 - Scaffold técnico (parcial).
- **O que foi feito:** Criado `Footer` institucional exclusivo do tablet, com superfície branca, borda `border-subtle`, padding 8, altura mínima 32 e largura fluida. O texto padrão é “© 2026 Five Sense Group. Todos os direitos reservados.” em Montserrat 400, 12/15; pode ser substituído pela prop `text` e o componente cresce se houver ampliação de fonte ou quebra de linha. O Header foi ajustado para documentar o escopo somente Tablet.
- **Arquivos modificados:** `src/static/components/Footer.tsx`, `src/static/components/Header.tsx`, `docs/design-guidelines.md`, `docs/issues.md`, `docs/deployment-log.md`.
- **Checks:** `npx tsc --noEmit`, `npx expo lint` e `git diff --check` sem erros.
- **Docs atualizados:** `design-guidelines.md`, `issues.md`, `deployment-log.md`.
- **Riscos/Débito técnico:** o Footer ainda não está composto em uma tela, pois a estrutura de telas permanece pendente.

## [2026-10-09] - Entrega: (Alterar para novo padrão) (Componente Header)

- **Fase:** Fase 1 - Scaffold técnico (parcial).
- **O que foi feito:** Criado `Header` para Tablet com 72 de altura, fundo `surface`, padding horizontal de 24, logo oficial existente à esquerda e ação de saída à direita com `LogOut` do Lucide. A largura é fluida (`w-full`) e acompanha o contêiner pai. A ação é exposta por `onLogout`; quando ela não é fornecida, o controle permanece visível, mas desabilitado e corretamente anunciado por acessibilidade.
- **Arquivos modificados:** `src/static/components/Header.tsx`, `docs/issues.md`, `docs/deployment-log.md`.
- **Checks:** `npx tsc --noEmit`, `npx expo lint` e `git diff --check` sem erros.
- **Docs atualizados:** `issues.md`, `deployment-log.md`.
- **Riscos/Débito técnico:** a variante de Header para celular não existe no catálogo Figma lido; a adaptação final será feita na fase de responsividade.

## [2026-10-09] - Entrega: (Alterar para novo padrão) (Limpeza do template Expo)

- **Fase:** Fase 1 - Scaffold técnico (parcial).
- **O que foi feito:** Removidos rotas e componentes de exemplo (`explore`, tabs, `themed-*`, `animated-icon`, `hint-row`, `web-badge`, `external-link`, `collapsible`), `src/constants/theme.ts`, `src/hooks/*`, `scripts/reset-project.js` e o script `reset-project`, e imagens não usadas em `assets/images`. `src/app/_layout.tsx` agora é um `Stack` sem cabeçalho que carrega Montserrat e esconde o splash; `src/app/index.tsx` é uma tela vazia. `app.json`: orientação destravada, `userInterfaceStyle: light`, fundo do splash `#FCFCFC`. Dependências do template removidas: `@expo/ui`, `expo-glass-effect`, `expo-symbols`, `expo-device`, `expo-image` (reinstalar `expo-image` quando houver imagens).
- **Arquivos modificados:** `src/app/*`, `app.json`, `package.json`, `package-lock.json`, remoções listadas.
- **Checks:** `npx tsc --noEmit` e `npx expo lint` sem erros; `expo export` web conclui (rotas `/`, `/_sitemap`, `/+not-found`). `expo-doctor` não concluiu (travou por 15 min). Não testado em dispositivo/emulador.
- **Docs atualizados:** `implementation-plan.md`, `deployment-log.md`.
- **Riscos/Débito técnico:** ícone do app, splash e `expo.icon` ainda são do template (identidade pendente).

## [2026-10-09] - Entrega: (Alterar para novo padrão) (Componente Button e base de estilo)

- **Fase:** Fase 1 - Scaffold técnico (parcial).
- **O que foi feito:** `Button` em `src/components/ui/button` com `variant` (`primary` | `secondary` | `destructive`), `disabled`, `loading`/`loadingLabel`, `icon` (Lucide), foco visível e acessibilidade. Mapeamento do Figma: Default, Hover, Pressed e Disabled são estados de `primary` (`hover:`/`active:` e `disabled`); Secondary é variante. Altura 48 em todas as variantes (Figma mede 50 no Secondary; borda dentro dos 48). `destructive-pressed` (#991B1B) é complemento sem origem no Figma. Ícone: slot 32 com desenho 24 (regra do design-guidelines). NativeWind v5, Tailwind 4, Montserrat e Lucide instalados com versões fixas; `lightningcss` fixado em 1.30.1 via `overrides` (versões maiores quebram o `global.css`).
- **Arquivos modificados:** `package.json`, `package-lock.json`, `tsconfig.json`, `metro.config.js`, `postcss.config.mjs`, `nativewind-env.d.ts`, `eslint.config.js` (gerado pelo `expo lint`), `src/global.css`, `src/app/_layout.tsx`, `src/components/ui/button/{button.tsx,index.ts}`.
- **Checks:** `npx tsc --noEmit` sem erros; ESLint sem erros nos arquivos novos; `expo export` para web e Android concluem com o Button no bundle e as classes geradas. `npx expo lint` global falha por erro preexistente do template (`src/hooks/use-color-scheme.web.ts`, setState em effect). Não verificado em dispositivo/emulador: aparência de cada estado, anel de foco (`outline`) e cor do ícone/spinner via `styled`.
- **Docs atualizados:** `issues.md`, `implementation-plan.md`, `deployment-log.md`.
- **Riscos/Débito técnico:** NativeWind v5 é RC. Button ainda não é usado em nenhuma tela. `expo-doctor` não executado. Hover/pressed do secondary (`surface-hover`/`brand-soft`) e do destructive são escolhas minhas, a confirmar com o design.
## [2026-10-09] - Entrega: ISSUE-002 (Dependências e NativeWind)

- **Fase:** Fase 1 - Scaffold técnico (parcial)
- **O que foi feito:** Removidos `@expo/ui`, `expo-glass-effect`, `expo-symbols`, `expo-device`, `expo-web-browser`, o script/arquivo `reset-project` e os arquivos de exemplo do template. Instalados `nativewind@5.0.0-rc.0`, `react-native-css@3.1.0-rc.0`, `tailwindcss` e `@tailwindcss/postcss` 4.1.12, `lightningcss@1.30.1` (com `overrides`), `postcss`, `react-native-svg`, `lucide-react-native`, `@expo-google-fonts/montserrat`, `expo-secure-store`, `expo-image-picker`, `zod` 4, `@tanstack/react-query` e, exigidos pelo `expo lint`, `eslint` e `eslint-config-expo`. Criados `metro.config.js`, `postcss.config.mjs`, `nativewind-env.d.ts`, `src/types/assets.d.ts`, tokens de cor em `src/global.css`, `_layout.tsx` e `index.tsx` mínimos (placeholder). `app.json`: orientação livre, tema claro e plugins de image-picker e secure-store. `expo-image` mantido.
- **Arquivos modificados:** `package.json`, `package-lock.json`, `app.json`, `tsconfig.json` (NativeWind incluiu `nativewind-env.d.ts`), `eslint.config.js`, os arquivos criados acima e as remoções em `src/components`, `src/constants`, `src/hooks` e `scripts`.
- **Checks:** `npx tsc --noEmit` OK; `npx expo lint` OK; `npx expo-doctor` 21/21; `expo export --platform web` gerou o CSS com os tokens. Não testado em dispositivo, simulador ou Expo Go.
- **Docs atualizados:** `docs/implementation-plan.md`, `docs/deployment-log.md`.
- **Riscos/Débito técnico:** NativeWind v5 é RC. `npm audit` aponta 31 vulnerabilidades (11 moderadas, 20 altas), não analisadas nem corrigidas. Fonte Montserrat instalada, mas ainda não carregada. `zod` 4 (a doc não fixava a versão).

## [2026-10-09] - Entrega: (Alterar para novo padrão) (Esqueleto de pastas)

- **Fase:** Fase 1 - Scaffold técnico (parcial)
- **O que foi feito:** Criadas 69 pastas (globais, rotas `(auth)`/`(app)` e 6 features) conforme `architecture.md`, cada uma com `.gitkeep`. Criado `.env.example` com `EXPO_PUBLIC_API_URL`.
- **Arquivos modificados:** `src/**` (apenas pastas e `.gitkeep`), `.env.example`, `docs/architecture.md`, `docs/implementation-plan.md`, `docs/issues.md`, `docs/deployment-log.md`
- **Checks:** listagem das pastas criadas. Lint/typecheck não executados (sem código novo). A API em `https://fivesense-api.onrender.com` não respondeu em 60 s numa chamada de teste (possível cold start); não foi validada.
- **Docs atualizados:** os listados acima.
- **Riscos/Débito técnico:** arquivos do template Expo ainda fora da estrutura; remover na Fase 1.

## [2026-10-09] - Entrega: (Alterar para novo padrão) (Revisão documental de Fundamentos e Componentes)

- **Fase:** Fase 0 - Documentação do projeto; permanecem decisões abertas.
- **O que foi feito:** Revisão via Figma das páginas 01 · Fundamentos (`3:12`) e 02 · Componentes (`3:13`), tokens/estilos locais, catálogo e propriedades de componentes selecionados. Corrigidos botões, sidebar/Nav, sombras, exceção tipográfica do rodapé e seleção de representantes. Acrescentados mapa de tokens, catálogo rastreável, divergências e critérios de conferência visual. Removida a afirmação vigente de impossibilidade de ler o Figma; a entrada histórica anterior foi preservada.
- **Arquivos modificados:** `docs/design-guidelines.md`, `docs/coding-standards.md`, `docs/testing.md`, `docs/issues.md`, `docs/implementation-plan.md`, `docs/decision-log.md`, `docs/deployment-log.md`.
- **Checks:** comparação documental com valores obtidos do Figma; revisão de diff, referências locais e contagem/mapeamento de tokens. `npm run lint` falhou porque o executável expo não está disponível; `npx --no-install --offline tsc --noEmit` falhou com ENOTCACHED, sem TypeScript local/cache disponível. A pasta não possui node_modules. Nenhuma dependência instalada; não houve verificação de UI em execução.
- **Docs atualizados:** os sete documentos acima. Nenhum arquivo de documentação criado/removido no repositório; código e Figma preservados.
- **Riscos/Débito técnico:** limite de chamadas do plano Figma interrompeu a inspeção detalhada dos componentes restantes; páginas de telas/estados não auditadas. Pendentes os conflitos de Badge 5S, alvo de Button-SM, variantes genéricas e identidade. Contrato de sessão, senha e calendário permanece limitado pela API e pelas decisões já registradas.

## [2026-10-09] - Entrega: (Alterar para novo padrão) (Adaptação dos docs ao projeto)

- **Fase:** Fase 0 - Documentação do projeto
- **O que foi feito:** Framework SpecFirst adaptado ao Five Sense App. Reescritos `AGENTS.md`, `README.md` e os docs de produto, design, arquitetura, dados, segurança, padrões, testes, workflow e plano. Histórico do template foi substituído. Após aprovação do humano, removidos 12 docs (`backlog`, `client-launch-checklist`, `context-strategy`, `deploy`, `domains`, `editor`, `implementation-governance`, `new-client-workflow`, `operations`, `pdf-export`, `templates`, `tooling-adapters`); `CLAUDE.md` mantido e reduzido. Documentação da API v1 incorporada (`data-model.md`, `security.md`, `architecture.md`, `workflows.md`, `design-guidelines.md`).
- **Arquivos modificados:** `AGENTS.md`, `README.md`, `docs/README.md`, `docs/project-overview.md`, `docs/workflows.md`, `docs/design-guidelines.md`, `docs/architecture.md`, `docs/data-model.md`, `docs/security.md`, `docs/coding-standards.md`, `docs/testing.md`, `docs/ai-workflow.md`, `docs/implementation-plan.md`, `docs/issues.md`, `docs/decision-log.md`, `docs/deployment-log.md`
- **Checks:** revisão documental. Nenhum código; lint/typecheck não aplicáveis. Figma não pôde ser lido (exige login).
- **Docs atualizados:** os listados acima.
- **Riscos/Débito técnico:** API pública, sem token nem autorização; 16 lacunas entre requisitos e API em `data-model.md`; enums de `role`/`status` não confirmados; NativeWind v5 está em release candidate; docs sujeitos a ajuste após ver o Figma.

