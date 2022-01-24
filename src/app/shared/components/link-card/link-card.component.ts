import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LinksService } from 'src/app/core/services/links/links.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { Link } from '../../interfaces/link/link';

@Component({
  selector: 'app-link-card',
  templateUrl: './link-card.component.html',
  styleUrls: ['./link-card.component.scss']
})
export class LinkCardComponent implements OnInit, OnDestroy {

  @Input() link!: Link;

  deleteLinkSubscription!: Subscription;
  subscriptionArray: Subscription[] = [];

  constructor(
    private linksService: LinksService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  deleteLink() {
    this.deleteLinkSubscription = this.linksService.delete(this.link.id)
      .subscribe({
        next: (res) => {
          //console.log(res);
          this.notificationService.successMessage('deleteLinkSuccess');
          // If the API were not a mock here we would remove the link we just removed from the local array
          this.closeDeleteLinkModal();
        },
        error: (err) => {
          //console.error(err);
          this.notificationService.errorMessage('deleteLinkError');
        }
      });
    this.subscriptionArray.push(this.deleteLinkSubscription);
  }

  handleDeleteLinkModal() {
    let html = document.getElementsByTagName('html')[0];
    let modal = document.getElementById(`link-${this.link.id}`);
    html.classList.add("is-clipped");
    modal?.classList.add("is-active");
  }

  closeDeleteLinkModal() {
    let html = document.getElementsByTagName('html')[0];
    let modal = document.getElementById(`link-${this.link.id}`);
    html.classList.remove("is-clipped");
    modal?.classList.remove("is-active");
  }

  ngOnDestroy(): void {
    this.subscriptionArray.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

}
