import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { CustomerActions } from './customer.actions';
import { CustomerService } from '../services/customer.service';
import { FlowIdService } from '../services/flow-id.service';
import { selectPersonalInfo, selectContactDetails } from './customer.selectors';
import { CustomerPayload } from './customer.model';

@Injectable()
export class CustomerEffects {
  submit$: any;

  constructor(
    private actions$: Actions,
    private store: Store,
    private customerService: CustomerService,
    private flowIdService: FlowIdService,
  ) {
    this.submit$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CustomerActions.submitCustomer),
        withLatestFrom(
          this.store.select(selectPersonalInfo),
          this.store.select(selectContactDetails)
        ),
        switchMap(([, personalInfo, contactDetails]) => {
          const payload: CustomerPayload = {
            ...personalInfo!,
            ...contactDetails!,
            flowId: this.flowIdService.flowId,
          };
          return this.customerService.save(payload).pipe(
            map(() => CustomerActions.submitCustomerSuccess()),
            catchError((err) =>
              of(CustomerActions.submitCustomerFailure({
                error: err?.error?.detail ?? 'Submission failed. Please try again.',
              }))
            )
          );
        })
      )
    );
  }
}

