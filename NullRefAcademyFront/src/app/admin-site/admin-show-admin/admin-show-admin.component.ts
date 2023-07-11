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

  ngOnInit(): void {
    this.getAllAdmins();
    this.getAllCategories();
    this.getAllCourses();
    this.getAllSections();

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
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
        console.log('Admins');
        this.admins = response;
        console.log(this.admins);
      }
    );
  }

  getAllCategories() {
    this.service.getAllCategories()
    .subscribe(
      response => {
        console.log('Categories');
        this.categories = response;
        console.log(this.categories);
      }
    );
  }

  getAllCourses() {
    this.service.getAllCourses()
    .subscribe(
      response => {
        console.log('Courses');
        this.courses = response;
        console.log(this.courses);
      }
    );
  }

  getAllSections() {
    this.service.getAllSections()
    .subscribe(
      response => {
        console.log('Sections');
        this.sections = response;
        console.log(this.sections);
      }
    );
  }

}
