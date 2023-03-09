import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NewsletterListsService {
  private API_URL: string = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getNewsletterLists(params) {
    return this.http.post(this.API_URL + 'getNewsletterFrontLists', params, httpOptions);
  }

}
