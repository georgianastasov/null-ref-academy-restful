import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Article } from 'src/app/models/article.model';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-delete-article',
  templateUrl: './admin-delete-article.component.html',
  styleUrls: ['./admin-delete-article.component.css']
})
export class AdminDeleteArticleComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  articleid!: number;
  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  hasAdmin: boolean = false;
  hasTeacher: boolean = false;

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
        console.log('Section');
        this.article = response;
      }
    );
  }

  onSubmit() {
    this.service.deleteArticle(this.articleid)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/Admin/' + this.routeid + '/Articles']);
      }
    )
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
          if (this.article.adminID == admin.id) {
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
          if (this.article.teacherID == teacher.id) {
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
          console.log('here')
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
              this.teachersText += "This article has no enrolled teachers.";
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
