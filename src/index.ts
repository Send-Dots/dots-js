// Execute our own script injection after a tick to give users time to do their

import { initDots, LoadDots, loadScript } from './helpers';

// own script injection.
const dotsPromise = Promise.resolve().then(() => loadScript(null));

let loadCalled = false;

dotsPromise.catch((err: Error) => {
  if (!loadCalled) {
    console.warn(err);
  }
});

export const loadDots: LoadDots = (...args) => {
  loadCalled = true;
  const startTime = Date.now();

  return dotsPromise.then((maybeTilled) =>
    initDots(maybeTilled, args, startTime)
  );
};
