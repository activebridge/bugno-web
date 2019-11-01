import { Component, OnInit } from '@angular/core';

import { NotificationService } from '../../../services';
import { ActivityAPI } from '../../../api';
import { scrollToTop } from '../../../lib';

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
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.getActivities();
  }

  pageChanged(event: any): void {
    scrollToTop();
    this.page = event.page;
    this.getActivities();
  }

  private getActivities() {
    this.activityAPI.query(this.activitiesParams).subscribe(this.onGetActivitiesSuccess, this.onGetActivitiesError);
  }

  private get activitiesParams() {
    return { page: this.page };
  }

  private onGetActivitiesSuccess = (resp: any) => {
    this.activities = resp.activities;
    this.activityTotalCount = resp.meta.total_count;
    this.loading = false;
  }

  private onGetActivitiesError = () => {
    this.notifyService.showError('Activities was not fetched, try to reload page');
  }
}
