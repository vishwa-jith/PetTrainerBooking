import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TrainerHomeComponent } from './trainer-home/trainer-home.component';
import { TrainerReportComponent } from './trainer-report/trainer-report.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserReportComponent } from './user-report/user-report.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  {
    path: 'home/trainer',
    component: TrainerHomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'report/trainer',
    component: TrainerReportComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: UserHomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'report',
    component: UserReportComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'home/admin',
    component: AdminHomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
