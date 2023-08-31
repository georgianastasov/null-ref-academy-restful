import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { Course } from 'src/app/models/course.model';
import { News } from 'src/app/models/news.model';
import { Student } from 'src/app/models/student.model';
import { StudentApiService } from 'src/app/services/student-api.service';

@Component({
  selector: 'app-student-settings',
  templateUrl: './student-settings.component.html',
  styleUrls: ['./student-settings.component.css']
})
export class StudentSettingsComponent implements OnInit {
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

  public hasErrorBio: boolean = false;

  public hasErrorPassword: boolean = false;
  public hasErrorPasswordRequired: boolean = false;
  public hasErrorPasswordRegex: boolean = false;

  public hasErrorConfirmPassword: boolean = false; 
  public hasErrorConfirmPasswordRequired: boolean = false;
  public hasErrorConfirmPasswordNotSame: boolean = false;

  public submited = false;

  private regExpEmail = new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}', 'g');
  private regExpPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$', 'g');

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

  editStudent: Student = {
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
      this.routeid = params['id'];
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
    this.service.getStudent(this.routeid)
      .subscribe(
        response => {
          this.student = response;
        }
      );
  }

  onSubmit() {
    this.populate();
    this.submited = true;
    //email
    let matchEmail = this.regExpEmail.test(this.student.email);
    if(!matchEmail){
      this.hasErrorEmail = true;
      this.hasErrorEmailRegex = true;
    } else {
      this.hasErrorEmail = false;
      this.hasErrorEmailRegex = false;
    }
    //password
    let matchPassword = this.regExpPassword.test(this.student.password);
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
    this.service.updateStudent(this.routeid, this.student)
    .subscribe(
      response => {
        this.router.navigate(['/Student/' + this.routeid + '/Dashboard']);
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
    if (this.editStudent.firstName != '') {
      this.student.firstName = this.editStudent.firstName;
    }
    if (this.editStudent.lastName != '') {
      this.student.lastName = this.editStudent.lastName;
    }
    if (this.editStudent.username != '') {
      this.student.username = this.editStudent.username;
    }
    if (this.editStudent.email != '') {
      this.student.email = this.editStudent.email;
    }
    if (this.editStudent.password != '') {
      this.student.password = this.editStudent.password;
    }
    if (this.editStudent.confirmPassword != '') {
      this.student.confirmPassword = this.editStudent.confirmPassword;
    }
    if (this.editStudent.bio != '') {
      this.student.bio = this.editStudent.bio;
    }
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
          this.coursesText += "You not enrolled in any course yet.";
        }
      }
    );
  }

  removeNull(array: string[]) {
    return array.filter(x => x !== null)
  };

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
          if(!this.student.articleIDs){
            this.articlesText += "You not enrolled in any article yet.";
          }
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
          this.articlesText += "You not enrolled in any article yet.";
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
          if(!this.student.newsIDs){
            this.newsText += "You not enrolled in any news yet.";
          }
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
          this.newsText += "You not enrolled in any news yet.";
        }
      }
    );
  }
}
