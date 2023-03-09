import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef, Input, Pipe, PipeTransform, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { GeneService } from '../../services/common/gene.service';
import { GlobalVariableService } from '../../services/common/global-variable.service';

import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filter-gene',
  templateUrl: './filter-gene.component.html',
  styleUrls: ['./filter-gene.component.scss', '../global-filter.scss']
})
export class FilterGeneComponent implements OnInit {

  @Output() onSelectGene: EventEmitter<any> = new EventEmitter();
  @Input() UpdateFilterDataApply?: Subject<any>;
  // public alphabeticallyGroupedGenes = [];
  public alphabeticallyGroupedGenes: any = '';
  public selectedGenes: Array<object> = [];
  public genes: Array<object> = [];
  private params: object = {};
  private result: any = [];
  private results2: any = [];
  public loading: boolean = false;
  public enableFilter: boolean = false;;
  public filterText: string = '';
  public seeMoreFilterText: string = '';
  public filterPlaceholder: string = '';
  public seeMoreFilterPlaceholder: string = '';
  public filterInput = new FormControl();
  public seeMoreFilterInput = new FormControl();
  public isAllSelected: boolean = false;
  togglecollapseStatus: boolean = false;
  private seeMoreGeneModal: any;
  mouseOverON: any = undefined;
  otherMouseOverONElem: any = undefined;
  public disableProceed = false;
  geneFilter: string = '';
  geneFilterText: string = '';
  //diseaseCheck: any;
  //diseaseCheckCT: any;
  hideCardBody: boolean = true;

  constructor(
    private geneService: GeneService,
    private globalVariableService: GlobalVariableService,
    private modalService: NgbModal,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    //To filter the gene lists
    this.enableFilter = true;
    this.filterText = "";
    this.filterPlaceholder = "Gene Filter..";

    //To filter the "SEE MORE" gene lists
    this.seeMoreFilterText = "";
    this.seeMoreFilterPlaceholder = "Search Gene";
    //End here

    // this.UpdateFilterDataApply.subscribe(event => {  // Calling from details, details working as mediator
    //   console.log("eventGenes:: ", event);
    //   if (event == undefined) {
    //     this.hideCardBody = true;
    //     // this.selectedGenes = []; // Reinitialized, because when data updated on click TA, it should empty locally
    //     // this.getGenes(event, 2);
    //   } else if (event !== undefined && event.clickOn != 'geneFilter' && event.clickOn != 'geneFilter')
    //     this.hideCardBody = true;
    //   // this.getGenes(event, 2);
    // });
    // this.getGenes(event, 1);
    this.hideCardBody = true;
  }

  ngOnDestroy() {
    this.UpdateFilterDataApply?.unsubscribe();
  }

  public getGenes(event: any, type: any) {
    this.loading = true;
    this.params = this.globalVariableService.getFilterParams();
    // this.diseaseCheck = this.params['di_ids']; // if disease_id is checked
    // this.diseaseCheckCT = this.params['ct_di_ids']; // if disease_id is checked
    // console.log("checked here Gene: ", this.diseaseCheck);

    this.selectedGenes = [];

    //if (this.diseaseCheck !== undefined || this.diseaseCheckCT !== undefined) {
    this.geneService.getGene()
      .subscribe(
        data => {
          this.result = data;
          // console.log("result: ", this.result);
          this.genes = this.result.genesRecords;
          console.log("genes: ", this.genes);

          this.alphabeticallyGroupedGenes = this.groupBy(this.genes, 'gene_name');
          // console.log("alphabeticallyGroupedGenes: ", this.alphabeticallyGroupedGenes);

          //if (event !== undefined && event.type == 'load') { // i.e No Genes selected previously
          for (let i = 0; i < this.result.genesRecords.length && i < 1; i++) {
            this.selectedGenes.push(this.result.genesRecords[i].gene_id);
            //this.selectedGenes = [];
          }
          console.log("selected Gene: ", this.selectedGenes);
          this.globalVariableService.setSelectedGenes(this.selectedGenes);
          //} else {
          //this.selectedGenes = Array.from(this.globalVariableService.getSelectedGenes());
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
    //   this.genes = [];
    //   this.loading = false;
    // }
  }

  selectGene(gene: any, event: any, from: any = null) {
    if (event.target.checked) {
      this.selectedGenes.push(gene.gene_id);
    } else {
      this.selectedGenes.splice(this.selectedGenes.indexOf(gene.gene_id), 1);
    }

    console.log("gene: ", this.selectedGenes);
    // this.globalVariableService.resetfiltersInner();// On click TA other filter's data will update, so've to reset filter selected data   

    if (from != 'geneWarningModal')
      this.proceed();
    this.enableDisableProceedButton();
  }

  collapseMenuItem() {
    this.togglecollapseStatus = !this.togglecollapseStatus;
  }

  selectAll(event: any, geneWarningModal: any) {
    if (this.isAllSelected) {
      // this.result.map(element => {
      //   // console.log("element: ", element);
      //   this.selectedGenes.push(element.gene_id);
      // })
    } else {
      this.selectedGenes = [];
    }
    this.enableDisableProceedButton();
  }

  resetGene() {
    this.selectedGenes = [];
    this.globalVariableService.setSelectedGenes(this.selectedGenes);
    this.selectedGenes = Array.from(this.globalVariableService.getSelectedGenes());
    // this.proceed();
  }

  reloadGene() {
    // this.globalVariableService.resetChartFilter();
    this.hideCardBody = !this.hideCardBody;
    this.params = this.globalVariableService.getFilterParams();
    if (!this.hideCardBody)
      this.getGenes(event, 1);
  }

  SeeMore(evt: any, seeMoreGeneModal: any) {
    this.seeMoreGeneModal = this.modalService.open(seeMoreGeneModal, { size: 'lg', windowClass: 'diseaseModal-custom-class', keyboard: false, backdrop: 'static' });
  }
  seeMoreClosePopup() {
    this.selectedGenes = Array.from(this.globalVariableService.getSelectedGenes());
    this.isAllSelected = false;
    this.seeMoreGeneModal.close();
  }

  closePopup() {
    this.selectedGenes = Array.from(this.globalVariableService.getSelectedGenes());
    this.isAllSelected = false;
    this.seeMoreGeneModal.close();
  }

  public seeMoreproceed() {
    this.proceed();
    // this.enableDisableProceedButton();
  }

  proceed() {
    this.globalVariableService.setSelectedGenes(this.selectedGenes);
    this.selectedGenes = Array.from(this.globalVariableService.getSelectedGenes());
    if (this.seeMoreGeneModal != undefined)
      this.seeMoreGeneModal.close();
    this.onSelectGene.emit();
  }

  private enableDisableProceedButton() {
    if (this.selectedGenes.length < 1) {
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
