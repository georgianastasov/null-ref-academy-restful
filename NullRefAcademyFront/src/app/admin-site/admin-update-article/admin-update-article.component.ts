import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Article } from 'src/app/models/article.model';
import { Category } from 'src/app/models/category.model';
import { Section } from 'src/app/models/section.model';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-update-article',
  templateUrl: './admin-update-article.component.html',
  styleUrls: ['./admin-update-article.component.css']
})
export class AdminUpdateArticleComponent implements OnInit {
  public routeSub!: Subscription;
  public routeid!: number;
  public articleid!: number;

  public hasErrorTitle = false;
  public hasErrorTitleRequired: boolean = false;
  public hasErrorTitleLength: boolean = false;

  public hasErrorDescription = false;
  public hasErrorDescriptionRequired: boolean = false;
  public hasErrorDescriptionLength: boolean = false;

  public hasErrorText = false;
  public hasErrorTextRequired: boolean = false;
  public hasErrorTextLength: boolean = false;

  public hasErrorVidoeUrl = false;
  public hasErrorVidoeUrlRegex = false;

  public submited = false;

  private regExpVideo = new RegExp('(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?', 'g');

  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  public hasAdmin: boolean = false;
  public hasTeacher: boolean = false;

  takenArticle: Article = {
    id: 0,
    title: '',
    description: '',
    text: '',
    rating: 0,
    ratingQty: 0,
    createdDate: '',
    teacherID: 0,
    adminID: 0,
    videoUrl: '',
    studentsIDs: '',
    teachersIDs: '',
    usersStudentsRateIDs: '',
    usersTeachersRateIDs: ''
  }

