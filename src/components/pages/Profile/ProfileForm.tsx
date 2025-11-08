'use client';
import {
  Avatar,
  Button,
  Card,
  Divider,
  FileInput,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { AccountRemoveModal } from './AccountRemoveModal';

export default function ProfileForm() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = useAuth();

  const profileForm = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      avatar: null as File | null,
      acceptedTerms: false,
    },
    validate: {
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'E-mail inválido'),
    },
  });

  async function handleProfileSubmit(values: any) {
    // Validate / sanitize in backend
    // Call PATCH /api/user
    // console.log('save profile', values);

    // Upload avatar if exists
    if (values.avatar) {
      // use FormData and secure endpoint
    }
    // append AuditLog in backend
  }

  return (
    <>
      <Card shadow="sm">
        <Title id="my-account" order={4}>
          Meu Perfil
        </Title>
        <Group>
          <Group>
            <Avatar radius="xl" size="lg" src={user?.avatar || undefined} />
            <div>
              <Text w={700}>{user?.name}</Text>
              <Text size="sm">{user?.email}</Text>
            </div>
          </Group>
          <Group>
            <Button variant="default" onClick={() => {}}>
              Editar Perfil
            </Button>
            <Button
              color="red"
              onClick={() => setShowDeleteModal(true)}
              leftSection={<IconTrash size={16} />}
            >
              Excluir conta
            </Button>
          </Group>
        </Group>

        <Divider my="md" />

        <form onSubmit={profileForm.onSubmit(handleProfileSubmit)}>
          <Stack>
            <TextInput label="Nome" {...profileForm.getInputProps('name')} required />
            <TextInput label="E-mail" {...profileForm.getInputProps('email')} required />
            <TextInput label="Telefone" {...profileForm.getInputProps('phone')} />
            <FileInput
              label="Avatar"
              placeholder="Escolha um arquivo"
              accept="image/*"
              {...profileForm.getInputProps('avatar')}
            />
            <Group>
              <Button type="submit">Salvar</Button>
            </Group>
          </Stack>
        </form>
      </Card>

      <AccountRemoveModal opened={showDeleteModal} toggle={() => setShowDeleteModal(false)} />
    </>
  );
}
