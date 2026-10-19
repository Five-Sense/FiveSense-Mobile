# Data Model

Contrato real da API (Five Sense API v1, base path `/api/v1`, JSON) e diferenças em relação ao Documento de Requisitos. Fonte: documentação da API enviada pelo humano em 2026-10-09. Enums e campos marcados com (?) não aparecem na documentação e devem ser confirmados em `/v3/api-docs`.

## Atualização da API (2026-10-19, conferida em https://fivesense-api.onrender.com/docs/index.html e /v3/api-docs)

- **Perfil por header:** toda rota fora de `/auth/**` exige `X-User-Role` (`ADMIN`, `MANAGER` ou `VIEWER`). Ausente/inválido: 401; sem permissão: 403. O header não é autenticado e pode ser forjado (controle didático). Isso substitui "todas as rotas são públicas" e a lacuna 14 em parte; ver `security.md`.
- **Login:** `POST /auth/login` recebe `username` e `password` (a doc anterior dizia e-mail). `User` tem `username`; `status` pode ser `ACTIVE`/`INACTIVE`. Existe `POST /auth/forgot-password` (a conferir; lacuna 3).
- **Equipes (`GET /teams`, `?page=0&size=100`):** `representatives` é texto com nomes separados por vírgula (ex.: "Marcos Andrade, Fernanda Souza"; o app divide por vírgula, lacuna 18). **Horário (alterado em 2026-10-19):** `schedule` em texto livre foi substituído por `startTime` e `endTime` (`HH:MM`, aceitam vazio); todos os setores trabalham de segunda a sexta (regra do humano), então não há campo de dias. O calendário (lacuna 8) é montado desses dois campos em linhas de 30 min; equipes sem horário válido ficam fora. `code` real é livre ("ALMOX", "PROD-A"; lacuna 17).
- `PATCH /materials/{id}/stock` (ajuste de estoque) e `GET /materials/stock` existem; o Visualizador pode alterar o status da equipe e o estoque.

## Convenções

- **Paginação** (Spring `Page`): query `page` (base 0, padrão 0) e `size` (padrão 20, máx. 100). Resposta: `content[]`, `totalElements`, `totalPages`, `size`, `number`.
- **Erros:** ProblemDetail (RFC 9457). Conflito de exclusão: 409. Validação: 400/422 (?) com detalhes por campo (formato a confirmar).
- **IDs:** UUID. **Datas:** ISO 8601 UTC.
- **Autenticação:** todas as rotas são públicas; não há token (ver `security.md`).

## Endpoints e modelos

**Auth:** `POST /auth/login` `{email, password}` -> `{authenticated, userId, name, email, role}`.

**User** `{id, name, email, role, status, createdAt, updatedAt}`; `role`: `VIEWER` (outros valores, ex. `ADMIN` e `MANAGER`, a confirmar); `status`: `ACTIVE` (outros a confirmar).
- `GET /users` (paginado), `GET /users/{id}`
- `POST /users` `{name, email, password, role}` (o Administrador define a senha; a API não envia senha por e-mail)
- `PUT /users/{id}` `{name, email, status}` (não altera `role` nem senha)
- Não há exclusão de usuário.

**Team** `{id, name, code, representatives (texto livre), startTime, endTime, status}` (`schedule` foi substituído por `startTime`/`endTime` em 2026-10-19); `status`: `DOING_5S` | `NOT_DOING_5S`.
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
- `POST /occurrences/images` multipart, campo `image` (máx. 5 MB) -> `{imageId}`
- `POST /occurrences` `{problemId, materialId, affectedQuantity, reportedByUserId, imageId?}` -> 201. Não altera estoque; o e-mail ao Gestor é "best effort".
- `GET /occurrences` (paginado). O app não tem tela de listagem de ocorrências.

## Validação no app

| Campo | Regra |
| --- | --- |
| E-mail | formato válido |
| Senha (cadastro/troca) | mín. 8, 1 maiúscula, 1 número, 1 especial (RN025), se a API oferecer o fluxo |
| Nome do problema | até 20 caracteres, com contador |
| E-mail do problema | até 255 caracteres |
| Nome do material | até 55 caracteres |
| Estoque e mínimo | inteiro 0 a 999 |
| Imagem de ocorrência | limite da API: 5 MB |

O app valida para dar feedback rápido; a API é a autoridade.

## Lacunas entre requisitos e API (precisam de decisão humana)

| # | Requisito | Situação na API | Proposta |
| --- | --- | --- | --- |
| 1 | RF001/NF001/NF005 token JWT, expiração (RN022) | Login devolve só dados do usuário; sem token. O humano confirmou que os tokens expiram (inclusive o do Visualizador; duração a definir). | Perguntar ao responsável da API; app já prevê 401 -> login. |
| 2 | RF002 logout | Sem endpoint | Logout local (limpar sessão). |
| 3 | RF003 recuperar senha, RF004 alterar senha | Sem endpoints | Telas ficam bloqueadas até a API existir. Manter Fase 2 sem elas? |
| 4 | RF005 senha aleatória por e-mail (RN003) | Admin informa a senha no cadastro | Campo de senha no formulário de cadastro. |
| 5 | RF008 editar perfil de usuário | `PUT` não aceita `role` | Perfil não editável; editar nome, e-mail e status. |
| 6 | RN005/RN008/RN021 representantes, limite | `representatives` é texto livre | Campo de texto livre; sem chips nem limite. |
| 7 | RF025 "própria equipe" do Visualizador | Sem vínculo usuário-equipe; `PATCH` sem checagem | Precisa de campo na API; sem ele o Visualizador não tem como identificar sua equipe. |
| 8 | RF026 calendário (por turno e equipe) | Sem endpoint; a equipe tem `startTime`/`endTime` (`HH:MM`), sem dias | Montar a visão a partir de `startTime`/`endTime`; dias úteis fixos de segunda a sexta (regra do humano, 2026-10-19). |
| 9 | RN017 imagem de material | Material não tem imagem | Placeholder com ícone; sem upload. |
| 10 | RN013 imagem até 20 MB | API limita a 5 MB | Usar 5 MB. |
| 11 | RN019 alerta de estoque | API calcula `lowStock` | Mostrar alerta quando `lowStock` for verdadeiro, para Gestor e Visualizador. |
| 12 | RN012 resposta padrão | Campo `defaultResponse` | Campo no formulário do problema. |
| 13 | RF014 problemas para o Visualizador | `/problems/options` | Usar as opções. Idem materiais. |
| 14 | Perfis (NF002) | Rotas públicas, sem checagem de perfil | Controle só na interface (ver `security.md`). |
| 15 | Listas | Materiais também são paginados | Paginar materiais. |
| 16 | RN009, RN023, RN027 | Inconsistências do documento | Ignorar duplicatas; confirmar RN009. |
| 17 | Card de equipe mostra o código como "AA" em destaque e "11" ao lado (Figma: "AA-11") | `code` é texto livre, sem formato definido; nome ou código podem faltar | `TeamCard` separa o `code` no primeiro hífen (`splitTeamCode`); sem hífen, tudo vai no quadro azul. Confirmar o formato do código. |
| 18 | Minicards de representantes no detalhe da equipe | `representatives` é um único texto livre | `TeamDetailsCard` recebe `string[]`; quem monta o card separa os nomes. Regra de separação (vírgula? quebra de linha?) a definir. |
