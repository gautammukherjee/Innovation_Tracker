import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NewsletterDetailsComponent } from './newsletter-details/newsletter-details.component';
import { ManagePasswordComponent } from './manage-password/manage-password.component';
import { AllNewsComponent } from './all-news/all-news.component';
import { FilterDiseaseSynonymComponent } from './filters/filter-disease-synonym/filter-disease-synonym.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: { title: 'Logout', animation: 'LogoutPage' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'filter/filter-disease-synonym',
    component: FilterDiseaseSynonymComponent
  },
  {
    path: 'all-news',
    component: AllNewsComponent
  },
  {
    path: 'manage-password',
    component: ManagePasswordComponent
  },
  {
    path: 'newsletter-details/:id',
    component: NewsletterDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
