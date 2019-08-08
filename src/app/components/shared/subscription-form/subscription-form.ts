import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';
import { compact } from 'lodash';

import { SubscriptionAPI, ProjectAPI } from '../../../api';
import { NotificationService } from '../../../services';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.html',
  styleUrls: ['./subscription-form.scss']
})

export class SubscriptionForm implements OnInit {
  @Input() action = 'create';
  @Output() onSubscribe: EventEmitter<any> = new EventEmitter();
  @Input() projectId: number;
  @Input() plans: any = [];
  @Input() currentPlan: any;
  @Input() subscription: any;
  stripePublicKey: string;
  credentialsForm: FormGroup;
  elements: Elements;
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };
  card: StripeElement;
  submitDisabled = false;
  stripeElementsMounted = false;

  constructor(private subscriptionAPI: SubscriptionAPI,
              private projectAPI: ProjectAPI,
              private fb: FormBuilder,
              private router: ActivatedRoute,
              private notificationService: NotificationService,
              private stripeService: StripeService) { }

  ngOnInit() {
    this.getStripeApiKey();
    this.initCredentialsForm();
  }

  subscriptionParams(stripe_source, plan_id) {
    return compact([
      this.projectId,
      this.subscription && this.subscription.id,
      { stripe_source, plan_id }
    ]);
  }

  onCreateToken() {
    this.submitDisabled = true;
    this.stripeService.createToken(this.card, {}).subscribe(resp => {
      if (resp.token) {
        this.subscriptionRequest(
          this.subscriptionParams(resp.token.id, this.credentialsForm.value.plan_id)
        );
      }
    });
  }

  scrollToTheBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  private onCreateTokenError = (error) => {
    this.notificationService.showApiError(error);
  }

  private getStripeApiKey() {
      this.projectAPI.get(this.projectId).subscribe((resp: any) => {
        this.stripePublicKey = resp.stripe_public_key;
        this.initStripe();
      });
    }

  private initStripe() {
    this.stripeService.setKey(this.stripePublicKey);
    this.initStripeElements();
  }

  private initCredentialsForm() {
    this.credentialsForm = this.fb.group({
      plan_id: [this.currentPlan && this.currentPlan.id || '', [Validators.required]]
    });
  }

  private initStripeElements() {
    this.stripeService.elements(this.elementsOptions).subscribe(elements => {
      this.elements = elements;
      if (!this.card) {
        this.card = this.elements.create('card', {});
        this.card.mount('#card-element');
        this.stripeElementsMounted = true;
      }
    });
  }

  private subscriptionRequest(params) {
    this.subscriptionAPI[this.action](...params).subscribe((resp) => {
      this.notificationService.showSuccess('Successfully subscribed!');
      this.onSubscribe.emit(resp);
    }, (error) => {
      this.notificationService.showApiError(error);
      this.submitDisabled = false;
    });
  }
}
