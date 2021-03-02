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
  let subscribers: Array<(T) => void> = [];

  const subscribe = (fn) => {
    if (typeof fn !== 'function') return noop;

    subscribers = subscribers.concat(fn);

    // return unsub function
    return () => {
      subscribers = subscribers.filter((a) => a !== fn);
    };
  };

  const notify = (msg: T) => (callback: (T) => void) => callback(msg);

  const publish = (msg: T) => subscribers.forEach(notify(msg));

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
