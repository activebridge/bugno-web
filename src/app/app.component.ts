import { Component, Inject } from '@angular/core';
import { BugnoService } from './utility';
import * as Bugno from 'bugno-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bugno';

  constructor(@Inject(BugnoService) private bugno: Bugno) {}
}
