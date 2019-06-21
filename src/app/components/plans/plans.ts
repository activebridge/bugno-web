import { Component, OnInit } from '@angular/core';
import { PlanAPI } from '../../api';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.html',
  styleUrls: ['./plans.scss']
})

export class Plans implements OnInit {
  plans: any = [];

  constructor(private planAPI: PlanAPI) { }

  ngOnInit() {
    this.getPlans();
  }

  private getPlans() {
    this.planAPI.query().subscribe((resp) => {
      this.plans = resp;
    });
  }
}
