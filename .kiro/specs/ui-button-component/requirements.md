# Requirements Document

## Introduction

Este documento especifica o componente reutilizável `Button` do FiveSense Mobile, baseado no componente Figma "Button" (ID 33:2643). O componente fica em `src/components/ui/button` e permite escolher a variação visual por meio de uma propriedade, de modo que a variação possa ser definida depois, no ponto de uso. As variações do Figma são: Default, Hover, Pressed, Disabled e Secondary, todas com o rótulo de exemplo "Entrar" em largura total.

Estado verificado do repositório: `package.json` ainda não contém NativeWind, `lucide-react-native` nem Montserrat. Essas dependências estão aprovadas nos registros 0002/0003 do `docs/decision-log.md`, mas o scaffold da Fase 1 (ISSUE-002) está como Planejado. A instalação de dependências exige aprovação humana conforme `docs/ai-workflow.md`.

Escopo: apenas o componente `Button` e suas variações. Fora de escopo: Button/Tertiary (Figma 4:12, componente separado), Button-SM (Figma 208:5030, pendente de resolução do alvo de toque mínimo), telas que consomem o botão e testes automatizados (não solicitados, conforme `docs/testing.md`).

## Glossary

- **Button**: Componente de interface reutilizável em `src/components/ui/button`.
- **Variante**: Valor da propriedade `variant` que define a aparência do Button. Valores: `primary`, `secondary`, `destructive`.
- **Estado_Interativo**: Condição de interação do Button: repouso, hover, pressionado, desabilitado, foco ou carregando.
- **Token**: Valor de design nomeado, definido em `src/global.css` e usado via classes NativeWind.
- **Brand_Action**: Token de cor #4747D4.
- **Brand_Action_Hover**: Token de cor #3737B8.
- **Brand_Dark**: Token de cor #0E0E55.
- **Disabled_BG**: Token de cor #E2E8F0.
- **Disabled_Text**: Token de cor #64748B.
- **Border_Subtle**: Token de cor #E2E8F0.
- **Focus_Ring**: Token de cor #4747D4 para o anel de foco.
- **Destructive**: Token de cor #B91C1C.
- **Destructive_Pressed**: Token de cor mais escura que Destructive, usado em hover e pressionado da Variante destructive (valor a definir).
- **Rótulo**: Texto exibido no Button, em português.
- **Slot_de_Ícone**: Área de 32 de largura e altura para um ícone Lucide ao lado do Rótulo.
- **Alvo_de_Toque**: Área interativa do Button.
- **Aprovador_Humano**: Pessoa responsável por aprovar a adição de dependências.

## Requirements

### Requirement 1: Seleção de variação por propriedade

**User Story:** Como desenvolvedor, quero escolher a variação do Button por uma propriedade, para decidir depois qual aparência usar em cada tela.

#### Acceptance Criteria

1. THE Button SHALL expor a propriedade opcional `variant` tipada em TypeScript como união literal exclusiva dos valores `primary`, `secondary` e `destructive`, de modo que qualquer outro valor resulte em erro de compilação do TypeScript.
2. WHEN a propriedade `variant` não é informada ou é `undefined`, THE Button SHALL renderizar a Variante `primary`.
3. WHEN a propriedade `variant` recebe um dos valores `primary`, `secondary` ou `destructive`, THE Button SHALL renderizar exatamente a Variante correspondente ao valor informado.
4. THE Button SHALL expor a propriedade obrigatória `children` do tipo `string`, de modo que a omissão de `children` ou o uso de valor que não seja `string` resulte em erro de compilação do TypeScript, para exibir o Rótulo.
5. THE Button SHALL expor a propriedade opcional `onPress`, do tipo função sem argumentos obrigatórios e sem valor de retorno exigido, para tratar o toque do usuário.
6. WHEN o usuário toca no Button e a propriedade `onPress` foi informada, THE Button SHALL invocar `onPress` exatamente uma vez por toque.
7. WHEN o usuário toca no Button e a propriedade `onPress` não foi informada, THE Button SHALL ignorar o toque sem lançar erro.
8. THE Button SHALL ter seus arquivos localizados no diretório `src/components/ui/button`, com todos os nomes de arquivo em kebab-case (somente letras minúsculas, dígitos e hífens).
9. THE Button SHALL ser independente de conhecimento de API, de rotas e de regras de negócio, sem importar módulos de chamadas de API, de navegação/rotas ou de regras de negócio.

