import * as React from 'react';
import { ReactElement } from 'react';
import Container from '@material-ui/core/Container';

import { Header, Footer } from './';

import styles from './Layout.module.scss';


type Props = {
  children: ReactElement;
};

type signature = (props: Props) => ReactElement<'div'>;

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
