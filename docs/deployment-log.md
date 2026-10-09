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

## [2026-10-09] - Entrega: ISSUE-001 (Adaptação dos docs ao projeto)

- **Fase:** Fase 0 - Documentação do projeto
- **O que foi feito:** Framework SpecFirst adaptado ao Five Sense App. Reescritos `AGENTS.md`, `README.md` e os docs de produto, design, arquitetura, dados, segurança, padrões, testes, workflow e plano. Histórico do template foi substituído. Após aprovação do humano, removidos 12 docs (`backlog`, `client-launch-checklist`, `context-strategy`, `deploy`, `domains`, `editor`, `implementation-governance`, `new-client-workflow`, `operations`, `pdf-export`, `templates`, `tooling-adapters`); `CLAUDE.md` mantido e reduzido. Documentação da API v1 incorporada (`data-model.md`, `security.md`, `architecture.md`, `workflows.md`, `design-guidelines.md`).
- **Arquivos modificados:** `AGENTS.md`, `README.md`, `docs/README.md`, `docs/project-overview.md`, `docs/workflows.md`, `docs/design-guidelines.md`, `docs/architecture.md`, `docs/data-model.md`, `docs/security.md`, `docs/coding-standards.md`, `docs/testing.md`, `docs/ai-workflow.md`, `docs/implementation-plan.md`, `docs/issues.md`, `docs/decision-log.md`, `docs/deployment-log.md`
- **Checks:** revisão documental. Nenhum código; lint/typecheck não aplicáveis. Figma não pôde ser lido (exige login).
- **Docs atualizados:** os listados acima.
- **Riscos/Débito técnico:** API pública, sem token nem autorização; 16 lacunas entre requisitos e API em `data-model.md`; enums de `role`/`status` não confirmados; NativeWind v5 está em release candidate; docs sujeitos a ajuste após ver o Figma.
