import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { News } from 'src/app/models/news.model';
import { Section } from 'src/app/models/section.model';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { TeacherStudent } from 'src/app/models/teacherstudent.model';
import { TeacherApiService } from 'src/app/services/teacher-api.service';

@Component({
  selector: 'app-teacher-main',
  templateUrl: './teacher-main.component.html',
  styleUrls: ['./teacher-main.component.css']
})
export class TeacherMainComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  constructor(private service: TeacherApiService, private router: Router, private route: ActivatedRoute) { }

  editTeacher: Teacher = {
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

  categories: Category[] = [];
  courses: Course[] = [];
  sections: Section[] = [];
  articles: Article[] = [];
  students: Student[] = [];

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
    });
    this.getTeacher();

    this.getAllCategories();
    this.getAllCourses();
    this.getAllSections();

    this.getStudentsOfTeacher();
    this.getCountUsers();

    this.getCountCategories();
    this.getCountCourses();
    this.getCountSections();
    this.getCountArticles();

    this.getArticlesOfTeacher();
    this.getNewsOfTeacher();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getTeacher() {
    this.service.getTeacher(this.routeid)
      .subscribe(
        response => {
          this.teacher = response;
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


  //Edit profile
  onSubmitProfile() {
    this.editPopulate();
    this.service.updateTeacher(this.routeid, this.teacher)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/Teacher/' + this.routeid + '/Dashboard']);
          this.hideEditt();
        }
      )
  }

  editPopulate() {
    if (this.editTeacher.firstName != '') {
      this.teacher.firstName = this.editTeacher.firstName;
    }
    if (this.editTeacher.lastName != '') {
      this.teacher.lastName = this.editTeacher.lastName;
    }
    if (this.editTeacher.username != '') {
      this.teacher.username = this.editTeacher.username;
    }

  }

  //Show and Hide edit
  showEdit: boolean = false;

  showEditt() {
    this.showEdit = true;
  }

  hideEditt() {
    this.showEdit = false;
  }

  //Counts + checks.. 
  countCategories: number = 0;
  hasCreatedCategories: boolean = false;
  countCoursesInCategory: number = 0;
  hasCoursesInCategory: boolean = false;
  getCountCategories() {
    this.service.getAllCategories()
      .subscribe(
        response => {
          this.categories = response;
          this.categories.forEach(category => {
            if (category.teacherID != null) {
              if (category.teacherID == this.routeid) {
                this.countCategories++;
                this.hasCreatedCategories = true;
                this.service.getAllCourses()
                  .subscribe(
                    response => {
                      this.courses = response;
                      this.courses.forEach(course => {
                        if (course.categoryID == category.id) {
                          this.hasCoursesInCategory = true;
                          this.countCoursesInCategory++;
                        }
                      });
                    }
                  );
              }
            }
          });
        }
      );
  }

  countCourses: number = 0;
  hasCreatedCourses: boolean = false;
  countStudents: number = 0;
  hasStudentsInCourses: boolean = false;
  countSectionsInCourse: number = 0;
  hasSectionsInCourse: boolean = false;
  studentCourse: number[] = [];
  getCountCourses() {
    this.service.getAllCourses()
      .subscribe(
        response => {
          this.courses = response;
          this.courses.forEach(course => {
            if (course.teacherID != null) {
              if (course.teacherID == this.routeid) {
                this.countCourses++;
                this.hasCreatedCourses = true;
                if (course.studentsIDs != null) {
                  this.hasStudentsInCourses = true;
                  var array = course.studentsIDs.split(',');
                  this.countStudents += array.length - 1;
                  this.studentCourse[course.id] = array.length - 1;
                }
                this.service.getAllSections()
                  .subscribe(
                    response => {
                      this.sections = response;
                      this.sections.forEach(section => {
                        if (section.courseID == course.id) {
                          this.hasSectionsInCourse = true;
                          this.countSectionsInCourse++;
                        }
                      });
                    }
                  );
              }
            }
          });
        }
      );
  }

  countSections: number = 0;
  hasCreatedSections: boolean = false;
  sectionCourse: number[] = [];
  getCountSections() {
    this.service.getAllSections()
      .subscribe(
        response => {
          this.sections = response;
          this.sections.forEach(section => {
            if (section.teacherID != null) {
              if (section.teacherID == this.routeid) {
                this.countSections++;
                this.hasCreatedSections = true;
              }
              this.service.getAllCourses()
                .subscribe(
                  response => {
                    this.courses = response;
                    this.courses.forEach(course => {
                      if (section.courseID == course.id) {
                        this.sectionCourse[section.id] = course.id;
                      }
                    });
                  }
                );
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

  countUsers: number = 0;
  getCountUsers() {
    this.service.getAllArticles()
      .subscribe(
        response => {
          this.articles = response;
          this.articles.forEach(article => {
            if (article.teacherID != null) {
              if (article.teacherID == this.routeid) {
                if(article.studentsIDs){
                  var arr = article.studentsIDs.split(',');
                  arr.pop();
                  this.countUsers += arr.length;
                }
                if(article.teachersIDs){
                  var arr = article.teachersIDs.split(',');
                  arr.pop();
                  this.countUsers += arr.length;
                }
              }
            }
          });
        }
      );
  }

  //Show menues
  showCategories: boolean = false;
  showCourses: boolean = true;
  showSections: boolean = false;
  showArticless: boolean = false;
  showStudents: boolean = false;
  showUsers: boolean = false;
  showProfile: boolean = false;

  showCategoriess() {
    this.showCategories = true;
    this.showCourses = false;
    this.showSections = false;
    this.showArticless = false;
    this.showStudents = false;
    this.showUsers = false;
    this.showProfile = false;
  }

  showCoursess() {
    this.showCategories = false;
    this.showCourses = true;
    this.showSections = false;
    this.showArticless = false;
    this.showStudents = false;
    this.showUsers = false;
    this.showProfile = false;
  }

  showSectionss() {
    this.showCategories = false;
    this.showCourses = false;
    this.showSections = true;
    this.showArticless = false;
    this.showStudents = false;
    this.showUsers = false;
    this.showProfile = false;
  }

  showArticles() {
    this.showCategories = false;
    this.showCourses = false;
    this.showSections = false;
    this.showArticless = true;
    this.showStudents = false;
    this.showUsers = false;
    this.showProfile = false;
  }

  showStudentss() {
    this.showCategories = false;
    this.showCourses = false;
    this.showSections = false;
    this.showArticless = false;
    this.showStudents = true;
    this.showUsers = false;
    this.showProfile = false;
  }

  showUserss() {
    this.showCategories = false;
    this.showCourses = false;
    this.showSections = false;
    this.showArticless = false;
    this.showStudents = false;
    this.showUsers = true;
    this.showProfile = false;
  }

  showProfilee() {
    this.showCategories = false;
    this.showCourses = false;
    this.showSections = false;
    this.showArticless = false;
    this.showStudents = false;
    this.showUsers = false;
    this.showProfile = true;
  }

  countSectionss(courseId : number){
    let count = 0;
    for (let i = 0; i < this.sections.length; i++) {
      if(this.sections[i].courseID === courseId){
        count++;
      }
    }
    return count;
  }

  countStudentss(course : any){
    let count = 0
    let array = course.studentsIDs.split(',');
    for (let i = 0; i < array.length; i++) {
      let studentId = parseInt(array[i]);
      this.students.forEach(student => {
        if (studentId === student.id) {
          count++;
        }
      });
    }
    return count;
  }

  //Students..
  teacherStudents: TeacherStudent[] = [];
  count: number = 0;
  array: string[] = [];
  studentid: number = 0;
  innerArray: string[] = [];
  getStudentsOfTeacher() {
    this.service.getAllCourses()
      .subscribe(
        response => {
          this.courses = response;
          this.courses.forEach(course => {
            if (course.teacherID != null) {
              if (course.teacherID == this.routeid) {
                if (course.studentsIDs != null) {
                  this.array = course.studentsIDs.split(',');
                  for (let i = 0; i < this.array.length; i++) {
                    if (this.array[i] != '' && this.array[i] != null) {
                      this.studentid = Number(this.array[i]);
                      this.service.getAllStudents()
                        .subscribe(
                          response => {
                            this.students = response;
                            this.students.forEach(student => {
                              if (student.id == this.studentid) {
                                this.innerArray = student.coursesIDs.split(',');
                                var element = {
                                  id: student.id,
                                  firstName: student.firstName,
                                  lastName: student.lastName,
                                  username: student.username,
                                  email: student.email,
                                  bio: student.bio,
                                  points: student.points,
                                  courseCount: this.innerArray.length - 1
                                }
                                this.teacherStudents[this.count++] = element;
                              }
                            });
                          }
                        );
                    }
                  }
                }
              }
            }
          });
        }
      );
  }

  //Get articles of this teacher.. 
  articlesText: string = '';
  articless: Article[] = [];
  array2: string[] = [];
  articleArray: string[] = [];
  articleid: number = 0;
  enrolledArticles: any[] = [];
  counterArticles: number = 0;

  getArticlesOfTeacher() {
    this.service.getAllArticles()
    .subscribe(
      response => {
        this.articless = response;
        if (this.articless != null) {
            this.array2 = this.teacher.articleIDs.split(',');
            this.removeNull(this.array2);
            for (let i = 0; i < this.array2.length; i++) {
              this.articleArray = this.array2[i].split('=');
              this.removeNull(this.articleArray);
              this.articleid = parseInt(this.articleArray[0]);
              this.articless.forEach(article => {
                if (this.articleid == article.id) {
                  var helpArticle = article as any;
                  let articlesIDs = this.teacher.articleIDs.split(',');
                  articlesIDs.pop();
                  for (let i = 0; i < articlesIDs.length; i++) {
                    let arr = articlesIDs[i].split('=');
                    let id = arr[0];
                    let isFinish = arr[1];
                    if(Number(id) == this.articleid){
                      helpArticle.startDate = arr[2];
                      if(isFinish === "0"){
                        helpArticle.isFinished = '0';
                        break;
                      } else {
                        helpArticle.isFinished = '1';
                        helpArticle.endDate = arr[3];
                        this.counterArticles++;
                        break;
                      }
                    }
                  }
                  console.log('a')
                  this.enrolledArticles.push(helpArticle);
                }
              });
            }
        }
      }
    );
  }

  //Get news of this teacher.. 
  newsText: string = '';
  news: News[] = [];
  array3: string[] = [];
  newsArray: string[] = [];
  newsid: number = 0;
  enrolledNews: any[] = [];
  counterNews: number = 0;

  getNewsOfTeacher() {
    this.service.getAllNews()
    .subscribe(
      response => {
        this.news = response;
        if (this.news != null) {
            this.array3 = this.teacher.newsIDs.split(',');
            this.removeNull(this.array3);
            for (let i = 0; i < this.array3.length; i++) {
              this.newsArray = this.array3[i].split('=');
              this.removeNull(this.newsArray);
              this.newsid = parseInt(this.newsArray[0]);
              this.news.forEach(news => {
                if (this.newsid == news.id) {
                  var helpNews = news as any;
                  let newsIDs = this.teacher.newsIDs.split(',');
                  newsIDs.pop();
                  for (let i = 0; i < newsIDs.length; i++) {
                    let arr = newsIDs[i].split('=');
                    let id = arr[0];
                    let isFinish = arr[1];
                    if(Number(id) == this.newsid){
                      helpNews.startDate = arr[2];
                      if(isFinish === "0"){
                        helpNews.isFinished = '0';
                      } else {
                        helpNews.isFinished = '1';
                        helpNews.endDate = arr[3];
                        console.log('a')
                        this.counterNews++;
                      }
                    }
                  }
                  this.enrolledNews.push(helpNews);
                }
              });
            }
        }
      }
    );
  }

  removeNull(array: string[]) {
    return array.filter(x => x !== null)
  };
}
