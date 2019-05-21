import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.html',
  styleUrls: ['./settings.scss']
})

export class Settings {
  tabs: any = [
    {title: 'Profile', url: 'profile'},
    {title: 'Security', url: 'security'},
  ];
}
