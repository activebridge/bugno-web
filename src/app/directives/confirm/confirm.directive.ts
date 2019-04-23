import { Directive, Output, Input, HostListener, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { ConfirmModal } from '../../components/';

@Directive({
  selector: '[confirm]',
})

export class ConfirmDirective {
  @Input() showConfirm = true;
  @Input() message = 'Are you sure?';
  @Input() confirmLabel = 'Yes';
  @Input() cancelLabel = 'No';
  @Output() confirm = new EventEmitter<any>();
  @HostListener('click')  onClick() {
    if (this.showConfirm) {
      this.show();
    } else {
      this.confirm.emit();
    }
  }

  constructor(private modalService: BsModalService) {
  }

  show() {
    const modal = this.modalService.show(ConfirmModal, {class: 'modal-sm', backdrop: true});
    modal.content.message = this.message,
    modal.content.confirmLabel = this.confirmLabel,
    modal.content.rejectLabel = this.cancelLabel,
    modal.content.onClose.subscribe((result) => {
      if (result) {
        this.confirm.emit();
      }
    });
  }
}
