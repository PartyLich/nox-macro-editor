// @flow
import React, { type Element } from 'react';
import Button from '@material-ui/core/Button';
import { useId } from 'react-id-generator';

import styles from './FileInput.module.scss';


type Props = {
  onChange: (SyntheticEvent<HTMLInputElement>) => void
};

type signature = (Props) => Element<"div">;

const FileInput: signature = ({
  onChange,
}) => {
  const [id] = useId();

  return (
    <div>
      <input
        className={styles.input}
        id={id}
        type="file"
        onChange={onChange}
      />
      <label
        htmlFor={id}
      >
        <Button
          color="primary"
          component="span"
          size="small"
          variant="contained"
        >
          Select file
        </Button>
      </label>
    </div>
  );
};

export default FileInput;
