import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LinksService } from 'src/app/core/services/links/links.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';

@Component({
  selector: 'app-add-link-card',
  templateUrl: './add-link-card.component.html',
  styleUrls: ['./add-link-card.component.scss']
})
export class AddLinkCardComponent implements OnInit, OnDestroy {

  linkForm!: FormGroup;
  addLinkSubscription!: Subscription;
  subscriptionArray: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private linksService: LinksService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.linkForm = this.formBuilder.group({
      url: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      name: ['', Validators.required]
    });
  }

  addLink() {
    this.addLinkSubscription = this.linksService.create(this.linkForm.value)
      .subscribe({
        next: (res) => {
          //console.log(res);
          this.linkForm.reset();
          this.notificationService.successMessage('successfulCreateLink');
          // If the API were not a mock here we would add the link we just added to the local array
        },
        error: (err) => {
          //console.error(err);
          this.notificationService.errorMessage('createLinksError');
        }
      });
    this.subscriptionArray.push(this.addLinkSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptionArray.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

}
