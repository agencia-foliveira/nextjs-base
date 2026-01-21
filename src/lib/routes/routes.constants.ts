import type { Route } from 'next';
import type { RouteObject } from './routes.types';

// TODO: Encontrar uma forma de forçar que essas constantes sejam a únicas fontes de rota na aplicação.
export const PRIVATE_ROUTES: Record<Route<string> | string, RouteObject> = {
  dashboard: {
    path: '/dashboard',
    label: 'Dashboard',
    permissions: [],
  },
  configuracoes: {
    path: '/configuracoes',
    label: 'Configurações',
    permissions: ['products.read', 'products.write'],
  },
  usuarios: {
    path: '/usuarios',
    label: 'Usuários',
    permissions: ['users.read', 'users.write'],
  },
  'minha-conta': {
    path: '/minha-conta',
    label: 'Minha Conta',
    permissions: ['profile.read', 'profile.write'],
  },
};

export const AUTH_ROUTES: Record<string, RouteObject> = {
  'alterar-senha': {
    path: '/alterar-senha',
    label: 'Alterar senha',
  },
  'cadastre-se': {
    path: '/cadastre-se',
    label: 'Cadastre-se',
  },
  'esqueci-minha-senha': {
    path: '/esqueci-minha-senha',
    label: 'Esqueci minha senha',
  },
  login: {
    path: '/login',
    label: 'Login',
  },
};

export const PUBLIC_ROUTES: Record<string, RouteObject> = {
  home: {
    path: '/',
    label: 'Home',
  },
  documentacao: {
    path: '/documentacao',
    label: 'Documentação',
  },
  'politica-de-privacidade': {
    path: '/politica-de-privacidade',
    label: 'Política de Privacidade',
  },
  precos: {
    path: '/precos',
    label: 'Preços',
  },
  stripe: {
    path: '/stripe/success',
    label: 'Pagamento realizado com sucesso',
  },
  'termos-de-uso': {
    path: '/termos-de-uso',
    label: 'Termos de Uso',
  },
};
