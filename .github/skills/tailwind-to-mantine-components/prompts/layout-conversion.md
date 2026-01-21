---
name: layout-conversion
description: Conversão de layouts Tailwind (flex/grid) para componentes Mantine
---

## Layouts Flexbox

### Horizontal simples (flex + gap)

**Tailwind:**

```tsx
<div className="flex items-center gap-4">
  <span>Item 1</span>
  <span>Item 2</span>
</div>
```

**Mantine:**

```tsx
import { Group } from "@mantine/core";

<Group gap="md" align="center">
  <span>Item 1</span>
  <span>Item 2</span>
</Group>;
```

### Vertical (flex-col + gap)

**Tailwind:**

```tsx
<div className="flex flex-col gap-4">
  <p>Linha 1</p>
  <p>Linha 2</p>
</div>
```

**Mantine:**

```tsx
import { Stack } from "@mantine/core";

<Stack gap="md">
  <p>Linha 1</p>
  <p>Linha 2</p>
</Stack>;
```

### Flex avançado (justify, wrap, direction)

**Tailwind:**

```tsx
<div className="flex flex-wrap justify-between items-start gap-6">
  {/* children */}
</div>
```

**Mantine:**

```tsx
import { Flex } from "@mantine/core";

<Flex wrap="wrap" justify="space-between" align="flex-start" gap="xl">
  {/* children */}
</Flex>;
```

## Layouts Grid

### Grid responsivo

**Tailwind:**

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* cards */}
</div>
```

**Mantine:**

```tsx
import { SimpleGrid } from "@mantine/core";

<SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
  {/* cards */}
</SimpleGrid>;
```

### Grid com spans variados

**Tailwind:**

```tsx
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-8">Main</div>
  <div className="col-span-4">Sidebar</div>
</div>
```

**Mantine:**

```tsx
import { Grid } from "@mantine/core";

<Grid gutter="md">
  <Grid.Col span={8}>Main</Grid.Col>
  <Grid.Col span={4}>Sidebar</Grid.Col>
</Grid>;
```

## Containers e Wrappers

| Tailwind                | Mantine Equivalente                      |
| ----------------------- | ---------------------------------------- |
| `container mx-auto`     | `<Container />`                          |
| `bg-white shadow-md`    | `<Paper shadow="md" />`                  |
| `border rounded-lg p-4` | `<Card withBorder radius="md" p="md" />` |
