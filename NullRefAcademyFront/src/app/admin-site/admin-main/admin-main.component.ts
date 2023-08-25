import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { Course } from 'src/app/models/course.model';
import { News } from 'src/app/models/news.model';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { User } from 'src/app/models/user.model';
import { AdminApiService } from 'src/app/services/admin-api.service';


@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {
  public routeSub!: Subscription;
  public routeid!: number;

  constructor(private service: AdminApiService, private route: ActivatedRoute, private router: Router) { 
  }

  users: any = [];
  admins: any = [];
  teachers: any = [];
  students: any = [];
  categories: any = [];
  courses: any = [];
  sections: any = [];
  articles: any = [];
  newss: any = [];

  userid: number = 0;

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllAdmins();
    this.getAllTeachers();
    this.getAllStudents();
    this.getAllCategories();
    this.getAllCourses();
    this.getAllSections();
    this.getAllArticles();
    this.getAllNews();

    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
    });

    this.getArticlesOfStudent();
    this.getCoursesOfStudent();
    this.getNewsOfStudent();
    this.getArticlesOfTeacher();
    this.getNewsOfTeacher();

    this.getStudentsOfCourses();
    this.getStudentsOfArticles();
    this.getTeachersOfArticles();
    this.getStudentsOfNews();
    this.getTeachersOfNews();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getAllUsers() {
    this.service.getAllUsers()
    .subscribe(
      response => {
        this.users = response;
      }
    );
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

  getAllStudents() {
    this.service.getAllStudents()
    .subscribe(
      response => {
        this.students = response;
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

  getAllNews() {
    this.service.getAllNews()
    .subscribe(
      response => {
        this.newss = response;
      }
    );
  }

  getUserToDelete() {
    this.service.getUser(this.userid)
    .subscribe(
      response => {
        if (response.accountType == "Admin"){
          this.router.navigate(['/Admin/'+ this.routeid + '/Delete/Admin/' + response.id])
        }
        else if(response.accountType == "Teacher"){
          this.router.navigate(['/Admin/'+ this.routeid + '/Delete/Teacher/' + response.id])
        }
        else if(response.accountType == "Student"){
          this.router.navigate(['/Admin/'+ this.routeid + '/Delete/Student/' + response.id])
        }
      }
    );
  }

  findUserToDelete(id: number){
    this.userid = id;
    this.getUserToDelete();
  }

  getUserToUpdate(){
    this.service.getUser(this.userid)
    .subscribe(
      response => {
        if (response.accountType == "Admin"){
          this.router.navigate(['/Admin/'+ this.routeid + '/Update/Admin/' + response.id])
        }
        else if(response.accountType == "Teacher"){
          this.router.navigate(['/Admin/'+ this.routeid + '/Update/Teacher/' + response.id])
        }
        else if(response.accountType == "Student"){
          this.router.navigate(['/Admin/'+ this.routeid + '/Update/Student/' + response.id])
        }
      }
    );
  }

  findUserToUpdate(id: number){
    this.userid = id;
    this.getUserToUpdate();
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
          this.courses2 = response;
          this.service.getAllStudents()
            .subscribe(
              response => {
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
                      this.articles2.forEach(article => {
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

  removeNull(array: string[]) {
    return array.filter(x => x !== null)
  };

  //Get students of this course.. 
  studentText: string = '';
  courses3: Course[] = [];
  students3: Student[] = [];
  inStudents: boolean = false;
  array1: string[] = [];
  studentid: number = 0;
  studentTextArray: string[] = [];
  getStudentsOfCourses() {
    this.service.getAllStudents()
      .subscribe(
        response => {
          this.students3 = response;
          this.service.getAllCourses()
            .subscribe(
              response => {
                this.courses3 = response;
                this.courses3.forEach(course => {
                  if (course.studentsIDs != null) {
                    this.array1 = course.studentsIDs.split(',');
                    this.removeNull(this.array1);
                    for (let i = 0; i < this.array1.length; i++) {
                      this.studentid = parseInt(this.array1[i]);
                      this.students3.forEach(student => {
                        if (this.studentid == student.id) {
                          this.studentText += "Id:" + student.id + " " + "Username:" + student.username + ' <span class="line"></span> ';
                        }
                      });
                    }
                    this.studentTextArray[course.id] = this.studentText;
                    this.studentText = '';
                  }
                });
              }
            );
        }
      );
  }

  //Get students of this article.. 
  studentTextArticle: string = '';
  articles3: Article[] = [];
  studentsArticles: Student[] = [];
  inStudentsArticles: boolean = false;
  arrayArticles: string[] = [];
  studentid2: number = 0;
  studentArticleTextArray: string[] = [];
  getStudentsOfArticles() {
    this.service.getAllStudents()
      .subscribe(
        response => {
          this.studentsArticles = response;
          this.service.getAllArticles()
            .subscribe(
              response => {
                this.articles3 = response;
                this.articles3.forEach(article => {
                  if (article.studentsIDs != null) {
                    this.arrayArticles = article.studentsIDs.split(',');
                    this.removeNull(this.arrayArticles);
                    for (let i = 0; i < this.arrayArticles.length; i++) {
                      this.studentid2 = parseInt(this.arrayArticles[i]);
                      this.studentsArticles.forEach(student => {
                        if (this.studentid2 == student.id) {
                          this.studentTextArticle += "Id:" + student.id + " " + "Username:" + student.username + ' <span class="line"></span> ';
                        }
                      });
                    }
                    this.studentArticleTextArray[article.id] = this.studentTextArticle;
                    this.studentTextArticle = '';
                  }
                });
              }
            );
        }
      );
  }

  //Get teachers of this article.. 
  teacherTextArticle: string = '';
  articles4: Article[] = [];
  teacherArticles: Teacher[] = [];
  inTeacherArticles: boolean = false;
  arrayArticles2: string[] = [];
  teacherid2: number = 0;
  teacherArticleTextArray: string[] = [];
  getTeachersOfArticles() {
    this.service.getAllTeachers()
      .subscribe(
        response => {
          this.teacherArticles = response;
          this.service.getAllArticles()
            .subscribe(
              response => {
                this.articles4 = response;
                this.articles4.forEach(article => {
                  if (article.teachersIDs != null) {
                    this.arrayArticles2 = article.teachersIDs.split(',');
                    this.removeNull(this.arrayArticles2);
                    for (let i = 0; i < this.arrayArticles2.length; i++) {
                      this.teacherid2 = parseInt(this.arrayArticles2[i]);
                      this.teacherArticles.forEach(teacher => {
                        if (this.teacherid2 == teacher.id) {
                          this.teacherTextArticle += "Id:" + teacher.id + " " + "Username:" + teacher.username + ' <span class="line"></span> ';
                        }
                      });
                    }
                    this.teacherArticleTextArray[article.id] = this.teacherTextArticle;
                    this.teacherTextArticle = '';
                  }
                });
              }
            );
        }
      );
  }

  //Get students of this news.. 
  studentTextNews: string = '';
  newss2: News[] = [];
  studentsNews: Student[] = [];
  inStudentsNews: boolean = false;
  arrayNews: string[] = [];
  studentid3: number = 0;
  studentNewsTextArray: string[] = [];
  getStudentsOfNews() {
    this.service.getAllStudents()
      .subscribe(
        response => {
          this.studentsNews = response;
          this.service.getAllNews()
            .subscribe(
              response => {
                this.newss2 = response;
                this.newss2.forEach(news => {
                  if (news.studentsIDs != null) {
                    this.arrayNews = news.studentsIDs.split(',');
                    this.removeNull(this.arrayNews);
                    for (let i = 0; i < this.arrayNews.length; i++) {
                      this.studentid3 = parseInt(this.arrayNews[i]);
                      this.studentsNews.forEach(student => {
                        if (this.studentid3 == student.id) {
                          this.studentTextNews += "Id:" + student.id + " " + "Username:" + student.username + ' <span class="line"></span> ';
                        }
                      });
                    }
                    this.studentNewsTextArray[news.id] = this.studentTextNews;
                    this.studentTextNews = '';
                  }
                });
              }
            );
        }
      );
  }

  //Get teachers of this article.. 
  teacherTextNews: string = '';
  newss3: News[] = [];
  teacherNews: Teacher[] = [];
  inTeacherNews: boolean = false;
  arrayNews2: string[] = [];
  teacherid3: number = 0;
  teacherNewsTextArray: string[] = [];
  getTeachersOfNews() {
    this.service.getAllTeachers()
      .subscribe(
        response => {
          this.teacherNews = response;
          this.service.getAllNews()
            .subscribe(
              response => {
                this.newss3 = response;
                this.newss3.forEach(news => {
                  if (news.teachersIDs != null) {
                    this.arrayNews2 = news.teachersIDs.split(',');
                    this.removeNull(this.arrayNews2);
                    for (let i = 0; i < this.arrayNews2.length; i++) {
                      this.teacherid3 = parseInt(this.arrayNews2[i]);
                      this.teacherNews.forEach(teacher => {
                        if (this.teacherid3 == teacher.id) {
                          this.teacherTextNews += "Id:" + teacher.id + " " + "Username:" + teacher.username + ' <span class="line"></span> ';
                        }
                      });
                    }
                    this.teacherNewsTextArray[news.id] = this.teacherTextNews;
                    this.teacherTextNews = '';
                  }
                });
              }
            );
        }
      );
  }
}
