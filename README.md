# Five Sense App

Aplicativo (Android, iOS e web/desktop responsivo) do Five Sense, sistema de gestão de 5S. Cliente do Visualizador para consulta de equipes e materiais, registro de ocorrências e atualização do status da própria equipe. Gestão e administração ficam fora deste aplicativo (decisão 0009).

Este repositório contém apenas a camada de apresentação. Os dados vêm de uma API externa.

## Stack

Expo, React Native, TypeScript, Expo Router e NativeWind.

## Como rodar

Antes de iniciar, copie `.env.example` para `.env.local` na raiz do projeto. O arquivo local é ignorado pelo Git e deve conter:

```env
EXPO_PUBLIC_API_URL=https://fivesense-api.onrender.com
```

Use somente o host; o cliente adiciona `/api/v1`. Após alterar a configuração, faça uma recarga completa do app. Se aparecer o erro `config`, confira se a variável está preenchida no ambiente usado pelo Expo.

```bash
npm install
npx expo start
```

Checks: `npx expo lint` e `npx tsc --noEmit`.

## Metodologia (SpecFirst)

O projeto usa SpecFirst: a documentação é escrita e aprovada antes do código.

- `AGENTS.md`: contrato para humanos e agentes de IA.
- `docs/README.md`: índice dos documentos.
- Fluxo de trabalho e fechamento de tarefas: `docs/ai-workflow.md`.
- Estado atual do trabalho: `docs/issues.md` e `docs/implementation-plan.md`.

## Testes do front-end

```bash
npm run test:frontend
```

A suíte usa Node24 e dependências já instaladas; não precisa de credenciais nem faz chamadas reais de rede. Para executar a suíte atual em uma rodada identificada: `npm run test:frontend -- --date 2026-10-27 --run minha-rodada`. A rodada inicial documentada é histórica e conserva o defeito detectado antes do reparo. O comando registra o plano antes de executar e gera relatório/JSON/CSV/TAP emdocs. TypeScript/lint/build são checks adicionais, registrados separadamente.

- [Plano](docs/test-plan.md), [relatório da rodada](docs/test-report-2026-10-27.md) e [defeitos](docs/test-defects.md).
- Paginação corrigida (DEF-001/MAT-06): reteste com143 aprovados, zero falhas. [Relatório do reparo](docs/test-report-2026-10-27-pagination-fix.md); evidência inicial reprovada preservada. Repetir em rodada separada: `npm run test:frontend -- --date 2026-10-27 --run pagination-fix`. Use outro nome em --run para manter cada execução.
- Testes lógicos não equivalem a homologação em tablet/conta real. Os15 casos bloqueados têm roteiro e pré-condições no plano.
