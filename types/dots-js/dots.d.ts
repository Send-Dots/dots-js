export interface Dots { }
/**
 * Use `Dots(clientId, options?)` to create an instance of the `Dots` object.
 * The Dots object is your entrypoint to the rest of the Dots.js SDK.
 *
 * Your Dots Client ID is required when calling this function, as it identifies your website to Dots.
 *
 */

export interface Tilled { }

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
