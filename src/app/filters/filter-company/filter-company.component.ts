import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef, Input, Pipe, PipeTransform, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { CompanyService } from '../../services/common/company.service';
import { GlobalVariableService } from '../../services/common/global-variable.service';

import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filter-company',
  templateUrl: './filter-company.component.html',
  styleUrls: ['./filter-company.component.scss', '../global-filter.scss']
})
export class FilterCompanyComponent implements OnInit {

  @Output() onSelectCompany: EventEmitter<any> = new EventEmitter();
  @Input() UpdateFilterDataApply?: Subject<any>;
  public alphabeticallyGroupedCompanies: any = [];
  public selectedCompanies: Array<object> = [];
  public companies: Array<object> = [];
  private params: object = {};
  private result: any = [];
  private results2: any = [];
  public loading: boolean = false;
  public enableFilter: boolean = false;
  public filterText: string = '';
  public seeMoreFilterText: string = '';
  public filterPlaceholder: string = '';
  public seeMoreFilterPlaceholder: string = '';
  public filterInput = new FormControl();
  public seeMoreFilterInput = new FormControl();
  public isAllSelected: boolean = false;
  togglecollapseStatus: boolean = false;
  private seeMoreCompanyModal: any;
  mouseOverON: any = undefined;
  otherMouseOverONElem: any = undefined;
  public disableProceed = true;
  companyFilter: string = '';
  companyFilterText: string = '';
  //diseaseCheck: any;
  //diseaseCheckCT: any;
  hideCardBody: boolean = true;

  constructor(
    private companyService: CompanyService,
    private globalVariableService: GlobalVariableService,
    private modalService: NgbModal,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    //To filter the company lists
    this.enableFilter = true;
    this.filterText = "";
    this.filterPlaceholder = "Company Filter..";

    //To filter the "SEE MORE" company lists
    this.seeMoreFilterText = "";
    this.seeMoreFilterPlaceholder = "Search Company";
    //End here

    // this.UpdateFilterDataApply.subscribe(event => {  // Calling from details, details working as mediator
    //   console.log("eventCompanies:: ", event);
    //   if (event == undefined) {
    //     this.hideCardBody = true;
    //     // this.selectedCompanies = []; // Reinitialized, because when data updated on click TA, it should empty locally
    //     // this.getCompanies(event, 2);
    //   } else if (event !== undefined && event.clickOn != 'companyFilter' && event.clickOn != 'drugFilter')
    //     this.hideCardBody = true;
    //   // this.getCompanies(event, 2);
    // });
    // this.getCompanies(event, 1);
    // this.hideCardBody = true;
  }

  ngOnDestroy() {
    this.UpdateFilterDataApply?.unsubscribe();
  }

  public getCompanies(event: any, type: any) {
    this.loading = true;
    this.params = this.globalVariableService.getFilterParams();
    // this.diseaseCheck = this.params['di_ids']; // if disease_id is checked
    // this.diseaseCheckCT = this.params['ct_di_ids']; // if disease_id is checked
    // console.log("checked here Company: ", this.diseaseCheck);

    this.selectedCompanies = [];

    //if (this.diseaseCheck !== undefined || this.diseaseCheckCT !== undefined) {
    this.companyService.getCompany()
      .subscribe(
        data => {
          this.result = data;
          // console.log("result: ", this.result);
          this.companies = this.result.companiesRecords;
          console.log("companies: ", this.companies);

          this.alphabeticallyGroupedCompanies = this.groupBy(this.companies, 'company_name');
          // console.log("alphabeticallyGroupedCompanies: ", this.alphabeticallyGroupedCompanies);

          //if (event !== undefined && event.type == 'load') { // i.e No companies selected previously
          // for (let i = 0; i < this.result.companiesRecords.length && i < 1; i++) {
          //   this.selectedCompanies.push(this.result.companiesRecords[i].company_id);
          //   //this.selectedCompanies = [];
          // }
          // console.log("selected Company: ", this.selectedCompanies);
          // this.globalVariableService.setSelectedCompanies(this.selectedCompanies);
          //} else {
          //this.selectedCompanies = Array.from(this.globalVariableService.getSelectedCompanies());
          //}
        },
        err => {
          this.loading = false;
          console.log(err.message)
        },
        () => {
          this.loading = false;
          console.log("loading finish")
        }
      );
    // }
    // else {
    //   this.companies = [];
    //   this.loading = false;
    // }
  }

