# Decision Log

Decisões duradouras e seus motivos. Estado: `Proposta`, `Aceita`, `Substituida`, `Rejeitada`. Entregas técnicas vão em `deployment-log.md`.

Template: `## 000X - Título` com Data, Estado, Contexto, Decisão, Consequências.

## 0001 - AGENTS.md e docs como fonte de verdade

- **Data:** 2026-10-09
- **Estado:** Aceita

### Contexto
Humanos e agentes de IA trabalham no projeto e precisam de contexto compartilhado.

### Decisão
`AGENTS.md` é o contrato; `docs/*` é a documentação canônica enxuta.

### Consequências
Docs precisam ser mantidos em cada entrega (ver `ai-workflow.md`).

## 0002 - Stack e plataformas

- **Data:** 2026-10-09
- **Estado:** Aceita (aprovação geral do humano em 2026-10-09)

### Contexto
Stack exigida: Expo, React Native, TypeScript, NativeWind. Plataformas: Android, iOS e desktop.

### Decisão
Desktop atendido por Expo web responsivo (react-native-web). NativeWind v5 (`5.0.0-rc.0` com `react-native-css 3.1.0-rc.0`, Tailwind 4), por ser a versão testada com Expo 57. Alternativa estável: NativeWind v4 (Tailwind 3).

### Consequências
v5 é release candidate (risco de mudanças). Versões exatas fixadas. Tema claro apenas; `app.json` deixa de travar retrato.

## 0003 - Dependências adicionais (propostas)

- **Data:** 2026-10-09
- **Estado:** Aceita (aprovação geral do humano em 2026-10-09; instalar com versões fixadas)

### Decisão proposta
- `lucide-react-native` + `react-native-svg` (ícones do design)
- `@expo-google-fonts/montserrat` + `expo-font` (fonte do design)
- `expo-secure-store` (token)
- `expo-image-picker` (câmera/galeria)
- `zod` (validação espelhando RN) e `@tanstack/react-query` (loading, refetch e pull to refresh)

### Consequências
Menos código próprio para cache/refetch e validação. Alternativa mais enxuta: hooks próprios e validação manual.

## 0004 - Tratamento de erro e listas

- **Data:** 2026-10-09
- **Estado:** Aceita (requisito do humano)

### Decisão
Toda chamada de API trata erro via `AppError` tipado; toda lista tem skeleton screen e pull to refresh.

### Consequências
Cliente de API único em `src/services/api`; componentes padrão de loading/vazio/erro.

## 0006 - Feature Driven Architecture

- **Data:** 2026-10-09
- **Estado:** Aceita (pedido do humano)

### Contexto
A arquitetura inicial (camadas globais `components/ui`, `lib`, `features`) tendia a concentrar componentes numa só pasta.

### Decisão
Adotar Feature Driven Architecture: cada feature contém screens, components (em subpastas por função), hooks, services, schemas, types, constants, utils e contexts. O que for usado por mais de uma feature sobe para a raiz de `src/`. Componentes globais e de feature são agrupados por função e divididos em partes menores.

### Consequências
Ao surgir um segundo uso, é preciso mover o arquivo para a raiz e ajustar imports. Features não se importam entre si. `src/lib` foi substituído por `src/services`, `src/utils` e `src/contexts`.

## 0005 - API sem token e sem autorização

- **Data:** 2026-10-09
- **Estado:** Proposta

### Contexto
A API v1 documentada tem rotas públicas e login que devolve dados do usuário, sem token. O humano afirmou que tokens expiram (inclusive para Visualizador), divergindo da documentação da API.

### Decisão
O app guarda os dados da sessão em armazenamento seguro, esconde ações por perfil e prevê 401/403 no cliente de API, sem depender deles ainda. Segurança real é responsabilidade da API.

### Consequências
Risco aceito e registrado em `security.md`. Recuperação/alteração de senha e identificação da "própria equipe" ficam bloqueadas até a API suportá-las.

## 0006 - Rastreabilidade entre Figma, briefing e contrato da API

- **Data:** 2026-10-09
- **Estado:** Aceita para a revisão documental solicitada pelo humano; escolhas visuais conflitantes continuam pendentes.

### Contexto
Fundamentos e Componentes puderam ser consultados diretamente. A base documental estava majoritariamente alinhada, mas apresentava medidas antigas, componentes sem referência e afirmação de Figma não lido. Há conflitos internos de acessibilidade e diferenças entre demonstrações do protótipo e a API.

