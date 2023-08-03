import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Article } from 'src/app/models/article.model';
import { Category } from 'src/app/models/category.model';
import { Section } from 'src/app/models/section.model';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-update-article',
  templateUrl: './admin-update-article.component.html',
  styleUrls: ['./admin-update-article.component.css']
})
export class AdminUpdateArticleComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  articleid!: number;
  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  hasAdmin: boolean = false;
  hasTeacher: boolean = false;

  takenArticle: Article = {
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
        console.log('Article');
        this.takenArticle = response;
      }
    );
  }

  onSubmit() {
    this.populate();
    this.service.updateArticle(this.articleid, this.takenArticle)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/Admin/' + this.routeid + '/Articles']);
      }
    )
  }

  populate(){
    if (this.article.title != '') {
      this.takenArticle.title = this.article.title;
    }
    if (this.article.description != '') {
      this.takenArticle.description = this.article.description;
    }
    if (this.article.text != '') {
      this.takenArticle.text = this.article.text;
    }
    if (this.article.rating != 0) {
      this.takenArticle.rating = this.article.rating;
    }
    if (this.article.ratingQty != 0) {
      this.takenArticle.ratingQty = this.article.ratingQty;
    }
  }

  removeNull(array: string[]) {
    return array.filter(x => x !== null)
  };

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
          if (this.takenArticle.adminID == admin.id) {
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
          if (this.takenArticle.teacherID == teacher.id) {
            this.hasTeacher = true;
            this.teacherText += "Id:" + teacher.id + " " + "Username:" + teacher.username;
          }
        });
      }
    );
  }
}