  selectCompany(company: any, event: any, from: any = null) {
    if (event.target.checked) {
      this.selectedCompanies.push(company.company_id);
    } else {
      this.selectedCompanies.splice(this.selectedCompanies.indexOf(company.company_id), 1);
    }

    console.log("company: ", this.selectedCompanies);
    // this.globalVariableService.resetfiltersInner();// On click TA other filter's data will update, so've to reset filter selected data   

    if (from != 'companyWarningModal')
      this.proceed();
    this.enableDisableProceedButton();
  }

  collapseMenuItem() {
    this.togglecollapseStatus = !this.togglecollapseStatus;
  }

  selectAll(event: any, companyWarningModal: any) {
    if (this.isAllSelected) {
      this.companies.map((element: any) => {
        console.log("element: ", element);
        this.selectedCompanies.push(element.company_id);
      })
    } else {
      this.selectedCompanies = [];
    }
    this.enableDisableProceedButton();
  }

  resetCompany() {
    this.selectedCompanies = [];
    this.globalVariableService.setSelectedCompanies(this.selectedCompanies);
    this.selectedCompanies = Array.from(this.globalVariableService.getSelectedCompanies());
    // this.proceed();
  }

  reloadCompany() {
    console.log("company: ")
    // this.globalVariableService.resetChartFilter();
    // this.hideCardBody = !this.hideCardBody;
    this.params = this.globalVariableService.getFilterParams();
    // if (!this.hideCardBody)
    this.getCompanies(event, 1);
  }

  SeeMore(evt: any, seeMoreCompanyModal: any) {
    this.seeMoreCompanyModal = this.modalService.open(seeMoreCompanyModal, { size: 'lg', windowClass: 'diseaseModal-custom-class', keyboard: false, backdrop: 'static' });
  }
  seeMoreClosePopup() {
    this.selectedCompanies = Array.from(this.globalVariableService.getSelectedCompanies());
    this.isAllSelected = false;
    this.seeMoreCompanyModal.close();
  }

  closePopup() {
    this.selectedCompanies = Array.from(this.globalVariableService.getSelectedCompanies());
    this.isAllSelected = false;
    this.seeMoreCompanyModal.close();
  }

  public seeMoreproceed() {
    this.proceed();
    // this.enableDisableProceedButton();
  }

  proceed() {
    this.globalVariableService.setSelectedCompanies(this.selectedCompanies);
    this.selectedCompanies = Array.from(this.globalVariableService.getSelectedCompanies());
    console.log("selectedCompanies_add: ", this.selectedCompanies);
    if (this.seeMoreCompanyModal != undefined)
      this.seeMoreCompanyModal.close();
    this.onSelectCompany.emit();
  }

  private enableDisableProceedButton() {
    if (this.selectedCompanies.length < 1) {
      this.disableProceed = true;
    } else {
      this.disableProceed = false;
    }
  }

  private groupBy(collection: any, property: any) {   //collection:Array, property:String
    // prevents the application from breaking if the array of objects doesn't exist yet
    if (!collection) {
      return null;
    }

    const groupedCollection = collection.reduce((previous: any, current: any) => {
      if (!previous[current[property].charAt(0)]) {
        previous[current[property].charAt(0)] = [current];
      } else {
        previous[current[property].charAt(0)].push(current);
      }

      return previous;
    }, {});
    // this will return an array of objects, each object containing a group of objects
    return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
  }

  scrollToView(key: any) {
    var elmnt = document.getElementById(key);
    if (elmnt !== null)
      elmnt.scrollIntoView();
  }

}
