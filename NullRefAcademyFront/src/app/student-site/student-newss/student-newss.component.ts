import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { News } from 'src/app/models/news.model';
import { StudentApiService } from 'src/app/services/student-api.service';

@Component({
  selector: 'app-student-newss',
  templateUrl: './student-newss.component.html',
  styleUrls: ['./student-newss.component.css']
})
export class StudentNewssComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  constructor(private service: StudentApiService, private router: Router, private route: ActivatedRoute) { }

  newss: News[] = [];
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
    });

    this.getAllNews();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getAllNews() {
    this.service.getAllNews()
      .subscribe(
        response => {
          this.newss = response;
        }
      );
  }

}
