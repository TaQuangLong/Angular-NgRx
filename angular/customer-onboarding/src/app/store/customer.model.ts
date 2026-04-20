export interface CustomerStep1 {
  name: string;
  address: string;
  gender: string;
}

export interface CustomerStep2 {
  email: string;
  phoneNumber: string;
}

export interface CustomerPayload extends CustomerStep1, CustomerStep2 {
  /** Unique identifier for this browser-tab flow. */
  flowId: string;
}
