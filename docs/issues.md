# Issues

> **Escopo vigente (2026-10-16, pedido do humano; decisão 0009):** cliente exclusivo do Visualizador. Remover a demonstração `/components`, código de Administrador/Gestor, Sidebar/NavItem e feedback de estoque em MaterialItem/MaterialDetailsCard. MenuButton/AppMenu e os dados de quantidade permanecem. O catálogo lido do Figma deixa de definir o inventário do cliente; o contrato da API externa permanece documentado como referência.

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

### Incremento autorizado: catálogo geral de componentes

- **Pedido (2026-10-16):** criar uma tela geral para visualizar e conferir todos os componentes existentes e seus estados. Branch `codex/components-showcase`, criada da develop limpa.
- **Escopo:** `/components`, com busca, filtros por categoria, exemplos interativos e marcação manual de seções conferidas, além de restauração dos exemplos. Dados fictícios locais, sem API/sessão nem navegação real de negócio. Tela inicial preservada.
- **Inventário (22 componentes):** Button; Input; PasswordInput; Select; QuantityStepper e QuantityStepperButton; Alert; Icon e Spinner; NavItem e Sidebar; MenuButton e AppMenu; TableRow e TeamScheduleRow; MaterialItem e MaterialDetailsCard; TeamCard, TeamDetailsCard, RepresentativeCard e as duas implementações de TeamStatusBadge (Figma e funcional). Unidades internas aparecem também por composição. Header/Footer constam do histórico, mas seus arquivos não existem nesta branch; informar a ausência em vez de criar substitutos.
- **Estados:** variantes/ícone/disabled/loading do botão; campos padrão/preenchido/foco/erro/disabled/readOnly; senha oculta/visível; Select com escolha/validação/disabled/loading/vazio/falha/retry e opção indisponível; quantidade interativa/nos limites/disabled; quatro alertas; ícones/spinner; navegação comum/ativa/disabled e menus por perfil; linhas de agenda future/current/past; materiais com/sem estoque baixo e detalhes; equipes nos dois estados, detalhes com dados completos/mínimos e representantes. Hover/pressed/foco são conferidos por interação; não inventar variantes ausentes.
- **Organização:** feature `component-showcase` reúne exemplos de shared; materiais/equipes têm exemplos dentro de suas próprias features. A rota fina compõe essas seções por slots da tela, sem imports entre features e sem mover componentes de domínio para shared.
- **Correções indispensáveis de base:** baseline tsc falha por dois imports de Icon inexistentes (MenuButton e QuantityStepperButton); apontar para o Icon existente de ui. Repor em `src/shared/global.css` os tokens de dimensões, raios, fontes e estilos de texto já documentados, perdidos na migração para shared, e o alias card-title já utilizado por MaterialItem. Sem dependência nova, redesenho dos componentes ou alteração da API.
- **Achados na execução:** ícones/spinner internos do Button não recebiam a cor no web; PasswordInput passava accessible ao SVG e havia ciclo Input/PasswordInput. Reutilizar Icon/Spinner existentes e separar a implementação base de Input, preservando seus exports públicos, para eliminar estes problemas observados na galeria.
- **Compatibilidade de estados no web:** o runtime instalado não mapeia accessibilityState/accessibilityValue legados para atributos DOM. Adicionar os equivalentes aria nos controles demonstrados; tornar Button/loading e opções indisponíveis do Select efetivamente disabled, sem mudar suas props públicas. Checklist e filtros novos também expõem seus estados explicitamente.
- **Aceite:** inventário inteiro representado, interação sem chamadas remotas, filtros/busca/checklist/restaurar funcionais, rolagem e teclado em 390x844 e desktop/tablet; tipos/lint aprovados; conferir carregamento, senha, select/retry, quantidade, navegação e fechamento/reabertura de detalhes no navegador. Indicar que a marcação visual é manual e não equivale a aprovação automática.
- **Estado atual:** Concluído o catálogo em 2026-10-16. 22 componentes em 11 seções, busca/filtros, checklist manual e reset funcionais. Tipos, lint, exportação web e conferência interativa em 1400x960, 1280x800 e 390x844 aprovados. Sem erros/avisos de execução dos componentes ou chamadas à API de negócio. Corrigidos os bloqueios de base e os problemas de cor, ciclo de import e estados web observados na galeria. Android/iOS não executados. Fases e issues de produto continuam abertas pelos itens restantes.

