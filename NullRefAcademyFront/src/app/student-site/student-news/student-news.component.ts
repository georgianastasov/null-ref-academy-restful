import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Article } from 'src/app/models/article.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { News } from 'src/app/models/news.model';
import { Section } from 'src/app/models/section.model';
import { Student } from 'src/app/models/student.model';
import { StudentCourses } from 'src/app/models/studentcourses.model';
import { Teacher } from 'src/app/models/teacher.model';
import { StudentApiService } from 'src/app/services/student-api.service';

@Component({
  selector: 'app-student-news',
  templateUrl: './student-news.component.html',
  styleUrls: ['./student-news.component.css']
})
export class StudentNewsComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  newsid!: number;
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
    coursesIDs: '',
    articleIDs: '',
    newsIDs: ''
  }

  news: News = {
    id: 0,
    title: '',
    description: '',
    text: '',
    rating: 0,
    ratingQty: 0,
    videoUrl: '',
    createdDate: '',
    adminID: 0,
    studentsIDs: '',
    teachersIDs: '',
    usersStudentsRateIDs: '',
    usersTeachersRateIDs: ''
  }
  
  admins: Admin[] = [];
  students: Student[] = [];
  teachers: Teacher[] = [];
  newss: News[] = [];
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
      this.newsid = params['id2'];
      console.log('courseidd:' + this.newsid)
    });

    this.getStudent();

    this.getAllAdmins();
    this.getAllStudents();
    this.getAllTeachers();
    this.getAllNews();

    this.checkEnrollPreview();
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

  getAllAdmins() {
    this.service.getAllAdmins()
    .subscribe(
      response => {
        this.admins = response;
      }
    );
  }

  getAllStudents() {
    this.service.getAllStudents()
    .subscribe(
      response => {
        this.students = response;
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

  getAllNews() {
    this.service.getAllNews()
      .subscribe(
        response => {
          this.newss = response;
        }
      );
  }

  countUsers(news : any){
    let count = 0
    if(news.studentsIDs){
      let array = news.studentsIDs.split(',');
      for (let i = 0; i < array.length; i++) {
        let studentId = parseInt(array[i]);
        this.students.forEach(student => {
          if (studentId === student.id) {
            count++;
          }
        });
      }
    }
    if (news.teachersIDs) {
      let array2 = news.teachersIDs.split(',');
      for (let i = 0; i < array2.length; i++) {
        let teacherId = parseInt(array2[i]);
        this.teachers.forEach(teacher => {
          if (teacherId === teacher.id) {
            count++;
          }
        });
      }
    }
    return count;
  }

  public enroll = true;
  public preview = false;
  checkEnrollPreview() {
    this.service.getAllNews()
      .subscribe(
        response => {
          this.newss = response;
          this.newss.forEach(news => {
            if(news.id === Number(this.newsid)){
                let studentIDs = news.studentsIDs.split(',');
                studentIDs.pop();
                studentIDs.forEach(studentID => {
                  if(Number(studentID) == this.routeid){
                    this.preview = true;
                    this.enroll = false;
                  }
                });
            }
          });
        }
      );
  }

  enrollStudent(){
    this.service.getStudent(this.routeid)
    .subscribe(
      response => {
        this.student = response;
        var date = formatDate(Date.now(), 'dd/MM/YYYY', 'en-US').toString();
        this.student.newsIDs += this.newsid + '=' + '0' + '=' + date + ',';
        this.service.updateStudent(this.routeid, this.student)
        .subscribe(
          response => {
        })

        this.service.getNews(this.newsid)
        .subscribe(
          response => {
            this.news = response;
            this.news.studentsIDs += this.routeid + ',';

            this.service.updateNews(this.newsid, this.news)
              .subscribe(
                response => {
                  setTimeout(() => {
                    this.router.navigate(['/Student/' + this.routeid + '/News/' + this.newsid + '/Enroll']);
                  }, 100);
              })
          })
      },
    );
  }
}
