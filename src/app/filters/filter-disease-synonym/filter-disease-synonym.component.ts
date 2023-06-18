import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef, Input, Pipe, PipeTransform, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { IndicationService } from '../../services/common/indication.service';
import { GlobalVariableService } from '../../services/common/global-variable.service';

import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filter-disease-synonym',
  templateUrl: './filter-disease-synonym.component.html',
  styleUrls: ['./filter-disease-synonym.component.scss', '../global-filter.scss']
})
export class FilterDiseaseSynonymComponent implements OnInit {

  public diseases: Array<object> = [];
  public diseases_syns: Array<any> = [];
  private params: object = {};
  private result: any = [];
  newPost: any = [];
  public loading: boolean = false;
  public loadingSyns: boolean = false;
  public enableFilter: boolean = false;
  public filterText: string = '';
  public filterPlaceholder: string = '';
  public seeMoreFilterPlaceholder: string = '';
  public filterInput = new FormControl();
  public seeMoreFilterInput = new FormControl();
  diseaseFilter: string = '';
  diseaseFilterText: string = '';
  diseaseSynFilterText: string = '';
  private filterParams: any;

  constructor(
    private indicationService: IndicationService,
    private globalVariableService: GlobalVariableService
  ) { }

  notEmptyPost: boolean = true;
  notscrolly: boolean = true;
  currentPage: number = 1;
  itemsPerPage: number = 2500;
  isLoading: boolean = false;

  ngOnInit(): void {
    //To filter the disease indication lists
    this.enableFilter = true;
    this.filterText = "";
    this.filterPlaceholder = "Disease Filter..";
    this.getindicationsSynonym();
  }

  public getindicationsSynonym() {
    this.loadingSyns = true;

    this.filterParams = this.globalVariableService.getFilterParams({ "offSetValue": 0, "limitValue": this.itemsPerPage });
    console.log("filterparamsFirst: ", this.filterParams);

    this.indicationService.getIndicationSynonym(this.filterParams)
      .subscribe(
        data => {
          this.result = data;
          this.diseases_syns = this.result.diseasesSynsRecords;
          console.log("diseases_syns: ", this.diseases_syns);
        },
        err => {
          this.loadingSyns = false;
          console.log(err.message)
        },
        () => {
          this.loadingSyns = false;
          console.log("loading finish")
        }
      );

  }

  // seeSynonymClosePopup() {
  //   this.seeSynsDiseaseModal.close();
  // }


  scrollToView(key: any) {
    var elmnt = document.getElementById(key);
    if (elmnt !== null)
      elmnt.scrollIntoView();
  }

  onScroll() {
    console.log("scrolled");
    if (this.notscrolly && this.notEmptyPost) {
      this.notscrolly = false;
      this.currentPage++;
      this.loadNextPost();
    }
  }

  loadNextPost() {
    console.log("in scrolled");
    this.isLoading = true;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;

    this.filterParams = this.globalVariableService.getFilterParams({ "offSetValue": startIndex, "limitValue": this.itemsPerPage });

    this.indicationService.getIndicationSynonym(this.filterParams)
      .subscribe(
        data => {
          this.newPost = data;
          if (this.newPost.diseasesSynsRecords.length === 0) {
            this.notEmptyPost = false;
          }
          // console.log("len: ", this.newPost.diseasesSynsRecords.length);

          this.diseases_syns = this.diseases_syns.concat(this.newPost.diseasesSynsRecords);
          // this.diseases_syns = this.newPost.diseasesSynsRecords;
          console.log("finalTotal: ", this.diseases_syns);
          this.notscrolly = true;
          console.log("length: ", this.result.diseasesSynsRecords.length);
        },
        err => {
          this.isLoading = false;
          console.log(err.message)
        },
        () => {
          this.isLoading = false;
          console.log("loading finish")
        }
      );

  }



}
