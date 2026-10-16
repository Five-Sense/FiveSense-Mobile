# Workflows

Fluxos e telas do Visualizador (decisão 0009, 2026-10-16). Fonte: briefing de design (seções 5 e 6) e Documento de Requisitos 5S. Estados de erro, carregamento e cancelamento são propostas de interface.

> **Atenção:** a API v1 não cobre recuperação/alteração de senha, token, vínculo usuário-equipe nem calendário, e limita imagens a 5 MB. Onde este documento (vindo do briefing) divergir, vale `data-model.md`, seção "Lacunas".

## Navegação por perfil

| Perfil | Menu principal |
| --- | --- |
| Visualizador | Ocorrências, Equipes, Materiais |
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

- **Login:** e-mail e senha, `Entrar`, página principal do Visualizador. Credencial incorreta mantém no login com mensagem; falha de rede permite tentar de novo. Primeiro acesso usa a senha enviada por e-mail (troca não é obrigatória).
- **Recuperação (bloqueada, sem endpoint na API):** Esqueci minha senha, e-mail, link recebido (deep link), nova senha e confirmação. Token vale 10 min (RN024). Senha: mínimo 8 caracteres, 1 maiúscula, 1 número, 1 especial (RN025).
- **Logout:** limpa a sessão local e volta ao login.
- **Sessão expirada (401, quando a API emitir token):** interrompe a ação, limpa a sessão, mostra "Sua sessão expirou" e leva ao login. A ação interrompida não aparece como concluída.
- **Acesso negado (403):** mensagem "Você não possui permissão para realizar esta ação", sessão mantida.
- **Detalhes:** equipes e materiais abrem em pop-up de consulta, com fechamento acessível; sem ações de cadastro, edição ou exclusão de gestão.
- **Ocorrência:** problema, material, quantidade (+/-), imagem opcional (câmera ou galeria, máx. 5 MB pela API; upload antes do envio, que devolve `imageId`). Sucesso limpa o formulário. Se registrar mas o e-mail falhar, mostrar aviso de resultado parcial sem induzir reenvio.
- **Status de 5S:** Visualizador toca na própria equipe para alternar Fazendo 5S e Não fazendo 5S. Outra equipe ou sem vínculo mostra mensagem de permissão. Em falha, mantém o último status confirmado.
- **Estoque:** MaterialItem e MaterialDetailsCard não exibem feedback de estoque baixo; a quantidade no detalhe é informativa.
- **Representantes e horário de equipe:** texto livre (a API não tem lista estruturada).

## Comportamento padrão de qualquer lista

Skeleton ao carregar, pull to refresh, vazio com mensagem (e ação de cadastro só para quem tem permissão), erro com "Tentar novamente", paginação preservada ao fechar detalhes.
