import { Injectable } from '@angular/core';
import { BehaviorSubject, defer, finalize, NEVER, Observable, share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderState$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  public readonly spinner$ = defer(() => {
    this.showLoader();
    return NEVER.pipe(
      finalize(() => {
        this.hideLoader();
      })
    );
  }).pipe(share());

  showLoader() {
    this.loaderState$.next(true);
  }

  hideLoader() {
    this.loaderState$.next(false);
  }

  getLoaderState(): Observable<boolean> {
    return this.loaderState$.asObservable();
  }
  
}
