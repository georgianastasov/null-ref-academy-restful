import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Article } from 'src/app/models/article.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { Teacher } from 'src/app/models/teacher.model';
import { StudentApiService } from 'src/app/services/student-api.service';

@Component({
  selector: 'app-teacher-article',
  templateUrl: './teacher-article.component.html',
  styleUrls: ['./teacher-article.component.css']
})
export class TeacherArticleComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  articleid!: number;
  constructor(private service: StudentApiService, private router: Router, private route: ActivatedRoute) { }

  admins: Admin[] = [];
  teachers: Teacher[] = [];
  categories: Category[] = [];
  courses: Course[] = [];
  sections: Section[] = [];
  articles: Article[] = [];
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
      this.articleid = params['id2'];
      console.log('articleidd:' + this.articleid)
    });

    this.getAllAdmins();
    this.getAllTeachers();
    this.getAllCategories();
    this.getAllCourses();
    this.getAllSections();
    this.getAllArticles();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getAllAdmins() {
    this.service.getAllAdmins()
    .subscribe(
      response => {
        this.admins = response;
      }
    );
  }

  getAllTeachers() {
    this.service.getAllTeachers()
    .subscribe(
      response => {
        this.teachers = response;
      }
    );
  }

  getAllCategories() {
    this.service.getAllCategories()
      .subscribe(
        response => {
          this.categories = response;
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

  getAllSections() {
    this.service.getAllSections()
      .subscribe(
        response => {
          this.sections = response;
        }
      );
  }

  getAllArticles() {
    this.service.getAllArticles()
      .subscribe(
        response => {
          this.articles = response;
        }
      );
  }
}
