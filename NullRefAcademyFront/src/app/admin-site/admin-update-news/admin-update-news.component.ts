import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Article } from 'src/app/models/article.model';
import { Category } from 'src/app/models/category.model';
import { News } from 'src/app/models/news.model';
import { Section } from 'src/app/models/section.model';
import { Student } from 'src/app/models/student.model';
import { Teacher } from 'src/app/models/teacher.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-update-news',
  templateUrl: './admin-update-news.component.html',
  styleUrls: ['./admin-update-news.component.css']
})
export class AdminUpdateNewsComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  newsid!: number;
  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  hasAdmin: boolean = false;

  takenNews: News = {
    id: 0,
    title: '',
    description: '',
    text: '',
    rating: 0,
    ratingQty: 0,
    createdDate: '',
    adminID: 0
  }

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
        console.log('News');
        this.takenNews = response;
      }
    );
  }

  onSubmit() {
    this.populate();
    this.service.updateNews(this.newsid, this.takenNews)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/Admin/' + this.routeid + '/News']);
      }
    )
  }

  populate(){
    if (this.news.title != '') {
      this.takenNews.title = this.news.title;
    }
    if (this.news.description != '') {
      this.takenNews.description = this.news.description;
    }
    if (this.news.text != '') {
      this.takenNews.text = this.news.text;
    }
    if (this.news.rating != 0) {
      this.takenNews.rating = this.news.rating;
    }
    if (this.news.ratingQty != 0) {
      this.takenNews.ratingQty = this.news.ratingQty;
    }
  }

  removeNull(array: string[]) {
    return array.filter(x => x !== null)
  };

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
          if (this.takenNews.adminID == admin.id) {
            this.hasAdmin = true;
            this.adminText += "Id:" + admin.id + " " + "Username:" + admin.username;
          }
        });
      }
    );
  }
}
