import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CustomerStep1, CustomerStep2 } from './customer.model';

export const CustomerActions = createActionGroup({
  source: 'Customer',
  events: {
    'Save Personal Info':    props<{ data: CustomerStep1 }>(),
    'Save Contact Details':  props<{ data: CustomerStep2 }>(),
    'Submit Customer':        emptyProps(),
    'Submit Customer Success': emptyProps(),
    'Submit Customer Failure': props<{ error: string }>(),
    'Reset':                  emptyProps(),
  },
});
