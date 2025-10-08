'use client';
import { Button, Group, Paper, PasswordInput, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { ResetPasswordSchema } from '../../services';

export function ResetPassword() {
  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: zod4Resolver(ResetPasswordSchema),
  });

  const handleSubmit = (values: typeof form.values) => {
    throw new Error(`Function not implemented. ${JSON.stringify(values)}`);
  };

  return (
    <Paper radius="md" p="lg" withBorder>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <PasswordInput
            label="Nova senha"
            placeholder="Insira sua nova senha"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password}
            radius="md"
          />

          <PasswordInput
            label="Confirmação de senha"
            placeholder="Confirme sua nova senha"
            value={form.values.confirmPassword}
            onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
            error={form.errors.confirmPassword}
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Button type="submit" radius="xl" fullWidth>
            Redefinir senha
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
