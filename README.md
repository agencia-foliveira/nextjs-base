# Next Starter - Sistema Inteligente de Otimização de Inventário

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-brightgreen)

## 📋 Visão Geral do Produto

**Next Starter** é uma plataforma SaaS de otimização de inventário que conecta-se ao Bling ERP para analisar desempenho de estoque, identificar riscos e oportunidades e fornecer recomendações acionáveis com impacto financeiro mensurável. A solução transforma dados operacionais brutos em ações priorizadas, contextuais e alinhadas aos objetivos da operação.

### 🎯 Objetivos Principais

| Objetivo                    | Meta                             | Status |
| --------------------------- | -------------------------------- | ------ |
| Reduzir rupturas de estoque | Diminuir eventos de falta em 35% | 🎯     |
| Reduzir dead stock          | Diminuir capital parado em 25%   | 🎯     |
| Otimizar preços             | Aumentar margem em 15%           | 🎯     |
| Insights priorizados        | Tempo de execução < 10 minutos   | ✅     |
| Automação de decisões       | 20% das ações automatizadas      | 🔄     |

## 🚀 Começando

### Pré-requisitos

- Node.js 20.9+
- PostgreSQL 16+
- Conta no Bling ERP (para integração)
- Variáveis de ambiente configuradas

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-org/next-starter.git
cd next-starter

# Instale dependências
pnpm install

# Configure variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais

# Configure o banco de dados
npx prisma generate
npx prisma db push

# Execute em modo desenvolvimento
pnpm dev

### Recursos públicos

- Homepage: https://nextstarter.app/
- Manual do usuário: https://docs.nextstarter.app/manual
- Vídeo demonstrativo: https://youtu.be/next-starter-demo
```

## 🏗️ Arquitetura

### Stack Tecnológica

- **Frontend**: Next.js 16 (App Router), React 19, Mantine UI
- **Backend**: Next.js API Routes, Server Actions, Inngest (background jobs)
- **Banco de Dados**: PostgreSQL com Prisma ORM
- **Autenticação**: NextAuth.js
- **Logging**: Pino
- **Testes**: E2E Playwright
- **Observabilidade**: OpenTelemetry
- **Deploy**: Containerizado com Docker, CI/CD GitHub Actions

### Estrutura do Projeto

```
next-starter/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Rotas de autenticação
│   │   ├── (public)/           # Rotas públicas
│   │   ├── (private)/          # Rotas privadas (dashboard)
│   │   ├── api/                # API Routes
│   │   │   ├── alerts/         # API de alertas
│   │   │   ├── auth/           # API de autenticação
│   │   │   ├── inngest/        # API de uso do Inngest
│   │   │   └── integrations/   # Integrações
│   │   │       └── bling/      # Integração Bling
│   │   └── layout.tsx          # Layout principal
│   ├── components/             # Componentes React
│   │   ├── alerts/             # Componentes de alerta
│   │   ├── dashboard/          # Componentes do dashboard
│   │   └── ui/                 # Componentes de UI
│   ├── handlers/               # Inngest functions
│   │   └── generate-alerts.ts  # Geração de alertas
│   ├── lib/                    # Utilitários e configurações
│   │   ├── bling/              # Integração Bling
│   │   │   ├── bling-types.ts  # Tipos TypeScript
│   │   │   ├── bling-utils.ts  # Funções auxiliares
│   │   │   └── bling-price-engine.ts # Motor de preços
│   │   ├── prisma.ts           # Cliente Prisma
│   │   └── utils.ts            # Utilitários gerais
│   └── types/                  # Tipos TypeScript
├── prisma/
│   └── schema.prisma           # Schema do banco de dados
├── public/                     # Arquivos estáticos
└── package.json
```

## 📊 Funcionalidades

### 🚨 Sistema de Alertas

#### Tipos de Alertas

1. **Ruptura de Estoque** - Risco de falta do produto em estoque
   - Calcula VVD (Vendas por Dia)
   - Dias restantes de estoque
   - Ponto de reposição do estoque
   - Níveis de risco: Crítico, Alto, Médio, Baixo

2. **Capital Parado** - Valor em dinheiro parado em estoque
   - Identifica produtos sem vendas
   - Calcula capital imobilizado
   - Sugere estratégias de liquidação

3. **Oportunidades** - Crescimento e preço
   - Detecta crescimento de demanda
   - Sugere ajustes de preço
   - Identifica novos produtos promissores

### 🔧 Motor de Recomendações

#### Cálculos Implementados

- **VVD Real**: Vendas por dia considerando apenas dias com estoque
- **VVD Simples**: Média sobre janela completa
- **Dias Restantes**: Stock / VVD
- **Ponto de reposição**: VVD × (Tempo Reposição + Dias Segurança)
- **Capital Imobilizado**: Stock × (Custo ou 60% do Preço Venda)
- **Custo de Capital**: 2% ao mês sobre capital imobilizado
- **Custo de Armazenamento**: 1% ao mês sobre capital imobilizado

### 📈 Dashboard

#### Principais Métricas

- **Overview Financeiro**: Capital total imobilizado, perda esperada
- **Rupturas Críticas**: Produtos com menos de 5 dias de estoque
- **Dead Stock**: Produtos sem venda há mais de 90 dias
- **Oportunidades**: Produtos com crescimento >30%

## 🔌 Integração Bling

### Fluxo de Sincronização

```typescript
// Exemplo de fluxo
1. OAuth 2.0 com Bling
2. Importação de produtos
3. Importação de histórico de vendas (30, 60, 90 dias)
4. Importação de estoques atualizados
5. Processamento em background
6. Geração de alertas
7. Atualização do dashboard
```

### Webhooks Suportados

- Novas vendas
- Atualizações de estoque
- Mudanças de preço
- Novos produtos

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes de integração
npm run test:integration

# Testes E2E
npm run test:e2e

# Cobertura de código
npm run test:coverage
```

