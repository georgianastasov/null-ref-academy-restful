import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Article } from 'src/app/models/article.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { News } from 'src/app/models/news.model';
import { Section } from 'src/app/models/section.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-update-admin',
  templateUrl: './admin-update-admin.component.html',
  styleUrls: ['./admin-update-admin.component.css']
})
export class AdminUpdateAdminComponent implements OnInit {
  @ViewChild('passwordInput', {static:true}) public passwordInput!: ElementRef;
  @ViewChild('confirmPasswordInput', {static:true}) public confirmPasswordInput!: ElementRef;
  
  public routeSub!: Subscription;
  public routeid!: number;
  public adminid!: number;

  public hasErrorFirstName = false;
  public hasErrorFirstNameRequired: boolean = false;
  public hasErrorFirstNameLength: boolean = false;

  public hasErrorLastName = false;
  public hasErrorLastNameRequired: boolean = false;
  public hasErrorLastNameLength: boolean = false;

  public hasErrorUsername = false;
  public hasErrorUsernameRequired: boolean = false;
  public hasErrorUsernameLength: boolean = false;
  
  public hasErrorEmail: boolean = false;
  public hasErrorEmailRequired: boolean = false;
  public hasErrorEmailRegex: boolean = false;

  public hasErrorPassword: boolean = false;
  public hasErrorPasswordRequired: boolean = false;
  public hasErrorPasswordRegex: boolean = false;

  public hasErrorConfirmPassword: boolean = false; 
  public hasErrorConfirmPasswordRequired: boolean = false;
  public hasErrorConfirmPasswordNotSame: boolean = false;

  public submited = false;

  private regExpEmail = new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}', 'g');
  private regExpPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$', 'g');

  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  takenAdmin: Admin = {
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
      this.routeid = params['id'];
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
        this.takenAdmin = response;
        console.log(this.takenAdmin);
      }
    );
  }

  onSubmit() {
    this.populate();
    this.submited = true;
    //email
    let matchEmail = this.regExpEmail.test(this.admin.email);
    if(!matchEmail){
      this.hasErrorEmail = true;
      this.hasErrorEmailRegex = true;
    } else {
      this.hasErrorEmail = false;
      this.hasErrorEmailRegex = false;
    }
    //password
    let matchPassword = this.regExpPassword.test(this.admin.password);
    if(!matchPassword){
      this.hasErrorPassword = true;
      this.hasErrorPasswordRegex = true;
    } else {
      this.hasErrorPassword = false;
      this.hasErrorPasswordRegex = false;
    }
    //confirm password
    if (this.passwordInput.nativeElement.value !== this.confirmPasswordInput.nativeElement.value) {
      this.hasErrorConfirmPassword = true;
      this.hasErrorConfirmPasswordNotSame = true;
    } else {
      this.hasErrorConfirmPassword = false;
      this.hasErrorConfirmPasswordNotSame = false;
    }
    this.service.updateAdmin(this.adminid, this.takenAdmin)
    .subscribe(
      response => {
        this.router.navigate(['/Admin/' + this.routeid + '/Admins']);
      }, 
      error => {
        let theError = error.error.errors;
        if (theError != null) {
          //first name
          if (theError.FirstName != null) {
            this.hasErrorFirstName = true;
            if(theError.FirstName[0]){
              this.hasErrorFirstNameRequired = true;
            } else {
              this.hasErrorFirstNameLength = false;
            }
            if(theError.FirstName[1]){
              this.hasErrorFirstNameLength = true;
            } else {
              this.hasErrorFirstNameRequired = false;
            }
          } else {
            this.hasErrorFirstName = false;
            this.hasErrorFirstNameRequired = false;
            this.hasErrorFirstNameLength = false;
          }
          //last name
          if (theError.LastName != null) {
            this.hasErrorLastName = true;
            if(theError.LastName[0]){
              this.hasErrorLastNameRequired = true;
            } else {
              this.hasErrorLastNameLength = false;
            }
            if(theError.LastName[1]){
              this.hasErrorLastNameLength = true;
            } else {
              this.hasErrorLastNameRequired = false;
            }
          } else {
            this.hasErrorLastName = false;
            this.hasErrorLastNameRequired = false;
            this.hasErrorLastNameLength = false;
          }
          //username
          if (theError.Username != null) {
            this.hasErrorUsername = true;
            if(theError.LastName[0]){
              this.hasErrorUsernameRequired = true;
            } else {
              this.hasErrorUsernameLength = false;
            }
            if(theError.LastName[1]){
              this.hasErrorUsernameLength = true;
            } else {
              this.hasErrorUsernameRequired = false;
            }
          } else {
            this.hasErrorUsername = false;
            this.hasErrorUsernameRequired = false;
            this.hasErrorUsernameLength = false;
          }
          //email
          if (theError.Email != null) {
            if(!theError.Email[0].includes('regular')){
              this.hasErrorEmailRequired = true;
            } else {
              this.hasErrorEmailRequired = false;
            }
          } else {
            this.hasErrorEmailRequired = false;
          }
          //password
          if (theError.Password != null) {
            if(!theError.Password[0].includes('regular')){
              this.hasErrorPassword = true;
              this.hasErrorPasswordRequired = true;
            } 
          } else {
            this.hasErrorPassword = false;
            this.hasErrorPasswordRequired = false;
          }
          //confirm password
          if (theError.ConfirmPassword != null) {
            this.hasErrorConfirmPassword = true;
            this.hasErrorConfirmPasswordRequired = true;
          } else {
            this.hasErrorConfirmPassword = false;
            this.hasErrorConfirmPasswordRequired = false;
          }
        }
      }
    )
  }

  populate(){
    if (this.admin.firstName != '') {
      this.takenAdmin.firstName = this.admin.firstName;
    }
    if (this.admin.lastName != '') {
      this.takenAdmin.lastName = this.admin.lastName;
    }
    if (this.admin.username != '') {
      this.takenAdmin.username = this.admin.username;
    }
    if (this.admin.email != '') {
      this.takenAdmin.email = this.admin.email;
    }
    if (this.admin.password != '') {
      this.takenAdmin.password = this.admin.password;
    }
    if (this.admin.confirmPassword != '') {
      this.takenAdmin.confirmPassword = this.admin.confirmPassword;
    }
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
