# Plano de testes do front-end — Five Sense

Data do planejamento: 2026-10-27. Branch: feature/tests-plan.

## Objetivo e escopo

Planejar, executar e registrar funcionalidades, fluxos e falhas do cliente Visualizador. Cobrir login/sessão, Home/menu/logo/logout/guards, materiais/busca/detalhes, equipes/status/calendário, ocorrências/fotos/feedback e cliente HTTP. RF001/RF002, RF014–RF016, RF023–RF026 e RF032/RF033; requisitos não implementados de recuperação/conta/gestão ficam fora desta rodada. Não há backend neste repo.

## Estratégia, ambiente e dados

- Automação lógica/contrato com node:test, TypeScript e dependências já instaladas, sem novas bibliotecas. 143 casos automatizados e 15 casos manuais/integrados planejados.
- Módulos reais são carregados; transporte, SecureStore, picker e hooks de plataforma são substituídos explicitamente. O harness de hooks não reproduz DOM, concorrência completa do React, renderização, teclado ou histórico real. Aprovação lógica não aprova E2E ou fidelidade visual.
- Fixtures fictícias com UUIDs, usuário fixture, e-mail example.invalid e arquivos em memória. Bloquear rede por padrão; POSTs/PATCHs não atingem API real. Datas de calendário fixas; timeouts60s acionados por relógio simulado.
- Pré-condições automatizadas: Node24, npm install já concluído, repositório local; nenhuma senha/API online necessária. Testes HTTP definem host fixture.invalid no processo e restauram o ambiente. Não alterar.env.local do usuário.
- Pré-condições manuais: app/fixture local, navegador em tablet834x1194, sessão fixture; evitar mutações em produção. Não incluir celular/desktop nesta rodada, mantendo o aceite de tablet. Dispositivo físico e conta de homologação são pré-condições adicionais identificadas por caso.
- Critério de entrada: ler docs e código atual, registrar branch/commit, confirmar dados fictícios e registrar plano antes da execução. Critério de saída automatizada: todos os casos executados com resultado individual e checks estáticos/build registrados. Homologação integral exige casos manuais críticos e integração real aprovados; pendência não vira aprovação.
- Prioridade Alta: autenticação, perda/duplicação de dados, sessão, limites e navegação central; falhas registradas com ID, esperado/obtido, evidência, reprodução e severidade. Defeito crítico/alto aberto impede homologação integral. Não corrigir produto silenciosamente para fazer teste passar.

## Rastreabilidade de funcionalidades e fluxos

| Área/requisito | Casos lógicos | Complemento manual |
| --- | --- | --- |
| Configuração/HTTP/erros | CFG-*,API-*,HTTP-* | LIVE-01 |
| Login/sessãoRF001/RF002 | AUTH-*,SESSION-* | UI-01/02/04,DEVICE-02,LIVE-01 |
| Home/menu/logo/logout/guards | NAV-* | UI-03/04/10/11 |
| MateriaisRF032/RF033 | MAT-* | UI-05,LIVE-01 |
| Equipes/statusRF023–RF025 | TEAM-* | UI-06,LIVE-01 |
| CalendárioRF026 | CAL-* | UI-07 |
| OcorrênciasRF014–RF016/RN013 | OCC-*,IMG-*,FLOW-* | UI-08/09/10,DEVICE-01,LIVE-02 |

Fluxos ponta a ponta planejados: login→Home→materiais→detalhe→voltar; login→equipes→calendário→outros módulos; login→ocorrência→fotos→envio→sucesso→nova ocorrência/Home; erro→correção/retry; expiração/logout→login→tentativa de acessar rota privada. Os testes lógicos exercitam partes e callbacks desses fluxos; o roteiro UI cobre o fluxo completo no navegador.

## Casos automatizados — pré-condições comuns acima

