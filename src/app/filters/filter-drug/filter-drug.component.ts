import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef, Input, Pipe, PipeTransform, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { DrugService } from '../../services/common/drug.service';
import { GlobalVariableService } from '../../services/common/global-variable.service';

import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filter-drug',
  templateUrl: './filter-drug.component.html',
  styleUrls: ['./filter-drug.component.scss', '../global-filter.scss']
})
export class FilterDrugComponent implements OnInit {

  @Output() onSelectDrug: EventEmitter<any> = new EventEmitter();
  @Input() UpdateFilterDataApply?: Subject<any>;
  // public alphabeticallyGroupedDrugs = [];
  public alphabeticallyGroupedDrugs: any = '';
  public selectedDrugs: Array<object> = [];
  public drugs: Array<object> = [];
  public drugs_syns: Array<any> = [];
  private params: object = {};
  private result: any = [];
  private results2: any = [];
  public loading: boolean = false;
  public loadingSyns: boolean = false;

  public drugsCheck: boolean = false;
  public enableFilter: boolean = false;
  public filterText: string = '';
  public seeMoreFilterText: string = '';
  public filterPlaceholder: string = '';
  public seeMoreFilterPlaceholder: string = '';
  public filterInput = new FormControl();
  public seeMoreFilterInput = new FormControl();
  public isAllSelected: boolean = false;
  togglecollapseStatus: boolean = false;
  private seeMoreDrugModal: any;
  private seeSynsDrugModal: any;
  mouseOverON: any = undefined;
  otherMouseOverONElem: any = undefined;
  public disableProceed = true;
  drugFilter: string = '';
  drugFilterText: string = '';
  drugSynFilterText: string = '';
  //diseaseCheck: any;
  //diseaseCheckCT: any;
  hideCardBody: boolean = true;

  constructor(
    private drugService: DrugService,
    private globalVariableService: GlobalVariableService,
    private modalService: NgbModal,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    //To filter the drug lists
    this.enableFilter = true;
    this.filterText = "";
    this.filterPlaceholder = "Drug Filter..";

    //To filter the "SEE MORE" drug lists
    this.seeMoreFilterText = "";
    this.seeMoreFilterPlaceholder = "Search Drug";
    //End here

    // this.UpdateFilterDataApply.subscribe(event => {  // Calling from details, details working as mediator
    //   console.log("eventDrugs:: ", event);
    //   if (event == undefined) {
    //     this.hideCardBody = true;
    //     // this.selectedDrugs = []; // Reinitialized, because when data updated on click TA, it should empty locally
    //     // this.getDrugs(event, 2);
    //   } else if (event !== undefined && event.clickOn != 'drugFilter' && event.clickOn != 'drugFilter')
    //     this.hideCardBody = true;
    //   // this.getDrugs(event, 2);
    // });
    // this.getDrugs(event, 1);
    // this.hideCardBody = true;
    this.selectedDrugs = Array.from(this.globalVariableService.getSelectedDrugs());
  }

  ngOnDestroy() {
    this.UpdateFilterDataApply?.unsubscribe();
  }

  public getDrugs(event: any, type: any) {
    this.loading = true;
    this.params = this.globalVariableService.getFilterParams();
    // this.diseaseCheck = this.params['di_ids']; // if disease_id is checked
    // this.diseaseCheckCT = this.params['ct_di_ids']; // if disease_id is checked
    // console.log("checked here Drug: ", this.diseaseCheck);

    // this.selectedDrugs = [];

    //if (this.diseaseCheck !== undefined || this.diseaseCheckCT !== undefined) {
    this.drugService.getDrug()
      .subscribe(
        data => {
          this.result = data;
          // console.log("result: ", this.result);
          this.drugs = this.result.drugsRecords;
          console.log("drugs: ", this.drugs);

          this.alphabeticallyGroupedDrugs = this.groupBy(this.drugs, 'drug_name');
          // console.log("alphabeticallyGroupedDrugs: ", this.alphabeticallyGroupedDrugs);

          //if (event !== undefined && event.type == 'load') { // i.e No Drugs selected previously
          // for (let i = 0; i < this.result.drugsRecords.length && i < 1; i++) {
          //   this.selectedDrugs.push(this.result.drugsRecords[i].drug_id);
          //   //this.selectedDrugs = [];
          // }
          // console.log("selected Drug: ", this.selectedDrugs);
          // this.globalVariableService.setSelectedDrugs(this.selectedDrugs);
          //} else {
          //this.selectedDrugs = Array.from(this.globalVariableService.getSelectedDrugs());
          //}
        },
        err => {
          this.drugsCheck = true;
          this.loading = false;
          console.log(err.message)
        },
        () => {
          this.drugsCheck = true;
          this.loading = false;
          console.log("loading finish")
        }
      );
    // }
    // else {
    //   this.drugs = [];
    //   this.loading = false;
    // }
  }

