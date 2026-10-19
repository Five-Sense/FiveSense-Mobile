# Workflows

Fluxos e telas do Visualizador (decisão 0009, 2026-10-16). Fonte: briefing de design (seções 5 e 6) e Documento de Requisitos 5S. Estados de erro, carregamento e cancelamento são propostas de interface.

> **Atenção:** a API v1 não cobre recuperação/alteração de senha, token, vínculo usuário-equipe nem calendário, e limita imagens a 5 MB. Onde este documento (vindo do briefing) divergir, vale `data-model.md`, seção "Lacunas".

## Incremento de login vigente - 2026-10-16

Por decisão do humano, este cliente usa Nome de usuário e senha; o protótipo que mostrava e-mail está incorreto. Campos obrigatórios/tamanho validados antes da API; nome de usuário pode não ser e-mail. Alert acima dos campos informa dados ausentes ou credenciais incorretas; bordas destacam somente os campos envolvidos. API recebe username/password e retorna sessão VIEWER. Loading bloqueia reenvio; conexão, timeout, indisponibilidade, perfil não permitido e resposta inválida recebem feedback recuperável. Desde o incremento de ocorrência de 2026-10-19, sucesso inicia a sessão e abre a Home existente em /home; a confirmação provisória na própria tela foi substituída para dar acesso ao fluxo autorizado. Recuperação e demais telas seguem fora deste incremento.

## Navegação por perfil

| Perfil | Menu principal |
| --- | --- |
| Visualizador | Home, Ocorrências, Equipes, Materiais |
| Visualizador | Informações da conta, Sair |

## Telas e requisitos

| Tela | Perfil | Requisitos |
| --- | --- | --- |
| Login | Visualizador | RF001 |
| Recuperação de senha | Visualizador | RF003 |
| Redefinição de senha (via link) | Visualizador | RF003 |
| Página principal | Visualizador | RF001, RF002 |
| Informações da conta e Alterar senha | Visualizador | RF004 |
| Registro de ocorrência e seleção/captura de imagem | Visualizador | RF014 a RF016 |
| Lista de equipes (paginada), detalhes | Visualizador | RF023, RF024 |
| Alterar status da própria equipe; Calendário de 5S | Visualizador | RF025, RF026 |
| Lista de materiais, detalhes | Visualizador | RF032, RF033 |
| Estados globais: sessão expirada, acesso negado | Visualizador | NF001, NF002, RN022 |

## Fluxos-chave

- **Login vigente:** nome de usuário e senha, botão Login, abertura da Home existente em /home após autenticar. Credencial incorreta mantém no formulário com Alert; falha de rede permite tentar de novo. Sem fluxos de outros perfis neste cliente.
- **Recuperação (bloqueada, sem endpoint na API):** Esqueci minha senha, e-mail, link recebido (deep link), nova senha e confirmação. Token vale 10 min (RN024). Senha: mínimo 8 caracteres, 1 maiúscula, 1 número, 1 especial (RN025).
- **Logout:** limpa a sessão local e volta ao login.
- **Sessão recusada (401):** interrompe a ação, limpa a sessão, mostra "Sua sessão expirou" e leva ao login. A ação interrompida não aparece como concluída.
- **Acesso negado (403):** mensagem "Você não possui permissão para realizar esta ação", sessão mantida.
- **Detalhes:** equipes e materiais abrem em pop-up de consulta, com fechamento acessível; sem ações de cadastro, edição ou exclusão de gestão.
- **Ocorrência:** problema, material, quantidade (+/-), imagem opcional (câmera ou galeria, máx. 5 MB pela API; upload antes do envio, que devolve `imageId`). Sucesso limpa o formulário. A resposta atual não informa entrega do e-mail: confirmar somente o registro. Progresso Etapa 0 a 3 representa os três campos obrigatórios, sem wizard adicional (Figma preenchido 132:6302). Durante envio, bloquear campos/menu/saída. Erros preservam dados; rede/timeout/5xx após iniciar registro mostram resultado incerto e exigem conferência antes de reenvio explícito, sem retry automático. Rota protegida /ocorrencias; verificação visual deste incremento somente em tablet.
- **Status de 5S:** Visualizador toca na própria equipe para alternar Fazendo 5S e Não fazendo 5S. Outra equipe ou sem vínculo mostra mensagem de permissão. Em falha, mantém o último status confirmado.
- **Estoque:** MaterialItem e MaterialDetailsCard não exibem feedback de estoque baixo; a quantidade no detalhe é informativa.
- **Materiais (2026-10-19):** `/materiais` lista os materiais ativos com contagem e busca por nome (a API não tem código). Tocar no item abre o pop-up "Detalhes do material" (nome e quantidade em estoque), fechado pelo X, fundo, Escape ou voltar. Skeleton ao carregar, pull to refresh, vazio, vazio de busca e erro com "Tentar novamente"; 401 volta ao login com aviso e 403 mostra acesso negado. Somente consulta.
- **Representantes e horário de equipe:** texto livre (a API não tem lista estruturada).

## Comportamento padrão de qualquer lista

Skeleton ao carregar, pull to refresh, vazio com mensagem (e ação de cadastro só para quem tem permissão), erro com "Tentar novamente", paginação preservada ao fechar detalhes.
