import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { News } from 'src/app/models/news.model';
import { Section } from 'src/app/models/section.model';
import { Teacher } from 'src/app/models/teacher.model';
import { TeacherApiService } from 'src/app/services/teacher-api.service';

@Component({
  selector: 'app-teacher-settings',
  templateUrl: './teacher-settings.component.html',
  styleUrls: ['./teacher-settings.component.css']
})
export class TeacherSettingsComponent implements OnInit {
  @ViewChild('passwordInput', {static:true}) public passwordInput!: ElementRef;
  @ViewChild('confirmPasswordInput', {static:true}) public confirmPasswordInput!: ElementRef;

  public routeSub!: Subscription;
  public routeid!: number;

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

  takenTeacher: Teacher = {
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

  categories: Category[] = [];
  courses: Course[] = [];
  sections: Section[] = [];
  articles: Article[] = [];

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
    });

    this.getTeacher();

    this.getArticlesOfTeacher();
    this.getCategoriesOfTeacher();
    this.getCoursesOfTeacher();
    this.getSectionsOfTeacher();

    this.getCountCategories();
    this.getCountCourses();
    this.getCountSections();
    this.getCountArticles();

    this.getEnrolledArticlesOfTeacher();
    this.getEnrolledNewsOfTeacher();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onSubmit() {
    this.populate();
    this.submited = true;
    //email
    let matchEmail = this.regExpEmail.test(this.teacher.email);
    if(!matchEmail){
      this.hasErrorEmail = true;
      this.hasErrorEmailRegex = true;
    } else {
      this.hasErrorEmail = false;
      this.hasErrorEmailRegex = false;
    }
    //password
    let matchPassword = this.regExpPassword.test(this.teacher.password);
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
    this.service.updateTeacher(this.routeid, this.takenTeacher)
    .subscribe(
      response => {
        this.router.navigate(['/Teacher/' + this.routeid + '/Dashboard']);
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
    if (this.teacher.firstName != '') {
      this.takenTeacher.firstName = this.teacher.firstName;
    }
    if (this.teacher.lastName != '') {
      this.takenTeacher.lastName = this.teacher.lastName;
    }
    if (this.teacher.username != '') {
      this.takenTeacher.username = this.teacher.username;
    }
    if (this.teacher.email != '') {
      this.takenTeacher.email = this.teacher.email;
    }
    if (this.teacher.password != '') {
      this.takenTeacher.password = this.teacher.password;
    }
    if (this.teacher.confirmPassword != '') {
      this.takenTeacher.confirmPassword = this.teacher.confirmPassword;
    }
  }

  getTeacher() {
    this.service.getTeacher(this.routeid)
      .subscribe(
        response => {
          this.takenTeacher = response;
        }
      );
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
          if(article.teacherID == this.routeid){
            this.inArticles1 = true;
            this.articlesText += "Id:" + article.id + " " + "Title:" + article.title + "\n";
          }
        });
        if(!this.inArticles1){
          this.articlesText += "You have no articles.";
        }
      }
    );
  }

  //Get categories of this teacher.. 
  categoriesText: string = '';
  categories2: Category[] = [];
  inCategorires: boolean = false;

  getCategoriesOfTeacher() {
    this.service.getAllCategories()
    .subscribe(
      response => {
        console.log('Categories');
        this.categories2 = response;
        this.categories2.forEach(category => { 
          if(category.teacherID == this.routeid){
            this.inCategorires = true;
            this.categoriesText += "Id:" + category.id + " " + "Title:" + category.title + "\n";
          }
        });
        if(!this.inCategorires){
          this.categoriesText += "You have no categories.";
        }
      }
    );
  }

  //Get courses of this teacher.. 
  coursesText: string = '';
  courses2: Course[] = [];
  inCourses: boolean = false;

  getCoursesOfTeacher() {
    this.service.getAllCourses()
    .subscribe(
      response => {
        console.log('Courses');
        this.courses2 = response;
        this.courses2.forEach(course => {
          if(course.teacherID == this.routeid){
            this.inCourses = true;
            this.coursesText += "Id:" + course.id + " " + "Title:" + course.title + "\n";
          }
        });
        if(!this.inCourses){
          this.coursesText += "You have no courses.";
        }
      }
    );
  }

  //Get sections of this teacher.. 
  sectionsText: string = '';
  sections2: Section[] = [];
  inSections: boolean = false;

  getSectionsOfTeacher() {
    this.service.getAllSections()
    .subscribe(
      response => {
        console.log('Sections');
        this.sections2 = response;
        this.sections2.forEach(section => {
          if(section.teacherID == this.routeid){
            this.inSections = true;
            this.sectionsText += "Id:" + section.id + " " + "Title:" + section.title + "\n";
          }
        });
        if(!this.inSections){
          this.sectionsText += "You have no sections.";
        }
      }
    );
  }

  countCategories: number = 0;
  getCountCategories() {
    this.service.getAllCategories()
      .subscribe(
        response => {
          this.categories = response;
          this.categories.forEach(category => {
            if (category.teacherID != null) {
              if (category.teacherID == this.routeid) {
                this.countCategories++;
              }
            }
          });
        }
      );
  }

  countCourses: number = 0;
  getCountCourses() {
    this.service.getAllCourses()
      .subscribe(
        response => {
          this.courses = response;
          this.courses.forEach(course => {
            if (course.teacherID != null) {
              if (course.teacherID == this.routeid) {
                this.countCourses++;
              }
            }
          });
        }
      );
  }

  countSections: number = 0;
  getCountSections() {
    this.service.getAllSections()
      .subscribe(
        response => {
          this.sections = response;
          this.sections.forEach(section => {
            if (section.teacherID != null) {
              if (section.teacherID == this.routeid) {
                this.countSections++;
              }
            }
          });
        }
      );
  }

  countArticles: number = 0;
  getCountArticles() {
    this.service.getAllArticles()
      .subscribe(
        response => {
          this.articles = response;
          this.articles.forEach(article => {
            if (article.teacherID != null) {
              if (article.teacherID == this.routeid) {
                this.countArticles++;
              }
            }
          });
        }
      );
  }

  //Get enrolled articles of this teacher.. 
  enrolledArticlesText: string = '';
  articles2: Article[] = [];
  inArticles: boolean = false;
  array2: string[] = [];
  articleArray: string[] = [];
  articleid: number = 0;

  getEnrolledArticlesOfTeacher() {
    this.service.getAllArticles()
    .subscribe(
      response => {
        this.articles2 = response;
        if (this.articles2 != null) {
            this.array2 = this.teacher.articleIDs.split(',');
            this.removeNull(this.array2);
            for (let i = 0; i < this.array2.length; i++) {
              this.articleArray = this.array2[i].split('=');
              this.removeNull(this.articleArray);
              this.articleid = parseInt(this.articleArray[0]);
              this.articles2.forEach(article => {
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
