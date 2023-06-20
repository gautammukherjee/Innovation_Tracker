import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Inject } from '@angular/core';
import { GlobalVariableService } from './../services/common/global-variable.service';
import { NewsletterListsService } from '../services/newsletter-lists.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import * as moment from "moment";
// import { NgxSpinnerService } from 'ngx-spinner';

declare var jQuery: any;

@Component({
  selector: 'app-newsletter-lists',
  templateUrl: './newsletter-lists.component.html',
  styleUrls: ['./newsletter-lists.component.scss'],
  providers: [DatePipe]
})
export class NewsletterListsComponent implements OnInit {
  @Input() ProceedDoFilterApply?: Subject<any>; //# Input for ProceedDoFilter is getting from clinical details html
  private filterParams: any;
  result: any = [];
  newPost: any = [];
  newsletterListsRecords: any = [];
  newsletterTotalCounts: any = [];
  // newsletterDiseaseNames: any = [];
  newsletterListings: any = [];
  newsletterDListings: any = [];
  newsLetterUserName: string = '';

  array1: any = [];

  loading: boolean = false;
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
    // private spinner: NgxSpinnerService
  ) { }

  notEmptyPost: boolean = true;
  notscrolly: boolean = true;
  currentPage: number = 1;
  itemsPerPage: number = 100;
  isLoading: boolean = false;

  // toggleLoading = () => this.isLoading = !this.isLoading;

  ngOnInit() {
    this.filterParams = this.globalVariableService.getFilterParams();
    console.log("new Filters1: ", this.filterParams);
    // this.getNewsletterLists(this.filterParams);

    this.ProceedDoFilterApply?.subscribe(data => {  // Calling from details, details working as mediator
      // console.log("data: ", data);
      this.notEmptyPost = true;
      this.currentPage = 1;
      if (data === undefined) { // data=undefined true when apply filter from side panel
        //this.hideCardBody = true;
        this.filterParams = this.globalVariableService.getFilterParams();
        this.getNewsletterLists(this.filterParams);
        // console.log("new Filters for newsletter: ", this.filterParams);
      } else if (data.clickOn !== 'clickOnEventDetails') { // because graph should not change when click on this component itself
        // this.filterParams = this.globalVariableService.getFilterParams(this.globalVariableService.getChartFilterParams());
        this.getNewsletterLists(this.filterParams);
      }
    });
    this.getNewsletterLists(this.filterParams);
  }

  getNewsletterLists(_filterParams: any) {
    this.loading = true;

    // this.toggleLoading();

    // this.diseaseCheck = _filterParams['di_ids']; // if disease_id is checked
    // console.log("checked here Disease in event description: ", this.diseaseCheck);
    // if (this.diseaseCheck !== undefined) {

    this.newsletterListsService.getAllNews(this.filterParams).subscribe(
      data => {
        this.result = data;
        // console.log("count: ", this.result.newsletterTotalCounts[0].count);
        this.newsletterTotalCounts = this.result.newsletterTotalCounts[0].count;
      }
    );

    this.filterParams = this.globalVariableService.getFilterParams({ "offSetValue": 0, "limitValue": this.itemsPerPage });
    console.log("filterparamsFirst: ", this.filterParams);

    this.newsletterListsService.getNewsletterLists(this.filterParams).subscribe(
      data => {
        this.result = data;
        this.newsletterListsRecords = this.result.newsletterRecords;
        console.log("showNewsletterListsData: ", this.newsletterListsRecords);

        this.newsletterListings = [];
        this.newsletterListsRecords.forEach((event: any) => {

          // var str: any = {};
          // str = event.disease_names;
          // let diseaseNames = str.replace(/\//g, '\/\u200B');

          // event.disease_names.forEach((x: any) => {
          //   var y = x ? '' || 'XXX' : 'MyVAL'
          //   console.log("x: ", y);
          // });

          // var arr = event.disease_names.match(/(".*?"|[^",{\s]+)(?=\s*,|\s*$)/g);
          // console.log("x: ", arr);

          // const field = Object.values(event.disease_names)
          //   .map((address: any) =>
          //     Object.entries(address).map(([value]) => `${value}`)
          //   )
          //   .join(', ');
          // console.log("x: ", field);

          // this.array1 = event.disease_names;
          // console.log("xx: ", [this.array1]);

          // var myString = [this.array1].join(', ');
          // console.log("x: ", myString);

          // this.newsletterDiseaseNames = [];
          // this.newsletterListsService.getNewsletterDisease({ 'news_id': event.news_id }).subscribe(
          //   data => {
          //     this.result = data;

          //     this.newsletterDiseaseNames = this.result.newsletterDiseaseNames;
          //     console.log("newsletterDiseaseNames: ", this.newsletterDiseaseNames);

          //     // var myString = [this.newsletterDiseaseNames.disease_name].join(', ');
          //     // console.log("x: ", myString);

          //   },
          //   err => {
          //     console.log(err.message);
          //     this.loading = false;
          //   },
          //   () => {
          //     this.loading = false;
          //   }
          // );


          // let userName = this.getUserName(event.user_id);
          // console.log("username: ", userName);

          // var newsTypeName = '';
          // var newsTypeId = this.filterParams['news_type_id'];
          // console.log("newsType: ", newsTypeId);

          // if (newsTypeId == 1) {
          //   newsTypeName = "Innovation"
          // }
          // else if (newsTypeId == 2) {
          //   newsTypeName = "News"
          // }
          // else if (newsTypeId.includes([1, 2])) {
          //   newsTypeName = "Innovation, News"
          // }

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
          temps["dev_phase_names"] = event.dev_phase_names;
          // temps["news_type_name"] = newsTypeName;
          temps["publication_date"] = this.datePipe.transform(event.publication_date, 'yyyy-MM-dd');
          //temps["link"] = '<a href="' + event.link + '" target="_blank">link</a>';
          //temps["url_title"] = '<a href="' + event.link + '" target="_blank">' + event.link + '</a>';
          this.newsletterListings.push(temps);
        });
        console.log("newsletterListings: ", this.newsletterListings);
        // complete: () => this.toggleLoading()
      },
      err => {
        console.log(err.message);
        this.loading = false;
      },
      () => {
        this.loading = false;
      },
    );
    // }
    // else {
    //   this.newsletterListsRecords = [];
    //   this.loading = false;
    // }
  }

  // containsAll(needles: any, haystack: any) {
  //   for (var i = 0; i < needles.length; i++) {
  //     if ($.inArray(needles[i], haystack) == -1) return false;
  //   }
  //   return true;
  // }

  // getUserName(userId: number) {
  //   this.loading = true;
  //   this.newsletterListsService.getNewsletterUserName({ 'user_id': userId }).subscribe(
  //     data => {
  //       this.result = data;
  //       // console.log("newsLetterUserName: ", this.result.newsletterUserName[0].user_name);
  //       return this.result.newsletterUserName[0].user_name;
  //     },
  //     err => {
  //       console.log(err.message);
  //       this.loading = false;
  //     },
  //     () => {
  //       this.loading = false;
  //     }
  //   );
  // }

  // reloadDescription() {
  //   console.log("Event description: ")
  //   // this.globalVariableService.resetChartFilter();
  //   this.hideCardBody = !this.hideCardBody;
  //   this.filterParams = this.globalVariableService.getFilterParams();
  //   if (!this.hideCardBody)
  //     this.getNewsletterLists(this.filterParams);

  // }

  // help(helpDesc) {
  //   this.helpContents = "Event Description";
  //   this.modalRef = this.modalService.open(helpDesc, { size: 'lg' });
  // }

  onScroll() {
    // console.log("scrolled");
    // this.spinner.show();
    if (this.notscrolly && this.notEmptyPost) {
      // this.spinner.show();
      this.notscrolly = false;
      this.currentPage++;
      this.loadNextPost();
    }
  }

  loadNextPost() {
    // this.toggleLoading();
    this.isLoading = true;
    // const lastPost = this.newsletterListsRecords[this.newsletterListsRecords.length - 1];
    // //get id of last post
    // const lastPostId = lastPost.news_id;
    // //sent this id  as key value pare using formdata()
    // const dataToSend = new FormData();
    // dataToSend.append('news_id', lastPostId);

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;

    this.filterParams = this.globalVariableService.getFilterParams({ "offSetValue": startIndex, "limitValue": this.itemsPerPage });
    // console.log("filterparamScroll: ", this.filterParams);

    this.newsletterListsService.getNewsletterLists(this.filterParams).subscribe(
      data => {
        this.newPost = data;
        // console.log("newPost: ", this.newPost.newsletterRecords);
        console.log("newPostLength: ", this.newPost.newsletterRecords.length);
        // this.spinner.hide();
        if (this.newPost.newsletterRecords.length === 0) {
          this.notEmptyPost = false;
        }

        //add newly fetched posts to the existing posts
        // this.newsletterListsRecords = [];
        // this.newsletterListsRecords = this.newsletterListsRecords.concat(this.newPost.newsletterRecords);
        this.newsletterListsRecords = this.newPost.newsletterRecords;
        console.log("finalTotal: ", this.newsletterListsRecords);
        this.notscrolly = true;

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
          temps["dev_phase_names"] = event.dev_phase_names;
          // temps["news_type_name"] = newsTypeName;
          temps["publication_date"] = this.datePipe.transform(event.publication_date, 'yyyy-MM-dd');
          //temps["link"] = '<a href="' + event.link + '" target="_blank">link</a>';
          //temps["url_title"] = '<a href="' + event.link + '" target="_blank">' + event.link + '</a>';
          this.newsletterListings.push(temps);
        });


        // complete: () => this.toggleLoading()
      },
      err => {
        console.log(err.message);
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      },
    );

  }

}
