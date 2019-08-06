import { Component, OnInit } from '@angular/core';

import { ActivityAPI } from '../../../api';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.html',
  styleUrls: ['./activity-list.scss']
})

export class ActivityList implements OnInit {
  currentPage:number = 1;
  page: number = 1;
  activityTotalCount: number;
  activities: any = [];

  constructor(private activityAPI: ActivityAPI) { }

  ngOnInit() {
    this.getActivities();
  }

  pageChanged(event: any): void {
    this.page = event.page;
    this.getActivities();
  }

  private getActivities() {
    this.activityAPI.query({ page: this.page }).subscribe(
      (resp) => {
        this.activities = resp['activities'];
        this.activityTotalCount = resp['activity_total_count'];
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