## 🚀 Deployment

### Variáveis de Ambiente Necessárias

```env
# Banco de Dados
DATABASE_URL="postgresql://user:password@host:5432/db"

# Autenticação
NEXTAUTH_SECRET=""
NEXTAUTH_URL="https://seusite.com"

# Bling
BLING_CLIENT_ID=""
BLING_CLIENT_SECRET=""
BLING_REDIRECT_URI=""

# Recursos públicos Next Starter
NEXT_PUBLIC_APP_NAME="Next Starter"
NEXT_PUBLIC_APP_DESCRIPTION="Plataforma inteligente que conecta dados do Bling ERP para otimizar estoque, reduzir rupturas e destravar capital."
NEXT_PUBLIC_APP_HOMEPAGE_URL="https://nextstarter.app/"
NEXT_PUBLIC_APP_MANUAL_URL="https://docs.nextstarter.app/manual"
NEXT_PUBLIC_APP_VIDEO_URL="https://youtu.be/next-starter-demo"

# Inngest
INNGEST_EVENT_KEY=""
INNGEST_SIGNING_KEY=""
```

### Scripts de Deploy

### Deploy em VPS (Docker Compose + Traefik)

Este projeto fornece um `docker-compose.yml` pronto para produção com Traefik (HTTPS automático via Let's Encrypt), Postgres e o app Next.js (modo standalone).

#### Pré-requisitos na VPS

- Docker + Docker Compose Plugin instalados
- DNS do seu `DOMAIN` apontando para o IP da VPS
- Porta 80 e 443 liberadas no firewall

#### Passos

1. Configure as variáveis no arquivo `.env` conforme modelo em [.env.example](.env.example). Para produção, use:
   - `DOMAIN`, `LETSENCRYPT_EMAIL`
   - `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
   - `DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@nextstarter_db:5432/${POSTGRES_DB}?schema=public`
   - `NEXTAUTH_SECRET` (forte) e `NEXTAUTH_URL=https://${DOMAIN}`

2. Suba os serviços com Docker Compose:

```bash
docker compose up -d --build
```

3. Verifique logs (útil para primeira subida):

```bash
docker logs -f traefik
docker logs -f nextstarter_migrate
docker logs -f nextstarter_app
```

O serviço `migrate` garante que migrações e seed sejam aplicados antes do app iniciar.

### CI/CD: Deploy automático via GitHub Actions

Há uma workflow pronta em [.github/workflows/deploy.yml](.github/workflows/deploy.yml) que:

- Faz upload do projeto para a VPS via SSH
- Gera o arquivo `.env` remoto a partir de Secrets do GitHub
- Executa `docker compose up -d --build`

#### Secrets exigidos no repositório

- `SSH_HOST`, `SSH_USER`, `SSH_KEY` (chave privada), `SSH_PORT` (opcional)
- `DOMAIN`, `LETSENCRYPT_EMAIL`
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
- `NEXTAUTH_SECRET`
- Integrações opcionais: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `BLING_CLIENT_ID`, `BLING_CLIENT_SECRET`, `INNGEST_SIGNING_KEY`, `INNGEST_EVENT_KEY`, `BREVO_API_KEY`, `BREVO_SENDER_NAME`, `BREVO_SENDER_EMAIL`

##### Email (Brevo)

- SDK: `@getbrevo/brevo` (já instalado)
- Variáveis: `BREVO_API_KEY`, `BREVO_SENDER_NAME`, `BREVO_SENDER_EMAIL`
- Implementação: ver `src/lib/brevo/index.ts` usando `TransactionalEmailsApi.sendTransacEmail()`

#### Disparo

- `push` na branch `main` ou manual via "Run workflow".

#### Observações

- A primeira emissão de certificado pode levar alguns minutos.
- Para atualizar a aplicação, basta novo commit na `main` (ou rodar manualmente a workflow).

## 📈 Métricas de Sucesso

### KPIs Monitorados

1. **Taxa de Ruptura**: < 5% de falsos positivos
2. **Tempo de Resposta**: API < 150ms
3. **Cobertura de Código**: > 80%
4. **Uptime**: 99.9%
5. **Satisfação do Usuário**: NPS > 50

### Logs e Monitoramento

- Logs estruturados com Pino
- Métricas de performance
- Alertas de erro em tempo real
- Dashboard de analytics

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Convenções de Código

- TypeScript estrito
- ESLint configurado
- Prettier para formatação
- Commits semânticos

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Suporte

- **Manual do usuário**: [docs.nextstarter.app/manual](https://docs.nextstarter.app/manual)
- **Vídeo demonstrativo**: [youtube.com/watch?v=next-starter-demo](https://youtu.be/next-starter-demo)
- **Documentação técnica**: [docs.nextstarter.com](https://docs.nextstarter.com)
- **Suporte Técnico**: support@nextstarter.com
- **Comunidade**: [Discord](https://discord.gg/nextstarter)
- **Status**: [status.nextstarter.com](https://status.nextstarter.com)

## 🙏 Agradecimentos

- Equipe de desenvolvimento Next Starter
- Comunidade open source
- Usuários beta testers
- Parceiros de integração

---

**Next Starter** - Transformando dados de estoque em lucro.
