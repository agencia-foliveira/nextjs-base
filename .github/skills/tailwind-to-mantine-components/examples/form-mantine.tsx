import { useForm } from '@mantine/form';
import { TextInput, Textarea, Button, Stack, Box } from '@mantine/core';

export function ContactForm() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Nome muito curto' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email inválido'),
      message: (value) => (value.length < 10 ? 'Mensagem muito curta' : null),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
  };

  return (
    <Box maw={448}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Nome"
            placeholder="Seu nome"
            withAsterisk
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Email"
            placeholder="email@exemplo.com"
            withAsterisk
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <Textarea
            label="Mensagem"
            placeholder="Sua mensagem..."
            minRows={4}
            withAsterisk
            key={form.key('message')}
            {...form.getInputProps('message')}
          />
          <Button type="submit" fullWidth>
            Enviar
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
