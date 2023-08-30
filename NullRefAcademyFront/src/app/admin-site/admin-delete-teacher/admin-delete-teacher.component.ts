import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { News } from 'src/app/models/news.model';
import { Section } from 'src/app/models/section.model';
import { Teacher } from 'src/app/models/teacher.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-delete-teacher',
  templateUrl: './admin-delete-teacher.component.html',
  styleUrls: ['./admin-delete-teacher.component.css']
})
export class AdminDeleteTeacherComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  teacherid!: number;
  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

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

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
      console.log('idAdmin: ' + params['id2']);
      this.teacherid = params['id2'];
    });

    this.getTeacher();
    this.getArticlesOfTeacher();
    this.getCategoriesOfTeacher();
    this.getCoursesOfTeacher();
    this.getSectionsOfTeacher();

    this.getEnrolledArticlesOfTeacher();
    this.getEnrolledNewsOfTeacher();
  }
  
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getTeacher() {
    this.service.getTeacher(this.teacherid)
    .subscribe(
      response => {
        console.log('Teacher');
        this.teacher = response;
        console.log(this.teacher);
      }
    );
  }

  onSubmit() {
    this.service.deleteTeacher(this.teacherid)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/Admin/' + this.routeid + '/Teachers']);
      }
    )
  }

  //Get articles of this teacher.. 
  articlesText: string = '';
  articles1: Article[] = [];
  inArticles1: boolean = false;

  getArticlesOfTeacher() {
    this.service.getAllArticles()
    .subscribe(
      response => {
        this.articles1 = response;
        this.articles1.forEach(article => { 
          if(article.teacherID == this.teacherid){
            this.inArticles1 = true;
            this.articlesText += "Id:" + article.id + " " + "Title:" + article.title + "\n";
          }
        });
        if(!this.inArticles1){
          this.articlesText += "This teacher has no articles.";
        }
      }
    );
  }

  //Get categories of this teacher.. 
  categoriesText: string = '';
  categories: Category[] = [];
  inCategorires: boolean = false;

  getCategoriesOfTeacher() {
    this.service.getAllCategories()
    .subscribe(
      response => {
        console.log('Categories');
        this.categories = response;
        this.categories.forEach(category => { 
          if(category.teacherID == this.teacherid){
            this.inCategorires = true;
            this.categoriesText += "Id:" + category.id + " " + "Title:" + category.title + "\n";
          }
        });
        if(!this.inCategorires){
          this.categoriesText += "This teacher has no categories.";
        }
      }
    );
  }

  //Get courses of this teacher.. 
  coursesText: string = '';
  courses: Course[] = [];
  inCourses: boolean = false;

  getCoursesOfTeacher() {
    this.service.getAllCourses()
    .subscribe(
      response => {
        console.log('Courses');
        this.courses = response;
        this.courses.forEach(course => {
          if(course.teacherID == this.teacherid){
            this.inCourses = true;
            this.coursesText += "Id:" + course.id + " " + "Title:" + course.title + "\n";
          }
        });
        if(!this.inCourses){
          this.coursesText += "This teacher has no courses.";
        }
      }
    );
  }

  //Get sections of this teacher.. 
  sectionsText: string = '';
  sections: Section[] = [];
  inSections: boolean = false;

  getSectionsOfTeacher() {
    this.service.getAllSections()
    .subscribe(
      response => {
        console.log('Sections');
        this.sections = response;
        this.sections.forEach(section => {
          if(section.teacherID == this.teacherid){
            this.inSections = true;
            this.sectionsText += "Id:" + section.id + " " + "Title:" + section.title + "\n";
          }
        });
        if(!this.inSections){
          this.sectionsText += "This teacher has no sections.";
        }
      }
    );
  }

  //Get enrolled articles of this teacher.. 
  enrolledArticlesText: string = '';
  articles: Article[] = [];
  inArticles: boolean = false;
  array2: string[] = [];
  articleArray: string[] = [];
  articleid: number = 0;

  getEnrolledArticlesOfTeacher() {
    this.service.getAllArticles()
    .subscribe(
      response => {
        this.articles = response;
        if (this.articles != null) {
          if(!this.teacher.articleIDs){
            this.enrolledArticlesText += "This teacher no enrolled in any articles.";
          }
            this.array2 = this.teacher.articleIDs.split(',');
            this.removeNull(this.array2);
            for (let i = 0; i < this.array2.length; i++) {
              this.articleArray = this.array2[i].split('=');
              this.removeNull(this.articleArray);
              this.articleid = parseInt(this.articleArray[0]);
              this.articles.forEach(article => {
                if (this.articleid == article.id) {
                  this.inArticles = true;
                  this.enrolledArticlesText += "Id:" + article.id + " " + "Title:" + article.title + "\n";
                }
              });
            }
        }
        if(!this.inArticles){
          this.enrolledArticlesText += "This teacher no enrolled in any article.";
        }
      }
    );
  }

  //Get enrolled news of this teacher.. 
  enrolledNewsText: string = '';
  news: News[] = [];
  inNews: boolean = false;
  array3: string[] = [];
  newsArray: string[] = [];
  newsid: number = 0;

  getEnrolledNewsOfTeacher() {
    this.service.getAllNews()
    .subscribe(
      response => {
        this.news = response;
        if (this.news != null) {
          if(!this.teacher.newsIDs){
            this.enrolledNewsText += "This teacher no enrolled in any news.";
          }
            this.array3 = this.teacher.newsIDs.split(',');
            this.removeNull(this.array3);
            for (let i = 0; i < this.array3.length; i++) {
              this.newsArray = this.array3[i].split('=');
              this.removeNull(this.newsArray);
              this.newsid = parseInt(this.newsArray[0]);
              this.news.forEach(news => {
                if (this.newsid == news.id) {
                  this.inNews = true;
                  this.enrolledNewsText += "Id:" + news.id + " " + "Title:" + news.title + "\n";
                }
              });
            }
        }
        if(!this.inNews){
          this.enrolledNewsText += "This teacher no enrolled in any news.";
        }
      }
    );
  }

  removeNull(array: string[]) {
    return array.filter(x => x !== null)
  };
}
