import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GeneService {
  private API_URL: string = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getGene() {
    return this.http.get(this.API_URL + 'getGenesLists', httpOptions);
  }

}
