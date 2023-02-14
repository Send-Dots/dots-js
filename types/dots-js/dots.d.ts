import {
  DotsElement,
  DotsElements,
  DotsElementsOptions,
} from './elements-group';

export interface Dots {
  elements(options?: DotsElementsOptions): DotsElements;

  confirmPayment: ConfirmPayment;
  form(options: { payment_method_type: string; options?: any }): TilledForm;
}

export type ConfirmPayment = (
  client_secret: string,

  payment_method: PaymentMethod
) => Promise<any>;

export type PaymentMethod = {
  element: DotsElement;
  billing_details: {
    name?: string;
    email?: string;
    address: {
      country: string;
      zip: string;
      street?: string;
      city?: string;
      state?: string;
    };
  };
};

/**
 * Use `Dots(clientId, options?)` to create an instance of the `Dots` object.
 * The Dots object is your entrypoint to the rest of the Dots.js SDK.
 *
 * Your Dots Client ID is required when calling this function, as it identifies your website to Dots.
 *
 */

export interface TilledForm {
  createField(field: string, options?: any): any;
  build(): void;
  fields: any;
  teardown(callback: (success: boolean) => void): void;
}
export interface Tilled {}

export interface DotsConstructor {
  (
    /**
     * Your client Id.
     */
    clientId: string,

    /**
     * Your application environment.
     */
    environment: 'sandbox' | 'production' | 'development',

    /**
     * Initialization options.
     */
    options?: DotsConstructorOptions
  ): Dots;
}

export interface TilledConstructor {
  (
    public_key: string,

    account_id: string,

    options: TilledConstructorOptions
  ): Tilled;
}

export interface TilledConstructorOptions {
  sandbox: boolean;
  log_level: number;
}

export interface DotsConstructorOptions {
  dotsUserId?: string; //future purpose
}

export type DotsErrorType =
  /**
   * Failure to connect to Dots's API.
   */
  | 'api_connection_error'

  /**
   * API errors cover any other type of problem (e.g., a temporary problem with Dots's servers), and are extremely uncommon.
   */
  | 'api_error'

  /**
   * Failure to properly authenticate yourself in the request.
   */
  | 'authentication_error'

  /**
   * Card errors are the most common type of error you should expect to handle.
   * They result when the user enters a card that can't be charged for some reason.
   */
  | 'card_error'

  /**
   * Idempotency errors occur when an `Idempotency-Key` is re-used on a request that does not match the first request's API endpoint and parameters.
   */
  | 'idempotency_error'

  /**
   * Invalid request errors arise when your request has invalid parameters.
   */
  | 'invalid_request_error'

  /**
   * Too many requests hit the API too quickly.
   */
  | 'rate_limit_error'

  /**
   * Errors triggered by our client-side libraries when failing to validate fields (e.g., when a card number or expiration date is invalid or incomplete).
   */
  | 'validation_error';

export interface DotsError {
  /**
   * The type of error.
   */
  type: DotsErrorType;

  /**
   * For card errors, the ID of the failed charge
   */
  charge?: string;

  code?: string;

  decline_code?: string;

  doc_url?: string;

  /**
   * A human-readable message providing more details about the error. For card errors, these messages can be shown to your users.
   */
  message?: string;

  /**
   * If the error is parameter-specific, the parameter related to the error.
   * For example, you can use this to display a message near the correct form field.
   */
  param?: string;

  /**
   * The `PaymentIntent` object for errors returned on a request involving a `PaymentIntent`.
   */
  payment_intent?: any;

  /**
   * The `PaymentMethod` object for errors returned on a request involving a `PaymentMethod`.
   */
  payment_method?: any;

  /**
   * The `SetupIntent` object for errors returned on a request involving a `SetupIntent`.
   */
  setup_intent?: any;

  /**
   * The `Source` object for errors returned on a request involving a `Source`.
   */
  source?: any;
}
