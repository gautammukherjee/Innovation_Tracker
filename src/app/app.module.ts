import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptorService } from './services/token-interceptor.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ManagePasswordComponent } from './manage-password/manage-password.component';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FilterDataRangeComponent } from './filters/filter-data-range/filter-data-range.component';
import { FilterCategoriesAIV2Component } from './filters/filter-categories-ai-v2/filter-categories-ai-v2.component';
import { FilterDiseaseComponent } from './filters/filter-disease/filter-disease.component';
import { FilterDiseaseSynonymComponent } from './filters/filter-disease-synonym/filter-disease-synonym.component';
import { FilterCompanyComponent } from './filters/filter-company/filter-company.component';
import { FilterDrugComponent } from './filters/filter-drug/filter-drug.component';
import { FilterGeneComponent } from './filters/filter-gene/filter-gene.component';
import { FilterMoaComponent } from './filters/filter-moa/filter-moa.component';
import { FilterNewsTypeComponent } from './filters/filter-news-type/filter-news-type.component';
import { FilterDevelopmentPhaseComponent } from './filters/filter-development-phase/filter-development-phase.component';
import { NewsletterListsComponent } from './newsletter-lists/newsletter-lists.component';
import { NewsletterDetailsComponent } from './newsletter-details/newsletter-details.component';
import { DiseaseDataPipe } from './pipes/diseaseDataPipe';
import { DiseaseSynDataPipe } from './pipes/diseaseSynDataPipe';
import { CompanyDataPipe } from './pipes/companyDataPipe';
import { DrugDataPipe } from './pipes/drugDataPipe';
import { DrugSynDataPipe } from './pipes/drugSynDataPipe';
import { GeneDataPipe } from './pipes/geneDataPipe';
import { GeneSynDataPipe } from './pipes/geneSynDataPipe';
import { MoaDataPipe } from './pipes/moaDataPipe';
import { AllNewsComponent } from './all-news/all-news.component';
import { AllNewsListsComponent } from './all-news-lists/all-news-lists.component';
import { DevelopmentPhaseDataPipe } from './pipes/developmentPhaseDataPipe';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
// import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    ManagePasswordComponent,
    IndexComponent,
    DashboardComponent,
    NewsletterListsComponent,
    NewsletterDetailsComponent,
    HeaderComponent,
    FooterComponent,
    FilterDataRangeComponent,
    FilterCategoriesAIV2Component,
    FilterDiseaseComponent,
    FilterDiseaseSynonymComponent,
    FilterCompanyComponent,
    FilterDrugComponent,
    FilterGeneComponent,
    FilterMoaComponent,
    FilterNewsTypeComponent,
    FilterDevelopmentPhaseComponent,
    DiseaseDataPipe,
    CompanyDataPipe,
    DrugDataPipe,
    GeneDataPipe,
    MoaDataPipe,
    DiseaseSynDataPipe,
    DrugSynDataPipe,
    GeneSynDataPipe,
    DevelopmentPhaseDataPipe,
    AllNewsComponent,
    AllNewsListsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    AutocompleteLibModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    // NgxSpinnerModule
  ],
  exports: [
    FilterDataRangeComponent,
    FilterCategoriesAIV2Component,
    FilterDiseaseComponent,
    FilterDiseaseSynonymComponent,
    FilterCompanyComponent,
    FilterDrugComponent,
    FilterGeneComponent,
    FilterMoaComponent,
    FilterNewsTypeComponent,
    FilterDevelopmentPhaseComponent,
    DiseaseDataPipe,
    CompanyDataPipe,
    DrugDataPipe,
    GeneDataPipe,
    MoaDataPipe,
    DiseaseSynDataPipe,
    DrugSynDataPipe,
    GeneSynDataPipe,
    DevelopmentPhaseDataPipe
  ],
  schemas: [],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
