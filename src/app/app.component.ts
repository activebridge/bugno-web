import { Component, Inject, OnInit } from '@angular/core';
import { BugnoService, ActionCableService } from './services';
import { AngularTokenService } from 'angular-token';
import * as Bugno from 'bugno-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bugno';

  constructor(@Inject(BugnoService) private bugno: Bugno,
              private tokenAuthService: AngularTokenService,
              private actionCableService: ActionCableService) {}

  ngOnInit() {
    if (this.tokenAuthService.userSignedIn()) {
      this.actionCableService.subscribe();
    }
  }
}
