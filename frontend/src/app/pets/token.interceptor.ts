import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AllService } from '../services/all.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private service: AllService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      headers: request.headers.set(
        'Authorization',
        `Bearer ${this.service.jwt}`
      ),
    });
    return next.handle(req);
  }
}
