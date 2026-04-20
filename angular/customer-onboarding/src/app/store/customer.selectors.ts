import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from './customer.reducer';

export const selectCustomerState = createFeatureSelector<CustomerState>('customer');

export const selectFlowId        = createSelector(selectCustomerState, (s) => s.flowId);
export const selectPersonalInfo  = createSelector(selectCustomerState, (s) => s.personalInfo);
export const selectContactDetails = createSelector(selectCustomerState, (s) => s.contactDetails);
export const selectSubmitting    = createSelector(selectCustomerState, (s) => s.submitting);
export const selectSubmitted     = createSelector(selectCustomerState, (s) => s.submitted);
export const selectError         = createSelector(selectCustomerState, (s) => s.error);
