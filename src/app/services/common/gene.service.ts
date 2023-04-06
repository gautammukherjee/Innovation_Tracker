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
export class GeneService {
  private API_URL: string = environment.apiUrl;
  private _Gene_syns: any;

  constructor(private http: HttpClient) { }

  getGene() {
    return this.http.get(this.API_URL + 'getGenesLists', httpOptions);
  }

  getGeneSynonym() {
    console.log("_Gene_syns: ", this._Gene_syns);
    if (this._Gene_syns) {
      return Observable.of(this._Gene_syns);
    } else {
      return this.http.get(this.API_URL + 'getGenesSynsLists', httpOptions).do(
        (data: any) => {
          this._Gene_syns = data;
        });
    }
  }

}
