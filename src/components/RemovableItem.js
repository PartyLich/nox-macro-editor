// @flow
import React, { type Node } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


type RemovableItemProps = {
  selected: boolean,
  remove: () => void,
  children: ?Node,
};

const RemovableItem = ({
  selected = false,
  remove,
  children,
}: RemovableItemProps) => {
  const handleClick = (e) => {
    e.stopPropagation();
    remove();
  };

  return (
    <>
      {children}
      {selected &&
          <IconButton
            aria-label="delete"
            color="secondary"
            edge="end"
            onClick={handleClick}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
      }
    </>
  );
};

export default RemovableItem;
