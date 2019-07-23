import { Injectable } from '@angular/core';
import * as ActionCable from 'actioncable';
import { LocalStorageService } from './local-storage'
import { GlobalEvents } from './global-events'
import { environment } from '../../environments/environment';

@Injectable()
export class ActionCableService {
  public cable: any;
  public subscription: any;
  public actionCable = ActionCable;

  constructor(private globalEvents: GlobalEvents,
              private localStorageService: LocalStorageService) {}

  subscribe() {
    let action_cable_token = this.localStorageService.currentUser.action_cable_token
    this.cable = ActionCable.createConsumer(`${environment.websocketEndpoint}/cable?action_cable_token=${action_cable_token}`);
    let subscriptionParams = Object.assign({ channel: 'UserChannel' }, {});
    this.subscription = this.cable.subscriptions.create(subscriptionParams, {
      received: (data:any) => {
        this.globalEvents.publish((data.action || 'UserChannel'), data);
      }
    });
  }

  unsubscribe() {
    this.cable.subscriptions.remove(this.subscription);
  }
}
