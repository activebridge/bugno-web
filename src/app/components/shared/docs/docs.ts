import { Component } from '@angular/core';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.html',
  styleUrls: ['./docs.scss']
})

export class Docs {
  selectedIndex: number = null;
  flag = false;
  tabsOverview: any = [
    {title: 'How to create project', url: 'create-project', isOpen: 'active'},
    {title: 'How to invite collaborators', url: 'create-project', isOpen: false},
    {title: 'Manage subscription', url: 'create-project', isOpen: false}
  ];
  tabsSdk: any = [
    {title: 'Ruby on Rails', url: 'ruby-on-rails'},
    { title: 'JavaScript', isOpen: false,
      tabs: [
        { title: 'browser-js', url: 'browser-js'},
        { title: 'Angular', url: 'angular'}
      ]
    }
  ];
  private isOpen: boolean;
  public toggle(isOpen) {
    return !isOpen;
  }
  constructor() {}
}
