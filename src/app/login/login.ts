import { Component } from '@angular/core';
import { AngularTokenService } from 'angular-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})

export class Login {
  signInUser:any = {};

  constructor(private tokenAuthSerivce: AngularTokenService) { }

  onSignInSubmit(){
    this.tokenAuthSerivce.signIn(this.signInUser).subscribe(
        res => {
          console.log(res)
        },
        err => {
          console.log('err:', err);
        }
    )
  }
}
