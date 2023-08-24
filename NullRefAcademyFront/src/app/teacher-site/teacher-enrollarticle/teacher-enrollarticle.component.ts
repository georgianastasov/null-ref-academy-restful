import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Article } from 'src/app/models/article.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { Student } from 'src/app/models/student.model';
import { StudentCourses } from 'src/app/models/studentcourses.model';
import { Teacher } from 'src/app/models/teacher.model';
import { StudentApiService } from 'src/app/services/student-api.service';

@Component({
  selector: 'app-teacher-enrollarticle',
  templateUrl: './teacher-enrollarticle.component.html',
  styleUrls: ['./teacher-enrollarticle.component.css']
})
export class TeacherEnrollArticleComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  articleid!: number;
  constructor(private service: StudentApiService, private router: Router, private route: ActivatedRoute) { }

  student: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    accountType: '',
    password: '',
    confirmPassword: '',
    createdDate: '',
    bio: '',
    points: 0,
    progress: 0,
    timeSpent: '',
    coursesIDs: ''
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
    adminID: 0
  }
  
  admins: Admin[] = [];
  articles: Article[] = [];
  teachers: Teacher[] = [];
  students: Student[] = [];
  studentCourses: StudentCourses[] = [];
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
      this.articleid = params['id2'];
    });

    this.getStudent();
    this.getArticle();
    this.getAllArticles();

    this.getAllAdmins();
    this.getAllTeachers();

    //this.checkFinish();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getStudent() {
    this.service.getStudent(this.routeid)
      .subscribe(
        response => {
          this.student = response;
        }
      );
  }

  getArticle() {
    this.service.getArticle(this.articleid)
    .subscribe(
      response => {
        this.article = response;
      }
    );
  }

  getAllAdmins() {
    this.service.getAllAdmins()
    .subscribe(
      response => {
        this.admins = response;
      }
    );
  }

  getAllTeachers() {
    this.service.getAllTeachers()
    .subscribe(
      response => {
        this.teachers = response;
      }
    );
  }

  getAllArticles() {
    this.service.getAllArticles()
      .subscribe(
        response => {
          this.articles = response;
        }
      );
  }

  public finish = false;
  // checkFinish() {
  //   this.service.getAllStudents()
  //     .subscribe(
  //       response => {
  //         this.students = response;
  //         this.students.forEach(student => {
  //           if(student.id === Number(this.routeid)){
  //               let coursesIDs = student.coursesIDs.split(',')
  //               coursesIDs.pop();
  //               for (let i = 0; i < coursesIDs.length; i++) {
  //                 let arr = coursesIDs[i].split('=');
  //                 let id = arr[0];
  //                 let isFinish = arr[1];
  //                 if(Number(id) == this.courseid){
  //                   if(isFinish === "0"){
  //                     this.finish = true;
  //                     break;
  //                   } else {
  //                     this.finish = false;
  //                   }
  //                 }
  //               }
  //           }
  //         });
  //       }
  //     );
  // }

  // private result: string = '';
  // finishCourse(){
  //   this.service.getStudent(this.routeid)
  //   .subscribe(
  //     response => {
  //       this.student = response;
  //       let coursesIDs = this.student.coursesIDs.split(',')
  //       coursesIDs.pop();
  //       for (let i = 0; i < coursesIDs.length; i++) {
  //         let arr = coursesIDs[i].split('=');
  //         let id = arr[0];
  //         let date = arr[2];
  //         let finishDate = formatDate(Date.now(), 'dd/MM/YYYY', 'en-US').toString();
  //         if(Number(id) == this.courseid){
  //           this.result += id + '=' + "1" + '=' + date + '=' + finishDate;
  //           this.student.coursesIDs = this.student.coursesIDs.replace(coursesIDs[i], this.result)
  //           break;
  //         }
  //       }
  //       this.service.updateStudent(this.routeid, this.student)
  //       .subscribe(
  //         response => {
  //           setTimeout(() => {
  //             this.router.navigate(['/Student/' + this.routeid + '/Dashboard/']);
  //           }, 100);
  //       })
  //     },
  //   );
  // }
}
