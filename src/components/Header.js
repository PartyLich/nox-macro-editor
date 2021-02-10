// @flow
import React from 'react';

import styles from './Header.module.scss';


type Props = {}

const Header = ({}: Props) => {
  return (
    <header>
      <nav className={styles.navbar}>
      </nav>
    </header>
  );
};

export default Header;
