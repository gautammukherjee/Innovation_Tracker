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
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FilterDataRangeComponent } from './filters/filter-data-range/filter-data-range.component';
import { FilterCategoriesAIV2Component } from './filters/filter-categories-ai-v2/filter-categories-ai-v2.component';
import { FilterDiseaseComponent } from './filters/filter-disease/filter-disease.component';
import { FilterCompanyComponent } from './filters/filter-company/filter-company.component';
import { FilterDrugComponent } from './filters/filter-drug/filter-drug.component';
import { FilterGeneComponent } from './filters/filter-gene/filter-gene.component';
import { FilterMoaComponent } from './filters/filter-moa/filter-moa.component';
import { NewsletterListsComponent } from './newsletter-lists/newsletter-lists.component';
import { NewsletterDetailsComponent } from './newsletter-details/newsletter-details.component';
import { DiseaseDataPipe } from './pipes/diseaseDataPipe';
import { CompanyDataPipe } from './pipes/companyDataPipe';
import { DrugDataPipe } from './pipes/drugDataPipe';
import { GeneDataPipe } from './pipes/geneDataPipe';
import { MoaDataPipe } from './pipes/moaDataPipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    IndexComponent,
    DashboardComponent,
    NewsletterListsComponent,
    NewsletterDetailsComponent,
    HeaderComponent,
    FooterComponent,
    FilterDataRangeComponent,
    FilterCategoriesAIV2Component,
    FilterDiseaseComponent,
    FilterCompanyComponent,
    FilterDrugComponent,
    FilterGeneComponent,
    FilterMoaComponent,
    DiseaseDataPipe,
    CompanyDataPipe,
    DrugDataPipe,
    GeneDataPipe,
    MoaDataPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    AutocompleteLibModule,
    BrowserAnimationsModule
  ],
  exports: [
    FilterDataRangeComponent,
    FilterCategoriesAIV2Component,
    FilterDiseaseComponent,
    FilterCompanyComponent,
    FilterDrugComponent,
    FilterGeneComponent,
    FilterMoaComponent,
    DiseaseDataPipe,
    CompanyDataPipe,
    DrugDataPipe,
    GeneDataPipe,
    MoaDataPipe
  ],
  schemas: [],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
