import type { Serializer } from '../serializer';

import { serialize } from './serialize';
import { deserialize } from './deserialize';


const noxSerializer = (): Serializer => {
  return Object.assign({}, {
    deserialize,
    serialize,
  });
};

export default noxSerializer;
