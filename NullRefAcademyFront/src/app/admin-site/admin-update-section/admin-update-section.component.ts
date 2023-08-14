import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { Teacher } from 'src/app/models/teacher.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-update-section',
  templateUrl: './admin-update-section.component.html',
  styleUrls: ['./admin-update-section.component.css']
})
export class AdminUpdateSectionComponent implements OnInit {
  public routeSub!: Subscription;
  public routeid!: number;
  public sectionid!: number;

  public hasErrorTitle = false;
  public hasErrorTitleRequired: boolean = false;
  public hasErrorTitleLength: boolean = false;

  public hasErrorDescription = false;
  public hasErrorDescriptionRequired: boolean = false;
  public hasErrorDescriptionLength: boolean = false;

  public hasErrorText = false;
  public hasErrorTextRequired: boolean = false;
  public hasErrorTextLength: boolean = false;

  public hasErrorVidoeUrl = false;
  public hasErrorVidoeUrlRegex = false;

  public submited = false;

  private regExpVideo = new RegExp('(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?', 'g');

  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  public hasAdmin: boolean = false;
  public hasTeacher: boolean = false;

  takenSection: Section = {
    id: 0,
    title: '',
    description: '',
    text: '',
    videoUrl: '',
    courseID: 0,
    teacherID: 0,
    adminID: 0
  }

  section: Section = {
    id: 0,
    title: '',
    description: '',
    text: '',
    videoUrl: '',
    courseID: 0,
    teacherID: 0,
    adminID: 0
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
      this.sectionid = params['id2'];
    });

    this.getSection();
    this.getSectionAdmin();
    this.getSectionTeacher();
    this.getSectionCourse();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getSection() {
    this.service.getSection(this.sectionid)
    .subscribe(
      response => {
        this.takenSection = response;
        this.getSectionCourse();
      }
    );
  }

  onSubmit() {
    this.populate();
    this.submited = true;
    //vidoeurl
    if(this.section.videoUrl != ''){
      let matchVideo = this.regExpVideo.test(this.section.videoUrl);
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
    this.service.updateSection(this.sectionid, this.takenSection)
    .subscribe(
      response => {
        this.router.navigate(['/Admin/' + this.routeid + '/Sections']);
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
          //text
          if (theError.Text != null) {
            this.hasErrorText = true;
            if(theError.Text[0]){
              this.hasErrorTextRequired = true;
            } else {
              this.hasErrorTextLength = false;
            }
            if(theError.Text[1]){
              this.hasErrorTextLength = true;
            } else {
              this.hasErrorTextRequired = false;
            }
          } else {
            this.hasErrorText = false;
            this.hasErrorTextRequired = false;
            this.hasErrorTextLength = false;
          }
        }
      }
    )
  }

  populate(){
    if (this.section.title != '') {
      this.takenSection.title = this.section.title;
    }
    if (this.section.description != '') {
      this.takenSection.description = this.section.description;
    }
    if (this.section.text != '') {
      this.takenSection.text = this.section.text;
    }
    if (this.section.videoUrl != '') {
      this.takenSection.videoUrl = this.section.videoUrl;
    }
  }

  //Get course of this section..
  courses: Course[] = [];
  courseText: string = '';
  inCourse: boolean = false;
  getSectionCourse(){
    this.service.getAllCourses()
    .subscribe(
      response => {
        this.courses = response;
        this.courses.forEach(course => {
          if (this.takenSection.courseID == course.id) {
            this.inCourse = true;
            this.courseText = "Id:" + course.id + " " + "Title:" + course.title;
          }
        });
        if (!this.inCourse) {
          this.courseText += "No information.";
        }
      }
    );
  }

  //Find creator - admin
  admins: Admin[] = [];
  adminText: string = '';
  getSectionAdmin(){
    this.service.getAllAdmins()
    .subscribe(
      response => {
        console.log('Admins');
        this.admins = response;
        this.admins.forEach(admin => {
          if (this.takenSection.adminID == admin.id) {
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
  getSectionTeacher(){
    this.service.getAllTeachers()
    .subscribe(
      response => {
        console.log('Teachers');
        this.teachers = response;
        this.teachers.forEach(teacher => {
          if (this.takenSection.teacherID == teacher.id) {
            this.hasTeacher = true;
            this.teacherText += "Id:" + teacher.id + " " + "Username:" + teacher.username;
          }
        });
      }
    );
  }

}
