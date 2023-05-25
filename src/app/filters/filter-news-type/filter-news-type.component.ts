import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef, Input, Pipe, PipeTransform, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NewsTypeService } from '../../services/common/news-type.service';
import { GlobalVariableService } from '../../services/common/global-variable.service';
import { FormControl } from '@angular/forms';

//import 'rxjs/add/operator/debounceTime';
import { catchError, retry } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-filter-news-type',
  templateUrl: './Filter-news-type.Component.html',
  styleUrls: ['./filter-news-type.component.scss', '../global-filter.scss']
})
export class FilterNewsTypeComponent implements OnInit {

  @Output() onSelectNewsType: EventEmitter<any> = new EventEmitter();

  newsTypes: any = [];
  private result: any = [];
  loading: boolean = false;
  showTABody: boolean = false;

  private warningModalRef: any;
  private selectedIndications = [];
  private selectedIndicationsNew = [];
  showDiseaseIndicationList: boolean = false;
  private params: object = {};
  public diseases: Array<object> = [];
  public alphabeticallyGroupedDieseases = [];
  public isAllSelected: boolean = false;
  public disableProceed = false;
  public filterText: string = '';
  public seeMoreFilterText: string = '';
  public enableFilter: boolean = true;
  public seeMoreFilterPlaceholder: string = '';
  public filterPlaceholder: string = '';
  public filterInput = new FormControl();
  public seeMoreFilterInput = new FormControl();

  public selectedNewsType: Array<object> = [];
  @Output() onSelectIndication: EventEmitter<any> = new EventEmitter();

  constructor(
    private newsTypeService: NewsTypeService,
    private globalVariableService: GlobalVariableService,
  ) {
    // this.selectedNewsType = this.globalVariableService.getSelectedNewsType();
    // console.log("selectedNewsType: ", this.selectedNewsType);
  }

  ngOnInit(): void {

    this.loading = true;
    this.showDiseaseIndicationList = false;
    this.enableFilter = true;
    this.filterText = "";
    this.filterPlaceholder = "Disease Filter..";

    this.filterInput
      .valueChanges
      .subscribe(term => {
        this.filterText = term;
      });
    //End here

    //To filter the "SEE MORE" disease indication lists
    this.seeMoreFilterText = "";
    this.seeMoreFilterPlaceholder = "Search Disease";
    this.seeMoreFilterInput
      .valueChanges
      .subscribe(term => {
        this.seeMoreFilterText = term;
      });
    //End here

    this.selectedNewsType = Array.from(this.globalVariableService.getSelectedNewsType());
    console.log("getselectedNewsType: ", this.selectedNewsType);

    this.newsTypeService.getNewsType().subscribe(
      data => {
        this.result = data;
        this.newsTypes = this.result.newsTypesRecords;
        console.log("newsTypes: ", this.newsTypes);
      },
      err => {
        this.loading = false;
        console.log(err.message)
      },
      () => {
        this.loading = false;
      }
    );
  }

  onTAHeaderClick() {
    this.showTABody = !this.showTABody;
  }

  selectNewsType(newsType: any, event: any, warning: any = null) {
    if (event.target.checked) {
      this.selectedNewsType.push(newsType.news_type_id);
    } else {
      this.selectedNewsType.splice(this.selectedNewsType.indexOf(newsType.news_type_id), 1);
    }
    // console.log("selectedNewsType: ", this.selectedNewsType);
    this.proceed();
    // this.enableDisableProceedButton();
  }

  proceed() {
    this.globalVariableService.setSelectedNewsType(this.selectedNewsType);
    this.selectedNewsType = Array.from(this.globalVariableService.getSelectedNewsType());
    console.log("selectedNewsType: ", this.selectedNewsType);
    // if (this.seeMorediseaseModal != undefined)
    //   this.seeMorediseaseModal.close();
    this.onSelectNewsType.emit();
  }

  scrollToView(key: any) {
    var elmnt = document.getElementById(key);
    if (elmnt !== null)
      elmnt.scrollIntoView();
  }

}
