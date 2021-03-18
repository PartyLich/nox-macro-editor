import React from 'react';
import { ReactElement } from 'react';

import styles from './Header.module.scss';


type Props = {
  [key: string]: never,
};

type signature = (props: Props) => ReactElement<'header'>;

const Header: signature = ({}) => {
  return (
    <header>
      <nav className={styles.navbar}>
      </nav>
    </header>
  );
};

export default Header;
