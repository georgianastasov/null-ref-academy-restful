import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { StudentApiService } from 'src/app/services/student-api.service';

@Component({
  selector: 'app-student-category',
  templateUrl: './student-category.component.html',
  styleUrls: ['./student-category.component.css']
})
export class StudentCategoryComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  categoryid!: number;
  constructor(private service: StudentApiService, private router: Router, private route: ActivatedRoute) { }

  categories: Category[] = [];
  courses: Course[] = [];
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
      this.categoryid = params['id2'];
    });

    this.getAllCategories();
    this.getAllCourses();
    this.checkCategoryCourses();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
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

  hasCourses: boolean = false;
  checkCategoryCourses(){
    this.service.getAllCourses()
      .subscribe(
        response => {
          this.courses.forEach(course => {
            if (course.categoryID == this.categoryid) {
              this.hasCourses = true;
            }
          });
        }
      );
  }

}
