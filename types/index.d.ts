import { Dots } from './dots-js';

export * from './api';
export * from './dots-js';

export const loadDots: (
  publishableKey: string,
  options?: any | undefined
) => Promise<Dots | null>;

declare global {
  interface Window {
    Tilled?: any;
  }
}
