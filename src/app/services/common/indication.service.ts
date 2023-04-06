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

  getIndicationSynonym() {
    console.log("_Inds_syns: ", this._Inds_syns);
    if (this._Inds_syns) {
      return Observable.of(this._Inds_syns);
    } else {
      return this._http.get(this.API_URL + 'getDiseasesSynsLists', httpOptions).do(
        (data: any) => {
          this._Inds_syns = data;
        });
    }
  }


}
