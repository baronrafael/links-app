import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  emailRegEx: string = "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm";
  signupForm!: FormGroup;
  signupSubscription!: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  checkingValidEmail() {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm.test(this.signupForm.value.email)) {
      return true;
    }
    else {
      return false;
    }
  }

  goToLogin() {
    this.router.navigate(['auth/login']);
  }

  handleSignup() {
    this.signupSubscription = this.authService.register(this.signupForm.value)
      .subscribe({
        next: (res) => {
          //console.log(res);
          this.notificationService.successMessage('successfulRegister');
          this.goToLogin();

        },
        error: (err) => {
          //console.error(err);
          this.notificationService.errorMessage('registerError');
        }
      });
  }

  ngOnDestroy(): void {
    if (this.signupSubscription) {
      this.signupSubscription.unsubscribe();
    }
  }

}
