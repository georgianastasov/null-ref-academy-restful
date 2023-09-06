import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { News } from 'src/app/models/news.model';
import { Section } from 'src/app/models/section.model';
import { Student } from 'src/app/models/student.model';
import { StudentCourses } from 'src/app/models/studentcourses.model';
import { StudentApiService } from 'src/app/services/student-api.service';

@Component({
  selector: 'app-student-main',
  templateUrl: './student-main.component.html',
  styleUrls: ['./student-main.component.css']
})
export class StudentMainComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  constructor(private service: StudentApiService, private router: Router, private route: ActivatedRoute) { }

  bioStudent: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    accountType: '',
    password: '',
    confirmPassword: '',
    createdDate: '',
    bio: '',
    points: 0,
    progress: 0,
    timeSpent: '',
    coursesIDs: '',
    articleIDs: '',
    newsIDs: ''
  }

  editStudent: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    accountType: '',
    password: '',
    confirmPassword: '',
    createdDate: '',
    bio: '',
    points: 0,
    progress: 0,
    timeSpent: '',
    coursesIDs: '',
    articleIDs: '',
    newsIDs: ''
  }

  student: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    accountType: '',
    password: '',
    confirmPassword: '',
    createdDate: '',
    bio: '',
    points: 0,
    progress: 0,
    timeSpent: '',
    coursesIDs: '',
    articleIDs: '',
    newsIDs: ''
  }

  studentCourse: StudentCourses = {
    id: 0,
    title: '',
    description: '',
    points: 0,
    createdDate: '',
    categoryID: 0,
    teacherID: 0,
    adminID: 0,
    studentsIDs: '',
    isFinished: '',
    startDate: '',
    endDate: ''
  }

  students: Student[] = [];
  categories: Category[] = [];
  courses: Course[] = [];
  sections: Section[] = [];
  studentCourses: StudentCourses[] = [];

  startTime!: number;
  endTime!: number;
  totalTime!: string;
  totalTimeNumber!: number;

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
    });
    this.getStudent();

    this.getAllCategories();
    this.getAllCourses();
    this.getAllSections();

    this.getStudentCourses();
    this.getArticlesOfStudent();
    this.getNewsOfStudent();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getStudent() {
    this.service.getStudent(this.routeid)
      .subscribe(
        response => {
          this.student = response;
        }
      );
  }

  //Edit bio
  onSubmitBio() {
    this.bioPopulate();
    this.service.updateStudent(this.routeid, this.student)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/Student/' + this.routeid + '/Dashboard']);
          this.hideBioo();
        }
      )
  }

  bioPopulate() {
    if (this.bioStudent.bio != '') {
      this.student.bio = this.bioStudent.bio;
    }
  }

  //Edit profile
  onSubmitProfile() {
    this.editPopulate();
    this.service.updateStudent(this.routeid, this.student)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/Student/' + this.routeid + '/Dashboard']);
          this.hideEditt();
        }
      )
  }

  editPopulate() {
    if (this.editStudent.firstName != '') {
      this.student.firstName = this.editStudent.firstName;
    }
    if (this.editStudent.lastName != '') {
      this.student.lastName = this.editStudent.lastName;
    }
    if (this.editStudent.username != '') {
      this.student.username = this.editStudent.username;
    }
    if (this.editStudent.bio != '') {
      this.student.bio = this.editStudent.bio;
    }
  }

  //Get categories, courses, sections
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

  updateStudentProgress(result: number) {
    this.student.progress = result;
    this.service.updateStudent(this.routeid, this.student)
      .subscribe(
        response => {
          console.log('updated');
        }
      )
  }

  //Get courses of this student
  arrayCourses: string[] = [];
  innerArrayCourses: string[] = [];
  innerCourseId: number = 0;
  countttttt: number = 0;
  dates: string[] = [];
  br: number = 0;
  counter: number = 0;
  result: number = 0;
  getStudentCourses() {
    this.service.getStudent(this.routeid)
      .subscribe(
        response => {
          this.student = response;
          this.arrayCourses = this.student.coursesIDs.split(',');
          this.arrayCourses.forEach(coursee => {
            if (coursee != '') {
              this.innerArrayCourses = coursee.split('=');
              this.innerCourseId = Number(this.innerArrayCourses[0]);
              this.getAllCourses();
              for (let i = 0; i < this.courses.length; i++) {
                if (this.courses[i].id === this.innerCourseId) {
                  var element = {
                    id: this.courses[i].id,
                    title: this.courses[i].title,
                    description: this.courses[i].description,
                    points: this.courses[i].points,
                    createdDate: this.courses[i].createdDate,
                    categoryID: this.courses[i].categoryID,
                    teacherID: this.courses[i].teacherID,
                    adminID: this.courses[i].adminID,
                    studentsIDs: this.courses[i].studentsIDs,
                    isFinished: this.innerArrayCourses[1],
                    startDate: this.innerArrayCourses[2],
                    endDate: ''
                  }
                  if (this.innerArrayCourses.length == 4) {
                    element.endDate = this.innerArrayCourses[3];
                  }
                  this.studentCourses[this.countttttt++] = element;
                  if (this.innerArrayCourses[1] == '0') {
                    this.dates[this.br] = this.innerArrayCourses[2];
                    this.br++;
                  }
                  else {
                    this.counter++;
                    this.dates[this.br] = this.innerArrayCourses[2];
                    this.br++;
                    this.dates[this.br] = this.innerArrayCourses[3];
                    this.br++;
                  }
                  this.dates.sort();
                  const [day, month, year] = this.dates[0].split('/');
                  const start = new Date(+year, +month - 1, +day);
                  const [dayy, monthh, yearr] = this.dates[this.dates.length - 1].split('/');
                  var end = new Date(+yearr, +monthh - 1, +dayy);
                  this.result = end.getTime() - start.getTime();
                  this.result = this.result / (1000 * 3600 * 24);
                }
              }
            }
          });
          this.updateStudentProgress(this.result);
        }
      );
  }

  //Get articles of this student.. 
  articlesText: string = '';
  articles: Article[] = [];
  array2: string[] = [];
  articleArray: string[] = [];
  articleid: number = 0;
  enrolledArticles: any[] = [];
  counterArticles: number = 0;

  getArticlesOfStudent() {
    this.service.getAllArticles()
    .subscribe(
      response => {
        this.articles = response;
        if (this.articles != null) {
            this.array2 = this.student.articleIDs.split(',');
            this.removeNull(this.array2);
            for (let i = 0; i < this.array2.length; i++) {
              this.articleArray = this.array2[i].split('=');
              this.removeNull(this.articleArray);
              this.articleid = parseInt(this.articleArray[0]);
              this.articles.forEach(article => {
                if (this.articleid == article.id) {
                  var helpArticle = article as any;
                  let articlesIDs = this.student.articleIDs.split(',');
                  articlesIDs.pop();
                  for (let i = 0; i < articlesIDs.length; i++) {
                    let arr = articlesIDs[i].split('=');
                    let id = arr[0];
                    let isFinish = arr[1];
                    if(Number(id) == this.articleid){
                      helpArticle.startDate = arr[2];
                      if(isFinish === "0"){
                        helpArticle.isFinished = '0';
                      } else {
                        helpArticle.isFinished = '1';
                        helpArticle.endDate = arr[3];
                        this.counterArticles++;
                      }
                    }
                  }
                  this.enrolledArticles.push(helpArticle);
                }
              });
            }
        }
      }
    );
  }

  //Get news of this student.. 
  newsText: string = '';
  news: News[] = [];
  array3: string[] = [];
  newsArray: string[] = [];
  newsid: number = 0;
  enrolledNews: any[] = [];
  counterNews: number = 0;

  getNewsOfStudent() {
    this.service.getAllNews()
    .subscribe(
      response => {
        this.news = response;
        if (this.news != null) {
            this.array3 = this.student.newsIDs.split(',');
            this.removeNull(this.array3);
            for (let i = 0; i < this.array3.length; i++) {
              this.newsArray = this.array3[i].split('=');
              this.removeNull(this.newsArray);
              this.newsid = parseInt(this.newsArray[0]);
              this.news.forEach(news => {
                if (this.newsid == news.id) {
                  var helpNews = news as any;
                  let newsIDs = this.student.newsIDs.split(',');
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

  //Show diferent menues
  showCourse: boolean = true;
  showArticle!: boolean;
  showNews!: boolean;
  showProgres!: boolean;
  showProfile!: boolean;
  showCoursess() {
    this.showCourse = true;
    this.showArticle = false;
    this.showNews = false;
    this.showProgres = false;
    this.showProfile = false;
  }

  showArticles() {
    this.showCourse = false;
    this.showArticle = true;
    this.showNews = false;
    this.showProgres = false;
    this.showProfile = false;
  }

  showNewss() {
    this.showCourse = false;
    this.showArticle = false;
    this.showNews = true;
    this.showProgres = false;
    this.showProfile = false;
  }

  showProgress() {
    this.showCourse = false;
    this.showArticle = false;
    this.showNews = false;
    this.showProgres = true;
    this.showProfile = false;
  }

  showProfilee() {
    this.showCourse = false;
    this.showArticle = false;
    this.showNews = false;
    this.showProgres = false;
    this.showProfile = true;
  }

  //Show and Hide bio
  showBio: boolean = false;

  showBioo() {
    this.hideEditt();
    this.showBio = true;
  }

  hideBioo() {
    this.showBio = false;
  }

  //Show and Hide edit
  showEdit: boolean = false;

  showEditt() {
    this.hideBioo();
    this.showEdit = true;
  }

  hideEditt() {
    this.showEdit = false;
  }
}
