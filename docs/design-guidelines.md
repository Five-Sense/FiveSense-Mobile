# Design Guidelines

> **Escopo vigente (2026-10-16, pedido do humano; decisão 0009):** cliente exclusivo do Visualizador. Remover a demonstração `/components`, código de Administrador/Gestor, Sidebar/NavItem e feedback de estoque em MaterialItem/MaterialDetailsCard. MenuButton/AppMenu e os dados de quantidade permanecem. O catálogo lido do Figma deixa de definir o inventário do cliente; o contrato da API externa permanece documentado como referência.

Fontes: briefing de design e [Figma Five Sense](https://www.figma.com/design/qwja0MnPwxd5oQwGva6Nso/Five-Sense). Revisão em **2026-10-09** das páginas [01 · Fundamentos](https://www.figma.com/design/qwja0MnPwxd5oQwGva6Nso/Five-Sense?node-id=3-12) e [02 · Componentes](https://www.figma.com/design/qwja0MnPwxd5oQwGva6Nso/Five-Sense?node-id=3-13), por leitura direta via integração do Figma.

Foram lidos os textos de Fundamentos, as duas coleções de variáveis, os dez estilos de texto, os dois estilos de efeito e o catálogo de componentes/variantes. Medidas e propriedades de Button, Button-SM, Button/Tertiary, App/Sidebar, Nav selecionado, App/Menu, Auth/Card, App/Footer e Badge 5S também foram conferidas. A consulta detalhada dos demais componentes foi interrompida pelo limite de chamadas do plano do Figma. As páginas 03 · Telas e 06 · Estados e comportamentos não integram esta revisão.

**Precedência:** o Figma orienta a aparência; `data-model.md` e `security.md` mantêm o contrato de dados e segurança. Um protótipo não autoriza novos endpoints, permissões ou regras de sessão. Valores identificados como **briefing** ou **complemento de implementação** não foram confirmados nestas duas páginas. Conflitos internos do Figma ficam registrados em "Pendências e divergências", sem reduzir silenciosamente os requisitos de acessibilidade do projeto.

Interface profissional, minimalista e organizada. Tema claro, Montserrat, Lucide. Azul como cor principal. Sem gradientes decorativos, vidro, excesso de sombra ou animação contínua. Estas regras não criam funcionalidade nem alteram permissões.

## Plataformas

Referências do briefing preservadas; os frames completos e os breakpoints não foram auditados neste recorte.

| Plataforma | Frame | Orientação |
| --- | --- | --- |
| Tablet Android | 1280x800 | Paisagem |
| Desktop (web) | 1920x1080 | Paisagem |
| Celular | 390x844 | Retrato |

Medidas do Figma são px de desenho; em RN viram unidades independentes de densidade. O app não pode ser travado em retrato. Respeitar áreas seguras e teclado virtual; telas longas rolam na vertical.

## Cores (tokens)

| Token | Valor | Uso |
| --- | --- | --- |
| brand-primary | #000080 | Identidade, navegação ativa |
| brand-action | #4747D4 | Botão principal, links, seleção, foco |
| brand-action-hover | #3737B8 | Hover do principal |
| brand-dark | #0E0E55 | Pressionado |
| brand-accent | #8080FF | Decorativo; nunca texto pequeno nem fundo de botão com texto branco |
| brand-soft | #EEEEFF | Item selecionado |
| text-primary | #111111 | Títulos e valores |
| text-secondary | #475569 | Descrições |
| text-muted | #64748B | Placeholder |
| page | #FCFCFC | Fundo geral |
| surface | #FFFFFF | Cards, modais |
| surface-subtle | #F1F5F9 | Cabeçalho de tabela, somente leitura |
| surface-hover | #F8FAFC | Hover |
| border-subtle | #E2E8F0 | Divisórias, cards |
| border-control | #64748B | Contorno de campos |
| disabled-bg / disabled-text | #E2E8F0 / #64748B | Desabilitado |
| focus-ring | #4747D4 | Foco; corresponde a focus/ring no Figma |
| overlay | #111111 a 48% | Fundo de modal; complemento do briefing, sem variável local correspondente |

Semânticas (texto/ícone, fundo, borda; texto e fundo confirmados nas variáveis, bordas e neutro mantidos do briefing): sucesso #166534/#F0FDF4/#15803D; aviso #92400E/#FFFBEB/#B45309; erro e destrutivo #B91C1C/#FEF2F2/#B91C1C; informação #1E40AF/#EFF6FF/#2563EB; neutro #475569/#F1F5F9/#64748B.

Regras: a paleta é a mesma para todos os perfis; perfil e estado sempre com texto, nunca só cor.

## Tipografia

Os estilos locais usam Montserrat 400 e 600. Peso 500 e destaques 700 são orientações do briefing, sem estilo local correspondente. Texto funcional permanece com mínimo 14; exceção observada: rodapé institucional Footer 12/15, não interativo. Badges de 10 px conflitam com essa regra e estão registrados nas pendências.

| Estilo | Tamanho/entrelinha | Peso |
| --- | --- | --- |
| Título de autenticação | 32/40 (celular 28/36) | 600 |
| Título de página | 28/36 (celular 24/32) | 600 |
| Título de seção/modal | 24/32 | 600 |
| Título de card | 18/26 | 600 |
| Corpo | 16/24 | 400 |
| Rótulo de campo | 14/20 | 600 |
| Botão e navegação | 16/24 | 600 |
| Auxiliar | 14/20 | 400 |
| Badge | 14/20 | 600 |
| Rodapé institucional (Footer) | 12/15 | 400 |
| Número em destaque (briefing, sem estilo próprio) | 32/40 | 600 |

Estilos Figma: Auth, Page, Section, Card, Body, Label, Button, Helper, Badge e Footer. As reduções de títulos no celular são adaptações do briefing, sem estilos locais específicos verificados. Alinhar à esquerda; quantidades à direita em tabelas; permitir quebra em títulos longos; suportar texto ampliado.

## Espaçamento, grid e raios

Escala de 4 px: 4, 8, 12, 16, 24, 32, 40, 48, 64.

Relações do briefing (confirmadas pontualmente em Auth/Card e Button, não em todos os componentes): rótulo-campo 8; campo-mensagem 8; grupo-grupo 24; ícone-texto do botão 8; botão-botão 12; cabeçalho-conteúdo 24; card-card 24; seção-seção 32.

| | Desktop | Tablet | Celular |
| --- | --- | --- | --- |
| Colunas | 12 | 8 | 4 |
| Gutter | 24 | 24 | 16 |
| Margem | 32 | 24 | 16 |
| Navegação lateral | 222 (App/Sidebar medido) | composição a confirmar; briefing previa 208 | menu em painel (briefing) |
| Cabeçalho | 72 | 72 | 64 |

O grid, gutters, margens, adaptação mobile e limites a seguir permanecem referências do briefing; não deduzir breakpoints a partir da largura de um componente isolado. Conteúdo máximo 1440 no desktop. Formulário simples até 640; ocorrência até 800. Celular: uma coluna, tabelas viram cards.

Raios: campos, botões e menus 8; cards e imagens 12; modais 16; badges e avatares totalmente redondos. Bordas: cards 1 px border-subtle; campos 1 px border-control; foco 2 px brand-action; equipe fazendo 5S 2 px verde de sucesso (sem mudar o tamanho externo). Estilos de efeito confirmados: `Elevation/Card` = x 0, y 4, blur 4, spread 0, preto a 25%; `Elevation/Modal` = x 0, y 12, blur 32, spread 0, #111111 a 16%. Não aplicar a sombra de card a todos os cards automaticamente: conferir o vínculo no componente. Sombra de menu 0 4 16 a 10% permanece complemento do briefing, sem estilo local correspondente.

## Componentes

As regras sem indicação de componente/propriedade conferida permanecem requisitos do briefing/projeto; não significam que todas as medidas e interações abaixo foram verificadas no Figma.

- **Botão:** Button tem Default, Hover, Pressed e Disabled com altura 48. Na variante Default foram conferidos padding 8, gap 8, raio 8, texto 16/24 600 e slot de ícone 32. Primário usa #4747D4 e texto branco. Secondary mede 50 de altura, fundo branco, texto #4747D4 e borda 1 px #E2E8F0 (não #000080). Button/Tertiary é separado: altura 48, fundo branco, texto #4747D4, sem borda, padding 0. Largura 376 é a amostra, não largura fixa da aplicação. Foco (anel 2 px), carregando ("Salvando...", sem toque repetido) e destrutivo #B91C1C são complementos necessários, sem variantes próprias encontradas no catálogo. "Cancelar" antes da ação principal é orientação do briefing. Button-SM existe, mas seu uso com toque depende da resolução da pendência de alvo mínimo.
- **Campo:** altura mínima 48, rótulo persistente acima, placeholder só como exemplo, "Opcional" nos opcionais, contador onde há limite, senha com mostrar/ocultar, erro após interação ou envio (texto + ícone abaixo do campo), somente leitura em surface-subtle.
- **Lista suspensa:** Input Icon, Opção e Lista de opções existem no Figma; Opção mede 48 de altura. Mesma altura/borda do campo, seleção em brand-soft, menu máx. 320 com rolagem e estados carregando/vazio/erro permanecem orientações do briefing a conferir nas propriedades detalhadas. Representantes não usam este seletor: são texto livre conforme a API; não implementar chips, contador ou limite de seleção.
- **Controle de quantidade:** [-] valor [+] com botões 48x48, valor 18/26 600, desabilita no limite sem usar vermelho. Material: máx. 999.
- **Card:** branco, raio 12, borda sutil, padding 24 (16 no celular), título 18/26.
- **Tabela (tablet/desktop):** cabeçalho surface-subtle, linhas de 64, ações à direita. No celular, cards.
- **Badge (regra funcional do briefing, divergente do componente Badge 5S):** altura mínima 28, "Fazendo 5S" (sucesso, mais borda no card), "Não fazendo 5S" (neutro), "Status indisponível" (neutro), "Atualizando..." (spinner), "Sua equipe" separado do status. Nunca mostrar status desconhecido como "Não fazendo 5S"; manter o último confirmado durante a atualização.
- **Modal:** overlay, raio 16, padding 24, fechar 48x48, larguras 480 (confirmação), 640 (cadastro/detalhes), 800 (extenso). Não empilhar modais. No celular, formulários extensos ocupam a tela. Devolver o foco ao controle de origem.
- **Alertas:** bloco com fundo e borda semânticos, ícone 24, título 16/24 600, descrição 14/20, ação de recuperação. Toast de sucesso: 6 s, 400 máx., canto inferior direito (tablet/desktop) ou largura total (celular). Erros que exigem correção ficam visíveis no contexto. Resultado parcial usa aviso.
- **Navegação vigente:** MenuButton e AppMenu horizontais (detalhes na seção de implementação abaixo). Sidebar/NavItem e menus de gestão/administração foram retirados pelo humano em 2026-10-16; medidas desses componentes no catálogo abaixo são apenas registro da leitura do Figma.
- **Paginação:** abaixo da lista, alvos 48x48, página atual em brand-action; no celular, Anterior / página / Próxima.
- **Imagens:** material 4:3 em cards e miniatura 56x56 em tabelas, sem cortar; ocorrência com prévia até 240 de altura, nome e tamanho, ações Substituir/Remover, limite de 5 MB (limite da API) visível. Material não tem imagem na API: usar sempre o placeholder. Sem imagem: placeholder com ícone e texto.
- **Calendário de 5S:** a API só tem `schedule` em texto livre por equipe; exibir esse texto por equipe (sem inferir turnos, datas ou recorrência) em blocos brand-soft; no celular, lista. Formato final depende de decisão.
- **Representantes:** texto livre; sem chips nem contador.

## Ícones

Lucide (`lucide-react-native`). O catálogo contém ícones reutilizáveis; Button e Nav têm slots de 32, Button-SM tem slot de 18. Tamanho do slot não define o tamanho do desenho interno. Traço 2, ícone 24 (20 em badges/campos, 48 em estados vazios) são referências do briefing a conferir conforme o componente. Botão só com ícone tem nome acessível. Sem emoji como ícone. Mesmo ícone para a mesma função.

## Estados obrigatórios

- **Carregando:** skeleton com a estrutura do conteúdo (surface-subtle e border-subtle); spinner 20 em botões e 32 em blocos.
- **Vazio:** ícone 48, título 18/26, descrição 16/24, ação só para quem pode.
- **Erro de carregamento:** mensagem objetiva, "Tentar novamente", substitui só a região afetada.
- **Sessão expirada** e **acesso negado:** ver `workflows.md`. Acesso negado nunca aparece como falha de conexão.
- **Pull to refresh** em toda lista que vem da API.

## Autenticação

Fundo page, card branco até 440 com padding 32 (24 no celular), logotipo acima do título, botão principal em largura total. Área institucional lateral só no desktop se couber. Auth/Card medido: largura 440, padding 32, gap 24, raio 12 e borda border-subtle; sua altura 620 é de uma composição de exemplo e deve crescer com o conteúdo. A biblioteca já contém Logo nas variantes Conjunto, Texto e Imagem. Reutilizar esse ativo após exportação e conferência de sua condição oficial; Fundamentos ainda o descreve como identidade provisória. Não recriar a marca apenas como texto sem avaliar o componente existente.

## Movimento

Complemento do briefing, não verificado nas interações deste recorte: hover/foco 120 ms; menu 160; modal e troca de página 200. Sem molas nem animação decorativa. Respeitar redução de movimento.

## Acessibilidade

Contraste 4,5:1 (texto) e 3:1 (texto grande e controles); alvo mínimo 48x48; foco visível; erro com texto; rótulos persistentes; nada essencial só por hover; compreensível sem imagens. Cores devem ser conferidas no contexto real.

## Correspondência de tokens

As coleções locais são **Five Sense · Primitivos** e **Five Sense · Tema claro**, ambas com um único modo chamado Mode 1. Há 26 cores primitivas, 26 aliases de cor no tema e 13 variáveis numéricas (65 variáveis ao todo). O modo não indica suporte a tema escuro. Não há estilos locais de pintura: as cores são variáveis.

| Figma | Nome usado nesta documentação/código planejado |
| --- | --- |
| brand/primary, brand/action, brand/action-hover, brand/dark, brand/accent, brand/soft | brand-primary, brand-action, brand-action-hover, brand-dark, brand-accent, brand-soft |
| text/primary, text/secondary, text/muted | text-primary, text-secondary, text-muted |
| background/page | page |
| surface/default, surface/subtle, surface/hover | surface, surface-subtle, surface-hover |
| border/subtle, border/control | border-subtle, border-control |
| disabled/background, disabled/text | disabled-bg, disabled-text |
| focus/ring | focus-ring (mesmo valor de brand-action, finalidade distinta) |
| error/text, error/bg | error-text, error-bg |
| success/text, success/bg | success-text, success-bg |
| warning/text, warning/bg | warning-text, warning-bg |
| info/text, info/bg | info-text, info-bg |
| space/1, /2, /3, /4, /6, /8, /10, /12, /16 | 4, 8, 12, 16, 24, 32, 40, 48, 64 |
| radius/control, radius/card, radius/modal | 8, 12, 16 |
| dimension/control | 48 |

Preservar nomes semânticos na implementação e documentar aliases. Overlay, bordas semânticas, neutro e raios totalmente redondos são complementos documentados, não variáveis locais confirmadas.

## Catálogo e rastreabilidade

IDs consultados na página 02 · Componentes. Os nomes abaixo são os nomes reais da biblioteca; não representam automaticamente os nomes das props no app. Propriedades genéricas como Property 1, Variant2 e Variant3 precisam de mapeamento explícito antes da implementação.

| Componente / ID | Variantes ou composição verificadas | Aplicação / limite |
| --- | --- | --- |
| Button `33:2643` / Button-SM `208:5030` | Default, Hover, Pressed, Disabled, Secondary; Label e slot de ícone | Botões; foco/loading/destrutivo ainda sem variante própria |
| Button/Tertiary `4:12` | Label; componente separado | Ação terciária; descrição do Figma o chama de principal, divergência de metadados |
| Input `79:4051` | Default, Error, Variant3; Label e Value | Não interpretar Variant3 como foco sem conferir |
| Input/Password `6:2`, Input/PasswordVisible `22:848`, Input/Error `6:9`, Input/Focus `6:13` | Componentes separados, Label e Value | Sobreposição com Input/Error exige definir qual será a referência; não remover do Figma nesta revisão |
| Input Icon `115:3773` | Default, Variant2; slot chevron-down | Estado de Variant2 ainda não confirmado |
| Opção `115:4704` / Lista de opções `115:4733` | Default, Variant2; slot Options; opções de 48 | Estado de Variant2 e detalhes do menu ainda não confirmados |
| Nav `28:1761` / App/Sidebar `28:1537` | Unselected/Selected; slots Sidebar/Navigation e Sidebar/Account | Separar seleção visual de permissão por perfil |
| App/Header `46:3845` / App/Menu `33:2741` / Menu - Button `43:3650` | Header Desktop/Tablet; Menu horizontal com slot | O app adota apenas Header Tablet; não há variante Mobile no catálogo consultado |
| App/Footer `61:2285` | Altura de amostra 32, padding 8; texto Footer 12/15 | Permitir crescimento com texto ampliado |
| Auth/Card `33:2866` / Auth/Institutional `34:1538` | Card com slots de campos e ações; bloco institucional separado | Fluxos de senha continuam dependentes da API |
| Logo `53:817` | Conjunto, Texto, Imagem | Ativo existente; condição oficial e exportação pendentes |
| Access `31:2461` | Apenas Tablet; amostra 369x260; Title, Description, Action e slot de ícone | Card de acesso aos módulos; demais plataformas não confirmadas |
| Alert `33:2952` | Error, Info, Success, Warning; amostras 374x84 | Não fixar altura se o texto crescer; propriedades detalhadas não verificadas |
| Account/Profile `93:2737` | Componente presente | Composição detalhada não verificada |
| Equipe Card `208:5274` / Detalhes da equipe `208:6580` | Componentes presentes; há também frame homônimo `208:6456` | Não confundir frame de demonstração com componente reutilizável |
| Badge 5S `208:4707` | Fazendo / Não Sendo Feito | Divergências de tamanho e semântica abaixo |
| Calendário Horas `208:7140` | Não Realizado, Realizado, Sendo Realizado; amostras 280x51 | Não mapear automaticamente aos dois estados da API |

Ícones encontrados: circle-alert, users, package, user-round, file-exclamation-point, house, log-out, arrow-right, arrow-left, rotate-cw, chevron-down, chevron-up, check, plus, loader-circle e calendar. Reutilizar nomes equivalentes do Lucide, conferindo o pacote aprovado ao implementar.

Modal genérico, Toast, Skeleton, EmptyState, ErrorState, Pagination, QuantityStepper e tabela genérica não foram encontrados como componentes nomeados nesta página. Permanecem requisitos de implementação do briefing/projeto, e não componentes já prontos no Figma. Sua ausência nesta página não comprova ausência nas telas ou na página de estados.

## Pendências e divergências

| Tema | Evidência | Tratamento nesta revisão |
| --- | --- | --- |
| Button-SM | Altura 30 (Secondary 31), texto 14/20 e slot 18; Fundamentos exige toque 48x48 | Registrar visual compacto; manter alvo mínimo 48x48 no app. Validar área interativa e espaçamento sem sobrepor alvos antes de usar |
| Badge 5S | Altura 20, texto 10/20; Fazendo 5S usa texto brand-action; Sem fazer 5s usa texto error-text; ambas com fundo branco e borda border-subtle (lidas em 2026-10-16) | Conflita com mínimo funcional 14 e com sucesso/neutro do briefing. **Decisão do humano (2026-10-16): os cards seguem o Figma 100%**, então `TeamStatusBadge` usa 10/20 e "Sem fazer 5s" em vermelho (`decision-log.md` 0008). A regra funcional do briefing (28 de altura, "Não fazendo 5S" neutro, "Status indisponível", "Atualizando...") continua não implementada; não tratar status desconhecido como "Sem fazer 5s" |
| Escala de 4 px | Sidebar 222, Secondary 50, Menu 65, gaps/paddings 10, badges 20 e slots 18 | Escala vale como padrão de espaçamento, não proibição de toda medida diferente. Exceções precisam de fonte e finalidade; preservar área de toque e crescimento do conteúdo |
| Nomes de estados | Input Variant3, Input Icon/Opção Variant2; dois componentes de erro | Não deduzir foco, seleção, readonly ou disabled pelo nome genérico. Confirmar aparência/interação e definir mapeamento |
| Sessão | Fundamentos `22:978` diz Admin/Gestor 1 h e Visualizador sem expiração; docs registram orientação humana de expiração para todos e API sem token | Manter lacuna 1 de data-model.md; não introduzir temporizador nem sessão permanente a partir do protótipo |
| Calendário | Três variantes de Calendário Horas; API tem schedule livre e DOING_5S/NOT_DOING_5S, sem histórico de realização | Não inventar terceiro estado, turnos, datas ou histórico; manter exibição textual do schedule até contrato suportar mais |
| Permissões | Fundamentos `22:974` limita Admin a Usuários; Gestor a Problemas/Equipes/Materiais; Visualizador a Ocorrências/Equipes/Materiais | Já coincide com workflows.md; nenhum novo acesso concedido |
| Recuperação e senha | Fundamentos simula e-mail, link de 10 min e troca opcional no primeiro acesso | Não comprova funcionalidade da API; manter bloqueios e validações já documentados |
| Identidade | Fundamentos diz provisória, mas Logo já tem Conjunto/Texto/Imagem | Exportar e validar o componente antes da implementação; ícone do app segue pendente |
| Cobertura | Limite de consultas interrompeu detalhes de campos, alertas, cards e calendário; páginas de telas/estados fora do recorte | Retomar apenas as lacunas quando houver acesso; não classificar a interface inteira como validada |

## Resultado da revisão de 2026-10-09

- **Mantido:** paleta base, nove estilos funcionais, espaçamentos, raios principais, Montserrat/Lucide, navegação por perfil e restrições da API; já coerentes com as fontes lidas.
- **Corrigido:** alegação de Figma inacessível, botão secundário/terciário, padding de botões, navegação lateral e itens, estilos de sombra e regra absoluta de tamanho de fonte, com exceção institucional explícita.
- **Adicionado:** focus/ring, Footer, mapa de tokens, catálogo com IDs/variantes/slots e registro de diferenças entre Figma, briefing, acessibilidade e API.
- **Removido do texto:** uso de chips/múltipla seleção de representantes e pedido genérico de exports para iniciar a leitura. Nenhum documento removido.
- **Pendente:** decisões visuais conflitantes, mapeamento de variantes genéricas, exportação da marca e verificação detalhada limitada pela cota. Esta é uma revisão documental; código, dependências e arquivo Figma não foram alterados.

## Implementação MenuButton/AppMenu - 2026-10-16

Consulta direta de contexto e screenshot dos componentes [Menu - Button `43:3650`](https://www.figma.com/design/qwja0MnPwxd5oQwGva6Nso/Five-Sense?node-id=43-3650) e [App/Menu `33:2741`](https://www.figma.com/design/qwja0MnPwxd5oQwGva6Nso/Five-Sense?node-id=33-2741), complementada pelas imagens enviadas pelo humano. Implementação em `src/components/navigation/`, conforme o agrupamento por função de AGENTS.md; a navegação lateral foi removida posteriormente por pedido do humano (decisão 0009).

- **MenuButton:** ícone/slot 32x32, padding 8, gap 4, rótulo Helper (Montserrat Regular 14/20); a amostra "Texto" mede aproximadamente 54x72. Usa `Icon` global com Lucide/traço 2. Este ícone de 32 é uma medida específica deste componente, distinta do desenho 24 da navegação lateral. Os retângulos magenta dos slots são marcações do editor e não são renderizados.
- **AppMenu:** superfície branca e borda superior border-subtle de 1; padding externo 4, slot centralizado com padding 10 e gap 24. O componente vazio tem amostra 834x65 e slot mínimo 56. Com MenuButtons de 72, a implementação cresce naturalmente para 101 de altura em uma linha, considerando padding/borda, para não recortar ícones ou rótulos. A largura é fluida; 834 não vira largura mínima obrigatória no app. Em espaço insuficiente, os itens quebram linha, sem inventar uma composição mobile definitiva.
- **Seleção:** a imagem preenchida usa text-secondary nos itens comuns e brand-primary no ativo, tanto no ícone quanto no texto, sem fundo colorido de seleção. Essa imagem orienta as cores da barra; o rótulo genérico "Texto" no componente isolado usa text-primary no contexto do Figma.
- **Composição:** `AppMenu` recebe os `MenuButton`s por `children`. Cada item recebe label, icon, onPress, selected, disabled e hint opcional. A tela fornece apenas itens permitidos ao perfil e controla selected; os componentes não conhecem sessão, API, destinos fixos nem regras de negócio. O layout da tela é responsável pelo posicionamento da barra e pela área segura.
- **Complementos de interação:** foco visível de 2, estados hover/pressionado (surface-hover/surface-subtle) e texto/ícone disabled-text sem interação; nenhum desses estados é declarado variante adicional confirmada do Figma. Os controles têm alvo mínimo 48, nome acessível, estado selecionado/desabilitado e aria-current no web. Rótulos podem crescer e quebrar linha.

## Login do Visualizador - 2026-10-16

Contexto e screenshot de 33:2564: frame 834x1194; logo 246x149; gap 64; card 440x450, borda 1, raio 12, padding 32 e gap 24. Header 32/40 semibold, descrição 16/24 regular; campos 76 com controle 48 e gap de label 8; Auth/Fields padding vertical 8 e gap 24; botão 48 com slot de seta à direita 32. A altura do card cresce com Alert. Reutilizar os ativos locais conferidos; celular fluido com padding do card 24 e margem externa 16. Nenhuma marcação azul de seleção do editor entra na interface. Feedback usa Alert existente com Montserrat e sombra Elevation/Card, erro textual mais bordas nos campos correspondentes. O humano confirmou que o protótipo está incorreto: substituir E-mail por Nome de usuário e placeholder por Seu nome de usuário, com validação apenas de obrigatoriedade/tamanho. A senha continua obrigatória. Confirmar sucesso no mesmo card até o próximo print. As imagens locais logo-symbol (84x110) e logo-text (246x30), gap 9, reproduzem a composição 246x149 conferida; não redesenhar a identidade.
## Base de estilo usada no catálogo - 2026-10-16

Durante a montagem de `/components`, `src/shared/global.css` continha só as cores. Foram restaurados os tokens já previstos neste documento: Montserrat 400/600, raios control/card/modal, área de toque 48, slot 32, Sidebar 222, Nav 56 e estilos Button/Nav, Body, Label, Helper, Card, Section e marca textual provisória. O alias `card-title` equivale a Card 18/26 e atende o MaterialItem existente. A escala base de espaçamento usa 4 px, mantendo os alvos em unidades independentes de densidade. On-brand/destructive e shadow-menu continuam complementos documentados, não novos tokens confirmados do Figma. Não houve alteração em colors.tokens.json.

As duas badges existentes de 5S são apresentadas separadamente no catálogo. A galeria não elege uma versão nem altera as divergências aceitas para os cards. Seus estados e comparações são manuais, com dados fictícios.
## Ajuste de escopo e tokens - 2026-10-16

Sidebar/NavItem e estilos exclusivos (largura sidebar, tipografia nav e wordmark) removidos. A altura mínima 56 do slot do AppMenu passa a se chamar menu-slot, sem mudança visual. MaterialItem não aceita lowStock nem mostra aviso visual/acessível; MaterialDetailsCard mantém apenas seus dados de estoque. Catálogo /components removido; correções de fonte, raios, cores, imports e acessibilidade permanecem nos componentes. Os trechos de leitura do Figma e da galeria acima registram entregas anteriores, não o inventário atual.

## Ocorrência - 2026-10-19

Fonte direta: frame 96:2189 (834x1194). Reutilizar moldura do app; conteúdo padding x40/top32/bottom24, título Page28/36, contexto Helper14/20, gap24 até card. Card p32/gap20/raio12; campo48/label14/20/gap8, valor de quantidade Section24/32, upload303/slot56/ImagePlus28 e borda tracejada. Progresso: 3 campos obrigatórios preenchidos, sem wizard adicional; imagem opcional não altera a contagem. Limite de imagem alterado de 20MB do print para 5MB do contrato. Usar logo-text local no header de referência, ícones Lucide e variantes opcionais dos componentes existentes. Alvo de conferência deste fluxo: somente tablet 834x1194, conforme instrução do humano em 2026-10-19; não exigir testes de celular ou desktop. Sucesso/erros usam Alert existente; telas específicas adicionais aguardam próximos prints.

Conferência final do incremento: tablet 834x1194, marca local efetiva 199x26 (Imagem dentro de View com dimensões e 100% de largura/altura), título 28/36 e prévia da imagem contida no campo de altura303. Alias tipográfico --text-page-heading evita colisão de text-page com --color-page no Tailwind; mantém o valor Page existente. AppHeader recebe referenceSize opcional só para esta rota; Select e QuantityStepper recebem tamanhos opcionais preservando os padrões anteriores. Nenhum asset remoto novo ou dependência.

### Origem da imagem - correção de 2026-10-19

Print enviado pelo humano e contexto/screenshot direto do Figma97:7404/97:7405 substituem a composição provisória anterior. Em tablet834x1194: overlay rgba(17,24,39,.4), painel x40/y786/754x368 (margens laterais/inferior40), page, raio16, Elevation/Modal0 12 32 #11111129, padding24/gap20. Alça48x4 border-subtle centralizada; título Section24/32 e descrição Body16/24 com gap6. Opções em linha com padding4/gap16: cada card341x166, p20/gap12, borda sobreposta sutil/raio12, círculo56 brand-action e Lucide Images/Camera28 on-brand; título Card18/26 semibold e descrição Helper14/20 em brand-action. Rodapé Helper14/20 centralizado. Icon global e Lucide existentes são as correspondências dos ícones do Figma; não há novo asset remoto. Token overlay corresponde ao backdrop confirmado.

Removidos botões empilhados/Cancelar e limite440; fechamento pelo fundo/Escape/voltar sem perda. Sem prometer arraste para a alça decorativa. Rolagem interna permite crescimento de texto e área segura é somada à margem inferior. Ortografia dispositivo corrigida; formatos JPG/PNG e limite5MB (contrato vigente, não20MB do print). Conferência final apenas tablet confirmou medidas e ícones28 brancos; nenhum transbordamento horizontal.
### Coleção de fotos - 2026-10-19

Pedido humano atual adapta a referência de uma imagem para várias, sem novo print específico: preservar moldura, painel inferior Galeria/Câmera, tokens e área vazia303. Textos passam a Fotos/Adicionar fotos e20MB no total. Com anexos, exibir quantidade e soma de tamanhos, prévias contidas de altura160 em cards com raio/borda/padding existentes, duas colunas no tablet, nome/tamanho e Button secundário Remover foto N. Botão secundário Adicionar mais fotos com Icon ImagePlus existente. Rolagem do conteúdo permite qualquer quantidade dentro do limite em bytes, preservando header/menu. Remoção libera espaço; cancelamento e lote inválido preservam seleção. A coleção é adaptação funcional autorizada, não nova composição medida diretamente no Figma. Conferência somente tablet834x1194. Limite20MB atual substitui5MB na interface; envio múltiplo depende do backend conforme data-model.
### Miniaturas compactas e cadastro concluído - 2026-10-19

Fonte: dois prints atuais do humano; contexto/screenshot direto Figma97:7533 (sucesso) e96:2227 (base do anexo). O print de miniaturas prevalece sobre a coleção aberta anterior: área branca tracejada690x303, montagem200x200 centralizada junto ao+ (desenho32 em alvo48), raio16 e imagens cover. Até4 imagens visíveis em células flexíveis; com mais de4, quarta célula mostra overlay/40 e texto branco+N (total menos4). Nove fotos mostram+5. Miniaturas/+N abrem todas as fotos em pop-up do padrão existente: overlay/40, superfície page, raio16/sombraModal, margens40, título Section, X48 e previews contidos160 com nomes/tamanhos/remover, duas colunas e rolagem. Não há print de detalhe do pop-up: composição adapta os componentes existentes, sem alegar referência Figma específica dessa galeria. Contador/tamanho total20MB ficam no pop-up; limite total permanece no rótulo. Fotos são dados do usuário, não assets estáticos do protótipo.

Sucesso Figma97:7533: conteúdo x40/top32/gap24; card754x236 com padding top36/x32/bottom32, raio12 e Elevation/Card0 4 4 #00000040. Selo80 circular verde, Check Lucide36 centralizado, gap20 até mensagem; título Page28/36, descrição Body16/24, gap8, ambos success-text. Buttons globais: primário com ArrowRight32 e secundário com Plus32 à direita, gap8. Header/menu existentes e logo local199x26 mantidos. Card medido754x236; y105 decorre da borda1 do AppHeader preexistente (Figma104), sem alterar global por essa diferença. Sucesso somente após confirmação HTTP; sem alegação de entrega de e-mail. Nenhum asset remoto novo ou dependência.
### Limites da API múltipla - 2026-10-19 (vigente)

Contrato atualizado substitui menções anteriores a quantidade ilimitada/bloqueio múltiplo: até 5 fotos JPG/PNG, 5 MB cada e 20 MB no total. Mostrar esses três limites no campo, dica acessível e rodapé da origem. Ao atingir 5, desabilitar + com token disabled-text, mantendo miniaturas/galeria e remoção disponíveis; remover libera adição. Montagem, pop-up e confirmação preservados; +N continua dinâmico (5 fotos -> +1). O exemplo de 9 fotos/+5 acima é referência histórica anterior ao novo limite. Conferência continua somente tablet 834x1194.

### Interação da navegação - 2026-10-21

Pedido humano: logo existente no AppHeader vira controle para Home, preservando marca199x26, ícone de saída32 e altura72 do tablet; alvo mínimo48 e nome acessível Five Sense: ir para a Home, foco por token, desabilitado enquanto envia ocorrência ou encerra sessão. AppLayout respeita área segura superior/inferior e usa a mesma barra em equipes/calendário e demais telas. Não há novo desenho do Figma nem novos tokens; alteração de comportamento e remoção de moldura duplicada. Conferência visual em tablet pretendida, mas interrompida pelo Computer Use por não conseguir identificar com segurança a URL da janela; não declarar aceite visual neste incremento.
