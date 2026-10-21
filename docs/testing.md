# Testing

## Estratégia

Projeto enxuto: os checks obrigatórios são estáticos e manuais. Testes automatizados só entram se o humano pedir (decisão pendente, ver `decision-log.md`).

## Comandos oficiais

```bash
npx expo lint
npx tsc --noEmit
npx expo-doctor   # após mudar dependências ou app.json
```

## Verificação manual por entrega

Para cada tela entregue, conferir (simulador, dispositivo ou web):

- Caminho feliz do fluxo em `workflows.md`.
- Loading (skeleton), vazio, erro de rede com "Tentar novamente" e pull to refresh nas listas.
- Erro de validação da API junto ao campo; 401 leva ao login com aviso; 403 mostra acesso negado.
- Ações visíveis apenas para o perfil correto.
- Celular (390x844) e tablet/desktop em paisagem; teclado virtual sem cobrir campos.
- Foco visível, alvos de 48 px, estado por texto além de cor.

Sem API disponível, registrar que o fluxo foi verificado com dados simulados e qual risco isso deixa.

## Conferência do design

Para entregas visuais, usar os links/IDs e distinguir valores confirmados de complementos em `design-guidelines.md`:

- Conferir tokens semânticos, estilos de texto, raios, bordas e sombras contra o componente de referência; registrar desvios com motivo.
- Exercitar variantes existentes e estados necessários ainda sem variante no Figma: foco, loading, disabled, erro, vazio e falta de permissão. Variant2/Variant3 exigem mapeamento confirmado.
- Conferir largura fluida, texto ampliado, rótulos longos, altura de alertas/cards e slots com/sem ícone; dimensões de amostra não são limites fixos.
- Button-SM: medir alvo real de pelo menos 48x48 sem sobreposição. Badge 5S: verificar resolução da divergência de texto 10 px e semântica antes de afirmar fidelidade/aprovação.
- Footer 12/15 é exceção institucional não interativa; não generalizar esse tamanho a campos, ações ou status.
- Não aprovar sessão, recuperação ou calendário por demonstração do protótipo: respeitar bloqueios da API.

Para revisões exclusivamente documentais, conferir links locais, rastreabilidade, consistência entre docs e diff. Registrar os checks de código exigidos pelo contrato e qualquer impossibilidade de executá-los; leitura do Figma não equivale a teste da interface implementada.

## Definition of Done

- Comportamento implementado conforme critérios da issue.
- Lint e typecheck sem erros.
- Verificação manual acima feita, ou limitação registrada em `deployment-log.md`.
- Docs ajustados quando contrato ou fluxo mudou.

## Login por nome de usuário - 2026-10-16

