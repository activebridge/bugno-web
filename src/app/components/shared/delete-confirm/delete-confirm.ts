import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.html',
})

export class DeleteConfirm {
  onClose: Subject<boolean> = new Subject();
  projectName: string;
  name: string;

  constructor(public bsModalRef: BsModalRef) {}

  hide(result) {
    this.bsModalRef.hide();
    this.onClose.next(true);
  }
}
