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
