import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  feedback = {
    name: '',
    email: '',
    type: 'query',
    message: '',
    rating: 0
  };

  setRating(star: number) {
    this.feedback.rating = star;
  }

  submitFeedback() {
    console.log('User Feedback:', this.feedback);
    alert('Thank you for your feedback!');
    this.feedback = { name: '', email: '', type: 'query', message: '', rating: 0 };
  }
}
