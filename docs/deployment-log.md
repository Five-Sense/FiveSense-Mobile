# Deployment Log

Histórico técnico do que foi entregue. Mais recente no topo. Cada entrada referencia issue/fase, arquivos, checks e riscos. Decisões duradouras vão em `decision-log.md`; estado vivo em `issues.md`.

## Template

```md
## [AAAA-MM-DD] - Entrega: ISSUE-000 (título)

- **Fase:**
- **O que foi feito:**
- **Arquivos modificados:**
- **Checks:**
- **Docs atualizados:**
- **Riscos/Débito técnico:**
```

## Entradas

## [2026-10-09] - Entrega: ISSUE-002 (Dependências e NativeWind)

- **Fase:** Fase 1 - Scaffold técnico (parcial)
- **O que foi feito:** Removidos `@expo/ui`, `expo-glass-effect`, `expo-symbols`, `expo-device`, `expo-web-browser`, o script/arquivo `reset-project` e os arquivos de exemplo do template. Instalados `nativewind@5.0.0-rc.0`, `react-native-css@3.1.0-rc.0`, `tailwindcss` e `@tailwindcss/postcss` 4.1.12, `lightningcss@1.30.1` (com `overrides`), `postcss`, `react-native-svg`, `lucide-react-native`, `@expo-google-fonts/montserrat`, `expo-secure-store`, `expo-image-picker`, `zod` 4, `@tanstack/react-query` e, exigidos pelo `expo lint`, `eslint` e `eslint-config-expo`. Criados `metro.config.js`, `postcss.config.mjs`, `nativewind-env.d.ts`, `src/types/assets.d.ts`, tokens de cor em `src/global.css`, `_layout.tsx` e `index.tsx` mínimos (placeholder). `app.json`: orientação livre, tema claro e plugins de image-picker e secure-store. `expo-image` mantido.
- **Arquivos modificados:** `package.json`, `package-lock.json`, `app.json`, `tsconfig.json` (NativeWind incluiu `nativewind-env.d.ts`), `eslint.config.js`, os arquivos criados acima e as remoções em `src/components`, `src/constants`, `src/hooks` e `scripts`.
- **Checks:** `npx tsc --noEmit` OK; `npx expo lint` OK; `npx expo-doctor` 21/21; `expo export --platform web` gerou o CSS com os tokens. Não testado em dispositivo, simulador ou Expo Go.
- **Docs atualizados:** `docs/implementation-plan.md`, `docs/deployment-log.md`.
- **Riscos/Débito técnico:** NativeWind v5 é RC. `npm audit` aponta 31 vulnerabilidades (11 moderadas, 20 altas), não analisadas nem corrigidas. Fonte Montserrat instalada, mas ainda não carregada. `zod` 4 (a doc não fixava a versão).

## [2026-10-09] - Entrega: ISSUE-002 (Esqueleto de pastas)

- **Fase:** Fase 1 - Scaffold técnico (parcial)
- **O que foi feito:** Criadas 69 pastas (globais, rotas `(auth)`/`(app)` e 6 features) conforme `architecture.md`, cada uma com `.gitkeep`. Criado `.env.example` com `EXPO_PUBLIC_API_URL`.
- **Arquivos modificados:** `src/**` (apenas pastas e `.gitkeep`), `.env.example`, `docs/architecture.md`, `docs/implementation-plan.md`, `docs/issues.md`, `docs/deployment-log.md`
- **Checks:** listagem das pastas criadas. Lint/typecheck não executados (sem código novo). A API em `https://fivesense-api.onrender.com` não respondeu em 60 s numa chamada de teste (possível cold start); não foi validada.
- **Docs atualizados:** os listados acima.
- **Riscos/Débito técnico:** arquivos do template Expo ainda fora da estrutura; remover na Fase 1.

## [2026-10-09] - Entrega: ISSUE-001 (Revisão documental de Fundamentos e Componentes)

- **Fase:** Fase 0 - Documentação do projeto; permanecem decisões abertas.
- **O que foi feito:** Revisão via Figma das páginas 01 · Fundamentos (`3:12`) e 02 · Componentes (`3:13`), tokens/estilos locais, catálogo e propriedades de componentes selecionados. Corrigidos botões, sidebar/Nav, sombras, exceção tipográfica do rodapé e seleção de representantes. Acrescentados mapa de tokens, catálogo rastreável, divergências e critérios de conferência visual. Removida a afirmação vigente de impossibilidade de ler o Figma; a entrada histórica anterior foi preservada.
- **Arquivos modificados:** `docs/design-guidelines.md`, `docs/coding-standards.md`, `docs/testing.md`, `docs/issues.md`, `docs/implementation-plan.md`, `docs/decision-log.md`, `docs/deployment-log.md`.
- **Checks:** comparação documental com valores obtidos do Figma; revisão de diff, referências locais e contagem/mapeamento de tokens. `npm run lint` falhou porque o executável expo não está disponível; `npx --no-install --offline tsc --noEmit` falhou com ENOTCACHED, sem TypeScript local/cache disponível. A pasta não possui node_modules. Nenhuma dependência instalada; não houve verificação de UI em execução.
- **Docs atualizados:** os sete documentos acima. Nenhum arquivo de documentação criado/removido no repositório; código e Figma preservados.
- **Riscos/Débito técnico:** limite de chamadas do plano Figma interrompeu a inspeção detalhada dos componentes restantes; páginas de telas/estados não auditadas. Pendentes os conflitos de Badge 5S, alvo de Button-SM, variantes genéricas e identidade. Contrato de sessão, senha e calendário permanece limitado pela API e pelas decisões já registradas.

## [2026-10-09] - Entrega: ISSUE-001 (Adaptação dos docs ao projeto)

- **Fase:** Fase 0 - Documentação do projeto
- **O que foi feito:** Framework SpecFirst adaptado ao Five Sense App. Reescritos `AGENTS.md`, `README.md` e os docs de produto, design, arquitetura, dados, segurança, padrões, testes, workflow e plano. Histórico do template foi substituído. Após aprovação do humano, removidos 12 docs (`backlog`, `client-launch-checklist`, `context-strategy`, `deploy`, `domains`, `editor`, `implementation-governance`, `new-client-workflow`, `operations`, `pdf-export`, `templates`, `tooling-adapters`); `CLAUDE.md` mantido e reduzido. Documentação da API v1 incorporada (`data-model.md`, `security.md`, `architecture.md`, `workflows.md`, `design-guidelines.md`).
- **Arquivos modificados:** `AGENTS.md`, `README.md`, `docs/README.md`, `docs/project-overview.md`, `docs/workflows.md`, `docs/design-guidelines.md`, `docs/architecture.md`, `docs/data-model.md`, `docs/security.md`, `docs/coding-standards.md`, `docs/testing.md`, `docs/ai-workflow.md`, `docs/implementation-plan.md`, `docs/issues.md`, `docs/decision-log.md`, `docs/deployment-log.md`
- **Checks:** revisão documental. Nenhum código; lint/typecheck não aplicáveis. Figma não pôde ser lido (exige login).
- **Docs atualizados:** os listados acima.
- **Riscos/Débito técnico:** API pública, sem token nem autorização; 16 lacunas entre requisitos e API em `data-model.md`; enums de `role`/`status` não confirmados; NativeWind v5 está em release candidate; docs sujeitos a ajuste após ver o Figma.

