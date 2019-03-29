import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message) {
      this.toastr.success(message);
  }

  showError(response) {
    if (response.error && response.error.errors) {
      this.toastr.error(response.error.errors);
    } else {
      this.toastr.error('Whoops! Something went wrong...');
    }
  }
}
