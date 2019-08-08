import { Component, OnInit } from '@angular/core';

import { NotificationService } from '../../../services';
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

  constructor(private activityAPI: ActivityAPI,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.getActivities();
  }

  pageChanged(event: any): void {
    this.page = event.page;
    this.getActivities();
  }

  private getActivities() {
    this.activityAPI.query({ page: this.page }).subscribe(this.onGetActivitiesSuccess, this.onGetActivitiesError);
  }

  private onGetActivitiesSuccess = (resp: any) => {
    this.activities = resp.activities;
    this.activityTotalCount = resp.activity_total_count;
    this.loading = false;
  }

  private onGetActivitiesError = () => {
    this.notificationService.showError('Activities was not fetched, try to reload page');
  }
}
