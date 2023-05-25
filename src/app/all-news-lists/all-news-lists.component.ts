import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Inject } from '@angular/core';
import { GlobalVariableService } from './../services/common/global-variable.service';
import { NewsletterListsService } from '../services/newsletter-lists.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import * as moment from "moment";

declare var jQuery: any;

@Component({
  selector: 'app-all-news-lists',
  templateUrl: './all-news-lists.component.html',
  styleUrls: ['./all-news-lists.component.scss'],
  providers: [DatePipe]
})
export class AllNewsListsComponent implements OnInit {
  @Input() ProceedDoFilterApply?: Subject<any>; //# Input for ProceedDoFilter is getting from clinical details html
  private filterParams: any;
  result: any = [];
  newsletterListsRecords: any = [];
  // newsletterDiseaseNames: any = [];
  newsletterListings: any = [];
  newsletterDListings: any = [];
  newsLetterUserName: string = '';

  array1: any = [];

  loading = false;
  params: any;
  layout: any = {};
  // diseaseCheck: any;
  //hideCardBody: boolean = true;
  modalRef: any;
  helpContents: any;


  constructor(
    private globalVariableService: GlobalVariableService,
    private newsletterListsService: NewsletterListsService,
    private datePipe: DatePipe,
    private modalService: NgbModal,
  ) { }


  ngOnInit() {
    this.filterParams = this.globalVariableService.getFilterParams();
    console.log("new Filters1: ", this.filterParams);
    // this.getNewsletterLists(this.filterParams);

    this.ProceedDoFilterApply?.subscribe(data => {  // Calling from details, details working as mediator
      console.log("data: ", data);
      if (data === undefined) { // data=undefined true when apply filter from side panel
        //this.hideCardBody = true;
        this.filterParams = this.globalVariableService.getFilterParams();
        this.getNewsletterLists2(this.filterParams);
        console.log("new Filters for newsletter: ", this.filterParams);
      } else if (data.clickOn !== 'clickOnEventDetails') { // because graph should not change when click on this component itself
        // this.filterParams = this.globalVariableService.getFilterParams(this.globalVariableService.getChartFilterParams());
        this.getNewsletterLists2(this.filterParams);
      }
    });
    this.getNewsletterLists(this.filterParams);
  }

  getNewsletterLists(_filterParams: any) {
    this.loading = true;

    this.newsletterListsService.getNewsletterLists(_filterParams).subscribe(
      data => {
        this.result = data;
        this.newsletterListsRecords = this.result.newsletterRecords;
        console.log("AllshowNewsletterListsData: ", this.newsletterListsRecords);

        this.newsletterListings = [];
        this.newsletterListsRecords.forEach((event: any) => {

          var temps: any = {};
          // temps['userName'] = userName;
          temps['news_id'] = event.news_id;
          temps["title"] = event.title;
          temps["url"] = event.url;
          temps["description"] = event.description;
          temps["ta_names"] = event.ta_names;
          temps["disease_names"] = event.disease_names;
          temps["drug_names"] = event.drug_names;
          temps["company_names"] = event.company_names;
          temps["gene_names"] = event.gene_names;
          temps["marker_names"] = event.marker_names;
          temps["moa_names"] = event.moa_names;
          temps["publication_date"] = this.datePipe.transform(event.publication_date, 'yyyy-MM-dd');
          this.newsletterListings.push(temps);
        });
        console.log("AllNewsListings: ", this.newsletterListings);
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

  getNewsletterLists2(_filterParams: any) {
    this.loading = true;

    this.newsletterListsService.getNewsletterLists2(_filterParams).subscribe(
      data => {
        this.result = data;
        this.newsletterListsRecords = this.result.newsletterRecords;
        console.log("AllshowNewsletterListsData: ", this.newsletterListsRecords);
        this.newsletterListings = [];

        this.newsletterListsRecords.forEach((event: any) => {
          var temps: any = {};
          temps['news_id'] = event.news_id;
          temps["title"] = event.title;
          temps["url"] = event.url;
          temps["description"] = event.description;
          temps["ta_names"] = event.ta_names;
          temps["disease_names"] = event.disease_names;
          temps["drug_names"] = event.drug_names;
          temps["company_names"] = event.company_names;
          temps["gene_names"] = event.gene_names;
          temps["marker_names"] = event.marker_names;
          temps["moa_names"] = event.moa_names;
          temps["publication_date"] = this.datePipe.transform(event.publication_date, 'yyyy-MM-dd');
          this.newsletterListings.push(temps);
        });
        console.log("AllnewsletterListings2: ", this.newsletterListings);
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

}
