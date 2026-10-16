# Issues

Estado vivo do trabalho. Status: `Planejada`, `Em andamento`, `Concluida`, `Bloqueada`. Cada issue tem `### Estado atual` com notas datadas. Regra: issue em execução fica `Em andamento`; ao concluir, `Concluida` (salvo bloqueio).

## ISSUE-001 - Documentação SpecFirst do projeto

**Tipo:** Docs
**Status:** Em andamento
**Fase:** Fase 0

### Objetivo

Adaptar o framework ao Five Sense App e obter aprovação humana do escopo antes de codificar.

### Critérios de aceite

- Docs refletem requisitos, design, arquitetura, dados e segurança do projeto.
- Documentos desnecessários removidos após aprovação, sem referências quebradas.
- Pendências de decisão listadas e respondidas.

### Estado atual

- **2026-10-09 (IA, revisão Figma):** Concluído o ajuste documental com base na leitura de 01 · Fundamentos e no catálogo/parte das propriedades de 02 · Componentes, solicitado pelo humano. Tokens e tipografia conferidos; diferenças e itens não verificados registrados em `design-guidelines.md`. Corrigidas contradições de botões, navegação, sombras e representantes; atualizados critérios visuais. Nenhum código ou arquivo do Figma alterado. Limite do plano interrompeu propriedades detalhadas restantes. Lint e typecheck bloqueados pela ausência de dependências locais. ISSUE-001 segue Em andamento pelas decisões de API/design ainda abertas.
- **2026-10-09 (IA):** Docs adaptados. Remoções aprovadas e executadas (12 arquivos); `CLAUDE.md` mantido e reduzido. Documentação da API incorporada; lacunas entre requisitos e API listadas em `data-model.md` aguardando decisão humana. Nenhum código criado.

## ISSUE-002 - Scaffold técnico

**Tipo:** Chore | **Status:** Em andamento | **Fase:** Fase 1

Estado atual:
- 2026-10-09 (IA) componente global `Alert` criado em `src/components/feedback/` a partir do node Figma `33:2952` (variantes Error, Info, Success, Warning), 100% fiel ao Figma: só superfície, sombra, título e descrição na cor semântica, sem ícone nem ação (decisão do humano, ver `decision-log.md` 0007). `tsc` e `expo lint` OK. Restam os demais componentes base, tema (tipografia/espaçamento), cliente de API e sessão/permissões.
- 2026-10-09 (IA) esqueleto de pastas e `.env.example` criados. Restam dependências, tema, cliente de API e componentes base.

Objetivo: NativeWind, fontes, ícones, tokens, componentes base de UI, cliente de API, sessão e permissões. Aceite: app abre no Android/iOS/web com tema, lint e typecheck passando.

### Estado atual

