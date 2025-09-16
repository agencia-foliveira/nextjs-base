import { ptBR } from '@clerk/localizations';
import { ClerkProvider } from '@clerk/nextjs';
import type React from 'react';

export function CustomClerkProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      localization={ptBR}
      appearance={{
        baseTheme: undefined, // ou dark
        variables: {
          // Cores principais
          colorPrimary: 'hsl(var(--primary))',
          colorForeground: 'hsl(var(--primary-foreground))',
          colorBackground: 'hsl(var(--background))',
          colorText: 'hsl(var(--foreground))',
          colorTextSecondary: 'hsl(var(--muted-foreground))',
          colorDanger: 'hsl(var(--destructive))',
          colorWarning: 'hsl(var(--warning))',
          colorSuccess: 'hsl(var(--success))',

          // Typography
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',

          // Borders
          borderRadius: 'var(--radius)',
        },
        elements: {
          // Container principal
          card: 'shadow-lg border border-border bg-card text-card-foreground',

          // Header
          headerTitle: 'text-2xl font-semibold tracking-tight',
          headerSubtitle: 'text-sm text-muted-foreground',

          // Formulários
          formFieldInput: `
            flex h-10 w-full rounded-md border border-input 
            bg-background px-3 py-2 text-sm ring-offset-background 
            file:border-0 file:bg-transparent file:text-sm file:font-medium 
            placeholder:text-muted-foreground 
            focus-visible:outline-none focus-visible:ring-2 
            focus-visible:ring-ring focus-visible:ring-offset-2 
            disabled:cursor-not-allowed disabled:opacity-50
          `,

          // Botões
          formButtonPrimary: `
            inline-flex items-center justify-center rounded-md text-sm 
            font-medium ring-offset-background transition-colors 
            focus-visible:outline-none focus-visible:ring-2 
            focus-visible:ring-ring focus-visible:ring-offset-2 
            disabled:pointer-events-none disabled:opacity-50
            bg-primary text-primary-foreground hover:bg-primary/90 
            h-10 px-4 py-2
          `,

          // Links
          formFieldAction: 'text-primary hover:underline text-sm',

          // Footer
          footerAction: 'text-primary hover:underline',
          footerActionText: 'text-muted-foreground',
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
