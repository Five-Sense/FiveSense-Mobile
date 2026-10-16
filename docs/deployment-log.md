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

## [2026-10-09] - Entrega: ISSUE-006 (QuantityStepper)

- **Fase:** Fase 5 - Ocorrências e Usuários (parcial: só o componente visual).
- **O que foi feito:** `QuantityStepper` em `src/shared/components/forms/quantity-stepper.tsx` (+ `quantity-stepper-button.tsx`). Global desde o início porque `architecture.md` o lista para materiais e ocorrências. Props: `value`, `onChange`, `min` (0), `max` (999, limite de material da API), `step` (1), `unitLabel` ("unidades"), `label`, `disabled`. Fiel ao Figma: container largura total, padding 8, borda 1 px `border-control`, raio 8, fundo `surface`; botão [-] em `brand-soft` com ícone `brand-primary`; botão [+] em `brand-action` com ícone branco; botões 48x48; valor 18/26 600 e rótulo da unidade 14/20 em `text-secondary`. No limite o botão fica desabilitado em `disabled-bg`/`disabled-text` (sem vermelho). Acessibilidade: grupo `adjustable` com `min/max/now` e ações incrementar/decrementar; botões com rótulo, estado e anel de foco.
- **Arquivos modificados:** `src/shared/components/forms/{quantity-stepper.tsx,quantity-stepper-button.tsx}` (`.gitkeep` removido).
- **Checks:** `npx tsc --noEmit` e `npx expo lint` sem erros; `expo export` web e Android concluem e as classes do componente aparecem no CSS gerado (verificado com o componente numa tela temporária, removida). Não verificado em dispositivo/emulador.
- **Docs atualizados:** `deployment-log.md`.
- **Riscos/Débito técnico:** hover/pressed do [-] (`surface-subtle`/`border-subtle`) e do [+] (`brand-action-hover`/`brand-dark`) não existem no Figma; são escolhas minhas. O Figma não define toque longo nem digitação direta, então não implementei. Container de 690 do protótipo é só amostra: o componente é fluido. Componente ainda não usado em nenhuma tela.
## [2026-10-16] - Entrega: ISSUE-002 (Integração da develop na navegação)

- **Fase:** Fase 1 - Scaffold técnico (parcial), branch `feature/nav-component`.
- **O que foi feito:** Resolvido o conflito de merge do histórico, mantendo as entradas da navegação e do TeamStatusBadge. Corrigido o import de Icon em MenuButton para o caminho `@/shared/components/data-display/icon`, conforme a reorganização da develop. O stash anterior foi preservado sem aplicação, pois contém arquivos de uma demonstração já removida.
- **Arquivos modificados na resolução:** `docs/deployment-log.md`, `src/components/navigation/menu-button.tsx`, `docs/issues.md`, `docs/implementation-plan.md`.
- **Checks:** `npx --no-install tsc --noEmit`, `npx --no-install expo lint` e `git diff --check` sem erros; busca sem marcadores de conflito.
- **Docs atualizados:** `issues.md`, `implementation-plan.md`, `deployment-log.md`.
- **Riscos/Débito técnico:** sem nova verificação visual ou execução em Android/iOS; correção de integração sem alteração de comportamento visual. ISSUE-002 e Fase 1 permanecem Em andamento.

## [2026-10-16] - Entrega: ISSUE-002 (Remoção da demonstração de MenuButton/AppMenu)

- **Fase:** Fase 1 - Scaffold técnico (parcial), branch `feature/nav-component`.
- **O que foi feito:** A pedido do humano, removida a demonstração. Excluídas a rota `/menu-demo`, a tela com exemplos/interações simuladas e somente as pastas exclusivas que ficaram vazias. Preservados `MenuButton`, `AppMenu`, suas propriedades/estilos e a tela inicial.
- **Arquivos modificados:** remoção de `src/app/menu-demo.tsx` e `src/features/component-demo/screens/menu-demo-screen.tsx`.
- **Checks:** `tsc --noEmit`, `expo lint` e `git diff --check` aprovados; busca em `src/` sem referências a MenuDemoScreen, component-demo ou menu-demo.
- **Docs atualizados:** `issues.md`, `implementation-plan.md`, `deployment-log.md`.
- **Riscos/Débito técnico:** a URL temporária deixou de existir. Permanecem os componentes para futura composição nas telas reais. Sem dependências ou mudanças de comportamento nos componentes.


