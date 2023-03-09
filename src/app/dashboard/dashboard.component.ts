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
    this.globalVaiableService.setSelectedTa([1]);
  }

  ngOnInit(): void {

  }

  dateRangeChanged(e: any) {
    this.doFilterApply.next(e);
  }
  taChanged(e: any) {
    this.doFilterApply.next(e);
  }
  indicationChanged(e: any) {
    // this.doFilterApply.next(e);
  }
  companyChanged(e: any) {
    // this.doFilterApply.next(e);
  }
  drugChanged(e: any) {
    // this.doFilterApply.next(e);
  }
  geneChanged(e: any) {
    // this.doFilterApply.next(e);
  }
  moaChanged(e: any) {
    // this.doFilterApply.next(e);
  }

}
