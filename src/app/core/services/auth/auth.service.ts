import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginCredentials } from 'src/app/shared/interfaces/auth/login-credentials/login-credentials';
import { RegisterCredentials } from 'src/app/shared/interfaces/auth/register-credentials/register-credentials';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUrl!: string;
  registerUrl!: string;

  constructor(private httpClient: HttpClient) {
    this.loginUrl = 'login';
    this.registerUrl = 'register';
  }

  login(credentials: LoginCredentials) {
    return this.httpClient.post(`${environment.apiUrl}${this.loginUrl}`, credentials).pipe(
      map((res: any) => {
        //console.log(res.token);
        localStorage.setItem('token', res.token);
        return res;
      })
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  register(credentials: RegisterCredentials) {
    return this.httpClient.post(`${environment.apiUrl}${this.registerUrl}`, credentials)
  }

}
