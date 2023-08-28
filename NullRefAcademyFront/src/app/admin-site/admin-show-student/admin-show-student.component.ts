import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { Course } from 'src/app/models/course.model';
import { News } from 'src/app/models/news.model';
import { Student } from 'src/app/models/student.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-show-student',
  templateUrl: './admin-show-student.component.html',
  styleUrls: ['./admin-show-student.component.css']
})
export class AdminShowStudentComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  constructor(private service: AdminApiService, private route: ActivatedRoute) { }

  students: Student[] = [];
  courses: Course[] = [];

  ngOnInit(): void {
    this.getAllStudents();
    this.getAllCourses();

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
    });

    this.getArticlesOfStudent();
    this.getCoursesOfStudent();
    this.getNewsOfStudent();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.routeid = 0;
  }

  getAllStudents() {
    this.service.getAllStudents()
      .subscribe(
        response => {
          console.log('Students');
          this.students = response;
          console.log(this.students);
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

  //Get courses of this student.. 
  coursesText: string = '';
  courses2: Course[] = [];
  students2: Student[] = [];
  inCourses: boolean = false;
  array: string[] = [];
  courseArray: string[] = [];
  courseid: number = 0;
  courseTextArray: string[] = [];

  getCoursesOfStudent() {
    this.service.getAllCourses()
      .subscribe(
        response => {
          console.log('CoursesA');
          this.courses2 = response;
          this.service.getAllStudents()
            .subscribe(
              response => {
                console.log('StudentsA');
                this.students2 = response;
                this.students2.forEach(student => {
                  if (student.coursesIDs != null) {
                    this.array = student.coursesIDs.split(',');
                    this.removeNull(this.array);
                    for (let i = 0; i < this.array.length; i++) {
                      this.courseArray = this.array[i].split('=');
                      this.removeNull(this.courseArray);
                      this.courseid = parseInt(this.courseArray[0]);
                      this.courses2.forEach(course => {
                        if (this.courseid == course.id) {
                          this.inCourses = true;
                          this.coursesText += "Id: " + course.id + " " + "Title: " + course.title + ' <span class="line"></span> ';
                        }
                      });
                    }
                    this.courseTextArray[student.id] = this.coursesText;
                    this.coursesText = '';
                  }
                });
              }
            );
        }
      );
  }

  removeNull(array: string[]) {
    return array.filter(x => x !== null)
  };

  //Get articles of this student.. 
  articlesText: string = '';
  articles2: Article[] = [];
  students4: Student[] = [];
  inArticles: boolean = false;
  array2: string[] = [];
  articleArray: string[] = [];
  articleid: number = 0;
  articleTextArray: string[] = [];
  getArticlesOfStudent() {
    this.service.getAllArticles()
      .subscribe(
        response => {
          this.articles2 = response;
          this.service.getAllStudents()
            .subscribe(
              response => {
                this.students4 = response;
                this.students4.forEach(student => {
                  if (student.articleIDs != null) {
                    this.array2 = student.articleIDs.split(',');
                    this.removeNull(this.array2);
                    for (let i = 0; i < this.array2.length; i++) {
                      this.articleArray = this.array2[i].split('=');
                      this.removeNull(this.articleArray);
                      this.articleid = parseInt(this.articleArray[0]);
                      this.articles2.forEach(article => {
                        if (this.articleid == article.id) {
                          this.inArticles = true;
                          this.articlesText += "Id: " + article.id + " " + "Title: " + article.title + ' <span class="line"></span> ';
                        }
                      });
                    }
                    this.articleTextArray[student.id] = this.articlesText;
                    this.articlesText = '';
                  }
                });
              }
            );
        }
      );
  }

  //Get news of this student.. 
  newsText: string = '';
  news2: News[] = [];
  students5: Student[] = [];
  inNews: boolean = false;
  array3: string[] = [];
  newsArray: string[] = [];
  newsid: number = 0;
  newsTextArray: string[] = [];
  getNewsOfStudent() {
    this.service.getAllNews()
      .subscribe(
        response => {
          this.news2 = response;
          this.service.getAllStudents()
            .subscribe(
              response => {
                this.students5 = response;
                this.students5.forEach(student => {
                  if (student.newsIDs != null) {
                    this.array3 = student.newsIDs.split(',');
                    this.removeNull(this.array3);
                    for (let i = 0; i < this.array3.length; i++) {
                      this.newsArray = this.array3[i].split('=');
                      this.removeNull(this.newsArray);
                      this.newsid = parseInt(this.newsArray[0]);
                      this.news2.forEach(news => {
                        if (this.newsid == news.id) {
                          this.inNews = true;
                          this.newsText += "Id: " + news.id + " " + "Title: " + news.title + ' <span class="line"></span> ';
                        }
                      });
                    }
                    this.newsTextArray[student.id] = this.newsText;
                    this.newsText = '';
                  }
                });
              }
            );
        }
      );
  }
}
