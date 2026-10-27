# Relatório de testes — Five Sense — 2026-10-27

## Rodada e decisão

Branch feature/tests-plan; commit base 24165414423516e59310b9caa9524675cadaab39; Nodev24.11.1; win32. InícioUTC 2026-10-27T11:22:55.347Z; fimUTC 2026-10-27T11:22:56.601Z. Reteste após correção autorizada de produto; o commit base não inclui as alterações locais. O fingerprint identifica o código testado. [Plano](test-plan.md).

**143 aprovados, 0 reprovados, 0 automatizados não executados; 15 manuais/integrados pendentes.** Exitcode da automação: 0. Homologação integral não concedida: mocks não validam interface/tablet/conta real/câmera/SMTP. Não confundir quantidade de assertions com quantidade de casos; cada ID representa um caso, alguns parametrizados.

## Resultado por caso automatizado

Pré-condições, passos e prioridades constam no plano e catálogo. Obtido: APROVADO significa que todas as verificações daquele ID corresponderam ao esperado; REPROVADO tem detalhes/stack no TAP.

| ID | Obtido | Esperado | Evidência |
| --- | --- | --- | --- |
| CFG-01 | APROVADO | AppError config; zero chamadas de rede. | automated.tap: [CFG-01] |
| CFG-02 | APROVADO | URL contém exatamente /api/v1/materials. | automated.tap: [CFG-02] |
| API-01 | APROVADO | Content-Type JSON, senha intacta, sem X-User-Role. | automated.tap: [API-01] |
| API-02 | APROVADO | Usa &, encodeURIComponent e VIEWER; omite undefined. | automated.tap: [API-02] |
| API-03 | APROVADO | Delegação única com VIEWER; retorno undefined. | automated.tap: [API-03] |
| HTTP-400 | APROVADO | Preserva status/kind; não exibe detalhe bruto; apenas uma tentativa. | automated.tap: [HTTP-400] |
| HTTP-401 | APROVADO | Preserva status/kind; não exibe detalhe bruto; apenas uma tentativa. | automated.tap: [HTTP-401] |
| HTTP-403 | APROVADO | Preserva status/kind; não exibe detalhe bruto; apenas uma tentativa. | automated.tap: [HTTP-403] |
| HTTP-404 | APROVADO | Preserva status/kind; não exibe detalhe bruto; apenas uma tentativa. | automated.tap: [HTTP-404] |
| HTTP-409 | APROVADO | Preserva status/kind; não exibe detalhe bruto; apenas uma tentativa. | automated.tap: [HTTP-409] |
| HTTP-413 | APROVADO | Preserva status/kind; não exibe detalhe bruto; apenas uma tentativa. | automated.tap: [HTTP-413] |
| HTTP-422 | APROVADO | Preserva status/kind; não exibe detalhe bruto; apenas uma tentativa. | automated.tap: [HTTP-422] |
| HTTP-429 | APROVADO | Preserva status/kind; não exibe detalhe bruto; apenas uma tentativa. | automated.tap: [HTTP-429] |
| HTTP-500 | APROVADO | Preserva status/kind; não exibe detalhe bruto; apenas uma tentativa. | automated.tap: [HTTP-500] |
| HTTP-503 | APROVADO | Preserva status/kind; não exibe detalhe bruto; apenas uma tentativa. | automated.tap: [HTTP-503] |
| API-04 | APROVADO | fields contém apenas username. | automated.tap: [API-04] |
| API-05 | APROVADO | Nome de campo mantido; texto bruto não exibido. | automated.tap: [API-05] |
| API-06 | APROVADO | invalidResponse, sem classificar como falha de rede. | automated.tap: [API-06] |
| API-07 | APROVADO | Preserva503/server; não exibe HTML. | automated.tap: [API-07] |
| API-08 | APROVADO | network, uma chamada, sem detalhe bruto. | automated.tap: [API-08] |
| API-09 | APROVADO | cancelled e zero chamadas. | automated.tap: [API-09] |
| API-F-ABORT | APROVADO | cancelled; timer/listener removidos. | automated.tap: [API-F-ABORT] |
| API-F-TIME | APROVADO | timeout; timer/listener removidos. | automated.tap: [API-F-TIME] |
| API-B-ABORT | APROVADO | cancelled; timer/listener removidos. | automated.tap: [API-B-ABORT] |
| API-B-TIME | APROVADO | timeout; timer/listener removidos. | automated.tap: [API-B-TIME] |
| API-10 | APROVADO | Mensagem do catálogo unknown, sem dados brutos. | automated.tap: [API-10] |
| AUTH-01 | APROVADO | Rejeitar e destacar identifier, password. | automated.tap: [AUTH-01] |
| AUTH-02 | APROVADO | Rejeitar e destacar identifier. | automated.tap: [AUTH-02] |
| AUTH-03 | APROVADO | Rejeitar e destacar password. | automated.tap: [AUTH-03] |
| AUTH-04 | APROVADO | Rejeitar e destacar identifier. | automated.tap: [AUTH-04] |
| AUTH-05 | APROVADO | Rejeitar e destacar password. | automated.tap: [AUTH-05] |
| AUTH-06 | APROVADO | Trim somente username; senha intacta; aceita255 caracteres. | automated.tap: [AUTH-06] |
| AUTH-07 | APROVADO | Retorna dados mínimos; remove password/token extras. | automated.tap: [AUTH-07] |
| AUTH-08 | APROVADO | Não iniciar sessão; erro seguro correspondente. | automated.tap: [AUTH-08] |
| AUTH-09 | APROVADO | Não iniciar sessão; erro seguro correspondente. | automated.tap: [AUTH-09] |
| AUTH-10 | APROVADO | Não iniciar sessão; erro seguro correspondente. | automated.tap: [AUTH-10] |
| AUTH-11 | APROVADO | Não iniciar sessão; erro seguro correspondente. | automated.tap: [AUTH-11] |
| AUTH-12 | APROVADO | Alerta de credenciais; identifier/password destacados. | automated.tap: [AUTH-12] |
| AUTH-13 | APROVADO | Destaca somente identifier; cancelamento não cria alerta. | automated.tap: [AUTH-13] |
| AUTH-14 | APROVADO | Feedback obrigatório; zero chamadas. | automated.tap: [AUTH-14] |
| AUTH-15 | APROVADO | Uma chamada; campos bloqueados; sessão iniciada e senha limpa. | automated.tap: [AUTH-15] |
| AUTH-16 | APROVADO | Sem conexão; mensagem segura e dados recuperáveis. | automated.tap: [AUTH-16] |
| AUTH-17 | APROVADO | Signal abortado; não inicia sessão após desmontar. | automated.tap: [AUTH-17] |
| SESSION-01 | APROVADO | Sessão disponível na visita; limpa no logout e não persiste em nova instância. | automated.tap: [SESSION-01] |
| SESSION-02 | APROVADO | Chave correta e WHEN_UNLOCKED_THIS_DEVICE_ONLY; sessão válida. | automated.tap: [SESSION-02] |
| SESSION-03 | APROVADO | Retorna null e remove registro; não restaura acesso. | automated.tap: [SESSION-03] |
| SESSION-04 | APROVADO | Retorna null e remove registro; não restaura acesso. | automated.tap: [SESSION-04] |
| MAT-01 | APROVADO | Encontra Álcool; termo inexistente retorna vazio. | automated.tap: [MAT-01] |
| MAT-02 | APROVADO | Retorna catálogo sem alterar coleção; rótulos corretos. | automated.tap: [MAT-02] |
| MAT-03 | APROVADO | Duas chamadas com VIEWER; somente material ativo no resultado. | automated.tap: [MAT-03] |
| MAT-04 | APROVADO | Resultado vazio, sem erro de contrato. | automated.tap: [MAT-04] |
| MAT-05 | APROVADO | invalidResponse, sem renderizar dados inválidos. | automated.tap: [MAT-05] |
| MAT-06 | APROVADO | Retorna1100 materiais em11 chamadas; busca encontra o último item; erro não conta como aprovação. | automated.tap: [MAT-06] |
| MAT-07 | APROVADO | Retorna1000 em10 chamadas, sem chamada extra. | automated.tap: [MAT-07] |
| MAT-08 | APROVADO | Falha explícita invalidResponse na segunda chamada; não retorna catálogo parcial nem consulta indefinidamente. | automated.tap: [MAT-08] |
| MAT-09 | APROVADO | Falha explícita invalidResponse na segunda chamada; não retorna catálogo parcial nem consulta indefinidamente. | automated.tap: [MAT-09] |
| MAT-10 | APROVADO | Falha explícita invalidResponse na segunda chamada; não retorna catálogo parcial nem consulta indefinidamente. | automated.tap: [MAT-10] |
| MAT-11 | APROVADO | invalidResponse, uma chamada e nenhum sucesso parcial. | automated.tap: [MAT-11] |
| MAT-12 | APROVADO | invalidResponse, uma chamada e nenhum sucesso parcial. | automated.tap: [MAT-12] |
| MAT-13 | APROVADO | invalidResponse, uma chamada e nenhum sucesso parcial. | automated.tap: [MAT-13] |
| MAT-14 | APROVADO | invalidResponse, uma chamada e nenhum sucesso parcial. | automated.tap: [MAT-14] |
| MAT-15 | APROVADO | Rejeita cancelled; não devolve página1 como sucesso nem solicita página3. | automated.tap: [MAT-15] |
| MAT-401 | APROVADO | Encerra sessão uma vez com aviso. | automated.tap: [MAT-401] |
| MAT-403 | APROVADO | Mantém sessão; acesso negado com texto. | automated.tap: [MAT-403] |
| TEAM-01 | APROVADO | Encontra equipe sem exigir acento/caixa; ausente retorna vazio. | automated.tap: [TEAM-01] |
| CAL-01 | APROVADO | Retorna null; equipe sem janela é omitida. | automated.tap: [CAL-01] |
| CAL-02 | APROVADO | Três linhas30min; ambas na linha08:30; nenhuma linha além do fim. | automated.tap: [CAL-02] |
| CAL-03 | APROVADO | future/current/current/past, respectivamente. | automated.tap: [CAL-03] |
| CAL-04 | APROVADO | false/false/true. | automated.tap: [CAL-04] |
| TEAM-02 | APROVADO | Busca ambas, converte representantes e prepara rótulos. | automated.tap: [TEAM-02] |
| TEAM-03 | APROVADO | PATCH com VIEWER e corpo correto; retorna status confirmado. | automated.tap: [TEAM-03] |
| TEAM-401-initial | APROVADO | endSession uma vez; não mantém acesso ativo. | automated.tap: [TEAM-401-initial] |
| TEAM-401-refresh | APROVADO | endSession uma vez; não mantém acesso ativo. | automated.tap: [TEAM-401-refresh] |
| TEAM-401-patch | APROVADO | endSession uma vez; não mantém acesso ativo. | automated.tap: [TEAM-401-patch] |
| TEAM-403 | APROVADO | Sessão mantida; status anterior e mensagem de erro. | automated.tap: [TEAM-403] |
| TEAM-04 | APROVADO | Zero requisições. | automated.tap: [TEAM-04] |
| TEAM-05 | APROVADO | Coleção não recebe resposta tardia. | automated.tap: [TEAM-05] |
| NAV-01 | APROVADO | Não duplica navegação para destino atual. | automated.tap: [NAV-01] |
| NAV-02 | APROVADO | Callback navega para /ocorrencias, sem passar pelo login. | automated.tap: [NAV-02] |
| NAV-03 | APROVADO | Callback navega para /equipes, sem passar pelo login. | automated.tap: [NAV-03] |
| NAV-04 | APROVADO | Callback navega para /materiais, sem passar pelo login. | automated.tap: [NAV-04] |
| NAV-05 | APROVADO | Callback navega para /home, sem passar pelo login. | automated.tap: [NAV-05] |
| NAV-06 | APROVADO | Não duplica navegação para destino atual. | automated.tap: [NAV-06] |
| NAV-07 | APROVADO | Callback navega para /equipes, sem passar pelo login. | automated.tap: [NAV-07] |
| NAV-08 | APROVADO | Callback navega para /materiais, sem passar pelo login. | automated.tap: [NAV-08] |
| NAV-09 | APROVADO | Callback navega para /home, sem passar pelo login. | automated.tap: [NAV-09] |
| NAV-10 | APROVADO | Callback navega para /ocorrencias, sem passar pelo login. | automated.tap: [NAV-10] |
| NAV-11 | APROVADO | Callback navega para /equipes, sem passar pelo login. | automated.tap: [NAV-11] |
| NAV-12 | APROVADO | Não duplica navegação para destino atual. | automated.tap: [NAV-12] |
| NAV-13 | APROVADO | Callback navega para /home, sem passar pelo login. | automated.tap: [NAV-13] |
| NAV-14 | APROVADO | Callback navega para /ocorrencias, sem passar pelo login. | automated.tap: [NAV-14] |
| NAV-15 | APROVADO | Não duplica navegação para destino atual. | automated.tap: [NAV-15] |
| NAV-16 | APROVADO | Callback navega para /materiais, sem passar pelo login. | automated.tap: [NAV-16] |
| NAV-17 | APROVADO | Callback navega para /home, sem passar pelo login. | automated.tap: [NAV-17] |
| NAV-18 | APROVADO | Callback navega para /ocorrencias, sem passar pelo login. | automated.tap: [NAV-18] |
| NAV-19 | APROVADO | Callback navega para /equipes, sem passar pelo login. | automated.tap: [NAV-19] |
| NAV-20 | APROVADO | Callback navega para /materiais, sem passar pelo login. | automated.tap: [NAV-20] |
| NAV-21 | APROVADO | Navega /home; role button, nome acessível e alvo48. | automated.tap: [NAV-21] |
| NAV-22 | APROVADO | Um menu, quatro destinos, somente Equipes selecionado. | automated.tap: [NAV-22] |
| NAV-23 | APROVADO | endSession+replace(/); sem sessão, Redirect(/). | automated.tap: [NAV-23] |
| NAV-24 | APROVADO | Não renderiza a moldura; redireciona ao login. | automated.tap: [NAV-24] |
| NAV-25 | APROVADO | Exibe carregamento, sem menu nem Slot privado. | automated.tap: [NAV-25] |
| NAV-26 | APROVADO | Menu/logo/Sair disabled e nenhum evento de navegação ou logout. | automated.tap: [NAV-26] |
| NAV-27 | APROVADO | Sem navegação adicional até limpeza terminar. | automated.tap: [NAV-27] |
| NAV-28 | APROVADO | Arquivos sob(app), sem cópias antigas/menu paralelo. | automated.tap: [NAV-28] |
| NAV-29 | APROVADO | Lista abre /equipes/calendario; calendário abre /equipes. | automated.tap: [NAV-29] |
| OCC-01 | APROVADO | Schema recusa problema/material ausentes ou IDs inválidos. | automated.tap: [OCC-01] |
| OCC-Q-0 | APROVADO | Recusa; só inteiro1..999 é aceito. | automated.tap: [OCC-Q-0] |
| OCC-Q--1 | APROVADO | Recusa; só inteiro1..999 é aceito. | automated.tap: [OCC-Q--1] |
| OCC-Q-1.5 | APROVADO | Recusa; só inteiro1..999 é aceito. | automated.tap: [OCC-Q-1.5] |
| OCC-Q-1000 | APROVADO | Recusa; só inteiro1..999 é aceito. | automated.tap: [OCC-Q-1000] |
| OCC-02 | APROVADO | Ambos aceitos pelo schema. | automated.tap: [OCC-02] |
| IMG-01 | APROVADO | Coleção válida; soma calculada pelos tamanhos reais. | automated.tap: [IMG-01] |
| IMG-02 | APROVADO | Código invalidImageType; impede envio. | automated.tap: [IMG-02] |
| IMG-03 | APROVADO | Código invalidImageSize; impede envio. | automated.tap: [IMG-03] |
| IMG-04 | APROVADO | Código imageTooLarge; impede envio. | automated.tap: [IMG-04] |
| IMG-05 | APROVADO | Código tooManyImages; impede envio. | automated.tap: [IMG-05] |
| IMG-06 | APROVADO | Código attachmentsTooLarge; impede envio. | automated.tap: [IMG-06] |
| IMG-07 | APROVADO | Ambas coleções aceitas; nenhum arredondamento do limite. | automated.tap: [IMG-07] |
| IMG-08 | APROVADO | Recusa imageTooLarge pelo tamanho real. | automated.tap: [IMG-08] |
| IMG-09 | APROVADO | invalidImageSize em todos. | automated.tap: [IMG-09] |
| IMG-10 | APROVADO | allowsMultipleSelection true;selectionLimit5; mantém ambas. | automated.tap: [IMG-10] |
| IMG-11 | APROVADO | Retorna coleção vazia, sem erro. | automated.tap: [IMG-11] |
| IMG-12 | APROVADO | cameraPermissionDenied; câmera não é aberta. | automated.tap: [IMG-12] |
| OCC-SEND-0 | APROVADO | Um multipart /occurrences; sem rota de upload/IDs; usuário da sessão. | automated.tap: [OCC-SEND-0] |
| OCC-SEND-1 | APROVADO | Um multipart /occurrences; sem rota de upload/IDs; usuário da sessão. | automated.tap: [OCC-SEND-1] |
| OCC-SEND-3 | APROVADO | Um multipart /occurrences; sem rota de upload/IDs; usuário da sessão. | automated.tap: [OCC-SEND-3] |
| OCC-SEND-5 | APROVADO | Um multipart /occurrences; sem rota de upload/IDs; usuário da sessão. | automated.tap: [OCC-SEND-5] |
| OCC-03 | APROVADO | Valida antes da rede; zero chamadas. | automated.tap: [OCC-03] |
| OCC-04 | APROVADO | invalidResponse; nomes de campos de imagens são mapeados. | automated.tap: [OCC-04] |
| FLOW-OCC-01 | APROVADO | Feedback e zero chamadas; progresso não chega a3. | automated.tap: [FLOW-OCC-01] |
| FLOW-OCC-02 | APROVADO | Ordem1/3 preservada; cancelamento não apaga anexos. | automated.tap: [FLOW-OCC-02] |
| FLOW-OCC-03 | APROVADO | Mantém coleção anterior e apresenta erro. | automated.tap: [FLOW-OCC-03] |
| FLOW-OCC-04 | APROVADO | Uma chamada; valores/fotos preservados enquanto envia. | automated.tap: [FLOW-OCC-04] |
| FLOW-OCC-05 | APROVADO | completed true após sucesso; depois campos/fotos/progresso zerados. | automated.tap: [FLOW-OCC-05] |
| FLOW-OCC-400 | APROVADO | Sem sucesso; mantém valores/fotos;413 destaca anexos. | automated.tap: [FLOW-OCC-400] |
| FLOW-OCC-413 | APROVADO | Sem sucesso; mantém valores/fotos;413 destaca anexos. | automated.tap: [FLOW-OCC-413] |
| FLOW-OCC-403 | APROVADO | Sem sucesso; mantém valores/fotos;413 destaca anexos. | automated.tap: [FLOW-OCC-403] |
| FLOW-OCC-401 | APROVADO | Sessão limpa, sem confirmação de sucesso. | automated.tap: [FLOW-OCC-401] |
| FLOW-UNCERTAIN-network | APROVADO | Bloqueia reenvio automático; só libera após acknowledgeRetry; mantém foto. | automated.tap: [FLOW-UNCERTAIN-network] |
| FLOW-UNCERTAIN-timeout | APROVADO | Bloqueia reenvio automático; só libera após acknowledgeRetry; mantém foto. | automated.tap: [FLOW-UNCERTAIN-timeout] |
| FLOW-UNCERTAIN-503 | APROVADO | Bloqueia reenvio automático; só libera após acknowledgeRetry; mantém foto. | automated.tap: [FLOW-UNCERTAIN-503] |
| FLOW-OCC-06 | APROVADO | endSession, sem criar ocorrência. | automated.tap: [FLOW-OCC-06] |

