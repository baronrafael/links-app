import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toastr: ToastrService,
    public translateService: TranslocoService
  ) { }

  message(message: string) {
    this.toastr.show(this.translateService.translate(message));
  }

  messageWithTitle(message: string, title: string) {
    this.toastr.show(this.translateService.translate(message), this.translateService.translate(title));
  }

  successMessage(message: string) {
    this.toastr.success(this.translateService.translate(message));
  }

  successMessageWithTitle(message: string, title: string) {
    this.toastr.success(this.translateService.translate(message), this.translateService.translate(title));
  }

  errorMessage(message: string) {
    this.toastr.error(this.translateService.translate(message));
  }

  errorMessageWithTitle(message: string, title: string) {
    this.toastr.error(this.translateService.translate(message), this.translateService.translate(title));
  }

  warningMessage(message: string) {
    this.toastr.warning(this.translateService.translate(message));
  }

  warningMessageWithTitle(message: string, title: string) {
    this.toastr.warning(this.translateService.translate(message), this.translateService.translate(title));
  }

  infoMessage(message: string) {
    this.toastr.info(this.translateService.translate(message));
  }

  infoMessageWithTitle(message: string, title: string) {
    this.toastr.info(this.translateService.translate(message), this.translateService.translate(title));
  }
  
}
