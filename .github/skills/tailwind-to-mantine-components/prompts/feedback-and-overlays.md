---
name: feedback-and-overlays
description: Conversão de componentes de feedback e overlays Tailwind para Mantine
---

## Alerts e Notificações

**Tailwind Alert:**

```tsx
<div className="rounded-md border-l-4 border-red-500 bg-red-50 p-4">
  <p className="font-medium text-red-700">Erro ao salvar!</p>
  <p className="text-sm text-red-600">Verifique os campos obrigatórios.</p>
</div>
```

**Mantine:**

```tsx
import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

<Alert variant="light" color="red" title="Erro ao salvar!" icon={<IconAlertCircle />}>
  Verifique os campos obrigatórios.
</Alert>;
```

## Badges

**Tailwind:**

```tsx
<span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
  Ativo
</span>
```

**Mantine:**

```tsx
import { Badge } from '@mantine/core';

<Badge color="green" variant="light">
  Ativo
</Badge>;
```

## Modais

**Tailwind (estrutura básica):**

```tsx
{
  isOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2>Título do Modal</h2>
        <p>Conteúdo aqui...</p>
        <button onClick={() => setIsOpen(false)}>Fechar</button>
      </div>
    </div>
  );
}
```

**Mantine:**

```tsx
import { Modal, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Título do Modal">
        <p>Conteúdo aqui...</p>
      </Modal>
      <Button onClick={open}>Abrir Modal</Button>
    </>
  );
}
```

## Drawer (Sidebar deslizante)

**Mantine:**

```tsx
import { Drawer, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Menu" position="left">
        {/* Conteúdo do drawer */}
      </Drawer>
      <Button onClick={open}>Abrir Menu</Button>
    </>
  );
}
```

## Tooltips

**Tailwind (com biblioteca ou custom):**

```tsx
<div className="group relative">
  <button>Hover me</button>
  <span className="absolute hidden group-hover:block ...">Tooltip</span>
</div>
```

**Mantine:**

```tsx
import { Tooltip, Button } from '@mantine/core';

<Tooltip label="Tooltip">
  <Button>Hover me</Button>
</Tooltip>;
```
