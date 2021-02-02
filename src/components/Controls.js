// @flow
import React from 'react';

import { IntegerInput } from '.';

import styles from './Controls.module.scss';


type Props = {
  actions: Array<Object>,
  selected: ?number,
  updateAction: (number, number, number) => void,
};

const Controls = ({
  actions = [],
  selected,
  updateAction,
}: Props) => {
  let x = 0;
  let y = 0;
  let duration = 0;

  if (typeof selected === 'number') {
    x = actions[selected].x || x;
    y = actions[selected].y || y;
    duration = actions[selected].duration || duration;
  }

  return (
    <div className={styles.controls}>
      <div className={styles.controls__inputs}>
        <IntegerInput
          label="X"
          value={x}
          update={ (_x) => updateAction(_x, y, duration) }
        />
        <IntegerInput
          label="Y"
          value={y}
          update={ (_y) => updateAction(x, _y, duration) }
        />
        <IntegerInput
          label="Duration"
          value={duration}
          update={ (_duration) => updateAction(x, y, _duration) }
        />
      </div>
    </div>
  );
};

export default Controls;
