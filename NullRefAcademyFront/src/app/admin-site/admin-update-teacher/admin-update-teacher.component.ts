import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { Teacher } from 'src/app/models/teacher.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-update-teacher',
  templateUrl: './admin-update-teacher.component.html',
  styleUrls: ['./admin-update-teacher.component.css']
})
export class AdminUpdateTeacherComponent implements OnInit {
  @ViewChild('passwordInput', {static:true}) public passwordInput!: ElementRef;
  @ViewChild('confirmPasswordInput', {static:true}) public confirmPasswordInput!: ElementRef;
  
  public routeSub!: Subscription;
  public routeid!: number;
  public teacherid!: number;

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

  takenTeacher: Teacher = {
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

  teacher: Teacher = {
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
      this.teacherid = params['id2'];
    });

    this.getTeacher();
    this.getCategoriesOfTeacher();
    this.getCoursesOfTeacher();
    this.getSectionsOfTeacher();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getTeacher() {
    this.service.getTeacher(this.teacherid)
    .subscribe(
      response => {
        this.takenTeacher = response;
      }
    );
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
    this.service.updateTeacher(this.teacherid, this.takenTeacher)
    .subscribe(
      response => {
        this.router.navigate(['/Admin/' + this.routeid + '/Teachers']);
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
}
