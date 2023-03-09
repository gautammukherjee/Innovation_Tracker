import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class IndicationService {
  private API_URL: string = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getIndication() {
    return this._http.get(this.API_URL + 'getDiseasesLists', httpOptions);
  }


}
