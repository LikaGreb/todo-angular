import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

import {SpinnerService} from "src/services/spinner.service"

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  totalRequests = 0;
  constructor(private loadingService:SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    this.loadingService.setLoading(true);

    return next.handle(request).pipe(finalize(() => {
      this.totalRequests--;
      if (this.totalRequests === 0) {
        this.loadingService.setLoading(false)
      }
    }));
  }
}
