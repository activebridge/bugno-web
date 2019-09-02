import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularTokenService } from 'angular-token';

import { ACTIONS } from '../../constants';
import { IntegrationsAPI } from '../../api';
import { GlobalEvents, LocalStorageService, NotificationService, ProjectService, ProjectUserService } from '../../services';

@Component({
  selector: 'app-project-integrations',
  templateUrl: './project-integrations.html',
})

export class ProjectIntegrations implements OnInit {
  loading = true;
  projectId: string;
  integrations: any = [];

  constructor(public projectUserService: ProjectUserService,
              private globalEvents: GlobalEvents,
              private tokenService: AngularTokenService,
              private integrationsAPI: IntegrationsAPI,
              private router: ActivatedRoute,
              private localStorageService: LocalStorageService,
              private projectService: ProjectService,
              private notifyService: NotificationService) { }

  ngOnInit() {
    this.router.parent.params.subscribe(params => {
      if (params.id) {
        this.projectId = params.id;
        this.getIntegrations();
      }
    });
    this.globalEvents.subscribe(ACTIONS.CREATE_SLACK_INTEGRATION, this.createSlackIntegration);
  }

  ngOnDestroy() {
    this.globalEvents.unsubscribe(ACTIONS.CREATE_SLACK_INTEGRATION, this.createSlackIntegration);
  }

  createSlackIntegration = (data) => {
    if (!this.isProjectIntegration(data)) { return; }
    this.integrations.push(data);
  }

  isProjectIntegration(integration) {
    return this.projectService.project.id === integration.project_id;
  }

  get slackParams() {
    return { project_id: this.projectService.project.id,
             user_id: this.localStorageService.currentUser.action_cable_token,
             integration_provider: true};
  }

  onAddSlackIntegration() {
    this.tokenService.signInOAuth('slack', this.slackParams)
                         .subscribe(this.onSignInSuccess, this.onApiError);
  }


  getIntegrations() {
    this.integrationsAPI.query(this.projectId).subscribe(this.onGetIntegrationsSuccess);
  }

  deleteIntegration(id) {
    this.integrationsAPI.delete(this.projectId, id).subscribe(() => {
      this.onDeleteIntegrationSuccess(id);
    }, this.onApiError);
  }

  private onDeleteIntegrationSuccess = (id) => {
    const index = this.integrations.findIndex((integration) => integration.id === id);
    this.integrations.splice(index, 1);
  }

  private onGetIntegrationsSuccess = (resp) => {
    this.integrations = resp;
    this.loading = false;
  }

  private onSignInSuccess = () => {
    this.notifyService.showSuccess('Slack integrations added.');
  }

  private onApiError = () => {
    this.notifyService.showError('Whoops... Something went wrong.');
  }
}