## [2026-10-16] - Entrega: ISSUE-002 (Demonstração de MenuButton/AppMenu)

- **Fase:** Fase 1 - Scaffold técnico (parcial), branch `feature/nav-component`.
- **O que foi feito:** Após novo pedido explícito do humano, adicionada a rota `/menu-demo`. A tela demonstra os MenuButtons padrão/selecionado/desabilitado e compõe AppMenu no rodapé com Home, Ocorrências, Equipes e Materiais, inicialmente em Materiais. Seleção e feedback são locais. Conteúdo com rolagem e áreas seguras; componentes e tela inicial preservados. Nenhuma dependência ou fluxo de negócio adicionados.
- **Arquivos modificados:** `src/app/menu-demo.tsx` e `src/features/component-demo/screens/menu-demo-screen.tsx` (novos).
- **Checks:** `tsc --noEmit` e `expo lint` aprovados. Conferência visual/interativa web em 1100x800 e 390x844: clique/Enter atualizam seleção e feedback; disabled não dispara ação; barra permanece no rodapé e conteúdo não transborda horizontalmente. Capturas de ambos os tamanhos conferidas. Sem erros de execução no navegador.
- **Como abrir:** `http://localhost:8082/menu-demo`, com o projeto iniciado por `npx expo start --web --port 8082`.
- **Docs atualizados:** `issues.md`, `implementation-plan.md`, `deployment-log.md`.
- **Riscos/Débito técnico:** demonstração sem API/sessão, sem navegação real para módulos. Android/iOS não executados. Fase 1 permanece Em andamento. Esta entrega atende ao pedido posterior de manter uma demonstração, substituindo essa restrição das entregas anteriores.


## [2026-10-16] - Entrega: ISSUE-002 (MenuButton e AppMenu horizontais)

- **Fase:** Fase 1 - Scaffold técnico (parcial), branch `feature/nav-component`.
- **O que foi feito:** Dois componentes separados conforme pedido: `MenuButton`, unidade com ícone sobre o texto, e `AppMenu`, barra com slot children. Baseados na leitura direta do Figma (nodes 43:3650 e 33:2741) e nas imagens do humano. Seleção controlada com cor navy no ícone/rótulo; foco, disabled e nomes/estados acessíveis. Reutilizados Icon global, Lucide, Montserrat e tokens existentes; nenhum CSS global ou dependência alterados. Barra fluida e com altura natural para preservar os itens e a leitura ampliada. Cenário temporário de conferência removido; telas e rotas existentes preservadas.
- **Arquivos modificados:** `src/components/navigation/menu-button.tsx` e `app-menu.tsx` (novos); `.gitkeep` da pasta removido por ela ter recebido componentes.
- **Checks:** `tsc --noEmit` e `expo lint` aprovados. Conferência interativa web (Edge): MenuButton "Texto" 54x72, ícone 32, fonte 14/20, gap 4/padding 8, AppMenu vazio 65 e preenchido 101, cores de ícones/texto nos estados comum/selecionado/desabilitado, seleção por clique e Enter, foco e bloqueio de interação em disabled. Larguras 834/390/320 e texto ampliado a 200% sem transbordamento horizontal. Capturas visuais conferidas contra a referência enviada. Sem suíte de testes ou rota de demonstração mantida no repositório.
- **Docs atualizados:** `issues.md`, `implementation-plan.md`, `design-guidelines.md`, `deployment-log.md`.
- **Riscos/Débito técnico:** Android/iOS não executados. A composição final das telas e a integração com navegação/permissões seguem fora deste incremento. O navegador reportou apenas um favicon.ico ausente (404), recurso do app preexistente e fora do escopo; nenhum erro dos componentes. Break de linha/altura natural e estados complementares estão documentados em design-guidelines.md. ISSUE-002/Fase 1 permanecem abertas.


## [2026-10-16] - Entrega: ISSUE-002 (Remoção da demonstração do Nav)

