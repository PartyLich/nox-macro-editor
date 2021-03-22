import * as React from 'react';
import { ReactElement } from 'react';
import Head from 'next/head';

import { Layout } from '.';
import styles from './Page.module.scss';


type Props = {
  children: ReactElement;
  title?: string;
};

type signature = (props: Props) => ReactElement<'section'>;

const Page: signature = ({
  children,
  title = 'This is the default title',
}) => (
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
