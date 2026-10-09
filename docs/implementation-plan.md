# Implementation Plan

## Objetivo

Entregar o app Five Sense (Android, iOS, tablet e web/desktop) conforme o Documento de Requisitos 5S v1.0, o briefing de design e o Figma, consumindo a API do projeto.

## Primeira entrega

Todos os fluxos do escopo em `project-overview.md`, com tratamento de erro, skeleton, pull to refresh e permissão por perfil.

## Fases

### Fase 0 - Documentação do projeto

**Status:** Em andamento (aguardando decisões sobre as lacunas da API)

- [x] Adaptar `AGENTS.md`, `README.md` e docs ao projeto.
- [x] Registrar requisitos, fluxos, design, arquitetura, dados e segurança.
- [x] Humano aprovou a remoção de 12 documentos (feita) e o escopo geral.
- [x] Documentação da API recebida e incorporada em `data-model.md`.
- [ ] Humano decidir as lacunas entre requisitos e API (`data-model.md`, tabela de lacunas).
- [x] Revisar docs com Fundamentos e catálogo/propriedades disponíveis de Componentes (2026-10-09); registrar fontes, divergências e limites da leitura.
- [ ] Resolver divergências de Badge 5S, alvo de Button-SM e variantes genéricas; completar propriedades detalhadas não lidas por limite do Figma (`design-guidelines.md`).

### Fase 1 - Scaffold técnico

**Status:** Em andamento

- [ ] Remover telas e componentes de exemplo do template Expo.
- [x] Instalar e configurar NativeWind, Montserrat e Lucide (2026-10-09). Pendentes: `expo-secure-store`, `expo-image-picker`, `zod`, `@tanstack/react-query`, quando forem necessários.
- [ ] Ajustar `app.json` (orientação livre, tema claro).
- [x] Tokens do tema em `src/global.css` (cores, raios, botão); ainda falta conferir espaçamentos e demais estilos de texto.
- [ ] Componentes base de `ui/` (Button feito em 2026-10-09; faltam Input, Badge, Modal, Alert, Skeleton, EmptyState, ErrorState, Pagination), mapeando variantes/slots existentes e distinguindo estados ainda sem componente no Figma.
- [ ] Cliente de API com `AppError`, sessão e permissões.

### Fase 2 - Autenticação e conta

**Status:** Planejada

- [ ] Login, logout, informações da conta e página principal por perfil.
- [ ] Sessão expirada (401) e acesso negado (403), tratados no cliente de API.
- [ ] Recuperação, redefinição e alteração de senha: bloqueadas até a API ter os endpoints.

### Fase 3 - Materiais e Problemas (Gestor)

**Status:** Planejada

- [ ] Materiais: lista (Gestor e Visualizador), detalhes, criar, editar, excluir, alerta de estoque.
- [ ] Problemas: lista paginada, detalhes, criar, editar, excluir.

### Fase 4 - Equipes

**Status:** Planejada

- [ ] Lista paginada com status, detalhes; Gestor cria, edita, exclui e gerencia representantes.
- [ ] Visualizador altera status da própria equipe e consulta o calendário.

### Fase 5 - Ocorrências e Usuários

**Status:** Planejada

- [ ] Ocorrência com problema, material, quantidade e imagem (câmera/galeria, 5 MB, upload prévio).
- [ ] Administrador: lista, cadastro (com senha), detalhes e edição (nome, e-mail, status) de usuários.

### Fase 6 - Responsividade e fechamento

**Status:** Planejada

- [ ] Layout tablet/desktop (navegação lateral) e celular.
- [ ] Revisão de acessibilidade, estados e teclado virtual.
- [ ] Checks finais e atualização dos logs.

## Regras de avanço

Não concluir fase com checklist aberto. Mudança de ordem ou critério exige aprovação humana e registro em `decision-log.md`.

## Dependências críticas

1. API: token/expiração, vínculo usuário-equipe, endpoints de senha (ver lacunas em `data-model.md`).
2. Decisões humanas sobre as lacunas.
3. Conferir as composições de telas na fase de implementação; complementar detalhes e decisões pendentes da revisão Figma em `design-guidelines.md` (leitura parcial de propriedades limitada pela cota).

## Critérios globais de aceite

- Todos os RF do escopo cobertos por perfil correto.
- Toda chamada de API trata erro; toda lista tem skeleton, pull to refresh, vazio e erro.
- Lint e typecheck sem erros; fluxos verificados manualmente.
- Visual conforme `design-guidelines.md`.
