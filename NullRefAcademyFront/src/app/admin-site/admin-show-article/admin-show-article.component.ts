import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Article } from 'src/app/models/article.model';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-show-article',
  templateUrl: './admin-show-article.component.html',
  styleUrls: ['./admin-show-article.component.css']
})
export class AdminShowArticleComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  constructor(private service: AdminApiService, private route: ActivatedRoute) { }

  admins: Admin[] = [];
  teachers: Teacher[] = [];
  articles: Article[] = [];
  count = 0;

  ngOnInit(): void {
    this.getAllAdmins();
    this.getAllTeachers();
    this.getAllArticles();

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
    });

    this.getStudentsOfArticles();
    this.getTeachersOfArticles();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.routeid = 0;
  }

  getAllAdmins(){
    this.service.getAllAdmins()
    .subscribe(
      response => {
        console.log('Admins');
        this.admins = response;
        console.log(this.admins);
      }
    );
  }

  getAllTeachers(){
    this.service.getAllTeachers()
    .subscribe(
      response => {
        console.log('Teachers');
        this.teachers = response;
        console.log(this.teachers);
      }
    );
  }

  getAllArticles(){
    this.service.getAllArticles()
    .subscribe(
      response => {
        console.log('Articles');
        this.articles = response;
        console.log(this.articles);
      }
    );
  }

  removeNull(array: string[]) {
    return array.filter(x => x !== null)
  };

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
}
