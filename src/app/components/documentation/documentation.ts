import { Component } from '@angular/core';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.html',
  styleUrls: ['./documentation.scss']
})

export class Documentation {
  sdkTabs: any = [
    { title: 'rails', url: 'rails' },
    { title: 'browser-js', url: 'browser-js' }
  ];
  documentationTabs: any = [
    { title: 'overview', url: 'overview' },
  ];
  sections: any = [
    { title: 'documentation', tabs: this.documentationTabs },
    { title: 'sdk', tabs: this.sdkTabs }
  ];
}
