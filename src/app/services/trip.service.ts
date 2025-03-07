import { Injectable } from '@angular/core';
import { Trip } from '../models/trip.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  tripApi = 'http://localhost:3000/trips';
  userApi = 'http://localhost:3000/users';
  users: User[] = [];
  constructor(private http: HttpClient, private router: Router) { }

  createTrip(trip: Trip) {
    this.http.post(this.tripApi, trip).subscribe(() => {
      alert('Trip Created Successfully!');
    });
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.userApi);
  }

  addMemberToTrip(email: string, trip: Trip): Promise<boolean> {
    return new Promise((resolve) => {
      this.http.get<User[]>(this.userApi).subscribe(users => {
        const user = users.find(user => user.email === email); // Find user by email
  
        if (user) {
          if (!trip.members.includes(email)) {
            trip.members.push(email);
            this.updateTrip(trip).then(success => resolve(success));
          } else {
            resolve(false); // User is already a member
          }
        } else {
          resolve(false); // User not found
        }
      });
    });
  }
  
  updateTrip(trip: Trip): Promise<boolean> {
    return new Promise((resolve) => {
      this.http.put(`${this.tripApi}/${trip.id}`, { ...trip }).subscribe(
        () => {
          console.log('Trip updated successfully!');
          resolve(true);
        },
        (error) => {
          console.error('Error updating trip:', error);
          resolve(false);
        }
      );
    });
  }
  
}