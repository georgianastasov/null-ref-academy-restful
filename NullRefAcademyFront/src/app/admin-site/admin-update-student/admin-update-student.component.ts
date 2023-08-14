import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { Student } from 'src/app/models/student.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-update-student',
  templateUrl: './admin-update-student.component.html',
  styleUrls: ['./admin-update-student.component.css']
})
export class AdminUpdateStudentComponent implements OnInit {
  @ViewChild('passwordInput', {static:true}) public passwordInput!: ElementRef;
  @ViewChild('confirmPasswordInput', {static:true}) public confirmPasswordInput!: ElementRef;
  
  public routeSub!: Subscription;
  public routeid!: number;
  public studentid!: number;
  public nullfield!: number;

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

  public hasErrorPoints = false;
  public hasErrorPointsValue: boolean = false;

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

  takenStudent: Student = {
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
    coursesIDs: ''
  }

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
    coursesIDs: ''
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
      this.studentid = params['id2'];
    });

    this.getStudent();
    this.getCoursesOfStudent();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getStudent() {
    this.service.getStudent(this.studentid)
    .subscribe(
      response => {
        this.takenStudent = response;
        console.log(this.takenStudent);
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
    //points
    if(this.student.points < 1 || this.student.points === this.nullfield){
      this.hasErrorPoints = true;
      this.hasErrorPointsValue = true;
    } else {
      this.hasErrorPoints = false;
      this.hasErrorPointsValue = false;
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
    this.service.updateStudent(this.studentid, this.takenStudent)
    .subscribe(
      response => {
        this.router.navigate(['/Admin/' + this.routeid + '/Students']);
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
    if (this.student.firstName != '') {
      this.takenStudent.firstName = this.student.firstName;
    }
    if (this.student.lastName != '') {
      this.takenStudent.lastName = this.student.lastName;
    }
    if (this.student.username != '') {
      this.takenStudent.username = this.student.username;
    }
    if (this.student.email != '') {
      this.takenStudent.email = this.student.email;
    }
    if (this.student.password != '') {
      this.takenStudent.password = this.student.password;
    }
    if (this.student.confirmPassword != '') {
      this.takenStudent.confirmPassword = this.student.confirmPassword;
    }
    if (this.student.points != 0) {
      this.takenStudent.points = this.student.points;
    }
    if (this.student.progress != 0) {
      this.takenStudent.progress = this.student.progress;
    }
    if (this.student.bio != '') {
      this.takenStudent.bio = this.student.bio;
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
            this.array = this.takenStudent.coursesIDs.split(',');
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

  removeNull(array: string[]) {
    return array.filter(x => x !== null)
  };
}