### Requirement 2: Variante primária

**User Story:** Como usuário, quero um botão primário claro, para reconhecer a ação principal da tela.

#### Acceptance Criteria

1. WHILE a Variante é `primary` e o Estado_Interativo é repouso (Button habilitado, sem ponteiro sobre ele e não pressionado), THE Button SHALL exibir fundo Brand_Action e Rótulo branco.
2. WHILE a Variante é `primary`, o Button está habilitado, não está pressionado e o ponteiro está sobre o Button, THE Button SHALL exibir fundo Brand_Action_Hover e Rótulo branco.
3. WHILE a Variante é `primary`, o Button está habilitado e pressionado, THE Button SHALL exibir fundo Brand_Dark e Rótulo branco, independentemente de o ponteiro estar sobre o Button.
4. WHILE a Variante é `primary` e o Button está desabilitado, THE Button SHALL exibir fundo Disabled_BG e Rótulo Disabled_Text, independentemente de o ponteiro estar sobre o Button ou de ele receber um toque ou clique.
5. WHEN o Button `primary` habilitado deixa de ser pressionado, THE Button SHALL exibir fundo Brand_Action_Hover se o ponteiro estiver sobre ele, ou fundo Brand_Action caso contrário, com Rótulo branco em ambos os casos.
6. IF o Button `primary` está desabilitado e recebe um toque ou clique, THEN THE Button SHALL manter a aparência do critério 4 e SHALL NOT disparar a ação associada.

### Requirement 3: Variante secundária

**User Story:** Como usuário, quero um botão secundário discreto, para distinguir ações de menor prioridade.

#### Acceptance Criteria

1. WHILE a Variante é `secondary` e o Estado_Interativo é repouso, THE Button SHALL exibir fundo branco, borda de 1 px Border_Subtle e Rótulo Brand_Action.
2. WHEN o Button na Variante `secondary` entra no Estado_Interativo pressionado ou hover, THE Button SHALL alterar o fundo, a cor do Rótulo ou ambos para valores de Tokens existentes, mantendo a borda de 1 px Border_Subtle e uma razão de contraste de pelo menos 4.5:1 entre o Rótulo e o fundo.
3. WHEN o Button na Variante `secondary` sai do Estado_Interativo pressionado ou hover, THE Button SHALL restaurar fundo, borda e Rótulo aos valores do estado de repouso em até 100 ms.
4. WHILE a Variante é `secondary` e o Button está desabilitado, THE Button SHALL exibir fundo Disabled_BG e Rótulo Disabled_Text, e SHALL ignorar toques e hover sem disparar o callback de pressionar nem alterar a aparência.
5. THE Button SHALL manter na Variante `secondary` a mesma altura total das demais Variantes, de modo que botões adjacentes de Variantes diferentes tenham alturas idênticas (diferença de 0 px) e o Alvo_de_Toque seja de no mínimo 48 px de altura. (Observação: o Figma define 50 para Secondary e 48 para Default; ver Questões em Aberto.)

### Requirement 4: Variante destrutiva

**User Story:** Como usuário, quero identificar ações destrutivas, para evitar exclusões acidentais.

#### Acceptance Criteria

