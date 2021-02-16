// @flow
import React, { type Node } from 'react';
import Head from 'next/head';

import { Layout } from '.';
import styles from './Page.module.scss';


type Props = {
  children: Node,
  title?: string,
};

const Page = ({ children, title = 'This is the default title' }: Props) => (
  <section className={styles.body}>
    <Head>
      <title>{title}</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </Head>
    <Layout >
      {children}
    </Layout>
  </section>
);

export default Page;
