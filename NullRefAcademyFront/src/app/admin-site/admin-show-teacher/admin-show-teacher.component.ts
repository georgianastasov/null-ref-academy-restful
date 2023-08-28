import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { News } from 'src/app/models/news.model';
import { Teacher } from 'src/app/models/teacher.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-show-teacher',
  templateUrl: './admin-show-teacher.component.html',
  styleUrls: ['./admin-show-teacher.component.css']
})
export class AdminShowTeacherComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  constructor(private service: AdminApiService, private route: ActivatedRoute) { }

  teachers: any = [];
  categories: any = [];
  courses: any = [];
  sections: any = [];
  articles: any = [];

  ngOnInit(): void {
    this.getAllTeachers();
    this.getAllCategories();
    this.getAllCourses();
    this.getAllSections();

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getAllTeachers() {
    this.service.getAllTeachers()
    .subscribe(
      response => {
        console.log('Teachers');
        this.teachers = response;
        console.log(this.teachers);
      }
    );
  }

  getAllCategories() {
    this.service.getAllCategories()
    .subscribe(
      response => {
        console.log('Categories');
        this.categories = response;
        console.log(this.categories);
      }
    );
  }

  getAllCourses() {
    this.service.getAllCourses()
    .subscribe(
      response => {
        console.log('Courses');
        this.courses = response;
        console.log(this.courses);
      }
    );
  }

  getAllSections() {
    this.service.getAllSections()
    .subscribe(
      response => {
        console.log('Sections');
        this.sections = response;
        console.log(this.sections);
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

  removeNull(array: string[]) {
    return array.filter(x => x !== null)
  };

  //Get articles of this teacher.. 
  articlestText: string = '';
  articles2t: Article[] = [];
  teachers4t: Teacher[] = [];
  inArticlest: boolean = false;
  array2t: string[] = [];
  articleArrayt: string[] = [];
  articleidt: number = 0;
  articletTextArray: string[] = [];
  getArticlesOfTeacher() {
    this.service.getAllArticles()
      .subscribe(
        response => {
          this.articles2t = response;
          this.service.getAllTeachers()
            .subscribe(
              response => {
                this.teachers4t = response;
                this.teachers4t.forEach(teacher => {
                  if (teacher.articleIDs != null) {
                    this.array2t = teacher.articleIDs.split(',');
                    this.removeNull(this.array2t);
                    for (let i = 0; i < this.array2t.length; i++) {
                      this.articleArrayt = this.array2t[i].split('=');
                      this.removeNull(this.articleArrayt);
                      this.articleidt = parseInt(this.articleArrayt[0]);
                      this.articles2t.forEach(article => {
                        if (this.articleidt == article.id) {
                          this.inArticlest = true;
                          this.articlestText += "Id: " + article.id + " " + "Title: " + article.title + ' <span class="line"></span> ';
                        }
                      });
                    }
                    this.articletTextArray[teacher.id] = this.articlestText;
                    this.articlestText = '';
                  }
                });
              }
            );
        }
      );
  }

  //Get news of this student.. 
  newstText: string = '';
  news2t: News[] = [];
  teachers5: Teacher[] = [];
  inNewst: boolean = false;
  array3t: string[] = [];
  newsArrayt: string[] = [];
  newsidt: number = 0;
  newstTextArray: string[] = [];
  getNewsOfTeacher() {
    this.service.getAllNews()
      .subscribe(
        response => {
          this.news2t = response;
          this.service.getAllTeachers()
            .subscribe(
              response => {
                this.teachers5 = response;
                this.teachers5.forEach(teacher => {
                  if (teacher.newsIDs != null) {
                    this.array3t = teacher.newsIDs.split(',');
                    this.removeNull(this.array3t);
                    for (let i = 0; i < this.array3t.length; i++) {
                      this.newsArrayt = this.array3t[i].split('=');
                      this.removeNull(this.newsArrayt);
                      this.newsidt = parseInt(this.newsArrayt[0]);
                      this.news2t.forEach(news => {
                        if (this.newsidt == news.id) {
                          this.inNewst = true;
                          this.newstText += "Id: " + news.id + " " + "Title: " + news.title + ' <span class="line"></span> ';
                        }
                      });
                    }
                    this.newstTextArray[teacher.id] = this.newstText;
                    this.newstText = '';
                  }
                });
              }
            );
        }
      );
  }
}