1. WHILE a Variante é `destructive` e o Estado_Interativo é repouso, THE Button SHALL exibir fundo com o Token Destructive e Rótulo na cor branca, com razão de contraste mínima de 4.5:1 entre Rótulo e fundo.
2. WHILE a Variante é `destructive` e o Estado_Interativo é pressionado, THE Button SHALL exibir fundo com o Token Destructive_Pressed, cuja luminância relativa é menor que a do Token Destructive, mantendo o Rótulo na cor branca.
3. WHILE a Variante é `destructive` e o Estado_Interativo é hover, THE Button SHALL exibir fundo com o Token Destructive_Pressed, cuja luminância relativa é menor que a do Token Destructive, mantendo o Rótulo na cor branca.
4. WHILE a Variante é `destructive` e o Button está desabilitado, THE Button SHALL exibir fundo com o Token Disabled_BG e Rótulo com o Token Disabled_Text, sem aplicar as cores dos critérios 1, 2 e 3.
5. WHEN a Variante é `destructive` e o Button está desabilitado e o usuário toca ou clica no Button, THE Button SHALL ignorar a interação, sem disparar o callback de ação e sem alterar a aparência do Button.

### Requirement 5: Estado desabilitado

**User Story:** Como usuário, quero que o botão desabilitado não responda a toques, para não disparar ações indevidas.

#### Acceptance Criteria

1. WHILE o Button recebe `disabled` igual a `true`, THE Button SHALL exibir o visual de desabilitado definido para a Variante em uso, distinguível do visual habilitado da mesma Variante por pelo menos um atributo visual (por exemplo, opacidade ou cor de fundo).
2. WHILE o Button está desabilitado, THE Button SHALL ignorar toques e não chamar `onPress`, nem em toques repetidos (até 10 toques em 1 segundo resultam em 0 chamadas a `onPress`).
3. WHILE o Button está desabilitado, THE Button SHALL informar `disabled: true` ao leitor de tela por `accessibilityState`.
4. WHILE o Button está desabilitado, THE Button SHALL manter o Rótulo visível e com o mesmo texto do estado habilitado, de modo que o estado não seja transmitido apenas por cor.
5. WHEN o valor de `disabled` muda de `true` para `false`, THE Button SHALL restaurar o visual habilitado da Variante e voltar a chamar `onPress` uma vez a cada toque, com `accessibilityState` informando `disabled: false`.
6. IF `disabled` é `undefined` ou não é informado, THEN THE Button SHALL se comportar como habilitado (`disabled` igual a `false`).

### Requirement 6: Estado de carregamento

**User Story:** Como usuário, quero feedback durante uma ação em andamento, para saber que o app está processando e não tocar duas vezes.

#### Acceptance Criteria

1. WHEN o Button recebe `loading` igual a verdadeiro, THE Button SHALL exibir um indicador de progresso com 20 pixels lógicos de largura e 20 pixels lógicos de altura, em até 100 ms após a renderização.
2. WHEN o Button recebe `loading` igual a verdadeiro e um Rótulo de carregamento não vazio é informado, THE Button SHALL exibir o Rótulo de carregamento no lugar do Rótulo original, ao lado do indicador de progresso.
3. WHEN o Button recebe `loading` igual a verdadeiro e nenhum Rótulo de carregamento é informado (ausente, vazio ou composto apenas por espaços), THE Button SHALL manter o Rótulo original ao lado do indicador de progresso.
4. WHILE o Button está em carregamento, THE Button SHALL ignorar todos os toques e não chamar `onPress`, incluindo toques repetidos em sequência.
5. WHILE o Button está em carregamento, THE Button SHALL informar `busy` igual a verdadeiro ao leitor de tela por `accessibilityState`.
6. WHEN o Button deixa de estar em carregamento (`loading` passa a falso ou ausente), THE Button SHALL remover o indicador de progresso, exibir o Rótulo original, informar `busy` igual a falso ao leitor de tela e voltar a chamar `onPress` a cada toque.

### Requirement 7: Foco e acessibilidade

**User Story:** Como usuário de teclado ou tecnologia assistiva, quero ver o foco, para saber qual botão está ativo.

#### Acceptance Criteria

