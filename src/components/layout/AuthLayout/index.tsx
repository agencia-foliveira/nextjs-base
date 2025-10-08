'use client';
import { Paper } from '@mantine/core';
import classes from './AuthLayout.module.css';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form}>{children}</Paper>
    </div>
  );
}
