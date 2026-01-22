import { Anchor, Container, Text } from '@mantine/core';
import Link from 'next/link';

import { Logo } from '../../../commons/Logo';

import classes from './PublicFooter.module.css';

const data = [
  {
    title: 'Next Starter',
    links: [
      { label: 'Preços', link: '/precos' },
      { label: 'Documentação', link: '/manual' },
    ],
  },
  {
    title: 'Sobre',
    links: [
      { label: 'Política de Privacidade', link: '/politica-de-privacidade' },
      { label: 'Termos de Uso', link: '/termos-de-uso' },
    ],
  },
];

export function PublicFooter() {
  const groups = data.map((group) => {
    const links = group.links.map((link) => {
      const isInternal = link.link.startsWith('/');
      return isInternal ? (
        <Link key={link.link} href={link.link} className={classes.link}>
          {link.label}
        </Link>
      ) : (
        <Text<'a'> key={link.link} className={classes.link} component="a" href={link.link}>
          {link.label}
        </Text>
      );
    });

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Logo size={96} />
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © {new Date().getFullYear()} Next Starter. Todos os direitos reservados. ·{' '}
          <Anchor href="mailto:agencia.foliveira@gmail.com">agencia.foliveira@gmail.com</Anchor>
        </Text>
      </Container>
    </div>
  );
}
