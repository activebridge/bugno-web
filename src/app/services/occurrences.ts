import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { groupBy } from 'lodash';

import { sortObjectByDesc } from '../lib';

@Injectable({
  providedIn: 'root'
})

export class OccurrencesService {
  occurrencesByDate: any;
  occurrenceTotalCount: number;
  occurrencesLoading = true;

  constructor(private datePipe: DatePipe) {}

  set occurrences(events) {
    events = this.addFormatedDateToEvents(events);
    events = groupBy(events, 'date');
    this.occurrencesByDate = sortObjectByDesc(events);
  }

  private addFormatedDateToEvents(events) {
    events.forEach(event => {
      return event.date = this.formatDate(event.created_at);
    });
    return events;
  }

  private formatDate(datetime) {
    const date = this.datePipe.transform(datetime, 'yyyy/MM/dd');
    return date;
  }
}
