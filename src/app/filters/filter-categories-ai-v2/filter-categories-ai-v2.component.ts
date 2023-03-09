import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef, Input, Pipe, PipeTransform, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../services/common/category.service';
import { GlobalVariableService } from '../../services/common/global-variable.service';
import { FormControl } from '@angular/forms';

//import 'rxjs/add/operator/debounceTime';
import { catchError, retry } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-filter-categories-ai-v2',
  templateUrl: './filter-categories-ai-v2.component.html',
  styleUrls: ['./filter-categories-ai-v2.component.scss', '../global-filter.scss']
})
export class FilterCategoriesAIV2Component implements OnInit {

  tas: any = [];
  private result: any = [];
  private results2: any = [];
  loading: boolean = false;

  private warningModalRef: any;
  private selectedIndications = [];
  private selectedIndicationsNew = [];
  showDiseaseIndicationList: boolean = false;
  private params: object = {};
  public diseases: Array<object> = [];
  public alphabeticallyGroupedDieseases = [];
  public isAllSelected: boolean = false;
  public disableProceed = false;
  public filterText: string;
  public seeMoreFilterText: string;
  public enableFilter: boolean;
  public seeMoreFilterPlaceholder: string;
  public filterPlaceholder: string;
  public filterInput = new FormControl();
  public seeMoreFilterInput = new FormControl();

  selectedTa = [];
  selectedTasWithName = [];

  private _selectedTa = [];  // For locally holding data, because with getselectedTA(), this variable was getting update due to singleton nature of angular i.e Component variables bind to service variables automatically,
  private _selectedTasWithName = [];// For locally holding data, because with getSelectedDefaultTA(), this variable was getting update due to singleton nature of angular i.e Component variables bind to service variables automatically,

  @Output() onSelectIndication: EventEmitter<any> = new EventEmitter();

  constructor(
    private categoryService: CategoryService,
    private globalVariableService: GlobalVariableService,
    private modalService: NgbModal
  ) {
    this.selectedTa = this.globalVariableService.getSelectedTa();
    console.log("selectedTAs: ", this.selectedTa);
    this.selectedTasWithName = this.globalVariableService.getSelectedDefaultTA();
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

    this.categoryService.getCategories().subscribe(
      data => {
        this.result = data;
        this.tas = this.result.tasRecords;
        console.log("TAS: ", this.tas);
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

  onSelectTa(ta, event, warning = null) {
    this.showDiseaseIndicationList = false;
    if (event.target.checked) {
      this.selectedTa.push(ta.ta_id);
      console.log("t1: ", this.selectedTa);
      this.selectedTasWithName.push(ta);

      //############### Start, For Locally Storing Data to Remove checked on close ###########//
      this._selectedTa.push(ta.ta_id);
      this._selectedTasWithName.push(ta);
      //############### End, For Locally Storing Data to Remove checked on close ###########//

    } else {
      this.selectedTa.splice(this.selectedTa.indexOf(ta.ta_id), 1);
      console.log("t2: ", this.selectedTa);
      var object = this.findObjectByKey(this.selectedTasWithName, 'ta_id', ta.ta_id);
      if (object != null) {
        this.selectedTasWithName.splice(object.index, 1);
      }

      //############### Start, For Locally Storing Data to Remove checked on close ###########//
      this._selectedTa.splice(this._selectedTa.indexOf(ta.ta_id), 1);
      let _object = this.findObjectByKey(this._selectedTasWithName, 'ta_id', ta.ta_id);
      if (_object != null) {
        this._selectedTasWithName.splice(object.index, 1);
      }
      //############### End, For Locally Storing Data to Remove checked on close ###########//
    }
  }

  public proceedWithMultipleTAs() {
    // this.warningModalRef.close();

    this.globalVariableService.setSelectedTa(this.selectedTa);
    //this.globalVaiableService.resetfilters();// On click TA other filter's data will update, so've to reset filter selected data   
    // this.onClickTa.emit();

    this.loading = true;
    this.params = this.globalVariableService.getFilterParams();

  }

  private findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        return { object: array[i], index: i };
      }
    }
    return null;
  }

  closePopup() {
    // console.log("selectedTa", this.selectedTa);
    // console.log("_selectedTa", this._selectedTa);
    this.showDiseaseIndicationList = false;
    if (this.selectedTa.length > 1) {
      this._selectedTa.forEach(element => {
        this.selectedTa.splice(this.selectedTa.indexOf(element), 1);
      });
    }
    if (this.selectedTasWithName.length > 1) {
      this._selectedTasWithName.forEach(element => {
        let _object = this.findObjectByKey(this.selectedTasWithName, 'ta_id', element.ta_id);
        if (_object != null) {
          this.selectedTasWithName.splice(_object.index, 1);
        }
      });
    }
    this.warningModalRef.close();
    this._selectedTa = [];
    this._selectedTasWithName = [];

  }



  scrollToView(key) {
    var elmnt = document.getElementById(key);
    if (elmnt !== null)
      elmnt.scrollIntoView();
  }





}