  selectDrug(drug: any, event: any, from: any = null) {
    if (event.target.checked) {
      this.selectedDrugs.push(drug.drug_id);
    } else {
      this.selectedDrugs.splice(this.selectedDrugs.indexOf(drug.drug_id), 1);
    }

    console.log("drug: ", this.selectedDrugs);
    // this.globalVariableService.resetfiltersInner();// On click TA other filter's data will update, so've to reset filter selected data   

    if (from != 'drugWarningModal')
      this.proceed();
    this.enableDisableProceedButton();
  }

  collapseMenuItem() {
    this.togglecollapseStatus = !this.togglecollapseStatus;
  }

  selectAll(event: any, drugWarningModal: any) {
    if (this.isAllSelected) {
      this.result.map((element: any) => {
        // console.log("element: ", element);
        this.selectedDrugs.push(element.drug_id);
      })
    } else {
      this.selectedDrugs = [];
    }
    this.enableDisableProceedButton();
  }

  resetDrug() {
    this.selectedDrugs = [];
    this.globalVariableService.setSelectedDrugs(this.selectedDrugs);
    this.selectedDrugs = Array.from(this.globalVariableService.getSelectedDrugs());
    // this.proceed();
  }

  reloadDrug() {
    // this.globalVariableService.resetChartFilter();
    // this.hideCardBody = !this.hideCardBody;
    // this.params = this.globalVariableService.getFilterParams();
    // if (!this.hideCardBody)
    this.getDrugs(event, 1);
  }

  SeeMore(evt: any, seeMoreDrugModal: any) {
    this.seeMoreDrugModal = this.modalService.open(seeMoreDrugModal, { size: 'lg', windowClass: 'diseaseModal-custom-class', keyboard: false, backdrop: 'static' });
  }

  SeeSyns(evt: any, seeSynsDrugModal: any) {
    this.loadingSyns = true;
    this.seeSynsDrugModal = this.modalService.open(seeSynsDrugModal, { size: 'lg', windowClass: 'diseaseModal-custom-class', keyboard: false, backdrop: 'static' });
    this.drugService.getDrugSynonym()
      .subscribe(
        data => {
          this.result = data;
          // this.result = this.results1.diseasesRecords;
          this.drugs_syns = this.result.drugsSynsRecords;
          console.log("drugs_syns: ", this.drugs_syns);
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

  seeMoreClosePopup() {
    this.selectedDrugs = Array.from(this.globalVariableService.getSelectedDrugs());
    this.isAllSelected = false;
    this.seeMoreDrugModal.close();
  }

  seeSynonymClosePopup() {
    this.seeSynsDrugModal.close();
  }

  closePopup() {
    this.selectedDrugs = Array.from(this.globalVariableService.getSelectedDrugs());
    this.isAllSelected = false;
    this.seeMoreDrugModal.close();
  }

  public seeMoreproceed() {
    this.proceed();
    // this.enableDisableProceedButton();
  }

  proceed() {
    this.globalVariableService.setSelectedDrugs(this.selectedDrugs);
    this.selectedDrugs = Array.from(this.globalVariableService.getSelectedDrugs());
    if (this.seeMoreDrugModal != undefined)
      this.seeMoreDrugModal.close();
    this.onSelectDrug.emit();
  }

  private enableDisableProceedButton() {
    if (this.selectedDrugs.length < 1) {
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
