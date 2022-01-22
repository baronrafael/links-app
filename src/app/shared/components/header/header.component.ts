import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService
    ) { }

  ngOnInit(): void {
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
