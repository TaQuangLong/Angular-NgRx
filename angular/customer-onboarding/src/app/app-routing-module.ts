import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalInfoComponent }   from './features/personal-info/personal-info.component';
import { ContactDetailsComponent } from './features/contact-details/contact-details.component';
import { ReviewSubmitComponent }   from './features/review-submit/review-submit.component';

const routes: Routes = [
  { path: '',                redirectTo: 'personal-info', pathMatch: 'full' },
  { path: 'personal-info',  component: PersonalInfoComponent },
  { path: 'contact-details', component: ContactDetailsComponent },
  { path: 'review-submit',   component: ReviewSubmitComponent },
  { path: '**',              redirectTo: 'personal-info' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
