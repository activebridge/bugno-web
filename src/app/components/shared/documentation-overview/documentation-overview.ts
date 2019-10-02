import { Component } from '@angular/core';
import { LocalStorageService} from '../../../services';

@Component({
  selector: 'app-documentation-overview',
  templateUrl: './documentation-overview.html'
})

export class DocumentationOverview {
  constructor(public localStorageService: LocalStorageService) {}
}
