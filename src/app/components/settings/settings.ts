import { Component } from '@angular/core';

import { LocalStorageService } from '../../utility';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss']
})

export class Settings {
  constructor(public localStorageService: LocalStorageService) {}

  tabs: any = [
    {title: 'Profile', url: 'profile'},
    {title: 'Security', url: 'security'},
  ];
}
