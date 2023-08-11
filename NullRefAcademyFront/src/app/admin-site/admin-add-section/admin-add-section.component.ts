import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { Subscription } from 'rxjs';
import { Section } from 'src/app/models/section.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-add-section',
  templateUrl: './admin-add-section.component.html',
  styleUrls: ['./admin-add-section.component.css']
})
export class AdminAddSectionComponent implements OnInit {
  public routeSub!: Subscription;
  public routeid!: number;
  public nullfield!: number;

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

  public hasErrorCourse = false;
  public hasErrorCourseRequired: boolean = false;

  public submited = false;

  private regExpVideo = new RegExp('(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?', 'g');

  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  section: Section = {
    id: 0,
    title: '',
    description: '',
    text: '',
    videoUrl: '',
    courseID: this.nullfield,
    teacherID: this.nullfield,
    adminID: 0
  }

  courses: any = [];

  ngOnInit(): void {
    this.getAllCourses();

    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onSubmit() {
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
    //course
    if(this.section.courseID === this.nullfield){
      this.hasErrorCourse = true;
      this.hasErrorCourseRequired = true;
    } else {
      this.hasErrorCourse = false;
      this.hasErrorCourseRequired = false;
    }
    this.section.adminID = this.routeid;
    this.service.createSection(this.section)
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

  getAllCourses() {
    this.service.getAllCourses()
    .subscribe(
      response => {
        this.courses = response;
      }
    );
  }
}
