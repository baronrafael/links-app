import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.thereIsASavedToken();
  }

  goToAuth() {
    this.router.navigate(['auth']);
  }

  thereIsASavedToken() {
    const token = this.authService.getToken();
    if (token) {
      if (token === 'false') {
        this.goToAuth();
        return false;
      }
      else {
        return true;
      }
    }
    else {
      this.goToAuth();
      return false;
    }
  }
  
}
