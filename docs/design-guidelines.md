# Design Guidelines

Fonte: briefing de design do Five Sense e Figma (`https://www.figma.com/design/qwja0MnPwxd5oQwGva6Nso/Five-Sense`, node 115-3778). O Figma exige login e não pôde ser lido pela IA; em conflito, vale o Figma, e a divergência deve ser registrada aqui.

Interface profissional, minimalista e organizada. Tema claro, Montserrat, Lucide. Azul como cor principal. Sem gradientes decorativos, vidro, excesso de sombra ou animação contínua. Estas regras não criam funcionalidade nem alteram permissões.

## Plataformas

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
| overlay | #111111 a 48% | Fundo de modal |

Semânticas (texto/ícone, fundo, borda): sucesso #166534/#F0FDF4/#15803D; aviso #92400E/#FFFBEB/#B45309; erro e destrutivo #B91C1C/#FEF2F2/#B91C1C; informação #1E40AF/#EFF6FF/#2563EB; neutro #475569/#F1F5F9/#64748B.

Regras: a paleta é a mesma para todos os perfis; perfil e estado sempre com texto, nunca só cor.

## Tipografia

Montserrat 400/500/600 (700 só em destaques pontuais). Sem texto abaixo de 14.

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
| Número em destaque | 32/40 | 600 |

Alinhar à esquerda; quantidades à direita em tabelas; permitir quebra em títulos longos; suportar texto ampliado.

## Espaçamento, grid e raios

Escala de 4 px: 4, 8, 12, 16, 24, 32, 40, 48, 64.

Rótulo-campo 8; campo-mensagem 8; grupo-grupo 24; ícone-texto do botão 8; botão-botão 12; cabeçalho-conteúdo 24; card-card 24; seção-seção 32.

| | Desktop | Tablet | Celular |
| --- | --- | --- | --- |
| Colunas | 12 | 8 | 4 |
| Gutter | 24 | 24 | 16 |
| Margem | 32 | 24 | 16 |
| Navegação lateral | 240 | 208 | menu em painel |
| Cabeçalho | 72 | 72 | 64 |

Conteúdo máximo 1440 no desktop. Formulário simples até 640; ocorrência até 800. Celular: uma coluna, tabelas viram cards.

Raios: campos, botões e menus 8; cards e imagens 12; modais 16; badges e avatares totalmente redondos. Bordas: cards 1 px border-subtle; campos 1 px border-control; foco 2 px brand-action; equipe fazendo 5S 2 px verde de sucesso (sem mudar o tamanho externo). Sombras: baixa 0 2 8 a 6%, média 0 4 16 a 10% (menus), alta 0 12 32 a 16% (modais).

## Componentes

- **Botão:** altura mínima 48, padding horizontal 20. Primário (#4747D4, texto branco), secundário (branco, texto e borda #000080), terciário (transparente, texto #4747D4), destrutivo (#B91C1C), desabilitado. Estados hover, pressionado, foco (anel 2 px), carregando ("Salvando...", largura fixa, sem toque repetido). "Cancelar" antes da ação principal; no celular pode empilhar.
- **Campo:** altura mínima 48, rótulo persistente acima, placeholder só como exemplo, "Opcional" nos opcionais, contador onde há limite, senha com mostrar/ocultar, erro após interação ou envio (texto + ícone abaixo do campo), somente leitura em surface-subtle.
- **Lista suspensa e seleção de representantes:** mesma altura/borda do campo; opções de 48; selecionada em brand-soft; menu máx. 320 com rolagem; estados carregando, vazio e erro. Múltipla seleção com chips removíveis e contador/limite.
- **Controle de quantidade:** [-] valor [+] com botões 48x48, valor 18/26 600, desabilita no limite sem usar vermelho. Material: máx. 999.
- **Card:** branco, raio 12, borda sutil, padding 24 (16 no celular), título 18/26.
- **Tabela (tablet/desktop):** cabeçalho surface-subtle, linhas de 64, ações à direita. No celular, cards.
- **Badge:** altura mínima 28, "Fazendo 5S" (sucesso, mais borda no card), "Não fazendo 5S" (neutro), "Status indisponível" (neutro), "Atualizando..." (spinner), "Sua equipe" separado do status. Nunca mostrar status desconhecido como "Não fazendo 5S"; manter o último confirmado durante a atualização.
- **Modal:** overlay, raio 16, padding 24, fechar 48x48, larguras 480 (confirmação), 640 (cadastro/detalhes), 800 (extenso). Não empilhar modais. No celular, formulários extensos ocupam a tela. Devolver o foco ao controle de origem.
- **Alertas:** bloco com fundo e borda semânticos, ícone 24, título 16/24 600, descrição 14/20, ação de recuperação. Toast de sucesso: 6 s, 400 máx., canto inferior direito (tablet/desktop) ou largura total (celular). Erros que exigem correção ficam visíveis no contexto. Resultado parcial usa aviso.
- **Navegação:** lateral (tablet/desktop) com itens de 48, ativo em brand-soft e texto brand-primary, conta e "Sair" no rodapé; menu em painel no celular. Mostrar só itens permitidos ao perfil.
- **Paginação:** abaixo da lista, alvos 48x48, página atual em brand-action; no celular, Anterior / página / Próxima.
- **Imagens:** material 4:3 em cards e miniatura 56x56 em tabelas, sem cortar; ocorrência com prévia até 240 de altura, nome e tamanho, ações Substituir/Remover, limite de 5 MB (limite da API) visível. Material não tem imagem na API: usar sempre o placeholder. Sem imagem: placeholder com ícone e texto.
- **Calendário de 5S:** a API só tem `schedule` em texto livre por equipe; exibir esse texto por equipe (sem inferir turnos, datas ou recorrência) em blocos brand-soft; no celular, lista. Formato final depende de decisão.
- **Representantes:** texto livre; sem chips nem contador.

## Ícones

Lucide (`lucide-react-native`), traço 2, 24 px (20 em badges/campos, 48 em estados vazios). Botão só com ícone tem nome acessível. Sem emoji como ícone. Mesmo ícone para a mesma função.

## Estados obrigatórios

- **Carregando:** skeleton com a estrutura do conteúdo (surface-subtle e border-subtle); spinner 20 em botões e 32 em blocos.
- **Vazio:** ícone 48, título 18/26, descrição 16/24, ação só para quem pode.
- **Erro de carregamento:** mensagem objetiva, "Tentar novamente", substitui só a região afetada.
- **Sessão expirada** e **acesso negado:** ver `workflows.md`. Acesso negado nunca aparece como falha de conexão.
- **Pull to refresh** em toda lista que vem da API.

## Autenticação

Fundo page, card branco até 440 com padding 32 (24 no celular), logotipo acima do título, botão principal em largura total. Área institucional lateral só no desktop se couber. Logotipo oficial quando disponível; senão "Five Sense" em Montserrat 600 (provisório).

## Movimento

Hover/foco 120 ms; menu 160; modal e troca de página 200. Sem molas nem animação decorativa. Respeitar redução de movimento.

## Acessibilidade

Contraste 4,5:1 (texto) e 3:1 (texto grande e controles); alvo mínimo 48x48; foco visível; erro com texto; rótulos persistentes; nada essencial só por hover; compreensível sem imagens. Cores devem ser conferidas no contexto real.

## Pendências de design

- Logotipo oficial e ícone do app (hoje são os do template Expo).
- Figma não lido pela IA: enviar exports/telas-chave se houver divergência com este documento.
