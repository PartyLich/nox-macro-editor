// @flow
import React from 'react';
import {
  DragDropContext,
  Droppable,
} from 'react-beautiful-dnd';
import Paper from '@material-ui/core/Paper';

import { ActionItem } from '.';
import type { Action } from '../actions';

import styles from './ActionList.module.scss';


type Props = {
  actions: Array<Action>,
  selected: ?number,
  setSelected: (number) => void,
  reorder: (number, number) => void,
  remove: (number) => void,
};

const ActionList = ({
  actions = [],
  selected,
  setSelected,
  reorder,
  remove,
}: Props) => {
  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;
    if (destination.index === source.index) return;

    reorder(source.index, destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Paper elevation={3} className={styles.container}>
        <Droppable
          droppableId="list"
          type="ACTION"
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ul className={styles.list}>
                {actions.map(ActionItem(selected, setSelected, remove))}
              </ul>
              {provided.placeholder}
            </div>
          )}
        </Droppable >
      </Paper>
    </DragDropContext>
  );
};

export default ActionList;
