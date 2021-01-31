// @flow
import React, { useState } from 'react';

import { pipe, trace } from '../src/util';
import { deserialize } from '../src/serialize';
import { ActionList, Controls } from '.';
import type { Action } from '../src/actions.js';

import styles from './Editor.module.scss';


const handleText: (function) => (string) => void = (setStateFn) => pipe(
    trace('handleText'),
    deserialize,
    (result) => {
      setStateFn(result);
      return result;
    },
);

const onFileSelect = (setStateFn) => (evt) => {
  const fileList = evt.target.files;

  fileList.item(0)
      .text()
      .then(handleText(setStateFn));
};


const Editor = () => {
  const [actions: Array<Action>, setActions] = useState([]);
  const [selected: ?number, setSelected] = useState(null);

  return (
    <>
      <input type="file" onChange={onFileSelect(setActions)} />
      <div className={styles.container}>
        <ActionList {...{
          actions,
          selected,
          setSelected,
        }}
        />
        <Controls
          actions={actions}
          selected={selected}
        />
      </div>
    </>
  );
};

export default Editor;
