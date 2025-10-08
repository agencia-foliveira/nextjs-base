'use client';
import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import Link from 'next/link';
import { GoogleButton } from '@/components/commons/GoogleButton';
import { SignUpSchema } from '../../services';

export function SignUp() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    validate: zod4Resolver(SignUpSchema),
  });

  const handleSubmit = (values: typeof form.values) => {
    throw new Error(`Function not implemented. ${JSON.stringify(values)}`);
  };

  return (
    <Paper radius="md" p="lg" withBorder>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Name"
            placeholder="Seu nome"
            value={form.values.name}
            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            error={form.errors.name}
            radius="md"
          />

          <TextInput
            label="E-mail"
            placeholder="email@exemplo.com"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email}
            radius="md"
          />

          <PasswordInput
            label="Senha"
            placeholder="Sua senha"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password}
            radius="md"
          />

          <PasswordInput
            label="Confirmação de senha"
            placeholder="Confirme sua senha"
            value={form.values.confirmPassword}
            onChange={(event) => form.setFieldValue('confirmPassword', event.currentTarget.value)}
            error={form.errors.confirmPassword}
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Checkbox
            label="Aceito os termos e condições"
            checked={form.values.terms}
            onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            error={form.errors.terms}
          />
          <Button type="submit" radius="xl" fullWidth>
            Criar conta
          </Button>
        </Group>
      </form>

      <Divider label="Ou continue com" labelPosition="center" my="lg" />

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
      </Group>

      <Group justify="center">
        <Anchor component={Link} href="/sign-in" type="button" c="dimmed" size="xs" ta="center">
          Já tem uma conta? Entre agora!
        </Anchor>
      </Group>
    </Paper>
  );
}
