// @flow
import React from 'react';

import { ActionList } from '.';

import styles from './Editor.module.scss';


const Editor = () => {
  return (
    <>
      <input type="file" />
      <div className={styles.container}>
        <ActionList />
      </div>
    </>
  );
};

export default Editor;
