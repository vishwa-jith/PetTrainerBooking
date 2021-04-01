import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TrainerHomeComponent } from './trainer-home/trainer-home.component';
import { TrainerReportComponent } from './trainer-report/trainer-report.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserReportComponent } from './user-report/user-report.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { LoggedUserGuard } from './guards/loggedUser/logged-user.guard';
import { OwnerGuard } from './guards/owner/owner.guard';
import { TrainerGuard } from './guards/trainer/trainer.guard';
import { AdminGuard } from './guards/admin/admin.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [LoggedUserGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
    canActivate: [LoggedUserGuard],
  },
  {
    path: 'home/trainer',
    component: TrainerHomeComponent,
    pathMatch: 'full',
    canActivate: [TrainerGuard],
  },
  {
    path: 'report/trainer',
    component: TrainerReportComponent,
    pathMatch: 'full',
    canActivate: [TrainerGuard],
  },
  {
    path: 'home',
    component: UserHomeComponent,
    pathMatch: 'full',
    canActivate: [OwnerGuard],
  },
  {
    path: 'report',
    component: UserReportComponent,
    pathMatch: 'full',
    canActivate: [OwnerGuard],
  },
  {
    path: 'home/admin',
    component: AdminHomeComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
