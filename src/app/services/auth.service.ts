import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = 'http://localhost:3000/users';
  private users: any[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.loadUsers();
  }

  private loadUsers() {
    this.http.get<any[]>(this.usersUrl).subscribe(users => {
      this.users = users || [];
    });
  }

  login(userId: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map(users => users.find(user => user.userId === userId && user.password === password))
    );
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/login';
  }

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }

  signup(newUser: any): Observable<any> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map(users => {
        const userExists = users.some(u => u.userId === newUser.userId);
        if (userExists) {
          return { success: false, message: 'User ID already exists! Please choose another.' };
        } else {
          return this.http.post(this.usersUrl, newUser).pipe(
            map(() => ({ success: true })),
            catchError(error => of({ success: false, message: 'Error creating user.' }))
          );
        }
      }),
      catchError(error => of({ success: false, message: 'Error fetching users.' }))
    );
  }

  isAuthenticated(): boolean {
    const user = localStorage.getItem('loggedInUser');
    console.log('AuthService - isAuthenticated:', user ? 'Yes' : 'No');
    return user !== null;
  }

  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
    return true;
  }
}
