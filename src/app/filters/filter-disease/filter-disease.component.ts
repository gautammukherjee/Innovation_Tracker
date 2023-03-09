import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef, Input, Pipe, PipeTransform, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { IndicationService } from '../../services/common/indication.service';
import { GlobalVariableService } from '../../services/common/global-variable.service';

import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filter-disease',
  templateUrl: './filter-disease.component.html',
  styleUrls: ['./filter-disease.component.scss', '../global-filter.scss']
})
export class FilterDiseaseComponent implements OnInit {

  @Output() onSelectIndication: EventEmitter<any> = new EventEmitter();
  @Input() UpdateFilterDataApply: Subject<any>;
  public alphabeticallyGroupedDieseases = [];
  public selectedIndications = [];
  public diseases: Array<object> = [];
  private params: object = {};
  private result: any = [];
  private result1: any = [];
  private results2: any = [];
  public loading: boolean = false;
  public enableFilter: boolean;
  public filterText: string;
  public seeMoreFilterText: string;
  public filterPlaceholder: string;
  public seeMoreFilterPlaceholder: string;
  public filterInput = new FormControl();
  public seeMoreFilterInput = new FormControl();
  public isAllSelected: boolean = false;
  togglecollapseStatus: boolean = false;
  private seeMorediseaseModal: any;
  mouseOverON: string = undefined;
  otherMouseOverONElem: string = undefined;
  public disableProceed = false;
  diseaseFilter: string = '';
  diseaseFilterText: string = '';
  // taCheck: any;


  constructor(
    private indicationService: IndicationService,
    private globalVariableService: GlobalVariableService,
    private modalService: NgbModal,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    //To filter the disease indication lists
    this.enableFilter = true;
    this.filterText = "";
    this.filterPlaceholder = "Disease Filter..";

    this.getindications();
  }

  ngOnDestroy() {
    this.UpdateFilterDataApply.unsubscribe();
  }

  public getindications() {
    this.loading = true;

    this.params = this.globalVariableService.getFilterParams();
    // this.taCheck = this.params['ta_id']; // if ta_id is checked
    // console.log("checked here TAs: ", this.taCheck);
    this.selectedIndications = [];

    // if (this.taCheck !== undefined) {
    this.indicationService.getIndication()
      .subscribe(
        data => {
          this.result1 = data;
          this.result = this.result1.diseasesRecords;
          console.log("indication: ", this.result);
          //if (type == 1) {
          var result1 = [], result2 = [];
          var checkSelectedIndication = this.globalVariableService.getSelectedIndication();
          console.log("loading the page get Indication: ", checkSelectedIndication);

          for (var i = 0; i < this.result.length; i++) {
            // if (checkSelectedIndication.includes("737")) {
            if (this.result[i].disease_name === "ABDOMINAL PAIN") {
              result1.push(this.result[i]);
            } else {
              result2.push(this.result[i]);
            }
            // } else {
            //   result2.push(this.result[i]);
            // }
          }
          this.results2 = result1.concat(result2);
          this.diseases = this.results2; //set in filter disease indication html view
          console.log("dd Disease for AI: ", this.diseases);

          this.alphabeticallyGroupedDieseases = this.groupBy(this.diseases, 'disease_name');
          // console.log("getEvent:: ", event);

          // if (event !== undefined && event.type == 'load') { // i.e No indication selected previously
          for (let i = 0; i < this.results2.length && i < 1; i++) {
            this.selectedIndications.push(this.results2[i].disease_id);
          }
          console.log("loading the page get Indication22: ", this.selectedIndications);
          this.globalVariableService.setSelectedIndication(this.selectedIndications);
          // } else {
          //   this.selectedIndications = Array.from(this.globalVariableService.getSelectedIndication());
          //   console.log("loading the page get Indication225: ", this.selectedIndications);
          // }
          // this.selectedIndications = Array.from(this.globalVariableService.getSelectedIndication());

        },
        err => {
          this.loading = false;
          console.log(err.message)
        },
        () => {
          this.loading = false;
          console.log("loading finish")
        }
      )
    // } else {
    //   this.diseases = [];
    //   this.loading = false;
    // }
  }

  selectDisease(disease, event, from = null) {
    if (event.target.checked) {
      this.selectedIndications.push(disease.disease_id);
    } else {
      this.selectedIndications.splice(this.selectedIndications.indexOf(disease.disease_id), 1);
    }
    this.globalVariableService.resetfiltersInner();// On click TA other filter's data will update, so've to reset filter selected data   

    // this.globalVariableService.setSelectedSegment(undefined);
    if (from != 'diseaseWarningModal')
      this.proceed();
    this.enableDisableProceedButton();
  }

  collapseMenuItem() {
    this.togglecollapseStatus = !this.togglecollapseStatus;
  }

  selectAll(event, diseaseWarningModal) {
    if (this.isAllSelected) {
      this.result.map(element => {
        console.log("Elementt: ", element);
        this.selectedIndications.push(element.disease_id);
      })
    } else {
      this.selectedIndications = [];
    }
    this.enableDisableProceedButton();
  }

  resetDisease(event) {
    this.selectedIndications = [];
    console.log("selectedIndications_reset: ", this.selectedIndications);
    this.globalVariableService.setSelectedIndication(this.selectedIndications);
    this.selectedIndications = Array.from(this.globalVariableService.getSelectedIndication());
    // this.proceed();
  }

  SeeMore(evt, seeMorediseaseModal) {
    this.seeMorediseaseModal = this.modalService.open(seeMorediseaseModal, { size: 'lg', windowClass: 'diseaseModal-custom-class', keyboard: false, backdrop: 'static' });
  }
  seeMoreClosePopup() {
    this.selectedIndications = Array.from(this.globalVariableService.getSelectedIndication());
    this.isAllSelected = false;
    this.seeMorediseaseModal.close();
  }

  public seeMoreproceed() {
    this.proceed();
    // this.enableDisableProceedButton();
  }

  proceed() {
    this.globalVariableService.setSelectedIndication(this.selectedIndications);
    this.selectedIndications = Array.from(this.globalVariableService.getSelectedIndication());
    console.log("selectedIndications_add: ", this.selectedIndications);
    if (this.seeMorediseaseModal != undefined)
      this.seeMorediseaseModal.close();
    this.onSelectIndication.emit();
  }

  private enableDisableProceedButton() {
    if (this.selectedIndications.length < 1) {
      this.disableProceed = true;
    } else {
      this.disableProceed = false;
    }
  }

  private groupBy(collection, property) {   //collection:Array, property:String
    // prevents the application from breaking if the array of objects doesn't exist yet
    if (!collection) {
      return null;
    }

    const groupedCollection = collection.reduce((previous, current) => {
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

  scrollToView(key) {
    var elmnt = document.getElementById(key);
    if (elmnt !== null)
      elmnt.scrollIntoView();
  }



}
