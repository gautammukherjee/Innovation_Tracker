import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef, Input, Pipe, PipeTransform, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { DevelopmentPhaseService } from '../../services/common/development-phase.service';
import { GlobalVariableService } from '../../services/common/global-variable.service';

import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filter-development-phase',
  templateUrl: './filter-development-phase.component.html',
  styleUrls: ['./filter-development-phase.component.scss', '../global-filter.scss']
})
export class FilterDevelopmentPhaseComponent implements OnInit {

  @Output() onSelectDevelopmentPhase: EventEmitter<any> = new EventEmitter();
  @Input() UpdateFilterDataApply?: Subject<any>;
  public alphabeticallyGroupedDevelopments: any = [];
  public selectedDevelopments: Array<object> = [];
  public developments: Array<object> = [];
  private params: object = {};
  private result: any = [];
  private results2: any = [];
  public loading: boolean = false;
  public developmentCheck: boolean = false;
  public enableFilter: boolean = false;
  public filterText: string = '';
  public seeMoreFilterText: string = '';
  public filterPlaceholder: string = '';
  public seeMoreFilterPlaceholder: string = '';
  public filterInput = new FormControl();
  public seeMoreFilterInput = new FormControl();
  public isAllSelected: boolean = false;
  togglecollapseStatus: boolean = false;
  private seeMoreDevelopmentModal: any;
  mouseOverON: any = undefined;
  otherMouseOverONElem: any = undefined;
  public disableProceed = true;
  developmentFilter: string = '';
  developmentFilterText: string = '';
  //diseaseCheck: any;
  //diseaseCheckCT: any;
  hideCardBody: boolean = true;

  constructor(
    private developmentPhaseService: DevelopmentPhaseService,
    private globalVariableService: GlobalVariableService,
    private modalService: NgbModal,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    //To filter the development lists
    this.enableFilter = true;
    this.filterText = "";
    this.filterPlaceholder = "Development Phase Filter..";

    //To filter the "SEE MORE" development lists
    this.seeMoreFilterText = "";
    this.seeMoreFilterPlaceholder = "Search Development Phase";
    //End here

    this.selectedDevelopments = Array.from(this.globalVariableService.getSelectedDevelopments());
  }

  ngOnDestroy() {
    this.UpdateFilterDataApply?.unsubscribe();
  }

  public getDevelopment(event: any, type: any) {
    this.loading = true;
    this.params = this.globalVariableService.getFilterParams();
    // this.diseaseCheck = this.params['di_ids']; // if disease_id is checked
    // this.diseaseCheckCT = this.params['ct_di_ids']; // if disease_id is checked
    // console.log("checked here development: ", this.diseaseCheck);

    // this.selectedDevelopments = [];

    //if (this.diseaseCheck !== undefined || this.diseaseCheckCT !== undefined) {
    this.developmentPhaseService.getDevelopmentPhase()
      .subscribe(
        data => {
          this.result = data;
          // console.log("result: ", this.result);
          this.developments = this.result.developmentRecords;
          console.log("developments: ", this.developments);

          this.alphabeticallyGroupedDevelopments = this.groupBy(this.developments, 'dev_phase_name');
          // console.log("alphabeticallyGroupedDevelopment: ", this.alphabeticallyGroupedDevelopments);
        },
        err => {
          this.developmentCheck = true;
          this.loading = false;
          console.log(err.message)
        },
        () => {
          this.developmentCheck = true;
          this.loading = false;
          console.log("loading finish")
        }
      );
    // }
    // else {
    //   this.developments = [];
    //   this.loading = false;
    // }
  }

  selectDevelopmentPhase(development: any, event: any, from: any = null) {
    if (event.target.checked) {
      this.selectedDevelopments.push(development.dev_phase_id);
    } else {
      this.selectedDevelopments.splice(this.selectedDevelopments.indexOf(development.dev_phase_id), 1);
    }

    console.log("selectedDevelopments: ", this.selectedDevelopments);
    // this.globalVariableService.resetfiltersInner();// On click TA other filter's data will update, so've to reset filter selected data   

    if (from != 'developmentWarningModal')
      this.proceed();
    this.enableDisableProceedButton();
  }

  collapseMenuItem() {
    this.togglecollapseStatus = !this.togglecollapseStatus;
  }

  selectAll(event: any, developmentWarningModal: any) {
    if (this.isAllSelected) {
      this.developments.map((element: any) => {
        console.log("element: ", element);
        this.selectedDevelopments.push(element.dev_phase_id);
      })
    } else {
      this.selectedDevelopments = [];
    }
    this.enableDisableProceedButton();
  }

  resetDevelopment() {
    this.selectedDevelopments = [];
    this.globalVariableService.setSelectedDevelopments(this.selectedDevelopments);
    this.selectedDevelopments = Array.from(this.globalVariableService.getSelectedDevelopments());
    // this.proceed();
  }

  reloadDevelopment() {
    console.log("development: ")
    // this.globalVariableService.resetChartFilter();
    // this.hideCardBody = !this.hideCardBody;
    this.params = this.globalVariableService.getFilterParams();
    // if (!this.hideCardBody)
    this.getDevelopment(event, 1);
  }

  SeeMore(evt: any, seeMoreDevelopmentModal: any) {
    this.seeMoreDevelopmentModal = this.modalService.open(seeMoreDevelopmentModal, { size: 'lg', windowClass: 'diseaseModal-custom-class', keyboard: false, backdrop: 'static' });
  }
  seeMoreClosePopup() {
    this.selectedDevelopments = Array.from(this.globalVariableService.getSelectedDevelopments());
    this.isAllSelected = false;
    this.seeMoreDevelopmentModal.close();
  }

  closePopup() {
    this.selectedDevelopments = Array.from(this.globalVariableService.getSelectedDevelopments());
    this.isAllSelected = false;
    this.seeMoreDevelopmentModal.close();
  }

  public seeMoreproceed() {
    this.proceed();
    // this.enableDisableProceedButton();
  }

  proceed() {
    this.globalVariableService.setSelectedDevelopments(this.selectedDevelopments);
    this.selectedDevelopments = Array.from(this.globalVariableService.getSelectedDevelopments());
    console.log("selectedDevelopments_add: ", this.selectedDevelopments);
    if (this.seeMoreDevelopmentModal != undefined)
      this.seeMoreDevelopmentModal.close();
    this.onSelectDevelopmentPhase.emit();
  }

  private enableDisableProceedButton() {
    if (this.selectedDevelopments.length < 1) {
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
