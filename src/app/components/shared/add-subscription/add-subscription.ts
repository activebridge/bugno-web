import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';

import { SubscriptionAPI, ProjectAPI } from '../../../api';
import { NotificationService } from '../../../utility';

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.html',
  styleUrls: ['./add-subscription.scss']
})

export class AddSubscription implements OnInit {
  @Output() subscribed: EventEmitter<any> = new EventEmitter();
  @Input() projectId: number;
  stripePublicKey: string;
  @Input() plans: any = [];
  credentialsForm: FormGroup;
  elements: Elements;
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };
  card: StripeElement;
  submitDisabled = false;
  mountingStripeElements = true;

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

  onCreateToken() {
    this.submitDisabled = true;
    this.stripeService.createToken(this.card, {}).subscribe(resp => {
      if (resp.token) {
        this.createSubscription({
          stripe_token: resp.token.id,
          plan_id: this.credentialsForm.value.plan_id
        });
      }
    });
  }

  scrollToTheBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  private onCreateTokenError = (error) => {
    this.notificationService.showError(error);
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
      plan_id: ['', [Validators.required]]
    });
  }

  private initStripeElements() {
    this.stripeService.elements(this.elementsOptions).subscribe(elements => {
      this.elements = elements;
      if (!this.card) {
        this.card = this.elements.create('card', {});
        this.card.mount('#card-element');
        this.mountingStripeElements = false;
      }
    });
  }

  private createSubscription(params) {
    this.subscriptionAPI.create(this.projectId, params).subscribe((resp) => {
      this.notificationService.showSuccess('Successfully subscribed!');
      this.subscribed.emit(resp);
    }, (error) => {
      this.notificationService.showError(error);
      this.submitDisabled = false;
    });
  }
}
