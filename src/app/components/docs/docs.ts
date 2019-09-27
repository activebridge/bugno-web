import { Component } from '@angular/core';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.html',
  styleUrls: ['./docs.scss']
})

export class Docs {
  tabsOverview: any = [
    { title: 'How to create project', url: 'create-project', id: 'create-project' },
    { title: 'How to invite collaborators', id: 'invite-collaborator' },
    { title: 'Manage subscription', id: 'manage-subscription' }
  ];
  tabsSdk: any = [
    { title: 'Ruby on Rails', url: 'ruby-on-rails' },
    { title: 'JavaScript', isOpen: false,
      tabs: [
        { title: 'browser-js', url: 'browser-js' },
        { title: 'Angular', url: 'angular', active: false }
      ]
    }
  ];
  private isOpen: boolean;
  public toggle(isOpen) {
    return !isOpen;
  }
  constructor() {}
}
