import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { groupBy } from 'lodash';

import { sortObjectByDesc } from '../lib';

@Injectable({
  providedIn: 'root'
})

export class OccurrencesService {
  constructor(private datePipe: DatePipe) {}

  groupOccurrences(events) {
    events = this.addFormatedDateToEvents(events);
    events = groupBy(events, 'date');
    return sortObjectByDesc(events);
  }

  private addFormatedDateToEvents(events) {
    events.forEach(event => {
      return event.date = this.formatDate(event.created_at);
    });
    return events;
  }

  private formatDate(datetime) {
    return this.datePipe.transform(datetime, 'yyyy/MM/dd');
  }
}
