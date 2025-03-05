import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  userId: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup() {
    if (this.name.length < 3 || !this.email.includes('@') || this.password.length < 6) {
      alert('Please fill all fields correctly before signing up.');
      return;
    }
    const newUser = { name: this.name, email: this.email, userId: this.userId, password: this.password };
  
    this.authService.signup(newUser).subscribe(response => {
      if (response.success) {
        alert('Signup successful! Please login.');
        this.router.navigate(['/login']);
      } else {
        alert(response.message); // Show error if userId exists
      }
    });
  }
}
