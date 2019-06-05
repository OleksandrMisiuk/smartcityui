import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import {  OrganizationListService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: Object;
  org: Object;
  orgId: Object;
  comId: Object;

  constructor(private taskService: TaskService, private orgService: OrganizationListService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.taskService.findTasksByOrganizationId(this.route.snapshot.paramMap.get("id"))
    .subscribe(data => {
        this.tasks = data;
        console.log(this.tasks);
    });
    this.orgService.findOrganizationById(this.route.snapshot.paramMap.get("id")).subscribe(data => {
      this.org = data;
      console.log(this.org)
    });
  }
  refOnComments(comId){
    this.router.navigateByUrl('/home/comments/'+ comId);
  }

}
