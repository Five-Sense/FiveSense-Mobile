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

**Tipo:** Feature | **Status:** Planejada | **Fase:** Fase 2

Objetivo: RF001 e RF002 (RF003 e RF004 bloqueados pela API), tratamento de 401/403. Aceite: login/logout com erro tratado para o Visualizador.

## ISSUE-004 - Consulta de materiais

**Tipo:** Feature | **Status:** Em andamento | **Fase:** Fase 3

Objetivo vigente: consulta e detalhes de materiais pelo Visualizador (RF032, RF033), com skeleton/refresh/vazio/erro e sem feedback de estoque baixo. CRUD de materiais e gestão de problemas fora do cliente (decisão 0009).

Estado atual: 2026-10-16 (IA) `MaterialDetailsCard` criado em `src/features/materials/components/details/` a partir do Figma `208:7927`, 100% fiel (decisão do humano, `decision-log.md` 0008). Só apresentação: sem tela, hook, serviço nem Modal. Status passa a Em andamento.

## ISSUE-005 - Equipes

**Tipo:** Feature | **Status:** Em andamento | **Fase:** Fase 4

Objetivo vigente: consulta de equipes e detalhes, status da própria equipe e calendário pelo Visualizador (RF023 a RF026), respeitando lacunas da API. CRUD e gestão de representantes fora do cliente; dados existentes continuam visíveis nos cards.

Estado atual: 2026-10-16 (IA) criados em `src/features/teams/`: `TeamCard` (Figma `228:7974`, variantes sem fazer/fazendo 5S), `TeamDetailsCard` (`208:6580`), `RepresentativeCard` (minicard atomizado) e `TeamStatusBadge` (reutilizada pelos dois cards; a Badge 5S não existia em nenhuma branch). 100% fiéis ao Figma (`decision-log.md` 0008). Só apresentação. Lacunas 17 e 18 registradas em `data-model.md`. Status passa a Em andamento.

## ISSUE-006 - Ocorrências

**Tipo:** Feature | **Status:** Planejada | **Fase:** Fase 5

Objetivo: RF014 a RF016. Aceite: envio pelo Visualizador com imagem até 5 MB e falhas de envio tratadas. Administração de usuários fora do cliente (decisão 0009).

## ISSUE-007 - Responsividade e fechamento

**Tipo:** Chore | **Status:** Planejada | **Fase:** Fase 6

Objetivo: layouts celular/tablet/desktop, acessibilidade e revisão final.