## Casos manuais/integrados

| ID | Status | Motivo/próximo passo |
| --- | --- | --- |
| UI-01 | BLOQUEADO | Pendência herdada da rodada inicial, sem nova execução de UI/dispositivo/API neste reteste de serviço. Computer Use interrompeu a inspeção do Chrome nesta rodada: não conseguiu determinar a URL atual com confiança suficiente para aplicar a política. Nenhuma interação posterior foi realizada; layout/toque/histórico real não executados. |
| UI-02 | BLOQUEADO | Pendência herdada da rodada inicial, sem nova execução de UI/dispositivo/API neste reteste de serviço. Computer Use interrompeu a inspeção do Chrome nesta rodada: não conseguiu determinar a URL atual com confiança suficiente para aplicar a política. Nenhuma interação posterior foi realizada; layout/toque/histórico real não executados. |
| UI-03 | BLOQUEADO | Pendência herdada da rodada inicial, sem nova execução de UI/dispositivo/API neste reteste de serviço. Computer Use interrompeu a inspeção do Chrome nesta rodada: não conseguiu determinar a URL atual com confiança suficiente para aplicar a política. Nenhuma interação posterior foi realizada; layout/toque/histórico real não executados. |
| UI-04 | BLOQUEADO | Pendência herdada da rodada inicial, sem nova execução de UI/dispositivo/API neste reteste de serviço. Computer Use interrompeu a inspeção do Chrome nesta rodada: não conseguiu determinar a URL atual com confiança suficiente para aplicar a política. Nenhuma interação posterior foi realizada; layout/toque/histórico real não executados. |
| UI-05 | BLOQUEADO | Pendência herdada da rodada inicial, sem nova execução de UI/dispositivo/API neste reteste de serviço. Computer Use interrompeu a inspeção do Chrome nesta rodada: não conseguiu determinar a URL atual com confiança suficiente para aplicar a política. Nenhuma interação posterior foi realizada; layout/toque/histórico real não executados. |
| UI-06 | BLOQUEADO | Pendência herdada da rodada inicial, sem nova execução de UI/dispositivo/API neste reteste de serviço. Computer Use interrompeu a inspeção do Chrome nesta rodada: não conseguiu determinar a URL atual com confiança suficiente para aplicar a política. Nenhuma interação posterior foi realizada; layout/toque/histórico real não executados. |
| UI-07 | BLOQUEADO | Pendência herdada da rodada inicial, sem nova execução de UI/dispositivo/API neste reteste de serviço. Computer Use interrompeu a inspeção do Chrome nesta rodada: não conseguiu determinar a URL atual com confiança suficiente para aplicar a política. Nenhuma interação posterior foi realizada; layout/toque/histórico real não executados. |
| UI-08 | BLOQUEADO | Pendência herdada da rodada inicial, sem nova execução de UI/dispositivo/API neste reteste de serviço. Computer Use interrompeu a inspeção do Chrome nesta rodada: não conseguiu determinar a URL atual com confiança suficiente para aplicar a política. Nenhuma interação posterior foi realizada; layout/toque/histórico real não executados. |
| UI-09 | BLOQUEADO | Pendência herdada da rodada inicial, sem nova execução de UI/dispositivo/API neste reteste de serviço. Computer Use interrompeu a inspeção do Chrome nesta rodada: não conseguiu determinar a URL atual com confiança suficiente para aplicar a política. Nenhuma interação posterior foi realizada; layout/toque/histórico real não executados. |
| UI-10 | BLOQUEADO | Pendência herdada da rodada inicial, sem nova execução de UI/dispositivo/API neste reteste de serviço. Computer Use interrompeu a inspeção do Chrome nesta rodada: não conseguiu determinar a URL atual com confiança suficiente para aplicar a política. Nenhuma interação posterior foi realizada; layout/toque/histórico real não executados. |
| UI-11 | BLOQUEADO | Pendência herdada da rodada inicial, sem nova execução de UI/dispositivo/API neste reteste de serviço. Computer Use interrompeu a inspeção do Chrome nesta rodada: não conseguiu determinar a URL atual com confiança suficiente para aplicar a política. Nenhuma interação posterior foi realizada; layout/toque/histórico real não executados. |
| DEVICE-01 | BLOQUEADO | Pendência herdada da rodada inicial, sem nova execução de UI/dispositivo/API neste reteste de serviço. Sem tablet físico/development build conectado para esta execução. |
| DEVICE-02 | BLOQUEADO | Pendência herdada da rodada inicial, sem nova execução de UI/dispositivo/API neste reteste de serviço. SecureStore foi testado com adaptador simulado; execução física indisponível. |
| LIVE-01 | BLOQUEADO | Pendência herdada da rodada inicial, sem nova execução de UI/dispositivo/API neste reteste de serviço. Nenhuma conta VIEWER de homologação fornecida. Não usar credenciais pessoais nem registrar senha. |
| LIVE-02 | BLOQUEADO | Pendência herdada da rodada inicial, sem nova execução de UI/dispositivo/API neste reteste de serviço. Não foi autorizado criar registros/disparar e-mails em produção; falta ambiente/contatos de homologação. |

