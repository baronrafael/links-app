import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private translocoService: TranslocoService,
    ) { }

  ngOnInit(): void {
  }

  changeLanguage() {
    let activeLang = this.translocoService.getActiveLang();
    console.log(activeLang);
    if(activeLang == 'en'){
      this.translocoService.setActiveLang('es');
    }
    else if(activeLang == 'es') {
      this.translocoService.setActiveLang('en');
    }
  }

  goToLogin() {
    this.router.navigate(['auth/login']);
  }

  logout() {
    this.userService.setUser(undefined);
    localStorage.clear();
    this.goToLogin();
  }

}
