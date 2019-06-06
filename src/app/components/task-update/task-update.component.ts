import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.scss']
})
export class TaskUpdateComponent implements OnInit {

 taskId;
 task : any;
 checkoutForm;

  constructor(private service: TaskService, private formBuilder: FormBuilder, private router: Router, private actRouter: ActivatedRoute, private location: Location) {
    this.taskId = this.actRouter.snapshot.paramMap.get('id');
    console.log('TASK ID: ' + this.taskId);
    this.task = this.service.findTaskById(this.taskId).subscribe(data => {
      this.task = data;
      console.log('TASK: ' + this.task);
    });
    this.checkoutForm = this.formBuilder.group({
      title: '',
      description: '',
      budget: '',
      approvedBudget: '',
      deadlineDate: '',
      taskStatus: '',
      usersOrganizationsId: this.task.usersOrganizationsId
  });
  console.log('TASK XXXX: ' + this.task.usersOrganizationsId);
}

  ngOnInit() {

  }

  onSubmit(task: any) {
    // Process checkout data here
    console.log('TASK UPDATE: ' + task.title);
    this.service.updateTask(this.taskId, task );
    this.location.back();
  }

}
