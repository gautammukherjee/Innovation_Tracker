import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ModuleSelectionComponent } from './module-selection/module-selection.component';

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
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: { title: 'Logout', animation: 'LogoutPage' }
  },
  {
    path: 'module_selection',
    component: ModuleSelectionComponent,
    data: { title: 'Module Selection' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
