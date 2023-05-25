import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { Router } from '@angular/router';
import { GlobalVariableService } from '../services/common/global-variable.service';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.scss']
})
export class AllNewsComponent implements OnInit {

  doFilterApply: Subject<any> = new Subject();  // ## P= Parent
  showSidebar: boolean = false;

  constructor(private globalVaiableService: GlobalVariableService, private router: Router) {
    // this.globalVaiableService.setSelectedTa([1]);
  }

  ngOnInit(): void {

  }

  ontoggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  dateRangeChanged(e: any) {
    this.doFilterApply.next(e);
  }
  taChanged(e: any) {
    this.doFilterApply.next(e);
  }
  indicationChanged(e: any) {
    this.doFilterApply.next(e);
  }
  companyChanged(e: any) {
    this.doFilterApply.next(e);
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
