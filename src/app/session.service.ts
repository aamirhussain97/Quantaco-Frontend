import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private isAuthenticated: boolean = false;
  private userDetails: any = null;
  private csrfToken: string | null = null; // Initialize CSRF token as null
  private sessionId: string | null = null;

  constructor() { }

  setCSRFToken(token: string): void {
    this.csrfToken = token;
  }

  getCSRFToken(): string | null {
    return this.csrfToken;
  }

  setSessionId(sessionId: string): void {
    this.sessionId = sessionId;
  }

  getSessionId(): string | null {
    return this.sessionId;
  }

  // Method to set authentication status
  setAuthenticationStatus(status: boolean) {
    this.isAuthenticated = status;
  }

  // Method to get authentication status
  getAuthenticationStatus(): boolean {
    return this.isAuthenticated;
  }

  // Method to set user details
  setUserDetails(userDetails: any) {
    this.userDetails = userDetails;
  }

  // Method to get user details
  getUserDetails(): any {
    return this.userDetails;
  }

  // Method to clear session information
  clearSession() {
    this.isAuthenticated = false;
    this.userDetails = null;
  }
}
