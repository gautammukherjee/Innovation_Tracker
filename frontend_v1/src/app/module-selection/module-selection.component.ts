import { Component, OnInit } from '@angular/core';

// import { GlobalVariableService } from '../services/common/global-variable.service';
// import { CategoryService } from '../services/common/category.service';
// import { IndicationService } from '../services/common/indication.service';
import { UsersService } from '../services/users.service';
// import { LocationService } from '../services/common/location.service';


import { Router } from '@angular/router';

@Component({
  selector: 'app-module-selection',
  templateUrl: './module-selection.component.html',
  styleUrls: ['./module-selection.component.scss']
})
export class ModuleSelectionComponent implements OnInit {

  result: any;
  loading: boolean = false;
  error = "false";
  errorMessage = "";
  tas: any = [];
  checkedDiseases: any = [];
  results2: any = {};

  lat: string = "";
  long: string = "";
  user: any;

  constructor(
    // private globalVariableService: GlobalVariableService,
    // private categoryService: CategoryService,
    // private indicationService: IndicationService,
    private usersService: UsersService,
    // private locationService: LocationService,
    private router: Router
  ) {
    console.log("New isLoggedIn In: ", this.usersService.isLoggednIn());
    if (this.usersService.isLoggednIn() == true) {
    }
    else {
      this.error = "true";
      this.errorMessage = "Your session is expired..";
      this.router.navigate(['login'], { queryParams: { error: this.error, errorMessage: this.errorMessage } }); // when user is not logged in app is redirected to login page 
    }
  }

  ngOnInit(): void {
    // console.log("usersss: ", sessionStorage.getItem('currentUser'));
    // console.log("toennnn: ", localStorage.getItem('id_token'));
  }

  openTAs(type) {
    console.log("idToken c:: ", localStorage.getItem('id_token'));
    console.log("New isLoggedIn c: ", this.usersService.isLoggednIn());

    if (this.usersService.isLoggednIn() == false) {
      this.error = "true";
      this.errorMessage = "Your session is expired..";
      this.router.navigate(['login'], { queryParams: { error: this.error, errorMessage: this.errorMessage } }); // when user is not logged in app is redirected to login page 
    }

    this.loading = true;

    if (type == 1) {
      this.router.navigate(['/dashboard']);
      // End here to go to AI Dashboard module
    }
    else if (type == 0) {
      // this.router.navigate(['/modules/global-dashboard/index']);
    }
  }

}