### Remoção autorizada do catálogo e redução de escopo - 2026-10-16

- **Estado:** Concluído em 2026-10-16; pedido explícito do humano substitui os incrementos anteriores de catálogo e navegação lateral.
- **Escopo:** excluir rota e exemplos de `/components`; excluir Sidebar/NavItem e seus exports/tokens exclusivos; remover menus de Administrador/Gestor e os esqueletos vazios de users/problems. Preservar MenuButton/AppMenu, componentes de uso do Visualizador e as correções de base verificadas no catálogo.
- **Materiais:** MaterialItem deixa de aceitar `lowStock` e de renderizar ícone, texto ou anúncio acessível de estoque baixo. MaterialDetailsCard permanece informativo, com código, nome e quantidade, sem feedback de estoque.
- **Aceite:** nenhuma referência funcional à demonstração, aos perfis removidos ou Sidebar/NavItem em src; imports válidos, tipos/lint/exportação web aprovados; `/components` ausente das rotas exportadas. Não alterar o contrato documentado da API externa.
- **Verificação:** tsc --noEmit, expo lint, git diff --check e exportação web aprovados; somente /, /_sitemap e /+not-found exportados. Busca em src sem referências aos perfis removidos, Sidebar/NavItem, lowStock ou demonstrações. MaterialDetailsCard já não tinha aviso e permanece com quantidade informativa. Android/iOS não executados; favicon ausente preexistente na exportação.

## ISSUE-003 - Autenticação e conta

**Tipo:** Feature | **Status:** Em andamento | **Fase:** Fase 2

Objetivo: RF001 e RF002 (RF003 e RF004 bloqueados pela API), tratamento de 401/403. Aceite: login/logout com erro tratado para o Visualizador.

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

- **2026-10-19 (IA, correção da Home):** "Olá!" sumia a partir de `md` porque `text-page` é também cor; trocado por `text-page-heading`. Cards da Home com largura máx. 369 e gap 16 em grade com quebra, margem tablet 40, conforme Figma. Tipos e lint aprovados; sem conferência visual em dispositivo.

## ISSUE-004 - Consulta de materiais

**Tipo:** Feature | **Status:** Em andamento | **Fase:** Fase 3

Objetivo vigente: consulta e detalhes de materiais pelo Visualizador (RF032, RF033), com skeleton/refresh/vazio/erro e sem feedback de estoque baixo. CRUD de materiais e gestão de problemas fora do cliente (decisão 0009).

Estado atual: 2026-10-19 (IA) fluxo de consulta de materiais criado em `/materiais` (somente leitura), a pedido do humano, a partir dos prints Figma "10 · Materiais — Lista" e "Detalhes do material". Reutiliza AppLayout/AppMenu, Input, MaterialItem, MaterialDetailsCard, Alert, Button e Icon. GET /materials real (X-User-Role: VIEWER); lista de ativos com contagem, busca local por nome, skeleton, pull to refresh, vazio, vazio de busca, erro com "Tentar novamente" (aviso quando a atualização falha com dados em tela), detalhes em pop-up (X, fundo, Escape/voltar), 401 volta ao login e 403 mostra acesso negado. A API não tem código de material: não exibido (lacuna 19 em `data-model.md`). `tsc`, `expo lint` e exportação web aprovados; sem conferência visual em navegador/dispositivo.

Estado anterior: 2026-10-16 (IA) `MaterialDetailsCard` criado em `src/features/materials/components/details/` a partir do Figma `208:7927`, 100% fiel (decisão do humano, `decision-log.md` 0008). Só apresentação: sem tela, hook, serviço nem Modal. Status passa a Em andamento.

## ISSUE-005 - Equipes

**Tipo:** Feature | **Status:** Em andamento | **Fase:** Fase 4

