// @flow
import React, { type Node } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { IntegerInput } from '.';
import { isInBounds } from '../util/';
import type { Action, Coord } from '../actions';

import styles from './Controls.module.scss';


type Props = {
  actions: Array<Action>,
  resolution: Coord,
  selected: ?number,
  updateAction: (number, number, number) => void,
  addClick: (Coord) => void,
  addDrag: (Coord) => void,
  addWait: (number) => void,
};

type signature = (Props) => Node;

const Controls: signature = ({
  actions = [],
  resolution: { x: resX, y: resY } = { x: 0, y: 0 },
  selected,
  updateAction,
  addClick,
  addDrag,
  addWait,
}) => {
  let x: number = 0;
  let y: number = 0;
  let duration: number = 0;

  // TODO: switch to optional chaining instead of bounds check?
  if (typeof selected === 'number' && isInBounds(actions, selected)) {
    // $FlowExpectedErrort[incompatible-type] we know `.x` may be undefined
    x = actions[selected].x || x;
    // $FlowExpectedErrort[incompatible-type] we know `.y` may be undefined
    y = actions[selected].y || y;
    // $FlowExpectedErrort[incompatible-type] ...we know
    duration = actions[selected].duration || duration;
  }

  return (
    <Box className={styles.controls}>
      <Paper elevation={2} className={styles.controls__buttons}>
        <Typography variant="subtitle2">{'New Action'}</Typography>
        <Box>
          <Button
            onClick={addClick({ x, y })}
            variant="outlined"
            size="small"
          >Click
          </Button>
        </Box>
        <Box>
          <Button
            onClick={addDrag({ x, y })}
            variant="outlined"
            size="small"
          >Drag
          </Button>
        </Box>
        <Box>
          <Button
            onClick={addWait(duration)}
            variant="outlined"
            size="small"
          >Wait
          </Button>
        </Box>
      </Paper>
      <Paper elevation={2} className={styles.controls__inputs}>
        <Typography variant="subtitle2" className={styles.controls__title}>
          {'Resolution'}
        </Typography>
        <IntegerInput
          label="Resolution X"
          value={resX}
          update={ (_x) => _x }
        />
        <IntegerInput
          label="Resolution Y"
          value={resY}
          update={ (_y) => _y }
        />
      </Paper>
      <Paper elevation={2} className={styles.controls__inputs}>
        <Typography variant="subtitle2" className={styles.controls__title}>
          {'Selected Action'}
        </Typography>
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
      </Paper>
    </Box>
  );
};

export default Controls;