- **Fase:** Fase 1 - Scaffold técnico (parcial).
- **O que foi feito:** A pedido do humano, removidos `src/app/sidebar.tsx` e `src/components/sidebar-preview.tsx`, incluindo seleção simulada de perfil, mensagens e painel de teste. Preservados os componentes reutilizáveis `NavItem` e `Sidebar`, seus exports, estilos e callbacks configuráveis. Retirado o token de overlay usado exclusivamente na demonstração e as redefinições duplicadas de tipografia; mantidos os tokens específicos dos componentes e a tipografia já existente do projeto. A tela inicial foi preservada.
- **Arquivos modificados:** remoção dos dois arquivos de demonstração; ajuste em `src/global.css`.
- **Checks:** `tsc --noEmit`, `expo lint` e `git diff --check` sem erros. Busca em `src/` sem referências a SidebarPreview, sidebar-preview ou ações da prévia. Os componentes preservados já foram conferidos em web na entrega anterior.
- **Docs atualizados:** `issues.md`, `implementation-plan.md`, `deployment-log.md`.
- **Riscos/Débito técnico:** `/sidebar` deixou de existir; as instruções de abertura da entrada histórica anterior foram substituídas por esta entrega. Integração com telas reais continua fora deste incremento. Sem dependências novas.


## [2026-10-16] - Entrega: ISSUE-002 (Nav/AppSidebar e prévia para teste)

- **Fase:** Fase 1 - Scaffold técnico (parcial).
- **O que foi feito:** `NavItem` reutilizável, seleção controlada, foco visível e suporte a desabilitado; `Sidebar` com largura 222, padding 16, itens mínimos de 56, slots 32/Lucide 24 e conta/saída no rodapé. Prévia em `/sidebar` com menus por perfil e ações simuladas; painel abaixo de 768 px, com Escape/fechar e retorno de foco no web. Esse breakpoint e estados de hover/pressionado são complementos da demonstração, não medidas confirmadas das telas do Figma. Ícones recebem os tokens no nativo e herdam a cor via wrapper no web. Resolvidos três conflitos locais, mantendo o placeholder inicial e os registros recentes dos docs.
- **Arquivos modificados:** `src/components/ui/nav/*`, `src/components/ui/sidebar/*`, `src/components/sidebar-preview.tsx`, `src/app/sidebar.tsx`, `src/global.css`; resolução de conflito em `src/app/index.tsx`.
- **Checks:** `tsc --noEmit` e `expo lint` sem erros após `npm install` sincronizar dependências já declaradas (package.json e lock preservados). Conferência interativa web em desktop (1366x900), celular (390x844), altura reduzida (1024x300) e texto ampliado: medidas, cores de ícones/texto, seleção, teclado, perfis, conta/saída simuladas, painel e rolagem; nenhum erro/aviso do navegador. Sem suíte de testes adicionada ao projeto.
- **Como conferir:** na pasta do projeto, `npx expo start --web --port 8082`, depois abrir `http://localhost:8082/sidebar`. Em largura de celular, usar "Abrir menu".
- **Docs atualizados:** `issues.md`, `implementation-plan.md`, `deployment-log.md`.
- **Riscos/Débito técnico:** sem integração de rotas de negócio, sessão ou API; não exercitado em Android/iOS. Marca textual provisória substituível por `logo`. As páginas completas do Figma e o painel mobile não foram auditados nesta entrega. A fase permanece aberta.

## [2026-10-09] - Entrega: ISSUE-005 (TeamStatusBadge)

- **Fase:** Fase 4 - Equipes (parcial: só o componente visual).
- **O que foi feito:** `TeamStatusBadge` em `src/features/teams/components/status/team-status-badge.tsx`, com `status: 'DOING_5S' | 'NOT_DOING_5S'`. Local da feature `teams` (regra "local primeiro" de `architecture.md`; vira global só se outra feature usar). Tipo em `types/team-status.ts`, textos em `constants/team-status.ts`. Visual: pílula, borda 1 px, altura mínima 28, texto 14/20 600, padding horizontal 10 (medida do Figma). "Fazendo 5S" em sucesso; "Não fazendo 5S" em neutro.
- **Arquivos modificados:** `src/features/teams/{components/status,types,constants}/*` (`.gitkeep` removidos).
- **Checks:** `npx tsc --noEmit` e `npx expo lint` sem erros. Não verificado em tela/dispositivo; o badge ainda não é usado em nenhuma tela.
- **Docs atualizados:** `deployment-log.md`.
- **Riscos/Débito técnico:** Divergência registrada em `design-guidelines.md`: o Figma (Badge 5S `208:4707`) usa texto 10 px, "Fazendo" em azul e "Sem fazer 5s" em vermelho. Segui a regra funcional dos docs (14 px, sucesso/neutro, "Não fazendo 5S") até decisão de design. Faltam os estados "Status indisponível" e "Atualizando..." do briefing.
## [2026-10-09] - Entrega: ISSUE-002 (Resolução de conflitos de merge e tokens)

