'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const V2_URL = 'https://js.tilled.com/v2';
const id = 'dots-js-script';
const EXISTING_SCRIPT_MESSAGE = 'loadDots.setLoadParameters was called but an existing Dots.js script already exists in the document; existing script parameters will be used';
const dotsServerUrl = {
  sandbox: 'https://api.dots.dev/api',
  production: 'https://api.senddotssanbox.com/api',
  staging: 'https://api-staging.dots.dev/api',
  development: 'http://localhost:8080/api'
};
const findScript = () => {
  const scripts = document.querySelectorAll(`script[src^="${V2_URL}"]`);
  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i];
    return script;
  }
  return null;
};
const injectScript = params => {
  const script = document.createElement('script');
  script.src = V2_URL;
  script.id = id;
  const headOrBody = document.head || document.body;
  if (!headOrBody) {
    throw new Error('Expected document.body not to be null. Dots.js requires a <body> element.');
  }
  headOrBody.appendChild(script);
  return script;
};
const registerWrapper = (dots, startTime) => {
  if (!dots) {
    return;
  }
  dots.elements = [];
  //dots._registerWrapper({ name: 'dots-js', version: "1.0.9", startTime });
};
let tilledPromise = null;
const loadScript = params => {
  // Ensure that we only attempt to load Tilled.js at most once
  if (tilledPromise !== null) {
    return tilledPromise;
  }
  tilledPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      // Resolve to null when imported server side. This makes the module
      // safe to import in an isomorphic code base.
      resolve(null);
      return;
    }
    if (window.Tilled && params) {
      console.warn(EXISTING_SCRIPT_MESSAGE);
    }
    if (window.Tilled) {
      resolve(window.Tilled);
      return;
    }
    try {
      let script = findScript();
      if (script && params) {
        console.warn(EXISTING_SCRIPT_MESSAGE);
      } else if (!script) {
        script = injectScript(params);
      }
      script.addEventListener('load', () => {
        if (window.Tilled) {
          resolve(window.Tilled);
        } else {
          reject(new Error('Dots.js not available'));
        }
      });
      script.addEventListener('error', () => {
        reject(new Error('Failed to load Dots.js'));
      });
    } catch (error) {
      reject(error);
      return;
    }
  });
  return tilledPromise;
};
const initDots = async (maybeTilled, args, startTime) => {
  if (maybeTilled === null) {
    return null;
  }
  const resposne = await fetch(dotsServerUrl[args[1]] + '/tilled-public-account-information', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(args[0] + ':')
    }
  });
  const {
    public_key: publicKey,
    account_id: accountId
  } = await resposne.json();
  const dots = new maybeTilled(publicKey, accountId, {
    sandbox: args[1] === 'sandbox' || args[1] === 'development',
    log_level: 0
  });
  registerWrapper(dots);
  return dots;
};

// Execute our own script injection after a tick to give users time to do their
// own script injection.
const dotsPromise = Promise.resolve().then(() => loadScript(null));
let loadCalled = false;
dotsPromise.catch(err => {
  if (!loadCalled) {
    console.warn(err);
  }
});
const loadDots = async (...args) => {
  loadCalled = true;
  return dotsPromise.then(async maybeTilled => await initDots(maybeTilled, args));
};

exports.loadDots = loadDots;
