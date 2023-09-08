import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Article } from 'src/app/models/article.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { TeacherApiService } from 'src/app/services/teacher-api.service';

@Component({
  selector: 'app-teacher-delete-article',
  templateUrl: './teacher-delete-article.component.html',
  styleUrls: ['./teacher-delete-article.component.css']
})
export class TeacherDeleteArticleComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  articleid!: number;
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

  article: Article = {
    id: 0,
    title: '',
    description: '',
    text: '',
    rating: 0,
    ratingQty: 0,
    createdDate: '',
    teacherID: 0,
    adminID: 0,
    videoUrl: '',
    studentsIDs: '',
    teachersIDs: '',
    usersStudentsRateIDs: '',
    usersTeachersRateIDs: ''
  }

  hasAdmin: boolean = false;
  hasTeacher: boolean = false;

  categories: Category[] = [];
  courses: Course[] = [];
  sections: Section[] = [];
  articles: Article[] = [];
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
      this.articleid = params['id2'];
    });
    this.getTeacher();

    this.getArticle();
    this.getArticleAdmin();
    this.getArticleTeacher();

    this.getCountCategories();
    this.getCountCourses();
    this.getCountSections();
    this.getCountArticles();

    this.getStudentsOfThisArticle();
    this.getTeachersOfThisArticle();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onSubmit() {
    this.service.deleteCourse(this.articleid)
    .subscribe(
      response => {
        this.router.navigate(['/Teacher/' + this.routeid + '/Dashboard']);
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

  getArticle() {
    this.service.getArticle(this.articleid)
    .subscribe(
      response => {
        console.log('Article');
        this.article = response;
      }
    );
  }

  //Find creator - admin
  admins: Admin[] = [];
  adminText: string = '';
  getArticleAdmin(){
    this.service.getAllAdmins()
    .subscribe(
      response => {
        this.admins = response;
        this.admins.forEach(admin => {
          if (this.article.adminID == admin.id) {
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
  getArticleTeacher(){
    this.service.getAllTeachers()
    .subscribe(
      response => {
        this.teachers = response;
        this.teachers.forEach(teacher => {
          if (this.article.teacherID == teacher.id) {
            this.hasTeacher = true;
            this.teacherText += "Id:" + teacher.id + " " + "Username:" + teacher.username;
          }
        });
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

  //Get students enrolled in this article..
  studentsText: string = '';
  students: Student[] = [];
  inStudent: boolean = false;
  array: string[] = [];
  studentArray: string[] = [];
  studentid: number = 0;

  getStudentsOfThisArticle(){
    this.service.getAllStudents()
    .subscribe(
      response => {
        this.students = response;
        if (this.students != null) {
            this.array = this.article.studentsIDs.split(',');
            this.removeNull(this.array);
            for (let i = 0; i < this.array.length; i++) {
              this.students.forEach(student => {
                this.studentid = parseInt(this.array[i]);
                if (this.studentid == student.id) {
                  this.inStudent = true;
                  this.studentsText += "Id:" + student.id + " " + "Username:" + student.username + "\n";
                }
              });
            }
        }
        if(!this.inStudent){
          this.studentsText += "This article has no enrolled students.";
        }
      }
    );
  }

  //Get teachers enrolled in this article..
  teachersText: string = '';
  teachers2: Teacher[] = [];
  inTeacher: boolean = false;
  array2: string[] = [];
  teacherArray: string[] = [];
  teacherid: number = 0;

  getTeachersOfThisArticle(){
    this.service.getAllTeachers()
    .subscribe(
      response => {
        this.teachers2 = response;
        if (this.teachers2 != null) {
            this.array2 = this.article.teachersIDs.split(',');
            this.removeNull(this.array2);
            for (let i = 0; i < this.array2.length; i++) {
              this.teachers2.forEach(teacher => {
                this.teacherid = parseInt(this.array2[i]);
                if (this.teacherid == teacher.id) {
                  this.inTeacher = true;
                  this.teachersText += "Id:" + teacher.id + " " + "Username:" + teacher.username + "\n";
                }
              });
            }
        }
        if(!this.inTeacher){
          this.teachersText += "This article has no enrolled teachers.";
        }
      }
    );
  }

  removeNull(array: string[]) {
    return array.filter(x => x !== null)
  };
}
