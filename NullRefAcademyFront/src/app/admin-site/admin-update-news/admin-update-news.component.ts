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
  public routeSub!: Subscription;
  public routeid!: number;
  public newsid!: number;

  public hasErrorTitle = false;
  public hasErrorTitleRequired: boolean = false;
  public hasErrorTitleLength: boolean = false;

  public hasErrorDescription = false;
  public hasErrorDescriptionRequired: boolean = false;
  public hasErrorDescriptionLength: boolean = false;

  public hasErrorText = false;
  public hasErrorTextRequired: boolean = false;
  public hasErrorTextLength: boolean = false;

  public submited = false;

  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  public hasAdmin: boolean = false;

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
      this.routeid = params['id'];
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
        this.takenNews = response;
      }
    );
  }

  onSubmit() {
    this.populate();
    this.submited = true;
    this.service.updateNews(this.newsid, this.takenNews)
    .subscribe(
      response => {
        this.router.navigate(['/Admin/' + this.routeid + '/News']);
      },
      error => {
        let theError = error.error.errors;
        if (theError != null) {
          //title
          if (theError.Title != null) {
            this.hasErrorTitle = true;
            if(theError.Title[0]){
              this.hasErrorTitleRequired = true;
            } else {
              this.hasErrorTitleLength = false;
            }
            if(theError.Title[1]){
              this.hasErrorTitleLength = true;
            } else {
              this.hasErrorTitleRequired = false;
            }
          } else {
            this.hasErrorTitle = false;
            this.hasErrorTitleRequired = false;
            this.hasErrorTitleLength = false;
          }
          //descriotion
          if (theError.Description != null) {
            this.hasErrorDescription = true;
            if(theError.Description[0]){
              this.hasErrorDescriptionRequired = true;
            } else {
              this.hasErrorDescriptionLength = false;
            }
            if(theError.Description[1]){
              this.hasErrorDescriptionLength = true;
            } else {
              this.hasErrorDescriptionRequired = false;
            }
          } else {
            this.hasErrorDescription = false;
            this.hasErrorDescriptionRequired = false;
            this.hasErrorDescriptionLength = false;
          }
          //text
          if (theError.Text != null) {
            this.hasErrorText = true;
            if(theError.Text[0]){
              this.hasErrorTextRequired = true;
            } else {
              this.hasErrorTextLength = false;
            }
            if(theError.Text[1]){
              this.hasErrorTextLength = true;
            } else {
              this.hasErrorTextRequired = false;
            }
          } else {
            this.hasErrorText = false;
            this.hasErrorTextRequired = false;
            this.hasErrorTextLength = false;
          }
        }
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
