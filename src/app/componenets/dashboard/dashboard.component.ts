import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Trip } from 'src/app/models/trip.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  userTrips: any[] = [];
  showCreateTrip = false;
  displayTrip= false;
  selectedTrip!: Trip;
  constructor(private http: HttpClient,  private router: Router) {}

  ngOnInit() {
    // Fetch logged-in user
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.loadUserTrips();
    }
  }

  toggleShowCreateTrip(event: boolean){
    this.showCreateTrip = event;
    this.displayTrip = event;
  }

  toggleDisplayTrip(event: boolean){
    this.displayTrip = event;
    this.showCreateTrip = event;
  }

  loadUserTrips() {
    this.http.get<any[]>('http://localhost:3000/trips').subscribe((trips) => {
      // Filter trips where user is a member
      this.userTrips = trips.filter((trip) => trip.members.includes(this.user.email));
  
      // Sort trips by status: Completed first, then Ongoing, then Upcoming
      this.userTrips.sort((a, b) => this.getStatusPriority(a.status) - this.getStatusPriority(b.status));
    });
  }
  
  getStatusPriority(status: 'Completed' | 'Ongoing' | 'Upcoming'): number {
    const statusOrder: { Completed: number; Ongoing: number; Upcoming: number } = {
      Completed: 1,
      Ongoing: 2,
      Upcoming: 3
    };
  
    return statusOrder[status]; // No more TypeScript error
  }

  checkTrip(trip: Trip){
    this.selectedTrip = trip;
    this.displayTrip = true;
  }
}
