import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Inject } from '@angular/core';
import { GlobalVariableService } from './../services/common/global-variable.service';
import { NewsletterListsService } from '../services/newsletter-lists.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import * as moment from "moment";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

declare var jQuery: any;

@Component({
  selector: 'app-newsletter-details',
  templateUrl: './newsletter-details.component.html',
  styleUrls: ['./newsletter-details.component.scss'],
  providers: [DatePipe]
})
export class NewsletterDetailsComponent implements OnInit {
  @Input() ProceedDoFilterApply?: Subject<any>; //# Input for ProceedDoFilter is getting from clinical details html
  private filterParams: any;
  result: any = [];
  newsletterDetailsRecords: any = {};
  newsletterDetailsData: any = {};

  loading = false;
  params: any;
  layout: any = {};
  graphData: any = [];
  //hideCardBody: boolean = true;
  modalRef: any;
  helpContents: any;
  news_id: any;

  constructor(
    private globalVariableService: GlobalVariableService,
    private newsletterListsService: NewsletterListsService,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.filterParams = this.globalVariableService.getFilterParams();
    console.log("new Filters in details: ", this.filterParams);
    this.getNewsletterDetails();
  }

  getNewsletterDetails() {
    this.loading = true;
    this.news_id = this.route.snapshot.paramMap.get("id");
    this.newsletterListsService.getNewsletterDetails({ 'news_id': this.news_id }).subscribe(
      data => {
        this.result = data;
        this.newsletterDetailsRecords = this.result.newsletterDetails;
        this.newsletterDetailsData = this.newsletterDetailsRecords[0];
        console.log("showNewsletterDetailsData: ", this.newsletterDetailsData);

      },
      err => {
        console.log(err.message);
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  // backToDashboard() {
  //   this.location.back();
  // }

  closePage() {
    window.close();
  }

}
