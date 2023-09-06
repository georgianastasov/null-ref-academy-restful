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
import { Teacher } from 'src/app/models/teacher.model';
import { StudentApiService } from 'src/app/services/student-api.service';
import { TeacherApiService } from 'src/app/services/teacher-api.service';

@Component({
  selector: 'app-teacher-news',
  templateUrl: './teacher-news.component.html',
  styleUrls: ['./teacher-news.component.css']
})
export class TeacherNewsComponent implements OnInit {

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
    videoUrl: '',
    createdDate: '',
    adminID: 0,
    studentsIDs: '',
    teachersIDs: '',
    usersStudentsRateIDs: '',
    usersTeachersRateIDs: ''
  }

  admins: Admin[] = [];
  teachers: Teacher[] = [];
  categories: Category[] = [];
  courses: Course[] = [];
  sections: Section[] = [];
  articles: Article[] = [];
  newss: News[] = [];
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
      this.newsid = params['id2'];
      console.log('newsidd:' + this.newsid)
    });

    this.getAllAdmins();
    this.getAllTeachers();
    this.getAllCategories();
    this.getAllCourses();
    this.getAllSections();
    this.getAllArticles();
    this.getAllNews();

    this.checkEnrollPreview();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
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

  getAllCategories() {
    this.service.getAllCategories()
      .subscribe(
        response => {
          this.categories = response;
        }
      );
  }

  getAllCourses() {
    this.service.getAllCourses()
      .subscribe(
        response => {
          this.courses = response;
        }
      );
  }

  getAllSections() {
    this.service.getAllSections()
      .subscribe(
        response => {
          this.sections = response;
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

  getAllNews() {
    this.service.getAllNews()
      .subscribe(
        response => {
          this.newss = response;
        }
      );
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
                let teachersIDs = news.teachersIDs.split(',');
                teachersIDs.pop();
                teachersIDs.forEach(teacherID => {
                  if(Number(teacherID) == this.routeid){
                    this.preview = true;
                    this.enroll = false;
                  }
                });
            }
          });
        }
      );
  }

  enrollTeacher(){
    this.service.getTeacher(this.routeid)
    .subscribe(
      response => {
        this.teacher = response;
        var date = formatDate(Date.now(), 'dd/MM/YYYY', 'en-US').toString();
        this.teacher.newsIDs += this.newsid + '=' + '0' + '=' + date + ',';
        this.service.updateTeacher(this.routeid, this.teacher)
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
                    this.router.navigate(['/Teacher/' + this.routeid + '/News/' + this.newsid + '/Enroll']);
                  }, 100);
              })
          })
      },
    );
  }
}
