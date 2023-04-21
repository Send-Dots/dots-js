import { DotsElement } from '../dots-js';

export type PaymentMethod = {
  element: DotsElement;
  id: string;
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
