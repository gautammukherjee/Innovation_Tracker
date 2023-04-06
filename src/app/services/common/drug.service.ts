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
export class DrugService {
  private API_URL: string = environment.apiUrl;
  private _Drugs_syns: any;

  constructor(private http: HttpClient) { }

  getDrug() {
    return this.http.get(this.API_URL + 'getDrugsLists', httpOptions);
  }

  getDrugSynonym() {
    console.log("_Drugs_syns: ", this._Drugs_syns);
    if (this._Drugs_syns) {
      return Observable.of(this._Drugs_syns);
    } else {
      return this.http.get(this.API_URL + 'getDrugsSynsLists', httpOptions).do(
        (data: any) => {
          this._Drugs_syns = data;
        });
    }
  }

}