- **2026-10-09 (IA):** Implementados componentes reutilizáveis `Input` e `PasswordInput` (`src/components/ui/input.tsx` e `src/components/ui/password-input.tsx`). A indicação de erro é exclusivamente visual (borda vermelha #B91C1C no input e olho vermelho no password), delegando mensagens de erro para o Alert. Removidos os arquivos temporários de teste/showcase a pedido do humano, mantendo apenas os componentes de entrada na UI e a raiz `src/app/index.tsx` restaurada limpa. Checks `npx tsc --noEmit` e `npx expo lint` passando com 0 erros. Status: Em andamento.
- **2026-10-09 (IA):** Iniciada por pedido do humano (componente Button). Instalados NativeWind 5.0.0-rc.0, Tailwind 4, Montserrat e Lucide; tokens de cor/raio/tipografia em `src/global.css`; fonte carregada em `_layout.tsx`; criado `src/components/ui/button` (spec em `.kiro/specs/ui-button-component`). Restam os demais componentes de `ui/`, cliente de API, sessão e permissões, remoção do template, `app.json`. `expo lint` ainda falha por erro preexistente do template em `src/hooks/use-color-scheme.web.ts`. Status: Em andamento.
- **2026-10-09 (IA):** Iniciada por pedido do humano (componentes Button, Header e Footer). Instalados NativeWind 5.0.0-rc.0, Tailwind 4, Montserrat e Lucide; tokens de cor/raio/tipografia em `src/global.css`; fonte carregada em `_layout.tsx`; criados `src/components/ui/button` (spec em `.kiro/specs/ui-button-component`) e os componentes estáticos `Header.tsx` e `Footer.tsx`. O Header é exclusivo do Tablet: acompanha a largura do contêiner, mede 72 de altura, usa o ativo de logo e expõe a ação opcional de saída. O Footer acompanha o contêiner, preserva os 8 de padding e a tipografia Montserrat Footer 12/15, e cresce para texto ampliado. Restam os demais componentes de `ui/`, cliente de API, sessão e permissões, remoção do template, `app.json`. `npx tsc --noEmit` e `npx expo lint` passam no estado atual. Status: Em andamento.


### Incremento autorizado: Nav e App/Sidebar

- **Branch:** `feature/nav-component`.
- **Fonte:** imagem App/Sidebar enviada pelo humano em 2026-10-09 e medidas/estados já conferidos em `design-guidelines.md`. O texto do pedido menciona inputs, mas a imagem e a branch identificam navegação; o incremento reproduz a barra lateral mostrada.
- **Escopo:** Nav reutilizável (selecionado/não selecionado, foco, hover, desabilitado), App/Sidebar com marca configurável, menus recebidos da tela, conta e saída no rodapé. Somente os componentes reutilizáveis e seus tokens. A demonstração isolada foi retirada do escopo por pedido do humano em 2026-10-16; sem rotas de teste, menus simulados ou sessão.
- **Aceite:** largura 222, padding 16, itens mínimo 56, slot de ícone 32 com Lucide 24, Montserrat 16/24, raio 8, ativo brand-soft/brand-primary, alvo mínimo 48, nomes acessíveis e rolagem em altura reduzida/texto ampliado. Lint/typecheck e conferência visual/interativa web.
- **Identidade:** marca textual provisória conforme a imagem e os docs, substituível pelo ativo oficial via prop; contornos magenta dos slots não fazem parte da interface.

### Estado do incremento de navegação

- **2026-10-16 (IA, remoção da prévia):** Em andamento por pedido do humano. Remover a rota /sidebar e SidebarPreview, preservando NavItem, Sidebar e seus tokens; manter o histórico das verificações já realizadas.

- **2026-10-16 (IA):** Incremento visual concluído e disponível em `/sidebar`. Resolvidos conflitos locais de stash/atualização em `issues.md`, `implementation-plan.md` e `src/app/index.tsx`, preservando as mudanças recentes do projeto e o placeholder inicial. Dependências existentes sincronizadas com `npm install` (sem alteração em package.json/package-lock.json). `tsc --noEmit` e `expo lint` passam. Conferência web em 1366x900, 390x844 e 1024x300: dimensões, cor de ícone/texto, seleção, perfis, callbacks simulados, foco, Escape, retorno do foco, rolagem e texto ampliado; sem erros/avisos do navegador. Android/iOS não executados. A ISSUE-002 permanece Em andamento pelos demais itens do scaffold.

- **2026-10-09 (IA):** Em andamento. AGENTS.md e todos os docs lidos antes de alterar código. Base da branch preservada; nenhuma dependência nova prevista.

### Incremento autorizado: MenuButton e AppMenu

- **Branch:** `feature/nav-component`; pedido do humano e três imagens de referência em 2026-10-16.
- **Fonte:** consulta direta com screenshot/contexto de `App/Menu` (`33:2741`) e `Menu - Button` (`43:3650`) no Figma, além da imagem da barra preenchida enviada pelo humano. Os slots vazios e as marcações magenta do editor não são elementos visuais da interface.
- **Escopo:** dois componentes em `src/components/navigation/`: `MenuButton` (ícone Lucide, label, onPress, selected, disabled, nome/hint acessíveis) e `AppMenu` (barra com slot `children`). Seleção e permissões continuam sob controle de quem compõe a barra. Reutilizar os tokens e o componente global de ícones; sem nova dependência, sessão, API ou rota de demonstração.
- **Aceite visual:** item com ícone 32, padding 8, gap 4, texto Montserrat Regular 14/20; superfície branca, texto/ícone não selecionados em text-secondary e selecionados em brand-primary, conforme a barra preenchida. Barra com borda superior border-subtle, padding externo 4, slot com padding 10 e gap 24; largura acompanha o contêiner.
- **Adaptação documentada:** o componente vazio mede 834x65, com slot de altura 56, enquanto o MenuButton mede 72. A barra preenchida deve crescer para conter os itens e seus paddings, como na imagem, em vez de recortar o texto. Permitir quebra de linha em pouca largura e texto ampliado; toque mínimo 48, foco visível e desabilitado sem interação.
- **Estado atual (2026-10-16):** Concluído o incremento de MenuButton/AppMenu. Todos os docs foram lidos antes de código; branch inicialmente limpa. Implementados os dois componentes separados, reutilizando Icon e tokens existentes. Tipos e lint aprovados; conferência web confirmou medidas, cores, seleção controlada, clique/Enter/foco, bloqueio de disabled, larguras 834/390/320 e texto a 200%. Cenário temporário removido: nenhuma tela/rota de teste permanece. Android/iOS não executados. ISSUE-002 e Fase 1 continuam Em andamento pelos demais itens.

### Demonstração autorizada de MenuButton/AppMenu

- **Pedido:** em 2026-10-16, após a entrega dos componentes, o humano solicitou uma demonstração. Este pedido autoriza uma rota de prévia e substitui a restrição anterior de não manter demonstração apenas para este incremento.
- **Escopo:** `/menu-demo`, com AppMenu no rodapé, Home/Ocorrências/Equipes/Materiais, seleção controlada e feedback local. Exemplos separados de MenuButton comum, selecionado e desabilitado. Usar os componentes existentes; sem alterar suas APIs, sessão, dados ou navegação de negócio.
- **Organização:** rota fina em `src/app/menu-demo.tsx`; tela de demonstração isolada em `src/features/component-demo/screens/menu-demo-screen.tsx`. Tela inicial preservada.
- **Aceite:** seleção por clique/teclado, disabled sem ação, layout com rolagem e área segura, tipos/lint e conferência web; servidor e link disponíveis para o humano.
- **Estado atual:** Demonstração removida por novo pedido do humano em 2026-10-16. Excluídas a rota `/menu-demo`, sua tela e as pastas vazias exclusivas. MenuButton, AppMenu e tela inicial preservados. Tipos, lint e diff aprovados; nenhuma referência à demonstração permanece em `src/`. As verificações da demonstração anterior permanecem no histórico de entregas.

## ISSUE-003 - Autenticação e conta

**Tipo:** Feature | **Status:** Em andamento | **Fase:** Fase 2

Objetivo: RF001 e RF002 (RF003 e RF004 bloqueados pela API), tratamento de 401/403. Aceite: login/logout com erro tratado e navegação por perfil.

### Incremento autorizado: tela inicial do login - 2026-10-16

- **Branch:** feature/login-flow, selecionada e limpa no início. Ler docs antes de código; reutilizar componentes existentes; cliente somente do Visualizador conforme pedido anterior, sem fluxos de gestão/administração.
- **Fonte visual:** print individual do humano e contexto Figma 33:2564 (834x1194); feedbacks 238:8117 (obrigatórios), 238:8246 (e-mail inválido), 238:8294 (credenciais incorretas).
- **Visual:** page; logo 246x149, gap 64 até Auth/Card 440 com padding 32, raio 12 e borda sutil; título Auth 32/40, descrição Body 16/24; campos 48, label 14/20, gap 24, botão Login com seta à direita. Altura cresce com feedback. Largura fluida no celular, padding 24, área segura, rolagem e teclado.
- **Composição:** rota fina; screen, formulário, schema, hook e service na feature auth; único cliente HTTP/AppError em shared/services/api. Reutilizar Input, PasswordInput, Button, Alert, Icon e Spinner, logo-symbol/logo-text se corresponderem exatamente. Restaurar tokens documentados ausentes; corrigir imports de Icon que quebram a linha de base e o ciclo Input/PasswordInput. Button ganha posição opcional de ícone (padrão anterior preservado), bloqueio efetivo ao carregar e cores por Icon/Spinner globais; Alert recebe fontes/tokens Montserrat e descrição acessível.
- **Comportamento:** validar obrigatórios antes de envio; nome de usuário sem regra de formato de e-mail; senha não recebe regras de cadastro nem é normalizada; mostrar Alert com bordas somente nos campos envolvidos. Editar limpa os erros pertinentes; mostrar/ocultar senha; Enter envia; loading impede duplicidade, com timeout e cancelamento; erros de rede, API e resposta inválida têm feedback recuperável. Não registrar credenciais nem armazenar senha.
- **Contrato confirmado:** POST /api/v1/auth/login recebe username/password, responde authenticated/userId/name/username/email/role; inativo/incorreto retorna 400. X-User-Role é necessário nas outras rotas; sem JWT documentado. O humano confirmou que o protótipo está incorreto: campo Nome de usuário, obrigatório, até 255 caracteres, sem validação de e-mail. Senha obrigatória e até 255, preservada sem trim no envio. Recuperação agora aparece na API, mas continua fora deste incremento/print.
- **Pós-login aprovado:** confirmação de sucesso na própria tela enquanto a próxima tela não chega. Sessão guarda somente dados validados de VIEWER (SecureStore no nativo; memória no web). Sem guardar senha/token nem inventar expiração. Nenhuma tela principal adicional.
- **Estado do incremento:** cliente implementado; tipos, lint, diff e exportação web aprovados. Layout, assets e controles conferidos em web (1280x720, 834x1194, 390x844, 320x640), sem transbordamento horizontal. Obrigatórios completos/parciais, foco para senha, mostrar/ocultar, Enter, loading desabilitado, erro e sucesso confirmados; fixtures locais para estados remotos e sessão web reiniciada no reload. API real confirmou 400 para credenciais fictícias. Sem dependências novas nem suíte permanente. ISSUE-003/Fase 2 permanecem Em andamento pelas demais telas e pendências externas.
- **Bloqueio externo:** web real sem CORS para localhost (OPTIONS 200 sem Access-Control-Allow-Origin); backend precisa liberar origem, POST/OPTIONS e Content-Type. O app informa falha de conexão e permite novo envio. Não houve bypass/proxy nem alteração na API. Sucesso com conta real VIEWER e execução Android/iOS ainda não verificados.

## ISSUE-004 - Materiais e Problemas

**Tipo:** Feature | **Status:** Em andamento | **Fase:** Fase 3

Objetivo: RF009 a RF013 e RF027 a RF033. Aceite: CRUD por perfil, lista com skeleton/refresh/vazio/erro, confirmações de alteração e exclusão.

Estado atual: 2026-10-16 (IA) `MaterialDetailsCard` criado em `src/features/materials/components/details/` a partir do Figma `208:7927`, 100% fiel (decisão do humano, `decision-log.md` 0008). Só apresentação: sem tela, hook, serviço nem Modal. Status passa a Em andamento.

## ISSUE-005 - Equipes

**Tipo:** Feature | **Status:** Em andamento | **Fase:** Fase 4

Objetivo: RF017 a RF026. Aceite: status de 5S, representantes, calendário e permissão da própria equipe.

Estado atual: 2026-10-16 (IA) criados em `src/features/teams/`: `TeamCard` (Figma `228:7974`, variantes sem fazer/fazendo 5S), `TeamDetailsCard` (`208:6580`), `RepresentativeCard` (minicard atomizado) e `TeamStatusBadge` (reutilizada pelos dois cards; a Badge 5S não existia em nenhuma branch). 100% fiéis ao Figma (`decision-log.md` 0008). Só apresentação. Lacunas 17 e 18 registradas em `data-model.md`. Status passa a Em andamento.

## ISSUE-006 - Ocorrências e Usuários

**Tipo:** Feature | **Status:** Planejada | **Fase:** Fase 5

Objetivo: RF005 a RF008 e RF014 a RF016. Aceite: envio com imagem até 5 MB, falhas de envio tratadas, criar/listar/ver/editar usuários pelo Administrador.

## ISSUE-007 - Responsividade e fechamento

**Tipo:** Chore | **Status:** Planejada | **Fase:** Fase 6

Objetivo: layouts celular/tablet/desktop, acessibilidade e revisão final.
