import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import type { SignUpRequest } from './auth.schemas';

export function useSignUp() {
  return useMutation({
    mutationFn: (data: SignUpRequest) => {
      return fetch('/api/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          notifications.show({
            color: 'green',
            title: 'Sucesso',
            message: 'Conta criada com sucesso! Verifique seu e-mail para ativar a conta.',
          });
          return data;
        })
        .catch((error) => {
          notifications.show({
            color: 'red',
            title: 'Erro',
            message: error.message || 'Erro ao criar conta',
          });
          return Promise.reject(error);
        });
    },
  });
}
