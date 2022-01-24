import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  activeLang!: string;

  constructor(
    private toastr: ToastrService,
    public translateService: TranslocoService
  ) {
  }

  getActiveLang() {
    this.activeLang = this.translateService.getActiveLang();
  }

  message(message: string) {
    this.getActiveLang();
    this.toastr.show(this.translateService.translate(message, {}, this.activeLang));
  }

  messageWithTitle(message: string, title: string) {
    this.getActiveLang();
    this.toastr.show(this.translateService.translate(message, {}, this.activeLang), this.translateService.translate(title, {}, this.activeLang));
  }

  successMessage(message: string) {
    this.getActiveLang();
    this.toastr.success(this.translateService.translate(message, {}, this.activeLang));
  }

  successMessageWithTitle(message: string, title: string) {
    this.getActiveLang();
    this.toastr.success(this.translateService.translate(message, {}, this.activeLang), this.translateService.translate(title, {}, this.activeLang));
  }

  errorMessage(message: string) {
    this.getActiveLang();
    this.toastr.error(this.translateService.translate(message, ));
  }

  errorMessageWithTitle(message: string, title: string) {
    this.getActiveLang();
    this.toastr.error(this.translateService.translate(message, {}, this.activeLang), this.translateService.translate(title, {}, this.activeLang));
  }

  warningMessage(message: string) {
    this.getActiveLang();
    this.toastr.warning(this.translateService.translate(message, {}, this.activeLang));
  }

  warningMessageWithTitle(message: string, title: string) {
    this.getActiveLang();
    this.toastr.warning(this.translateService.translate(message, {}, this.activeLang), this.translateService.translate(title, {}, this.activeLang));
  }

  infoMessage(message: string) {
    this.getActiveLang();
    this.toastr.info(this.translateService.translate(message, {}, this.activeLang));
  }

  infoMessageWithTitle(message: string, title: string) {
    this.getActiveLang();
    this.toastr.info(this.translateService.translate(message, {}, this.activeLang), this.translateService.translate(title, {}, this.activeLang));
  }
  
}
