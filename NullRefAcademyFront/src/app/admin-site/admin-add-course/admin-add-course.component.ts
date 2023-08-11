import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-add-course',
  templateUrl: './admin-add-course.component.html',
  styleUrls: ['./admin-add-course.component.css']
})
export class AdminAddCourseComponent implements OnInit {
  public routeSub!: Subscription;
  public routeid!: number;
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

  public hasErrorCategory = false;
  public hasErrorCategoryRequired: boolean = false;

  public submited = false;
  
  private regExpVideo = new RegExp('(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?', 'g');

  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  course: Course = {
    id: 0,
    title: '',
    description: '',
    points: this.nullfield,
    rating: 0,
    ratingQty: 0,
    videoUrl: '',
    createdDate: '',
    categoryID: this.nullfield,
    teacherID: this.nullfield,
    adminID: 0,
    studentsIDs: ''
  }

  categories: any = [];

  ngOnInit(): void {
    this.getAllCategories();

    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onSubmit() {
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
    //category
    if(this.course.categoryID === this.nullfield){
      this.hasErrorCategory = true;
      this.hasErrorCategoryRequired = true;
    } else {
      this.hasErrorCategory = false;
      this.hasErrorCategoryRequired = false;
    }
    this.course.adminID = this.routeid;
    this.service.createCourse(this.course)
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

  getAllCategories() {
    this.service.getAllCategories()
    .subscribe(
      response => {
        this.categories = response;
      }
    );
  }
}
