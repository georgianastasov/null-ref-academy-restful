import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Article } from 'src/app/models/article.model';
import { News } from 'src/app/models/news.model';
import { Teacher } from 'src/app/models/teacher.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-delete-news',
  templateUrl: './admin-delete-news.component.html',
  styleUrls: ['./admin-delete-news.component.css']
})
export class AdminDeleteNewsComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  newsid!: number;
  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  hasAdmin: boolean = false;
  hasTeacher: boolean = false;

  news: News = {
    id: 0,
    title: '',
    description: '',
    text: '',
    rating: 0,
    ratingQty: 0,
    createdDate: '',
    adminID: 0
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
      console.log('idAdmin: ' + params['id2']);
      this.newsid = params['id2'];
    });

    this.getNews();
    this.getNewsAdmin();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getNews() {
    this.service.getNews(this.newsid)
    .subscribe(
      response => {
        console.log('Section');
        this.news = response;
      }
    );
  }

  onSubmit() {
    this.service.deleteNews(this.newsid)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/Admin/' + this.routeid + '/News']);
      }
    )
  }

  //Find creator - admin
  admins: Admin[] = [];
  adminText: string = '';
  getNewsAdmin(){
    this.service.getAllAdmins()
    .subscribe(
      response => {
        console.log('Admins');
        this.admins = response;
        this.admins.forEach(admin => {
          if (this.news.adminID == admin.id) {
            this.hasAdmin = true;
            this.adminText += "Id:" + admin.id + " " + "Username:" + admin.username;
          }
        });
      }
    );
  }
}
