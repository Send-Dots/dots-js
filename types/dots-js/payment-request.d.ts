import { PaymentMethod } from '../api';

export interface PaymentRequest {
  /**
   * Returns a `Promise` that resolves with a truthy value if an enabled wallet is ready to pay.
   * If no wallet is available, it resolves with `null`.
   */
  canMakePayment(): Promise<boolean | null>;

  /**
   * Shows the browser’s payment interface.
   * When using the `PaymentRequestButtonElement`, this is called for you automatically.
   * This method must be called as the result of a user interaction (for example, in a click handler).
   */
  show(): void;

  /**
   * Closes the browser’s payment interface.
   */
  abort: () => void;

  /**
   * `true` if the browser’s payment interface is showing.
   * When using the `PaymentRequestButtonElement`, this is called for you automatically.
   */
  isShowing: () => boolean;

  /**
   * Dots.js automatically creates a `PaymentMethod` after the customer is done interacting with the browser’s payment interface.
   * To access the created `PaymentMethod`, listen for this event.
   */
  on(
    eventType: 'paymentmethod',
    handler: (event: PaymentRequestPaymentMethodEvent) => any
  ): this;

  on(eventType: 'cancel', handler: () => any): this;
}

/**
 * An set of options to create this `PaymentRequest` instance with.
 * These options can be updated using `paymentRequest.update`.
 */
export interface PaymentRequestOptions {
  /**
   * This `PaymentRequestItem` is shown to the customer in the browser’s payment interface.
   */
  total: PaymentRequestItem;

  /**
   * By default, the browser's payment interface only asks the customer for actual payment information.
   * A customer name can be collected by setting this option to `true`.
   * This collected name will appears in the `PaymentRequestEvent` object.
   *
   * We highly recommend you collect at least one of name, email, or phone as this also results in collection of billing address for Apple Pay.
   * The billing address can be used to perform address verification and block fraudulent payments.
   * For all other payment methods, the billing address is automatically collected when available.
   */
  requestPayerName?: boolean;

  /**
   * See the `requestPayerName` option.
   */
  requestPayerEmail?: boolean;
}

/**
 * A `PaymentRequestItem` object is used to configure a `PaymentRequest`.
 */
export interface PaymentRequestItem {
  /**
   * The amount in the currency's subunit (e.g. cents, yen, etc.)
   */
  amount: number;

  /**
   * A name that the browser shows the customer in the payment interface.
   */
  label: string;

  /**
   * If you might change this amount later (for example, after you have calcluated shipping costs), set this to `true`.
   * Note that browsers treat this as a hint for how to display things, and not necessarily as something that will prevent submission.
   */
  pending?: boolean;
}

export type PaymentRequestWallet = 'applePay';

export type PaymentRequestCompleteStatus =
  /**
   * Report to the browser that the payment was successful, and that it can close any active payment interface.
   */
  | 'success'

  /**
   * Report to the browser that you were unable to process the customer‘s payment.
   * Browsers may re-show the payment interface, or simply show a message and close.
   */
  | 'fail'

  /**
   * Equivalent to `fail`, except that the browser can choose to show a more-specific error message.
   */
  | 'invalid_payer_name'

  /**
   * Equivalent to `fail`, except that the browser can choose to show a more-specific error message.
   */
  | 'invalid_payer_phone'

  /**
   * Equivalent to `fail`, except that the browser can choose to show a more-specific error message.
   */
  | 'invalid_payer_email'

  /**
   * Equivalent to `fail`, except that the browser can choose to show a more-specific error message.
   */
  | 'invalid_shipping_address';

export interface PaymentRequestEvent {
  /**
   * Call this function with a `CompleteStatus` when you have processed the token data provided by the API.
   * Note that you must must call complete within 30 seconds.
   */
  complete: (status: PaymentRequestCompleteStatus) => void;

  /**
   * The customer's name.
   * Only present if it was explicitly asked for [creating the PaymentRequest object](https://stripe.com/docs/js/payment_request/create).
   */
  payerName?: string;

  /**
   * The customer's email.
   * Only present if it was explicitly asked for [creating the PaymentRequest object](https://stripe.com/docs/js/payment_request/create).
   */
  payerEmail?: string;

  /**
   * The customer's phone.
   * Only present if it was explicitly asked for [creating the PaymentRequest object](https://stripe.com/docs/js/payment_request/create).
   */
  payerPhone?: string;

  /**
   * The unique name of the wallet the customer chose to authorize payment.
   * For example, `browserCard`.
   */
  walletName: PaymentRequestWallet | string;

  /**
   * @deprecated
   * Use walletName instead.
   */
  methodName: string;
}

export interface PaymentRequestPaymentMethodEvent extends PaymentRequestEvent {
  paymentMethod: PaymentMethod;
}

export type PaymentRequestUpdateDetailsStatus =
  /**
   * Let the customer proceed.
   */
  | 'success'

  /**
   * Prevent the customer from making the change they just made.
   */
  | 'fail'

  /**
   * Equivalent to `fail`, except we show a more specific error message.
   * Can only be used in a `shippingaddresschange` handler.
   */
  | 'invalid_shipping_address';
