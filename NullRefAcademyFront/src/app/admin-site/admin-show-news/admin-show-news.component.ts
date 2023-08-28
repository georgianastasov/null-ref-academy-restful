import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Article } from 'src/app/models/article.model';
import { News } from 'src/app/models/news.model';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-show-news',
  templateUrl: './admin-show-news.component.html',
  styleUrls: ['./admin-show-news.component.css']
})
export class AdminShowNewsComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  constructor(private service: AdminApiService, private route: ActivatedRoute) { }

  admins: Admin[] = [];
  newss: News[] = [];
  count = 0;

  ngOnInit(): void {
    this.getAllAdmins();
    this.getAllNews();

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
    });

    this.getStudentsOfNews();
    this.getTeachersOfNews();
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

  getAllNews(){
    this.service.getAllNews()
    .subscribe(
      response => {
        console.log('News');
        this.newss = response;
        console.log(this.newss);
      }
    );
  }

  removeNull(array: string[]) {
    return array.filter(x => x !== null)
  };

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
