import { Injectable } from '@angular/core';
import { groupBy } from 'lodash';

import { sortObjectByDesc, formatDate } from '../lib';

@Injectable({
  providedIn: 'root'
})

export class OccurrencesService {
  occurrencesByDate: any;
  occurrenceTotalCount: number;
  occurrencesLoading = true;

  set occurrences(events) {
    events.forEach(event => {
      return event.date = formatDate(event.created_at);
    });
    events = groupBy(events, 'date');
    this.occurrencesByDate = sortObjectByDesc(events);
  }
}
