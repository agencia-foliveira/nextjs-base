'use client';
import { Anchor, Button, Group, Paper, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import Link from 'next/link';
import { ForgotPasswordSchema } from '../../services';

export function ForgotPassword() {
  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: zod4Resolver(ForgotPasswordSchema),
  });

  const handleSubmit = (values: typeof form.values) => {
    // console.log(values);
    throw new Error(`Function not implemented. ${JSON.stringify(values)}`);
  };

  return (
    <Paper radius="md" p="lg" withBorder>
      <Stack>
        <Text ta="center" fz="lg" fw={500}>
          Esqueceu sua senha?
        </Text>
        <Text c="dimmed" fz="sm" ta="center">
          Insira seu e-mail abaixo para receber um link de recuperação de senha.
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="E-mail"
              placeholder="email@exemplo.com"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email}
              radius="md"
            />

            <Group justify="space-between">
              <Button type="submit" radius="xl" fullWidth>
                Enviar link de recuperação
              </Button>
            </Group>
          </Stack>
        </form>

        <Group justify="center">
          <Anchor component={Link} href="/sign-in" type="button" c="dimmed" size="xs" ta="center">
            Lembrou sua senha? Entre agora!
          </Anchor>
        </Group>
      </Stack>
    </Paper>
  );
}