- **Fase:** Fase 1 - Scaffold técnico (parcial).
- **O que foi feito:** Resolvidos os marcadores de conflito commitados no merge `develop` x `main`: `package.json` (dependências de ambos os lados, sem duplicatas; Tailwind/PostCSS/lightningcss em `devDependencies` nas versões da `main`, 4.1.12; `expo-web-browser` fora; `overrides` de `lightningcss` mantido), `package-lock.json` (partindo do lock da `main` + `npm install`), `app.json` (orientação `default`, um único `expo-secure-store`), `metro.config.js`, `src/app/_layout.tsx` (fonte Montserrat + splash + `StatusBar`), `src/app/index.tsx` (placeholder da `main`) e `docs/implementation-plan.md`. `src/global.css` reescrito a partir de `colors.tokens.json`, mantendo fontes e tamanhos de texto. Adicionado `.gitattributes` (LF) e a seção "Git e conflitos" em `ai-workflow.md`.
- **Arquivos modificados:** `package.json`, `package-lock.json`, `app.json`, `metro.config.js`, `src/app/_layout.tsx`, `src/app/index.tsx`, `src/global.css`, `docs/implementation-plan.md`, `docs/ai-workflow.md`, `.gitattributes`.
- **Checks:** `git grep` sem marcadores; `npx tsc --noEmit` e `npx expo lint` sem erros; `expo export --platform web` conclui. Não verificado em dispositivo/emulador.
- **Docs atualizados:** `implementation-plan.md`, `ai-workflow.md`, `deployment-log.md`.
- **Riscos/Débito técnico:** `global.css` ainda tem complementos fora do JSON (`on-brand`, `destructive*`, bordas semânticas). Mudanças não commitadas. `ui/button` ainda não foi movido para `components/actions`.
## [2026-10-09] - Entrega: ISSUE-002 (Resolução de conflitos de merge e tokens)

- **Fase:** Fase 1 - Scaffold técnico (parcial).
- **O que foi feito:** Resolvidos os marcadores de conflito commitados no merge `develop` x `main`: `package.json` (dependências de ambos os lados, sem duplicatas; Tailwind/PostCSS/lightningcss em `devDependencies` nas versões da `main`, 4.1.12; `expo-web-browser` fora; `overrides` de `lightningcss` mantido), `package-lock.json` (partindo do lock da `main` + `npm install`), `app.json` (orientação `default`, um único `expo-secure-store`), `metro.config.js`, `src/app/_layout.tsx` (fonte Montserrat + splash + `StatusBar`), `src/app/index.tsx` (placeholder da `main`) e `docs/implementation-plan.md`. `src/global.css` reescrito a partir de `colors.tokens.json`, mantendo fontes e tamanhos de texto. Adicionado `.gitattributes` (LF) e a seção "Git e conflitos" em `ai-workflow.md`.
- **Arquivos modificados:** `package.json`, `package-lock.json`, `app.json`, `metro.config.js`, `src/app/_layout.tsx`, `src/app/index.tsx`, `src/global.css`, `docs/implementation-plan.md`, `docs/ai-workflow.md`, `.gitattributes`.
- **Checks:** `git grep` sem marcadores; `npx tsc --noEmit` e `npx expo lint` sem erros; `expo export --platform web` conclui. Não verificado em dispositivo/emulador.
- **Docs atualizados:** `implementation-plan.md`, `ai-workflow.md`, `deployment-log.md`.
- **Riscos/Débito técnico:** `global.css` ainda tem complementos fora do JSON (`on-brand`, `destructive*`, bordas semânticas). Mudanças não commitadas. `ui/button` ainda não foi movido para `components/actions`.
## [2026-10-09] - Entrega: (2026-10-09 14:00:48) (Componente global Alert)

