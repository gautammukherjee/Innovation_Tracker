import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from "moment";
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private API_URL: string = environment.apiUrl;

  constructor(private _http: HttpClient, private router: Router) { }

  doLogin(params: any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'login', params, httpOptions);
  }

  doRegister(params: any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'register', params, httpOptions);
  }

  getCurrentUser(): string {
    return sessionStorage.getItem('currentUser');
  }

  isLoggednIn() {
    //return JSON.parse(this.getCurrentUser()) !== null;
    return moment().isBefore(this.getExpiration());
    return true;
  }

  isLoggedOut() {
    return !this.isLoggednIn();
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['login']);
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getUsersLists(): Observable<any> {
    return this._http.get(this.API_URL + 'getUsersLists', httpOptions);
  }

}
