import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Trip } from 'src/app/models/trip.model';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent {
  tripForm: FormGroup;
  backtoDashboard = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.tripForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      destination: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: [1000, [Validators.required, Validators.min(1000)]],
      members: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.tripForm.invalid) return;
    
    const formData = this.tripForm.value;
    const newTrip: Trip = {
      id: Math.floor(Math.random() * 10000),
      ...formData,
      members: formData.members.split(',').map((m: string) => m.trim()), // Convert members to array
      status: 'Upcoming'
    };

    this.http.post('http://localhost:3000/trips', newTrip).subscribe(() => {
      alert('Trip Created Successfully!');
      this.router.navigate(['/dashboard']); // Redirect to dashboard
    });
  }
}
