# AI Workflow

## Princípio

- **Humano = navegador:** define o que, por quê, prioridade e decisões de produto, arquitetura e escopo.
- **IA = piloto:** define o como técnico, escreve código, mantém a documentação sincronizada.

## Fluxo

1. Ler `AGENTS.md` e os docs relevantes à tarefa.
2. Confirmar objetivo, issue/fase, critério de aceite e riscos.
3. Para APIs de Expo/NativeWind, consultar a documentação da versão instalada.
4. Implementar o menor incremento seguro, sem expandir escopo.
5. Rodar os checks de `testing.md`.
6. Fechar a tarefa (abaixo).

## Pedir aprovação humana antes de

- alterar escopo, ordem de fases ou arquitetura;
- adicionar dependência;
- mudar regras de segurança ou o contrato de dados;
- fugir do `design-guidelines.md` ou do Figma;
- remover documentos;
- inventar regra de negócio (registrar como pendência em `data-model.md`).

## Travas de escopo

Não criar issue nova se a atual resolve; não pular fase com checklist aberto; não transformar correção pequena em refatoração ampla. Se o rumo precisa mudar, pausar e perguntar.

## Fechamento de tarefa

Antes de dar como concluída:

1. `docs/issues.md`: status e nota datada em `### Estado atual`.
2. `docs/implementation-plan.md`: marcar checklist e fase.
3. `docs/deployment-log.md`: o que foi feito, arquivos, checks, riscos (mais recente no topo).
4. `docs/decision-log.md`: só se houver decisão duradoura de arquitetura, produto, dados, segurança ou operação.

No chat, resumir arquivos alterados, checks executados, docs atualizados e riscos residuais.

## Logs

`decision-log` guarda o porquê de decisões duradouras; `deployment-log` guarda o que foi entregue; `issues` guarda o estado vivo do trabalho.

## Git e conflitos

- Antes de abrir PR, traga a `develop` para o branch (`git pull origin develop`) e resolva conflitos localmente. Nunca faça commit com marcadores `<<<<<<<`, `=======`, `>>>>>>>`; confira com `git grep -nE '^(<<<<<<<|=======|>>>>>>>)'`.
- Uma tarefa por branch, PRs pequenos. Arquivos compartilhados (`package.json`, `src/global.css`, `app.json`, `src/app/_layout.tsx`) mudam em PR próprio ou com aviso ao time.
- `package.json`: cada dependência fica em um único lugar (`dependencies` ou `devDependencies`), com versão exata. Depois de resolver conflito, rode `npm install` para o `package-lock.json` refletir o resultado; não edite o lock à mão.
- Tokens de design só mudam em `src/global.css` a partir de `colors.tokens.json`.