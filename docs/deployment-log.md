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

## [2026-10-09] - Entrega: ISSUE-002 (Componente Button e base de estilo)

- **Fase:** Fase 1 - Scaffold técnico (parcial).
- **O que foi feito:** `Button` em `src/components/ui/button` com `variant` (`primary` | `secondary` | `destructive`), `disabled`, `loading`/`loadingLabel`, `icon` (Lucide), foco visível e acessibilidade. Mapeamento do Figma: Default, Hover, Pressed e Disabled são estados de `primary` (`hover:`/`active:` e `disabled`); Secondary é variante. Altura 48 em todas as variantes (Figma mede 50 no Secondary; borda dentro dos 48). `destructive-pressed` (#991B1B) é complemento sem origem no Figma. Ícone: slot 32 com desenho 24 (regra do design-guidelines). NativeWind v5, Tailwind 4, Montserrat e Lucide instalados com versões fixas; `lightningcss` fixado em 1.30.1 via `overrides` (versões maiores quebram o `global.css`).
- **Arquivos modificados:** `package.json`, `package-lock.json`, `tsconfig.json`, `metro.config.js`, `postcss.config.mjs`, `nativewind-env.d.ts`, `eslint.config.js` (gerado pelo `expo lint`), `src/global.css`, `src/app/_layout.tsx`, `src/components/ui/button/{button.tsx,index.ts}`.
- **Checks:** `npx tsc --noEmit` sem erros; ESLint sem erros nos arquivos novos; `expo export` para web e Android concluem com o Button no bundle e as classes geradas. `npx expo lint` global falha por erro preexistente do template (`src/hooks/use-color-scheme.web.ts`, setState em effect). Não verificado em dispositivo/emulador: aparência de cada estado, anel de foco (`outline`) e cor do ícone/spinner via `styled`.
- **Docs atualizados:** `issues.md`, `implementation-plan.md`, `deployment-log.md`.
- **Riscos/Débito técnico:** NativeWind v5 é RC. Button ainda não é usado em nenhuma tela. `expo-doctor` não executado. Hover/pressed do secondary (`surface-hover`/`brand-soft`) e do destructive são escolhas minhas, a confirmar com o design.

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
