// @flow
import curry from 'crocks/helpers/curry';
import safe from 'crocks/Maybe/safe';
import isEmpty from 'crocks/predicates/isEmpty';
import not from 'crocks/logic/not';

import { deserialize } from '../nox-serializer/deserialize';
import { map, pipe } from '../util/';

import type { Action, Coord } from '../actions';
import type { ParsedActions } from '../nox-serializer/deserialize';


// load a macro, replacing all Actions with the file's content
const loadFile = (
    setActions: (Array<Action>) => void,
    setResolution: (Coord) => void,
    fileText: string,
): void => pipe(
    safe(not(isEmpty)),
    map(deserialize),
    map((actions: ParsedActions) => {
      const [, resolution] = actions[0];
      setResolution(resolution);
      return actions;
    }),
    map(map(([action: Action, _]) => action)),
    map(setActions),
)(fileText);


// curry all the things
const cLoadFile: any = curry(loadFile);

export default cLoadFile;
