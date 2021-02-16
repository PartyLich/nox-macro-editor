// @flow
const noop = () => {};

export interface PubSub<T> {
  // subscribe to this publisher, providing a callback that will be executed on
  // publish. returns a function that will unsub
  subscribe: ((T) => void) => (() => void),

  // publish a message to all subscribers
  publish: (msg: T) => void,
}

const Pubsub = <T>(): PubSub<T> => {
  let subscribers = [];

  const subscribe = (fn) => {
    if (typeof fn !== 'function') return noop;

    subscribers = subscribers.concat(fn);

    // return unsub function
    return () => {
      subscribers = subscribers.filter((a) => a !== fn);
    };
  };

  const notify = (msg) => (callback) => callback(msg);

  const publish = (msg) => subscribers.forEach(notify(msg));

  return {
    subscribe,
    publish,
  };
};

export default Pubsub;

export {
  noop,
  Pubsub,
};
