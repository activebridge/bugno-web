import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';

import { SubscriptionAPI, PlanAPI } from '../../../api';
import { NotificationService } from '../../../utility';

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.html',
  styleUrls: ['./add-subscription.scss']
})

export class AddSubscription implements OnInit {
  @Output() subscribed: EventEmitter<any> = new EventEmitter();
  @Input() projectId: number;
  plans: any = [];
  credentialsForm: FormGroup;
  elements: Elements;
  elementsOptions: ElementsOptions = {
   locale: 'en'
  };
  card: StripeElement;
  submitDisabled = false;

  constructor(private planAPI: PlanAPI,
              private subscriptionAPI: SubscriptionAPI,
              private fb: FormBuilder,
              private router: ActivatedRoute,
              private notificationService: NotificationService,
              private stripeService: StripeService) { }

  ngOnInit() {
    this.initCredentialsForm();
    this.getPlans();
    this.initStripeElements();
  }

  onCreateToken() {
    this.submitDisabled = true;
    this.stripeService.createToken(this.card, {})
      .subscribe(resp => {
        if (resp.token) {
          this.createSubscription({
            stripe_token: resp.token.id,
            plan_id: this.credentialsForm.controls.plan_id.value
          });
        }
      });
  }

  private onCreateTokenError = (error) => {
    this.notificationService.showError(error);
  }

  private initCredentialsForm() {
    this.credentialsForm = this.fb.group({
      plan_id: ['', [Validators.required]]
    });
  }

  private initStripeElements() {
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        if (!this.card) {
          this.card = this.elements.create('card', {});
          this.card.mount('#card-element');
        }
      });
  }

  private createSubscription(params) {
    this.subscriptionAPI.create(this.projectId, params).subscribe((resp) => {
      this.notificationService.showSuccess('Successfully subscribed!');
      this.subscribed.emit(resp);
    }, (resp) => {
      this.notificationService.showError(resp);
      this.submitDisabled = false;
    });
  }

  private getPlans() {
    this.planAPI.query().subscribe((resp) => {
      this.plans = resp;
    });
  }
}