### Decisão
Registrar em `design-guidelines.md` fonte, data, IDs, nomes de tokens e variantes, distinguindo propriedades confirmadas de orientações do briefing e complementos necessários. Corrigir diferenças visuais verificadas dentro do pedido atual. Preservar o contrato de dados, segurança e critérios existentes de toque/leitura enquanto as divergências específicas aguardam decisão; não interpretar protótipo como nova regra de negócio.

### Consequências
Button-SM e Badge 5S requerem resolução antes de implementação fiel; estados de calendário não viram enum da API; duração da sessão continua pendente. O limite do plano Figma impediu concluir a leitura detalhada de todos os componentes. Nenhum novo fluxo, dependência, arquitetura ou remoção de documento foi aprovado por esta revisão.

## 0007 - Alert: fidelidade total ao Figma (sem ícone nem ação)

- **Data:** 2026-10-09
- **Estado:** Aceita (decisão do humano: componente 100% fiel ao Figma)

### Contexto
O componente Alert do Figma (`33:2952`) distingue as variantes Error, Info, Success e Warning apenas pela cor do texto, sem ícone, borda ou ação. Numa primeira versão foram adicionados ícone semântico (padrão) e ação de recuperação opcional, visando a regra "estado nunca só por cor" (`coding-standards.md`). O humano pediu fidelidade total ao Figma, mantendo apenas a sombra (que consta no Figma).

### Decisão
Implementar o Alert exatamente como o Figma: superfície branca, sombra Elevation/Card, raio 8, padding 16, gap 8, título 16/24 600 e descrição 14/20 na cor de texto semântica. Sem ícone, sem borda e sem ação. Props: `variant`, `title`, `description`, `className`.

### Consequências
O estado passa a ser transmitido só pela cor do texto neste componente, divergindo da regra interna de acessibilidade; divergência aceita pelo humano em favor da fidelidade ao Figma e registrada em `design-guidelines.md`. Se um alerta precisar de ícone ou ação de recuperação (ex.: erro de carregamento), isso será tratado por outro componente de feedback (ex.: `ErrorState`) e não pelo `Alert`.

## 0008 - Cards de Equipe e Material: fidelidade total ao Figma

- **Data:** 2026-10-16
- **Estado:** Aceita (decisão do humano: cards 100% fiéis ao Figma)

### Contexto
O frame `Cards` (`361:106`) traz Equipe Card (`228:7974`), Detalhes da equipe (`208:6580`) e Material-Específico (`208:7927`). Em três pontos o Figma diverge do briefing/`design-guidelines.md`: a Badge 5S tem texto de 10 px (mínimo funcional 14) e usa "Sem fazer 5s" em vermelho (briefing: "Não fazendo 5S" neutro); o "11" do código usa preto puro (`#000`) em vez de `text-primary` (`#111`); os alvos de toque do "X" e do link têm 24 px de desenho.

### Decisão
Implementar como no Figma: badge 10/20 com "Fazendo 5S" (texto `brand-action`) e "Sem fazer 5s" (texto `error-text`), e `text-black` no número do código. Os alvos de toque de 48 px são garantidos com `hitSlop`, sem alterar o visual. Sombra dos pop-ups = Elevation/Modal (`0 12 32`, `#11111129`). Bordas que no Figma não entram no layout (badge, minicard de representante, indicador de estoque, divisor de "Dados principais") são overlays absolutos, como no `Input`.

### Consequências
Badge de 10 px e vermelho para "Sem fazer 5s" divergem das regras de acessibilidade e de semântica do briefing, aceitas pelo humano; pode exigir revisão se o design reconciliar. Preto puro no código é provável descuido do design (não há token): confirmar com o design. A Badge `TeamStatusBadge` nasceu local em `features/teams` (não existia em nenhuma branch); sobe para o global se outra feature a usar.

## 0010 - Login por username e confirmação provisória na mesma tela

