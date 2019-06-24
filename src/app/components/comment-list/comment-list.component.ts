import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentService} from '../../services/comment.service';
import {TaskService} from '../../services/task.service';
import {FormBuilder} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Comment} from '../../model/Comment';
import {User} from "../../model/User";
import {Task} from "../../model/Task";
import {DialogService} from "../../services/dialog.service";
import { ToastrService } from 'ngx-toastr';
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})

export class CommentListComponent implements OnInit {

  comments: Comment[] = [];
  allComments: Comment[] = [];
  task:Task = null;
  checkoutForm;
  user:User;
  isSuccesfullMessage: boolean;
  isValidationMessage:boolean;
  searchText:string;
  isMoreView:boolean;

  constructor(private commentService: CommentService, private userService: UserService, private formBuilder: FormBuilder,
              private taskService: TaskService,
              private actRouter: ActivatedRoute, private router: Router,private dialogService: DialogService, private notification : NotificationService) {


  }

  ngOnInit() {
    this.taskService.findTaskById(this.actRouter.snapshot.paramMap.get('id'))
      .subscribe((data:Task) => {
        this.task = data;
      })

    this.commentService.findCommentByTaskId(this.actRouter.snapshot.paramMap.get('id'))
      .subscribe((data:Comment[]) => {
          this.allComments = data;
          this.comments = data.slice(0,10);
      });

    this.checkoutForm = this.formBuilder.group({
      description: ''
    });
    this.userService.getAuthenticatedUser().subscribe((date:User) => {
      this.user = date;
    });

  }

  handleEdit(comment:Comment) {
    this.router.navigateByUrl('/home/comments/edit/' + comment.id);
  }

  handleDelete(comment:Comment) {
    this.dialogService.openConfirmDialog('Are you sure to delete this comment?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.commentService.deleteComment(comment.id).subscribe(date => {
          this.allComments = this.allComments.filter(item => item.id !== comment.id);
          this.comments = this.allComments.slice(0,10);
          if(this.comments.length > 10) this.isMoreView = false;
          console.log(date);
          this.notification.showSuccessWithTimeout("Comment has been successfully deleted!","Success",5600);
        });
      }
    });

  }

  handleCreate(comment:Comment) {
    if(comment.description !== '' ) {
      comment.userId = this.user.id;
      comment.taskId = this.task.id;
      this.commentService.createComment(comment).subscribe
      ((date: Comment) => {
          this.isSuccesfullMessage = true;
          this.isValidationMessage = false;
          this.checkoutForm.controls['description'].setValue('');
          console.log(comment);
          this.notification.showSuccessWithTimeout("Comment has been successfully created!","Success",5600);
          this.commentService.findCommentById(date.id).subscribe((result: Comment) => {
            this.comments.unshift(result);
            this.comments = this.comments.slice(0,10);
            this.allComments.unshift(result);
          });
        }
      );
    }
    else {
      this.isValidationMessage = true;
    }
  }


  viewMore(){
    this.comments = this.allComments.slice(0,this.comments.length+10);
  }

  messageSuccsesfulClose(){
    this.isSuccesfullMessage= false;
  }

  messageValidationClose(){
    this.isValidationMessage = false;
  }

  checkOnOwner(comment:Comment):boolean {
    if(this.user) {
      return comment.userId === this.user.id;
    }
    return false;
  }

  goBackToTask(){
    this.router.navigateByUrl('/home/organizations');
  }

  sortNew(){
    this.allComments.sort((a, b) => {
      var date = new Date(a.createdDate);
      var date2 = new Date(b.createdDate);

      if( date.getTime() < date2.getTime()){
      return 1;
      }
      return -1;
    })
    this.comments = this.allComments.slice(0,10);
    this.notification.showInfoWithTimeout("The comment list was sorted by date, first new then old","Success",4200);
  }
  sortOld(){
    this.allComments.sort((a, b) => {
      var date = new Date(a.createdDate);
      var date2 = new Date(b.createdDate);

      if( date.getTime() > date2.getTime()){
        return 1;
      }
      return -1;
    })
    this.comments = this.allComments.slice(0,10);
    this.notification.showInfoWithTimeout("The comment list was sorted by date, first old then new","Success",4200);

  }

  search(){
      this.comments = this.allComments.filter(value =>
        value.userId.toString().indexOf(this.searchText) > -1
      );
      if(this.searchText !== ''){
        this.isMoreView = true;
      }
      else{
        this.isMoreView = false;
        if(this.comments.length > 10){
          this.comments = this.comments.slice(0,10);
        }
      }
  }

}


