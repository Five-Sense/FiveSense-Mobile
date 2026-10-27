# Registro de defeitos e achados — testes do front-end

Rodada: 27/10/2026. Branch `feature/tests-plan`. Os achados foram observados na execução inicial; DEF-001 foi corrigido depois, mediante pedido humano. A evidência inicial permanece intacta e o reteste está separado. [Plano](test-plan.md) · [Relatório](test-report-2026-10-27.md).

## DEF-001 — Catálogo de materiais é truncado sem aviso

| Campo | Registro |
| --- | --- |
| Status | Corrigido e retestado em2026-10-27; registro inicial preservado |
| Severidade / prioridade | Média / Média |
| Área / requisito | Materiais, RF032/RF033; consulta e busca local no catálogo |
| Caso relacionado | MAT-06 |
| Pré-condição | API simulada com 11 páginas válidas, 100 materiais ativos por página (1.100 no total) |
| Esperado | Obter os 1.100 materiais ou sinalizar explicitamente que a consulta foi interrompida/incompleta |
| Obtido | A função retorna somente 1.000 materiais com sucesso, sem erro ou indicador de truncamento |
| Localização original | `src/features/materials/services/materials-service.ts`, MAX_PAGES e condição do while no commit base2416541; linhas históricas8/19/32 |
| Causa observável | A proteção MAX_PAGES=10 encerra a busca, mas o retorno não distingue coleção completa de parcial |
| Impacto | Em catálogos maiores que 1.000 itens, materiais das páginas restantes podem ficar ausentes da lista, da busca e da contagem. O efeito visual não foi validado no navegador nesta rodada |
| Evidência | [TAP: MAT-06](test-evidence/2026-10-27/automated.tap), comparação `1000 !== 1100`; [resultadosJSON](test-evidence/2026-10-27/results.json) |

Reprodução original sem API real (o código atual já contém o reparo; o resultado reprovado continua no TAP inicial):

1. Instalar as dependências existentes (`npm install`) e usar Node 24.
2. Antes do reparo, a execução registrada foi `npm run test:frontend -- --date 2026-10-27`.
3. Consultar a falha MAT-06 no TAP original: fixture11 páginas, retorno10. Para a suíte corrigida, usar --run com um nome novo.

Reparo autorizado e concluído: removido MAX_PAGES=10, que era uma proteção contra loop, e congelado o total inicial validado. Metadados divergentes, índice number incorreto quando fornecido, página vazia antes do fim e IDs repetidos lançam invalidResponse. Mantidos PAGE_SIZE100, VIEWER, filtro de ativos e signal; sem chamada nova ou dependência.

O limite defensivo foi intencional; truncar o catálogo como sucesso não era requisito e foi um erro de implementação. Não houve defeito inserido para teste.

Reteste: MAT-06 exige1100 itens em11 chamadas e encontra Material1100 na busca. MAT-07..15 verificam borda10 páginas, inconsistências e cancelamento. **143 aprovados, zero falhas**, TypeScript/lint/export aprovados. [Relatório](test-report-2026-10-27-pagination-fix.md), [TAP](test-evidence/2026-10-27-pagination-fix/automated.tap), [resultados](test-evidence/2026-10-27-pagination-fix/results.json). Reprodução atual: npm run test:frontend -- --date 2026-10-27 --run meu-reteste. Sem API real ou aceite visual novo.

## DEF-002 — Configuração aponta para favicon inexistente

| Campo | Registro |
| --- | --- |
| Status | Aberto, aviso confirmado no build; preexistente |
| Severidade / prioridade | Baixa / Baixa |
| Área | Configuração/identidade web |
| Pré-condição | `app.json` configura `web.favicon` como `./assets/images/favicon.png`, mas o arquivo não existe |
| Reprodução | Executar a exportação web e consultar o aviso no log |
| Esperado | Referência de favicon válida ou configuração compatível com os ativos disponíveis |
| Obtido | Expo informa `Favicon source file in Expo config (web.favicon) does not exist`; build conclui com exitcode0 |
| Impacto | Identidade da aba web pode não ser a esperada; não impediu a geração do app |
| Evidência | [build.log](test-evidence/2026-10-27/build.log), verificação do caminho no projeto |

Tratamento recomendado: revisar o ativo de identidade e corrigir a referência em tarefa própria, depois repetir o build. Nenhum asset foi inventado ou alterado nesta rodada.

## Limitações de ambiente não classificadas como defeito do produto

- **UI bloqueada:** Computer Use não conseguiu determinar a URL atual do Chrome com segurança e interrompeu a inspeção. Não se conclui que o app falhou. [Registro da tentativa](test-evidence/2026-10-27/ui-attempt.json).
- **API real não homologada:** a consulta pública do OpenAPI não concluiu no prazo de20s; isso não comprova indisponibilidade do backend. Não houve conta VIEWER de homologação, POST de negócio ou envio de e-mail real. [Registro da consulta](test-evidence/2026-10-27/public-api-check.json).
- **Câmera/SecureStore físicos:** somente adaptadores simulados; dispositivo e development build não disponíveis para execução física.

Não há aprovação integral de UI, acessibilidade, histórico do navegador ou integração real com base nos testes lógicos. Casos bloqueados têm pré-condições e roteiro no plano para uma próxima rodada.
