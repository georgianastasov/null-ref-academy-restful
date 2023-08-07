import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-add-article',
  templateUrl: './admin-add-article.component.html',
  styleUrls: ['./admin-add-article.component.css']
})
export class AdminAddArticleComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

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
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onSubmit() {
    this.service.addArticle(this.article)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/Admin/' + this.routeid + '/Articles']);
      }
    )
  }

}
