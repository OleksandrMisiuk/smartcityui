import {Injectable} from '@angular/core';
import * as SockJs from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import { Task } from '../model/Task';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() {
  }

  private serverUrl = 'http://localhost:8080/smartcity_war/socket';
  private stompClient;
  tasks = [];

connect() {
    let socket = new SockJs(this.serverUrl);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, frame => {
        console.log('Connected: ' + frame);
        if(localStorage.getItem('ROLE_SUPERVISOR')){
            this.stompClient.subscribe('/topic/task.create', task => {
                console.log(task);
                this.tasks.forEach(handler => handler(JSON.parse(task.body)));
            });
        }
        if(localStorage.getItem('ROLE_RESPONSIBLE_PERSON')){
            this.stompClient.subscribe('/topic/task.create/'+ localStorage.getItem('email'), task => {
                console.log(task);
                this.tasks.forEach(handler => handler(JSON.parse(task.body)));
            });
        }
    });
}

addTask(task){
    this.tasks.push(task);
}

disconnect() {
    if (this.stompClient != null) {
        this.stompClient.disconnect();
        console.log("Disconnected");
    }
}

// sendTask(task) {
//     this.stompClient.send("/smartcity_war/sendTask", {}, JSON.stringify(task));
// }

}