import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componenets/auth/login/login.component';
import { SignupComponent } from './componenets/auth/signup/signup.component';
import { DashboardComponent } from './componenets/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'trip-planner/signup', component: SignupComponent },
  { path: 'trip-planner/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], // 
  exports: [RouterModule]
})
export class AppRoutingModule {}
