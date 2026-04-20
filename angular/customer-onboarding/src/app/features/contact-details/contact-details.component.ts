import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { CustomerActions } from '../../store/customer.actions';
import { selectContactDetails } from '../../store/customer.selectors';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  standalone: false,
})
export class ContactDetailsComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email:       ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-]{7,15}$/)]],
    });

    this.store.select(selectContactDetails).pipe(take(1)).subscribe((data) => {
      if (data) this.form.patchValue(data);
    });
  }

  back(): void {
    this.router.navigate(['/personal-info']);
  }

  next(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.store.dispatch(CustomerActions.saveContactDetails({ data: this.form.getRawValue() }));
    this.router.navigate(['/review-submit']);
  }
}
