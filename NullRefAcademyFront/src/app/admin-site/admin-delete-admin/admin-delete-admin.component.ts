import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Article } from 'src/app/models/article.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { News } from 'src/app/models/news.model';
import { Section } from 'src/app/models/section.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-delete-admin',
  templateUrl: './admin-delete-admin.component.html',
  styleUrls: ['./admin-delete-admin.component.css']
})
export class AdminDeleteAdminComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  adminid!: number;
  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  admin: Admin = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    accountType: '',
    password: '',
    confirmPassword: '',
    createdDate: ''
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
      console.log('idAdmin: ' + params['id2']);
      this.adminid = params['id2'];
    });
    
    this.getAdmin();
    this.getArticlesOfAdmin();
    this.getNewsOfAdmin();
    this.getCategoriesOfAdmin();
    this.getCoursesOfAdmin();
    this.getSectionsOfAdmin();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getAdmin() {
    this.service.getAdmin(this.adminid)
    .subscribe(
      response => {
        console.log('Admin');
        this.admin = response;
        console.log(this.admin);
      }
    );
  }

  onSubmit() {
    this.service.deleteAdmin(this.adminid)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/Admin/' + this.routeid + '/Admins']);
      }
    )
  }

  //Get categories of this admin.. 
  articlesText: string = '';
  articles: Article[] = [];
  inArticles: boolean = false;

  getArticlesOfAdmin() {
    this.service.getAllArticles()
    .subscribe(
      response => {
        this.articles = response;
        this.articles.forEach(article => { 
          if(article.adminID == this.adminid){
            this.inArticles = true;
            this.articlesText += "Id:" + article.id + " " + "Title:" + article.title + "\n";
          }
        });
        if(!this.inArticles){
          this.articlesText += "This admin has no articles.";
        }
      }
    );
  }

  //Get news of this admin.. 
  newsText: string = '';
  news: News[] = [];
  inNews: boolean = false;

  getNewsOfAdmin() {
    this.service.getAllNews()
    .subscribe(
      response => {
        this.news = response;
        this.news.forEach(news => { 
          if(news.adminID == this.adminid){
            this.inNews = true;
            this.newsText += "Id:" + news.id + " " + "Title:" + news.title + "\n";
          }
        });
        if(!this.inNews){
          this.newsText += "This admin has no news.";
        }
      }
    );
  }

  //Get categories of this admin.. 
  categoriesText: string = '';
  categories: Category[] = [];
  inCategorires: boolean = false;

  getCategoriesOfAdmin() {
    this.service.getAllCategories()
    .subscribe(
      response => {
        console.log('Categories');
        this.categories = response;
        this.categories.forEach(category => { 
          if(category.adminID == this.adminid){
            this.inCategorires = true;
            this.categoriesText += "Id:" + category.id + " " + "Title:" + category.title + "\n";
          }
        });
        if(!this.inCategorires){
          this.categoriesText += "This admin has no categories.";
        }
      }
    );
  }

  //Get courses of this admin.. 
  coursesText: string = '';
  courses: Course[] = [];
  inCourses: boolean = false;

  getCoursesOfAdmin() {
    this.service.getAllCourses()
    .subscribe(
      response => {
        console.log('Courses');
        this.courses = response;
        this.courses.forEach(course => {
          if(course.adminID == this.adminid){
            this.inCourses = true;
            this.coursesText += "Id:" + course.id + " " + "Title:" + course.title + "\n";
          }
        });
        if(!this.inCourses){
          this.coursesText += "This admin has no courses.";
        }
      }
    );
  }

  //Get sections of this admin.. 
  sectionsText: string = '';
  sections: Section[] = [];
  inSections: boolean = false;

  getSectionsOfAdmin() {
    this.service.getAllSections()
    .subscribe(
      response => {
        console.log('Sections');
        this.sections = response;
        this.sections.forEach(section => {
          if(section.adminID == this.adminid){
            this.inSections = true;
            this.sectionsText += "Id:" + section.id + " " + "Title:" + section.title + "\n";
          }
        });
        if(!this.inSections){
          this.sectionsText += "This admin has no sections.";
        }
      }
    );
  }
}
