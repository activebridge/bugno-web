import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.html',
  styleUrls: ['./activity.scss']
})

export class Activity implements OnInit {
  activities: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getActivities();
  }

  private getActivities() {
    this.query().subscribe(
      (resp) => {
      this.activities = resp;
      }),
      (error) => {
      console.log(error);
      }
  }

  private query() {
    return this.http.get(`${environment.apiEndpoint}/api/v1/activities`);
  }
}
