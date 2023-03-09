import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// import { do } from 'rxjs/operator/do';

// import 'rxjs/add/observable/of';
//import 'rxjs/add/operator/do';
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
  private _TAsAI: any;
  constructor(private _http: HttpClient) {
  }

  getCategories() {
    return this._http.get(this.API_URL + 'getTasLists', httpOptions);
  }

  // getCategories() {
  //   if (this._TAs) {
  //     return Observable.of(this._TAs);
  //   } else {
  //     //return this.http.get(API_URL + 'getTherapeuticAreas');
  //     return this.http.get(API_URL + 'getCategories').do(
  //       (data) => {
  //         this._TAs = data;
  //       });
  //   }
  // }

}