1. WHILE o Button está com foco de teclado ou de tecnologia assistiva, THE Button SHALL exibir um anel de foco com 2 px de espessura na cor Focus_Ring, visível em todo o contorno do Button e sem sobrepor o Rótulo.
2. WHEN o Button perde o foco, THE Button SHALL remover o anel de foco em até 100 ms e restaurar as dimensões e a posição originais, sem deslocar os elementos adjacentes.
3. THE Button SHALL expor `accessibilityRole` igual a `button`.
4. THE Button SHALL expor o Rótulo como nome acessível, com o mesmo texto exibido, sem truncamento e sem acréscimo de outro texto.
5. WHILE o Button está desabilitado, THE Button SHALL expor o estado acessível `disabled` igual a `true` e SHALL manter o estado exposto até que o Button seja habilitado.
6. IF o Button não possui Rótulo textual e possui apenas ícone, THEN THE Button SHALL exigir a propriedade `accessibilityLabel` com pelo menos 1 caractere não branco em tempo de compilação, e a compilação SHALL falhar com erro de tipo quando a propriedade for omitida ou for uma string vazia.

### Requirement 8: Medidas e tipografia do Figma

**User Story:** Como designer, quero que o Button siga as medidas do Figma, para manter fidelidade visual.

#### Acceptance Criteria

1. THE Button SHALL ocupar 100% da largura disponível do contêiner pai por padrão, sem largura fixa em pixels.
2. THE Button SHALL ter altura mínima de 48 dp, preenchimento interno de 8 dp em todos os lados, espaçamento de 8 dp entre ícone e Rótulo e raio de borda de 8 dp.
3. THE Button SHALL renderizar o Rótulo na fonte Montserrat, com tamanho de 16 sp, altura de linha de 24 sp e peso 600.
4. WHEN o usuário amplia o tamanho de texto do sistema, THE Button SHALL aumentar sua altura para acomodar o Rótulo completo, mantendo todas as linhas do Rótulo visíveis, sem truncamento e sem reticências.
5. THE Button SHALL centralizar o Rótulo horizontal e verticalmente dentro da área do Button, com desvio máximo de 1 dp em cada eixo.
6. THE Button SHALL manter Alvo_de_Toque mínimo de 48 dp de largura por 48 dp de altura, incluindo quando a largura do contêiner for menor que 48 dp.
7. IF a fonte Montserrat não estiver carregada ou disponível, THEN THE Button SHALL renderizar o Rótulo com a fonte padrão do sistema, mantendo tamanho 16 sp, altura de linha 24 sp, peso 600 e todas as demais medidas inalteradas.

### Requirement 9: Ícone opcional

**User Story:** Como desenvolvedor, quero um ícone opcional no Button, para reforçar a ação com um símbolo consistente.

#### Acceptance Criteria

1. WHERE a propriedade `icon` é informada, THE Button SHALL renderizar o ícone Lucide dentro do Slot_de_Ícone de 32 x 32 pixels, posicionado imediatamente antes do Rótulo na mesma linha, com o ícone ocupando 100% da largura e da altura do Slot_de_Ícone.
2. WHERE a propriedade `icon` é informada, THE Button SHALL aplicar ao ícone a mesma cor do Rótulo do Estado_Interativo atual.
3. WHERE a propriedade `icon` é informada, WHEN o Estado_Interativo do Button muda, THE Button SHALL atualizar a cor do ícone para a cor do Rótulo do novo Estado_Interativo, de modo que ícone e Rótulo nunca exibam cores diferentes entre si.
4. WHERE a propriedade `icon` não é informada, THE Button SHALL renderizar apenas o Rótulo, sem reservar espaço para o Slot_de_Ícone.
5. THE Button SHALL aceitar apenas ícones da biblioteca `lucide-react-native`.
6. IF a propriedade `icon` receber um valor que não seja um ícone da biblioteca `lucide-react-native`, THEN THE Button SHALL rejeitar o valor em tempo de compilação por meio de erro de tipo e SHALL NOT renderizar o ícone em tempo de execução, mantendo a renderização do Rótulo inalterada.

