import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  emailRegEx: string = "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm";
  signupForm!: FormGroup;
  signupSubscription!: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
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

  goToPrivate() {
    this.router.navigate(['']);
  }

  handleSignup() {
    this.signupSubscription = this.authService.login(this.signupForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.signupSubscription) {
      this.signupSubscription.unsubscribe();
    }
  }

}
