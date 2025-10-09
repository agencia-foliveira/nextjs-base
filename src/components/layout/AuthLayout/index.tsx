'use client';
import { Paper, ScrollArea } from '@mantine/core';
import classes from './AuthLayout.module.css';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form}>
        <ScrollArea.Autosize mah={700}>{children}</ScrollArea.Autosize>
      </Paper>
    </div>
  );
}
