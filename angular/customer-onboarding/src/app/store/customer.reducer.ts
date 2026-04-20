import { createReducer, on } from '@ngrx/store';
import { CustomerActions } from './customer.actions';
import { CustomerStep1, CustomerStep2 } from './customer.model';
import { FlowIdService } from '../services/flow-id.service';

export interface CustomerState {
  flowId: string;
  personalInfo: CustomerStep1 | null;
  contactDetails: CustomerStep2 | null;
  submitting: boolean;
  submitted: boolean;
  error: string | null;
}

/** Build initial state with a fresh flowId each time the module loads (once per tab). */
export function createInitialState(flowIdService: FlowIdService): CustomerState {
  return {
    flowId: flowIdService.flowId,
    personalInfo: null,
    contactDetails: null,
    submitting: false,
    submitted: false,
    error: null,
  };
}

export function customerReducerFactory(flowIdService: FlowIdService) {
  const initialState = createInitialState(flowIdService);

  return createReducer(
    initialState,

    // ── Save wizard steps ──────────────────────────────────────────────────
    on(CustomerActions.savePersonalInfo,   (state, { data }) => ({ ...state, personalInfo: data })),
    on(CustomerActions.saveContactDetails, (state, { data }) => ({ ...state, contactDetails: data })),

    // ── Submission lifecycle ───────────────────────────────────────────────
    on(CustomerActions.submitCustomer, (state) => ({ ...state, submitting: true, error: null })),

    // On success: clear form data immediately (requirement) but keep submitted=true for UI
    on(CustomerActions.submitCustomerSuccess, (state) => ({
      ...initialState,
      submitted: true,
    })),

    on(CustomerActions.submitCustomerFailure, (state, { error }) => ({
      ...state,
      submitting: false,
      error,
    })),

    // Full reset — called when user starts a new flow
    on(CustomerActions.reset, () => initialState),
  );
}

// Re-export a plain reducer reference (patched in AppModule via factory)
export type CustomerReducerType = ReturnType<typeof customerReducerFactory>;