### Requirement 10: Estilos por tokens

**User Story:** Como mantenedor, quero que estilos usem Tokens, para que mudanças de tema fiquem centralizadas.

#### Acceptance Criteria

1. THE Button SHALL aplicar 100% das propriedades de cor (fundo, texto, borda e anel de foco) por classes NativeWind que referenciam Tokens declarados em `src/global.css`, sem usar a prop `style` inline para cores.
2. THE Button SHALL declarar em `src/global.css` os Tokens ausentes: brand-action, brand-action-hover, brand-dark, disabled-bg, disabled-text, border-subtle, focus-ring, destructive e destructive-pressed, cada um com exatamente um valor de cor definido para o tema ativo.
3. WHEN um valor de um Token declarado em `src/global.css` é alterado, THE Button SHALL refletir a nova cor em todas as suas variantes e estados (padrão, hover, foco, desabilitado e destrutivo) sem qualquer alteração no código do componente.
4. THE Button SHALL conter 0 (zero) ocorrências de valores de cor literais (hexadecimal, rgb(), rgba(), hsl() ou nomes de cor CSS) no código do componente.
5. THE Button SHALL ser compilado com TypeScript em modo strict (`strict: true`), com 0 (zero) erros de tipo, 0 (zero) usos de `any` explícito e todas as props tipadas explicitamente.

### Requirement 11: Governança de dependências e fechamento

**User Story:** Como Aprovador_Humano, quero controlar a adição de dependências, para manter o projeto sob governança.

#### Acceptance Criteria

1. IF NativeWind, `lucide-react-native` ou Montserrat não estão listados nas dependências do projeto quando a implementação começa, THEN THE equipe SHALL solicitar aprovação explícita e registrada do Aprovador_Humano para cada dependência ausente, individualmente, e SHALL NOT instalar nenhuma dependência sem a aprovação correspondente.
2. IF o Aprovador_Humano negar a aprovação de uma dependência, THEN THE equipe SHALL interromper o trabalho que depende dela, SHALL manter o projeto sem essa dependência instalada e SHALL registrar a negação e o item bloqueado em `docs/issues.md`.
3. WHEN a implementação é concluída, THE equipe SHALL atualizar `docs/issues.md`, `docs/implementation-plan.md` e `docs/deployment-log.md`, de modo que cada arquivo contenha uma entrada datada que descreva o resultado da implementação, o status dos itens do plano e as dependências aprovadas ou negadas.
4. WHEN a implementação é concluída, THE equipe SHALL executar `npx expo lint` e `npx tsc --noEmit` e ambos os comandos SHALL terminar com código de saída 0, com 0 erros reportados.
5. IF `npx expo lint` ou `npx tsc --noEmit` reportar ao menos 1 erro, THEN THE equipe SHALL corrigir os erros e reexecutar ambos os comandos até que terminem com 0 erros, antes de considerar a implementação concluída.
6. WHEN a implementação é concluída, THE equipe SHALL verificar manualmente, em ao menos 1 dispositivo físico ou emulador, cada combinação de Variante e Estado_Interativo definida nos requisitos, e SHALL registrar em `docs/deployment-log.md` o resultado aprovado ou reprovado de cada combinação, junto com a identificação do dispositivo ou emulador usado.
## Questões em Aberto

- A altura de Secondary no Figma é 50 e a de Default é 48 (provável efeito da borda). Sugestão: usar 48 em todas as Variantes, com a borda dentro da altura. Precisa de confirmação.
- A Variante `destructive` e o estado de carregamento não possuem variante no Figma; os valores de hover/pressed de `destructive` precisam ser definidos.
- Mapeamento semântico dos nomes do Figma (Property 1 / Variant2 / Variant3) para `variant` e estados: aqui, Default/Hover/Pressed/Disabled são estados de `primary` e Secondary é uma Variante.
- Button-SM e Button/Tertiary ficam fora deste escopo; confirmar se devem entrar depois como `size` e `variant` adicionais.
