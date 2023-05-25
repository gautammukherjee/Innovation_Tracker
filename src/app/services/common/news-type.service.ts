import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NewsTypeService {

  private API_URL: string = environment.apiUrl;
  private _newsTypes: any;
  constructor(private _http: HttpClient) {
  }

  getNewsType() {
    console.log("newsTypes: ", this._newsTypes);
    if (this._newsTypes) {
      return Observable.of(this._newsTypes);
    } else {
      //return this.http.get(API_URL + 'getNewsType');
      return this._http.get(this.API_URL + 'getNewsType', httpOptions).do(
        (data: any) => {
          this._newsTypes = data;
        });
    }
  }

}