- **Data:** 2026-10-16
- **Estado:** Aceita (respostas explícitas do humano)
- **Contexto:** o print de login contém e-mail, mas a documentação e o OpenAPI atuais recebem username/password; a tela principal ainda será enviada.
- **Decisão:** o humano confirmou que o protótipo está incorreto e o campo será Nome de usuário, sem validação de e-mail. Confirmar o acesso na mesma tela por enquanto. Usar o contrato atual sem buscar e-mail por endpoints de usuários; iniciar sessão somente de VIEWER, mantendo o escopo anterior. Sem novas dependências.
- **Sessão:** dados mínimos no SecureStore nativo e apenas em memória no web, sem senha/token e sem expiração inventada. Header X-User-Role pertence ao contrato didático atual, não substitui autenticação real. Não inventar backend/proxy para corrigir CORS.
- **Consequências:** layout e componentes seguem Figma, texto/validação do identificador seguem a correção humana. Web real depende da liberação de CORS no backend; sucesso real depende de conta VIEWER válida. Recuperação e telas após login aguardam novos prints.
## 0009 - Cliente do Visualizador e remoção da demonstração

- **Data:** 2026-10-16
- **Estado:** Aceita (pedido explícito do humano)
- **Contexto:** o catálogo geral foi usado para conferir os componentes; o humano pediu sua remoção, a retirada de código de Gestor/Admin e de Sidebar/NavItem e a ausência de feedback como "Estoque baixo" nos cards de material.
- **Decisão:** cliente exclusivo do Visualizador; remover os exemplos e esqueletos exclusivos de users/problems, Sidebar/NavItem e seus tokens exclusivos. Preservar MenuButton/AppMenu. MaterialItem não aceita mais `lowStock`; detalhes mantêm código, nome e quantidade sem aviso. Conservar correções funcionais dos componentes identificadas durante a demonstração.
- **Consequências:** cadastros/edições/exclusões de gestão e administração ficam fora do plano do cliente. Seleção de problema ao registrar ocorrência continua no escopo do Visualizador. Documentação do contrato externo da API e histórico de entregas permanecem como referência, sem implementar seus perfis/avisos excluídos. Esta decisão prevalece sobre os trechos anteriores conflitantes de plano, catálogo Figma e requisitos.

## 0011 - Formulário de ocorrência e conferência apenas no tablet

- **Data:** 2026-10-19
- **Estado:** Aceita para o incremento autorizado pelo humano na branch feature/occurence-creation-flow.
- **Contexto:** print/Figma96:2189 mostra problema, material, quantidade e imagem opcional. Humano dispensou testes de celular/desktop neste fluxo; referência tablet834x1194. API limita imagem a5MB, embora o print diga20MB; OpenAPI apresenta colisões nos nomes de schemas.
- **Decisão:** reutilizar componentes/tokens, contrato oficial legível e limite5MB. Progresso por três campos obrigatórios (confirmado no Figma132:6302). Upload antes do registro, usuário da sessão e headerVIEWER. Confirmar somente registro, pois a entrega de e-mail é best effort sem resultado na resposta. Mutações sem retry; resultado incerto exige conferência e liberação explícita antes de reenviar. Sem dependência nova, proxy, tela de gestão ou ocorrência real de teste.
- **Integração:** Home existente passa a /home para resolver colisão preexistente de rotas; login abre Home, grupo protegido, logout real e401 com aviso. Isto substitui a confirmação provisória da decisão0010, viabilizando o fluxo autorizado. Nenhum redesenho da Home. Props opcionais nos componentes existentes preservam defaults.
- **Consequências:** aceite visual deste incremento somente no tablet. CORS e conta real pendentes no backend; câmera física não conferida. Ausência de idempotência e endpoint de limpeza de upload limita a garantia contra duplicidade e arquivos órfãos. Fases gerais permanecem abertas para próximos prints e validação externa.
## 0012 - Várias fotos e20MB no total; integração aguardando backend (restrição provisória substituída pela 0013)

- **Data:** 2026-10-19
- **Estado:** Aceita (pedido e duas respostas explícitas do humano).
- **Decisão:** o cliente permite várias fotos JPG/PNG, com20MB na SOMA dos anexos; substitui a limitação anterior de uma foto/5MB das decisões/documentos prévios para o cliente. Galeria múltipla, adição sucessiva, prévias e remoção individual, sem dependência nova ou quantidade máxima inventada. Lote inválido mantém coleção anterior; conferir apenas tablet.
- **Contrato externo:** humano confirmou que backend ainda terá de implementar múltiplas fotos e não consegue agora. Não inventar campo plural, truncar a coleção ou criar várias ocorrências. Até receber contrato, bloquear envio com mais de uma foto ANTES dos uploads/POSTs e preservar dados. Manter zero/uma foto pelo imageId existente; API pode recusar tamanho acima do limite antigo e o app trata413.
- **Consequências:** cliente de seleção pronto; integração múltipla permanece pendente e não é anunciada como concluída. Backend precisa definir vínculos, uploads, limites compatíveis com20MB totais e falhas parciais antes do próximo incremento. Esta decisão prevalece sobre trechos anteriores conflitantes de regra de anexos do cliente; não modifica automaticamente o servidor.
## 0013 - Integração múltipla pelo contrato publicado (substituída pela 0014)

