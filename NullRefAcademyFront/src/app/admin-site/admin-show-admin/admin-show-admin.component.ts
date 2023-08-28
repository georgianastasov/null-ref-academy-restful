import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-show-admin',
  templateUrl: './admin-show-admin.component.html',
  styleUrls: ['./admin-show-admin.component.css']
})
export class AdminShowAdminComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  constructor(private service: AdminApiService, private route: ActivatedRoute) { }

  admins: any = [];
  categories: any = [];
  courses: any = [];
  sections: any = [];
  articles: any = [];
  newss: any = [];

  ngOnInit(): void {
    this.getAllAdmins();
    this.getAllCategories();
    this.getAllCourses();
    this.getAllSections();
    this.getAllArticles();
    this.getAllNews();

    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getAllAdmins() {
    this.service.getAllAdmins()
    .subscribe(
      response => {
        this.admins = response;
      }
    );
  }

  getAllCategories() {
    this.service.getAllCategories()
    .subscribe(
      response => {
        this.categories = response;
      }
    );
  }

  getAllCourses() {
    this.service.getAllCourses()
    .subscribe(
      response => {
        this.courses = response;
      }
    );
  }

  getAllSections() {
    this.service.getAllSections()
    .subscribe(
      response => {
        this.sections = response;
      }
    );
  }

  getAllArticles() {
    this.service.getAllArticles()
    .subscribe(
      response => {
        this.articles = response;
      }
    );
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
