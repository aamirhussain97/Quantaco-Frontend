import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SessionService } from './session.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private sessionService: SessionService, // Inject SessionService here
    private router: Router // Inject Router here
  ) {}

  // Method to retrieve session ID
  getSessionId(): string | null {
    // Logic to retrieve session ID from storage or wherever it's stored
    // For example, you might store it in local storage or retrieve it from the server response
    return sessionStorage.getItem('sessionid');
  }

  // Method to retrieve CSRF token
  getCSRFToken(): string | null {
    // Logic to retrieve CSRF token from storage or wherever it's stored
    // For example, you might store it in local storage or retrieve it from the server response
    return sessionStorage.getItem('csrftoken');
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:8000/myapp/api/login/', { username, password },{withCredentials: true})
      .pipe(
        map(response => {
          console.log(response)
          //MY CODE
          const sessionHeader = response.headers.get('Set-Cookie')
          console.log('Session header', sessionHeader)
          //my code
          this.sessionService.setAuthenticationStatus(true);
          this.sessionService.setUserDetails(response.user);
          return response;
        }),
        catchError(error => {
          console.error('Error during login:', error);
          return of(error);
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/logout/', {withCredentials: true})
      .pipe(
        catchError(error => {
          console.error('Error during logout:', error);
          return of(error);
        })
      );
  }

  isLoggedIn(): Observable<boolean> {
    return this.http.get<any>('http://localhost:8000/myapp/api/isloggedin', {withCredentials: true}).pipe(
      map(response => response.isLoggedIn),
      catchError(error => {
        console.error('Error checking login status:', error);
        return of(false);
      })
    );
  }
}
