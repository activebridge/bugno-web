import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.html'
})

export class ConfirmModal implements OnInit {
  onClose: Subject<boolean>;
  message = 'Are you sure?';
  confirmLabel = 'Yes';
  rejectLabel = 'No';

  constructor(private bsModalRef: BsModalRef) {
  }

  ngOnInit() {
    this.onClose = new Subject();
  }

  confirm(result) {
    this.onClose.next(result);
    this.bsModalRef.hide();
  }
}
