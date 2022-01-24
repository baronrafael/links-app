import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user$ = new BehaviorSubject<User | undefined>(undefined);

  getUser(): Observable<User | undefined> {
    return this.user$.asObservable();
  }
  
  setUser(user: User | undefined) {
    this.user$.next(user);
  }

  userUrl!: string;

  constructor(private httpClient: HttpClient) {
    this.userUrl = 'user';
  }

  /* get(userId: number) {
    return this.httpClient.get(`${environment.apiUrl}${this.userUrl}/${userId}`);
  } */

  get() {
    return this.httpClient.get(`${environment.apiUrl}${this.userUrl}/${1}`);
  }

}
