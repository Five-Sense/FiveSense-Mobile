# Implementation Plan

> **Escopo vigente (2026-10-16, pedido do humano; decisão 0009):** cliente exclusivo do Visualizador. Remover a demonstração `/components`, código de Administrador/Gestor, Sidebar/NavItem e feedback de estoque em MaterialItem/MaterialDetailsCard. MenuButton/AppMenu e os dados de quantidade permanecem. O catálogo lido do Figma deixa de definir o inventário do cliente; o contrato da API externa permanece documentado como referência.

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

- [x] Remover telas e componentes de exemplo do template Expo (2026-10-09).
- [x] Instalar e configurar NativeWind, Lucide, fonte, secure-store, image-picker, zod e TanStack Query; Montserrat carregada em `_layout.tsx` e conferida no catálogo em 2026-10-16.
- [x] Ajustar `app.json` (orientação livre, tema claro).
- [x] Tokens do tema em `src/shared/global.css`, conforme `colors.tokens.json` e `design-guidelines.md`. Base de fontes, raios, dimensões e tipografia restaurada após perdas no merge; conferida nos componentes em web (2026-10-16).
- [x] Estrutura de pastas global e de features conforme `architecture.md` (esqueleto criado em 2026-10-09; `.env.example` com a URL da API).
- [ ] Componentes globais em `src/components/<função>/` (Button, Input, Badge, Modal, Alert, Skeleton, EmptyState, ErrorState, Pagination), mapeando variantes/slots existentes e distinguindo estados ainda sem componente no Figma. **Button** (hoje em `src/components/ui/button`, a mover para `actions/`), **Select** e **MaterialItem** (feature `materials`) criados em 2026-10-09; **Alert** entregue em 2026-10-09 (`feedback/alert.tsx`, node Figma `33:2952`, 4 variantes); restantes pendentes.
- [x] Nav/AppSidebar entregues anteriormente; componentes e tokens exclusivos retirados do escopo pelo humano em 2026-10-16 (decisão 0009).
- [x] MenuButton e AppMenu horizontais, em componentes separados, conforme Figma e imagens de 2026-10-16; sem tela de demonstração. Tipos, lint e conferência web aprovados.
- [x] Demonstração de MenuButton/AppMenu criada e conferida em 2026-10-16; removida por novo pedido do humano na mesma data. Permanecem somente os componentes.
- [x] Integrar a develop em `feature/nav-component` (2026-10-16), preservando o histórico de entregas e ajustando o import de Icon do MenuButton para `src/shared/`; lint e typecheck aprovados.
- [x] Catálogo geral entregue e verificado anteriormente; removido por novo pedido do humano em 2026-10-16. Correções reais dos componentes permanecem.
- [ ] Cliente de API (`src/services/api`) com `AppError`, contexto de sessão e permissões.

### Fase 2 - Autenticação e conta

**Status:** Em andamento (incremento de login autorizado em 2026-10-16; demais telas aguardam prints)

- [x] Tela inicial do login do Visualizador em feature/login-flow, fiel ao print/Figma, usando componentes existentes e API atual; Nome de usuário (decisão do humano), feedbacks de obrigatórios, tamanho e credenciais incorretas; confirmação de sucesso na mesma tela.
- [ ] Integração web real: backend liberar CORS; conferir sucesso com conta VIEWER e dispositivo nativo.
- [ ] Conta, logout e página principal: próximos prints/escopo; confirmação na própria tela aprovada enquanto o destino não chega.
- [ ] Login, logout, informações da conta e página principal do Visualizador. Visual da página principal (`HomeScreen` + `AccessCard`) entregue em 2026-10-16; faltam sessão (nome/perfil reais), login, logout e conta.
- [ ] Sessão expirada (401) e acesso negado (403), tratados no cliente de API.
- [ ] Recuperação, redefinição e alteração de senha: bloqueadas até a API ter os endpoints.

### Fase 3 - Consulta de materiais

**Status:** Em andamento (apenas o componente de detalhes do material, a pedido do humano; telas e API seguem planejadas)

- [x] Componente `MaterialDetailsCard` (Figma `208:7927`), somente apresentação (2026-10-16).
- [ ] Materiais: lista e detalhes para o Visualizador, sem feedback de estoque baixo; exibir quantidade como dado.
- Gestão de problemas e CRUD de materiais fora do escopo; seleção de problema na ocorrência continua dependendo da API.

### Fase 4 - Equipes

**Status:** Em andamento (apenas componentes de card, a pedido do humano; telas e API seguem planejadas)

- [x] Componentes `TeamCard` (Figma `228:7974`), `TeamDetailsCard` (`208:6580`), `RepresentativeCard` e `TeamStatusBadge`, somente apresentação (2026-10-16).
- [ ] Lista paginada com status e detalhes para o Visualizador. CRUD e gestão de representantes fora do escopo.
- [ ] Visualizador altera status da própria equipe e consulta o calendário.

### Fase 5 - Ocorrências

**Status:** Planejada

- [ ] Ocorrência com problema, material, quantidade e imagem (câmera/galeria, 5 MB, upload prévio).
- Administração de usuários fora do escopo do cliente.

### Fase 6 - Responsividade e fechamento

**Status:** Planejada

- [ ] Layout tablet/desktop e celular com MenuButton/AppMenu; sem Sidebar/NavItem. Moldura `AppLayout` (cabeçalho + conteúdo + menu inferior) entregue em 2026-10-16; falta conferir tablet/desktop e as telas.
- [ ] Revisão de acessibilidade, estados e teclado virtual.
- [ ] Checks finais e atualização dos logs.

## Ajuste autorizado - 2026-10-16

- [x] Removidos catálogo, código dos perfis excluídos, Sidebar/NavItem e aviso de estoque; docs atualizados; tipos, lint, diff e exportação web aprovados. MenuButton/AppMenu preservados.

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

