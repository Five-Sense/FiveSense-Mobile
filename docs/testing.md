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

## Conferência do design

Para entregas visuais, usar os links/IDs e distinguir valores confirmados de complementos em `design-guidelines.md`:

- Conferir tokens semânticos, estilos de texto, raios, bordas e sombras contra o componente de referência; registrar desvios com motivo.
- Exercitar variantes existentes e estados necessários ainda sem variante no Figma: foco, loading, disabled, erro, vazio e falta de permissão. Variant2/Variant3 exigem mapeamento confirmado.
- Conferir largura fluida, texto ampliado, rótulos longos, altura de alertas/cards e slots com/sem ícone; dimensões de amostra não são limites fixos.
- Button-SM: medir alvo real de pelo menos 48x48 sem sobreposição. Badge 5S: verificar resolução da divergência de texto 10 px e semântica antes de afirmar fidelidade/aprovação.
- Footer 12/15 é exceção institucional não interativa; não generalizar esse tamanho a campos, ações ou status.
- Não aprovar sessão, recuperação ou calendário por demonstração do protótipo: respeitar bloqueios da API.

Para revisões exclusivamente documentais, conferir links locais, rastreabilidade, consistência entre docs e diff. Registrar os checks de código exigidos pelo contrato e qualquer impossibilidade de executá-los; leitura do Figma não equivale a teste da interface implementada.

## Definition of Done

- Comportamento implementado conforme critérios da issue.
- Lint e typecheck sem erros.
- Verificação manual acima feita, ou limitação registrada em `deployment-log.md`.
- Docs ajustados quando contrato ou fluxo mudou.
