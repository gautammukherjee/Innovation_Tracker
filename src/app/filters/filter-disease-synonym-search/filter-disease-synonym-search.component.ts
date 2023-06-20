import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef, Input, Pipe, PipeTransform, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { IndicationService } from '../../services/common/indication.service';
import { GlobalVariableService } from '../../services/common/global-variable.service';

import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filter-disease-synonym-search',
  templateUrl: './filter-disease-synonym-search.component.html',
  styleUrls: ['./filter-disease-synonym-search.component.scss', '../global-filter.scss']
})
export class FilterDiseaseSynonymSearchComponent implements OnInit {

  public diseases_syns_search: Array<any> = [];
  public diseases_syns_search_count: Array<any> = [0];
  private result: any = [];
  newPost: any = [];
  public loading: boolean = false;
  public loadingSynsSearch: boolean = false;
  private filterParams: any;

  constructor(
    private indicationService: IndicationService,
    private globalVariableService: GlobalVariableService
  ) { }

  notEmptyPost: boolean = true;
  notscrolly: boolean = true;
  currentPage: number = 1;
  itemsPerPage: number = 500;
  isLoading: boolean = false;

  ngOnInit(): void {
    //To filter the disease indication lists
    // this.synonymSearch();
  }

  synonymSearch(searchval: any) {
    this.loadingSynsSearch = true;
    // this.loading = true;
    localStorage.setItem('searchval', searchval);

    this.filterParams = this.globalVariableService.getFilterParams({ "offSetValue": 0, "limitValue": this.itemsPerPage, "searchval": searchval });
    console.log("filterparamsSearchFirst: ", this.filterParams);


    this.indicationService.getIndicationSynonymSearchCount(this.filterParams)
      .subscribe(
        data => {
          this.result = data;
          this.diseases_syns_search_count = this.result.diseasesSynsCount[0].count;
          console.log("diseases_syns_count: ", this.result.diseasesSynsCount[0].count);
        },
        err => {
          // this.loadingSynsSearch = false;
          console.log(err.message)
        },
        () => {
          // this.loadingSynsSearch = false;
          console.log("loading finish")

          this.indicationService.getIndicationSynonymSearch(this.filterParams)
            .subscribe(
              data => {
                this.result = data;
                this.diseases_syns_search = this.result.diseasesSynsRecords;
                console.log("diseases_syns_search: ", this.diseases_syns_search.length);
                this.loading = true;
              },
              err => {
                this.loadingSynsSearch = false;
                console.log(err.message)
              },
              () => {
                this.loadingSynsSearch = false;
                console.log("loading finish")
              }
            );
        }
      );


  }

  inScroll() {
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

    const searchval = localStorage.getItem('searchval');

    this.filterParams = this.globalVariableService.getFilterParams({ "offSetValue": startIndex, "limitValue": this.itemsPerPage, "searchval": searchval });
    console.log("filterparamsSearchScroll: ", this.filterParams);

    this.indicationService.getIndicationSynonymSearch(this.filterParams)
      .subscribe(
        data => {
          this.newPost = data;
          if (this.newPost.diseasesSynsRecords.length === 0) {
            this.notEmptyPost = false;
          }
          // console.log("len: ", this.newPost.diseasesSynsRecords.length);

          this.diseases_syns_search = this.diseases_syns_search.concat(this.newPost.diseasesSynsRecords);
          // this.diseases_syns_search = this.newPost.diseasesSynsRecords;
          console.log("finalTotal: ", this.diseases_syns_search);
          this.notscrolly = true;
          console.log("length: ", this.newPost.diseasesSynsRecords.length);
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
