// @flow
import React, { type Node } from 'react';


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
        <button onClick={handleClick}>X</button>
      }
    </>
  );
};

export default RemovableItem;
