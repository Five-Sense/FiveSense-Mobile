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

## Situação da API (reconferida em 2026-10-16)

Login público em POST /api/v1/auth/login por username/password, sem JWT ou expiração documentados. Usuário inativo ou credencial incorreta retorna 400. Demais rotas exigem X-User-Role; ausente/inválido dá 401, sem permissão dá 403. Esse header é didático, pode ser forjado e não constitui autenticação real. O cliente não deve tratá-lo como proteção de dados. Este incremento inicia sessão somente para VIEWER, conforme escopo do humano; não oferece fluxos administrativos.

O preflight e a resposta de login consultados a partir de http://localhost:8085 não devolvem Access-Control-Allow-Origin. O backend precisa liberar a origem do cliente web, POST/OPTIONS e Content-Type; futuras chamadas protegidas também precisam liberar X-User-Role. Não contornar CORS nem inserir proxy público. O app mostra falha de conexão e permite tentar novamente. Aplicativos nativos não dependem de CORS, mas não foram executados nesta entrega.

## Header de perfil (2026-10-19)

A API passou a exigir `X-User-Role` em toda rota fora de `/auth/**`, mas o header não é autenticado (pode ser forjado; a própria API o chama de controle didático). O cliente em `src/shared/services/api/client.ts` envia `VIEWER` fixo, porque o app é exclusivo do Visualizador e ainda não há login. Quando a sessão existir (ISSUE-003), o valor deve vir do `role` do login. O risco "controle por perfil só na interface" permanece.

## Sessão no app

- Guardar somente userId, name, username, email e role após validar a resposta. Senha, corpo do login e tokens nunca são registrados ou persistidos.
- Nativo: expo-secure-store com WHEN_UNLOCKED_THIS_DEVICE_ONLY. Falha de gravação impede concluir a sessão e tem feedback; dados salvos inválidos são limpos, falha de restauração pede novo login.
- Web: memória durante a visita, sem localStorage/sessionStorage/cookies; recarregar exige novo login. Sem armazenamento seguro equivalente no navegador, não persistir os dados de sessão.
- Sem inventar token, duração de sessão ou Authorization: Bearer. Se a API oferecer autenticação real, revisar o contrato antes de implementar.
- Serviço de login diferencia falhas de credenciais, perfil, rede/timeout e contrato inválido; nunca apresenta detail bruto da API. O contexto de sessão fornece limpeza local para o futuro fluxo de saída; UI de logout não faz parte deste print.

## Entradas e arquivos

- Validar entradas no app para feedback; a API valida de fato.
- Fotos de ocorrência: validar JPG/PNG, tamanho real conhecido/positivo, até 5 arquivos, 5 MB por foto e 20 MB na soma, tanto na seleção quanto antes do upload (contrato reconferido em 2026-10-19). Upload único com images repetido; exigir imageIds completos/únicos antes de criar uma ocorrência. Falhas/413 mantêm anexos para correção; resposta parcial não cria registro. IDs temporários não são reutilizados após criação incerta. Pedir permissão de câmera/galeria só quando o usuário escolher a origem; negação não bloqueia o envio. Sem log de arquivos ou dados de sessão.
- Mensagens de erro claras, sem expor detalhes internos (usar o `title`/`detail` do ProblemDetail somente quando for seguro mostrar).

## Segredos

O app não contém segredos. `EXPO_PUBLIC_*` é público; usar apenas para a URL da API (`EXPO_PUBLIC_API_URL`).
