import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentService} from '../../services/comment.service';
import {TaskService} from '../../services/task.service';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  comments;
  task;
  checkoutForm;
  user;
  inputDescription;
  constructor(private commentService: CommentService, private userService: UserService, private formBuilder: FormBuilder,
              private taskService: TaskService,
              private actRouter: ActivatedRoute, private router: Router) {
    this.userService.getAuthenticatedUser().subscribe(date => {
      this.user = date;
    });
    this.checkoutForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      taskId: this.actRouter.snapshot.paramMap.get('id'),
      userId: ''
    });
}
  get description() {
    return this.checkoutForm.get('description');
  }
  ngOnInit() {


    this.userService.getAuthenticatedUser().subscribe(date => {
      this.user = date;
      this.checkoutForm.controls.userId.setValue(this.user.id);
    });
    this.commentService.findCommentByTaskId(this.actRouter.snapshot.paramMap.get('id'))
      .subscribe(data => {
        this.comments = data;
      });
    this.taskService.findTaskById(this.actRouter.snapshot.paramMap.get('id'))
      .subscribe(data => {
        this.task = data;
      });

  }
  handleEdit(id) {
    this.router.navigateByUrl('/home/comments/edit/' + id);
  }
  handleDelete(id) {
    this.commentService.deleteComment(id);
    this.comments = this.comments.filter(item => item.id !== id);
  }

  handleCreate(comment) {
    console.log(comment);
    this.commentService.createComment(comment);
    setTimeout(() =>
    {
      this.commentService.findCommentByTaskId(this.actRouter.snapshot.paramMap.get('id'))
        .subscribe(data => {
          this.comments = data;
          this.checkoutForm.controls.description.setValue('');
        });
    }, 1000);


  }

  checkOnOwner(id) {
      return id == this.user.id;
  }

}


