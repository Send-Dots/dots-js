import {
  Dots,
  DotsConstructor,
  DotsElement,
  DotsElementType,
  DotsElements,
  DotsElementsUpdateOptions,
  DotsPaymentElement,
  DotsPaymentElementOptions,
  FieldNameTypes,
  PaymentMethod,
  TilledConstructor,
} from '../types';
import {
  DotsPaymentRequestButtonElement,
  DotsPaymentRequestButtonElementOptions,
} from '../types/dots-js/elements/payment-request-button';

export type LoadDots = (
  ...args: Parameters<DotsConstructor>
) => Promise<Dots | null>;

export interface LoadParams {}

// `_VERSION` will be rewritten by `@rollup/plugin-replace` as a string literal
// containing the package.json version
declare const _VERSION: string;

const V2_URL = 'https://js.tilled.com/v2';
const id = 'dots-js-script';
const EXISTING_SCRIPT_MESSAGE =
  'loadDots.setLoadParameters was called but an existing Dots.js script already exists in the document; existing script parameters will be used';

const dotsServerUrl = {
  production: 'https://api.dots.dev',
  sandbox: 'https://api.senddotssandbox.com',
  staging: 'https://api-staging.dots.dev',
  development: 'http://localhost:8080',
};

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

const registerWrapper = (
  dots: any,
  args: Parameters<DotsConstructor>
): void => {
  if (!dots) {
    return;
  }
  dots.elements = () => new Elements(dots);

  const confirmCardPayment = async (
    client_secret: string,
    options: { payment_method: PaymentMethod | string }
  ) => {
    let res;
    let paymentMethodId: string;
    if (typeof options.payment_method === 'object') {
      const paymentMethodRes = await dots.createPaymentMethod({
        type: 'card',
        form: options.payment_method.element.form,
        billing_details: options.payment_method.billing_details,
      });

      paymentMethodId = paymentMethodRes['id'];

      const response = await fetch(
        dotsServerUrl[args[1]] +
          '/payment_intent/attach_payment_method/' +
          client_secret,
        {
          method: 'PUT',
          body: JSON.stringify({ payment_method_id: paymentMethodId }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa(args[0] + ':'),
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to attach payment method to customer');
      }
    } else {
      const response = await fetch(
        dotsServerUrl[args[1]] + '/payment_method/exchange' + client_secret,
        {
          method: 'POST',
          body: JSON.stringify({ provider_id: options.payment_method }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa(args[0] + ':'),
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to exchange payment method id for provider id');
      }
      const body = await response.json();

      paymentMethodId = body['provider_id'];
    }

    res = await dots.confirmPayment(client_secret, {
      payment_method: paymentMethodId,
    });

    const clientSecret = res['client_secret'];

    const response = await fetch(
      dotsServerUrl[args[1]] + '/payment_intent/exchange/' + clientSecret,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + btoa(args[0] + ':'),
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to exchange client secret');
    }

    return response.json();
  };
  dots.confirmCardPayment = confirmCardPayment;

  const addPaymentMethod = async (options: {
    payment_method: PaymentMethod;
  }) => {
    const paymentMethodRes = await dots.createPaymentMethod({
      type: 'card',
      form: options.payment_method.element.form,
      billing_details: options.payment_method.billing_details,
    });

    const providerId = paymentMethodRes['id'];

    const response = await fetch(dotsServerUrl[args[1]] + '/payment_method/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(args[0] + ':'),
      },
      body: JSON.stringify({ provider_id: providerId }),
    });

    if (!response.ok) {
      throw new Error('Failed to add payment method');
    }

    return response.json();
  };

  dots.addPaymentMethod = addPaymentMethod;

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

  const environment = args[1];

  const resposne = await fetch(
    dotsServerUrl[environment] + '/tilled-public-account-information',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(args[0] + ':'),
      },
    }
  );

  const { public_key: publicKey, account_id: accountId } =
    await resposne.json();

  const dots = new (maybeTilled as any)(publicKey, accountId, {
    sandbox: environment === 'sandbox' || environment === 'development',
    log_level: 0,
  });

  registerWrapper(dots, args);
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

class Elements implements DotsElements {
  _elements: any;
  _dots: Dots;
  constructor(dots: Dots) {
    this._elements = {};
    this._dots = dots;
  }
  create(
    elementType: DotsElementType,
    options?:
      | DotsPaymentElementOptions
      | DotsPaymentRequestButtonElementOptions
      | undefined
  ): Promise<DotsElement> {
    if (elementType === 'payment') {
      const createPromise = async () => {
        const form = await this._dots.form({
          payment_method_type: 'card',
        });

        const fieldNames = ['cardNumber', 'cardExpiry', 'cardCvv'] as const;

        const fields: { name: FieldNameTypes; formField: any }[] = [];
        fieldNames.forEach((fieldName) => {
          const formField = form.createField(fieldName, options);
          fields.push({ formField: formField, name: fieldName });
        });

        const paymentElement: DotsPaymentElement = {
          form,
          mount: (fieldIds: {
            [key in FieldNameTypes]: string;
          }) => {
            fields.forEach((field) => {
              const id = fieldIds[field.name];
              field.formField.inject('#' + id);
              field.formField.on('focus', (evt: any) => {
                const parentDiv = document.getElementById(id);
                if (parentDiv) parentDiv.classList.add('parent-focused');
              });
              field.formField.on('blur', (evt: any) => {
                const parentDiv = document.getElementById(id);
                if (parentDiv) parentDiv.classList.remove('parent-focused');
              });
            });
            // update card brand
            if (document.getElementById('card-brand-icon')) {
              form.fields.cardNumber.on('change', (evt: any) => {
                const cardBrand = evt.brand;
                const icon = document.getElementById('card-brand-icon');
                if (icon) {
                  switch (cardBrand) {
                    case 'amex':
                      icon.classList.value = 'fa-brands fa-cc-amex';
                      break;
                    case 'mastercard':
                      icon.classList.value = 'fa-brands fa-cc-mastercard';
                      break;
                    case 'visa':
                      icon.classList.value = 'fa-brands fa-cc-visa';
                      break;
                    case 'discover':
                      icon.classList.value = 'fa-brands fa-cc-discover';
                      break;
                    case 'diners':
                      icon.classList.value = 'fa-brands fa-cc-diners-club';
                      break;
                    default:
                      icon.classList.value = 'fa-solid fa-credit-card';
                  }
                }
              });
            }

            form.build();
          },
          destroy: () => {
            form.teardown((success) => {
              console.log(
                'The component has been successfully unmounted:',
                success
              );
            });
          },
        };
        this._elements[elementType] = paymentElement;
        return paymentElement;
      };
      return createPromise();
    } else if (
      elementType === 'paymentRequestButton' &&
      options &&
      'paymentRequest' in options
    ) {
      const createPromise = async () => {
        const form = await this._dots.form({
          payment_method_type: 'card',
        });

        var prButton = form.createField('paymentRequestButton', {
          paymentRequest: options.paymentRequest,
        });

        const paymentRequestButtonElement: DotsPaymentRequestButtonElement = {
          form,
          mount: (selectorId: string) => {
            options.paymentRequest.canMakePayment().then((result) => {
              try {
                if (result) {
                  // Inject paymentRequestButton Form Field to the DOM
                  prButton.inject('#' + selectorId);
                } else {
                  const button = document.getElementById(selectorId);
                  if (button) button.style.display = 'none';
                }
              } catch (e) {
                console.error(e);
              }
            });

            form.build();
          },
          destroy: () => {
            form.teardown((success) => {
              console.log(
                'The component has been successfully unmounted:',
                success
              );
            });
          },
        };
        this._elements[elementType] = paymentRequestButtonElement;
        return paymentRequestButtonElement;
      };
      return createPromise();
    } else {
      return Promise.reject(new Error('Invalid type'));
    }
  }
  update(options: DotsElementsUpdateOptions): void {
    //to do
  }

  getElement(elementType: DotsElementType): DotsElement | null {
    return this._elements[elementType] || null;
  }
}
