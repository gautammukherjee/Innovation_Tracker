import { Component, Injectable, OnInit } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalVariableService {

  constructor() { }
  errors = {
    dbTableColumnError: 'DataBase Table Structure Got Changed...Will Update Soon. ',
    dbConnectionTerminated: 'DataBaseConnection Terminated Unexpectedly'
  };

  // selectedTa = this.configureTAID();
  selectedTa = [];
  selectedNewsType = [];
  // defaultTAID: any;
  selectedDefaultTasWithName: any = [];

  filterParams = {};
  selectedIndication = [];
  selectedCompany = [];
  selectedDevelopment = [];
  selectedDrug = [];
  selectedGene = [];
  selectedMoa = [];

  selectedChooseDate = [];

  public initFromDate = { month: ((new Date()).getMonth() + 1), day: ((new Date()).getDate()), year: ((new Date()).getFullYear() - 1) };
  public initToDate = { month: ((new Date()).getMonth() + 1), day: ((new Date()).getDate()), year: ((new Date()).getFullYear()) };
  // public initFromDate = (((new Date()).getFullYear() - 5) + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate());
  // public initToDate = ((new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate());

  fromDate = this.initFromDate;
  toDate = this.initToDate;

  // configureTAID() {
  //   this.defaultTAID = parseInt(localStorage.getItem('selectedDefaultTA') || '{}');
  //   return [this.defaultTAID];
  // }

  setFromDate(from_date: any) {
    this.fromDate = from_date;
  }
  getFromDate() {
    // return this.fromDate;
    return this.fromDate.month + '-' + this.fromDate.day + '-' + this.fromDate.year;
  }
  setToDate(to_date: any) {
    this.toDate = to_date;
  }
  getToDate() {
    // return this.toDate;
    return this.toDate.month + '-' + this.toDate.day + '-' + this.toDate.year;
  }
  setSelectedTa(ta: any) { // array of Selected TAs
    this.selectedTa = ta;
  }
  getSelectedTa() {
    return this.selectedTa;
  }
  setSelectedNewsType(newsType: any) { // array of Selected TAs
    this.selectedNewsType = newsType;
  }
  getSelectedNewsType() {
    return this.selectedNewsType;
  }

  // setSelectedDefaultTA(ta: any) { //First Choice i.e Single TA
  //   this.selectedDefaultTasWithName[0] = ta;
  //   localStorage.setItem('selectedDefaultTA', ta.ta_id);
  // }
  // getSelectedDefaultTA() {
  //   return this.selectedDefaultTasWithName;
  // }

  setSelectedIndication(indication: any) {
    // console.log("indications: ", indication);
    this.selectedIndication = indication;
  }
  getSelectedIndication() {
    return this.selectedIndication;
  }
  setSelectedCompanies(company: any) {
    this.selectedCompany = company;
  }
  getSelectedCompanies() {
    return this.selectedCompany;
  }
  setSelectedDevelopments(development_phase: any) {
    this.selectedDevelopment = development_phase;
  }
  getSelectedDevelopments() {
    return this.selectedDevelopment;
  }
  setSelectedDrugs(drug: any) {
    this.selectedDrug = drug;
  }
  getSelectedDrugs() {
    return this.selectedDrug;
  }
  setSelectedGenes(gene: any) {
    this.selectedGene = gene;
  }
  getSelectedGenes() {
    return this.selectedGene;
  }
  setSelectedMoas(moa: any) {
    this.selectedMoa = moa;
  }
  getSelectedMoas() {
    return this.selectedMoa;
  }

  getFilterParams(mergeParam = {}) {  // Use of parameter is for if someone wants to pass filter params custom,
    this.filterParams = {
      from_date: this.getFromDate(),
      to_date: this.getToDate(),
      ta_id: this.getSelectedTa().length > 0 ? this.getSelectedTa() : undefined,
      news_type_id: this.getSelectedNewsType().length > 0 ? this.getSelectedNewsType() : undefined,
      di_ids: this.getSelectedIndication().length > 0 ? this.getSelectedIndication() : undefined,
      comp_id: this.getSelectedCompanies().length > 0 ? this.getSelectedCompanies() : undefined,
      dev_phase_id: this.getSelectedDevelopments().length > 0 ? this.getSelectedDevelopments() : undefined,
      drug_id: this.getSelectedDrugs().length > 0 ? this.getSelectedDrugs() : undefined,
      gene_id: this.getSelectedGenes().length > 0 ? this.getSelectedGenes() : undefined,
      moa_id: this.getSelectedMoas().length > 0 ? this.getSelectedMoas() : undefined,
    };
    return Object.assign(mergeParam, this.filterParams);
  }

  resetfilters() {
    this.setSelectedIndication([]);
  }

  resetfiltersInner() {
  }

  resetfiltersTA() {
    this.setSelectedTa([]);
    this.setSelectedIndication([]);
    // this.setSelectedTextSearch(undefined);
  }

}
