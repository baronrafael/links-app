import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/shared/interfaces/user/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  user!: User;

  UserDataSubscription!: Subscription;
  userSubscription!: Subscription;
  subscriptionArray: Subscription[] = [];

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.UserDataSubscription = this.userService.getUser()
      .subscribe({
        next: (res) => {
          //console.log(res);
          if(res) {
            this.user = res;
          }
          else {
            this.getUser();
          }
        },
        error: (err) => {
          //console.error(err);
          this.notificationService.errorMessage('userError');
        }
      });
    this.subscriptionArray.push(this.UserDataSubscription);
  }

  getUser() {
    this.userSubscription = this.userService.get()
      .subscribe({
        next: (res) => {
          //console.log(res);
          this.user = res as User;
          this.userService.setUser(this.user);
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
