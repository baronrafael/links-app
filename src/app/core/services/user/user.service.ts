import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl!: string;

  constructor(private httpClient: HttpClient) {
    this.userUrl = 'user';
  }

  get(userId: number) {
    return this.httpClient.get(`${environment.apiUrl}${this.userUrl}/${userId}`);
  }

}
