import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn: boolean = false;
  username: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  dob: string = '';
  phoneNumber: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.authService.isLoggedIn().subscribe({
      next: (isLoggedIn) => {
        this.loggedIn = isLoggedIn;
      },
      error: (error) => {
        console.error('Error checking login status:', error);
        // Handle error, e.g., redirect to error page or show a message to the user
      }
    });
  }

  login(): void {
    if (!this.username || !this.password) {
      console.error('Username and password are required');
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.loggedIn = true;
        console.log(response)
        console.log(response.headers)
        const headers = response.headers;
        console.log(headers);
        const xToken = headers.get('X-Token');
        console.log('X-Token:', xToken);
        console.log(document.cookie)
      },
      error: (error) => {
        console.error('Login error:', error);
        // Handle login error, e.g., show error message to the user
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log('Logout successful');
        this.loggedIn = false;
      },
      error: (error) => {
        console.error('Logout error:', error);
      }
    });
  }

  clearFields(): void {
    this.firstName = '';
    this.lastName = '';
    this.dob = '';
    this.phoneNumber = '';
  }

  submitForm(): void {
    if (!this.loggedIn) {
      console.log('User is not logged in');
      return;
    }

    const userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      dob: this.dob,
      phoneNumber: this.phoneNumber
    };

    // Fetch the CSRF token from cookies
    const csrftoken = this.getCookie('csrftoken');

    // Check if CSRF token exists
    if (!csrftoken) {
      console.error('CSRF token not found');
      return;
    }

    // Fetch the session ID from cookies
    // const sessionId = this.getCookie('sessionid');

    // // Check if session ID exists
    // if (!sessionId) {
    //   console.error('Session ID not found');
    //   return;
    // }

    // Set up headers with the CSRF token and session ID
    // const headers = new HttpHeaders({
    //   'X-CSRFToken': csrftoken,
      // 'X-Session-ID': sessionId
    // });

    // Make the POST request with CSRF token and session ID included in the headers
    this.http.post<any>('http://localhost:8000/myapp/api/save_user/', userData).subscribe({
    next: (response) => {
      console.log('User data saved successfully:', response);
      this.clearFields();
      this.successMessage = response.message; // Assuming the message key is 'message'
      this.errorMessage = '';
    },
    error: (error) => {
      console.error('Error saving user data:', error);
      this.errorMessage = 'Error saving user data'; // Display a generic error message
      this.successMessage = '';
    }
    });
  }

  // Helper function to retrieve CSRF token from cookies
  getCookie(name: string): string | null {
    console.log(document.cookie)
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift();
      if (cookieValue !== undefined) {
        return cookieValue.trim();
      }
    }
    return null;
  }
}
