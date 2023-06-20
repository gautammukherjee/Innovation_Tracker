import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NewsletterListsService {
  private API_URL: string = environment.apiUrl;
  private _newsLetterLists: any;
  private _newsLetterDName: any;
  private _newsLetterUName: any;
  private _newsletterDetails: any;
  constructor(private _http: HttpClient) { }

  // getNewsletterLists(params: any) {
  //   if (this._newsLetterLists) {
  //     return Observable.of(this._newsLetterLists);
  //   } else {
  //     return this._http.post(this.API_URL + 'getNewsletterFrontLists', params, httpOptions).do(
  //       (data: any) => {
  //         this._newsLetterLists = data;
  //       });
  //   }
  // }

  getNewsletterLists(params: any) {
    return this._http.post(this.API_URL + 'getNewsletterFrontLists', params, httpOptions).do(
      (data: any) => {
        this._newsLetterLists = data;
      });
  }

  getNewsletterLists2(params: any) {
    return this._http.post(this.API_URL + 'getNewsletterFrontLists', params, httpOptions).do(
      (data: any) => {
        this._newsLetterLists = data;
      });
  }

  getNewsletterListsExtra(params: any) {
    return this._http.post(this.API_URL + 'getNewsletterFrontListsExtra', params, httpOptions);
  }

  getAllNews(params: any) {
    return this._http.post(this.API_URL + 'getAllNews', params, httpOptions);
  }

  getNewsletterDetails(params: any) {
    return this._http.post(this.API_URL + 'getNewsletterFrontDetails', params, httpOptions);
  }

  // getNewsletterDetails(params: any) {
  //   console.log("newsletterDetaile: ", this._newsletterDetails);
  //   if (this._newsletterDetails) {
  //     return Observable.of(this._newsletterDetails);
  //   } else {
  //     //return this.http.get(API_URL + 'getTherapeuticAreas');
  //     return this._http.post(this.API_URL + 'getNewsletterFrontDetails', params, httpOptions).do(
  //       (data: any) => {
  //         this._newsletterDetails = data;
  //       });
  //   }
  // }

  // getNewsletterDisease(params: any) {
  //   if (this._newsLetterDName) {
  //     return Observable.of(this._newsLetterDName);
  //   } else {
  //     return this._http.post(this.API_URL + 'getNewsletterDisease', params, httpOptions).do(
  //       (data: any) => {
  //         this._newsLetterDName = data;
  //       });
  //   }
  // }

  // getNewsletterUserName(params: any) {
  //   if (this._newsLetterUName) {
  //     return Observable.of(this._newsLetterUName);
  //   } else {
  //     return this._http.post(this.API_URL + 'getNewsletterUserName', params, httpOptions).do(
  //       (data: any) => {
  //         this._newsLetterUName = data;
  //       });
  //   }
  // }

}
