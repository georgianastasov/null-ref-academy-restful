import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { StudentApiService } from 'src/app/services/student-api.service';

@Component({
  selector: 'app-teacher-categories',
  templateUrl: './teacher-categories.component.html',
  styleUrls: ['./teacher-categories.component.css']
})
export class TeacherCategoriesComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  constructor(private service: StudentApiService, private router: Router, private route: ActivatedRoute) { }

  categories: Category[] = [];
  courses: Course[] = [];
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
    });

    this.getAllCategories();
    this.getAllCourses();
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

  countCourses(categoryId : number){
    let count = 0;
    for (let i = 0; i < this.courses.length; i++) {
      if(this.courses[i].categoryID === categoryId){
        count++;
      }
    }
    return count;
  }
}
