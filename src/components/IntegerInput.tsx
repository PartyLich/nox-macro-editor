import * as React from 'react';
import { ReactElement, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';

import { isInt } from '../util/';

import styles from './IntegerInput.module.scss';


type Props = {
  classNames?: Array<string>;
  label: string;
  value: number;
  update: (val: number) => void;
};

type signature = (props: Props) => ReactElement;

const IntegerInput: signature = ({
  classNames = [],
  label = 'Integer Input',
  value = 0,
  update,
}) => {
  const [displayVal, setDisplayVal] = useState(`${ value }`);
  const [isValid, setValid] = useState(true);

  // validate input and update as appropriate
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    const text = evt.currentTarget.value;
    setDisplayVal(text);

    if (!isInt(text)) {
      // set invalid styling
      setValid(false);
      return;
    }

    setValid(true);
    update(parseInt(text, 10));
  };

  // reset local state if value prop changes
  useEffect(
      () => {
        setDisplayVal(`${ value }`);
        setValid(true);
      },
      [value],
  );

  const baseName = styles['int-input'];

  return (
    <TextField
      className={[baseName].concat(classNames).join(' ')}
      error={!isValid}
      label={label}
      margin="dense"
      onChange={handleChange}
      size="small"
      value={displayVal}
      variant="outlined"
    />
  );
};

export default IntegerInput;
