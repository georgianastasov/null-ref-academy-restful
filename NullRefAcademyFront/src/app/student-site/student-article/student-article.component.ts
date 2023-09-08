import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Article } from 'src/app/models/article.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { Student } from 'src/app/models/student.model';
import { StudentCourses } from 'src/app/models/studentcourses.model';
import { Teacher } from 'src/app/models/teacher.model';
import { StudentApiService } from 'src/app/services/student-api.service';

@Component({
  selector: 'app-student-article',
  templateUrl: './student-article.component.html',
  styleUrls: ['./student-article.component.css']
})
export class StudentArticleComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  articleid!: number;
  constructor(private service: StudentApiService, private router: Router, private route: ActivatedRoute) { }

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

  article: Article = {
    id: 0,
    title: '',
    description: '',
    text: '',
    rating: 0,
    ratingQty: 0,
    videoUrl: '',
    createdDate: '',
    teacherID: 0,
    adminID: 0,
    studentsIDs: '',
    teachersIDs: '',
    usersStudentsRateIDs: '',
    usersTeachersRateIDs: ''
  }
  
  admins: Admin[] = [];
  students: Student[] = [];
  teachers: Teacher[] = [];
  articles: Article[] = [];
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
      this.articleid = params['id2'];
    });

    this.getStudent();

    this.getAllAdmins();
    this.getAllStudents();
    this.getAllTeachers();
    this.getAllArticles();

    this.checkEnrollPreview();
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

  getAllAdmins() {
    this.service.getAllAdmins()
    .subscribe(
      response => {
        this.admins = response;
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

  getAllTeachers() {
    this.service.getAllTeachers()
    .subscribe(
      response => {
        this.teachers = response;
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

  countUsers(article : any){
    let count = 0
    if(article.studentsIDs){
      let array = article.studentsIDs.split(',');
      for (let i = 0; i < array.length; i++) {
        let studentId = parseInt(array[i]);
        this.students.forEach(student => {
          if (studentId === student.id) {
            count++;
          }
        });
      }
    }
    if (article.teachersIDs) {
      let array2 = article.teachersIDs.split(',');
      for (let i = 0; i < array2.length; i++) {
        let teacherId = parseInt(array2[i]);
        this.teachers.forEach(teacher => {
          if (teacherId === teacher.id) {
            count++;
          }
        });
      }
    }
    return count;
  }

  public enroll = true;
  public preview = false;
  checkEnrollPreview() {
    this.service.getAllArticles()
      .subscribe(
        response => {
          this.articles = response;
          this.articles.forEach(article => {
            if(article.id === Number(this.articleid)){
                let studentIDs = article.studentsIDs.split(',');
                studentIDs.pop();
                studentIDs.forEach(studentID => {
                  if(Number(studentID) == this.routeid){
                    this.preview = true;
                    this.enroll = false;
                  }
                });
            }
          });
        }
      );
  }

  enrollStudent(){
    this.service.getStudent(this.routeid)
    .subscribe(
      response => {
        this.student = response;
        var date = formatDate(Date.now(), 'dd/MM/YYYY', 'en-US').toString();
        this.student.articleIDs += this.articleid + '=' + '0' + '=' + date + ',';
        this.service.updateStudent(this.routeid, this.student)
        .subscribe(
          response => {
        })

        this.service.getArticle(this.articleid)
        .subscribe(
          response => {
            this.article = response;
            this.article.studentsIDs += this.routeid + ',';

            this.service.updateArticle(this.articleid, this.article)
              .subscribe(
                response => {
                  setTimeout(() => {
                    this.router.navigate(['/Student/' + this.routeid + '/Article/' + this.articleid + '/Enroll']);
                  }, 100);
              })
          })
      },
    );
  }
}
