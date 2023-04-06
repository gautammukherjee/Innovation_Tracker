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
  @Input() UpdateFilterDataApply?: Subject<any>;
  //public alphabeticallyGroupedDieseases: Array<object> = [];
  public alphabeticallyGroupedDieseases: any = '';
  public selectedIndications: Array<object> = [];
  public diseases: Array<object> = [];
  public diseases_syns: Array<any> = [];
  private params: object = {};
  private result: any = [];
  private results1: any = [];
  private results2: any = [];
  public loading: boolean = false;
  public loadingSyns: boolean = false;
  public enableFilter: boolean = false;
  public filterText: string = '';
  public seeMoreFilterText: string = '';
  public filterPlaceholder: string = '';
  public seeMoreFilterPlaceholder: string = '';
  public filterInput = new FormControl();
  public seeMoreFilterInput = new FormControl();
  public isAllSelected: boolean = false;
  togglecollapseStatus: boolean = false;
  private seeMorediseaseModal: any;
  private seeSynsDiseaseModal: any;
  mouseOverON: any = undefined;
  otherMouseOverONElem: any = undefined;
  public disableProceed = true;
  diseaseFilter: string = '';
  diseaseFilterText: string = '';
  showDiseaseBody: boolean = false;
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

    this.selectedIndications = Array.from(this.globalVariableService.getSelectedIndication());
    console.log("getSelectedInd: ", this.selectedIndications);
    this.getindications();
  }

  ngOnDestroy() {
    this.UpdateFilterDataApply?.unsubscribe();
  }

  public getindications() {
    this.loading = true;

    this.params = this.globalVariableService.getFilterParams();
    // this.taCheck = this.params['ta_id']; // if ta_id is checked
    // console.log("checked here TAs: ", this.taCheck);
    // this.selectedIndications = [];

    // if (this.taCheck !== undefined) {
    this.indicationService.getIndication()
      .subscribe(
        data => {
          this.result = data;
          // this.result = this.results1.diseasesRecords;
          this.diseases = this.result.diseasesRecords;

          console.log("indication: ", this.diseases);
          //if (type == 1) {
          // var result1 = [], result2 = [];
          // var checkSelectedIndication = this.globalVariableService.getSelectedIndication();
          // console.log("loading the page get Indication: ", checkSelectedIndication);

          // for (var i = 0; i < this.result.length; i++) {
          //   // if (checkSelectedIndication.includes("737")) {
          //   if (this.result[i].disease_name === "ABDOMINAL PAIN") {
          //     result1.push(this.result[i]);
          //   } else {
          //     result2.push(this.result[i]);
          //   }
          //   // } else {
          //   //   result2.push(this.result[i]);
          //   // }
          // }
          // this.results2 = result1.concat(result2);
          // this.diseases = this.results2; //set in filter disease indication html view
          // console.log("dd Disease for AI: ", this.diseases);

          this.alphabeticallyGroupedDieseases = this.groupBy(this.diseases, 'disease_name');
          // console.log("getEvent:: ", event);

          // if (event !== undefined && event.type == 'load') { // i.e No indication selected previously
          // for (let i = 0; i < this.result.diseasesRecords.length && i < 1; i++) {
          //   this.selectedIndications.push(this.result.diseasesRecords[i].disease_id);
          // }
          // console.log("loading the page get Indication22: ", this.selectedIndications);
          // this.globalVariableService.setSelectedIndication(this.selectedIndications);
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

  selectDisease(disease: any, event: any, from: any = null) {
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

  selectAll(event: any, diseaseWarningModal: any) {
    if (this.isAllSelected) {
      this.diseases.map((element: any) => {
        console.log("Elementt: ", element);
        this.selectedIndications.push(element.disease_id);
      })
    } else {
      this.selectedIndications = [];
    }
    this.enableDisableProceedButton();
  }

  onDiseaseHeaderClick() {
    this.showDiseaseBody = !this.showDiseaseBody;
  }

  resetDisease(event: any) {
    this.selectedIndications = [];
    console.log("selectedIndications_reset: ", this.selectedIndications);
    this.globalVariableService.setSelectedIndication(this.selectedIndications);
    this.selectedIndications = Array.from(this.globalVariableService.getSelectedIndication());
    // this.proceed();
  }

  SeeMore(evt: any, seeMorediseaseModal: any) {
    this.seeMorediseaseModal = this.modalService.open(seeMorediseaseModal, { size: 'lg', windowClass: 'diseaseModal-custom-class', keyboard: false, backdrop: 'static' });
  }

  SeeSyns(evt: any, seeSynsDiseaseModal: any) {
    this.loadingSyns = true;
    this.seeSynsDiseaseModal = this.modalService.open(seeSynsDiseaseModal, { size: 'lg', windowClass: 'diseaseModal-custom-class', keyboard: false, backdrop: 'static' });
    this.indicationService.getIndicationSynonym()
      .subscribe(
        data => {
          this.result = data;
          // this.result = this.results1.diseasesRecords;
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

  seeMoreClosePopup() {
    this.selectedIndications = Array.from(this.globalVariableService.getSelectedIndication());
    this.isAllSelected = false;
    this.seeMorediseaseModal.close();
  }

  seeSynonymClosePopup() {
    this.seeSynsDiseaseModal.close();
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