  article: Article = {
    id: 0,
    title: '',
    description: '',
    text: '',
    rating: 0,
    ratingQty: 0,
    createdDate: '',
    teacherID: 0,
    adminID: 0,
    videoUrl: '',
    studentsIDs: '',
    teachersIDs: '',
    usersStudentsRateIDs: '',
    usersTeachersRateIDs: ''
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
      this.articleid = params['id2'];
    });

    this.getArticle();
    this.getArticleAdmin();
    this.getArticleTeacher();

    this.getStudentsOfThisArticle();
    this.getTeachersOfThisArticle();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getArticle() {
    this.service.getArticle(this.articleid)
    .subscribe(
      response => {
        this.takenArticle = response;
      }
    );
  }

  onSubmit() {
    this.populate();
    this.submited = true;
    //vidoeurl
    if(this.article.videoUrl != ''){
      let matchVideo = this.regExpVideo.test(this.article.videoUrl);
      if(!matchVideo){
        this.hasErrorVidoeUrl = true;
        this.hasErrorVidoeUrlRegex = true;
      } else {
        this.hasErrorVidoeUrl = false;
        this.hasErrorVidoeUrlRegex = false;
      }
    } else {
      this.hasErrorVidoeUrl = false;
      this.hasErrorVidoeUrlRegex = false;
    }
    this.service.updateArticle(this.articleid, this.takenArticle)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/Admin/' + this.routeid + '/Articles']);
      }, 
      error => {
        let theError = error.error.errors;
        if (theError != null) {
          //title
          if (theError.Title != null) {
            this.hasErrorTitle = true;
            if(theError.Title[0]){
              this.hasErrorTitleRequired = true;
            } else {
              this.hasErrorTitleLength = false;
            }
            if(theError.Title[1]){
              this.hasErrorTitleLength = true;
            } else {
              this.hasErrorTitleRequired = false;
            }
          } else {
            this.hasErrorTitle = false;
            this.hasErrorTitleRequired = false;
            this.hasErrorTitleLength = false;
          }
          //descriotion
          if (theError.Description != null) {
            this.hasErrorDescription = true;
            if(theError.Description[0]){
              this.hasErrorDescriptionRequired = true;
            } else {
              this.hasErrorDescriptionLength = false;
            }
            if(theError.Description[1]){
              this.hasErrorDescriptionLength = true;
            } else {
              this.hasErrorDescriptionRequired = false;
            }
          } else {
            this.hasErrorDescription = false;
            this.hasErrorDescriptionRequired = false;
            this.hasErrorDescriptionLength = false;
          }
          //text
          if (theError.Text != null) {
            this.hasErrorText = true;
            if(theError.Text[0]){
              this.hasErrorTextRequired = true;
            } else {
              this.hasErrorTextLength = false;
            }
            if(theError.Text[1]){
              this.hasErrorTextLength = true;
            } else {
              this.hasErrorTextRequired = false;
            }
          } else {
            this.hasErrorText = false;
            this.hasErrorTextRequired = false;
            this.hasErrorTextLength = false;
          }
        }
      }
    )
  }

  populate(){
    if (this.article.title != '') {
      this.takenArticle.title = this.article.title;
    }
    if (this.article.description != '') {
      this.takenArticle.description = this.article.description;
    }
    if (this.article.text != '') {
      this.takenArticle.text = this.article.text;
    }
    if (this.article.rating != 0) {
      this.takenArticle.rating = this.article.rating;
    }
    if (this.article.ratingQty != 0) {
      this.takenArticle.ratingQty = this.article.ratingQty;
    }
  }

  //Find creator - admin
  admins: Admin[] = [];
  adminText: string = '';
  getArticleAdmin(){
    this.service.getAllAdmins()
    .subscribe(
      response => {
        console.log('Admins');
        this.admins = response;
        this.admins.forEach(admin => {
          if (this.takenArticle.adminID == admin.id) {
            this.hasAdmin = true;
            this.adminText += "Id:" + admin.id + " " + "Username:" + admin.username;
          }
        });
      }
    );
  }

  //Find creator - teacher
  teachers: Teacher[] = [];
  teacherText: string = '';
  getArticleTeacher(){
    this.service.getAllTeachers()
    .subscribe(
      response => {
        console.log('Teachers');
        this.teachers = response;
        this.teachers.forEach(teacher => {
          if (this.takenArticle.teacherID == teacher.id) {
            this.hasTeacher = true;
            this.teacherText += "Id:" + teacher.id + " " + "Username:" + teacher.username;
          }
        });
      }
    );
  }

  //Get students enrolled in this article..
  studentsText: string = '';
  students: Student[] = [];
  inStudent: boolean = false;
  array: string[] = [];
  studentArray: string[] = [];
  studentid: number = 0;

  getStudentsOfThisArticle(){
    this.service.getAllStudents()
    .subscribe(
      response => {
        this.students = response;
        if (this.students != null) {
          if (!this.article.studentsIDs){
            this.studentsText += "This article has no enrolled students.";
          }
            this.array = this.article.studentsIDs.split(',');
            this.removeNull(this.array);
            for (let i = 0; i < this.array.length; i++) {
              this.students.forEach(student => {
                this.studentid = parseInt(this.array[i]);
                if (this.studentid == student.id) {
                  this.inStudent = true;
                  this.studentsText += "Id:" + student.id + " " + "Username:" + student.username + "\n";
                }
              });
            }
        }
        if(!this.inStudent){
          this.studentsText += "This article has no enrolled students.";
        }
      }
    );
  }

  //Get teachers enrolled in this article..
  teachersText: string = '';
  teachers2: Teacher[] = [];
  inTeacher: boolean = false;
  array2: string[] = [];
  teacherArray: string[] = [];
  teacherid: number = 0;

  getTeachersOfThisArticle(){
    this.service.getAllTeachers()
    .subscribe(
      response => {
        this.teachers2 = response;
        if (this.teachers2 != null) {
          if (!this.article.teachersIDs){
            this.studentsText += "This article has no enrolled teachers.";
          }
            this.array2 = this.article.teachersIDs.split(',');
            this.removeNull(this.array2);
            for (let i = 0; i < this.array2.length; i++) {
              this.teachers2.forEach(teacher => {
                this.teacherid = parseInt(this.array2[i]);
                if (this.teacherid == teacher.id) {
                  this.inTeacher = true;
                  this.teachersText += "Id:" + teacher.id + " " + "Username:" + teacher.username + "\n";
                }
              });
            }
        }
        if(!this.inTeacher){
          this.teachersText += "This article has no enrolled teachers.";
        }
      }
    );
  }

  removeNull(array: string[]) {
    return array.filter(x => x !== null)
  };
}
