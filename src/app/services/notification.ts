import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message, title?) {
    this.toastr.success(message, title);
  }

  showError(message, title?) {
    this.toastr.error(message, title);
  }

  showApiError = (response) =>  {
    if (response.error && response.error.errors) {
      this.toastr.error(response.error.errors);
    } else if (response.error && response.error.error) {
      this.toastr.error(response.error.error);
    } else if (response.name === 'HttpErrorResponse') {
      this.toastr.error('Service temporarily unavailable');
    } else {
      this.toastr.error('Whoops! Something went wrong...');
    }
  }
}
