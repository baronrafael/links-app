import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/shared/interfaces/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  emailRegEx: string = "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm";
  loginForm!: FormGroup;
  loginSubscription!: Subscription;
  userSubscription!: Subscription;
  subscriptionArray: Subscription[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  checkingValidEmail() {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm.test(this.loginForm.value.email)) {
      return true;
    }
    else {
      return false;
    }
  }

  goToPrivate() {
    this.router.navigate(['']);
  }

  handleLogin() {
    this.loginSubscription = this.authService.login(this.loginForm.value)
      .subscribe({
        next: (res) => {
          //console.log(res);
          this.notificationService.successMessage('successfulLogin');
          this.getUser();
        },
        error: (err) => {
          //console.error(err);
          this.notificationService.errorMessage('loginError');
        }
      });
    this.subscriptionArray.push(this.loginSubscription);
  }

  getUser() {
    this.userSubscription = this.userService.get()
      .subscribe({
        next: (res) => {
          //console.log(res);
          this.userService.setUser(res as User);
          this.goToPrivate();
        },
        error: (err) => {
          //console.error(err);
          this.notificationService.errorMessage('userError');
        }
      });
    this.subscriptionArray.push(this.userSubscription);
  }



  ngOnDestroy(): void {
    this.subscriptionArray.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

}
