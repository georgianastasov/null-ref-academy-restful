import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { StudentApiService } from 'src/app/services/student-api.service';

@Component({
  selector: 'app-student-articles',
  templateUrl: './student-articles.component.html',
  styleUrls: ['./student-articles.component.css']
})
export class StudentArticlesComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  constructor(private service: StudentApiService, private router: Router, private route: ActivatedRoute) { }

  articles: Article[] = [];
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
    });

    this.getAllArticles();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getAllArticles() {
    this.service.getAllArticles()
      .subscribe(
        response => {
          this.articles = response;
        }
      );
  }

}
