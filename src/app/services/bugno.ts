import * as Bugno from 'bugno-js';
import { Injectable, Inject, InjectionToken, ErrorHandler } from '@angular/core';

import { environment } from '../../environments/environment';

const bugnoConfig = {
  enabled: environment.production,
  accessToken: environment.bugnoAccessToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
};
export const BugnoService = new InjectionToken<Bugno>('bugno');

@Injectable()
export class BugnoErrorHandler implements ErrorHandler {
  constructor(@Inject(BugnoService) private bugno: Bugno) {}

  handleError(err: any): void {
    this.bugno.error(err.originalError || err);
  }
}

export function bugnoFactory() {
  return new Bugno(bugnoConfig);
}
