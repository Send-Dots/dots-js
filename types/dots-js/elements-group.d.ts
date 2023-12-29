import {
  DotsCardElement,
  DotsAddressElement,
  DotsAddressElementOptions,
  DotsCardElementOptions,
  DotsPaymentElement,
  DotsPaymentElementOptions,
} from './elements';
import {
  DotsPaymentRequestButtonElement,
  DotsPaymentRequestButtonElementOptions,
} from './elements/payment-request-button';

export interface DotsElementsUpdateOptions {
  /**
   * The [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) of the locale to display placeholders and error strings in.
   * Default is `auto` (Stripe detects the locale of the browser).
   * Setting the locale does not affect the behavior of postal code validation—a valid postal code for the billing country of the card is still required.
   */
  locale?: DotsElementLocale;

  /**
   * Match the design of your site with the appearance option.
   * The layout of each Element stays consistent, but you can modify colors, fonts, borders, padding, and more.
   *
   */
  appearance?: Appearance;
}
export interface DotsElements {
  /**
   * Updates the options that `Elements` was initialized with.
   * Updates are shallowly merged into the existing configuration.
   */
  update(options: DotsElementsUpdateOptions): void;

  /**
   * Fetches updates from the associated PaymentIntent or SetupIntent on an existing
   * instance of Elements, and reflects these updates in the Payment Element.
   */
  //   fetchUpdates(): Promise<{ error?: { message: string; status?: string } }>;

  /////////////////////////////
  /// payment
  /////////////////////////////

  /**
   * Creates a `PaymentElement`.
   *
   */
  create(
    elementType: 'payment',
    options?: DotsPaymentElementOptions
  ): Promise<DotsPaymentElement>;

  /**
   * Looks up a previously created `Element` by its type.
   */
  getElement(elementType: 'payment'): DotsPaymentElement | null;

  /////////////////////////////
  /// paymentRequestButton
  /////////////////////////////

  /**
   * Creates a `PaymentRequestButtonElement`.
   *
   */
  create(
    elementType: 'paymentRequestButton',
    options: DotsPaymentRequestButtonElementOptions
  ): Promise<DotsPaymentRequestButtonElement>;

  /**
   * Looks up a previously created `Element` by its type.
   */
  getElement(
    elementType: 'paymentRequestButton'
  ): DotsPaymentRequestButtonElement | null;
}
export type DotsElementType = 'payment' | 'paymentRequestButton';
export type DotsElement = DotsPaymentElement | DotsPaymentRequestButtonElement;
export interface DotsElementsOptions {
  /**
   * An array of custom fonts, which elements created from the `Elements` object can use.
   */
  fonts?: Array<CssFontSource | CustomFontSource>;

  /**
   * The [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) of the locale to display placeholders and error strings in.
   * Default is `auto` (Stripe detects the locale of the browser).
   * Setting the locale does not affect the behavior of postal code validation—a valid postal code for the billing country of the card is still required.
   */
  locale?: DotsElementLocale;

  /**
   * Match the Payment Element with the design of your site with the appearance option.
   * The layout of the Payment Element stays consistent, but you can modify colors, fonts, borders, padding, and more.
   *
   * @docs https://docs.dots.dev/flows/styles
   */
  appearance?: Appearance;

  /**
   * The client secret for a PaymentIntent or SetupIntent used by the Payment Element.
   *
   */
  clientSecret?: string;

  /**
   * Display skeleton loader UI while waiting for Elements to be fully loaded, after they are mounted.
   * Supported for the `payment`, `shippingAddress`, and `linkAuthentication` Elements.
   * Default is `'auto'` (Stripe determines if a loader UI should be shown).
   */
  loader?: 'auto' | 'always' | 'never';
}

/*
 * Use a `CssFontSource` to pass custom fonts via a stylesheet URL when creating an `Elements` object.
 */
export interface CssFontSource {
  /**
   * A relative or absolute URL pointing to a CSS file with [@font-face](https://developer.mozilla.org/en/docs/Web/CSS/@font-face) definitions, for example:
   *
   *     https://fonts.googleapis.com/css?family=Open+Sans
   *
   * Note that if you are using a [content security policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) (CSP), [additional directives](https://stripe.com/docs/security#content-security-policy) may be necessary.
   */
  cssSrc: string;
}

/*
 * Use a `CustomFontSource` to pass custom fonts when creating an `Elements` object.
 */
export interface CustomFontSource {
  /**
   * The name to give the font
   */
  family: string;

