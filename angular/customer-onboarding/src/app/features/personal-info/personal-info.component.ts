import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { CustomerActions } from '../../store/customer.actions';
import { selectPersonalInfo } from '../../store/customer.selectors';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  standalone: false,
})
export class PersonalInfoComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(2)]],
      address: ['', Validators.required],
      gender:  ['', Validators.required],
    });

    this.store.select(selectPersonalInfo).pipe(take(1)).subscribe((data) => {
      if (data) this.form.patchValue(data);
    });
  }

  next(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.store.dispatch(CustomerActions.savePersonalInfo({ data: this.form.getRawValue() }));
    this.router.navigate(['/contact-details']);
  }
}
