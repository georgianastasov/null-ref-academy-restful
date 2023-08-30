import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { Course } from 'src/app/models/course.model';
import { News } from 'src/app/models/news.model';
import { Student } from 'src/app/models/student.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-delete-student',
  templateUrl: './admin-delete-student.component.html',
  styleUrls: ['./admin-delete-student.component.css']
})
export class AdminDeleteStudentComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  studentid!: number;
  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

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

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
      console.log('idAdmin: ' + params['id2']);
      this.studentid = params['id2'];
    });
    
    this.getStudent();
    this.getCoursesOfStudent();
    this.getArticlesOfStudent();
    this.getNewsOfStudent();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getStudent() {
    this.service.getStudent(this.studentid)
    .subscribe(
      response => {
        console.log('Student');
        this.student = response;
        console.log(this.student);
      }
    );
  }

  onSubmit() {
    this.service.deleteStudent(this.studentid)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/Admin/' + this.routeid + '/Students']);
      }
    )
  }

    //Get courses of this student.. 
    coursesText: string = '';
    courses: Course[] = [];
    inCourses: boolean = false;
    array: string[] = [];
    courseArray: string[] = [];
    courseid: number = 0;
  
    getCoursesOfStudent() {
      this.service.getAllCourses()
      .subscribe(
        response => {
          console.log('Courses');
          this.courses = response;
          if (this.courses != null) {
              this.array = this.student.coursesIDs.split(',');
              this.removeNull(this.array);
              for (let i = 0; i < this.array.length; i++) {
                this.courseArray = this.array[i].split('=');
                this.removeNull(this.courseArray);
                this.courseid = parseInt(this.courseArray[0]);
                this.courses.forEach(course => {
                  if (this.courseid == course.id) {
                    this.inCourses = true;
                    this.coursesText += "Id:" + course.id + " " + "Title:" + course.title + "\n";
                  }
                });
              }
          }
          if(!this.inCourses){
            this.coursesText += "This student no enrolled in any course.";
          }
        }
      );
    }

    //Get articles of this student.. 
    articlesText: string = '';
    articles: Article[] = [];
    inArticles: boolean = false;
    array2: string[] = [];
    articleArray: string[] = [];
    articleid: number = 0;
  
    getArticlesOfStudent() {
      this.service.getAllArticles()
      .subscribe(
        response => {
          this.articles = response;
          if (this.articles != null) {
              this.array2 = this.student.articleIDs.split(',');
              this.removeNull(this.array2);
              for (let i = 0; i < this.array2.length; i++) {
                this.articleArray = this.array2[i].split('=');
                this.removeNull(this.articleArray);
                this.articleid = parseInt(this.articleArray[0]);
                this.articles.forEach(article => {
                  if (this.articleid == article.id) {
                    this.inArticles = true;
                    this.articlesText += "Id:" + article.id + " " + "Title:" + article.title + "\n";
                  }
                });
              }
          }
          if(!this.inArticles){
            this.articlesText += "This student no enrolled in any article.";
          }
        }
      );
    }

    //Get news of this student.. 
    newsText: string = '';
    news: News[] = [];
    inNews: boolean = false;
    array3: string[] = [];
    newsArray: string[] = [];
    newsid: number = 0;
  
    getNewsOfStudent() {
      this.service.getAllNews()
      .subscribe(
        response => {
          this.news = response;
          if (this.news != null) {
              this.array3 = this.student.newsIDs.split(',');
              this.removeNull(this.array3);
              for (let i = 0; i < this.array3.length; i++) {
                this.newsArray = this.array3[i].split('=');
                this.removeNull(this.newsArray);
                this.newsid = parseInt(this.newsArray[0]);
                this.news.forEach(news => {
                  if (this.newsid == news.id) {
                    this.inNews = true;
                    this.newsText += "Id:" + news.id + " " + "Title:" + news.title + "\n";
                  }
                });
              }
          }
          if(!this.inNews){
            this.newsText += "This student no enrolled in any news.";
          }
        }
      );
    }

    removeNull(array: string[]) {
      return array.filter(x => x !== null)
    };
  }


