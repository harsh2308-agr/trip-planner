import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userId: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.userId || !this.password) {
      this.errorMessage = 'User ID and Password are required';
      return;
    }

    this.authService.login(this.userId, this.password).subscribe(user => {
      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user)); // Store session
        this.router.navigate(['/trip-planner/dashboard']); // Redirect to Dashboard
      } else {
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    });
  }
}
