import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Article } from 'src/app/models/article.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { Teacher } from 'src/app/models/teacher.model';
import { StudentApiService } from 'src/app/services/student-api.service';
import { TeacherApiService } from 'src/app/services/teacher-api.service';

@Component({
  selector: 'app-teacher-article',
  templateUrl: './teacher-article.component.html',
  styleUrls: ['./teacher-article.component.css']
})
export class TeacherArticleComponent implements OnInit {

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
    videoUrl: '',
    createdDate: '',
    teacherID: 0,
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
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
      this.articleid = params['id2'];
      console.log('articleidd:' + this.articleid)
    });

    this.getAllAdmins();
    this.getAllTeachers();
    this.getAllCategories();
    this.getAllCourses();
    this.getAllSections();
    this.getAllArticles();

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

  public enroll = true;
  public preview = false;
  checkEnrollPreview() {
    this.service.getAllArticles()
      .subscribe(
        response => {
          this.articles = response;
          this.articles.forEach(article => {
            if(article.id === Number(this.articleid)){
                let teacherIDs = article.teachersIDs.split(',');
                teacherIDs.pop();
                teacherIDs.forEach(teacherID => {
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
        this.teacher.articleIDs += this.articleid + '=' + '0' + '=' + date + ',';
        this.service.updateTeacher(this.routeid, this.teacher)
        .subscribe(
          response => {
        })

        this.service.getArticle(this.articleid)
        .subscribe(
          response => {
            this.article = response;
            this.article.teachersIDs += this.routeid + ',';

            this.service.updateArticle(this.articleid, this.article)
              .subscribe(
                response => {
                  setTimeout(() => {
                    this.router.navigate(['/Teacher/' + this.routeid + '/Article/' + this.articleid + '/Enroll']);
                  }, 100);
              })
          })
      },
    );
  }
}
