---
name: tailwind-to-mantine-components
description: Convert React JSX or TSX components by their respective equivalent component in Mantine UI library.
---

Sempre que for solicitado converter um componente React JSX/TSX com Tailwind CSS para um componente da biblioteca Mantine UI, siga este processo:

1. Leia a documentação da última versão do Mantine UI:
   - Índice LLM: https://mantine.dev/llms.txt
   - Versão completa: https://mantine.dev/llms-full.txt

2. Identifique a intenção do componente original:
   - Qual é o papel semântico? (layout, formulário, navegação, feedback, overlay).
   - Quais estados e interações existem? (hover, focus, disabled, loading, active).
   - Quais tokens visuais são importantes? (cores, espaçamentos, bordas, tipografia).

3. Escolha os componentes Mantine adequados:
   - Layout: use `AppShell`, `Container`, `Group`, `Stack`, `Flex`, `Grid`, `SimpleGrid`, `Paper`, `Card`.
   - Tipografia: use `Title`, `Text`, `Anchor`, `Code`, evitando `className` Tailwind para tipografia sempre que houver prop equivalente.
   - Formulários: use `TextInput`, `PasswordInput`, `Textarea`, `Select`, `Checkbox`, `Radio.Group`, `Switch`, `NumberInput`, etc.
   - Navegação e interação: use `Button`, `ActionIcon`, `Tabs`, `Menu`, `Breadcrumbs`, `Pagination`.
   - Feedback e overlays: use `Alert`, `Notification`, `Badge`, `Tooltip`, `Modal`, `Drawer`, `Popover`.

4. Converta classes Tailwind para props Mantine quando possível:
   - Espaçamento: `p-*`, `px-*`, `py-*`, `m-*`, `gap-*` → props `p`, `px`, `py`, `m`, `gap`, `g`.
   - Bordas e radius: `border`, `border-*`, `rounded-*` → props `bd`, `radius`, ou estilos inline quando necessário.
   - Cores: `bg-*`, `text-*`, `border-*` → prop `color` e `variant`, preferindo tokens de tema em vez de valores hex fixos.
   - Tipografia: `font-*`, `text-*`, `leading-*` → props `fw`, `fz`, `lh`, `ta` dos componentes de tipografia.

5. Preserve ou melhorar acessibilidade e estados:
   - Mantenha `aria-*`, `role`, `type` e propriedades de acessibilidade ao migrar para componentes Mantine.
   - Use props nativas de estado quando disponíveis (`loading`, `disabled`, `error`, `withAsterisk`, etc.).

6. Integre com o tema Mantine:
   - Certifique-se de que a árvore esteja envolvida por `MantineProvider`.
   - Quando o projeto usa Tailwind como fonte de tokens, considere mapear as cores e espaçamentos Tailwind para o tema Mantine em `MantineProvider`, para poder usar `color` e `radius` coerentes com o design system.

7. Manuseie estilos sem equivalência direta:
   - Se não existir prop Mantine para um estilo necessário (por exemplo, animações específicas ou filtros complexos), mantenha `className` com Tailwind ou use a prop `className`/`style` em componentes Mantine.
   - Evite recriar utilitários Tailwind dentro do tema; use-os apenas onde não houver prop/estrutura já oferecida pelo Mantine.

8. Atualize imports e tipos:
   - Remova imports de componentes customizados que existiam apenas para abstrair Tailwind.
   - Adicione imports de `@mantine/core`, `@mantine/hooks` e demais pacotes usados.
   - Ajuste os tipos TypeScript das props para refletir as novas assinaturas (`ComponentProps<typeof Button>`, tipos específicos do Mantine, etc.).

Ao final, retorne apenas o novo componente Mantine completamente convertido, com:

- Todos os imports atualizados.
- Nenhum Tailwind residual desnecessário.
- Tipos TypeScript coerentes com os componentes Mantine usados.
