import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrganizationListService {

  constructor(private http: HttpClient) { }

  getOrganizations() {
    // Need to change url
    let headers = new HttpHeaders();
    headers = headers.append('authorization','Bearer '+localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/organizations', {headers});
  }

  findOrganizationById(id){
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/organizations/' + id, { headers });
  }
}
