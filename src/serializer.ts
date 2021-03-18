import { Action, Coord } from './types';


export interface Serializer {
  serialize: (coord: Coord, actions: Array<Action>) => string;
  deserialize: (fileText: string) => Array<[Action, Coord]>;
}
