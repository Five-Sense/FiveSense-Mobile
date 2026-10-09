# Decision Log

Decisões duradouras e seus motivos. Estado: `Proposta`, `Aceita`, `Substituida`, `Rejeitada`. Entregas técnicas vão em `deployment-log.md`.

Template: `## 000X - Título` com Data, Estado, Contexto, Decisão, Consequências.

## 0001 - AGENTS.md e docs como fonte de verdade

- **Data:** 2026-10-09
- **Estado:** Aceita

### Contexto
Humanos e agentes de IA trabalham no projeto e precisam de contexto compartilhado.

### Decisão
`AGENTS.md` é o contrato; `docs/*` é a documentação canônica enxuta.

### Consequências
Docs precisam ser mantidos em cada entrega (ver `ai-workflow.md`).

## 0002 - Stack e plataformas

- **Data:** 2026-10-09
- **Estado:** Aceita (aprovação geral do humano em 2026-10-09)

### Contexto
Stack exigida: Expo, React Native, TypeScript, NativeWind. Plataformas: Android, iOS e desktop.

### Decisão
Desktop atendido por Expo web responsivo (react-native-web). NativeWind v5 (`5.0.0-rc.0` com `react-native-css 3.1.0-rc.0`, Tailwind 4), por ser a versão testada com Expo 57. Alternativa estável: NativeWind v4 (Tailwind 3).

### Consequências
v5 é release candidate (risco de mudanças). Versões exatas fixadas. Tema claro apenas; `app.json` deixa de travar retrato.

## 0003 - Dependências adicionais (propostas)

- **Data:** 2026-10-09
- **Estado:** Aceita (aprovação geral do humano em 2026-10-09; instalar com versões fixadas)

### Decisão proposta
- `lucide-react-native` + `react-native-svg` (ícones do design)
- `@expo-google-fonts/montserrat` + `expo-font` (fonte do design)
- `expo-secure-store` (token)
- `expo-image-picker` (câmera/galeria)
- `zod` (validação espelhando RN) e `@tanstack/react-query` (loading, refetch e pull to refresh)

### Consequências
Menos código próprio para cache/refetch e validação. Alternativa mais enxuta: hooks próprios e validação manual.

## 0004 - Tratamento de erro e listas

- **Data:** 2026-10-09
- **Estado:** Aceita (requisito do humano)

### Decisão
Toda chamada de API trata erro via `AppError` tipado; toda lista tem skeleton screen e pull to refresh.

### Consequências
Cliente de API único em `src/services/api`; componentes padrão de loading/vazio/erro.

## 0006 - Feature Driven Architecture

- **Data:** 2026-10-09
- **Estado:** Aceita (pedido do humano)

### Contexto
A arquitetura inicial (camadas globais `components/ui`, `lib`, `features`) tendia a concentrar componentes numa só pasta.

### Decisão
Adotar Feature Driven Architecture: cada feature contém screens, components (em subpastas por função), hooks, services, schemas, types, constants, utils e contexts. O que for usado por mais de uma feature sobe para a raiz de `src/`. Componentes globais e de feature são agrupados por função e divididos em partes menores.

### Consequências
Ao surgir um segundo uso, é preciso mover o arquivo para a raiz e ajustar imports. Features não se importam entre si. `src/lib` foi substituído por `src/services`, `src/utils` e `src/contexts`.

## 0005 - API sem token e sem autorização

- **Data:** 2026-10-09
- **Estado:** Proposta

### Contexto
A API v1 documentada tem rotas públicas e login que devolve dados do usuário, sem token. O humano afirmou que tokens expiram (inclusive para Visualizador), divergindo da documentação da API.

### Decisão
O app guarda os dados da sessão em armazenamento seguro, esconde ações por perfil e prevê 401/403 no cliente de API, sem depender deles ainda. Segurança real é responsabilidade da API.

### Consequências
Risco aceito e registrado em `security.md`. Recuperação/alteração de senha e identificação da "própria equipe" ficam bloqueadas até a API suportá-las.

## 0006 - Rastreabilidade entre Figma, briefing e contrato da API

- **Data:** 2026-10-09
- **Estado:** Aceita para a revisão documental solicitada pelo humano; escolhas visuais conflitantes continuam pendentes.

### Contexto
Fundamentos e Componentes puderam ser consultados diretamente. A base documental estava majoritariamente alinhada, mas apresentava medidas antigas, componentes sem referência e afirmação de Figma não lido. Há conflitos internos de acessibilidade e diferenças entre demonstrações do protótipo e a API.

### Decisão
Registrar em `design-guidelines.md` fonte, data, IDs, nomes de tokens e variantes, distinguindo propriedades confirmadas de orientações do briefing e complementos necessários. Corrigir diferenças visuais verificadas dentro do pedido atual. Preservar o contrato de dados, segurança e critérios existentes de toque/leitura enquanto as divergências específicas aguardam decisão; não interpretar protótipo como nova regra de negócio.

### Consequências
Button-SM e Badge 5S requerem resolução antes de implementação fiel; estados de calendário não viram enum da API; duração da sessão continua pendente. O limite do plano Figma impediu concluir a leitura detalhada de todos os componentes. Nenhum novo fluxo, dependência, arquitetura ou remoção de documento foi aprovado por esta revisão.
