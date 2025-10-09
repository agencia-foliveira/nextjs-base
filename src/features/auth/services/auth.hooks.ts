import { notifications } from '@mantine/notifications';
import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/api';
import type { ForgotPasswordRequest, ResetPasswordRequest, SignUpRequest } from './auth.schemas';

export function useSignUp() {
  return useMutation({
    mutationFn: (data: SignUpRequest) => {
      return axiosInstance.post('/auth/sign-up', data);
    },
    onSuccess({ data }) {
      notifications.show({
        color: 'green',
        title: 'Sucesso!',
        message:
          data?.message || 'Conta criada com sucesso! Verifique seu e-mail para ativar a conta.',
      });
    },
    onError(error) {
      notifications.show({
        color: 'red',
        title: 'Ops! Algo deu errado',
        message: error.message || 'Erro ao criar conta',
      });
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => {
      return axiosInstance.post('/auth/forgot-password', data);
    },
    onSuccess({ data }) {
      notifications.show({
        color: 'green',
        title: 'Sucesso!',
        message:
          data?.message ||
          'E-mail de recuperação enviado com sucesso! Verifique sua caixa de entrada.',
      });
    },
    onError(error) {
      notifications.show({
        color: 'red',
        title: 'Ops! Algo deu errado',
        message: error.message || 'Erro ao enviar e-mail de recuperação',
      });
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => {
      return axiosInstance.post('/auth/reset-password', data);
    },
    onSuccess({ data }) {
      notifications.show({
        color: 'green',
        title: 'Sucesso!',
        message:
          data?.message ||
          'Senha redefinida com sucesso! Você já pode fazer login com sua nova senha.',
      });
    },
    onError(error) {
      notifications.show({
        color: 'red',
        title: 'Ops! Algo deu errado',
        message: error.message || 'Erro ao redefinir senha',
      });
    },
  });
}

export function useVerifyResetToken(token?: string | null) {
  return useQuery<{ isValid: boolean }>({
    queryKey: ['verify-reset-token', token],
    enabled: !!token,
    queryFn: () => {
      return axiosInstance
        .get('/auth/reset-password', {
          params: { token },
        })
        .then((res) => res.data);
    },
  });
}