- Abrir a raiz com `npx expo start --web --port 8085` (http://localhost:8085). URL da API vem de EXPO_PUBLIC_API_URL; fallback é o host público indicado pelo humano. Nenhuma rota de demonstração adicionada.
- Conferir obrigatórios vazios/com só um campo vazio; username comum sem formato de e-mail; Enter no usuário foca senha; Enter na senha envia; olho mostra/oculta preservando o valor; loading desabilita reenvio e campos ficam somente leitura.
- API: POST /api/v1/auth/login envia username/password, preservando espaços da senha; dados inválidos/inativo (400) e authenticated:false destacam ambos os campos; perfil incompatível, rede, timeout, JSON inesperado e falhas de armazenamento têm feedback. Alterar dados permite corrigir/tentar novamente.
- Sucesso: Alert de confirmação, senha limpa, botão Conectado desabilitado. Web usa memória: reload volta ao formulário. Nativo usa SecureStore; não existe JWT/expiração inventada.
- Executados tipos/lint/diff/export e conferência no navegador em 1280x720, 834x1194, 390x844 e 320x640. Assets 84x110 + 246x30 conferidos no slot 246x149; card 440, corpo 376, campos 48 e fonte Montserrat. Ajuste do humano para Nome de usuário aplicado; nenhuma validação de e-mail no login.
- Verificações transitórias fora do repo: schemas, payload, resposta/sessão sem senha/token, perfil, HTTP 400/401/403/404/409/422/503, JSON inválido, cancelamento e timeout. Navegador com API local de fixtures confirmou 400, loading bloqueado, sucesso, senha limpa e reset da sessão no reload. API e servidor de fixtures retirados após conferência; não fazem parte do app.
- Limites: API real retornou 400 para credenciais fictícias, mas web real é bloqueada por CORS (preflight sem Access-Control-Allow-Origin). Liberação depende do backend. Sem conta VIEWER real e sem execução Android/iOS; exportação ainda informa favicon configurado ausente, preexistente.
## Após a retirada do catálogo - 2026-10-16

A rota /components e seus exemplos foram removidos por pedido do humano (decisão 0009). Conferências anteriores ficam no deployment-log; não há página permanente de demonstração. Para esta remoção: tipos, lint, diff, busca por referências órfãs e exportação web sem /components; materiais sem aviso de estoque baixo e MenuButton/AppMenu preservados.

## Ocorrência - 2026-10-19

Escopo de aceite atualizado pelo humano: somente tablet, referência 834x1194. As exigências gerais de celular/desktop acima não se aplicam a este incremento. Conferência final no navegador com API temporária local, fora do produto: login -> Home -> Ocorrências; marca 199x26, título 28/36, preview limitado ao campo303, sem overflow horizontal, navegação ativa e controles acessíveis. Typecheck/lint/diff/export web aprovados.

Estados exercitados: seletores loading/falha/retry e preenchimento, quantidade zero/positiva, progresso0..3 e botão habilitado; imagem acima de5MB recusada, seleção/prévia/substituição/remoção; upload multipart antes do registro com imageId; 201 vazio confirmado e formulário limpo; loading bloqueia campos/menu/saída e reenvio; upload503 não chama criação; validação400 preserva campos, 403 mostra recusa, 401 encerra sessão com aviso; desconexão após POST apresenta resultado incerto, com reenvio bloqueado até confirmação explícita.

Verificação transitória de schemas e serviços fora do app: UUID/quantidade/tamanho/tipo, cancelamento e permissão de câmera simulados, header VIEWER, FormData sem Content-Type manual, payload com usuário da sessão, upload inválido e HTTP400/401/403/413/422/503, rede e 201 sem corpo. Sem suíte permanente ou dependência nova. Desconexão forçada evidenciou repetição pelo transporte do navegador; o app não aplica retry de POST e não promete garantia de unicidade sem idempotência no backend.

GETs na API pública retornaram200; web com API real segue bloqueado por CORS. Sem criar registros reais ou disparar e-mails. Conta real/câmera em dispositivo físico não verificadas. Conferências anteriores de outros tamanhos não ampliam o aceite solicitado; nenhuma nova rodada de celular/desktop após essa instrução. Para abrir: npx expo start --web; usar somente tablet neste fluxo. O cliente usa a URL real por padrão; fixtures e exportações temporárias ficam fora do repositório.
## Correção da origem da imagem - 2026-10-19

Somente tablet834x1194, com API temporária local externa ao produto. Confirmados painel754x368 em40/786, cards341x166, ícones28 brancos, sombra/superfície/backdrop, textos e ausência de overflow. Fechar pelo fundo/Escape preserva problema/material/quantidade e restaura foco; Galeria e Câmera web abriram o seletor de arquivo e retornaram PNG local para a prévia. Câmera física não acionada. Verificação transitória de serviços confirma JPG/PNG aceitos e GIF/WebP/HEIC recusados antes de qualquer requisição, tamanho5MB e cancelamento preservados. Tipos/lint/diff aprovados, navegador sem avisos/erros. API pública não acessada por indisponibilidade informada pelo humano; nenhum envio real. Nenhuma fixture ou demonstração no app.

## Múltiplas fotos - 2026-10-19

Alvo somente tablet834x1194. API local temporária fora do produto: galeria com multiple=true selecionou2 fotos juntas, nova seleção acrescentou3ª, remoção individual da2ª manteve1ª/3ª e atualizou contador; lote com2 arquivos de11MB foi recusado e manteve os anexos anteriores. Prévia contida, nomes/tamanhos, contador/20MB e navegação sem overflow horizontal. Envio com campos válidos e2 fotos mostrou pendência do backend; API local confirmou uploadAttempts=0/createAttempts=0, preservando seleção. Zero/uma foto mantém integração já existente.

Verificação transitória externa: coleção vazia, soma exata20MB permitida,20MB+1 recusada, tamanhos0/negativo/NaN/Infinity/desconhecido recusados, tamanho real do File prevalece sobre metadados; JPG/PNG aceitos e outros formatos recusados; galeria devolve todos os assets com allowsMultipleSelection, lote22MB falha, cancelamento retorna vazio, câmera captura única e permissão simuladas. Types/lint/diff aprovados. Testes/fixtures externos ao repo, sem novas dependências. Backend confirmou-se ainda sem suporte múltiplo pelo humano; sem POST real e sem câmera física. Integração plural NÃO verificada nem presumida.
Conferência complementar deste incremento: envio com uma foto na API local retornou201, enviou o imageId pelo contrato anterior e limpou campos/coleção no sucesso. Prévia no tablet medida em160 de altura por304,5 de largura, sem overflow; navegador sem avisos/erros. Nenhuma ocorrência real criada.

## Miniaturas e feedback final - 2026-10-19

Somente tablet834x1194, API local de fixtures fora do repo. Conferidos estados0/1/4/9 anexos, montagem200x200, células cover, +5 para9 fotos, + abre origem, miniaturas/+N abrem galeria com todas as9. Popup com rolagem e9 previews, contador/tamanho, remoção individual até4/1, X/Escape e toque fora fecham e preservam os anexos. Nenhum overflow horizontal. Limite20MB e bloqueio múltiplo permanecem, sem modificar o contrato.

POST local201 com foto abriu confirmação com card754x236, título28/36 e Check36; Criar outra ocorrência retornou a campos vazios/quantidade0/sem fotos. POST400 manteve formulário e dados sem confirmação; novo POST201 sem foto abriu sucesso, Voltar ao menu principal navegou a /home. Dimensões/cores/ações conferidas contra prints e contexto Figma97:7533; logo local e ícones existentes reutilizados. Types/lint sem cache/diff aprovados; navegador sem avisos/erros. Sem POST real, câmera física, fixture/rota de teste no produto ou nova dependência.
## Integração múltipla da API - 2026-10-19

Contrato público reconferido por GET (docs e OpenAPI); POSTs somente na API local de fixtures. TypeScript, expo lint --no-cache e git diff --check aprovados. Script transitório externo conferiu 0/1/3/5 fotos, uma chamada multipart images repetido sem Content-Type manual, VIEWER, lista imageIds completa/única e nenhuma propriedade singular; sem fotos não há upload/lista. 4x5 MB e 5x4 MB aceitos; 5 MB+1 por arquivo, 6 fotos e total20 MB+1 recusados antes da API. Respostas vazias, parciais, extras, duplicadas, não UUID e HTTP400/401/403/413/422/503/rede tratadas; sem retry. Descritores FormData nativos e campos imageIds[1]/images.0 simulados.

Somente tablet834x1194: 3 fotos enviadas em lote, um registro com 3 IDs e confirmação; retorno parcial para 2 fotos impediu criação e manteve formulário/anexos; nova tentativa completa fez novo upload e registrou os 2 IDs. Logs locais: upload:3/create/upload:2/upload:2/create. Com 5 fotos, + desabilitado, +1 abre todas, remover libera nova adição. Sem overflow horizontal e sem avisos/erros do navegador. Evidências e fixtures fora do repo. Sem suíte permanente, nova dependência, POST real/e-mail real, execução em celular/desktop ou câmera física. Pendências externas anteriores não foram consideradas resolvidas por testes locais.

## Envio direto de ocorrência com fotos - 2026-10-20

TypeScript aprovado. Expo lint --no-cache:0 erros,1 aviso preexistente unicode-bom em auth/screens/home-screen.tsx; arquivo fora do escopo preservado. Diff aprovado. Verificação transitória externa confirma uma chamada /occurrences com quatro campos e0/1/3/5 fotos no mesmo FormData, sem rota antiga/IDs e sem Content-Type manual; limites5/5MB/20MB, campos inválidos antes da chamada, descritores FormData nativos simulados e HTTP400/401/403/413/422/500/503/rede/cancelamento sem retry. A ordem dos quatro campos não é requisito do contrato; fotos preservam ordem/nomes.

Somente tablet834x1194 com API local: campos+3 fotos geram um POST e sucesso;400 com erro images[1] mantém campos/mostra erro no anexo;503 mostra aviso de resultado incerto e botão enviar desabilitado; conferir/liberar explicitamente permite nova tentativa sem fotos e sucesso. Estado local4 tentativas/2 criações/0 chamadas a /occurrences/images. Loading bloqueia campos/menu/saída; sem overflow horizontal ou logs de aviso/erro do navegador. Nenhuma ocorrência/e-mail real, teste em celular/desktop ou câmera física. Fixtures/scripts/evidência fora do produto, sem nova dependência ou suíte permanente.

## Reparo requestJson/AppError - 2026-10-21

Verificação transitória externa ao app, sem rede: JSON/multipart/query, role explícito e compatibilidade apiRequest,201 void/204, erro HTTP convertido por status e nomes de fields seguros, respostas não JSON, catálogo de códigos locais,413, cancelamento prévio/durante fetch/durante corpo, timeout simulado60s nos dois estágios, limpeza de listeners/timer e ausência de retry. Services reais de login, materiais, equipes e ocorrências carregados com fixtures; ocorrência0/1/3/5 fotos em um POST; câmera/permissão simuladas e mensagens de anexos preservadas. Nenhuma suíte permanente ou dependência adicionada.

expo lint --no-cache e git diff --check aprovados. tsc --noEmit inicialmente apontou3 erros fora do reparo; regeneração oficial dos tipos ignorados de rotas via Expo resolveu2. Resta1 erro preexistente em app-layout.tsx:36: AppHeaderProps não aceita logoutDisabled/referenceSize já passados pelo AppLayout. Comparação comHEAD confirma incompatibilidade anterior; código de interface preservado. Typecheck global não passou, embora não existam erros do cliente/services/AppError. Sem conferência visual, execução física, API de negócio real ou e-mail de teste. Servidor Expo usado só para gerar tipos locais e encerrado.
