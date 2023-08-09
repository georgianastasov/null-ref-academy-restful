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
}
