import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { Section } from 'src/app/models/section.model';
import { Student } from 'src/app/models/student.model';
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
  sections: Section[] = [];
  students: Student[] = [];
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.routeid = params['id'];
      this.categoryid = params['id2'];
    });

    this.getAllCategories();
    this.getAllCourses();
    this.getAllSections();
    this.getAllStudents();
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

  getAllSections() {
    this.service.getAllSections()
      .subscribe(
        response => {
          this.sections = response;
        }
      );
  }

  getAllStudents() {
    this.service.getAllStudents()
      .subscribe(
        response => {
          this.students = response;
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

  countSections(courseId : number){
    let count = 0;
    for (let i = 0; i < this.sections.length; i++) {
      if(this.sections[i].courseID === courseId){
        count++;
      }
    }
    return count;
  }

  countStudents(course : any){
    let count = 0
    let array = course.studentsIDs.split(',');
    for (let i = 0; i < array.length; i++) {
      let studentId = parseInt(array[i]);
      this.students.forEach(student => {
        if (studentId === student.id) {
          count++;
        }
      });
    }
    return count;
  }
}
