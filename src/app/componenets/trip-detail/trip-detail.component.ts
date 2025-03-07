import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItineraryItem, Trip } from 'src/app/models/trip.model';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})
export class TripDetailComponent {
  @Input() trip!: Trip;
  @Output() back = new EventEmitter<boolean>();
  addDayForm: FormGroup;
  newMemberEmail: string = '';
  alertMessage: string | null = null;
  alertType: 'success' | 'error' = 'success';

  constructor(private fb: FormBuilder, private readonly tripService: TripService) {
    this.addDayForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      description: [''],
      location: ['']
    });
  }

  addMember() {
    this.tripService.addMemberToTrip(this.newMemberEmail, this.trip).then(success => {
      if (success) {
        // Handle UI update, maybe close the modal or show a success message
        this.showAlert(`${this.newMemberEmail} added successfully to the trip!`, 'success');
      } else {
        this.showAlert('Failed to add member. Either the user does not exist or is already a member.', 'error');
      }
    });
  }

  addDay() {
    if (this.addDayForm.valid && this.trip) {
      const newDay: ItineraryItem = {
        day: this.trip.itinerary ? this.trip.itinerary.length + 1 : 1,
        date: new Date(this.addDayForm.value.date),
        activity: '', // No need as activities are stored separately
        time: this.addDayForm.value.time,
        description: this.addDayForm.value.description,
        location: this.addDayForm.value.location,
      };
      this.trip.itinerary = [...(this.trip.itinerary || []), newDay];
      this.tripService.updateTrip(this.trip).then(() => {
        this.addDayForm.reset();
        this.showAlert("Day has been added successfully", "success");
      });
    }
  }


  openAddExpenseModal() {
    const msg = "Feature to add expenses coming soon!";
    this.showAlert(msg, "success");
  }

  goBack() {
    this.back.emit(false);
  }

  removeDay(dayNumber: number) {
    if (this.trip) {
      this.trip.itinerary = this.trip.itinerary != null ? this.trip.itinerary.filter(day => day.day !== dayNumber) : [];
    }
  }

  removeExpense(expenseId: number) {
    if (this.trip) {
      this.trip.expenses = this.trip.expenses ? this.trip.expenses.filter(expense => expense.id !== expenseId) : [];
    }
  }

  removeMember(memberEmail: string) {
    if (this.trip) {
      this.trip.members = this.trip.members.filter(member => member !== memberEmail);
      this.tripService.updateTrip(this.trip).then(success => {
        if (success) {
          this.showAlert(`${memberEmail} removed successfully from the trip!`, 'success');
        } else {
          this.showAlert('Failed to remove member. Please try again.', 'error');
        }
      });
    }
  }

  showAlert(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = null; // Hide alert after 3 seconds
    }, 4000);
  }
}
