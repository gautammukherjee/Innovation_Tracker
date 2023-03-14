import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private API_URL: string = environment.apiUrl;
  private _TAs: any;
  constructor(private _http: HttpClient) {
  }

  // getCategories() {
  //   return this._http.get(this.API_URL + 'getTasLists', httpOptions);
  // }

  getCategories() {
    console.log("getCates: ", this._TAs);
    if (this._TAs) {
      return Observable.of(this._TAs);
    } else {
      //return this.http.get(API_URL + 'getTherapeuticAreas');
      return this._http.get(this.API_URL + 'getTasLists', httpOptions).do(
        (data: any) => {
          this._TAs = data;
        });
    }
  }

}
