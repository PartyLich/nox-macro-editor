const noop = (): void => {
  // nothing
};

export interface PubSub<T> {
  // subscribe to this publisher, providing a callback that will be executed on
  // publish. returns a function that will unsubscribe
  subscribe: (fn: (msg: T) => void) => () => void;

  // publish a message to all subscribers
  publish: (msg: T) => void;
}

const Pubsub = <T>(): PubSub<T> => {
  let subscribers: Array<(msg: T) => void> = [];

  const subscribe = (fn: (msg: T) => void) => {
    if (typeof fn !== 'function') return noop;

    subscribers = subscribers.concat(fn);

    // return unsub function
    return () => {
      subscribers = subscribers.filter((cb) => cb !== fn);
    };
  };

  const notify = (msg: T) => (callback: (msg: T) => void) => callback(msg);

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
