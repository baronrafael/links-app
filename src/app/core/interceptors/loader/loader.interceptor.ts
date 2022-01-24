import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { LoaderService } from '../../services/loader/loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const spinnerSubscription: Subscription = this.loaderService.spinner$.subscribe();
    return next.handle(request).pipe(finalize(() => spinnerSubscription.unsubscribe()));

    /* this.loaderService.showLoader();
    return next.handle(request).pipe(
      finalize(() => this.loaderService.hideLoader())
    ); */

  }
}
