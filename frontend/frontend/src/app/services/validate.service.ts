import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  onSubmit(obj: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, obj);
  }

  validateRegister(user: any): boolean {
    if (!user.Name || !user.email || !user.username || !user.password) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}
