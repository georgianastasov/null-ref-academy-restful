import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-update-course',
  templateUrl: './admin-update-course.component.html',
  styleUrls: ['./admin-update-course.component.css']
})
export class AdminUpdateCourseComponent implements OnInit {
  public routeSub!: Subscription;
  public routeid!: number;
  public courseid!: number;
  public nullfield!: number;

  public hasErrorTitle = false;
  public hasErrorTitleRequired: boolean = false;
  public hasErrorTitleLength: boolean = false;

  public hasErrorDescription = false;
  public hasErrorDescriptionRequired: boolean = false;
  public hasErrorDescriptionLength: boolean = false;

  public hasErrorPoints = false;
  public hasErrorPointsValue: boolean = false;

  public hasErrorVidoeUrl = false;
  public hasErrorVidoeUrlRegex = false;

  public submited = false;
  
  private regExpVideo = new RegExp('(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?', 'g');

  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  public hasAdmin: boolean = false;
  public hasTeacher: boolean = false;

  takenCourse: Course = {
    id: 0,
    title: '',
    description: '',
    points: 0,
    rating: 0,
    ratingQty: 0,
    videoUrl: '',
    createdDate: '',
    categoryID: 0,
    teacherID: 0,
    adminID: 0,
    studentsIDs: '',
    usersStudentsRateIDs: '',
    usersTeachersRateIDs: ''
  }

