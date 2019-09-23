import { Component } from '@angular/core';
import {MarkdownModule, MarkedOptions, MarkedRenderer} from 'ngx-markdown';
import { NgModule } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-docs-ror',
  templateUrl: './docs-ror.html',
  styleUrls: ['./docs-ror.scss']
})

@NgModule({
  imports: [
    HttpClientModule,
    MarkdownModule.forRoot({
      loader: HttpClient, // optional, only if you use [src] attribute
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        },
      },
    })
  ]
})



export class DocsRor {
  constructor() {}
}

