// @flow
import React from 'react';

import { ActionItem } from '.';
import type { Action } from '../src/actions.js';

import styles from './ActionList.module.scss';


type Props = {
  actions: Array<Action>,
  selected: ?number,
  setSelected: (number) => void,
};

const ActionList = ({
  actions = [],
  selected,
  setSelected,
}: Props) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {actions.map(ActionItem(selected, setSelected))}
      </ul>
    </div>
  );
};

export default ActionList;
