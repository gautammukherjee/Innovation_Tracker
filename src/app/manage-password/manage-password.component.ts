import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModel, NgForm, FormGroup, FormControl } from '@angular/forms';
import { UsersService } from '../services/users.service';
import * as moment from "moment";

@Component({
  selector: 'app-manage-password',
  templateUrl: './manage-password.component.html',
  styleUrls: ['./manage-password.component.scss']
})
export class ManagePasswordComponent implements OnInit {

  new_password: string = '';
  new_password_confirmation: string = '';
  // old_password: string = '';
  userCredentials: any = {};
  currentUser: any = {};
  result: any;
  loading = false;
  error = false;
  success = false;
  errorMessage = "";
  successMessage = "";
  user_id = '';

  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.user_id = JSON.parse(sessionStorage.getItem('currentUser') || '');
    console.log("uuid", this.user_id);
  }

  updatePassword() {
    this.loading = true;
    this.error = false;
    // this.userCredentials = { userId: this.user_id, new_password: this.new_password, new_password_confirmation: this.new_password_confirmation, old_password: this.old_password };
    this.userCredentials = { userId: this.user_id, new_password: this.new_password, new_password_confirmation: this.new_password_confirmation };

    console.log("userCred: ", this.userCredentials);


    if (this.new_password == undefined || this.new_password == "") {
      this.loading = false;
      this.error = true;
      this.errorMessage = "Please enter password...";
    } else if (this.new_password_confirmation == undefined || this.new_password_confirmation == "") {
      this.loading = false;
      this.error = true;
      this.errorMessage = "Please enter confirm password...";
    } else if (this.new_password != this.new_password_confirmation) {
      this.loading = false;
      this.error = true;
      this.errorMessage = "Password Mismatched...";
    } else {
      this.usersService.managePassword(this.userCredentials).subscribe(
        data => {
          this.result = data;
          console.log("recieve:: ", this.result);
          console.log("statusR:: ", this.result.success);

          if (this.result.success == 1) {
            this.success = true;
            this.successMessage = "Password Updated Successfully...";
          } else {
            this.error = true;
            this.errorMessage = "Password Not Updated Successfully...";
          }
        },
        err => {
          this.error = true;
          this.errorMessage = err.message;
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }
  }

}
