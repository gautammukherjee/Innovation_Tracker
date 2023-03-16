import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef, Input, Pipe, PipeTransform, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { MoaService } from '../../services/common/moa.service';
import { GlobalVariableService } from '../../services/common/global-variable.service';

import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filter-moa',
  templateUrl: './filter-moa.component.html',
  styleUrls: ['./filter-moa.component.scss', '../global-filter.scss']
})
export class FilterMoaComponent implements OnInit {

  @Output() onSelectMoa: EventEmitter<any> = new EventEmitter();
  @Input() UpdateFilterDataApply?: Subject<any>;
  // public alphabeticallyGroupedMoas = [];
  public alphabeticallyGroupedMoas: any = ''
  public selectedMoas: Array<object> = [];
  public moas: Array<object> = [];
  private params: object = {};
  private result: any = [];
  private results2: any = [];
  public loading: boolean = false;
  public enableFilter: boolean = true;
  public filterText: string = '';
  public seeMoreFilterText: string = '';
  public filterPlaceholder: string = '';
  public seeMoreFilterPlaceholder: string = '';
  public filterInput = new FormControl();
  public seeMoreFilterInput = new FormControl();
  public isAllSelected: boolean = false;
  togglecollapseStatus: boolean = false;
  private seeMoreMoaModal: any;
  mouseOverON: any = undefined;
  otherMouseOverONElem: any = undefined;
  public disableProceed = true;
  moaFilter: string = '';
  moaFilterText: string = '';
  //diseaseCheck: any;
  //diseaseCheckCT: any;
  hideCardBody: boolean = true;

  constructor(
    private moaService: MoaService,
    private globalVariableService: GlobalVariableService,
    private modalService: NgbModal,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    //To filter the moa lists
    this.enableFilter = true;
    this.filterText = "";
    this.filterPlaceholder = "Moa Filter..";

    //To filter the "SEE MORE" moa lists
    this.seeMoreFilterText = "";
    this.seeMoreFilterPlaceholder = "Search Moa";
    //End here

    // this.UpdateFilterDataApply.subscribe(event => {  // Calling from details, details working as mediator
    //   console.log("eventMoas:: ", event);
    //   if (event == undefined) {
    //     this.hideCardBody = true;
    //     // this.selectedMoas = []; // Reinitialized, because when data updated on click TA, it should empty locally
    //     // this.getMoas(event, 2);
    //   } else if (event !== undefined && event.clickOn != 'moaFilter' && event.clickOn != 'moaFilter')
    //     this.hideCardBody = true;
    //   // this.getMoas(event, 2);
    // });
    // this.getMoas(event, 1);
    this.hideCardBody = true;
  }

  ngOnDestroy() {
    this.UpdateFilterDataApply?.unsubscribe();
  }

  public getMoas(event: any, type: any) {
    this.loading = true;
    this.params = this.globalVariableService.getFilterParams();
    // this.diseaseCheck = this.params['di_ids']; // if disease_id is checked
    // this.diseaseCheckCT = this.params['ct_di_ids']; // if disease_id is checked
    // console.log("checked here Moa: ", this.diseaseCheck);

    this.selectedMoas = [];

    //if (this.diseaseCheck !== undefined || this.diseaseCheckCT !== undefined) {
    this.moaService.getMoa()
      .subscribe(
        data => {
          this.result = data;
          // console.log("result: ", this.result);
          this.moas = this.result.moasRecords;
          console.log("moas: ", this.moas);

          this.alphabeticallyGroupedMoas = this.groupBy(this.moas, 'moa_name');
          // console.log("alphabeticallyGroupedMoas: ", this.alphabeticallyGroupedMoas);

          //if (event !== undefined && event.type == 'load') { // i.e No Moas selected previously
          // for (let i = 0; i < this.result.moasRecords.length && i < 1; i++) {
          //   this.selectedMoas.push(this.result.moasRecords[i].moa_id);
          //   //this.selectedMoas = [];
          // }
          // console.log("selected Moa: ", this.selectedMoas);
          // this.globalVariableService.setSelectedMoas(this.selectedMoas);
          //} else {
          //this.selectedMoas = Array.from(this.globalVariableService.getSelectedMoas());
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
    //   this.moas = [];
    //   this.loading = false;
    // }
  }

  selectMoa(moa: any, event: any, from: any = null) {
    if (event.target.checked) {
      this.selectedMoas.push(moa.moa_id);
    } else {
      this.selectedMoas.splice(this.selectedMoas.indexOf(moa.moa_id), 1);
    }

    console.log("moa: ", this.selectedMoas);
    // this.globalVariableService.resetfiltersInner();// On click TA other filter's data will update, so've to reset filter selected data   

    if (from != 'moaWarningModal')
      this.proceed();
    this.enableDisableProceedButton();
  }

  collapseMenuItem() {
    this.togglecollapseStatus = !this.togglecollapseStatus;
  }

  selectAll(event: any, moaWarningModal: any) {
    if (this.isAllSelected) {
      this.result.map((element: any) => {
        // console.log("element: ", element);
        this.selectedMoas.push(element.moa_id);
      })
    } else {
      this.selectedMoas = [];
    }
    this.enableDisableProceedButton();
  }

  resetMoa() {
    this.selectedMoas = [];
    this.globalVariableService.setSelectedMoas(this.selectedMoas);
    this.selectedMoas = Array.from(this.globalVariableService.getSelectedMoas());
    // this.proceed();
  }

  reloadMoa() {
    // this.globalVariableService.resetChartFilter();
    this.hideCardBody = !this.hideCardBody;
    this.params = this.globalVariableService.getFilterParams();
    if (!this.hideCardBody)
      this.getMoas(event, 1);
  }

  SeeMore(evt: any, seeMoreMoaModal: any) {
    this.seeMoreMoaModal = this.modalService.open(seeMoreMoaModal, { size: 'lg', windowClass: 'diseaseModal-custom-class', keyboard: false, backdrop: 'static' });
  }
  seeMoreClosePopup() {
    this.selectedMoas = Array.from(this.globalVariableService.getSelectedMoas());
    this.isAllSelected = false;
    this.seeMoreMoaModal.close();
  }

  closePopup() {
    this.selectedMoas = Array.from(this.globalVariableService.getSelectedMoas());
    this.isAllSelected = false;
    this.seeMoreMoaModal.close();
  }

  public seeMoreproceed() {
    this.proceed();
    // this.enableDisableProceedButton();
  }

  proceed() {
    this.globalVariableService.setSelectedMoas(this.selectedMoas);
    this.selectedMoas = Array.from(this.globalVariableService.getSelectedMoas());
    if (this.seeMoreMoaModal != undefined)
      this.seeMoreMoaModal.close();
    this.onSelectMoa.emit();
  }

  private enableDisableProceedButton() {
    if (this.selectedMoas.length < 1) {
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
