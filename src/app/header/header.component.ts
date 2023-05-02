import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalVariableService } from '../services/common/global-variable.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  result: any;
  error = "false";
  errorMessage = "";
  userName: any = '';

  constructor(private router: Router, private _activatedRoute: ActivatedRoute, private usersService: UsersService, private globalVariableService: GlobalVariableService) {
    // this.result = JSON.parse(sessionStorage.getItem('currentUser') || '');
    // console.log("currentUser: ", this.result);
    if (this.usersService.isLoggednIn() == false) {
      this.autologout();
    }
  }

  ngOnInit(): void {
    var sessVal = sessionStorage.getItem('currentUser');
    this.userName = JSON.parse(sessionStorage.getItem('currentUser') || '');
    if (sessVal == null) {
      this.router.navigate(['login']);
    }
  }

  autologout() {
    setTimeout(() => {
      this.error = "true";
      this.errorMessage = "Your session is expired..";
      sessionStorage.removeItem('currentUser');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      this.router.navigate(['login'], { queryParams: { error: this.error, errorMessage: this.errorMessage } }); // when user is not logged in app is redirected to login page 
    }, 1000);
  }

}
