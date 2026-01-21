```markdown
# Skill: tailwind-to-mantine-components

Esta skill instrui agentes de IA a converter componentes React com Tailwind CSS para a biblioteca Mantine UI.

## Instalação

1. Copie a pasta `tailwind-to-mantine-components/` para `.github/skills/` ou para a raiz do projeto
2. Configure seu agente para carregar o arquivo `SKILL.md` como contexto

## Estrutura
```

tailwind-to-mantine-components/
├─ SKILL.md # Instruções principais
├─ prompts/ # Sub-prompts especializados
│ ├─ mapping-guidelines.md # Mapeamento classes → props
│ ├─ layout-conversion.md # Flex/Grid → Group/Stack/Grid
│ ├─ forms-and-inputs.md # Inputs e useForm
│ ├─ feedback-and-overlays.md # Alerts, Modals, Tooltips
│ └─ theming-and-tokens.md # MantineProvider e tokens
├─ examples/ # Exemplos antes/depois
│ ├─ button-card-tailwind.tsx
│ ├─ button-card-mantine.tsx
│ ├─ form-tailwind.tsx
│ └─ form-mantine.tsx
├─ snippets/ # Código reutilizável
│ ├─ mantine-provider-setup.tsx
│ └─ tailwind-mantine-coexistence.css
└─ docs/
└─ README.md

````

## Uso com GitHub Copilot (VS Code)

### Opção 1: Copilot Chat
1. Abra o Copilot Chat (`Ctrl+Shift+I` ou `Cmd+Shift+I`)
2. Cole o conteúdo de `SKILL.md` como contexto inicial
3. Envie o componente Tailwind para conversão

### Opção 2: Copilot Edits
1. Selecione o arquivo `.tsx` com o componente Tailwind
2. Use `Ctrl+I` para abrir inline edit
3. Instrua: "Converta para Mantine seguindo a skill em .github/skills/tailwind-to-mantine-components"

### Opção 3: Copilot Workspace (se disponível)
Configure a skill como instrução persistente no `.github/copilot-instructions.md`.

## Dependências Mantine

```bash
npm install @mantine/core @mantine/hooks @mantine/form
````
