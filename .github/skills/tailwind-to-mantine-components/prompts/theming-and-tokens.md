---
name: theming-and-tokens
description: Configuração de tema e tokens de design Mantine
---

## Configuração do MantineProvider

Todo projeto Mantine deve ter um `MantineProvider` na raiz:

```tsx
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";

const theme = createTheme({
  primaryColor: "blue",
  fontFamily: "Inter, sans-serif",
  radius: {
    xs: "0.125rem",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    xl: "2rem",
  },
  colors: {
    // Cores customizadas (array de 10 shades)
    brand: [
      "#f0f9ff",
      "#e0f2fe",
      "#bae6fd",
      "#7dd3fc",
      "#38bdf8",
      "#0ea5e9",
      "#0284c7",
      "#0369a1",
      "#075985",
      "#0c4a6e",
    ],
  },
});

function App({ children }) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
```

## Mapeamento Tailwind Colors → Mantine

| Tailwind Color | Mantine Equivalente       |
| -------------- | ------------------------- |
| `gray-*`       | `gray` (built-in)         |
| `blue-*`       | `blue` (built-in)         |
| `red-*`        | `red` (built-in)          |
| `green-*`      | `green` ou `teal`         |
| Custom colors  | Definir em `theme.colors` |

## Usando Tokens no Componente

```tsx
// Em vez de className="text-blue-600"
<Text c="blue.6">Texto azul</Text>

// Em vez de className="bg-gray-100 p-4"
<Box bg="gray.1" p="md">Conteúdo</Box>

// Em vez de className="rounded-lg shadow-md"
<Paper radius="lg" shadow="md">Card</Paper>
```

## Variantes de Componentes

| Tailwind Pattern            | Mantine Variant         |
| --------------------------- | ----------------------- |
| `bg-blue-600 text-white`    | `variant="filled"`      |
| `border border-blue-600`    | `variant="outline"`     |
| `bg-blue-100 text-blue-700` | `variant="light"`       |
| `text-blue-600` (só texto)  | `variant="subtle"`      |
| `bg-transparent`            | `variant="transparent"` |
