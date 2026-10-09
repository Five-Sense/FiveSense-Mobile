# Five Sense App

Aplicativo (Android, iOS e web/desktop responsivo) do Five Sense, sistema de gestão de 5S. Permite que Administradores, Gestores e Visualizadores gerenciem usuários, equipes, materiais, problemas e ocorrências, com acesso por perfil.

Este repositório contém apenas a camada de apresentação. Os dados vêm de uma API externa.

## Stack

Expo, React Native, TypeScript, Expo Router e NativeWind.

## Como rodar

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
