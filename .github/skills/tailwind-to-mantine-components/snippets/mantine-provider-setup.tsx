// src/providers/MantineProvider.tsx
import {
  MantineProvider as BaseMantineProvider,
  createTheme,
  MantineColorsTuple,
} from '@mantine/core';
import '@mantine/core/styles.css';

// Cores customizadas (opcional)
const brand: MantineColorsTuple = [
  '#f0f9ff',
  '#e0f2fe',
  '#bae6fd',
  '#7dd3fc',
  '#38bdf8',
  '#0ea5e9',
  '#0284c7',
  '#0369a1',
  '#075985',
  '#0c4a6e',
];

const theme = createTheme({
  primaryColor: 'brand',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  radius: {
    xs: '0.125rem',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  colors: {
    brand,
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        radius: 'md',
        shadow: 'sm',
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },
  },
});

interface Props {
  children: React.ReactNode;
}

export function MantineProvider({ children }: Props) {
  return (
    <BaseMantineProvider theme={theme} defaultColorScheme="light">
      {children}
    </BaseMantineProvider>
  );
}