| ID | Cenário | Prioridade | Ação/dados | Resultado esperado |
| --- | --- | --- | --- | --- |
| CFG-01 | Configuração ausente bloqueia a rede | Alta | Remover EXPO_PUBLIC_API_URL e solicitar login. | AppError config; zero chamadas de rede. |
| CFG-02 | Host e prefixo não duplicam barras | Alta | Definir host fixture com barras finais e consultar /materials. | URL contém exatamente /api/v1/materials. |
| API-01 | JSON do login preserva senha e não envia perfil | Alta | Enviar username e senha com espaços via POST. | Content-Type JSON, senha intacta, sem X-User-Role. |
| API-02 | Query escapada e perfil nas rotas protegidas | Alta | Consultar teams com query existente, espaço, acento e valor undefined. | Usa &, encodeURIComponent e VIEWER; omite undefined. |
| API-03 | Compatibilidade apiRequest e resposta 204 | Alta | Executar DELETE pelo wrapper legado e devolver204. | Delegação única com VIEWER; retorno undefined. |
| HTTP-400 | HTTP400 vira erro seguro validation | Alta | Responder HTTP400 com detalhe bruto e solicitar endpoint. | Preserva status/kind; não exibe detalhe bruto; apenas uma tentativa. |
| HTTP-401 | HTTP401 vira erro seguro unauthorized | Alta | Responder HTTP401 com detalhe bruto e solicitar endpoint. | Preserva status/kind; não exibe detalhe bruto; apenas uma tentativa. |
| HTTP-403 | HTTP403 vira erro seguro forbidden | Alta | Responder HTTP403 com detalhe bruto e solicitar endpoint. | Preserva status/kind; não exibe detalhe bruto; apenas uma tentativa. |
| HTTP-404 | HTTP404 vira erro seguro notFound | Alta | Responder HTTP404 com detalhe bruto e solicitar endpoint. | Preserva status/kind; não exibe detalhe bruto; apenas uma tentativa. |
| HTTP-409 | HTTP409 vira erro seguro conflict | Alta | Responder HTTP409 com detalhe bruto e solicitar endpoint. | Preserva status/kind; não exibe detalhe bruto; apenas uma tentativa. |
| HTTP-413 | HTTP413 vira erro seguro validation | Alta | Responder HTTP413 com detalhe bruto e solicitar endpoint. | Preserva status/kind; não exibe detalhe bruto; apenas uma tentativa. |
| HTTP-422 | HTTP422 vira erro seguro validation | Alta | Responder HTTP422 com detalhe bruto e solicitar endpoint. | Preserva status/kind; não exibe detalhe bruto; apenas uma tentativa. |
| HTTP-429 | HTTP429 vira erro seguro unknown | Alta | Responder HTTP429 com detalhe bruto e solicitar endpoint. | Preserva status/kind; não exibe detalhe bruto; apenas uma tentativa. |
| HTTP-500 | HTTP500 vira erro seguro server | Alta | Responder HTTP500 com detalhe bruto e solicitar endpoint. | Preserva status/kind; não exibe detalhe bruto; apenas uma tentativa. |
| HTTP-503 | HTTP503 vira erro seguro server | Alta | Responder HTTP503 com detalhe bruto e solicitar endpoint. | Preserva status/kind; não exibe detalhe bruto; apenas uma tentativa. |
| API-04 | Campos de validação em array | Alta | Responder422 com errors:[{field:username},null,{message:...}]. | fields contém apenas username. |
| API-05 | Campos de validação em objeto | Alta | Responder400 com errors objeto images[1]. | Nome de campo mantido; texto bruto não exibido. |
| API-06 | JSON inválido em resposta de sucesso | Alta | Responder200 com HTML. | invalidResponse, sem classificar como falha de rede. |
| API-07 | Erro HTTP com corpo não JSON | Alta | Responder503 com HTML. | Preserva503/server; não exibe HTML. |
| API-08 | Rede indisponível não repete POST | Alta | fetch rejeita com TypeError. | network, uma chamada, sem detalhe bruto. |
| API-09 | Cancelamento anterior não chama fetch | Alta | Abortar signal antes da requisição. | cancelled e zero chamadas. |
| API-F-ABORT | Cancelamento durante fetch | Alta | Suspender fetch; acionar signal externo. | cancelled; timer/listener removidos. |
| API-F-TIME | Timeout durante fetch | Alta | Suspender fetch; acionar timer60s simulado. | timeout; timer/listener removidos. |
| API-B-ABORT | Cancelamento durante body | Alta | Suspender body; acionar signal externo. | cancelled; timer/listener removidos. |
| API-B-TIME | Timeout durante body | Alta | Suspender body; acionar timer60s simulado. | timeout; timer/listener removidos. |
| API-10 | Erros desconhecidos não vazam texto | Alta | Converter Error com conteúdo arbitrário. | Mensagem do catálogo unknown, sem dados brutos. |
| AUTH-01 | Validação local do login 01 | Alta | Informar campos vazios/espaços e validar formulário. | Rejeitar e destacar identifier, password. |
| AUTH-02 | Validação local do login 02 | Alta | Informar campos vazios/espaços e validar formulário. | Rejeitar e destacar identifier. |
| AUTH-03 | Validação local do login 03 | Alta | Informar campos vazios/espaços e validar formulário. | Rejeitar e destacar password. |
| AUTH-04 | Validação local do login 04 | Alta | Informar 256 caracteres e validar formulário. | Rejeitar e destacar identifier. |
| AUTH-05 | Validação local do login 05 | Alta | Informar 256 caracteres e validar formulário. | Rejeitar e destacar password. |
| AUTH-06 | Username não exige e-mail; senha não é alterada | Alta | Validar username com espaços laterais e senha com espaços. | Trim somente username; senha intacta; aceita255 caracteres. |
| AUTH-07 | Login válido retorna somente sessão VIEWER | Alta | Responder authenticated:true com sessão e dados extras sensíveis fictícios. | Retorna dados mínimos; remove password/token extras. |
| AUTH-08 | Recusar resposta de login invalidCredentials | Alta | API simulada retorna invalidCredentials. | Não iniciar sessão; erro seguro correspondente. |
| AUTH-09 | Recusar resposta de login viewerOnly | Alta | API simulada retorna viewerOnly. | Não iniciar sessão; erro seguro correspondente. |
| AUTH-10 | Recusar resposta de login invalidResponse | Alta | API simulada retorna invalidResponse. | Não iniciar sessão; erro seguro correspondente. |
| AUTH-11 | Recusar resposta de login invalidResponse | Alta | API simulada retorna invalidResponse. | Não iniciar sessão; erro seguro correspondente. |
| AUTH-12 | Credenciais incorretas destacam os dois campos | Alta | Converter HTTP400 sem fields para feedback. | Alerta de credenciais; identifier/password destacados. |
| AUTH-13 | Validação da API destaca campo correspondente | Alta | Converter422 com username e campo desconhecido. | Destaca somente identifier; cancelamento não cria alerta. |
| AUTH-14 | Formulário inválido não chama serviço | Alta | Enviar hook com campos vazios. | Feedback obrigatório; zero chamadas. |
| AUTH-15 | Login bloqueia duplicação e limpa senha | Alta | Enviar duas vezes enquanto serviço está pendente; confirmar sucesso. | Uma chamada; campos bloqueados; sessão iniciada e senha limpa. |
| AUTH-16 | Falha ao guardar sessão impede conexão | Alta | Serviço autentica, armazenamento recusa gravação. | Sem conexão; mensagem segura e dados recuperáveis. |
| AUTH-17 | Desmontagem cancela login pendente | Alta | Iniciar login, desmontar hook e resolver depois. | Signal abortado; não inicia sessão após desmontar. |
| SESSION-01 | Sessão web permanece apenas em memória | Alta | Salvar/ler/limpar no adaptador web; carregar nova instância do módulo. | Sessão disponível na visita; limpa no logout e não persiste em nova instância. |
| SESSION-02 | Sessão nativa válida usa SecureStore | Alta | Salvar com adaptador nativo simulado e reler. | Chave correta e WHEN_UNLOCKED_THIS_DEVICE_ONLY; sessão válida. |
| SESSION-03 | Sessão nativa corrompida é descartada | Alta | Ler registro inválido no armazenamento simulado. | Retorna null e remove registro; não restaura acesso. |
| SESSION-04 | Sessão nativa corrompida é descartada | Alta | Ler registro inválido no armazenamento simulado. | Retorna null e remove registro; não restaura acesso. |
| MAT-01 | Busca de material ignora acentos e caixa | Alta | Buscar ALCOOL com espaços. | Encontra Álcool; termo inexistente retorna vazio. |
| MAT-02 | Busca vazia e contagem singular/plural | Alta | Buscar espaços e montar contador1/2. | Retorna catálogo sem alterar coleção; rótulos corretos. |
| MAT-03 | Catálogo percorre páginas e omite inativos | Alta | Responder duas páginas com um ativo e um inativo. | Duas chamadas com VIEWER; somente material ativo no resultado. |
| MAT-04 | Catálogo vazio é válido | Alta | Responder content:[] e totalPages:0. | Resultado vazio, sem erro de contrato. |
| MAT-05 | Resposta de material inválida é recusada | Alta | Responder estoque negativo ou estrutura inesperada. | invalidResponse, sem renderizar dados inválidos. |
| MAT-06 | Catálogo maior que dez páginas é consultado integralmente | Média | Responder11 páginas válidas de100 materiais ativos e buscar Material1100. | Retorna1100 materiais em11 chamadas; busca encontra o último item; erro não conta como aprovação. |
| MAT-07 | Catálogo com exatamente dez páginas continua completo | Média | Responder10 páginas de100 materiais. | Retorna1000 em10 chamadas, sem chamada extra. |
| MAT-08 | Página repetida mesmo sem índice | Média | Responder primeira página válida e depois metadados/IDs inconsistentes. | Falha explícita invalidResponse na segunda chamada; não retorna catálogo parcial nem consulta indefinidamente. |
| MAT-09 | Índice retornado não acompanha página solicitada | Média | Responder primeira página válida e depois metadados/IDs inconsistentes. | Falha explícita invalidResponse na segunda chamada; não retorna catálogo parcial nem consulta indefinidamente. |
| MAT-10 | Total de páginas muda durante consulta | Média | Responder primeira página válida e depois metadados/IDs inconsistentes. | Falha explícita invalidResponse na segunda chamada; não retorna catálogo parcial nem consulta indefinidamente. |
| MAT-11 | Página vazia antes do fim | Média | Responder paginação inconsistente no primeiro resultado. | invalidResponse, uma chamada e nenhum sucesso parcial. |
| MAT-12 | Conteúdo presente em catálogo de zero páginas | Média | Responder paginação inconsistente no primeiro resultado. | invalidResponse, uma chamada e nenhum sucesso parcial. |
| MAT-13 | Total de páginas fracionário | Média | Responder paginação inconsistente no primeiro resultado. | invalidResponse, uma chamada e nenhum sucesso parcial. |
| MAT-14 | Material duplicado dentro da mesma página | Média | Responder paginação inconsistente no primeiro resultado. | invalidResponse, uma chamada e nenhum sucesso parcial. |
| MAT-15 | Cancelamento durante segunda página interrompe catálogo | Alta | Abortar signal ao iniciar a segunda resposta de três páginas. | Rejeita cancelled; não devolve página1 como sucesso nem solicita página3. |
| MAT-401 | Materiais trata HTTP401 | Alta | Injetar erro401 no resultado do useQuery. | Encerra sessão uma vez com aviso. |
| MAT-403 | Materiais trata HTTP403 | Alta | Injetar erro403 no resultado do useQuery. | Mantém sessão; acesso negado com texto. |
| TEAM-01 | Busca de equipe por nome e código | Alta | Buscar producao e pr-01. | Encontra equipe sem exigir acento/caixa; ausente retorna vazio. |
| CAL-01 | Horários inválidos não geram expediente | Alta | Usar25:00, horário invertido e campos vazios. | Retorna null; equipe sem janela é omitida. |
| CAL-02 | Calendário monta intervalos e sobreposições | Alta | Equipe08-09 e outra08:30-09:30. | Três linhas30min; ambas na linha08:30; nenhuma linha além do fim. |
| CAL-03 | Estado temporal respeita bordas do intervalo | Alta | Consultar08:00 às07:59/08:00/08:29/08:30. | future/current/current/past, respectivamente. |
| CAL-04 | Sábado e domingo não são dias úteis | Alta | Consultar sábado/domingo/segunda em horário local. | false/false/true. |
| TEAM-02 | Serviço pagina equipes e separa representantes | Alta | Responder duas páginas de equipes com representantes em texto. | Busca ambas, converte representantes e prepara rótulos. |
| TEAM-03 | Atualização de status usa PATCH e retorno confirmado | Alta | Enviar NOT_DOING_5S e responder status confirmado. | PATCH com VIEWER e corpo correto; retorna status confirmado. |
| TEAM-401-initial | Sessão expirada em equipes: initial | Alta | Responder401 durante initial. | endSession uma vez; não mantém acesso ativo. |
| TEAM-401-refresh | Sessão expirada em equipes: refresh | Alta | Responder401 durante refresh. | endSession uma vez; não mantém acesso ativo. |
| TEAM-401-patch | Sessão expirada em equipes: patch | Alta | Responder401 durante patch. | endSession uma vez; não mantém acesso ativo. |
| TEAM-403 | Acesso negado preserva status confirmado | Alta | PATCH devolve403. | Sessão mantida; status anterior e mensagem de erro. |
| TEAM-04 | Sem sessão não consulta nem altera | Alta | Montar hook sem usuário e acionar refresh/status. | Zero requisições. |
| TEAM-05 | Resposta tardia não atualiza tela desmontada | Alta | Suspender consulta, desmontar e resolver. | Coleção não recebe resposta tardia. |
| NAV-01 | /home → /home pelo menu | Alta | Abrir origem autenticada e acionar botão home na moldura real. | Não duplica navegação para destino atual. |
| NAV-02 | /home → /ocorrencias pelo menu | Alta | Abrir origem autenticada e acionar botão occurrences na moldura real. | Callback navega para /ocorrencias, sem passar pelo login. |
| NAV-03 | /home → /equipes pelo menu | Alta | Abrir origem autenticada e acionar botão teams na moldura real. | Callback navega para /equipes, sem passar pelo login. |
| NAV-04 | /home → /materiais pelo menu | Alta | Abrir origem autenticada e acionar botão materials na moldura real. | Callback navega para /materiais, sem passar pelo login. |
| NAV-05 | /ocorrencias → /home pelo menu | Alta | Abrir origem autenticada e acionar botão home na moldura real. | Callback navega para /home, sem passar pelo login. |
| NAV-06 | /ocorrencias → /ocorrencias pelo menu | Alta | Abrir origem autenticada e acionar botão occurrences na moldura real. | Não duplica navegação para destino atual. |
| NAV-07 | /ocorrencias → /equipes pelo menu | Alta | Abrir origem autenticada e acionar botão teams na moldura real. | Callback navega para /equipes, sem passar pelo login. |
| NAV-08 | /ocorrencias → /materiais pelo menu | Alta | Abrir origem autenticada e acionar botão materials na moldura real. | Callback navega para /materiais, sem passar pelo login. |
| NAV-09 | /materiais → /home pelo menu | Alta | Abrir origem autenticada e acionar botão home na moldura real. | Callback navega para /home, sem passar pelo login. |
| NAV-10 | /materiais → /ocorrencias pelo menu | Alta | Abrir origem autenticada e acionar botão occurrences na moldura real. | Callback navega para /ocorrencias, sem passar pelo login. |
| NAV-11 | /materiais → /equipes pelo menu | Alta | Abrir origem autenticada e acionar botão teams na moldura real. | Callback navega para /equipes, sem passar pelo login. |
| NAV-12 | /materiais → /materiais pelo menu | Alta | Abrir origem autenticada e acionar botão materials na moldura real. | Não duplica navegação para destino atual. |
| NAV-13 | /equipes → /home pelo menu | Alta | Abrir origem autenticada e acionar botão home na moldura real. | Callback navega para /home, sem passar pelo login. |
| NAV-14 | /equipes → /ocorrencias pelo menu | Alta | Abrir origem autenticada e acionar botão occurrences na moldura real. | Callback navega para /ocorrencias, sem passar pelo login. |
| NAV-15 | /equipes → /equipes pelo menu | Alta | Abrir origem autenticada e acionar botão teams na moldura real. | Não duplica navegação para destino atual. |
| NAV-16 | /equipes → /materiais pelo menu | Alta | Abrir origem autenticada e acionar botão materials na moldura real. | Callback navega para /materiais, sem passar pelo login. |
| NAV-17 | /equipes/calendario → /home pelo menu | Alta | Abrir origem autenticada e acionar botão home na moldura real. | Callback navega para /home, sem passar pelo login. |
| NAV-18 | /equipes/calendario → /ocorrencias pelo menu | Alta | Abrir origem autenticada e acionar botão occurrences na moldura real. | Callback navega para /ocorrencias, sem passar pelo login. |
| NAV-19 | /equipes/calendario → /equipes pelo menu | Alta | Abrir origem autenticada e acionar botão teams na moldura real. | Callback navega para /equipes, sem passar pelo login. |
| NAV-20 | /equipes/calendario → /materiais pelo menu | Alta | Abrir origem autenticada e acionar botão materials na moldura real. | Callback navega para /materiais, sem passar pelo login. |
| NAV-21 | Logo volta à Home com controle acessível | Alta | Acionar a logo a partir de Equipes. | Navega /home; role button, nome acessível e alvo48. |
| NAV-22 | Calendário mantém Equipes selecionado | Alta | Renderizar moldura em /equipes/calendario. | Um menu, quatro destinos, somente Equipes selecionado. |
| NAV-23 | Logout limpa sessão antes da rota de login | Alta | Acionar Sair em calendário e avaliar guarda novamente. | endSession+replace(/); sem sessão, Redirect(/). |
| NAV-24 | Links protegidos sem sessão redirecionam | Alta | Avaliar grupo sem sessão para todas as rotas privadas. | Não renderiza a moldura; redireciona ao login. |
| NAV-25 | Restauração de sessão não mostra conteúdo privado | Alta | Avaliar grupo com restoring:true. | Exibe carregamento, sem menu nem Slot privado. |
| NAV-26 | Envio de ocorrência bloqueia navegação e saída | Alta | Simular mutação occurrence-create pendente e acionar todos callbacks. | Menu/logo/Sair disabled e nenhum evento de navegação ou logout. |
| NAV-27 | Logout pendente bloqueia cliques adicionais | Alta | Suspender limpeza de sessão e acionar logo/menu. | Sem navegação adicional até limpeza terminar. |
| NAV-28 | Equipes e calendário estão no grupo protegido | Alta | Inspecionar estrutura de rotas compilada no projeto. | Arquivos sob(app), sem cópias antigas/menu paralelo. |
| NAV-29 | Alternância Lista/Calendário preserva URLs | Alta | Invocar callbacks das duas rotas reais. | Lista abre /equipes/calendario; calendário abre /equipes. |
| OCC-01 | Campos obrigatórios e UUIDs | Alta | Validar formulário vazio e IDs inválidos. | Schema recusa problema/material ausentes ou IDs inválidos. |
| OCC-Q-0 | Quantidade fora da faixa permitida | Alta | Informar affectedQuantity=0. | Recusa; só inteiro1..999 é aceito. |
| OCC-Q--1 | Quantidade fora da faixa permitida | Alta | Informar affectedQuantity=-1. | Recusa; só inteiro1..999 é aceito. |
| OCC-Q-1.5 | Quantidade fora da faixa permitida | Alta | Informar affectedQuantity=1.5. | Recusa; só inteiro1..999 é aceito. |
| OCC-Q-1000 | Quantidade fora da faixa permitida | Alta | Informar affectedQuantity=1000. | Recusa; só inteiro1..999 é aceito. |
| OCC-02 | Quantidade nos limites | Alta | Validar1 e999. | Ambos aceitos pelo schema. |
| IMG-01 | JPG/PNG e cinco fotos válidas | Alta | Validar cinco fotos JPG/PNG com tamanho conhecido. | Coleção válida; soma calculada pelos tamanhos reais. |
| IMG-02 | Recusar anexo: invalidImageType | Alta | Selecionar GIF. | Código invalidImageType; impede envio. |
| IMG-03 | Recusar anexo: invalidImageSize | Alta | Selecionar arquivo com tamanho zero/desconhecido. | Código invalidImageSize; impede envio. |
| IMG-04 | Recusar anexo: imageTooLarge | Alta | Selecionar foto com5MB+1byte. | Código imageTooLarge; impede envio. |
| IMG-05 | Recusar anexo: tooManyImages | Alta | Selecionar seis fotos. | Código tooManyImages; impede envio. |
| IMG-06 | Recusar anexo: attachmentsTooLarge | Alta | Somar20MB+1byte com arquivos individualmente válidos. | Código attachmentsTooLarge; impede envio. |
| IMG-07 | Limite exato20MB é aceito | Alta | Validar4x5MB e5x4MB. | Ambas coleções aceitas; nenhum arredondamento do limite. |
| IMG-08 | File real prevalece sobre metadados | Alta | Metadados indicam1byte, File tem5MB+1byte. | Recusa imageTooLarge pelo tamanho real. |
| IMG-09 | Tamanhos não finitos são rejeitados | Alta | ValidarNaN,Infinity e tamanho negativo. | invalidImageSize em todos. |
| IMG-10 | Galeria múltipla retorna todos os assets | Alta | Simular picker com duas fotos e conferir opções. | allowsMultipleSelection true;selectionLimit5; mantém ambas. |
| IMG-11 | Cancelamento da galeria não adiciona foto | Alta | Picker retorna canceled:true. | Retorna coleção vazia, sem erro. |
| IMG-12 | Permissão de câmera negada tem feedback | Alta | Simular Android com granted:false. | cameraPermissionDenied; câmera não é aberta. |
| OCC-SEND-0 | Criação com0 fotos em um POST | Alta | Enviar quatro campos obrigatórios e fotos, respondendo201 vazio. | Um multipart /occurrences; sem rota de upload/IDs; usuário da sessão. |
| OCC-SEND-1 | Criação com1 fotos em um POST | Alta | Enviar quatro campos obrigatórios e fotos, respondendo201 vazio. | Um multipart /occurrences; sem rota de upload/IDs; usuário da sessão. |
| OCC-SEND-3 | Criação com3 fotos em um POST | Alta | Enviar quatro campos obrigatórios e fotos, respondendo201 vazio. | Um multipart /occurrences; sem rota de upload/IDs; usuário da sessão. |
| OCC-SEND-5 | Criação com5 fotos em um POST | Alta | Enviar quatro campos obrigatórios e fotos, respondendo201 vazio. | Um multipart /occurrences; sem rota de upload/IDs; usuário da sessão. |
| OCC-03 | Dados inválidos impedem chamada | Alta | Criar ocorrência com usuário não UUID e com seis fotos. | Valida antes da rede; zero chamadas. |
| OCC-04 | Opções inválidas não são usadas | Alta | GET options retorna objeto incompatível. | invalidResponse; nomes de campos de imagens são mapeados. |
| FLOW-OCC-01 | Formulário incompleto não envia | Alta | Enviar sem preencher ou com problema fora das opções. | Feedback e zero chamadas; progresso não chega a3. |
| FLOW-OCC-02 | Adicionar, remover e cancelar mantém coleção | Alta | Adicionar duas fotos, adicionar terceira, remover segunda e cancelar seleção. | Ordem1/3 preservada; cancelamento não apaga anexos. |
| FLOW-OCC-03 | Lote inválido preserva fotos anteriores | Alta | Após foto válida, adicionar arquivo acima5MB. | Mantém coleção anterior e apresenta erro. |
| FLOW-OCC-04 | Envio pendente bloqueia duplicação e edição | Alta | Preencher, anexar e enviar; clicar enviar de novo e tentar editar/remover. | Uma chamada; valores/fotos preservados enquanto envia. |
| FLOW-OCC-05 | Sucesso limpa rascunho e permite novo cadastro | Alta | Confirmar envio, acionar criar outra ocorrência. | completed true após sucesso; depois campos/fotos/progresso zerados. |
| FLOW-OCC-400 | Erro400 mantém rascunho | Alta | Enviar formulário válido com foto e resposta de erro simulada. | Sem sucesso; mantém valores/fotos;413 destaca anexos. |
| FLOW-OCC-413 | Erro413 mantém rascunho | Alta | Enviar formulário válido com foto e resposta de erro simulada. | Sem sucesso; mantém valores/fotos;413 destaca anexos. |
| FLOW-OCC-403 | Erro403 mantém rascunho | Alta | Enviar formulário válido com foto e resposta de erro simulada. | Sem sucesso; mantém valores/fotos;413 destaca anexos. |
| FLOW-OCC-401 | 401 no envio encerra sessão | Alta | Enviar e receber401. | Sessão limpa, sem confirmação de sucesso. |
| FLOW-UNCERTAIN-network | Resultado incerto apósnetwork | Alta | Enviar e falhar; tentar novamente antes/depois de confirmar conferência. | Bloqueia reenvio automático; só libera após acknowledgeRetry; mantém foto. |
| FLOW-UNCERTAIN-timeout | Resultado incerto apóstimeout | Alta | Enviar e falhar; tentar novamente antes/depois de confirmar conferência. | Bloqueia reenvio automático; só libera após acknowledgeRetry; mantém foto. |
| FLOW-UNCERTAIN-503 | Resultado incerto após503 | Alta | Enviar e falhar; tentar novamente antes/depois de confirmar conferência. | Bloqueia reenvio automático; só libera após acknowledgeRetry; mantém foto. |
| FLOW-OCC-06 | 401 no carregamento das opções encerra sessão | Alta | Simular erro401 nas opções antes de preencher. | endSession, sem criar ocorrência. |

