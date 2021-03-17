// @flow
import React, { type Element } from 'react';

import styles from './Header.module.scss';


type Props = {};

type signature = (Props) => Element<"header">;

const Header: signature = ({}) => {
  return (
    <header>
      <nav className={styles.navbar}>
      </nav>
    </header>
  );
};

export default Header;
