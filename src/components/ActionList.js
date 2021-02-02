// @flow
import React from 'react';
import {
  DragDropContext,
  Droppable,
} from 'react-beautiful-dnd';

import { ActionItem } from '.';
import type { Action } from '../actions';

import styles from './ActionList.module.scss';


type Props = {
  actions: Array<Action>,
  selected: ?number,
  setSelected: (number) => void,
  reorder: (number, number) => void,
};

const ActionList = ({
  actions = [],
  selected,
  setSelected,
  reorder,
}: Props) => {
  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;
    if (destination.index === source.index) return;

    reorder(source.index, destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles.container}>
        <Droppable
          droppableId="list"
          type="ACTION"
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ul className={styles.list}>
                {actions.map(ActionItem(selected, setSelected))}
              </ul>
              {provided.placeholder}
            </div>
          )}
        </Droppable >
      </div>
    </DragDropContext>
  );
};

export default ActionList;
