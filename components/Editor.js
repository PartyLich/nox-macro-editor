// @flow
import React from 'react';

import { ActionList, Controls } from '.';

import styles from './Editor.module.scss';


const Editor = () => {
  return (
    <>
      <input type="file" />
      <div className={styles.container}>
        <ActionList />
        <Controls />
      </div>
    </>
  );
};

export default Editor;