- **Fase:** Fase 1 - Scaffold técnico (parcial; primeiro componente global de UI).
- **O que foi feito:** Criado o componente `Alert` em `src/components/feedback/`, 100% fiel ao componente Alert do Figma (node `33:2952`, variantes Error, Info, Success e Warning): superfície branca, sombra Elevation/Card, raio 8 (`rounded-lg`), padding 16 (`p-4`), gap 8 entre título e descrição, título Montserrat SemiBold 16/24 e descrição Regular 14/20 na cor de texto semântica (error `#b91c1c`, info `#1e40af`, success `#166534`, warning `#92400e`, já presentes nos tokens de `global.css`). Sem ícone, sem borda e sem ação, como no Figma. Props: `variant`, `title`, `description` (texto ou nó) e `className`. Import direto de `feedback/alert` (sem barrel). Removido o `.gitkeep` da pasta.
- **Divergência registrada (acessibilidade):** o componente do Figma transmite o estado apenas pela cor do texto, o que diverge de "estado nunca só por cor" (coding-standards.md). O humano optou pela fidelidade total ao Figma; ícone e ação ficam a cargo de outro componente de feedback quando necessário. Registrado em `decision-log.md` 0007.
- **Arquivos modificados:** `src/components/feedback/alert.tsx` (novo), `src/components/feedback/.gitkeep` (removido), `docs/implementation-plan.md`, `docs/issues.md`, `docs/decision-log.md`, `docs/deployment-log.md`.
- **Checks:** `npx tsc --noEmit` OK; `npx expo lint` OK; `npx eslint src/components/feedback/*.ts* --max-warnings 0` OK. Não verificado em simulador/dispositivo/web em execução; a conferência visual foi feita contra o screenshot do Figma (node `33:2952`).
- **Docs atualizados:** os quatro listados acima.
- **Riscos/Débito técnico:** a sombra usa o preset `shadow-md shadow-black/25`, aproximação do efeito Elevation/Card do Figma (`0 4 4 rgba(0,0,0,0.25)`), não um valor exato por plataforma. Sombras em RN variam entre iOS/Android/web; conferir no dispositivo. Componente ainda não exercitado em tela real.

## [2026-10-09] - Entrega: (2026-10-09 14:00:48) (Componentes Input e PasswordInput)

- **Fase:** Fase 1 - Scaffold técnico (incremento de inputs).
- **O que foi feito:** Implementados os componentes reutilizáveis `Input` (`src/components/ui/input.tsx`) e `PasswordInput` (`src/components/ui/password-input.tsx`) com fidelidade às variantes do Figma: Default com borda #64748B, Error com borda vermelha #B91C1C (e olho vermelho no PasswordInput, sem texto de erro no input, cuja função é delegada ao Alert), e Focus com borda de 2px em #4747D4. Alternância de visibilidade da senha com `Eye`/`EyeOff` da Lucide com alvo de toque de 48x48 px. Adicionados tokens de tipografia em `src/global.css`. Arquivos temporários de teste/showcase removidos, mantendo apenas os componentes de entrada na UI e `src/app/index.tsx` restaurado limpo.
- **Arquivos modificados:** `src/global.css`, `src/components/ui/input.tsx`, `src/components/ui/password-input.tsx`, `docs/issues.md`, `docs/deployment-log.md`.
- **Checks:** `npx tsc --noEmit` aprovado com 0 erros; `npx expo lint` aprovado com 0 erros.
- **Docs atualizados:** `docs/issues.md`, `docs/deployment-log.md`.
- **Riscos/Débito técnico:** Demais componentes de UI da Fase 1 (modais, alerts, skeletons, cards de equipes/materiais) e integração com a API v1 seguem conforme o planejamento da Fase 1.
## [2026-10-09] - Entrega: (2026-10-09 14:00:48) (Componente Footer)

