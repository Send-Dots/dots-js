import { TilledForm } from '../dots';
import { Styles } from '../elements-group';
import { DotsElementBase } from './base';

export type DotsPaymentElement = DotsElementBase & TilledForm;

export interface DefaultValuesOption {
  billingDetails?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: {
      country?: string;
      postal_code?: string;
      state?: string;
      city?: string;
      line1?: string;
      line2?: string;
    };
  };
}

export type FieldOption = 'auto' | 'never';

export interface FieldsOption {
  billingDetails?:
    | FieldOption
    | {
        name?: FieldOption;
        email?: FieldOption;
        phone?: FieldOption;
        address?:
          | FieldOption
          | {
              country?: FieldOption;
              postalCode?: FieldOption;
              state?: FieldOption;
              city?: FieldOption;
              line1?: FieldOption;
              line2?: FieldOption;
            };
      };
}

export type TermOption = 'auto' | 'always' | 'never';

export interface TermsOption {
  bancontact?: TermOption;
  card?: TermOption;
  ideal?: TermOption;
  sepaDebit?: TermOption;
  sofort?: TermOption;
  auBecsDebit?: TermOption;
  usBankAccount?: TermOption;
}

export type PaymentWalletOption = 'auto' | 'never';

export interface PaymentWalletsOption {
  applePay?: PaymentWalletOption;
  googlePay?: PaymentWalletOption;
}

export type Layout = 'tabs' | 'accordion' | 'auto';

export interface LayoutObject {
  type: Layout;
  defaultCollapsed?: boolean;
  radios?: boolean;
  spacedAccordionItems?: boolean;
}

export interface DotsPaymentElementOptions {
  /**
   * Provide initial customer information that will be displayed in the Payment Element.
   */
  defaultValues?: DefaultValuesOption;

  /**
   * Override the business name displayed in the Payment Element.
   * By default the PaymentElement will use your Dots account or business name.
   */
  business?: { name: string };

  /**
   * Override the order in which payment methods are displayed in the Payment Element.
   * By default, the Payment Element will use a dynamic ordering that optimizes payment method display for each user.
   */
  paymentMethodOrder?: string[];

  /**
   * Control which fields are displayed in the Payment Element.
   */
  fields?: FieldsOption;

  /**
   * Apply a read-only state to the Payment Element so that payment details can’t be changed.
   * Default is false.
   */
  readOnly?: boolean;

  /**
   * Control terms display in the Payment Element.
   */
  terms?: TermsOption;

  /**
   * Control wallets display in the Payment Element.
   */
  wallets?: PaymentWalletsOption;

  /**
   * Specify a layout to use when rendering a Payment Element.
   */
  layout?: Layout | LayoutObject;
  styles?: Styles;
}

export interface DotsPaymentElementChangeEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: 'payment';

  /**
   * `true` if the all inputs in the Payment Element are empty.
   */
  empty: boolean;

  /**
   * `true` if the every input in the Payment Element is well-formed and potentially complete.
   */
  complete: boolean;

  /**
   * An object containing the currently selected PaymentMethod type (in snake_case, for example "afterpay_clearpay").
   */
  value: { type: string };
}