## Evidências e reprodução

- [ResultadosJSON](test-evidence/2026-10-27-pagination-fix/results.json): resultado e metadados por ID.
- [SaídaTAP](test-evidence/2026-10-27-pagination-fix/automated.tap): execução e detalhes de falha.
- [Catálogo](test-evidence/2026-10-27-pagination-fix/case-catalog.json): pré-condições comuns no plano, passos e esperado.
- Repetir: npm install; npm run test:frontend -- --date 2026-10-27 --run pagination-fix. Nenhuma API/credencial necessária; transporte é simulado.

## Checks, achados e limites

Este relatório automatizado deve ser complementado com as saídas reais de TypeScript/lint/build, registro de defeitos e resultado da tentativa de UI na mesma rodada. Evidências históricas em testing.md não são contadas como execução atual. Nenhuma ocorrência/status/e-mail real enviado.

FingerprintSHA256 do código de produto: cdf8c686504d93d848246fa4468cd7f229f984a19ee3b88e7957015c9ca02253. [ResultadosCSV](test-evidence/2026-10-27-pagination-fix/results.csv).

## Revisão do reteste autorizado

DEF-001 corrigido:143 casos aprovados, zero falhas. MAT-06 exige catálogo completo de1100 itens e busca do último; não aceita falha genérica como sucesso. Nove casos novos cobrem a proteção de paginação. Foram alterados somente service/schema de materiais no produto; testes/runner e docs acompanham o reparo.

TypeScript, lint e export web aprovados, exitcode0: [checks](test-evidence/2026-10-27-pagination-fix/checks.json), [tipos](test-evidence/2026-10-27-pagination-fix/typescript.log), [lint](test-evidence/2026-10-27-pagination-fix/lint.log), [build](test-evidence/2026-10-27-pagination-fix/build.log). Build de13 rotas mantém aviso de favicon ausente (DEF-002, aberto/Baixa). git diff --check aprovado.

[Rodada inicial](test-report-2026-10-27.md) preservada com133 aprovados e1 reprovado; não foi reescrita. As15 pendências manuais são herdadas dessa rodada, com motivo/timestamp original, sem nova tentativa de UI neste reteste de serviço. Nenhuma alegação de tablet/layout/toque/câmera/SecureStore físico/API real/SMTP homologados. Sem mutação real, credenciais, nova dependência ou commit/push. Homologação integral permanece pendente.
