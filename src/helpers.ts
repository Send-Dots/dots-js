import { Dots, DotsConstructor, TilledConstructor } from '../types';

export type LoadDots = (
  ...args: Parameters<DotsConstructor>
) => Promise<Dots | null>;

export interface LoadParams { }

// `_VERSION` will be rewritten by `@rollup/plugin-replace` as a string literal
// containing the package.json version
declare const _VERSION: string;

const V2_URL = 'https://js.tilled.com/v2';
const id = 'dots-js-script';
const EXISTING_SCRIPT_MESSAGE =
  'loadStripe.setLoadParameters was called but an existing Dots.js script already exists in the document; existing script parameters will be used';

const dotsServerUrl = {
  sandbox: 'https://api.dots.dev/api',
  production: 'https://api.senddotssanbox.com/api',
  development: 'http://localhost:8080/api',
}


export const findScript = (): HTMLScriptElement | null => {
  const scripts = document.querySelectorAll<HTMLScriptElement>(
    `script[src^="${V2_URL}"]`
  );

  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i];

    return script;
  }

  return null;
};

const injectScript = (params: null | LoadParams): HTMLScriptElement => {
  const script = document.createElement('script');
  script.src = V2_URL;
  script.id = id;
  const headOrBody = document.head || document.body;

  if (!headOrBody) {
    throw new Error(
      'Expected document.body not to be null. Dots.js requires a <body> element.'
    );
  }

  headOrBody.appendChild(script);

  return script;
};

const registerWrapper = (dots: any, startTime: number): void => {
  if (!dots || !dots._registerWrapper) {
    return;
  }

  //dots._registerWrapper({ name: 'dots-js', version: _VERSION, startTime });
};

let dotsPromise: Promise<DotsConstructor | null> | null = null;

let tilledPromise: Promise<TilledConstructor | null> | null = null;

export const loadScript = (
  params: null | LoadParams
): Promise<TilledConstructor | null> => {
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

export const initDots = async (
  maybeTilled: TilledConstructor | null,
  args: Parameters<DotsConstructor>,
  startTime: number
): Promise<Dots | null> => {
  if (maybeTilled === null) {
    return null;
  }

  const resposne = await fetch(dotsServerUrl[args[1]] + '/v2/payments/public_account_information', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(args[0] + ':')
    }
  })

  const { public_key: publicKey, account_id: accountId } = await resposne.json();

  const dots = new (maybeTilled as any)(publicKey, accountId, {
    sandbox: args[1] === 'sandbox' || args[1] === 'development',
    log_level: 0,
  });

  registerWrapper(dots, startTime);
  return dots;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const validateLoadParams = (params: any): LoadParams => {
  const errorMessage = `invalid load parameters; expected object of shape

    {advancedFraudSignals: boolean}

but received

    ${JSON.stringify(params)}
`;

  if (params === null || typeof params !== 'object') {
    throw new Error(errorMessage);
  }

  if (
    Object.keys(params).length === 1 &&
    typeof params.advancedFraudSignals === 'boolean'
  ) {
    return params;
  }

  throw new Error(errorMessage);
};