- **Data:** 2026-10-19
- **Estado:** Aceita por solicitação humana de integrar a API atualizada; substitui o bloqueio provisório da decisão 0012.
- **Fonte:** documentação oficial /docs/index.html e /v3/api-docs reconferidas por GET. Multipart images repetido, resposta imageIds e criação com imageIds, até 5 fotos/5 MB cada.
- **Decisão:** um upload do lote, validação de todos os UUIDs únicos e da quantidade, depois uma ocorrência com a lista completa. Sem fotos: sem upload/lista. Preservar 20 MB agregados definidos pelo humano; impor também quantidade/tamanho da API para evitar recusa previsível. Falha parcial preserva fotos e impede registro; nenhum truncamento, singular legado, ocorrência por foto ou conversão base64. Sem nova dependência.
- **Consequências:** + desabilitado em 5, remoção libera vaga; textos indicam os três limites. API usa arquivos temporários consumidos pelo e-mail: em nova tentativa, reenviar arquivos mantidos em vez de reutilizar IDs. Tratamento de resultado incerto, timeout e ausência de retry permanecem; sem garantia de unicidade ou entrega de e-mail. Contrato público confirmado, POSTs verificados localmente; conta real/CORS/câmera física continuam fora da validação deste incremento.

## 0014 - Uma requisição de ocorrência com dados e imagens

- **Data:** 2026-10-20
- **Estado:** Aceita. Humano aprovou a correção após diagnóstico do404/400.
- **Fonte:** documentação oficial e OpenAPI atuais: remoção de /occurrences/images e imageId/imageIds; POST /occurrences aceita JSON/base64 ou multipart com campos e imagens. CreateForm confirma os quatro campos obrigatórios; CreateRequest ainda colide com outro controller.
- **Decisão:** usar um único multipart com os quatro campos obrigatórios e images repetido, inclusive sem fotos (só campos). Sem conversão/base64/dependência. Remover serviço/schema/tipo de erro e fase do upload separado; manter limites5fotos/5MB/20MB, JPG/PNG, cliente compartilhado e sessão VIEWER.
- **Consequências:** o servidor registra e dispara e-mail após commit em thread separada;201 não confirma entrega. Não há IDs intermediários para reaproveitar. Rede/timeout/5xx na chamada única sempre conservam tratamento de resultado incerto, dados e liberação explícita antes de nova tentativa, sem retry. Timeout preservado. Contrato confirmado por GET; POSTs de teste somente locais, sem e-mails ou registros reais.

## 0015 - Restaurar requestJson e erros por status/códigos

- **Data:** 2026-10-21
- **Estado:** Aceita por solicitação humana de reparar cliente/services e AppError.
- **Contexto:** merge8690255 adotou client/AppError da integração de equipes (a400277), apagando requestJson/formData/signal/void/fields/cancelled ainda usados por outras features. Não houve migração equivalente dos consumidores.
- **Decisão:** um transporte requestJson com todas as capacidades usadas; apiRequest mantido só como wrapper compatível. Todos os services usam requestJson. Preservar EXPO_PUBLIC_API_URL obrigatório e timeout60s, agora até leitura do corpo. Status numérico gera mensagem/kind de AppError; códigos locais tipados centralizam mensagens específicas sem texto livre ou HTTP inventado. Fields seguros/cancelamento restaurados,413 validation. Auth sem header; protegidos VIEWER explícito. Sem dependência/retry/log de conteúdo bruto.
- **Consequências:** elimina imports quebrados e chamadas incompatíveis de AppError sem retirar feedback de fotos/câmera/storage. Testes transitórios externos aprovados e lint sem erros. Tipos de rotas regenerados pelo Expo; typecheck global ainda encontra incompatibilidade preexistente de props AppHeader/AppLayout fora do reparo. Contratos de negócio e interface preservados; sem POST real ou garantia de execução em dispositivo.
