// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { SessionService } from './session.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private sessionService: SessionService) {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     // Retrieve session ID and CSRF token from the session service
//     const sessionId = this.sessionService.getSessionId();
//     const csrfToken = this.sessionService.getCSRFToken();

//     // Clone the request and add headers
//     let modifiedRequest = request.clone({
//       withCredentials: true, // Allow cookies to be sent with the request
//     });

//     // Add session ID header if it's not null
//     if (sessionId) {
//       modifiedRequest = modifiedRequest.clone({
//         setHeaders: { 'X-Session-ID': sessionId },
//       });
//     }

//     // Add CSRF token header if it's not null
//     if (csrfToken) {
//       modifiedRequest = modifiedRequest.clone({
//         setHeaders: { 'X-CSRFToken': csrfToken },
//       });
//     }

//     // Forward the modified request to the next interceptor or handler
//     return next.handle(modifiedRequest);
//   }
// }
