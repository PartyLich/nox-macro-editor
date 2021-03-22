import * as React from 'react';
import { ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import { useId } from 'react-id-generator';

import styles from './FileInput.module.scss';


type Props = {
  onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
};

type signature = (args: Props) => ReactElement<'div'>;

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
