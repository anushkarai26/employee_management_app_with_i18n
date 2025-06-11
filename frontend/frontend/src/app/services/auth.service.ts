import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, throwError, of, map } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/employees';  
  private loginStatusSubject = new Subject<boolean>();
  loginStatus$ = this.loginStatusSubject.asObservable();

  private authToken: string | null = null;
  private user: any = null;

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  updateLoginStatus(isLoggedin: boolean): void {
    this.loginStatusSubject.next(isLoggedin);
  }

  // Fetch all users (admin/authenticated users)
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // User login
  onLogin(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        map(res => {
          if (res.success) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('username', res.user.username);
            localStorage.setItem('role', res.user.role);
            this.authToken = res.token;  // Store token in the service
            this.updateLoginStatus(true);
          }
          return res;
        }),
        catchError(error => {
          console.error(error);
          return of({ success: false });
        })
      );
  }

  // Check if user is logged in
  isLoggedin(): boolean {
    return localStorage.getItem('username') !== null;
  }

  // Fetch user profile
  getProfile(username: string): Observable<any> {
    // Encode username to handle special characters (#, &, @)
    const encodedUsername = encodeURIComponent(username);

    // Prepare headers with Authorization and Content-Type
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(`${this.apiUrl}/profile/${encodedUsername}`, { headers });
  }

  // Load token from local storage
  private loadToken(): void {
    this.authToken = localStorage.getItem('token');
  }

  // User logout
  logout(): void {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.updateLoginStatus(false);
  }

  // Get the user role from local storage
  getUserRole(): string {
    const role = localStorage.getItem('role');
    return role !== null ? role.toString() : '';
  }
}

