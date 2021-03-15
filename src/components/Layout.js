// @flow
import React, { type Node, type Element } from 'react';
import Container from '@material-ui/core/Container';

import { Header, Footer } from './';

import styles from './Layout.module.scss';

type Props = {
  children: Node,
};

type signature = (Props) => Element<"div">;

const Layout: signature = ({ children }) => (
  <div className={styles.container}>
    <Header />
    <Container maxWidth="md">
      {children}
    </Container>
    <Footer />
  </div>
);

export default Layout;
