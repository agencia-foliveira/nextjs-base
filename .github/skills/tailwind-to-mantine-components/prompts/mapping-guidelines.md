---
name: mapping-guidelines
description: Diretrizes gerais de mapeamento Tailwind → Mantine
---

## Mapeamento de Classes Tailwind para Props Mantine

### Espaçamento (Spacing)

| Tailwind      | Mantine Prop  | Exemplo                    |
| ------------- | ------------- | -------------------------- |
| `p-4`, `px-4` | `p`, `px`     | `<Box p="md">` ou `p={16}` |
| `m-4`, `my-2` | `m`, `my`     | `<Card m="lg" my="xs">`    |
| `gap-4`       | `gap` ou `g`  | `<Group gap="md">`         |
| `space-y-4`   | `<Stack gap>` | `<Stack gap="md">`         |

### Bordas e Radius

| Tailwind             | Mantine Prop | Exemplo                |
| -------------------- | ------------ | ---------------------- |
| `rounded-md`         | `radius`     | `<Card radius="md">`   |
| `rounded-full`       | `radius`     | `<Avatar radius="xl">` |
| `border`, `border-*` | `withBorder` | `<Card withBorder>`    |

### Cores

| Tailwind            | Mantine Prop    | Exemplo                 |
| ------------------- | --------------- | ----------------------- |
| `bg-blue-500`       | `bg` ou `color` | `<Button color="blue">` |
| `text-gray-600`     | `c` (color)     | `<Text c="dimmed">`     |
| `hover:bg-blue-700` | Automático      | Mantine gerencia hover  |

### Tipografia

| Tailwind          | Mantine Prop | Componente Recomendado |
| ----------------- | ------------ | ---------------------- |
| `text-xl`         | `fz` (size)  | `<Text fz="xl">`       |
| `font-semibold`   | `fw`         | `<Text fw={600}>`      |
| `text-center`     | `ta`         | `<Text ta="center">`   |
| `leading-relaxed` | `lh`         | `<Text lh="lg">`       |

### Dimensões

| Tailwind   | Mantine Prop | Exemplo                 |
| ---------- | ------------ | ----------------------- |
| `w-full`   | `w="100%"`   | `<Button w="100%">`     |
| `max-w-sm` | `maw`        | `<Container maw={384}>` |
| `h-10`     | `h`          | `<Box h={40}>`          |
