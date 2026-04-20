import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CustomerActions } from '../../store/customer.actions';
import { selectPersonalInfo, selectContactDetails, selectSubmitting, selectSubmitted, selectError, selectFlowId } from '../../store/customer.selectors';
import { CustomerStep1, CustomerStep2 } from '../../store/customer.model';

@Component({
  selector: 'app-review-submit',
  templateUrl: './review-submit.component.html',
  standalone: false,
})
export class ReviewSubmitComponent implements OnInit {
  personalInfo$: Observable<CustomerStep1 | null>;
  contactDetails$: Observable<CustomerStep2 | null>;
  submitting$: Observable<boolean>;
  submitted$: Observable<boolean>;
  error$: Observable<string | null>;
  flowId$: Observable<string>;

  constructor(private store: Store, private router: Router) {
    this.personalInfo$   = this.store.select(selectPersonalInfo);
    this.contactDetails$ = this.store.select(selectContactDetails);
    this.submitting$     = this.store.select(selectSubmitting);
    this.submitted$      = this.store.select(selectSubmitted);
    this.error$          = this.store.select(selectError);
    this.flowId$         = this.store.select(selectFlowId);
  }

  ngOnInit(): void {
    this.store.select(selectPersonalInfo).pipe(take(1)).subscribe((info) => {
      if (!info) this.router.navigate(['/personal-info']);
    });
    this.store.select(selectContactDetails).pipe(take(1)).subscribe((contact) => {
      if (!contact) this.router.navigate(['/contact-details']);
    });
  }

  back(): void {
    this.router.navigate(['/contact-details']);
  }

  submit(): void {
    this.store.dispatch(CustomerActions.submitCustomer());
  }

  restart(): void {
    this.store.dispatch(CustomerActions.reset());
    this.router.navigate(['/personal-info']);
  }
}
