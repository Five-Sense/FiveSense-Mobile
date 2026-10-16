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

- **2026-10-16 (IA, integração da develop):** Resolvido o conflito em `deployment-log.md`, preservando as entradas das duas branches. Corrigido o import de Icon em MenuButton para `@/shared/components/data-display/icon`, acompanhando a reorganização recebida da develop. Typecheck, lint e diff sem erros; sem marcadores de conflito. Nenhuma demonstração restaurada; stash anterior preservado. ISSUE-002 permanece Em andamento.

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

**Tipo:** Feature | **Status:** Planejada | **Fase:** Fase 2

Objetivo: RF001 e RF002 (RF003 e RF004 bloqueados pela API), tratamento de 401/403. Aceite: login/logout com erro tratado e navegação por perfil.

## ISSUE-004 - Materiais e Problemas

**Tipo:** Feature | **Status:** Planejada | **Fase:** Fase 3

Objetivo: RF009 a RF013 e RF027 a RF033. Aceite: CRUD por perfil, lista com skeleton/refresh/vazio/erro, confirmações de alteração e exclusão.

## ISSUE-005 - Equipes

**Tipo:** Feature | **Status:** Planejada | **Fase:** Fase 4

Objetivo: RF017 a RF026. Aceite: status de 5S, representantes, calendário e permissão da própria equipe.

## ISSUE-006 - Ocorrências e Usuários

**Tipo:** Feature | **Status:** Planejada | **Fase:** Fase 5

Objetivo: RF005 a RF008 e RF014 a RF016. Aceite: envio com imagem até 5 MB, falhas de envio tratadas, criar/listar/ver/editar usuários pelo Administrador.

## ISSUE-007 - Responsividade e fechamento

**Tipo:** Chore | **Status:** Planejada | **Fase:** Fase 6

Objetivo: layouts celular/tablet/desktop, acessibilidade e revisão final.
