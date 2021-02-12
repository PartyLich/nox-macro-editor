// @flow
import React, { type Node } from 'react';
import Container from '@material-ui/core/Container';

import { Header, Footer } from './';

import styles from './Layout.module.scss';

type Props = {
  children: Node,
}

const Layout = ({ children }: Props) => (
  <div className={styles.container}>
    <Header />
    <Container maxWidth="md">
      {children}
    </Container>
    <Footer />
  </div>
);

export default Layout;
