import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Article } from 'src/app/models/article.model';
import { News } from 'src/app/models/news.model';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-delete-news',
  templateUrl: './admin-delete-news.component.html',
  styleUrls: ['./admin-delete-news.component.css']
})
export class AdminDeleteNewsComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  newsid!: number;
  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  hasAdmin: boolean = false;
  hasTeacher: boolean = false;

  news: News = {
    id: 0,
    title: '',
    description: '',
    text: '',
    rating: 0,
    ratingQty: 0,
    createdDate: '',
    adminID: 0,
    videoUrl: '',
    studentsIDs: '',
    teachersIDs: ''
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
      console.log('idAdmin: ' + params['id2']);
      this.newsid = params['id2'];
    });

    this.getNews();
    this.getNewsAdmin();

    this.getStudentsOfThisNews();
    this.getTeachersOfThisNews();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getNews() {
    this.service.getNews(this.newsid)
    .subscribe(
      response => {
        console.log('Section');
        this.news = response;
      }
    );
  }

  onSubmit() {
    this.service.deleteNews(this.newsid)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/Admin/' + this.routeid + '/News']);
      }
    )
  }

  //Find creator - admin
  admins: Admin[] = [];
  adminText: string = '';
  getNewsAdmin(){
    this.service.getAllAdmins()
    .subscribe(
      response => {
        console.log('Admins');
        this.admins = response;
        this.admins.forEach(admin => {
          if (this.news.adminID == admin.id) {
            this.hasAdmin = true;
            this.adminText += "Id:" + admin.id + " " + "Username:" + admin.username;
          }
        });
      }
    );
  }

  //Get students enrolled in this news..
  studentsText: string = '';
  students: Student[] = [];
  inStudent: boolean = false;
  array: string[] = [];
  studentArray: string[] = [];
  studentid: number = 0;

  getStudentsOfThisNews(){
    this.service.getAllStudents()
    .subscribe(
      response => {
        this.students = response;
        if (this.students != null) {
          if (!this.news.studentsIDs){
            this.studentsText += "This news has no enrolled students.";
          }
            this.array = this.news.studentsIDs.split(',');
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
          this.studentsText += "This news has no enrolled students.";
        }
      }
    );
  }

  //Get teachers enrolled in this news..
  teachersText: string = '';
  teachers2: Teacher[] = [];
  inTeacher: boolean = false;
  array2: string[] = [];
  teacherArray: string[] = [];
  teacherid: number = 0;

  getTeachersOfThisNews(){
    this.service.getAllTeachers()
    .subscribe(
      response => {
        this.teachers2 = response;
        if (this.teachers2 != null) {
          if (!this.news.teachersIDs){
            this.teachersText += "This news has no enrolled teachers.";
          }
            this.array2 = this.news.teachersIDs.split(',');
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
          this.teachersText += "This news has no enrolled teachers.";
        }
      }
    );
  }

  removeNull(array: string[]) {
    return array.filter(x => x !== null)
  };
}
