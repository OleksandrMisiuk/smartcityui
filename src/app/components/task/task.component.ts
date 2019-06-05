import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  name;
  id;
  description;
  approvedBudget;
  requestedBudget;
  deadline;
  status;

  constructor(private route: ActivatedRoute, private service: TaskService, private router: Router) { }

  ngOnInit() {
    this.service.findTaskById(this.route.snapshot.paramMap.get("id")).subscribe((task:any) => {
      this.name = task.title;
      this.id = task.id;
      this.description = task.description;
      this.approvedBudget = task.approvedBudget;
      this.requestedBudget = task.budget;
      this.deadline = task.deadlineDate;
      this.status = task.taskStatus;
      console.log(task);
    });
  }

  refOnComments(comId){
    this.router.navigateByUrl('/home/comments/'+ comId);
  }

  handleDelete(id){
    this.service.deleteTask(id);
  }

  handleEdit(id){
    this.router.navigateByUrl('/home/task/edit/' + id);
  }

}
