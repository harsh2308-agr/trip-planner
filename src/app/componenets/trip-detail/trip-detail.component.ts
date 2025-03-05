import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trip } from 'src/app/models/trip.model';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.css']
})
export class TripDetailComponent {
  @Input() trip: Trip | undefined;
  @Output() back = new EventEmitter<boolean>();
  addDayForm: FormGroup;
  newMemberEmail: string = '';

  constructor(private fb: FormBuilder){
    this.addDayForm = this.fb.group({
      date: ['', Validators.required],
      activity: ['', [Validators.required, Validators.minLength(3)]],
      time: ['', Validators.required],
      description: ['', Validators.required],
      location: ['']
    });
  }
  addMember() {
    
  }

  addDay() {
    if (this.addDayForm.invalid) return;

    const newDay = this.addDayForm.value;
    console.log('New Trip Day:', newDay);
    alert('Day added successfully!');

  }

  openAddExpenseModal() {
    alert("Feature to add expenses coming soon!");
  }

  goBack(){
    this.back.emit(false);
  }

  removeDay(dayNumber: number) {
    if (this.trip) {
      this.trip.itinerary = this.trip.itinerary!=null ? this.trip.itinerary.filter(day => day.day !== dayNumber): [];
    }
  }

  removeExpense(expenseId: number) {
    if (this.trip) {
      this.trip.expenses = this.trip.expenses ? this.trip.expenses.filter(expense => expense.id !== expenseId): [];
    }
  }

  removeMember(memberEmail: string) {
    if (this.trip) {
      this.trip.members = this.trip.members.filter(member => member !== memberEmail);
    }
  }
}
