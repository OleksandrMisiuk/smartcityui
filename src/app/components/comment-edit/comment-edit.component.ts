import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentService} from '../../services/comment.service';
import {Comment} from '../../model/Comment';

import {NotificationService} from "../../services/notification.service";
@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss']
})
export class CommentEditComponent implements OnInit {
  updatedCommentForm: FormGroup;
  userId :number;
  constructor(private formBuilder: FormBuilder, private commentService: CommentService, private router: Router,
              private actRouter: ActivatedRoute, private notificationService : NotificationService) {

    this.updatedCommentForm = this.formBuilder.group({
      description: ['', [Validators.required]],
    });
  }
  get description() {
    return this.updatedCommentForm.get('description');
  }
  onSubmit(value:Comment) {
    if(value.description !== '') {
      this.commentService.findCommentById(this.actRouter.snapshot.paramMap.get('id')).subscribe((com: Comment) => {
        com.description = value.description;
        this.commentService.updateComment(this.actRouter.snapshot.paramMap.get('id'), com).subscribe((date: Comment) => {
          console.log(date);
          this.router.navigateByUrl('home/comments/' + com.taskId);
          this.notificationService.showSuccessWithTimeout("Comment has been successfully updated!","Success",4500);
        });
      });
    }
    else{
      this.notificationService.showErrorWithTimeout("You do not update the comment with the empty description!!!","Error",4500);
    }
  }
  onClickCancel() {
    this.router.navigateByUrl('home/comments/' + this.actRouter.snapshot.paramMap.get('id'));
  }
  ngOnInit() {
    this.commentService.findCommentById(this.actRouter.snapshot.paramMap.get('id')).subscribe((comment: Comment) => {
      this.userId = comment.userId;
      this.updatedCommentForm.controls.description.setValue(comment.description);
    });
  }
}
