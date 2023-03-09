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
  selectedTaDashboard = [];
  selectedSingleTa = [];
  // selectedSingleTa = this.configureTAID();
  defaultTAID: any;
  selectedDefaultTasWithName: any = [];
  filterParams = {};
  selectedIndication = [];
  selectedIndicationDashboard = [];
  selectedIndicationCT = [];
  selectedProduct = [];
  selectedApplicantName = [];
  selectedCompany = [];
  selectedDrug = [];
  selectedGene = [];
  selectedMoa = [];
  selectedRegulatory = [];
  selectedCommercial = [];
  selectedModel = [];
  selectedChooseDate = [];
  selectedQtyChoosed = [];
  selectedTextSearch;
  selectedMinTR;
  selectedMaxTR;
  selectedMinIR;
  selectedMaxIR;

  selectedGCR = [];
  selectedMinRankRange;
  selectedMaxRankRange;

  selectedInterventions = [];
  selectedStudyTypes = [];
  selectedPhaseStudy = [];
  selectedStatus = [];
  selectedCollaboratorType = [];
  selectedCollaborator = [];
  selectedDigital = [];
  selectedMinDTC;
  selectedMaxDTC;
  selectedAPICategory = [];
  selectedMaStatus = [];
  selectedAPIs = [];
  selectedScoreRange = [];
  selectedMAScoreRange = [];
  selectedTimePeriod = [];
  selectedPartneringCategory = [];
  selectedRegulatoryCategory = [];
  selectedDiseaseStatus = [];
  selectedTechKeywords = [];

  // For All the Level of MESH
  selectedMeshOneCategory = [];
  selectedMeshTwoCategory = [];
  selectedMeshThreeCategory = [];
  selectedMeshFourCategory = [];
  selectedMeshFiveCategory = [];
  selectedMeshSixCategory = [];
  selectedMeshSevenCategory = [];
  selectedMeshEightCategory = [];
  selectedMeshNineCategory = [];
  selectedMeshTenCategory = [];
  selectedMeshElevenCategory = [];
  selectedMeshTwelveCategory = [];
  selectedMeshThirteenCategory = [];
  selectedMeshFourteenCategory = [];

  selectedSubHeadings = [];

  selectedModule;
  selectedPageType;

  public initFromDate = { month: ((new Date()).getMonth() + 1), day: ((new Date()).getDate()), year: ((new Date()).getFullYear() - 1) };
  public initToDate = { month: ((new Date()).getMonth() + 1), day: ((new Date()).getDate()), year: ((new Date()).getFullYear()) };

  // public initFromDate = (((new Date()).getFullYear() - 5) + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate());
  // public initToDate = ((new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate());

  fromDate = this.initFromDate;
  toDate = this.initToDate;

  configureTAID() {
    this.defaultTAID = parseInt(localStorage.getItem('selectedDefaultTA'));
    return [this.defaultTAID];
  }

  setFromDate(from_date) {
    this.fromDate = from_date;
  }
  getFromDate() {
    // return this.fromDate;
    return this.fromDate.month + '-' + this.fromDate.day + '-' + this.fromDate.year;
  }
  setToDate(to_date) {
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

  setSelectedTaForDashboard(ta: any) { // array of Selected TAs
    this.selectedTaDashboard = ta;
  }
  getSelectedTaForDashboard() {
    return this.selectedTaDashboard;
  }

  setSelectedSingleTa(ta: any) { // array of Selected TAs
    this.selectedSingleTa = ta;
  }
  getSelectedSingleTa() {
    return this.selectedSingleTa;
  }

  setSelectedDefaultTA(ta: any) { //First Choice i.e Single TA
    this.selectedDefaultTasWithName[0] = ta;
    localStorage.setItem('selectedDefaultTA', ta.ta_id);
  }
  getSelectedDefaultTA() {
    return this.selectedDefaultTasWithName;
  }
  setSelectedIndication(indication) {
    // console.log("indications: ", indication);
    this.selectedIndication = indication;
  }
  getSelectedIndication() {
    return this.selectedIndication;
  }
  setSelectedIndicationForDashboard(indication) {
    // console.log("indications: ", indication);
    this.selectedIndicationDashboard = indication;
  }
  getSelectedIndicationForDashboard() {
    return this.selectedIndicationDashboard;
  }
  setSelectedIndicationCT(indication) {
    // console.log("indications: ", indication);
    this.selectedIndicationCT = indication;
  }
  getSelectedIndicationCT() {
    return this.selectedIndicationCT;
  }
  setSelectedProducts(product) {
    this.selectedProduct = product;
  }
  getSelectedProducts() {
    return this.selectedProduct;
  }
  setSelectedApplicantNames(applicantName) {
    this.selectedApplicantName = applicantName;
  }
  getSelectedApplicantNames() {
    return this.selectedApplicantName;
  }
  setSelectedCompanies(company) {
    this.selectedCompany = company;
  }
  getSelectedCompanies() {
    return this.selectedCompany;
  }

  setSelectedDrugs(drug) {
    this.selectedDrug = drug;
  }
  getSelectedDrugs() {
    return this.selectedDrug;
  }
  setSelectedGenes(gene) {
    this.selectedGene = gene;
  }
  getSelectedGenes() {
    return this.selectedGene;
  }
  setSelectedMoas(moa) {
    this.selectedMoa = moa;
  }
  getSelectedMoas() {
    return this.selectedMoa;
  }


  setSelectedRegulatories(regulatory) {
    this.selectedRegulatory = regulatory;
  }
  getSelectedRegulatories() {
    return this.selectedRegulatory;
  }
  setSelectedCommercials(commercial) {
    this.selectedCommercial = commercial;
  }
  getSelectedCommercials() {
    return this.selectedCommercial;
  }
  setSelectedModels(model) {
    this.selectedModel = model;
  }
  getSelectedModels() {
    return this.selectedModel;
  }
  setSelectedIntensityDate(chooseDate) {
    this.selectedChooseDate = chooseDate;
  }
  getSelectedIntensityDate() {
    return this.selectedChooseDate;
  }
  setSelectedTextSearch(txt) {
    this.selectedTextSearch = txt;
  }
  getSelectedTextSearch() {
    return this.selectedTextSearch;
  }
  setSelectedQtyTopProducts(qtyChoosed) {
    this.selectedQtyChoosed = qtyChoosed;
  }
  getSelectedQtyTopProducts() {
    return this.selectedQtyChoosed;
  }
  setSelectedMinTagRadius(minTR) {
    this.selectedMinTR = minTR;
  }
  getSelectedMinTagRadius() {
    return this.selectedMinTR;
  }
  setSelectedMaxTagRadius(maxTR) {
    this.selectedMaxTR = maxTR;
  }
  getSelectedMaxTagRadius() {
    return this.selectedMaxTR;
  }
  setSelectedMinIntensityRange(minIR) {
    this.selectedMinIR = minIR;
  }
  getSelectedMinIntensityRange() {
    return this.selectedMinIR;
  }
  setSelectedMaxIntensityRange(maxIR) {
    this.selectedMaxIR = maxIR;
  }
  getSelectedMaxIntensityRange() {
    return this.selectedMaxIR;
  }

  setSelectedGroupCountRange(GCR) {
    this.selectedGCR = GCR;
  }
  getSelectedGroupCountRange() {
    return this.selectedGCR;
  }
  setSelectedMinRankRange(minRankRange) {
    this.selectedMinRankRange = minRankRange;
  }
  getSelectedMinRankRange() {
    return this.selectedMinRankRange;
  }
  setSelectedMaxRankRange(MaxRankRange) {
    this.selectedMaxRankRange = MaxRankRange;
  }
  getSelectedMaxRankRange() {
    return this.selectedMaxRankRange;
  }

  // for Clinical Trials
  setSelectedInterventions(interventions) {
    this.selectedInterventions = interventions;
  }
  getSelectedInterventions() {
    return this.selectedInterventions;
  }
  setSelectedStudyTypes(studyTypes) {
    this.selectedStudyTypes = studyTypes;
  }
  getSelectedStudyTypes() {
    return this.selectedStudyTypes;
  }
  setSelectedPhaseStudy(phaseStudy) {
    this.selectedPhaseStudy = phaseStudy;
  }
  getSelectedPhaseStudy() {
    return this.selectedPhaseStudy;
  }
  setSelectedStatus(status) {
    this.selectedStatus = status;
  }
  getSelectedStatus() {
    return this.selectedStatus;
  }
  setSelectedCollaboratorsType(collaboratorType) {
    this.selectedCollaboratorType = collaboratorType;
  }
  getSelectedCollaboratorsType() {
    return this.selectedCollaboratorType;
  }
  setSelectedCollaborators(collaborator) {
    this.selectedCollaborator = collaborator;
  }
  getSelectedCollaborators() {
    return this.selectedCollaborator;
  }

  //For Patent module
  setSelectedDigitals(digital) {
    this.selectedDigital = digital;
  }
  getSelectedDigitals() {
    return this.selectedDigital;
  }
  setSelectedMinDigitalTermCount(minDTC) {
    this.selectedMinDTC = minDTC;
  }
  getSelectedMinDigitalTermCount() {
    return this.selectedMinDTC;
  }
  setSelectedMaxDigitalTermCount(maxDTC) {
    this.selectedMaxDTC = maxDTC;
  }
  getSelectedMaxDigitalTermCount() {
    return this.selectedMaxDTC;
  }

  //For modules type like digital-health, active ingredient
  setSelectedModules(module) {
    this.selectedModule = module;
  }
  getSelectedModules() {
    return this.selectedModule;
  }

  //For modules inner page types
  setSelectedPageType(pageType) {
    this.selectedPageType = pageType;
  }
  getSelectedPageType() {
    return this.selectedPageType;
  }

  //For active ingredient module
  setSelectedAPICategory(apiCategory) {
    this.selectedAPICategory = apiCategory;
  }
  getSelectedAPICategory() {
    return this.selectedAPICategory;
  }

  //For MA Status
  setSelectedMaStatus(maStatus) {
    this.selectedMaStatus = maStatus;
  }
  getSelectedMaStatus() {
    return this.selectedMaStatus;
  }

  setSelectedAPIs(apis) {
    this.selectedAPIs = apis;
  }
  getSelectedAPIs() {
    return this.selectedAPIs;
  }

  setSelectedScoreRange(score_range) {
    this.selectedScoreRange = score_range;
  }
  getSelectedScoreRange() {
    return this.selectedScoreRange;
  }
  setSelectedMAScoreRange(ma_score_range) {
    this.selectedMAScoreRange = ma_score_range;
  }
  getSelectedMAScoreRange() {
    return this.selectedMAScoreRange;
  }
  setSelectedTimePeriod(time_period) {
    this.selectedTimePeriod = time_period;
  }
  getSelectedTimePeriod() {
    return this.selectedTimePeriod;
  }
  setSelectedPartneringCategory(partneringCategory) {
    this.selectedPartneringCategory = partneringCategory;
  }
  getSelectedPartneringCategory() {
    return this.selectedPartneringCategory;
  }
  setSelectedRegulatoryCategory(regulatoryCategory) {
    this.selectedRegulatoryCategory = regulatoryCategory;
  }
  getSelectedRegulatoryCategory() {
    return this.selectedRegulatoryCategory;
  }
  setSelectedDiseaseStatus(diseaseStatus) {
    this.selectedDiseaseStatus = diseaseStatus;
  }
  getSelectedDiseaseStatus() {
    return this.selectedDiseaseStatus;
  }

  setSelectedTechKeywords(techKeywords) {
    this.selectedTechKeywords = techKeywords;
  }
  getSelectedTechKeywords() {
    return this.selectedTechKeywords;
  }

  // Start For active ingredient MESH module

  //For Mesh level One
  setSelectedMeshOneCategory(meshOneCategory) {
    this.selectedMeshOneCategory = meshOneCategory;
  }
  getSelectedMeshOneCategory() {
    return this.selectedMeshOneCategory;
  }

  //For Mesh level Two
  setSelectedMeshTwoCategory(meshTwoCategory) {
    this.selectedMeshTwoCategory = meshTwoCategory;
  }
  getSelectedMeshTwoCategory() {
    return this.selectedMeshTwoCategory;
  }

  //For Mesh level Three
  setSelectedMeshThreeCategory(meshThreeCategory) {
    this.selectedMeshThreeCategory = meshThreeCategory;
  }
  getSelectedMeshThreeCategory() {
    return this.selectedMeshThreeCategory;
  }

  //For Mesh level Four
  setSelectedMeshFourCategory(meshFourCategory) {
    this.selectedMeshFourCategory = meshFourCategory;
  }
  getSelectedMeshFourCategory() {
    return this.selectedMeshFourCategory;
  }

  //For Mesh level Five
  setSelectedMeshFiveCategory(meshFiveCategory) {
    this.selectedMeshFiveCategory = meshFiveCategory;
  }
  getSelectedMeshFiveCategory() {
    return this.selectedMeshFiveCategory;
  }

  //For Mesh level Six
  setSelectedMeshSixCategory(meshSixCategory) {
    this.selectedMeshSixCategory = meshSixCategory;
  }
  getSelectedMeshSixCategory() {
    return this.selectedMeshSixCategory;
  }

  //For Mesh level Seven
  setSelectedMeshSevenCategory(meshSevenCategory) {
    this.selectedMeshSevenCategory = meshSevenCategory;
  }
  getSelectedMeshSevenCategory() {
    return this.selectedMeshSevenCategory;
  }

  //For Mesh level Eight
  setSelectedMeshEightCategory(meshEightCategory) {
    this.selectedMeshEightCategory = meshEightCategory;
  }
  getSelectedMeshEightCategory() {
    return this.selectedMeshEightCategory;
  }

  //For Mesh level Nine
  setSelectedMeshNineCategory(meshNineCategory) {
    this.selectedMeshNineCategory = meshNineCategory;
  }
  getSelectedMeshNineCategory() {
    return this.selectedMeshNineCategory;
  }

  //For Mesh level Ten
  setSelectedMeshTenCategory(meshTenCategory) {
    this.selectedMeshTenCategory = meshTenCategory;
  }
  getSelectedMeshTenCategory() {
    return this.selectedMeshTenCategory;
  }

  //For Mesh level Eleven
  setSelectedMeshElevenCategory(meshElevenCategory) {
    this.selectedMeshElevenCategory = meshElevenCategory;
  }
  getSelectedMeshElevenCategory() {
    return this.selectedMeshElevenCategory;
  }

  //For Mesh level Twelve
  setSelectedMeshTwelveCategory(meshTwelveCategory) {
    this.selectedMeshTwelveCategory = meshTwelveCategory;
  }
  getSelectedMeshTwelveCategory() {
    return this.selectedMeshTwelveCategory;
  }

  //For Mesh level Thirteen
  setSelectedMeshThirteenCategory(meshThirteenCategory) {
    this.selectedMeshThirteenCategory = meshThirteenCategory;
  }
  getSelectedMeshThirteenCategory() {
    return this.selectedMeshThirteenCategory;
  }

  //For Mesh level Fourteen
  setSelectedMeshFourteenCategory(meshFourteenCategory) {
    this.selectedMeshFourteenCategory = meshFourteenCategory;
  }
  getSelectedMeshFourteenCategory() {
    return this.selectedMeshFourteenCategory;
  }

  //For active ingredient module
  setSelectedSubHeadings(subHeadings) {
    this.selectedSubHeadings = subHeadings;
  }
  getSelectedSubHeadings() {
    return this.selectedSubHeadings;
  }

  getFilterParams(mergeParam = {}) {  // Use of parameter is for if someone wants to pass filter params custom,
    this.filterParams = {
      from_date: this.getFromDate(),
      to_date: this.getToDate(),
      ta_id: this.getSelectedTa().length > 0 ? this.getSelectedTa() : undefined,
      ta_id_dashboard: this.getSelectedTaForDashboard().length > 0 ? this.getSelectedTaForDashboard() : undefined,
      single_ta_id: this.getSelectedSingleTa().length > 0 ? this.getSelectedSingleTa() : undefined,
      di_ids: this.getSelectedIndication().length > 0 ? this.getSelectedIndication() : undefined,
      di_ids_dashboard: this.getSelectedIndicationForDashboard().length > 0 ? this.getSelectedIndicationForDashboard() : undefined,
      ct_di_ids: this.getSelectedIndicationCT().length > 0 ? this.getSelectedIndicationCT() : undefined,
      p_id: this.getSelectedProducts().length > 0 ? this.getSelectedProducts() : undefined,
      applicant_id: this.getSelectedApplicantNames().length > 0 ? this.getSelectedApplicantNames() : undefined,
      comp_id: this.getSelectedCompanies().length > 0 ? this.getSelectedCompanies() : undefined,
      drug_id: this.getSelectedDrugs().length > 0 ? this.getSelectedDrugs() : undefined,
      gene_id: this.getSelectedGenes().length > 0 ? this.getSelectedGenes() : undefined,
      moa_id: this.getSelectedMoas().length > 0 ? this.getSelectedMoas() : undefined,


      pt_cat_id: this.getSelectedCommercials().length > 0 ? this.getSelectedCommercials() : undefined,
      model_id: this.getSelectedModels().length > 0 ? this.getSelectedModels() : undefined,
      choose_intensity_date: this.getSelectedIntensityDate().length > 0 ? this.getSelectedIntensityDate() : undefined, //Choose the quarter, month and year
      choose_qty: this.getSelectedQtyTopProducts().length > 0 ? this.getSelectedQtyTopProducts() : 100, //Choose the quantity for Top 100 products in digital health module by default 100 set.
      text_search: this.getSelectedTextSearch(),
      min_tag_radius: this.getSelectedMinTagRadius() !== undefined ? this.getSelectedMinTagRadius() : 0,
      max_tag_radius: this.getSelectedMaxTagRadius() !== undefined ? this.getSelectedMaxTagRadius() : 500,
      min_intensity_range: this.getSelectedMinIntensityRange() !== undefined ? this.getSelectedMinIntensityRange() : 0,
      max_intensity_range: this.getSelectedMaxIntensityRange() !== undefined ? this.getSelectedMaxIntensityRange() : 1,
      intervention_id: this.getSelectedInterventions().length > 0 ? this.getSelectedInterventions() : undefined,
      study_type_id: this.getSelectedStudyTypes().length > 0 ? this.getSelectedStudyTypes() : undefined,
      phase_study_id: this.getSelectedPhaseStudy().length > 0 ? this.getSelectedPhaseStudy() : undefined,
      status_id: this.getSelectedStatus().length > 0 ? this.getSelectedStatus() : undefined,
      collaborators_type_id: this.getSelectedCollaboratorsType().length > 0 ? this.getSelectedCollaboratorsType() : undefined,
      collaborators_id: this.getSelectedCollaborators().length > 0 ? this.getSelectedCollaborators() : undefined,

      //For Patent
      dtt_id: this.getSelectedDigitals().length > 0 ? this.getSelectedDigitals() : undefined,

      // patent_di_ids: this.getSelectedIndication().length > 0 ? this.getSelectedIndication() : undefined,
      min_digital_term_count: this.getSelectedMinDigitalTermCount() !== undefined ? this.getSelectedMinDigitalTermCount() : 1,
      max_digital_term_count: this.getSelectedMaxDigitalTermCount() !== undefined ? this.getSelectedMaxDigitalTermCount() : 10,

      // For news extra new filter
      rnd_cat_id: this.getSelectedRegulatories().length > 0 ? this.getSelectedRegulatories() : undefined,

      //For main modules
      module_type: this.getSelectedModules() ? this.getSelectedModules() : undefined,

      //For inner modules like page type
      page_type: this.getSelectedPageType() ? this.getSelectedPageType() : undefined,

      //For Active Ingredient module
      api_category_id: this.getSelectedAPICategory().length > 0 ? this.getSelectedAPICategory() : undefined,
      sub_headings_id: this.getSelectedSubHeadings().length > 0 ? this.getSelectedSubHeadings() : undefined,
      ma_status_id: this.getSelectedMaStatus().length > 0 ? this.getSelectedMaStatus() : undefined,
      apis_id: this.getSelectedAPIs().length > 0 ? this.getSelectedAPIs() : undefined,
      api_score_range_id: this.getSelectedScoreRange().length > 0 ? this.getSelectedScoreRange() : undefined,
      api_ma_score_range_id: this.getSelectedMAScoreRange().length > 0 ? this.getSelectedMAScoreRange() : undefined,
      time_period_id: this.getSelectedTimePeriod().length > 0 ? this.getSelectedTimePeriod() : undefined,
      partnering_category_id: this.getSelectedPartneringCategory().length > 0 ? this.getSelectedPartneringCategory() : undefined,
      regulatory_category_id: this.getSelectedRegulatoryCategory().length > 0 ? this.getSelectedRegulatoryCategory() : undefined,

      tech_keyword_id: this.getSelectedTechKeywords().length > 0 ? this.getSelectedTechKeywords() : undefined, // for top products 
      disease_status_id: this.getSelectedDiseaseStatus().length > 0 ? this.getSelectedDiseaseStatus() : undefined,
      group_count_range_id: this.getSelectedGroupCountRange().length > 0 ? this.getSelectedGroupCountRange() : undefined,
      // rank_range_id: this.getSelectedRankRange().length > 0 ? this.getSelectedRankRange() : undefined,

      min_rank_range_id: this.getSelectedMinRankRange() !== undefined ? this.getSelectedMinRankRange() : 1,
      max_rank_range_id: this.getSelectedMaxRankRange() !== undefined ? this.getSelectedMaxRankRange() : 16,

      //For Mesh All level in Active Ingredients
      mesh_level_1_id: this.getSelectedMeshOneCategory().length > 0 ? this.getSelectedMeshOneCategory() : undefined,
      mesh_level_2_id: this.getSelectedMeshTwoCategory().length > 0 ? this.getSelectedMeshTwoCategory() : undefined,
      mesh_level_3_id: this.getSelectedMeshThreeCategory().length > 0 ? this.getSelectedMeshThreeCategory() : undefined,
      mesh_level_4_id: this.getSelectedMeshFourCategory().length > 0 ? this.getSelectedMeshFourCategory() : undefined,
      mesh_level_5_id: this.getSelectedMeshFiveCategory().length > 0 ? this.getSelectedMeshFiveCategory() : undefined,
      mesh_level_6_id: this.getSelectedMeshSixCategory().length > 0 ? this.getSelectedMeshSixCategory() : undefined,
      mesh_level_7_id: this.getSelectedMeshSevenCategory().length > 0 ? this.getSelectedMeshSevenCategory() : undefined,
      mesh_level_8_id: this.getSelectedMeshEightCategory().length > 0 ? this.getSelectedMeshEightCategory() : undefined,
      mesh_level_9_id: this.getSelectedMeshNineCategory().length > 0 ? this.getSelectedMeshNineCategory() : undefined,
      mesh_level_10_id: this.getSelectedMeshTenCategory().length > 0 ? this.getSelectedMeshTenCategory() : undefined,
      mesh_level_11_id: this.getSelectedMeshElevenCategory().length > 0 ? this.getSelectedMeshElevenCategory() : undefined,
      mesh_level_12_id: this.getSelectedMeshTwelveCategory().length > 0 ? this.getSelectedMeshTwelveCategory() : undefined,
      mesh_level_13_id: this.getSelectedMeshThirteenCategory().length > 0 ? this.getSelectedMeshThirteenCategory() : undefined,
      mesh_level_14_id: this.getSelectedMeshFourteenCategory().length > 0 ? this.getSelectedMeshFourteenCategory() : undefined,


    };
    return Object.assign(mergeParam, this.filterParams);
  }

  resetfilters() {
    this.setSelectedIndication([]);
    this.setSelectedIndicationForDashboard([]);
    this.setSelectedIndicationCT([]);
    this.setSelectedProducts([]);
    this.setSelectedApplicantNames([]);
    this.setSelectedCommercials([]);
    this.setSelectedIntensityDate([]);
    this.setSelectedModels([]);
    this.setSelectedCompanies([]);
    this.setSelectedQtyTopProducts([]);
    this.setSelectedRegulatories([]);
    this.setSelectedAPICategory([]);
    this.setSelectedMaStatus([]);
    this.setSelectedAPIs([]);
    this.setSelectedPartneringCategory([]);
    this.setSelectedRegulatoryCategory([]);
    this.setSelectedScoreRange([]);
    this.setSelectedMAScoreRange([]);
    this.setSelectedTimePeriod([]);
    this.setSelectedStudyTypes([]);
    this.setSelectedPhaseStudy([]);
    this.setSelectedStatus([]);
    this.setSelectedCollaboratorsType([]);

    // this.setSelectedModules([]);
    // this.setSelectedTextSearch(undefined);
    this.setSelectedDiseaseStatus([]);
    this.setSelectedTechKeywords([]);
    this.setSelectedGroupCountRange([]);
    // this.setSelectedRankRange([]);

    this.setSelectedMinRankRange(1);
    this.setSelectedMaxRankRange(16);
  }

  resetfiltersInner() {
    this.setSelectedProducts([]);
    this.setSelectedApplicantNames([]);
    this.setSelectedCommercials([]);
    this.setSelectedIntensityDate([]);
    // this.setSelectedModels([]);
    this.setSelectedCompanies([]);
    this.setSelectedQtyTopProducts([]);
    this.setSelectedInterventions([]);
    // this.setSelectedStudyTypes([]);
    // this.setSelectedPhaseStudy([]);
    // this.setSelectedStatus([]);
    this.setSelectedCollaboratorsType([]);
    // this.setSelectedCollaborators([]);

    this.setSelectedDigitals([]);
    this.setSelectedRegulatories([]);
    // this.setSelectedMinDigitalTermCount(undefined);
    // this.setSelectedMaxDigitalTermCount(undefined);
    // this.setSelectedPageType(undefined);

    // this.setSelectedAPICategory([]);
    // this.setSelectedMaStatus([]);
    // this.setSelectedScoreRange([]);
    // this.setSelectedMAScoreRange([]);
    // this.setSelectedTimePeriod([]);
    this.setSelectedAPIs([]);
    // this.setSelectedPartneringCategory([]);
    // this.setSelectedRegulatoryCategory([]);
    // this.setSelectedDiseaseStatus([]);

    this.setSelectedTextSearch(undefined);

  }

  resetfiltersTA() {
    this.setSelectedTa([]);
    this.setSelectedTaForDashboard([]);
    this.setSelectedIndication([]);
    this.setSelectedIndicationCT([]);
    // this.setSelectedTextSearch(undefined);
  }

  resetfiltersAPIs() {
    this.setSelectedAPIs([]);
  }

  resetfiltersDIID() { // Reset disease indication for CT
    this.setSelectedIndication([]);
  }
  resetfiltersDIIDForCT() { // Reset disease indication for other pages except for CT
    this.setSelectedIndicationCT([]);
  }

  // resetfiltersOnlyDisease() {
  //   this.setSelectedIndication([]);
  // }

}