- **Fase:** Fase 1 - Scaffold técnico (parcial).
- **O que foi feito:** Criado `Footer` institucional exclusivo do tablet, com superfície branca, borda `border-subtle`, padding 8, altura mínima 32 e largura fluida. O texto padrão é “© 2026 Five Sense Group. Todos os direitos reservados.” em Montserrat 400, 12/15; pode ser substituído pela prop `text` e o componente cresce se houver ampliação de fonte ou quebra de linha. O Header foi ajustado para documentar o escopo somente Tablet.
- **Arquivos modificados:** `src/static/components/Footer.tsx`, `src/static/components/Header.tsx`, `docs/design-guidelines.md`, `docs/issues.md`, `docs/deployment-log.md`.
- **Checks:** `npx tsc --noEmit`, `npx expo lint` e `git diff --check` sem erros.
- **Docs atualizados:** `design-guidelines.md`, `issues.md`, `deployment-log.md`.
- **Riscos/Débito técnico:** o Footer ainda não está composto em uma tela, pois a estrutura de telas permanece pendente.

## [2026-10-09] - Entrega: (2026-10-09 14:00:48) (Componente Header)

- **Fase:** Fase 1 - Scaffold técnico (parcial).
- **O que foi feito:** Criado `Header` para Tablet com 72 de altura, fundo `surface`, padding horizontal de 24, logo oficial existente à esquerda e ação de saída à direita com `LogOut` do Lucide. A largura é fluida (`w-full`) e acompanha o contêiner pai. A ação é exposta por `onLogout`; quando ela não é fornecida, o controle permanece visível, mas desabilitado e corretamente anunciado por acessibilidade.
- **Arquivos modificados:** `src/static/components/Header.tsx`, `docs/issues.md`, `docs/deployment-log.md`.
- **Checks:** `npx tsc --noEmit`, `npx expo lint` e `git diff --check` sem erros.
- **Docs atualizados:** `issues.md`, `deployment-log.md`.
- **Riscos/Débito técnico:** a variante de Header para celular não existe no catálogo Figma lido; a adaptação final será feita na fase de responsividade.

## [2026-10-09] - Entrega: (2026-10-09 14:00:48) (Limpeza do template Expo)

- **Fase:** Fase 1 - Scaffold técnico (parcial).
- **O que foi feito:** Removidos rotas e componentes de exemplo (`explore`, tabs, `themed-*`, `animated-icon`, `hint-row`, `web-badge`, `external-link`, `collapsible`), `src/constants/theme.ts`, `src/hooks/*`, `scripts/reset-project.js` e o script `reset-project`, e imagens não usadas em `assets/images`. `src/app/_layout.tsx` agora é um `Stack` sem cabeçalho que carrega Montserrat e esconde o splash; `src/app/index.tsx` é uma tela vazia. `app.json`: orientação destravada, `userInterfaceStyle: light`, fundo do splash `#FCFCFC`. Dependências do template removidas: `@expo/ui`, `expo-glass-effect`, `expo-symbols`, `expo-device`, `expo-image` (reinstalar `expo-image` quando houver imagens).
- **Arquivos modificados:** `src/app/*`, `app.json`, `package.json`, `package-lock.json`, remoções listadas.
- **Checks:** `npx tsc --noEmit` e `npx expo lint` sem erros; `expo export` web conclui (rotas `/`, `/_sitemap`, `/+not-found`). `expo-doctor` não concluiu (travou por 15 min). Não testado em dispositivo/emulador.
- **Docs atualizados:** `implementation-plan.md`, `deployment-log.md`.
- **Riscos/Débito técnico:** ícone do app, splash e `expo.icon` ainda são do template (identidade pendente).

## [2026-10-09] - Entrega: (2026-10-09 14:00:48) (Componente Button e base de estilo)

