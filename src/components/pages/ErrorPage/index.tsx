'use client';
import { Button, Container, Group, Text, Title } from '@mantine/core';
import { useEffect } from 'react';
import { CustomError, ErrorCodes } from '@/lib/errors';
import classes from './ErrorPage.module.css';

export default function ErrorPage({ error, reset }: { error: unknown; reset: () => void }) {
  const err = error as Error & { digest?: string };
  const errorCode =
    err instanceof CustomError
      ? err.code
      : (err.digest as ErrorCodes) || ErrorCodes.InternalServerError;

  const title = {
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
  }[errorCode];
  const errorMessages = {
    401: 'Unauthorized: You do not have the necessary permissions to access this resource.',
    403: 'Forbidden: Access to this resource is denied.',
    404: 'Not Found: The requested resource could not be found.',
    500: 'Internal Server Error: An unexpected error occurred on the server.',
  }[errorCode];

  useEffect(() => {
    console.error('Error occurred:', error);
  }, [error]);

  return (
    <Container className={classes.root}>
      <div className={classes.label}>{errorCode}</div>
      <Title className={classes.title}>{title}</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        {errorMessages}
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md" onClick={reset}>
          Try again
        </Button>
      </Group>
    </Container>
  );
}
