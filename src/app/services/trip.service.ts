import { Injectable } from '@angular/core';
import { Trip } from '../models/trip.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  tripApi = 'http://localhost:3000/trips';
  userApi = 'http://localhost:3000/users';  // API endpoint for users

  constructor(private http: HttpClient, private router: Router) { }

  createTrip(trip: Trip) {
    this.http.post(this.tripApi, trip).subscribe(() => {
      alert('Trip Created Successfully!');
    });
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.userApi);
  }

  addMemberToTrip(email: string, trip: Trip) {

  }
}