## Casos manuais/integrados — executar com as pré-condições indicadas

| ID | Cenário | Prioridade | Passos | Resultado esperado |
| --- | --- | --- | --- | --- |
| UI-01 | Login: layout e mensagens visíveis | Alta | Abrir tablet834x1194; enviar vazio, apenas usuário, apenas senha e corrigir. | Campos e Alert corretos, sem corte; erro não depende apenas de cor. |
| UI-02 | Senha e teclado | Alta | Digitar senha, mostrar/ocultar, usar Tab e Enter em usuário/senha. | Preserva valor, foco visível e envio único; teclado não oculta ação. |
| UI-03 | Menu e logo no tablet | Alta | Login fixture; Home→Equipes→Materiais→Ocorrências; abrir Calendário e clicar logo. | Uma barra; cada tela abre, item ativo correto, logo voltaHome. |
| UI-04 | Logout, voltar e links privados | Alta | Sair em Equipes/Calendário; usar Voltar e abrir URLs privadas diretamente. | Conteúdo privado não reaparece; login pede nova sessão. |
| UI-05 | Materiais: estados e detalhes | Alta | Simular loading/vazio/erro/retry; buscar com acento; abrir detalhe e fechar X/fundo/Escape. | Lista recupera, dados corretos, modal fecha e foco permanece utilizável. |
| UI-06 | Equipes: estados, status e detalhes | Alta | Simular loading/vazio/erro/retry; buscar; abrir detalhe; alterar status com sucesso/403/503. | Sem status otimista incorreto; mensagens claras, modal e lista acessíveis. |
| UI-07 | Calendário no tablet | Alta | Alternar Lista/Calendário, rolar horários e simular dia útil/fim de semana. | Slots e legenda legíveis, sem overflow; equipe segue ativa no menu. |
| UI-08 | Origem das fotos e galeria | Alta | Abrir painel; escolher múltiplas fotos; adicionar até5, abrir+1, remover e cancelar. | Painel/galeria fecham sem perder anexos; contador, limites e miniaturas corretos. |
| UI-09 | Ocorrência: progresso, erros e sucesso | Alta | Preencher campos/quantidade; simular400/413/401 e201; criar outra e voltarHome. | Progresso0..3, erros preservam rascunho; sucesso somente após201, novo cadastro limpo. |
| UI-10 | Bloqueio e resultado incerto | Alta | AtrasarPOST; tocar duas vezes, logo, menu, Sair e Voltar; depois desconectar. | Sem duplicação por interação; saída bloqueada; alerta de incerteza exige conferência. |
| UI-11 | Acessibilidade e rolagem | Alta | Navegar só por teclado, ampliar texto, verificar nomes/alvos48 e rolagem de modal/tela. | Foco e texto visíveis, sem sobreposição/overflow ou informação só por hover/cor. |
| DEVICE-01 | Câmera física e permissão real | Alta | Em tablet físico, negar/permissão e capturar foto; retornar ao app. | Negação recuperável; foto válida adicionada sem perder formulário. |
| DEVICE-02 | SecureStore real e reinício | Alta | Login em development build; fechar/reabrir app e sair; verificar acesso salvo. | Sessão válida restaurada; logout remove acesso; sem senha persistida. |
| LIVE-01 | Login e leitura na API real/CORS | Alta | Usar conta VIEWER de homologação, origem autorizada e consultar materiais/equipes/opções. | Login e consultas reais sem CORS/contrato incompatível. |
| LIVE-02 | Envio real com fotos em homologação | Alta | Com ambiente/contatos de teste autorizados, enviar ocorrência com0/1/5 fotos e conferir registro. | Um registro com dados/fotos corretos;201 não equivale a entrega de e-mail. |

## Execução e registro

1. npm run test:frontend — gera este plano antes de executar, catálogoJSON, TAP, resultadosJSON e relatório individual. -- --dateYYYY-MM-DD fixa a data da rodada (com espaço entre --date e valor).
2. npx tsc --noEmit; npx expo lint --no-cache; npx expo export --platform web --output-dir <pasta-de-evidência-fora-do-app>. Salvar saída e exitcode em test-evidence/2026-10-27.
3. Para cada UI/DEVICE/LIVE, registrar Aprovado/Reprovado/Bloqueado/Não executado e evidência da rodada. Não reutilizar screenshots de entregas anteriores como execução atual.
4. Relatório: contagens por status/nível, testes não executados com motivo, defeitos com reprodução/risco, decisão de homologação e caminhos de evidência. Não registrar credenciais, sessão real, corpo bruto ou dados pessoais.

Artefatos da rodada: [relatório](test-report-2026-10-27.md), [catálogo](test-evidence/2026-10-27/case-catalog.json), [resultados](test-evidence/2026-10-27/results.json), [TAP](test-evidence/2026-10-27/automated.tap).
