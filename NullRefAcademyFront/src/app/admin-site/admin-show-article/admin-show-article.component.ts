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
}
