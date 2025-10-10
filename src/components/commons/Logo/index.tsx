import { Group, Image, Text } from '@mantine/core';

export function Logo() {
  return (
    <Group gap="xs">
      <Image src="icon.svg" alt="NextJS Base Logo" width={30} height={30} />
      <Text fw={700}>NextJS Base</Text>
    </Group>
  );
}
