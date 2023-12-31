import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { Teacher } from 'src/app/models/teacher.model';
import { TeacherApiService } from 'src/app/services/teacher-api.service';

@Component({
  selector: 'app-teacher-add-section',
  templateUrl: './teacher-add-section.component.html',
  styleUrls: ['./teacher-add-section.component.css']
})
export class TeacherAddSectionComponent implements OnInit {
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

  section: Section = {
    id: 0,
    title: '',
    description: '',
    text: '',
    videoUrl: '',
    courseID: 0,
    teacherID: 0,
    adminID: this.nullfield
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
    this.getAllCourses();

    this.getCountCategories();
    this.getCountCourses();
    this.getCountSections();
    this.getCountArticles();
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
    this.section.teacherID = this.routeid;
    this.service.createSection(this.section)
    .subscribe(
      response => {
        this.router.navigate(['/Teacher/' + this.routeid + '/Dashboard']);
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

  getTeacher() {
    this.service.getTeacher(this.routeid)
      .subscribe(
        response => {
          this.teacher = response;
        }
      );
  }

  getAllCourses() {
    this.service.getAllCourses()
    .subscribe(
      response => {
        this.courses = response;
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
}