Objetivo vigente: consulta de equipes e detalhes, status da própria equipe e calendário pelo Visualizador (RF023 a RF026), respeitando lacunas da API. CRUD e gestão de representantes fora do cliente; dados existentes continuam visíveis nos cards.

Estado atual: 2026-10-16 (IA) criados em `src/features/teams/`: `TeamCard` (Figma `228:7974`, variantes sem fazer/fazendo 5S), `TeamDetailsCard` (`208:6580`), `RepresentativeCard` (minicard atomizado) e `TeamStatusBadge` (reutilizada pelos dois cards; a Badge 5S não existia em nenhuma branch). 100% fiéis ao Figma (`decision-log.md` 0008). Só apresentação. Lacunas 17 e 18 registradas em `data-model.md`. Status passa a Em andamento.

## ISSUE-006 - Ocorrências

**Tipo:** Feature | **Status:** Em andamento | **Fase:** Fase 5

Objetivo: RF014 a RF016. Aceite: envio pelo Visualizador com imagem até 5 MB e falhas de envio tratadas. Administração de usuários fora do cliente (decisão 0009).

### Incremento autorizado - 2026-10-19: formulário de ocorrência

- **Branch:** feature/occurence-creation-flow, solicitada pelo humano; limpa no início. Docs e componentes lidos antes de código. Fonte: print enviado e contexto/screenshot Figma 96:2189, frame 834x1194.
- **Escopo:** rota /ocorrencias na área autenticada do Visualizador; problema e material ativos, quantidade positiva e imagem opcional. Reutilizar AppLayout/AppHeader/MenuButton/AppMenu, Select, QuantityStepper, Button, Alert, Icon, Spinner e tokens. Nenhuma tela de gestão, listagem de ocorrências ou dependência nova.
- **Visual:** conteúdo com margens 40 no tablet, padding superior 32, título Page 28/36, progresso 0 a 3 dos três campos obrigatórios; card raio 12/borda sutil/padding 32/gap 20. Upload 303 de altura, ícone ImagePlus 28 em slot 56, área tracejada. Botão no rodapé do conteúdo com seta à direita, inicialmente disabled. Tela rola e preserva header/menu/áreas seguras; status textual e foco acessíveis. Select ganha tamanho opcional Helper; Stepper, valor Section, sem duplicação dos componentes. Cabeçalho pode receber variante de referência nesta rota, preservando o padrão de outras telas.
- **Contrato atual conferido:** GET /problems/options e /materials/options -> [{id,name}], X-User-Role: VIEWER. POST /occurrences/images, multipart campo image, até 5 MB -> imageId. POST /occurrences com problemId/materialId/affectedQuantity/reportedByUserId/imageId opcional. O userId vem exclusivamente da sessão. A API registra e tenta enviar e-mail aos responsáveis/contato do problema; não modifica estoque. Não prometer entrega de e-mail, pois a resposta não informa seu resultado.
- **Diferença do print:** exibir máximo 5 MB, não 20 MB, conforme API e docs existentes. Quantidade começa em zero, apenas positiva habilita envio; manter o máximo 999 do Stepper existente. O OpenAPI reutiliza nomes de schemas incompatíveis entre controllers; para o payload prevalecem os exemplos da documentação oficial e o data-model, sem inventar campos.
- **Estados:** opções com loading/vazio/falha/tentar novamente; pull to refresh; seleção controlada, progresso por preenchimento; validação antes de qualquer POST. Imagem por galeria/câmera com permissão solicitada apenas na ação pertinente, cancelamento sem perda, validação de tipo/tamanho, prévia/substituir/remover. Upload somente ao enviar, antes do registro; sem Content-Type manual no multipart. Falha de upload não registra ocorrência. Loading bloqueia campos/envio; erros preservam dados; sucesso limpa formulário e mostra Alert. Falha de rede/timeout após iniciar registro tem resultado incerto: avisar antes de permitir reenvio explícito, sem retry automático de POST.
- **Integração indispensável:** resolver colisão preexistente entre raiz de login e índice do grupo app: Home em /home, rota fina exportando o HomeScreen existente; entrada pós-login para Home, grupo protegido por sessão e logout real. Menus/atalhos apontam /ocorrencias. Sem alterar o design do login ou adicionar outra home. 401 limpa sessão e volta ao login com aviso; 403 fica como acesso negado. QueryProvider do TanStack já instalado, somente GETs com cache por usuário, sem retry de mutações.
- **Aceite:** tipos/lint/export/diff aprovados; testar opções, validação, foto e sequência upload/registro, sucesso/erros/resultado incerto, bloqueio de repetição e navegação ativa, somente em tablet (834x1194), conforme instrução do humano em 2026-10-19; celular e desktop dispensados neste fluxo. Verificações/fixtures transitórias fora do produto. Não criar ocorrências reais nem enviar e-mails de teste a terceiros. Registrar CORS e limites de dispositivo/conta real.