  /**
   * A valid [src](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src) value pointing to your custom font file.
   * This is usually (though not always) a link to a file with a `.woff` , `.otf`, or `.svg` suffix.
   */
  src: string;

  /**
   * A valid [font-display](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) value.
   */
  display?: string;

  /**
   * Defaults to `normal`.
   */
  style?: 'normal' | 'italic' | 'oblique';

  /**
   * A valid [unicode-range](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/unicode-range) value.
   */
  unicodeRange?: string;

  /**
   * A valid [font-weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight), as a string.
   */
  weight?: string;
}

export type DotsElementLocale =
  | 'auto'
  | 'ar'
  | 'bg'
  | 'cs'
  | 'da'
  | 'de'
  | 'el'
  | 'en'
  | 'en-AU'
  | 'en-CA'
  | 'en-NZ'
  | 'en-GB'
  | 'es'
  | 'es-ES'
  | 'es-419'
  | 'et'
  | 'fi'
  | 'fr'
  | 'fr-FR'
  | 'he'
  | 'hu'
  | 'id'
  | 'it'
  | 'it-IT'
  | 'ja'
  | 'ko'
  | 'lt'
  | 'lv'
  | 'ms'
  | 'mt'
  | 'nb'
  | 'nl'
  | 'no'
  | 'pl'
  | 'pt'
  | 'pt-BR'
  | 'ro'
  | 'ru'
  | 'sk'
  | 'sl'
  | 'sv'
  | 'th'
  | 'tr'
  | 'vi'
  | 'zh'
  | 'zh-HK'
  | 'zh-TW';

export interface Style {
  fontFamily?: string;
  color?: string;
  fontWeight?: string;
  fontSize?: string;
  opacity?: string;
  letterSpacing?: string;
  textAlign?: string;
  textIntent?: string;
  textDecoration?: string;
  textShadow?: string;
  font?: string;
  fontStyle?: string;
  lineWeight?: string;
  transition?: string;
  colorPrimaryText?: string;
  colorIcon?: string;
  colorInputBackground?: string;
}

export interface Styles {
  base?: Style;
  invalid?: Style;
  valid?: Style;
}

//this is some old stuff, see the Styles interface above for the one that is actually being used

export interface Appearance {
  disableAnimations?: boolean;

  theme?: 'none';

  variables?: {
    // General font styles
    fontFamily?: string;
    fontSmooth?: string;
    fontVariantLigatures?: string;
    fontVariationSettings?: string;
    fontLineHeight?: string;

    // Font sizes
    fontSizeBase?: string;
    fontSizeSm?: string;
    fontSizeXs?: string;
    fontSize2Xs?: string;
    fontSize3Xs?: string;
    fontSizeLg?: string;
    fontSizeXl?: string;

    // Font weights
    fontWeightLight?: string;
    fontWeightNormal?: string;
    fontWeightMedium?: string;
    fontWeightBold?: string;

    // Spacing
    spacingUnit?: string;
    spacingGridRow?: string;
    spacingGridColumn?: string;
    spacingTab?: string;
    spacingAccordionItem?: string;

    // Colors
    colorPrimary?: string;
    colorPrimaryText?: string;
    colorBackground?: string;
    colorBackgroundText?: string;
    colorText?: string;
    colorSuccess?: string;
    colorSuccessText?: string;
    colorDanger?: string;
    colorDangerText?: string;
    colorWarning?: string;
    colorWarningText?: string;

    // Text variations
    colorTextSecondary?: string;
    colorTextPlaceholder?: string;

    // Icons
    colorIcon?: string;
    colorIconHover?: string;
    colorIconCardError?: string;
    colorIconCardCvc?: string;
    colorIconCardCvcError?: string;
    colorIconCheckmark?: string;
    colorIconChevronDown?: string;
    colorIconChevronDownHover?: string;
    colorIconRedirect?: string;
    colorIconTab?: string;
    colorIconTabHover?: string;
    colorIconTabSelected?: string;
    colorIconTabMore?: string;
    colorIconTabMoreHover?: string;

    // Logos
    colorLogo?: string;
    colorLogoTab?: string;
    colorLogoTabSelected?: string;
    colorLogoBlock?: string;

    // Focus
    focusBoxShadow?: string;
    focusOutline?: string;

    // Radius
    borderRadius?: string;
  };

  rules?: {
    [selector: string]: {
      [cssPropertyName: string]: string;
    };
  };

  labels?: 'above' | 'floating';
}
