import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OccurrencesService {
  occurrencesByDate: any;
  occurrenceTotalCount: number;
  occurrencesLoading = true;
}
