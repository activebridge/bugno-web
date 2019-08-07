import { Component, OnInit } from '@angular/core';

import { ActivityAPI } from '../../../api';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.html',
  styleUrls: ['./activity-list.scss']
})

export class ActivityList implements OnInit {
  loading = true;
  currentPage = 1;
  page = 1;
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
      (resp: any) => {
        this.activities = resp.activities;
        this.activityTotalCount = resp.activity_total_count;
        this.loading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
