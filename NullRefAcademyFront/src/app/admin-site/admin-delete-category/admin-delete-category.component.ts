import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin.model';
import { Category } from 'src/app/models/category.model';
import { Course } from 'src/app/models/course.model';
import { Teacher } from 'src/app/models/teacher.model';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-delete-category',
  templateUrl: './admin-delete-category.component.html',
  styleUrls: ['./admin-delete-category.component.css']
})
export class AdminDeleteCategoryComponent implements OnInit {

  routeSub!: Subscription;
  routeid!: number;
  categoryid!: number;
  constructor(private service: AdminApiService, private router: Router, private route: ActivatedRoute) { }

  hasAdmin: boolean = false;
  hasTeacher: boolean = false;

  category: Category = {
    id: 0,
    title: '',
    description: '',
    teacherID: 0,
    adminID: 0
  }
  
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params);
      console.log('id: ' + params['id']);
      this.routeid = params['id'];
      console.log('idAdmin: ' + params['id2']);
      this.categoryid = params['id2'];
    });

    this.getCategory();
    this.getCategoryAdmin();
    this.getCategoryTeacher();
    this.getCoursesInThisCategory();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getCategory() {
    this.service.getCategory(this.categoryid)
    .subscribe(
      response => {
        console.log('Category');
        this.category = response;
        console.log(this.category);
      }
    );
  }

  onSubmit() {
    this.service.deleteCategory(this.categoryid)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/Admin/' + this.routeid + '/Categories']);
      }
    )
  }

  //Get courses in this category..
  courses: Course[] = [];
  coursesText: string = '';
  inCourses: boolean = false;
  getCoursesInThisCategory(){
    this.service.getAllCourses()
    .subscribe(
      response => {
        console.log('Courses');
        this.courses = response;
        this.courses.forEach(course => {
          if (course.categoryID == this.categoryid) {
            this.inCourses = true;
            this.coursesText += "Id:" + course.id + " " + "Title:" + course.title + "\n";
          }
        });
        if (!this.inCourses) {
          this.coursesText += "No courses in this category.";
        }
      }
    );
  }

  //Find creator - admin
  admins: Admin[] = [];
  adminText: string = '';
  getCategoryAdmin(){
    this.service.getAllAdmins()
    .subscribe(
      response => {
        console.log('Admins');
        this.admins = response;
        this.admins.forEach(admin => {
          if (this.category.adminID == admin.id) {
            this.hasAdmin = true;
            this.adminText += "Id:" + admin.id + " " + "Username:" + admin.username;
          }
        });
      }
    );
  }

  //Find creator - teacher
  teachers: Teacher[] = [];
  teacherText: string = '';
  getCategoryTeacher(){
    this.service.getAllTeachers()
    .subscribe(
      response => {
        console.log('Teachers');
        this.teachers = response;
        this.teachers.forEach(teacher => {
          if (this.category.teacherID == teacher.id) {
            this.hasTeacher = true;
            this.teacherText += "Id:" + teacher.id + " " + "Username:" + teacher.username;
          }
        });
      }
    );
  }

}
