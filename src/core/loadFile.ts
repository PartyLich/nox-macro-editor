import {
  fromPredicate as safe,
  map,
  Option,
} from 'fp-ts/Option';
import { not, pipe } from 'fp-ts/function';
import { map as aMap } from 'fp-ts/lib/Array';

import { deserialize, ParsedActions } from '../nox-serializer/deserialize';
import { Action, Coord } from '../types';


const isEmpty = (str: string) => str.length === 0;
const notEmpty = not(isEmpty);

// load a macro, replacing all Actions with the file's content
const loadFile = (setActions: (actions: Array<Action>) => void) =>
  (setResolution: (resolution: Coord) => void) =>
    (fileText: string): Option<void> => pipe(
        fileText,
        safe(notEmpty),
        map(deserialize),
        map((actions: ParsedActions) => {
          const [, resolution] = actions[0];
          setResolution(resolution);
          return actions;
        }),
        map(aMap(([action]: [Action, Coord]) => action)),
        map(setActions),
    );

export default loadFile;
