import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private http: HttpClient) { }

  findTaskById(id) {
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      console.log('IN findTaskById(' + id + ') TOKEN NULL');
      return new Observable();
    };
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    console.log('IN findTaskById(' + id + ') IS OK' + localStorage.getItem('token'));
    console.log('findTaskById RETURN: ' + this.http.get('http://localhost:8080/smartcity_war/tasks/' + id, { headers }));
    return this.http.get('http://localhost:8080/smartcity_war/tasks/' + id, { headers });
  }

  findTasksByOrganizationId(id){
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/tasks/organizationId/' + id, { headers });
  }

  findTasksByUserId(id){
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:8080/smartcity_war/tasks/userId/' + id, { headers });
  }

  createTask(taskDto){
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable;
    };
    console.log(taskDto);
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    this.http.post('http://localhost:8080/smartcity_war/tasks/', taskDto, {headers}).subscribe((res) => {
      console.log(res);
    });
  }

  deleteTask(id){
    let headers = new HttpHeaders();
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.delete('http://localhost:8080/smartcity_war/tasks/' + id, { headers }).subscribe((res) => {
      console.log(res);
    });
  }

  updateTask(id, task: any){
    let headers = new HttpHeaders();
    if (localStorage.getItem('token') == null) {
      return new Observable();
    };
    console.log('id: ' + id + 'taskDto' + task);
    headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:8080/smartcity_war/tasks/' + id, task, { headers });
  }
  }
