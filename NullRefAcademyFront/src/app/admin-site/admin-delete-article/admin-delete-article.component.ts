import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Article } from 'src/app/models/article.model';
import { Teacher } from 'src/app/models/teacher.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-delete-article',
  templateUrl: './admin-delete-article.component.html',
  styleUrls: ['./admin-delete-article.component.css']
})
export class AdminDeleteArticleComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  articleid!: number;
  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  hasAdmin: boolean = false;
  hasTeacher: boolean = false;

  article: Article = {
    id: 0,
    title: '',
    description: '',
    text: '',
    rating: 0,
    ratingQty: 0,
    createdDate: '',
    teacherID: 0,
    adminID: 0
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
      console.log('idAdmin: ' + params['id2']);
      this.articleid = params['id2'];
    });

    this.getArticle();
    this.getArticleAdmin();
    this.getArticleTeacher();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getArticle() {
    this.service.getArticle(this.articleid)
    .subscribe(
      response => {
        console.log('Section');
        this.article = response;
      }
    );
  }

  onSubmit() {
    this.service.deleteArticle(this.articleid)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/Admin/' + this.routeid + '/Articles']);
      }
    )
  }

  //Find creator - admin
  admins: Admin[] = [];
  adminText: string = '';
  getArticleAdmin(){
    this.service.getAllAdmins()
    .subscribe(
      response => {
        console.log('Admins');
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
        console.log('Teachers');
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
}
