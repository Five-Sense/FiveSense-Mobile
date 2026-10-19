# Security

## Permissões do cliente (NF002, RN002)

Escopo exclusivo do Visualizador (decisão 0009, 2026-10-16). A interface não oferece fluxos administrativos ou de gestão.

| Recurso | Visualizador |
| --- | --- |
| Problemas | Seleção na ocorrência |
| Ocorrências | Cria |
| Equipes | Consulta, altera status da própria, calendário |
| Materiais | Consulta |
| Conta | Login, informações e logout |

## Situação da API (risco alto)

A API v1 documentada tem **todas as rotas públicas** e login "simples" que devolve os dados do usuário, sem token. Consequências:

- O controle por perfil existe apenas na interface do app. Qualquer cliente pode chamar qualquer rota, e o app não consegue impedir isso.
- O `userId` enviado em `POST /occurrences` vem do cliente e pode ser forjado.
- Não há 401/403 documentados. O humano informou que os tokens expiram; a API precisa expor isso (token, duração, resposta 401) antes do app depender dele.

Este risco pertence à API e deve ser tratado lá. No app: ocultar ações por perfil, nunca tratar a interface como barreira de segurança e registrar o risco em cada entrega relevante.

## Header de perfil (2026-10-19)

A API passou a exigir `X-User-Role` em toda rota fora de `/auth/**`, mas o header não é autenticado (pode ser forjado; a própria API o chama de controle didático). O cliente em `src/shared/services/api/client.ts` envia `VIEWER` fixo, porque o app é exclusivo do Visualizador e ainda não há login. Quando a sessão existir (ISSUE-003), o valor deve vir do `role` do login. O risco "controle por perfil só na interface" permanece.

## Sessão no app

- Após o login, guardar apenas o necessário (`userId`, `name`, `email`, `role`) em armazenamento seguro (`expo-secure-store` no nativo; no web, equivalente mais fraco).
- Se a API passar a emitir token: enviar `Authorization: Bearer`, tratar 401 como "Sua sessão expirou" (limpar sessão e ir ao login) e 403 como "Acesso negado".
- Logout limpa a sessão local.
- Nunca registrar senha, token ou dados da sessão em logs.

## Entradas e arquivos

- Validar entradas no app para feedback; a API valida de fato.
- Imagem de ocorrência: validar tamanho (limite da API, 5 MB) antes do envio. Pedir permissão de câmera/galeria só quando o usuário escolher a origem; negação não bloqueia o envio.
- Mensagens de erro claras, sem expor detalhes internos (usar o `title`/`detail` do ProblemDetail somente quando for seguro mostrar).

## Segredos

O app não contém segredos. `EXPO_PUBLIC_*` é público; usar apenas para a URL da API (`EXPO_PUBLIC_API_URL`).
