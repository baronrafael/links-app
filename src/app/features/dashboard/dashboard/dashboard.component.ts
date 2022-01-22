import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LinksService } from 'src/app/core/services/links/links.service';
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
  linksSubscription!: Subscription;
  subscriptionArray: Subscription[] = [];

  constructor(
    private userService: UserService,
    private linksService: LinksService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getLinks();
  }

  getUserData() {
    this.UserDataSubscription = this.userService.getUser()
      .subscribe({
        next: (res) => {
          //console.log(res);
          if (res) {
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

  getLinks() {
    this.linksSubscription = this.linksService.list()
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
          this.notificationService.errorMessage('listLinksError');
        }
      });
    this.subscriptionArray.push(this.linksSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptionArray.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

}
