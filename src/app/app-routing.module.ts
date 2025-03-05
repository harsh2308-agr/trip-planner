import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { LoginComponent } from './componenets/auth/login/login.component';
import { SignupComponent } from './componenets/auth/signup/signup.component';
import { DashboardComponent } from './componenets/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { CreateTripComponent } from './componenets/create-trip/create-trip.component';
import { ExpenseTrackerComponent } from './componenets/expense-tracker/expense-tracker.component';

const routes: Routes = [
  { path: '', redirectTo: 'trip-planner/login', pathMatch: 'full' },
  { path: 'trip-planner/login', component: LoginComponent },
  { path: 'trip-planner/signup', component: SignupComponent },
  { path: 'trip-planner/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'trip-planner/login' } // Redirect any unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
