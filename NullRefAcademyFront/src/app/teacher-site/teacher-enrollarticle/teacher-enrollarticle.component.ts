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
import { TeacherApiService } from 'src/app/services/teacher-api.service';

@Component({
  selector: 'app-teacher-enrollarticle',
  templateUrl: './teacher-enrollarticle.component.html',
  styleUrls: ['./teacher-enrollarticle.component.css']
})
export class TeacherEnrollArticleComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  articleid!: number;
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

    this.getTeacher();
    this.getArticle();
    this.getAllArticles();

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
  checkFinish() {
    this.service.getAllTeachers()
      .subscribe(
        response => {
          console.log('a')
          this.teachers = response;
          this.teachers.forEach(teacher => {
            if(teacher.id === Number(this.routeid)){
                let articleIDs = teacher.articleIDs.split(',')
                articleIDs.pop();
                for (let i = 0; i < articleIDs.length; i++) {
                  let arr = articleIDs[i].split('=');
                  let id = arr[0];
                  let isFinish = arr[1];
                  if(Number(id) == this.articleid){
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
        let articlesIDs = this.teacher.articleIDs.split(',')
        articlesIDs.pop();
        for (let i = 0; i < articlesIDs.length; i++) {
          let arr = articlesIDs[i].split('=');
          let id = arr[0];
          let date = arr[2];
          let finishDate = formatDate(Date.now(), 'dd/MM/YYYY', 'en-US').toString();
          if(Number(id) == this.articleid){
            this.result += id + '=' + "1" + '=' + date + '=' + finishDate;
            this.teacher.articleIDs = this.teacher.articleIDs.replace(articlesIDs[i], this.result)
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

  countStars(article: any){
    let arr = [];
    let number = article.rating / article.ratingQty;
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
                if(this.article.usersTeachersRateIDs){
                  let usersRateIDs = this.article.usersTeachersRateIDs.split(',');
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

  rateArticle(value: any){
    this.article.rating += Number(value);
    this.article.ratingQty += 1;
    this.article.usersTeachersRateIDs += this.routeid + ',';
    this.service.updateArticle(this.articleid, this.article)
        .subscribe(
          response => {
            setTimeout(() => {
              this.rated = true;
            }, 100);
        })
  }
}
