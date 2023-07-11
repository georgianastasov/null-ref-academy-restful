import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-add-course',
  templateUrl: './admin-add-course.component.html',
  styleUrls: ['./admin-add-course.component.css']
})
export class AdminAddCourseComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  nullfield!: number;
  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  course: Course = {
    id: 0,
    title: '',
    description: '',
    points: 0,
    createdDate: '',
    categoryID: 0,
    teacherID: this.nullfield,
    adminID: 0,
    studentsIDs: ''
  }

  categories: any = [];

  ngOnInit(): void {
    this.getAllCategories();

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
    this.course.adminID = this.routeid;
    this.service.createCourse(this.course)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/Admin/' + this.routeid + '/Courses']);
      }
    )
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
}
