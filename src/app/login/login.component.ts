import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import * as moment from "moment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userCredentials: any = {};
  currentUser: any = {};
  result: any;
  loading = false;
  error = "false";
  errorMessage: String = '';

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
  }

  loginFrmSubmit(myForm: any) {
    this.loading = true;
    let userEmail = myForm.value.email;
    let userPwd = myForm.value.pass;
    this.userCredentials = { email: userEmail, password: userPwd };

    this.usersService.doLogin(this.userCredentials).subscribe( //3 Login
      data => {
        this.result = data;
        console.log("result: ", this.result);

        if (this.result.search[0] == undefined) {
          this.error = "true";
          this.loading = false;
          this.errorMessage = "Invalid User name or password";
        } else {
          if (this.result.search[0].deleted == 1) {
            this.setSession(this.result.search[0]);
            this._router.navigate(['/dashboard'], { relativeTo: this._activatedRoute });
          }
        }
      }
    );

    // if (userEmail === 'admin@bioxcel.com' && userPwd === 'admin@123') {
    //   this.setSession({ email: "admin@bioxcel.com", member_id: 1, firstname: 'admin' });
    //   this._router.navigate(['/dashboard'], { relativeTo: this._activatedRoute });
    // } else {
    //   this.errorMessage = "Invalid User name or password";
    // }

  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresAt, authResult.expireTimeUnit);
    sessionStorage.setItem('currentUser', JSON.stringify({ user_name: authResult.firstname, user_id: authResult.member_id, email: authResult.email }));
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

  }

}
