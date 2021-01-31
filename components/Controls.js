// @flow
import React from 'react';

import styles from './Controls.module.scss';


type Props = {
  actions: Array<Object>,
  selected: ?number,
};

const Controls = ({
  actions = [],
  selected,
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
        <label>X
          <input
            type="text"
            value={x}
          />
        </label>
        <label>Y
          <input
            type="text"
            value={y}
          />
        </label>
        <label>Duration
          <input
            type="text"
            value={duration}
          />
        </label>
      </div>
    </div>
  );
};

export default Controls;
