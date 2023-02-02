import { DotsElementBase } from './base';
import { DotsError } from '../dots';

export type DotsAddressElement = DotsElementBase & {
  /**
   * The change event is triggered when the `Element`'s value changes.
   */
  on(
    eventType: 'change',
    handler: (event: DotsAddressElementChangeEvent) => any
  ): DotsAddressElement;
  once(
    eventType: 'change',
    handler: (event: DotsAddressElementChangeEvent) => any
  ): DotsAddressElement;
  off(
    eventType: 'change',
    handler?: (event: DotsAddressElementChangeEvent) => any
  ): DotsAddressElement;

  /**
   * Triggered when the element is fully rendered and can accept `element.focus` calls.
   */
  on(
    eventType: 'ready',
    handler: (event: { elementType: 'address' }) => any
  ): DotsAddressElement;
  once(
    eventType: 'ready',
    handler: (event: { elementType: 'address' }) => any
  ): DotsAddressElement;
  off(
    eventType: 'ready',
    handler?: (event: { elementType: 'address' }) => any
  ): DotsAddressElement;

  /**
   * Triggered when the element gains focus.
   */
  on(
    eventType: 'focus',
    handler: (event: { elementType: 'address' }) => any
  ): DotsAddressElement;
  once(
    eventType: 'focus',
    handler: (event: { elementType: 'address' }) => any
  ): DotsAddressElement;
  off(
    eventType: 'focus',
    handler?: (event: { elementType: 'address' }) => any
  ): DotsAddressElement;

  /**
   * Triggered when the element loses focus.
   */
  on(
    eventType: 'blur',
    handler: (event: { elementType: 'address' }) => any
  ): DotsAddressElement;
  once(
    eventType: 'blur',
    handler: (event: { elementType: 'address' }) => any
  ): DotsAddressElement;
  off(
    eventType: 'blur',
    handler?: (event: { elementType: 'address' }) => any
  ): DotsAddressElement;

  /**
   * Triggered when the escape key is pressed within the element.
   */
  on(
    eventType: 'escape',
    handler: (event: { elementType: 'address' }) => any
  ): DotsAddressElement;
  once(
    eventType: 'escape',
    handler: (event: { elementType: 'address' }) => any
  ): DotsAddressElement;
  off(
    eventType: 'escape',
    handler?: (event: { elementType: 'address' }) => any
  ): DotsAddressElement;

  /**
   * Triggered when the element fails to load.
   */
  on(
    eventType: 'loaderror',
    handler: (event: { elementType: 'address'; error: DotsError }) => any
  ): DotsAddressElement;
  once(
    eventType: 'loaderror',
    handler: (event: { elementType: 'address'; error: DotsError }) => any
  ): DotsAddressElement;
  off(
    eventType: 'loaderror',
    handler?: (event: { elementType: 'address'; error: DotsError }) => any
  ): DotsAddressElement;

  /**
   * Triggered when the loader UI is mounted to the DOM and ready to be displayed.
   */
  on(
    eventType: 'loaderstart',
    handler: (event: { elementType: 'address' }) => any
  ): DotsAddressElement;
  once(
    eventType: 'loaderstart',
    handler: (event: { elementType: 'address' }) => any
  ): DotsAddressElement;
  off(
    eventType: 'loaderstart',
    handler?: (event: { elementType: 'address' }) => any
  ): DotsAddressElement;

  /**
   * Updates the options the `AddressElement` was initialized with.
   * Updates are merged into the existing configuration.
   */
  update(options: Partial<DotsAddressElementOptions>): DotsAddressElement;
};

export interface ContactOption {
  name: string;
  phone?: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

export type AddressMode = 'shipping' | 'billing';

export interface DotsAddressElementOptions {
  /**
   * Control which mode the AddressElement will be used for.
   */
  mode: AddressMode;

  /**
   * An array of two-letter ISO country codes representing which countries
   * are displayed in the AddressElement.
   */
  allowedCountries?: string[] | null;

  /**
   * Control autocomplete settings in the AddressElement.
   */
  autocomplete?:
    | { mode: 'automatic' }
    | { mode: 'disabled' }
    | { mode: 'google_maps_api'; apiKey: string };

  /**
   * Whether or not AddressElement accepts PO boxes
   */
  blockPoBox?: boolean;

  /**
   * An array of saved addresses.
   */
  contacts?: ContactOption[];

  /**
   * Default value for AddressElement fields
   */
  defaultValues?: {
    name?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    address?: {
      line1?: string | null;
      line2?: string | null;
      city?: string | null;
      state?: string | null;
      postal_code?: string | null;
      country: string;
    };
    phone?: string | null;
  };

  /**
   * Control which additional fields to display in the AddressElement.
   */
  fields?: {
    phone?: 'always' | 'never' | 'auto';
  };

  /**
   * Specify validation rules for the above additional fields.
   */
  validation?: {
    phone?: {
      required: 'always' | 'never' | 'auto';
    };
  };

  /**
   * Specify display options in the AddressElement
   */
  display?: {
    name?: 'full' | 'split' | 'organization';
  };
}

export interface DotsAddressElementChangeEvent {
  /**
   * The type of element that emitted this event.
   */
  elementType: 'address';

  /**
   * The mode of the AddressElement that emitted this event.
   */
  elementMode: AddressMode;

  /**
   * Whether or not the AddressElement is currently empty.
   */
  empty: boolean;

  /**
   * Whether or not the AddressElement is complete.
   */
  complete: boolean;

  /**
   * Whether or not the address is new.
   */
  isNewAddress: boolean;

  /**
   * An object containing the current address.
   */
  value: {
    name: string;
    firstName?: string;
    lastName?: string;
    address: {
      line1: string;
      line2: string | null;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
    phone?: string;
  };
}
