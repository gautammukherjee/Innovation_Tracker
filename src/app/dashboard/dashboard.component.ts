import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { Router } from '@angular/router';
import { GlobalVariableService } from '../services/common/global-variable.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  doFilterApply: Subject<any> = new Subject();  // ## P= Parent

  constructor(private globalVaiableService: GlobalVariableService, private router: Router) {

  }

  ngOnInit(): void {

  }

  dateRangeChanged(e) {
    console.log("change: ", e);
    this.doFilterApply.next;
  }
  indicationChanged(clickOn = null) {
    //this.doFilterApply.next;
  }
  companyChanged(clickOn = null) {
    // this.doFilterApply.next;
  }
  drugChanged(clickOn = null) {
    // this.doFilterApply.next;
  }
  geneChanged(clickOn = null) {
    // this.doFilterApply.next;
  }
  moaChanged(clickOn = null) {
    // this.doFilterApply.next;
  }

}
