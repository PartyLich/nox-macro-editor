// @flow
import type { Action, Coord } from './actions';


export interface Serializer {
  serialize(coord: Coord, actions: Array<Action>): string;
  deserialize(fileText: string): Array<[Action, Coord]>;
}