  course: Course = {
    id: 0,
    title: '',
    description: '',
    points: 0,
    rating: 0,
    ratingQty: 0,
    videoUrl: '',
    createdDate: '',
    categoryID: 0,
    teacherID: 0,
    adminID: 0,
    studentsIDs: '',
    usersStudentsRateIDs: '',
    usersTeachersRateIDs: ''
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
      this.courseid = params['id2'];
    });

    this.getCourse();
    this.getCourseCategory();
    this.getSectionsInThisCourse();
    this.getCourseAdmin();
    this.getCourseTeacher();
    this.getStudentsOfThisCourse();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getCourse() {
    this.service.getCourse(this.courseid)
    .subscribe(
      response => {
        this.takenCourse = response;
        this.getCourseCategory();
      }
    );
  }

  onSubmit() {
    this.populate();
    this.submited = true;
    //points
    if(this.course.points < 1 || this.course.points === this.nullfield){
      this.hasErrorPoints = true;
      this.hasErrorPointsValue = true;
    } else {
      this.hasErrorPoints = false;
      this.hasErrorPointsValue = false;
    }
    //vidoeurl
    if(this.course.videoUrl != ''){
      let matchVideo = this.regExpVideo.test(this.course.videoUrl);
      if(!matchVideo){
        this.hasErrorVidoeUrl = true;
        this.hasErrorVidoeUrlRegex = true;
      } else {
        this.hasErrorVidoeUrl = false;
        this.hasErrorVidoeUrlRegex = false;
      }
    } else {
      this.hasErrorVidoeUrl = false;
      this.hasErrorVidoeUrlRegex = false;
    }
    this.service.updateCourse(this.courseid, this.takenCourse)
    .subscribe(
      response => {
        this.router.navigate(['/Admin/' + this.routeid + '/Courses']);
      }, 
      error => {
        let theError = error.error.errors;
        if (theError != null) {
          //title
          if (theError.Title != null) {
            this.hasErrorTitle = true;
            if(theError.Title[0]){
              this.hasErrorTitleRequired = true;
            } else {
              this.hasErrorTitleLength = false;
            }
            if(theError.Title[1]){
              this.hasErrorTitleLength = true;
            } else {
              this.hasErrorTitleRequired = false;
            }
          } else {
            this.hasErrorTitle = false;
            this.hasErrorTitleRequired = false;
            this.hasErrorTitleLength = false;
          }
          //descriotion
          if (theError.Description != null) {
            this.hasErrorDescription = true;
            if(theError.Description[0]){
              this.hasErrorDescriptionRequired = true;
            } else {
              this.hasErrorDescriptionLength = false;
            }
            if(theError.Description[1]){
              this.hasErrorDescriptionLength = true;
            } else {
              this.hasErrorDescriptionRequired = false;
            }
          } else {
            this.hasErrorDescription = false;
            this.hasErrorDescriptionRequired = false;
            this.hasErrorDescriptionLength = false;
          }
        }
      }
    )
  }

  populate(){
    if (this.course.title != '') {
      this.takenCourse.title = this.course.title;
    }
    if (this.course.description != '') {
      this.takenCourse.description = this.course.description;
    }
    if (this.course.points != 0) {
      this.takenCourse.points = this.course.points;
    }
    if (this.course.rating != 0) {
      this.takenCourse.rating = this.course.rating;
    }
    if (this.course.ratingQty != 0) {
      this.takenCourse.ratingQty = this.course.ratingQty;
    }
    if (this.course.videoUrl != '') {
      this.takenCourse.videoUrl = this.course.videoUrl;
    }
  }

  //Get students enrolled in this course..
  studentsText: string = '';
  students: Student[] = [];
  inStudent: boolean = false;
  array: string[] = [];
  studentArray: string[] = [];
  studentid: number = 0;

  getStudentsOfThisCourse(){
    this.service.getAllStudents()
    .subscribe(
      response => {
        console.log('Students');
        this.students = response;
        if (this.students != null) {
            this.array = this.takenCourse.studentsIDs.split(',');
            this.removeNull(this.array);
            for (let i = 0; i < this.array.length; i++) {
              this.students.forEach(student => {
                this.studentid = parseInt(this.array[i]);
                if (this.studentid == student.id) {
                  this.inStudent = true;
                  this.studentsText += "Id:" + student.id + " " + "Username:" + student.username + "\n";
                }
              });
            }
        }
        if(!this.inStudent){
          this.studentsText += "This course has no enrolled students.";
        }
      }
    );
  }

  removeNull(array: string[]) {
    return array.filter(x => x !== null)
  };

  //Get category of this course..
  categories: Category[] = [];
  categoryText: string = '';
  inCategory: boolean = false;
  getCourseCategory(){
    this.service.getAllCategories()
    .subscribe(
      response => {
        console.log('Categories');
        this.categories = response;
        this.categories.forEach(category => {
          if (this.takenCourse.categoryID == category.id) {
            this.inCategory = true;
            this.categoryText = "Id:" + category.id + " " + "Title:" + category.title;
          }
        });
        if (!this.inCategory) {
          this.categoryText += "No information.";
        }
      }
    );
  }

  //Get sections in this course..
  sections: Section[] = [];
  sectionsText: string = '';
  inSection: boolean = false;
  getSectionsInThisCourse(){
    this.service.getAllSections()
    .subscribe(
      response => {
        console.log('Sections');
        this.sections = response;
        this.sections.forEach(section => {
          if (section.courseID == this.courseid) {
            this.inSection = true;
            this.sectionsText += "Id:" + section.id + " " + "Title:" + section.title + "\n";
          }
        });
        if (!this.inSection) {
          this.sectionsText += "No sections in this course.";
        }
      }
    );
  }

  //Find creator - admin
  admins: Admin[] = [];
  adminText: string = '';
  getCourseAdmin(){
    this.service.getAllAdmins()
    .subscribe(
      response => {
        console.log('Admins');
        this.admins = response;
        this.admins.forEach(admin => {
          if (this.takenCourse.adminID == admin.id) {
            this.hasAdmin = true;
            this.adminText += "Id:" + admin.id + " " + "Username:" + admin.username;
          }
        });
      }
    );
  }

  //Find creator - teacher
  teachers: Teacher[] = [];
  teacherText: string = '';
  getCourseTeacher(){
    this.service.getAllTeachers()
    .subscribe(
      response => {
        console.log('Teachers');
        this.teachers = response;
        this.teachers.forEach(teacher => {
          if (this.takenCourse.teacherID == teacher.id) {
            this.hasTeacher = true;
            this.teacherText += "Id:" + teacher.id + " " + "Username:" + teacher.username;
          }
        });
      }
    );
  }
}
