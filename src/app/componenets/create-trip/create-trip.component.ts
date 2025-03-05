import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent {
  tripForm: FormGroup;
  backtoDashboard = false;
  @Output() back = new EventEmitter<boolean>();
  constructor(
    private fb: FormBuilder, 
    private tripService: TripService
  ) {
    this.tripForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      destination: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: [1000, [Validators.required, Validators.min(1000)]],
      members: ['', Validators.required]
    });
  }

  goBack() {
    this.back.emit(false);
  }

  onSubmit() {
    if (this.tripForm.invalid) return;

    const formData = this.tripForm.value;
    const currentDate = new Date();
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    // Determine trip status based on dates
    let status: 'Invalid' | 'Upcoming' | 'Ongoing' | 'Completed';
    if (endDate < currentDate) {
        status = 'Invalid';
    } else if (startDate > currentDate) {
        status = 'Upcoming';
    } else {
        status = 'Ongoing';
    }

    // Convert members to array
    const enteredMembers = formData.members.split(',').map((m: string) => m.trim());

    this.tripService.getUsers().subscribe(users => {
        const validMembers = enteredMembers.filter((email: any) => users.some(user => user.email === email));
        if (validMembers.length === 0) {
            alert('No valid members found. Please enter existing user emails.');
            return;
        }
        const newTrip: Trip = {
            id: Math.floor(Math.random() * 10000),
            ...formData,
            members: validMembers,
            status
        };
        this.tripService.createTrip(newTrip);
        this.goBack();
    });
}

}
