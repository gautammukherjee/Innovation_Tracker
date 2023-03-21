import { Component, OnInit, EventEmitter, Output } from '@angular/core';
//import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { GlobalVariableService } from './../../services/common/global-variable.service';

import { FormControl } from '@angular/forms';
import * as moment from "moment";

@Component({
  selector: 'app-filter-data-range',
  templateUrl: './filter-data-range.component.html',
  styleUrls: ['../global-filter.scss', './filter-data-range.component.scss']
})
export class FilterDataRangeComponent implements OnInit {

  frmDate1: any;
  toDate1: any;
  showDateRangeBody: boolean = false;

  constructor(private globalVariableService: GlobalVariableService) { }
  @Output() onDateRangeChangedEvent: EventEmitter<any> = new EventEmitter()

  public fromDate: any = { date: this.globalVariableService.fromDate };
  public toDate: any = { date: this.globalVariableService.toDate };

  ngOnInit(): void {
    this.frmDate1 = this.fromDate.date.month + "-" + this.fromDate.date.day + "-" + this.fromDate.date.year;
    this.toDate1 = this.toDate.date.month + "-" + this.toDate.date.day + "-" + this.toDate.date.year;
  }

  // Initialized to specific date

  onDateRangeHeaderClick() {
    this.showDateRangeBody = !this.showDateRangeBody;
  }

  fromDateChanged(event: any) {
    this.frmDate1 = event.month + "-" + event.day + "-" + event.year;
    console.log("fromdate: ", this.frmDate1);
    // var frmDates = moment(event.target.value, 'YYYY-MM-DD');
    // this.globalVariableService.setFromDate(frmDates.format('YYYY-MM-DD'));

    this.globalVariableService.setFromDate({ month: event.month, day: event.day, year: event.year });
    // console.log("FromDates: ", this.globalVariableService.getFilterParams());
    this.onDateRangeChangedEvent.emit();
  }
  toDateChanged(event: any) {

    this.toDate1 = event.month + "-" + event.day + "-" + event.year;
    // var toDates = moment(event.target.value, 'YYYY-MM-DD');
    // this.globalVariableService.setToDate(toDates.format('YYYY-MM-DD'));
    console.log("toDate1: ", this.toDate1);

    this.globalVariableService.setToDate({ month: event.month, day: event.day, year: event.year });
    // console.log("ToDates: ", this.globalVariableService.getFilterParams());
    this.onDateRangeChangedEvent.emit();
  }

}
