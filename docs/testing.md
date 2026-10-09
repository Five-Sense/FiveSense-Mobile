# Testing

## Estratégia

Projeto enxuto: os checks obrigatórios são estáticos e manuais. Testes automatizados só entram se o humano pedir (decisão pendente, ver `decision-log.md`).

## Comandos oficiais

```bash
npx expo lint
npx tsc --noEmit
npx expo-doctor   # após mudar dependências ou app.json
```

## Verificação manual por entrega

Para cada tela entregue, conferir (simulador, dispositivo ou web):

- Caminho feliz do fluxo em `workflows.md`.
- Loading (skeleton), vazio, erro de rede com "Tentar novamente" e pull to refresh nas listas.
- Erro de validação da API junto ao campo; 401 leva ao login com aviso; 403 mostra acesso negado.
- Ações visíveis apenas para o perfil correto.
- Celular (390x844) e tablet/desktop em paisagem; teclado virtual sem cobrir campos.
- Foco visível, alvos de 48 px, estado por texto além de cor.

Sem API disponível, registrar que o fluxo foi verificado com dados simulados e qual risco isso deixa.

## Definition of Done

- Comportamento implementado conforme critérios da issue.
- Lint e typecheck sem erros.
- Verificação manual acima feita, ou limitação registrada em `deployment-log.md`.
- Docs ajustados quando contrato ou fluxo mudou.
