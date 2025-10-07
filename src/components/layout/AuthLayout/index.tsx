'use client';
import { Paper, Title } from '@mantine/core';
import classes from './AuthLayout.module.css';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form}>
        <Title order={2} className={classes.title}>
          Bem vindo de volta!
        </Title>

        {children}
      </Paper>
    </div>
  );
}
