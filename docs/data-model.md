# Data Model

Contrato real da API (Five Sense API v1, base path `/api/v1`, JSON) e diferenças em relação ao Documento de Requisitos. Fonte inicial: documentação da API enviada pelo humano em 2026-10-09. Ocorrências e anexos foram reconferidos em 2026-10-19; a revisão múltipla ao final deste documento prevalece sobre os registros históricos. Enums e campos marcados com (?) não aparecem na documentação e devem ser confirmados em `/v3/api-docs`.

## Revisão de autenticação - 2026-10-16

Fonte atual: https://fivesense-api.onrender.com/docs/index.html e /v3/api-docs. As descrições e lacunas abaixo datadas de 2026-10-09 são referência histórica quando conflitarem com esta revisão de autenticação. Perfis retornados continuam pertencendo ao contrato externo; o cliente de login atual admite somente VIEWER por instrução do humano. Não ampliar outros módulos por mudanças identificadas na API nesta consulta.

## Convenções

- **Paginação** (Spring `Page`): query `page` (base 0, padrão 0) e `size` (padrão 20, máx. 100). Resposta: `content[]`, `totalElements`, `totalPages`, `size`, `number`.
- **Erros:** ProblemDetail (RFC 9457). Conflito de exclusão: 409. Validação: 400/422 (?) com detalhes por campo (formato a confirmar).
- **IDs:** UUID. **Datas:** ISO 8601 UTC.
- **Autenticação atual (2026-10-16):** `/auth/**` público; demais rotas exigem `X-User-Role` (401 se ausente/inválido, 403 sem permissão). Header didático e forjável; não é JWT nem substitui autenticação real (ver `security.md`).

## Endpoints e modelos

**Auth (reconferido em 2026-10-16):** `POST /auth/login` `{username, password}` -> `{authenticated, userId, name, username, email, role}`. Username e senha obrigatórios, até 255 caracteres; username sem distinguir caixa. Credenciais incorretas/usuário inativo retornam 400 (ProblemDetail, detail "Invalid credentials"). No cliente deste incremento somente VIEWER inicia sessão. Não há JWT nem expiração na resposta. `POST /auth/forgot-password` agora aparece no contrato, com `{email,newPassword}` -> `{updated,userId,email}`; não faz parte do print/pedido atual, não implementar nem assumir fluxo por link.

**User** `{id, name, email, role, status, createdAt, updatedAt}`; `role`: `VIEWER` (outros valores, ex. `ADMIN` e `MANAGER`, a confirmar); `status`: `ACTIVE` (outros a confirmar).
- `GET /users` (paginado), `GET /users/{id}`
- `POST /users` `{name, email, password, role}` (o Administrador define a senha; a API não envia senha por e-mail)
- `PUT /users/{id}` `{name, email, status}` (não altera `role` nem senha)
- Não há exclusão de usuário.

**Team** `{id, name, code, representatives (texto livre), schedule (texto livre), status}`; `status`: `DOING_5S` | `NOT_DOING_5S`.
- `GET /teams` (paginado, por nome), `GET /teams/{id}`
- `POST /teams` e `PUT /teams/{id}` `{name, code, representatives, schedule}` (nome ou código obrigatório)
- `PATCH /teams/{id}/status` `{status}`
- `DELETE /teams/{id}` -> 204

**Problem** `{id, name (<= 20), relatedEmail (<= 255), defaultResponse, active}`
- `GET /problems` (paginado), `GET /problems/{id}`, `GET /problems/options` -> `[{id, name}]` (ativos)
- `POST /problems` e `PUT /problems/{id}` `{name, relatedEmail, defaultResponse, active?}`
- `DELETE /problems/{id}` -> 204 (409 se referenciado)

**Material** `{id, name (<= 55), stockQuantity (0-999), minimumStock (0-999), active, lowStock}`
- `GET /materials` (paginado), `GET /materials/{id}`, `GET /materials/options` -> `[{id, name}]` (ativos), `GET /materials/stock` -> `[{id, name, stockQuantity, minimumStock, lowStock}]`
- `POST /materials` e `PUT /materials/{id}` `{name, stockQuantity, minimumStock, active}`
- `DELETE /materials/{id}` -> 204 (409 se houver ocorrência)

**Occurrence** `{id, problemId, materialId, reportedByUserId, affectedQuantity, createdAt}`
- `POST /occurrences/images` multipart, campo `images` repetido, de 1 a 5 arquivos (máx. 5 MB cada) -> `{imageId, imageIds: UUID[]}`. O cliente usa apenas `imageIds`.
- `POST /occurrences` `{problemId, materialId, affectedQuantity, reportedByUserId, imageIds?: UUID[]}` -> 201 (até 5 IDs). Não altera estoque; o e-mail ao Gestor é "best effort".
- `GET /occurrences` (paginado). O app não tem tela de listagem de ocorrências.

