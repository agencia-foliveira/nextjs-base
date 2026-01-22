---
name: forms-and-inputs
description: Conversão de formulários e inputs Tailwind para Mantine
---

## Inputs de Texto

**Tailwind:**

```tsx
<input
  type="text"
  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2"
  placeholder="Nome completo"
/>
```

**Mantine:**

```tsx
import { TextInput } from '@mantine/core';

<TextInput placeholder="Nome completo" radius="md" />;
```

## Select/Dropdown

**Tailwind:**

```tsx
<select className="w-full rounded-md border px-4 py-2">
  <option value="">Selecione...</option>
  <option value="1">Opção 1</option>
</select>
```

**Mantine:**

```tsx
import { Select } from '@mantine/core';

<Select
  placeholder="Selecione..."
  data={[
    { value: '1', label: 'Opção 1' },
    { value: '2', label: 'Opção 2' },
  ]}
/>;
```

## Checkbox e Radio

**Tailwind checkbox:**

```tsx
<label className="flex items-center gap-2">
  <input type="checkbox" className="rounded" />
  <span>Aceito os termos</span>
</label>
```

**Mantine:**

```tsx
import { Checkbox } from '@mantine/core';

<Checkbox label="Aceito os termos" />;
```

## Integração com useForm

Quando o componente original usa estado de formulário, migre para `@mantine/form`:

```tsx
import { useForm } from '@mantine/form';
import { TextInput, Button, Stack } from '@mantine/core';

function ContactForm() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', email: '' },
    validate: {
      name: (value) => (value.length < 2 ? 'Nome muito curto' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email inválido'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Stack gap="md">
        <TextInput
          label="Nome"
          placeholder="Seu nome"
          key={form.key('name')}
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Email"
          placeholder="email@exemplo.com"
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
        <Button type="submit">Enviar</Button>
      </Stack>
    </form>
  );
}
```