### Entrega do formulário - 2026-10-19

Incremento cliente concluído: rota protegida, seletores de opções da API, progresso por três campos, Stepper, foto com prévia/substituição/remoção, upload antes do registro e feedbacks. Campos e navegação bloqueados durante envio; falha de upload não cria ocorrência; resultado incerto exige conferência e liberação explícita antes de reenviar. Login agora abre /home (Home existente), logout real e 401 com aviso; removida colisão entre rotas raiz e marcadores de merge preexistentes no barrel de auth.

Typecheck, lint, diff e exportação web aprovados. Conferência final somente em tablet 834x1194, conforme pedido; marca efetiva 199x26, título 28/36 e prévia limitada ao campo, sem overflow horizontal. Verificações transitórias locais cobriram opções, validação, imagem, sucesso com 201 vazio, bloqueio do envio, falha de upload, 400/401/403 e resultado incerto. Nenhuma fixture ou rota de demonstração adicionada ao app.

GETs reais retornaram 200 (10 problemas e 5 materiais), mas o navegador com a API pública ainda depende de CORS no backend. Nenhuma ocorrência real ou e-mail de teste foi criado. Sucesso com conta real e câmera/dispositivo físico não conferidos. ISSUE-006/Fase 5 continuam Em andamento para a validação externa e próximos prints; não exigir celular/desktop neste incremento.

## ISSUE-007 - Responsividade e fechamento

**Tipo:** Chore | **Status:** Planejada | **Fase:** Fase 6

Objetivo: layouts celular/tablet/desktop, acessibilidade e revisão final.

### Correção autorizada - origem da imagem (2026-10-19)

Substituir diálogo central criado anteriormente pelo painel inferior do print e Figma97:7404: overlay #111827 a40%, margens laterais/inferior40, superfície page, raio16, sombra Modal, padding24/gap20, alça48x4 e duas opções Galeria/Câmera lado a lado com círculos56 e ícones Lucide28. Textos e hierarquia conforme referência; retirar botão Cancelar visível, preservar fechar pelo fundo/Escape/voltar sem perda. Rodapé JPG/PNG com5MB do contrato vigente (20MB do protótipo não altera o backend); validar formatos exibidos. Reutilizar Icon/tokens e callbacks do picker, sem dependências, alterações de API ou demonstração permanente. Conferência somente tablet834x1194 com fixtures externas: API informada fora do ar pelo humano. Tipos/lint/diff e verificação visual/interativa antes de concluir.

### Estado atual - correção da origem da imagem (2026-10-19)

Concluída: painel inferior do Figma97:7404 substitui o diálogo central e botões empilhados. Medido em tablet834x1194: painel x40/y786/754x368, cards341x166, ícones28 nos círculos56, superfície page, overlay e sombra corretos. Alça decorativa, título/descrição/rodapé e Galeria/Câmera conforme referência; ortografia dispositivo corrigida e limite5MB mantido pelo contrato. Formatos JPG/PNG validados no picker e antes do upload, com mensagem ao campo. Fechar pelo fundo/Escape mantém valores e devolve foco ao acionador; voltar/acessibilidade mantidos no nativo. Galeria e Câmera web abriram seletores e retornaram fixture PNG, sem usar câmera física. Typecheck/lint/diff aprovados, sem avisos do navegador. API pública não acessada (humano informou indisponibilidade); fixtures externas ao repo, sem POST real. Nenhuma dependência nova ou commit/push.
