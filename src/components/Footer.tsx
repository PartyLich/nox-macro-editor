import * as React from 'react';
import { ReactElement } from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';

import styles from './Footer.module.scss';


const GITHUB_URL = 'https://github.com/PartyLich/nox-macro-editor';

const Footer = (): ReactElement => {
  return (
    <footer className={styles.footer}>
      <span><span className={styles.Footer__address}>Hecho en</span> 🇲🇽</span>
      <nav className={styles.Footer__NavBar}>
        <a href={GITHUB_URL}>
          <GitHubIcon aria-label="github" />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
