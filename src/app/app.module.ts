import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupListComponent } from './componenets/group-list/group-list.component';
import { GroupDetailComponent } from './componenets/group-detail/group-detail.component';
import { TripDetailComponent } from './componenets/trip-detail/trip-detail.component';
import { TripListComponent } from './componenets/trip-list/trip-list.component';
import { ExpenseTrackerComponent } from './componenets/expense-tracker/expense-tracker.component';
import { TripSuggestionsComponent } from './componenets/trip-suggestions/trip-suggestions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './componenets/auth/login/login.component';
import { SignupComponent } from './componenets/auth/signup/signup.component';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './componenets/dashboard/dashboard.component';
import { NavbarComponent } from './componenets/navbar/navbar.component';
import { CreateTripComponent } from './componenets/create-trip/create-trip.component';
import { TripService } from './services/trip.service';
import { AlertComponent } from './componenets/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupListComponent,
    GroupDetailComponent,
    TripDetailComponent,
    TripListComponent,
    ExpenseTrackerComponent,
    TripSuggestionsComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    NavbarComponent,
    CreateTripComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule 
  ],
  providers: [AuthService, TripService],
  bootstrap: [AppComponent]
})
export class AppModule { }
