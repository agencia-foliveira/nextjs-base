---
name: appshell-conversion
description: Conversão de layouts de página/app shell Tailwind para AppShell do Mantine
---

## Quando usar AppShell

Use `AppShell` do Mantine quando encontrar estes padrões Tailwind:

```
├── Header fixo/sticky (navbar)
├── Sidebar fixa/lateral (menu de navegação)
├── Main content com padding lateral
├── Footer fixo ou com altura mínima
└── Layouts responsivos (sidebar colapsa em mobile)
```

## Padrões Tailwind → AppShell

### Layout Completo (Header + Sidebar + Main + Footer)

**Tailwind:**

```tsx
function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">Logo</div>
            <div className="flex items-center space-x-4">Menu items</div>
          </div>
        </nav>
      </header>

      <div className="flex min-h-screen-minus-header">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r flex flex-col">
          <nav className="flex-1 px-2 py-4 space-y-1">
            <a
              href="#"
              className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-900 bg-gray-50"
            >
              Dashboard
            </a>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6">{children}</main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">Footer</div>
      </footer>
    </div>
  );
}
```

**AppShell Mantine:**

```tsx
import { AppShell, Navbar, Header, Footer, Aside, Text, Button, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout } from '@tabler/icons-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <AppShell
      navbar={{
        width: 256,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      aside={{
        width: 256,
        breakpoint: 'sm',
      }}
      header={{ height: 64 }}
      footer={{ height: 64 }}
      padding="md"
    >
      <Header height={64} visibleFrom="sm">
        <div className="h-16 px-6 flex items-center justify-between">
          <Text size="lg" fw={700}>
            Logo
          </Text>
          <Button variant="subtle" leftSection={<IconLogout size={16} />}>
            Sair
          </Button>
        </div>
      </Header>

      <Navbar width={{ sm: 256 }} p="md" hiddenBreakpoint="sm" hidden={!opened} onHide={toggle}>
        <Navbar.Section grow component={ScrollArea}>
          <Button variant="subtle" fullWidth leftSection={<IconGauge size={16} />} c="dark" fz="sm">
            Dashboard
          </Button>
        </Navbar.Section>
      </Navbar>

      <AppShell.Main>{children}</AppShell.Main>

      <Footer height={64} visibleFrom="sm">
        <div className="h-16 px-6 flex items-center">
          <Text c="dimmed" size="sm">
            © 2026 Sua Empresa
          </Text>
        </div>
      </Footer>
    </AppShell>
  );
}
```

## Componentes do AppShell

| Seção  | Prop Mantine | Tailwind Equivalente | Props Importantes      |
| ------ | ------------ | -------------------- | ---------------------- |
| Header | `header`     | `sticky top-0`       | `height`, `withBorder` |
| Navbar | `navbar`     | `w-64 border-r`      | `width`, `collapsed`   |
| Main   | `main`       | `flex-1 p-6`         | `padding`, `mih`       |
| Footer | `footer`     | `border-t mt-auto`   | `height`               |
| Aside  | `aside`      | `w-80 ml-auto`       | `width`, `position`    |

## Configurações Responsivas

```tsx
<AppShell
  navbar={{
    width: { base: 256, lg: 300 },        // Largura variável
    breakpoint: 'sm',                     // Esconde em < sm
    collapsed: { mobile: !opened },       // Colapsa em mobile
  }}
  aside={{
    width: 256,
    breakpoint: 'md',                     // Só aparece em md+
    position: { sm: 'right', lg: 'left' } // Posição variável
  }}
  header={{ height: { base: 64, md: 80 } }} // Altura variável
>
```

## Estados Mobile (Drawer)

```tsx
// Hook para mobile drawer
const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);

// Header com hamburger
<Header height={64}>
  <div className="h-16 px-4 flex items-center justify-between">
    <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" />
    <Text fw={700}>Logo</Text>
  </div>
</Header>

// Navbar com controle mobile
<Navbar hiddenBreakpoint="sm" hidden={!mobileOpened} onHide={toggleMobile}>
```

## Fluxo de Conversão

1. **Identifique seções fixas**: header, sidebar, footer → `Header`, `Navbar`, `Footer`
2. **Conteúdo principal**: qualquer `<main>` ou `flex-1` → `AppShell.Main`
3. **Mobile behavior**: sticky/colapsável → `breakpoint` + `useDisclosure`
4. **Padding/margins**: `p-6`, `px-4` → prop `padding` do AppShell
5. **Scroll**: sidebar longa → `ScrollArea` no `Navbar.Section`
6. **Navegação**: links no sidebar → `NavLink`, `Button` com `variant="subtle"`

## Imports Necessários

```tsx
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Burger,
  Button,
  NavLink,
  ScrollArea,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconGauge, IconUser, IconLogout } from '@tabler/icons-react';
```

## Dicas Importantes

- **Sempre use `ScrollArea`** no `Navbar.Section grow` para sidebars longas
- **Burger é essencial** para mobile: `Burger opened={mobileOpened} onClick={toggleMobile}`
- **Alturas fixas**: defina `height={64}` ou `height={{ base: 56, md: 72 }}`
- **Breakpoint padrão**: `'sm'` esconde navbar em mobile automaticamente
- **Padding global**: `padding="md"` aplica padding no `AppShell.Main`