## Validação no app

| Campo | Regra |
| --- | --- |
| E-mail (quando solicitado) | formato válido; login usa username, não e-mail |
| Login: username e password | obrigatórios, até 255; username trim, senha preservada; sem regras de cadastro |
| Senha (cadastro/troca) | mín. 8, 1 maiúscula, 1 número, 1 especial (RN025), se a API oferecer o fluxo |
| Nome do problema | até 20 caracteres, com contador |
| E-mail do problema | até 255 caracteres |
| Nome do material | até 55 caracteres |
| Estoque e mínimo | inteiro 0 a 999 |
| Fotos de ocorrência (cliente vigente) | JPG/PNG, até 5 fotos opcionais, 5 MB cada e soma até 20 MB; tamanho real conhecido e positivo |

O app valida para dar feedback rápido; a API é a autoridade.

## Lacunas entre requisitos e API (precisam de decisão humana)

| # | Requisito | Situação na API | Proposta |
| --- | --- | --- | --- |
| 1 | RF001/NF001/NF005 token JWT, expiração (RN022) | Login devolve só dados do usuário; sem token. O humano confirmou que os tokens expiram (inclusive o do Visualizador; duração a definir). | Perguntar ao responsável da API; app já prevê 401 -> login. |
| 2 | RF002 logout | Sem endpoint | Logout local (limpar sessão). |
| 3 | RF003 recuperar senha, RF004 alterar senha | Atualização 2026-10-16: forgot-password recebe email/newPassword diretamente; não há fluxo por link/token documentado | Fora do incremento atual; definir o fluxo com novos prints antes de implementar. |
| 4 | RF005 senha aleatória por e-mail (RN003) | Admin informa a senha no cadastro | Campo de senha no formulário de cadastro. |
| 5 | RF008 editar perfil de usuário | `PUT` não aceita `role` | Perfil não editável; editar nome, e-mail e status. |
| 6 | RN005/RN008/RN021 representantes, limite | `representatives` é texto livre | Campo de texto livre; sem chips nem limite. |
| 7 | RF025 "própria equipe" do Visualizador | Sem vínculo usuário-equipe; `PATCH` sem checagem | Precisa de campo na API; sem ele o Visualizador não tem como identificar sua equipe. |
| 8 | RF026 calendário (por turno e equipe) | Sem endpoint; só `schedule` em texto | Montar a visão a partir de `schedule` das equipes, sem inferir datas. |
| 9 | RN017 imagem de material | Material não tem imagem | Placeholder com ícone; sem upload. |
| 10 | RN013 anexos até 20 MB no total (correção humana) | API atual aceita até 5 fotos, 5 MB cada | Aplicar os três limites: 5 fotos, 5 MB por foto e 20 MB agregados. |
| 11 | RN019 alerta de estoque | API calcula `lowStock` | Mostrar alerta quando `lowStock` for verdadeiro, para Gestor e Visualizador. |
| 12 | RN012 resposta padrão | Campo `defaultResponse` | Campo no formulário do problema. |
| 13 | RF014 problemas para o Visualizador | `/problems/options` | Usar as opções. Idem materiais. |
| 14 | Perfis (NF002) | Atualização 2026-10-16: X-User-Role obrigatório fora de /auth/**; header forjável | VIEWER no cliente; proteção real ainda depende da API (ver security.md). |
| 15 | Listas | Materiais também são paginados | Paginar materiais. |
| 16 | RN009, RN023, RN027 | Inconsistências do documento | Ignorar duplicatas; confirmar RN009. |
| 17 | Card de equipe mostra o código como "AA" em destaque e "11" ao lado (Figma: "AA-11") | `code` é texto livre, sem formato definido; nome ou código podem faltar | `TeamCard` separa o `code` no primeiro hífen (`splitTeamCode`); sem hífen, tudo vai no quadro azul. Confirmar o formato do código. |
| 18 | Minicards de representantes no detalhe da equipe | `representatives` é um único texto livre | `TeamDetailsCard` recebe `string[]`; quem monta o card separa os nomes. Regra de separação (vírgula? quebra de linha?) a definir. |

## Revisão inicial de ocorrência - 2026-10-19 (histórico; anexos substituídos pela revisão múltipla abaixo)

Fontes: https://fivesense-api.onrender.com/docs/index.html e /v3/api-docs, consultadas nesta entrega. GET /problems/options e /materials/options exigem X-User-Role: VIEWER e devolvem arrays {id,name} ativos (200 real: 10 e 5 opções respectivamente). IDs são UUID; o cliente aceita apenas escolhas presentes nas opções carregadas. Quantidade inteira positiva, de 1 a 999 no Stepper existente. reportedByUserId vem exclusivamente da sessão validada.

Imagem opcional: POST /occurrences/images com FormData, campo image e no máximo 5*1024*1024 bytes; não definir Content-Type manualmente. Validar tipo de imagem e tamanho conhecido antes do upload; cancelamento preserva foto anterior. Resposta precisa conter imageId UUID. Somente depois chamar POST /occurrences com problemId, materialId, affectedQuantity, reportedByUserId e imageId opcional. 2xx confirma registro mesmo sem JSON de resposta. Não há alteração de estoque.

A API tenta notificar responsáveis ativos e contato do problema por e-mail, mas não informa o resultado da entrega. O cliente confirma somente o registro; não consegue mostrar aviso específico de falha de e-mail sem novo contrato. OpenAPI reutiliza nomes de schemas de controllers diferentes (CreateRequest), produzindo exemplo incompatível; para este payload valem a documentação legível oficial e os campos acima.

POST sem retry automático no app. Rede/timeout/5xx após iniciar registro têm resultado incerto: manter dados e impedir novo envio até o usuário confirmar que conferiu com os responsáveis. A API não oferece chave de idempotência; bloqueio local não garante unicidade contra repetição pelo transporte ou outro dispositivo. Imagem já enviada pode ficar sem ocorrência se o registro falhar; não há endpoint de remoção documentado.

Web real depende de CORS (origem, GET/POST/OPTIONS, Content-Type e X-User-Role). Nenhum bypass/proxy implementado; os testes de POST/upload foram locais, sem registros ou e-mails reais.
### Formatos do anexo - 2026-10-19

O painel de origem enviado pelo humano especifica JPG/PNG. O cliente valida image/jpeg e image/png tanto no picker quanto antes do multipart, com erro junto ao campo para outros tipos. Esta restrição do cliente não modifica a API; o limite de5MB permanece. Sem conversão automática ou dependência nova. API indisponível nesta correção: sem nova verificação remota do contrato.

## Múltiplas fotos - contrato vigente (2026-10-19)

Fontes reconferidas após o humano informar a atualização: https://fivesense-api.onrender.com/docs/index.html e https://fivesense-api.onrender.com/v3/api-docs. Esta revisão substitui a restrição provisória da decisão 0012 e os trechos históricos acima sobre campo singular/integração pendente.

Upload opcional: POST /occurrences/images, FormData com o campo images repetido, de 1 a 5 arquivos. Cada foto deve ter no máximo 5*1024*1024 bytes; o cliente mantém o limite humano de 20*1024*1024 bytes na SOMA. Aceitar JPG/PNG, tamanho real conhecido e positivo; revalidar a coleção antes do upload. Não definir Content-Type manualmente nem converter para base64. Seleção inválida/cancelada mantém as fotos anteriores. O seletor nativo limita cada escolha a 5; a validação da coleção também limita adições sucessivas e a seleção web, sem truncamento silencioso.

Resposta 201: {imageId, imageIds: UUID[]}; imageId é legado e repete a primeira foto. O cliente exige imageIds únicos, entre 1 e 5 e quantidade igual à de arquivos enviados. Resposta parcial, duplicada ou inválida impede criar a ocorrência e mantém o formulário. Só após um upload completo, POST /occurrences recebe problemId, materialId, affectedQuantity, reportedByUserId da sessão e imageIds. Uma única ocorrência vincula todas as fotos; sem fotos, pular upload e omitir imageIds. Não enviar imageId singular. Header X-User-Role: VIEWER e cliente HTTP compartilhado permanecem.

As imagens ficam em arquivos temporários, fora do banco, são anexadas ao e-mail e excluídas após o envio pelo backend. E-mail continua best effort; a resposta não confirma entrega. Não há chave de idempotência nem endpoint de limpeza documentados. Falha de upload não cria ocorrência. Rede/timeout/5xx após iniciar criação conserva o tratamento de resultado incerto e exige conferência antes do reenvio explícito; nenhum POST tem retry automático. Uma nova tentativa faz novo upload dos arquivos mantidos, sem reutilizar IDs temporários que podem ter sido consumidos. Timeout não foi alterado.

O OpenAPI ainda reutiliza CreateRequest entre controllers e descreve o multipart de forma incompleta; os exemplos da documentação legível oficial especificam images repetido e imageIds. Não inferir o payload do exemplo de outro controller. Contrato público lido por GET; POSTs verificados com fixtures locais, sem registros/e-mails reais. Conta VIEWER real, CORS atual e câmera física não foram validados neste incremento.
