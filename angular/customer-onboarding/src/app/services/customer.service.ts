import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerPayload } from '../store/customer.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly url = `${environment.apiUrl}/api/customers`;

  constructor(private http: HttpClient) {}

  save(customer: CustomerPayload): Observable<void> {
    return this.http.post<void>(this.url, customer);
  }
}
