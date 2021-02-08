// @flow
import React from 'react';

import { IntegerInput } from '.';
import { isInBounds } from '../util';
import type { Coord } from '../actions';

import styles from './Controls.module.scss';


type Props = {
  actions: Array<Object>,
  resolution: Coord,
  selected: ?number,
  updateAction: (number, number, number) => void,
  addClick: (Coord) => void,
};

const Controls = ({
  actions = [],
  resolution: { x: resX, y: resY } = { x: 0, y: 0 },
  selected,
  updateAction,
  addClick,
}: Props) => {
  let x = 0;
  let y = 0;
  let duration = 0;

  // TODO: switch to optional chaining instead of bounds check?
  if (typeof selected === 'number' && isInBounds(selected, actions)) {
    x = actions[selected].x || x;
    y = actions[selected].y || y;
    duration = actions[selected].duration || duration;
  }

  return (
    <div className={styles.controls}>
      <button onClick={addClick({ x: x, y: y })}
      >Click
      </button>
      <div className={styles.controls__inputs}>
        <div>
          <IntegerInput
            classNames={styles['input--short']}
            label="Resolution X"
            value={resX}
            update={ (_x) => _x }
          />
          <IntegerInput
            classNames={styles['input--short']}
            label="Resolution Y"
            value={resY}
            update={ (_y) => _y }
          />
        </div>
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
