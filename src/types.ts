// @flow
import { nanoid } from 'nanoid';


// specify shorter than default id length
const nextId = () => nanoid(10);

// actions
const CLICK: 'CLICK' = 'CLICK';
const MRELEASE: 'MRELEASE' = 'MRELEASE';
const MDRAG: 'MDRAG' = 'MDRAG';
const WAIT: 'WAIT' = 'WAIT';
const NONE: 'NONE' = 'NONE';

export type Coord = {|
  x: number,
  y: number,
|};

type ActionA<Type, Payload> = {
  id: string,
  type: Type,
  ...Payload,
};

type Empty = {||};

type Wait = {|
  duration: number,
|};
export type WaitAction = ActionA<typeof WAIT, Wait>;

export type ClickAction = ActionA<typeof CLICK, Coord>;
export type DragAction = ActionA<typeof MDRAG, Coord>;

export type NoneAction = ActionA<typeof NONE, Empty>;
export type MReleaseAction = ActionA<typeof MRELEASE, Empty>;

export type Action =
  | ClickAction
  | DragAction
  | MReleaseAction
  | NoneAction
  | WaitAction
  ;

export type ActionType =
  | typeof CLICK
  | typeof MDRAG
  | typeof MRELEASE
  | typeof NONE
  | typeof WAIT
  ;

// Wait action creator
export const waitAction = (duration: number = 1): WaitAction => ({
  id: nextId(),
  type: WAIT,
  duration,
});

// default coord
const DEF_COORD: Coord = { x: 0, y: 0 };

// Click action creator
export const clickAction = (coord: Coord = DEF_COORD): ClickAction => ({
  id: nextId(),
  type: CLICK,
  ...coord,
});

// None action creator
export const noneAction = (): NoneAction => ({
  id: nextId(),
  type: NONE,
});

// Drag action creator
export const dragAction = (coord: Coord = DEF_COORD): DragAction => ({
  id: nextId(),
  type: MDRAG,
  ...coord,
});

// MRelease action creator
export const releaseAction = (): MReleaseAction => ({
  id: nextId(),
  type: MRELEASE,
});

export const types = {
  WAIT,
  CLICK,
  MRELEASE,
  MDRAG,
  NONE,
};
