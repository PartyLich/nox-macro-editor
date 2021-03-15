// @flow
import type { Serializer } from '../serializer';

import { serialize } from './serialize.js';
import { deserialize } from './deserialize.js';


const noxSerializer = (): Serializer => {
  return Object.assign({}, {
    deserialize,
    serialize,
  });
};

export default noxSerializer;
