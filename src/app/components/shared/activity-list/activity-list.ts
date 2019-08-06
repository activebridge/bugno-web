import { Component, OnInit } from '@angular/core';

import { ActivityAPI } from '../../../api';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.html',
  styleUrls: ['./activity-list.scss']
})

export class ActivityList implements OnInit {
  page = 1;
  activities: any = [];

  constructor(private activityAPI: ActivityAPI) { }

  ngOnInit() {
    this.getActivities();
  }

  private getActivities() {
    this.activityAPI.query({ page: this.page }).subscribe(
      (resp) => {
        this.activities = resp['activities'];
        this.page += 1;
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
