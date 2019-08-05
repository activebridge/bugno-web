import { Component, OnInit } from '@angular/core';

import { ActivityAPI } from '../../../api';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.html',
  styleUrls: ['./activity-list.scss']
})

export class ActivityList implements OnInit {
  activities: any = [];

  constructor(private activityAPI: ActivityAPI) { }

  ngOnInit() {
    this.getActivities();
  }

  private getActivities() {
    this.activityAPI.query().subscribe(
      (resp) => {
      this.activities = resp;
      }),
      (error) => {
      console.log(error);
      }
  }
}