- **Fase:** Fase 1 - Scaffold técnico (parcial).
- **O que foi feito:** `Button` em `src/components/ui/button` com `variant` (`primary` | `secondary` | `destructive`), `disabled`, `loading`/`loadingLabel`, `icon` (Lucide), foco visível e acessibilidade. Mapeamento do Figma: Default, Hover, Pressed e Disabled são estados de `primary` (`hover:`/`active:` e `disabled`); Secondary é variante. Altura 48 em todas as variantes (Figma mede 50 no Secondary; borda dentro dos 48). `destructive-pressed` (#991B1B) é complemento sem origem no Figma. Ícone: slot 32 com desenho 24 (regra do design-guidelines). NativeWind v5, Tailwind 4, Montserrat e Lucide instalados com versões fixas; `lightningcss` fixado em 1.30.1 via `overrides` (versões maiores quebram o `global.css`).
- **Arquivos modificados:** `package.json`, `package-lock.json`, `tsconfig.json`, `metro.config.js`, `postcss.config.mjs`, `nativewind-env.d.ts`, `eslint.config.js` (gerado pelo `expo lint`), `src/global.css`, `src/app/_layout.tsx`, `src/components/ui/button/{button.tsx,index.ts}`.
- **Checks:** `npx tsc --noEmit` sem erros; ESLint sem erros nos arquivos novos; `expo export` para web e Android concluem com o Button no bundle e as classes geradas. `npx expo lint` global falha por erro preexistente do template (`src/hooks/use-color-scheme.web.ts`, setState em effect). Não verificado em dispositivo/emulador: aparência de cada estado, anel de foco (`outline`) e cor do ícone/spinner via `styled`.
- **Docs atualizados:** `issues.md`, `implementation-plan.md`, `deployment-log.md`.
- **Riscos/Débito técnico:** NativeWind v5 é RC. Button ainda não é usado em nenhuma tela. `expo-doctor` não executado. Hover/pressed do secondary (`surface-hover`/`brand-soft`) e do destructive são escolhas minhas, a confirmar com o design.
## [2026-10-09] - Entrega: ISSUE-002 - (2026-10-09 14:00:48) (Dependências e NativeWind)

- **Fase:** Fase 1 - Scaffold técnico (parcial)
- **O que foi feito:** Removidos `@expo/ui`, `expo-glass-effect`, `expo-symbols`, `expo-device`, `expo-web-browser`, o script/arquivo `reset-project` e os arquivos de exemplo do template. Instalados `nativewind@5.0.0-rc.0`, `react-native-css@3.1.0-rc.0`, `tailwindcss` e `@tailwindcss/postcss` 4.1.12, `lightningcss@1.30.1` (com `overrides`), `postcss`, `react-native-svg`, `lucide-react-native`, `@expo-google-fonts/montserrat`, `expo-secure-store`, `expo-image-picker`, `zod` 4, `@tanstack/react-query` e, exigidos pelo `expo lint`, `eslint` e `eslint-config-expo`. Criados `metro.config.js`, `postcss.config.mjs`, `nativewind-env.d.ts`, `src/types/assets.d.ts`, tokens de cor em `src/global.css`, `_layout.tsx` e `index.tsx` mínimos (placeholder). `app.json`: orientação livre, tema claro e plugins de image-picker e secure-store. `expo-image` mantido.
- **Arquivos modificados:** `package.json`, `package-lock.json`, `app.json`, `tsconfig.json` (NativeWind incluiu `nativewind-env.d.ts`), `eslint.config.js`, os arquivos criados acima e as remoções em `src/components`, `src/constants`, `src/hooks` e `scripts`.
- **Checks:** `npx tsc --noEmit` OK; `npx expo lint` OK; `npx expo-doctor` 21/21; `expo export --platform web` gerou o CSS com os tokens. Não testado em dispositivo, simulador ou Expo Go.
- **Docs atualizados:** `docs/implementation-plan.md`, `docs/deployment-log.md`.
- **Riscos/Débito técnico:** NativeWind v5 é RC. `npm audit` aponta 31 vulnerabilidades (11 moderadas, 20 altas), não analisadas nem corrigidas. Fonte Montserrat instalada, mas ainda não carregada. `zod` 4 (a doc não fixava a versão).

## [2026-10-09] - Entrega: (2026-10-09 14:00:48) (Esqueleto de pastas)

- **Fase:** Fase 1 - Scaffold técnico (parcial)
- **O que foi feito:** Criadas 69 pastas (globais, rotas `(auth)`/`(app)` e 6 features) conforme `architecture.md`, cada uma com `.gitkeep`. Criado `.env.example` com `EXPO_PUBLIC_API_URL`.
- **Arquivos modificados:** `src/**` (apenas pastas e `.gitkeep`), `.env.example`, `docs/architecture.md`, `docs/implementation-plan.md`, `docs/issues.md`, `docs/deployment-log.md`
- **Checks:** listagem das pastas criadas. Lint/typecheck não executados (sem código novo). A API em `https://fivesense-api.onrender.com` não respondeu em 60 s numa chamada de teste (possível cold start); não foi validada.
- **Docs atualizados:** os listados acima.
- **Riscos/Débito técnico:** arquivos do template Expo ainda fora da estrutura; remover na Fase 1.

## [2026-10-09] - Entrega: (2026-10-09 14:00:48) (Revisão documental de Fundamentos e Componentes)

- **Fase:** Fase 0 - Documentação do projeto; permanecem decisões abertas.
- **O que foi feito:** Revisão via Figma das páginas 01 · Fundamentos (`3:12`) e 02 · Componentes (`3:13`), tokens/estilos locais, catálogo e propriedades de componentes selecionados. Corrigidos botões, sidebar/Nav, sombras, exceção tipográfica do rodapé e seleção de representantes. Acrescentados mapa de tokens, catálogo rastreável, divergências e critérios de conferência visual. Removida a afirmação vigente de impossibilidade de ler o Figma; a entrada histórica anterior foi preservada.
- **Arquivos modificados:** `docs/design-guidelines.md`, `docs/coding-standards.md`, `docs/testing.md`, `docs/issues.md`, `docs/implementation-plan.md`, `docs/decision-log.md`, `docs/deployment-log.md`.
- **Checks:** comparação documental com valores obtidos do Figma; revisão de diff, referências locais e contagem/mapeamento de tokens. `npm run lint` falhou porque o executável expo não está disponível; `npx --no-install --offline tsc --noEmit` falhou com ENOTCACHED, sem TypeScript local/cache disponível. A pasta não possui node_modules. Nenhuma dependência instalada; não houve verificação de UI em execução.
- **Docs atualizados:** os sete documentos acima. Nenhum arquivo de documentação criado/removido no repositório; código e Figma preservados.
- **Riscos/Débito técnico:** limite de chamadas do plano Figma interrompeu a inspeção detalhada dos componentes restantes; páginas de telas/estados não auditadas. Pendentes os conflitos de Badge 5S, alvo de Button-SM, variantes genéricas e identidade. Contrato de sessão, senha e calendário permanece limitado pela API e pelas decisões já registradas.

## [2026-10-09] - Entrega: (2026-10-09 14:00:48) (Adaptação dos docs ao projeto)

- **Fase:** Fase 0 - Documentação do projeto
- **O que foi feito:** Framework SpecFirst adaptado ao Five Sense App. Reescritos `AGENTS.md`, `README.md` e os docs de produto, design, arquitetura, dados, segurança, padrões, testes, workflow e plano. Histórico do template foi substituído. Após aprovação do humano, removidos 12 docs (`backlog`, `client-launch-checklist`, `context-strategy`, `deploy`, `domains`, `editor`, `implementation-governance`, `new-client-workflow`, `operations`, `pdf-export`, `templates`, `tooling-adapters`); `CLAUDE.md` mantido e reduzido. Documentação da API v1 incorporada (`data-model.md`, `security.md`, `architecture.md`, `workflows.md`, `design-guidelines.md`).
- **Arquivos modificados:** `AGENTS.md`, `README.md`, `docs/README.md`, `docs/project-overview.md`, `docs/workflows.md`, `docs/design-guidelines.md`, `docs/architecture.md`, `docs/data-model.md`, `docs/security.md`, `docs/coding-standards.md`, `docs/testing.md`, `docs/ai-workflow.md`, `docs/implementation-plan.md`, `docs/issues.md`, `docs/decision-log.md`, `docs/deployment-log.md`
- **Checks:** revisão documental. Nenhum código; lint/typecheck não aplicáveis. Figma não pôde ser lido (exige login).
- **Docs atualizados:** os listados acima.
- **Riscos/Débito técnico:** API pública, sem token nem autorização; 16 lacunas entre requisitos e API em `data-model.md`; enums de `role`/`status` não confirmados; NativeWind v5 está em release candidate; docs sujeitos a ajuste após ver o Figma.

