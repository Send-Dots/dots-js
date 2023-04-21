import { DotsElementBase, DotsElementClasses } from './base';
import { PaymentRequest } from '../payment-request';
import { TilledForm } from '../dots';

export type DotsPaymentRequestButtonElement = DotsElementBase & {
  form: TilledForm;
  mount(selectorId: string): void;
};

export interface DotsPaymentRequestButtonElementOptions {
  classes?: DotsElementClasses;

  /**
   * A `PaymentRequest` object used to configure the element.
   */
  paymentRequest: PaymentRequest;
}

export interface DotsPaymentRequestButtonElementClickEvent {
  preventDefault: () => void;
}
