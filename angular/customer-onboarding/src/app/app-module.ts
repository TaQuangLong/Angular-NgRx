import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { PersonalInfoComponent }   from './features/personal-info/personal-info.component';
import { ContactDetailsComponent } from './features/contact-details/contact-details.component';
import { ReviewSubmitComponent }   from './features/review-submit/review-submit.component';
import { CustomerEffects }                from './store/customer.effects';
import { customerReducerFactory }         from './store/customer.reducer';
import { FlowIdService }                  from './services/flow-id.service';
import { sessionStorageSyncMetaReducer }  from './store/storage-sync.meta-reducer';

@NgModule({
  declarations: [
    App,
    PersonalInfoComponent,
    ContactDetailsComponent,
    ReviewSubmitComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(
      { customer: customerReducerFactory(new FlowIdService()) },
      { metaReducers: [sessionStorageSyncMetaReducer] },
    ),
    EffectsModule.forRoot([CustomerEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, name: 'Customer Onboarding' }),
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    FlowIdService,
  ],
  bootstrap: [App],
})
export class AppModule { }
