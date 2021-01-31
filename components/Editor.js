// @flow
import React from 'react';

import styles from './Editor.module.scss';


const Editor = () => {
  return (
    <>
      <input type="file" />
      <div className={styles.container}>
      </div>
    </>
  );
};

export default Editor;
