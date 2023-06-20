import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class IndicationService {
  private API_URL: string = environment.apiUrl;
  private _Inds: any;
  private _Inds_syns: any;

  constructor(private _http: HttpClient) { }

  // getIndication2() {
  //   return this._http.get(this.API_URL + 'getDiseasesLists', httpOptions);
  // }

  getIndication() {
    console.log("getInd: ", this._Inds);
    if (this._Inds) {
      return Observable.of(this._Inds);
    } else {
      return this._http.get(this.API_URL + 'getDiseasesLists', httpOptions).do(
        (data: any) => {
          this._Inds = data;
        });
    }
  }

  getIndicationSynonym(params: any) {
    // console.log("_Inds_syns: ", this._Inds_syns);
    // if (this._Inds_syns) {
    //   return Observable.of(this._Inds_syns);
    // } else {
    return this._http.post(this.API_URL + 'getDiseasesSynsLists', params, httpOptions).do(
      (data: any) => {
        this._Inds_syns = data;
      });
    // }
  }

  getIndicationSynonym_old() {
    // console.log("_Inds_syns: ", this._Inds_syns);
    // if (this._Inds_syns) {
    //   return Observable.of(this._Inds_syns);
    // } else {
    return this._http.get(this.API_URL + 'getDiseasesSynsLists', httpOptions).do(
      (data: any) => {
        this._Inds_syns = data;
      });
    // }
  }

  getIndicationSynonymCount(params: any) {
    return this._http.post(this.API_URL + 'getIndicationSynonymCount', params, httpOptions).do(
      (data: any) => {
        this._Inds_syns = data;
      });
  }

  getIndicationSynonymSearchCount(params: any) {
    return this._http.post(this.API_URL + 'getIndicationSynonymSearchCount', params, httpOptions).do(
      (data: any) => {
        this._Inds_syns = data;
      });
  }

  getIndicationSynonymSearch(params: any) {
    // console.log("_Inds_syns: ", this._Inds_syns);
    // if (this._Inds_syns) {
    //   return Observable.of(this._Inds_syns);
    // } else {
    return this._http.post(this.API_URL + 'getIndicationSynonymSearch', params, httpOptions).do(
      (data: any) => {
        this._Inds_syns = data;
      });
    // }
  }


}
