import { DatePipe, formatDate } from '@angular/common';
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
import { TeacherApiService } from 'src/app/services/teacher-api.service';

@Component({
  selector: 'app-teacher-enrollnews',
  templateUrl: './teacher-enrollnews.component.html',
  styleUrls: ['./teacher-enrollnews.component.css']
})
export class TeacherEnrollNewsComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  newsid!: number;
  constructor(private service: TeacherApiService, private router: Router, private route: ActivatedRoute) { }

  teacher: Teacher = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    accountType: '',
    password: '',
    confirmPassword: '',
    createdDate: '',
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
    createdDate: '',
    adminID: 0,
    videoUrl: '',
    studentsIDs: '',
    teachersIDs: '',
    usersStudentsRateIDs: '',
    usersTeachersRateIDs: ''
  }
  
  admins: Admin[] = [];
  newss: News[] = [];
  teachers: Teacher[] = [];
  students: Student[] = [];
  studentCourses: StudentCourses[] = [];
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
      this.newsid = params['id2'];
    });

    this.getTeacher();
    this.getNews();
    this.getAllNews();

    this.getAllAdmins();
    this.getAllTeachers();

    this.checkFinish();
    this.checkRated();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getTeacher() {
    this.service.getTeacher(this.routeid)
      .subscribe(
        response => {
          this.teacher = response;
        }
      );
  }

  getNews() {
    this.service.getNews(this.newsid)
    .subscribe(
      response => {
        this.news = response;
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

  getAllNews() {
    this.service.getAllNews()
      .subscribe(
        response => {
          this.newss = response;
        }
      );
  }

  public finish = false;
  checkFinish() {
    this.service.getAllTeachers()
      .subscribe(
        response => {
          this.teachers = response;
          this.teachers.forEach(teacher => {
            if(teacher.id === Number(this.routeid)){
                let newsIDs = teacher.newsIDs.split(',')
                newsIDs.pop();
                for (let i = 0; i < newsIDs.length; i++) {
                  let arr = newsIDs[i].split('=');
                  let id = arr[0];
                  let isFinish = arr[1];
                  if(Number(id) == this.newsid){
                    if(isFinish === "0"){
                      this.finish = true;
                      break;
                    } else {
                      this.finish = false;
                    }
                  }
                }
            }
          });
        }
      );
  }

  private result: string = '';
  finishCourse(){
    this.service.getTeacher(this.routeid)
    .subscribe(
      response => {
        this.teacher = response;
        let newsIDs = this.teacher.newsIDs.split(',')
        newsIDs.pop();
        for (let i = 0; i < newsIDs.length; i++) {
          let arr = newsIDs[i].split('=');
          let id = arr[0];
          let date = arr[2];
          let finishDate = formatDate(Date.now(), 'dd/MM/YYYY', 'en-US').toString();
          if(Number(id) == this.newsid){
            this.result += id + '=' + "1" + '=' + date + '=' + finishDate;
            this.teacher.newsIDs = this.teacher.newsIDs.replace(newsIDs[i], this.result)
            break;
          }
        }
        this.service.updateTeacher(this.routeid, this.teacher)
        .subscribe(
          response => {
            setTimeout(() => {
              this.router.navigate(['/Teacher/' + this.routeid + '/Dashboard/']);
            }, 100);
        })
      },
    );
  }

  countStars(news: any){
    let arr = [];
    let number = news.rating / news.ratingQty;
    for (let i = 0; i < number; i++) {
      arr[i] = i;
    }
    return arr;
  }

  public rated = false;
  checkRated() {
    this.service.getAllStudents()
      .subscribe(
        response => {
          this.students = response;
          this.students.forEach(student => {
            if(student.id === Number(this.routeid)){
                if(this.news.usersTeachersRateIDs){
                  let usersRateIDs = this.news.usersTeachersRateIDs.split(',');
                  usersRateIDs.pop();
                  for (let i = 0; i < usersRateIDs.length; i++) {
                    let id = usersRateIDs[0];
                    if(Number(id) == student.id){
                      this.rated = true;
                      break;
                    } else {
                      this.rated = false;
                    }
                  }
                }
            }
          });
        }
      );
  }

  rateNews(value: any){
    this.news.rating += Number(value);
    this.news.ratingQty += 1;
    this.news.usersTeachersRateIDs += this.routeid + ',';
    this.service.updateNews(this.newsid, this.news)
        .subscribe(
          response => {
            setTimeout(() => {
              this.rated = true;
            }, 100);
        })
  }
}
